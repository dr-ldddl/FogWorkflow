package com.ccis.fog;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.cloudbus.cloudsim.*;
import org.cloudbus.cloudsim.core.CloudSim;
import org.cloudbus.cloudsim.power.PowerHost;
import org.cloudbus.cloudsim.provisioners.BwProvisionerSimple;
import org.cloudbus.cloudsim.provisioners.PeProvisionerSimple;
import org.cloudbus.cloudsim.provisioners.RamProvisionerSimple;
import org.fog.entities.Controller;
import org.fog.entities.FogDevice;
import org.fog.entities.FogDeviceCharacteristics;
import org.fog.offloading.OffloadingStrategyAllinCloud;
import org.fog.offloading.OffloadingStrategyAllinFog;
import org.fog.offloading.OffloadingStrategySimple;
import org.fog.utils.FogLinearPowerModel;
import org.fog.utils.FogUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.workflowsim.*;
import org.workflowsim.scheduling.GASchedulingAlgorithm;
import org.workflowsim.scheduling.PsoScheduling;
import org.workflowsim.utils.ClusteringParameters;
import org.workflowsim.utils.OverheadParameters;
import org.workflowsim.utils.Parameters;
import org.workflowsim.utils.ReplicaCatalog;

import javax.annotation.Resource;
import java.io.File;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class IndexService {
    final static String[] algrithmStr = new String[]{"MINMIN","MAXMIN","FCFS","ROUNDROBIN","PSO","GA"};

//    static boolean Flag = true;//表示需要画图
//    static boolean Flag1 = true;//判断FogEnvironmentUI需不需要重新绘制
    static List<FogDevice> fogDevices = new ArrayList<>();
    static List<Double[]> record=new ArrayList<>();
    final static int numOfDepts = 1;
    final static int numOfMobilesPerDept = 1;
    static int nodeSize;

    private static WorkflowEngine wfEngine;
    private static Controller controller;

    private static String strategy;
    private static String scheduler_method;
    private static String optimize_objective;
    private static List<String> alList = new ArrayList();

    private static String daxPath;
    private static String customPath;
//    private static File XMLFile;

    @Value("${sim.xml_path}")
    private String xml_path;

//    static public Map<String, List<Job>> records = new HashMap<>();
    static public Map<String, List<OutputEntity>> outputMap = new HashMap<>();
    static public int cloudNumber = 1;
    static public int fogNumber = 1;
    static public int mobileNumber = 1;

    static public List<Long> cloudMipsList = new ArrayList<>();
    static public List<Double> cloudCostList = new ArrayList<>();
    static public List<Long> fogMipsList = new ArrayList<>();
    static public List<Double> fogCostList = new ArrayList<>();
    static public List<Long> mobileMipsList = new ArrayList<>();
    static public List<Double> mobileCostList = new ArrayList<>();

    static public String deadlineString;

    static public int pso_repeat;
    static public int ga_repeat;
    static public long pso_time;
    static public long ga_time;

    public String initTypeList() {
        JSONObject jsonObject = new JSONObject();
        File file = new File(xml_path);
        File[] fs = file.listFiles();
        for (File f : fs) {
            String str = f.getName();
            String name = str.substring(0, str.lastIndexOf("."));
            int index = str.lastIndexOf("_");
            if (index != -1) {
                String type = name.substring(0, index);
                String size = name.substring(index+1, name.length());
                JSONArray list = jsonObject.getJSONArray(type);
                if (list == null) {
                    list = new JSONArray();
                }
                list.add(size);
                jsonObject.put(type, list);
            }
        }
        return jsonObject.toJSONString();
    }

    public void initAlSetting(JSONObject json) {
        JSONObject pso = json.getJSONObject("PSO");
        JSONObject ga = json.getJSONObject("GA");

        PsoScheduling.particleNum = pso.getInteger("PSO-particleNum");
        PsoScheduling.iterateNum = pso.getInteger("PSO-iterateNum");
        PsoScheduling.c1 = pso.getDouble("PSO-c1");
        PsoScheduling.c2 = pso.getDouble("PSO-c2");
        PsoScheduling.w = pso.getDouble("PSO-w");
        pso_repeat = pso.getInteger("PSO-repeat");

        GASchedulingAlgorithm.popsize = ga.getInteger("GA-popsize");
        GASchedulingAlgorithm.gmax = ga.getInteger("GA-gmax");
        GASchedulingAlgorithm.crossoverProb = ga.getDouble("GA-crossoverProb");
        GASchedulingAlgorithm.mutationRate = ga.getDouble("GA-mutationRate");
        ga_repeat = ga.getInteger("GA-repeat");
    }

    public void initFogSetting(JSONObject json) {
        cloudNumber = json.getInteger("cloud_number");
        fogNumber = json.getInteger("fog_number");
        mobileNumber = json.getInteger("mobile_number");

        JSONArray cml = JSON.parseArray(json.getString("cloud_mips_list"));
        JSONArray ccl = JSON.parseArray(json.getString("cloud_cost_list"));
        JSONArray fml = JSON.parseArray(json.getString("fog_mips_list"));
        JSONArray fcl = JSON.parseArray(json.getString("fog_cost_list"));
        JSONArray mml = JSON.parseArray(json.getString("mobile_mips_list"));

        cloudMipsList.clear();
        cloudCostList.clear();
        fogMipsList.clear();
        fogCostList.clear();
        mobileMipsList.clear();
        mobileCostList.clear();
        for (int i=0; i<cloudNumber; i++) {
            cloudMipsList.add(cml.getLong(i));
            cloudCostList.add(ccl.getDouble(i));
        }
        for (int i=0; i<fogNumber; i++) {
            fogMipsList.add(fml.getLong(i));
            fogCostList.add(fcl.getDouble(i));
        }
        for (int i=0; i<mobileNumber; i++) {
            mobileMipsList.add(mml.getLong(i));
            mobileCostList.add(0.0);
        }
    }

    /**
     *  清除上次仿真所有对象及标记
     */
    public static int clear()
    {
        try {
            if(controller==null)
                return 0;
            wfEngine.jobList.removeAll(wfEngine.jobList);
            controller.clear();
            wfEngine.clearFlag();
            fogDevices.removeAll(fogDevices);  //清除对象列表
            FogUtils.set1();
//            Object[][] rowData = {};

            // 创建一个表格，指定 所有行数据 和 表头
//            table = new JTable(rowData, columnNames);
//            table.getTableHeader().setForeground(Color.black);
////				FitTableColumns(table);
//            scrollPane.setViewportView(table);
            wfEngine.updatebest.clear();

        } catch (Throwable e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return 1;
    }

    private void parseParams(JSONObject json) {
        //主界面设置
        strategy = json.getString("strategy");
        optimize_objective = json.getString("optimize_objective");
        customPath = json.getString("custom");
        if (customPath == null || customPath.equals("")) {
            daxPath = xml_path + json.getString("daxPath");
        } else {
            daxPath = xml_path + customPath;
        }
        nodeSize = json.getInteger("nodeSize");
        deadlineString = json.getString("deadline");
        JSONArray arr = json.getJSONArray("alSet");
        alList.clear();
        for (int i=0; i<arr.size(); i++) {
            alList.add(arr.getString(i));
        }

        initFogSetting(json.getJSONObject("setting_json"));
        initAlSetting(json.getJSONObject("setting_json"));
    }

    /**
     * 对list中的double类型元素分别求平均值
     * @param list
     * @return 求完平均值后的double类型数组
     */
    private Double[] GetMean(List<Double[]> list) {
        double a = 0;
        double b = 0;
        double c = 0;
        for(Double[] d : list){
            a += d[1];
            b += d[2];
            c += d[3];
        }
        a = a / list.size();
        b = b / list.size();
        c = c / list.size();
        Double[] r = {a,b,c};
        return r;
    }

    public Double getAlgorithm(String scheduler_method) {
        if(scheduler_method.equals(algrithmStr[0]))
            return 1.0;
        else if(scheduler_method.equals(algrithmStr[1]))
            return 2.0;
        else if(scheduler_method.equals(algrithmStr[2]))
            return 3.0;
        else if(scheduler_method.equals(algrithmStr[3]))
            return 4.0;
        else if(scheduler_method.equals(algrithmStr[4]))
            return 5.0;
        else if(scheduler_method.equals(algrithmStr[5]))
            return 6.0;
        return null;
    }

    private long GetAverageTime(List<Long> list){
        long sum = 0;
        for(long i : list){
            sum += i;
        }
        return sum/Math.max(1,list.size());
    }

    /**
     * 获得所输入的ga参数设置
     * @return 获取成功返回true 未输入返回false
     */
    public void getgasetting(WorkflowEngine wfEngine){
        wfEngine.fitnessForGA = new double[GASchedulingAlgorithm.popsize];
    }

    /**
     * 开始模拟
     * @param json
     * @return
     */
    public JSONObject doSim(JSONObject json) {
        outputMap.clear();
        parseParams(json);
        record.clear();
        pso_time = 0;
        ga_time = 0;
        for (String method : alList) {
            scheduler_method = method;
            if (scheduler_method.equals("PSO")) {
                getpsosetting(wfEngine);
                int repeat = Math.max(1, pso_repeat);
                List<Double[]> repeats = new ArrayList<>();
                List<Long> times = new ArrayList<>();
                for(int i = 0; i < repeat; i++){
                    System.out.println("---------------------------For the "+(i+1)+" pso--------------------------");
                    long time = StartAlgorithm(scheduler_method+i);
                    repeats.add(record.get((record.size()-1)));
                    record.remove(record.size()-1);
                    times.add(time);
                }
                Double[] mean = GetMean(repeats);
                Double[] algomean = new Double[4];
                algomean[0] = getAlgorithm(scheduler_method);System.out.println(scheduler_method+":");
                algomean[1] = mean[0];System.out.println("Average task execution time = "+mean[0]);
                algomean[2] = mean[1];System.out.println("Average energy consumption = "+mean[1]);
                algomean[3] = mean[2];System.out.println("Average cost = "+mean[2]);
                record.add(algomean);
                if(wfEngine.getoffloadingEngine().getOffloadingStrategy() != null)
                    System.out.println("Average offloading Strategy time = " + wfEngine.getAverageOffloadingTime());
                long averageTime = GetAverageTime(times);times=null;
                System.out.println("Average "+scheduler_method+" algorithm execution time = " + averageTime);
//                displayTime(averageTime);
                pso_time = averageTime;
                System.out.println("Drawing "+scheduler_method+" iteration figure......");
            } else if (scheduler_method.equals("GA")) {
                getgasetting(wfEngine);
                int repeat = Math.max(1, ga_repeat);
                List<Double[]> repeats = new ArrayList<Double[]>();
                List<Long> times = new ArrayList<Long>();
                for (int i = 0; i < repeat; i++) {
                    System.out.println("---------------------------For the " + (i + 1) + " ga--------------------------");
                    long time = StartAlgorithm(scheduler_method+i);
                    repeats.add(record.get((record.size() - 1)));
                    record.remove(record.size() - 1);
                    times.add(time);
                }
                //TODO:这块是干啥的?
                Double[] mean = GetMean(repeats);
                repeats = null;
                Double[] algomean = new Double[4];
                algomean[0] = getAlgorithm(scheduler_method);
                System.out.println(scheduler_method + ":");
                algomean[1] = mean[0];
                System.out.println("Average task execution time = " + mean[0]);
                algomean[2] = mean[1];
                System.out.println("Average energy consumption = " + mean[1]);
                algomean[3] = mean[2];
                System.out.println("Average cost = " + mean[2]);
                record.add(algomean);
                if (wfEngine.getoffloadingEngine().getOffloadingStrategy() != null)
                    System.out.println("Average offloading Strategy time = " + wfEngine.getAverageOffloadingTime());
                long averageTime = GetAverageTime(times);
                times = null;
                System.out.println("Average " + scheduler_method + " algorithm execution time = " + averageTime);
//                displayTime(averageTime);
                ga_time = averageTime;
                System.out.println("Drawing " + scheduler_method + " iteration figure......");
            } else {
                StartAlgorithm(scheduler_method);
            }
        }
        JSONObject retJson = new JSONObject();
        retJson.put("outputMap", outputMap);
        retJson.put("x", wfEngine.iterateNum);
        retJson.put("y", wfEngine.updatebest);
        retJson.put("record", record);
        retJson.put("pso_time", pso_time);
        retJson.put("ga_time", ga_time);
        return retJson;
    }
    /*public JSONObject doSim(JSONObject json) {
        outputMap.clear();
        parseParams(json);
        record.clear();
        pso_time = 0;
        ga_time = 0;
        for (String method : alList) {
            scheduler_method = method;
            if (scheduler_method.equals("PSO")) {
                getpsosetting(wfEngine);
                int repeat = Math.max(1, pso_repeat);
                List<Double[]> repeats = new ArrayList<>();
                List<Long> times = new ArrayList<>();
                for(int i = 0; i < repeat; i++){
                    System.out.println("---------------------------For the "+(i+1)+" pso--------------------------");
                    long time = StartAlgorithm(scheduler_method+i);
                    repeats.add(record.get((record.size()-1)));
                    record.remove(record.size()-1);
                    times.add(time);
                }
                Double[] mean = GetMean(repeats);
                Double[] algomean = new Double[4];
                algomean[0] = getAlgorithm(scheduler_method);System.out.println(scheduler_method+":");
                algomean[1] = mean[0];System.out.println("Average task execution time = "+mean[0]);
                algomean[2] = mean[1];System.out.println("Average energy consumption = "+mean[1]);
                algomean[3] = mean[2];System.out.println("Average cost = "+mean[2]);
                record.add(algomean);
                if(wfEngine.getoffloadingEngine().getOffloadingStrategy() != null)
                    System.out.println("Average offloading Strategy time = " + wfEngine.getAverageOffloadingTime());
                long averageTime = GetAverageTime(times);times=null;
                System.out.println("Average "+scheduler_method+" algorithm execution time = " + averageTime);
//                displayTime(averageTime);
                pso_time = averageTime;
                System.out.println("Drawing "+scheduler_method+" iteration figure......");
            } else if (scheduler_method.equals("GA")) {
                getgasetting(wfEngine);
                int repeat = Math.max(1, ga_repeat);
                List<Double[]> repeats = new ArrayList<Double[]>();
                List<Long> times = new ArrayList<Long>();
                for (int i = 0; i < repeat; i++) {
                    System.out.println("---------------------------For the " + (i + 1) + " ga--------------------------");
                    long time = StartAlgorithm(scheduler_method+i);
                    repeats.add(record.get((record.size() - 1)));
                    record.remove(record.size() - 1);
                    times.add(time);
                }
                //TODO:这块是干啥的?
                Double[] mean = GetMean(repeats);
                repeats = null;
                Double[] algomean = new Double[4];
                algomean[0] = getAlgorithm(scheduler_method);
                System.out.println(scheduler_method + ":");
                algomean[1] = mean[0];
                System.out.println("Average task execution time = " + mean[0]);
                algomean[2] = mean[1];
                System.out.println("Average energy consumption = " + mean[1]);
                algomean[3] = mean[2];
                System.out.println("Average cost = " + mean[2]);
                record.add(algomean);
                if (wfEngine.getoffloadingEngine().getOffloadingStrategy() != null)
                    System.out.println("Average offloading Strategy time = " + wfEngine.getAverageOffloadingTime());
                long averageTime = GetAverageTime(times);
                times = null;
                System.out.println("Average " + scheduler_method + " algorithm execution time = " + averageTime);
//                displayTime(averageTime);
                ga_time = averageTime;
                System.out.println("Drawing " + scheduler_method + " iteration figure......");
            } else {
                StartAlgorithm(scheduler_method);
            }
        }
        JSONObject retJson = new JSONObject();
        retJson.put("outputMap", outputMap);
        retJson.put("x", wfEngine.iterateNum);
        retJson.put("y", wfEngine.updatebest);
        retJson.put("record", record);
        retJson.put("pso_time", pso_time);
        retJson.put("ga_time", ga_time);
        return retJson;
    }*/

    /**
     * 获得所输入的pso参数设置
     * @return 获取成功返回true 未输入返回false
     */
    public void getpsosetting(WorkflowEngine wfEngine){
        wfEngine.fitness = new double[PsoScheduling.particleNum];
        wfEngine.fitness2 = new double[PsoScheduling.particleNum];
    }

    public long StartAlgorithm(String curMethod) {
        clear();
        Log.printLine("Starting FogWorkflowSim version 1.0");
        System.out.println("Optimization objective : "+optimize_objective);

        //TODO:自定义工作流xml文件待完成
//        if(XMLFile!=null){
//            //自定义工作流xml文件
//            daxPath = XMLFile.getPath();
//            String path = XMLFile.getName();
//            String str="";
//            if(path != null && !"".equals(path)){
//                for(int i=0;i<path.length();i++){
//                    if(path.charAt(i)>=48 && path.charAt(i)<=57){
//                        str+=path.charAt(i);
//                    }
//                }
//            }
//            nodeSize = Integer.parseInt(str);
//        }
//        else{//系统自带工作流xml文件
//            daxPath="config/dax/"+inputTypeCb.getSelectedItem()+"_"+nodeSizeCb.getSelectedItem()+".xml";
//            nodeSize = Integer.parseInt((String) nodeSizeCb.getSelectedItem());
//        }

        double deadline;
        try {
            deadline = Double.parseDouble(deadlineString);
        } catch (Exception e) {
            deadline = Double.MAX_VALUE;
        }

        simulate(deadline);
        CloudSim.startSimulation();
        List<Job> outputList0 = wfEngine.getJobsReceivedList();
        CloudSim.stopSimulation();
        Log.enable();
//        printJobList(scheduler_method, outputList0);

        List<OutputEntity> outputList = new ArrayList<>();
        for (int i=0; i<outputList0.size(); i++) {
            OutputEntity outputEntity = new OutputEntity();
            Job job = outputList0.get(i);
            outputEntity.setJobId(String.valueOf(job.getCloudletId()));
            if (job.getClassType() == Parameters.ClassType.STAGE_IN.value) {
                outputEntity.setTaskId("Stage-in");
            } else {
                outputEntity.setTaskId(String.valueOf(job.getClassType()));
            }
//            for (Task task : job.getTaskList()) {
//                outputEntity.setJobId(String.valueOf(task.getCloudletId()));
//            }
            DecimalFormat dft = new DecimalFormat("######0.00");
            outputEntity.setDataCenterId(job.getResourceName(job.getResourceId()));
            outputEntity.setVmId(String.valueOf(job.getVmId()));
            outputEntity.setTime(String.valueOf(dft.format(job.getActualCPUTime())));
            outputEntity.setStartTime(String.valueOf(dft.format(job.getExecStartTime())));
            outputEntity.setFinishTime(String.valueOf(dft.format(job.getFinishTime())));
            outputEntity.setDepth(String.valueOf(job.getDepth()));
            outputEntity.setCost(String.valueOf(dft.format(job.getProcessingCost())));
            List<Task> l = job.getParentList();
            String parents ="";
            for(Task task : l)
                parents += task.getCloudletId()+",";
            outputEntity.setParents(parents);
            if (job.getCloudletStatus() == Cloudlet.SUCCESS) {
                outputEntity.setStatus("SUCCESS");
            } else if (job.getCloudletStatus() == Cloudlet.FAILED) {
                outputEntity.setStatus("FAILED");
            }
            outputList.add(outputEntity);
        }
        outputMap.put(curMethod, outputList);

//            printJobList(outputList0);
        controller.print();

        Double[] a = {getAlgorithm(scheduler_method),controller.TotalExecutionTime,controller.TotalEnergy,controller.TotalCost};
        record.add(a);
        return wfEngine.algorithmTime;
    }

    public void simulate(double deadline) {
        System.out.println("Starting Task...");

        try {
            //Log.disable();
            int num_user = 1; // number of cloud users
            Calendar calendar = Calendar.getInstance();
            boolean trace_flag = false; // mean trace events

            CloudSim.init(num_user, calendar, trace_flag);

            String appId = "workflow"; // identifier of the application

            createFogDevices(1,appId);//(broker.getId(), appId);

            List<? extends Host> hostlist = new ArrayList<Host>();
            int hostnum = 0;
            for(FogDevice device : fogDevices){
                hostnum += device.getHostList().size();
                hostlist.addAll(device.getHostList());
            }
            int vmNum = hostnum;//number of vms;

            File daxFile = new File(daxPath);
            if (!daxFile.exists()) {
                System.out.println("Warning: Please replace daxPath with the physical path in your working environment!");
                return;
            }

            /**
             * Since we are using MINMIN scheduling algorithm, the planning
             * algorithm should be INVALID such that the planner would not
             * override the result of the scheduler
             */
            Parameters.SchedulingAlgorithm sch_method =Parameters.SchedulingAlgorithm.valueOf(scheduler_method);
            Parameters.Optimization opt_objective = Parameters.Optimization.valueOf(optimize_objective);
            Parameters.PlanningAlgorithm pln_method = Parameters.PlanningAlgorithm.INVALID;
            ReplicaCatalog.FileSystem file_system = ReplicaCatalog.FileSystem.SHARED;
            /**
             * No overheads
             */
            OverheadParameters op = new OverheadParameters(0, null, null, null, null, 0);

            /**
             * No Clustering
             */
            ClusteringParameters.ClusteringMethod method = ClusteringParameters.ClusteringMethod.NONE;
            ClusteringParameters cp = new ClusteringParameters(0, 0, method, null);

            /**
             * Initialize static parameters
             */
            Parameters.init(vmNum, daxPath, null,
                    null, op, cp, sch_method, opt_objective,
                    pln_method, null, 0);
            ReplicaCatalog.init(file_system);

            /**
             * Create a WorkflowPlanner with one schedulers.
             */
            WorkflowPlanner wfPlanner = new WorkflowPlanner("planner_0", 1);
            /**
             * Create a WorkflowEngine.
             */
            wfEngine = wfPlanner.getWorkflowEngine();
            /**
             * Set a offloading Strategy for OffloadingEngine
             */

            switch (strategy) {
                case "All-in-Fog":
                    wfEngine.getoffloadingEngine().setOffloadingStrategy(new OffloadingStrategyAllinFog());
                    break;
                case "All-in-Cloud":
                    wfEngine.getoffloadingEngine().setOffloadingStrategy(new OffloadingStrategyAllinCloud());
                    break;
                case "Simple":
                    wfEngine.getoffloadingEngine().setOffloadingStrategy(new OffloadingStrategySimple());
                    break;
                default:
                    wfEngine.getoffloadingEngine().setOffloadingStrategy(null);
                    break;
            }

            /**
             * Set a deadline of workflow for WorkflowEngine
             */
            wfEngine.setDeadLine(deadline);
            /**
             * Create a list of VMs.The userId of a vm is basically the id of
             * the scheduler that controls this vm.
             */
            List<CondorVM> vmlist0 = createVM(wfEngine.getSchedulerId(0), Parameters.getVmNum(), hostlist);
            hostlist = null;//清空，释放内存
            /**
             * Submits this list of vms to this WorkflowEngine.
             */
            wfEngine.submitVmList(vmlist0, 0);
            vmlist0 = null;

            controller = new Controller("master-controller", fogDevices, wfEngine);

            /**
             * Binds the data centers with the scheduler.
             */
            List<PowerHost> list;
            for(FogDevice fogdevice:controller.getFogDevices()){
                wfEngine.bindSchedulerDatacenter(fogdevice.getId(), 0);
                list = fogdevice.getHostList();  //输出设备上的主机
                System.out.println(fogdevice.getName()+": ");
                for (PowerHost host : list){
                    System.out.print(host.getId()+":Mips("+host.getTotalMips()+"),"+"cost("+host.getcostPerMips()+")  ");
                }
                System.out.println();
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Unwanted errors happen");
        }
    }

    protected static List<CondorVM> createVM(int userId, int vms, List<? extends Host> devicelist) {
        //Creates a container to store VMs. This list is passed to the broker later
        LinkedList<CondorVM> list = new LinkedList<>();

        //VM Parameters
        long size = 10000; //image size (MB)
        int ram = 512; //vm memory (MB)
        long bw = 1000;
        int pesNumber = 1; //number of cpus
        String vmm = "Xen"; //VMM name

        //create VMs
        CondorVM[] vm = new CondorVM[vms];
        for (int i = 0; i < vms; i++) {
            double ratio = 1.0;
            int mips = devicelist.get(i).getTotalMips();
            vm[i] = new CondorVM(i, userId, mips * ratio, pesNumber, ram, bw, size, vmm, new CloudletSchedulerSpaceShared());
            list.add(vm[i]);
        }
        return list;
    }

    private void createFogDevices(int userId, String appId) {

        double ratePerMips = 0.96;
        double costPerMem = 0.05; // the cost of using memory in this resource
        double costPerStorage = 0.1; // the cost of using storage in this resource
        double costPerBw = 0.2;//每带宽的花费

//        List<Long> GHzList = new ArrayList<>();//云中的主机
//        List<Double> CostList = new ArrayList<>();
//        for(JTextField textField : FEframe.DCMipsMap.get("cloud")){
//            if(textField.getText().isEmpty())
//                GHzList.add((long)10000);
//            else
//                GHzList.add(Long.valueOf(textField.getText()));
//        }
//        for(JTextField textField : FEframe.DCCostMap.get("cloud")){
//            if(textField.getText().isEmpty())
//                CostList.add(0.96);
//            else
//                CostList.add(Double.valueOf(textField.getText()));
//        }
//        cloudNumCb.setSelectedItem(String.valueOf(GHzList.size()));

//        GHzList.add((long)1600);
//        CostList.add(0.96);

        FogDevice cloud = createFogDevice("cloud", cloudMipsList.size(), cloudMipsList, cloudCostList,
                40000, 100, 10000, 0, ratePerMips, 16*103, 16*83.25,costPerMem,costPerStorage,costPerBw); // creates the fog device Cloud at the apex of the hierarchy with level=0
        cloud.setParentId(-1);

        fogDevices.add(cloud);
        for(int i=0;i<numOfDepts;i++){
            addFogNode(i+"", userId, appId, fogDevices.get(0).getId()); // adding a fog device for every Gateway in physical topology. The parent of each gateway is the Proxy Server
        }
    }

    private  FogDevice addFogNode(String id, int userId, String appId, int parentId){

        double ratePerMips = 0.48;
        double costPerMem = 0.05; // the cost of using memory in this resource
        double costPerStorage = 0.1; // the cost of using storage in this resource
        double costPerBw = 0.1;//每带宽的花费

//        List<Long> GHzList = new ArrayList<>();//雾中的主机
//        List<Double> CostList = new ArrayList<>();
//        for(JTextField textField : FEframe.DCMipsMap.get("fog")){
////            if(textField.getText().isEmpty())
////                GHzList.add((long)5000);
////            else
////                GHzList.add(Long.valueOf(textField.getText()));
////        }
////        for(JTextField textField : FEframe.DCCostMap.get("fog")){
////            if(textField.getText().isEmpty())
////                CostList.add(0.48);
////            else
////                CostList.add(Double.valueOf(textField.getText()));
////        }
////        edgeNumCb.setSelectedItem(String.valueOf(GHzList.size()));

//        GHzList.add((long)1300);
//        CostList.add(0.48);

        FogDevice dept = createFogDevice("f-"+id, fogMipsList.size(), fogMipsList, fogCostList,
                4000, 10000, 10000, 1, ratePerMips, 700, 30,costPerMem,costPerStorage,costPerBw);
        fogDevices.add(dept);
        dept.setParentId(parentId);
        dept.setUplinkLatency(4); // latency of connection between gateways and server is 4 ms
        for(int i=0;i<numOfMobilesPerDept;i++){
            String mobileId = id+"-"+i;
            FogDevice mobile = addMobile(mobileId, userId, appId, dept.getId()); // adding mobiles to the physical topology. Smartphones have been modeled as fog devices as well.
            mobile.setUplinkLatency(2); // latency of connection between the smartphone and proxy server is 4 ms
            fogDevices.add(mobile);
        }
        return dept;
    }

    private  FogDevice addMobile(String id, int userId, String appId, int parentId){
        double costPerMem = 0.05; // the cost of using memory in this resource
        double costPerStorage = 0.1; // the cost of using storage in this resource
        double costPerBw = 0.3;//每带宽的花费

//        List<Long> GHzList = new ArrayList<>();
//        List<Double> CostList = new ArrayList<>();
//        for(JTextField textField : FEframe.DCMipsMap.get("mobile")){
//            CostList.add(0.0);
//            if(textField.getText().isEmpty())
//                GHzList.add((long)1000);
//            else
//                GHzList.add(Long.valueOf(textField.getText()));
//        }
//        mobileNumCb.setSelectedItem(String.valueOf(GHzList.size()));

//        GHzList.add((long)1000);
//        CostList.add(0.0);

        FogDevice mobile = createFogDevice("m-"+id, mobileMipsList.size(), mobileMipsList, mobileCostList,
                10000, 20*1024, 40*1024, 3, 0, 700, 30,costPerMem,costPerStorage,costPerBw);
        mobile.setParentId(parentId);
        return mobile;
    }

    /**
     * Creates a vanilla fog device
     * @param nodeName name of the device to be used in simulation
     * @param hostnum the number of the host of device
     * @param mips the list of host'MIPS
     * @param costPerMips the list of host'cost per mips
     * @param ram RAM
     * @param upBw uplink bandwidth (Kbps)
     * @param downBw downlink bandwidth (Kbps)
     * @param level hierarchy level of the device
     * @param ratePerMips cost rate per MIPS used
     * @param busyPower(mW)
     * @param idlePower(mW)
     * @return
     */
    private FogDevice createFogDevice(String nodeName, int hostnum, List<Long> mips, List<Double> costPerMips,
                                      int ram, long upBw, long downBw, int level, double ratePerMips,
                                      double busyPower, double idlePower,
                                      double costPerMem,double costPerStorage,double costPerBw) {

        List<Host> hostList = new ArrayList<Host>();

        for ( int i = 0 ;i < hostnum; i++ )
        {
            List<Pe> peList = new ArrayList<Pe>();
            // Create PEs and add these into a list.
            peList.add(new Pe(0, new PeProvisionerSimple(mips.get(i)))); // need to store Pe id and MIPS Rating
            int hostId = FogUtils.generateEntityId();
            long storage = 1000000; // host storage
            int bw = 10000;

            PowerHost host = new PowerHost(
                    hostId,
                    costPerMips.get(i),
                    new RamProvisionerSimple(ram),
                    new BwProvisionerSimple(bw),
                    storage,
                    peList,
                    new VmSchedulerTimeShared(peList),
                    new FogLinearPowerModel(busyPower, idlePower)//默认发送功率100mW 接收功率25mW
            );

            hostList.add(host);
        }

        // Create a DatacenterCharacteristics object
        String arch = "x86"; // system architecture
        String os = "Linux"; // operating system
        String vmm = "Xen";
        double time_zone = 10.0; // time zone this resource located
        double cost = 3.0; // the cost of using processing in this resource每秒的花费
			/*double costPerMem = 0.05; // the cost of using memory in this resource
			double costPerStorage = 0.1; // the cost of using storage in this resource
			double costPerBw = 0.1; // the cost of using bw in this resource每带宽的花费*/
        LinkedList<Storage> storageList = new LinkedList<Storage>();

        FogDeviceCharacteristics characteristics = new FogDeviceCharacteristics(
                arch, os, vmm, hostList, time_zone, cost, costPerMem,
                costPerStorage, costPerBw);

        FogDevice fogdevice = null;

        // Finally, we need to create a storage object.
        try {
            HarddriveStorage s1 = new HarddriveStorage(nodeName, 1e12);
            storageList.add(s1);
            fogdevice = new FogDevice(nodeName, characteristics,
                    new VmAllocationPolicySimple(hostList), storageList, 10, upBw, downBw, 0, ratePerMips);
        } catch (Exception e) {
            e.printStackTrace();
        }

        fogdevice.setLevel(level);
        return fogdevice;
    }

    public String upload(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if (!file.isEmpty()) {
            File filepath = new File(xml_path);
            if (!filepath.exists())
                filepath.mkdirs();
            try {
                // 转存文件
                file.transferTo(new File(xml_path + fileName));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return fileName;
    }

    //@Resource ：自动注入，项目启动后会实例化一个JdbcTemplate对象,省去初始化工作。
    @Resource
    private JdbcTemplate jdbcTemplate;
    //用户登录校验
    public int loginCheck(User user) {
        int flag = 0;
        String sql = "SELECT * FROM userinfo WHERE username ='" + user.getUsername() + "' AND password = '" + user.getPassword() +"'";
//        System.out.println("sql:" + sql);
        List<User> userList = (List<User>) jdbcTemplate.query(sql, new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs, int i) throws SQLException {
                User user = new User();
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setEmail(rs.getString("email"));
                user.setAddress(rs.getString("address"));
                user.setOrganization(rs.getString("organization"));
                user.setTelnumber(rs.getString("telnumber"));
                return user;
            }
        });
//        System.out.println(userList);
        //用户名，密码都正确
        if(userList.size() > 0){
            flag = 2;
        }
        else{//用户名正确
            sql = "SELECT * FROM userinfo WHERE username = '" + user.getUsername() + "'";
            userList = (List<User>) jdbcTemplate.query(sql, new RowMapper<User>() {
                @Override
                public User mapRow(ResultSet rs, int i) throws SQLException {
                    User user = new User();
                    user.setUsername(rs.getString("username"));
                    user.setPassword(rs.getString("password"));
                    user.setEmail(rs.getString("email"));
                    user.setAddress(rs.getString("address"));
                    user.setOrganization(rs.getString("organization"));
                    user.setTelnumber(rs.getString("telnumber"));
                    return user;
                }
            });
            if(userList.size() > 0){
                flag = 1;
            }
            else{//用户名密码都不正确
                flag = 0;
            }
        }

        return flag;
    }

//    用户注册
    public String register(User user) {
        String username = user.getUsername();
        String password = user.getPassword();
        String email = user.getEmail();
        String address = user.getAddress();
        String organization =user.getOrganization();
        String telnumber = user.getTelnumber();

        String sql = "SELECT * FROM userinfo WHERE username = '" + user.getUsername() + "'";

        List<User>  userList = (List<User>) jdbcTemplate.query(sql, new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs, int i) throws SQLException {
                User user = new User();
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setEmail(rs.getString("email"));
                user.setAddress(rs.getString("address"));
                user.setOrganization(rs.getString("organization"));
                user.setTelnumber(rs.getString("telnumber"));
                return user;
            }
        });
        if (userList.size() > 0){
            return "existed";
        }
        sql = "INSERT INTO userinfo (username,password,email,address,organization,telnumber) VALUES ('"
                + username +"','"+ password + "','" + email + "','" + address + "','" + organization + "','" + telnumber +"')";
//        System.out.println(sql);
        int insert_flag = jdbcTemplate.update(sql);
//        System.out.println(insert_flag);
        if (insert_flag == 1){
            return "success";

        }else{
            return "failed";
        }
    }

    //查询用户信息
    public User getUser(String userName) {
        String sql = "SELECT * FROM userinfo WHERE username = '" + userName + "'";
//        System.out.println("sql:"+sql);
        List<User>  userList = (List<User>) jdbcTemplate.query(sql, new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs, int i) throws SQLException {
                User user = new User();
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setEmail(rs.getString("email"));
                user.setAddress(rs.getString("address"));
                user.setOrganization(rs.getString("organization"));
                user.setTelnumber(rs.getString("telnumber"));
                return user;
            }
        });
//        System.out.println("userlist" + userList);
        User user= userList.get(0);
        return user;
    }

    //记录访问次数
    public String updateCount(String ipAddress , String currentTime) {
//        String username = visitCount.getUserName();
//        String visitip = visitCount.getVisitIp();
//        String visitaddress = visitCount.getVisitAddress();
//        String visitdate = visitCount.getVisitDate();
//
//        String sql = "insert into visitcount(username,visitip,visitdate,visitaddress) values('" + username + "','" + visitip + "','" + visitdate + "','" + visitaddress + "')";
//        int insert_flag = jdbcTemplate.update(sql);
////        System.out.println("insert flag" + insert_flag);
//        if (insert_flag == 1){
//            return "success";
//
//        }else{
//            return "failed";
//        }
        String sql = "insert into accesscount(visitip,visitdate) values('" + ipAddress + "','" + currentTime + "')";
        int insert_flag = jdbcTemplate.update(sql);
        if (insert_flag == 1) {
            return "success";

        }else{
            return "failed";
        }

    }
    public JSONObject getVisitCount() {
//        今天的日期
        Date date=new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(calendar.DATE, 0);//如果把0修改为-1就代表昨天
        date = calendar.getTime();
        SimpleDateFormat format= new SimpleDateFormat("yyyy-MM-dd");
        String today = format.format(date);
//        System.out.println("dateString:" + dateString);
//        String today = dateString;

//        总访问次数
        String sql_sum = "SELECT count(*) FROM accesscount";
//        今日总访问次数
        String sql_sum_today = "SELECT count(*) FROM accesscount WHERE visitdate LIKE '" + today +"%'";

//        System.out.println(sql_sum);
//        System.out.println(sql_sum_today);
        int sum = jdbcTemplate.queryForObject(sql_sum,Integer.class);
        int sum_today = jdbcTemplate.queryForObject(sql_sum_today,Integer.class);



        JSONObject json =new JSONObject();
        json.put("sum", sum);
        json.put("sum_today", sum_today);
//        System.out.println("json:" + json.toJSONString());
        return json;
    }

    //获取系统版本信息
    public String getVersions() {
       String sql = " SELECT * FROM systemversion";
        List<SystemVersion>  versionList = (List<SystemVersion>) jdbcTemplate.query(sql, new RowMapper<SystemVersion>() {
            @Override
            public SystemVersion mapRow(ResultSet rs, int i) throws SQLException {
                SystemVersion version = new SystemVersion();
                version.setUpdateTime(rs.getString("updateTime"));
                version.setNote(rs.getString("note"));
                version.setVersionNum(rs.getString("versionNum"));
                return version;
            }
        });

//        System.out.println(versionList.toString());
        return JSON.toJSONString(versionList);

    }

    //查看系统当前版本号
    public String getCurrentVersion() {
        String sql = "SELECT * FROM systemversion ORDER BY id DESC limit 1";
//        System.out.println("sql:"+sql);
        List<SystemVersion>  versionList = (List<SystemVersion>) jdbcTemplate.query(sql, new RowMapper<SystemVersion>() {
            @Override
            public SystemVersion mapRow(ResultSet rs, int i) throws SQLException {
                SystemVersion systemVersion = new SystemVersion();
                systemVersion.setVersionNum(rs.getString("versionNum"));
                systemVersion.setNote(rs.getString("note"));
                systemVersion.setUpdateTime(rs.getString("updateTime"));
                return systemVersion;
            }
        });
        SystemVersion systemVersion= versionList.get(0);
        return JSON.toJSONString(systemVersion);

    }

    //开发人员信息
    public String getDevelopers() {
        String sql = "SELECT * FROM developers";
        List<Developer>  developerList = (List<Developer>) jdbcTemplate.query(sql, new RowMapper<Developer>() {
            @Override
            public Developer mapRow(ResultSet rs, int i) throws SQLException {
                Developer developer = new Developer();
                developer.setName(rs.getString("name"));
                developer.setUniversity(rs.getString("university"));
                developer.setEmail(rs.getString("email"));
                return developer;
            }
        });

//        System.out.println(JSON.toJSONString(developerList));
        return JSON.toJSONString(developerList);
    }
}
