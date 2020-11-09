package engine;


import com.ccis.fog.IndexService;
import com.ccis.fog.OutputEntity;
import org.cloudbus.cloudsim.power.PowerHost;
import org.fog.entities.Controller;
import org.fog.entities.FogDevice;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.util.*;

import org.apache.commons.io.IOUtils;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import org.workflowsim.WorkflowEngine;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jcraft.jsch.JSchException;


public class DockerLink {

//    public static void main(String[] args) throws IOException, JSchException {
////		SpringApplication.run(DockerlinkApplication.class, args);
//
//
//        //java连接linux
//        String host = "192.168.81.138";
//        int port = 22;
//        String user = "root";
//        String password = "root";
//
//        /*String host = "47.74.84.61";
//        int port = 22;
//        String user = "root";
//        String password = "ccis@2019";*/
//
//
//
//        //设置使用cpu百分比
//        double cpu_percent = 0.7;
//        //使用镜像名称
//        String image = "count";
//        //任务量
//        String runtime_arr = "112,13460,18941,30383,13856,10800,32058,10544,10592,10528,10576,7264,767,10810,21398,21671,43840,134416,2400,395744,8192";
//        String[] runtime_str = runtime_arr.split(",");
//
////        字符转int
//        /*int[] runtime_int = new int[runtime_str.length];
//        for (int i = 0; i < runtime_str.length; i++) {
//            runtime_int[i] = Integer.parseInt(runtime_str[i]);
//        }
//        for(int i = 0; i < runtime_int.length; i++){
//            System.out.println("第" + (i+1) + "个元素:");
//            int item = runtime_int[i];
//            String command = "cd workspaces\n" +
//                    "./run.sh" + " " + cpu_percent + " " + image + " " + item;
//            String res =exeCommand(host,port,user,password,command);
//            System.out.println(res);
//        }*/
//
//        for (String item: runtime_str) {
//            String command = "cd workspace\n" +
//                    "./run.sh" + " " + cpu_percent + " " + image + " " + item;
//
//            String res =exeCommand(host,port,user,password,command);
//
////            System.out.println(res);
//            String[] res_arr = res.split("\n");
//            /*for (String item : res_arr) {
//                System.out.println("item:");
//                System.out.println(item);
//            }*/
//            String realTime = res_arr[res_arr.length - 2];
//            realTime = realTime.substring(0,realTime.length() - 1);
//            System.out.println("reaTime:" + realTime);
//        }
//        /*String command = "cd workspace\n" +
//                "./run.sh" + " " + cpu_percent + " " + image + " " + runtime_arr;
//
//        long startTime = System.currentTimeMillis();
//
//        String res =exeCommand(host,port,user,password,command);
//
//        long endTime = System.currentTimeMillis();
//
//        System.out.println("耗时: " + (endTime - startTime) + " ms");
//
//        System.out.println(res);*/
//
//
//    }

    //连接远程主机，执行命令
    public static String exeCommand(String host, int port, String user, String password, String command) throws JSchException, IOException {
        JSch jsch = new JSch();
        Session session = jsch.getSession(user, host, port);
        session.setConfig("StrictHostKeyChecking", "no");
        //    java.util.Properties config = new java.util.Properties();
        //   config.put("StrictHostKeyChecking", "no");
        session.setPassword(password);
        session.connect();

        ChannelExec channelExec = (ChannelExec) session.openChannel("exec");
        InputStream in = channelExec.getInputStream();
        channelExec.setCommand(command);
        channelExec.setErrStream(System.err);
        channelExec.connect();
        String out = IOUtils.toString(in, "UTF-8");

        channelExec.disconnect();
        session.disconnect();

        return out;
    }

    //设置真实任务的任务量
    public  void setRealWorkLoad(){
        //获取主机信息
        Map<String, String> devicesInfo = IndexService.devicesInfo;

        //仿真数据
        Map<String, List<OutputEntity>> simulationDate = IndexService.outputMap;

        //设置任务量
        for(String key : simulationDate.keySet()){
            List<OutputEntity> outputEntity_list = simulationDate.get(key);
            System.out.println(key + ":");
            int[] workLoad = new int[outputEntity_list.size()];
            String[]  times = new String[outputEntity_list.size()];
            for (int i = 0; i < outputEntity_list.size() ; i++) {
                OutputEntity outputEntity = outputEntity_list.get(i);
                double time = Double.parseDouble(outputEntity.getTime());
                times[i] = outputEntity.getTime();
                String dataCenterId = outputEntity.getDataCenterId();
                String vmId = outputEntity.getVmId();
                int mips = Integer.parseInt(devicesInfo.get(vmId));
//                System.out.println("mips:" + mips);
                int workLoad_item =new  Double(time * mips).intValue();
                System.out.println("workLoad_item:" + workLoad_item);
                workLoad[i] = workLoad_item;
                outputEntity.setWorkLoad(workLoad_item + "");
                System.out.println(outputEntity.toString());
            }
        }

    }


    //获取outputmap仿真数据
    public static void  getSimulationDate() throws IOException, JSchException {

        Map<String, String> devicesInfo = IndexService.devicesInfo;

        for (String key: devicesInfo.keySet()) {
            System.out.print(key + " ");
            System.out.print(devicesInfo.get(key));
            System.out.println();
        }


        //连接linux
        String host = "192.168.81.138";
        int port = 22;
        String user = "root";
        String password = "root";

        /*String host = "47.74.84.61";
        int port = 22;
        String user = "root";
        String password = "ccis@2019";*/

        //临时服务器
        /*String host = "47.98.222.243";
        int port = 22;
        String user = "root";
        String password = "ccis@2020";*/

        //设置使用cpu百分比
        double cpu_percent = 1.0;
        //使用镜像名称
        String image = "count";

//        int m_mips = 1000;
//        int f_mips = 1300;
//        int c_mips = 1600;
        Map<String, List<OutputEntity>> simulationDate = IndexService.outputMap;

        /*List<Double[]> record = IndexService.record;
//        List<Double[]> record_double = IndexService.record_double;
//        record_double.clear();
        for (Double[] item : record) {
            for(int i = 0; i < item.length ; i++){
                System.out.print(item[i] + "==");
            }
            System.out.println();
        }*/


        System.out.println("dockerlink out:");
        for(String key : simulationDate.keySet()){
            List<OutputEntity> outputEntity_list = simulationDate.get(key);
            System.out.println(key + ":");
            int[] workLoad = new int[outputEntity_list.size()];
            String[]  times = new String[outputEntity_list.size()];
            for (int i = 0; i < outputEntity_list.size() ; i++) {
                OutputEntity outputEntity = outputEntity_list.get(i);
                double time = Double.parseDouble(outputEntity.getTime());
                times[i] = outputEntity.getTime();
                String dataCenterId = outputEntity.getDataCenterId();
                String vmId = outputEntity.getVmId();
                int mips = Integer.parseInt(devicesInfo.get(vmId));
//                System.out.println("mips:" + mips);
                int workLoad_item =new  Double(time * mips).intValue();
                System.out.println("workLoad_item:" + workLoad_item);
                workLoad[i] = workLoad_item;
                /*if(dataCenterId.contains("m")){
                   int workLoad_item =new  Double(time * m_mips).intValue();
//                    System.out.println(workLoad_item);
                   workLoad[i] = workLoad_item;
                }else if(dataCenterId.contains("f")){
                    int workLoad_item =new  Double(time * f_mips).intValue();
//                    System.out.println(workLoad_item);
                    workLoad[i] = workLoad_item;
                }else if(dataCenterId.contains("c")){
                    int workLoad_item =new  Double(time * c_mips).intValue();
//                    System.out.println(workLoad_item);
                    workLoad[i] = workLoad_item;
                }*/
                System.out.println(outputEntity.toString());
            }
            //任务量
            String runTimeArr_str = "";
            for (int item : workLoad) {
//                System.out.print(item + " ");
                runTimeArr_str += item + ",";

            }
            //仿真时间
            String simTimes = "";
            for (String item :times) {
                simTimes += item + ",";
            }
            simTimes = simTimes.substring(0,simTimes.length() - 1);
            System.out.println("simTimes:" + simTimes);
//            System.out.println(runTimeArr_str);
            runTimeArr_str = runTimeArr_str.substring(0,runTimeArr_str.length() - 1);
            System.out.println(runTimeArr_str);
            String command = "cd workspace\n" +
                    "./run.sh" + " " + cpu_percent + " " + image + " " + runTimeArr_str;
            String res =exeCommand(host,port,user,password,command);
//            System.out.println(res);
            String[] res_arr = res.split("\n");
            /*for (String item : res_arr) {
                System.out.println("item:");
                System.out.println(item);
            }*/
            String realTime = res_arr[res_arr.length - 2];
            realTime = realTime.substring(0,realTime.length() - 1);
            System.out.println("reaTime:" + realTime);

            //统计真实环境下的执行总时间和终端设备执行时间和执行总成本
            int realTotalTime = 0;
            int mobileRealTotalTime = 0;
            double realTotalCost = 0;

            //设置真实执行时间
            String[] realTime_arr = realTime.split(" ");
            for (int i = 0; i < realTime_arr.length; i++) {
                String realTime_item = realTime_arr[i];
                if(realTime_item.equals("0")){
                    System.out.println("realTime item:" + realTime_item);
                    realTime_item = "1";
                    realTime_arr[i] = realTime_item;
                }
                OutputEntity outputEntity = outputEntity_list.get(i);
                outputEntity.setRealTime(realTime_item);
                //计算执行总时间
                realTotalTime += Integer.parseInt(realTime_item);
                double price = 1.0;
                outputEntity.setRealCost(Integer.parseInt(realTime_item) * price + "");

                //计算执行总成本
                realTotalCost += Double.parseDouble(outputEntity.getRealCost());

                //筛选出终端设备执行时间
                String dataCenterId = outputEntity.getDataCenterId();
                if(dataCenterId.contains("m")){
                    int realTime_mobile = Integer.parseInt(outputEntity.getRealTime());
                    mobileRealTotalTime += realTime_mobile;
                }

//                System.out.println(outputEntity.toString());
            }
            System.out.println("realTotalTime:" + realTotalTime);
            System.out.println("mobileRealTotalTime:" + mobileRealTotalTime);
            System.out.println("realTotalCost:" + realTotalCost);

            /*Double[] temp = new Double[7];

            if(key.equals("MINMIN")){
                for (Double[] item : record) {
                    double algo = item[0];
                    if(algo == 1.0){
                        temp[0] =algo;
                        temp[1] = item[1];
                        temp[2] = item[2];
                        temp[3] = item[3];
                    }

                }
            }else if(key.equals("MAXMIN")){
                for (Double[] item : record) {
                    double algo = item[0];
                    if(algo == 2.0){
                        temp[0] =algo;
                        temp[1] = item[1];
                        temp[2] = item[2];
                        temp[3] = item[3];
                    }

                }
            }else if(key.equals("FCFS")){
                for (Double[] item : record) {
                    double algo = item[0];
                    if(algo == 3.0){
                        temp[0] =algo;
                        temp[1] = item[1];
                        temp[2] = item[2];
                        temp[3] = item[3];
                    }

                }
            }else if(key.equals("ROUNDROBIN")){
                for (Double[] item : record) {
                    double algo = item[0];
                    if(algo == 4.0){
                        temp[0] =algo;
                        temp[1] = item[1];
                        temp[2] = item[2];
                        temp[3] = item[3];
                    }

                }
            }else if(key.equals("PSO")){
                for (Double[] item : record) {
                    double algo = item[0];
                    if(algo == 5.0){
                        temp[0] =algo;
                        temp[1] = item[1];
                        temp[2] = item[2];
                        temp[3] = item[3];
                    }

                }
            }else if(key.equals("GA")){
                for (Double[] item : record) {
                    double algo = item[0];
                    if(algo == 6.0){
                        temp[0] =algo;
                        temp[1] = item[1];
                        temp[2] = item[2];
                        temp[3] = item[3];
                    }

                }
            }
            temp[4] = Double.valueOf(realTotalTime);
            temp[5] = Double.valueOf(mobileRealTotalTime);
            temp[6] = realTotalCost;
            record_double.add(temp);

            //record_double排序
            Collections.sort(record_double, new Comparator<Double[]>() {
                @Override
                public int compare(Double[] item1, Double[] item2) {
                    Double t1 = item1[0];
                    Double t2 = item2[0];
                    System.out.println(t1 + "---" + t2);
                    return t1.compareTo(t2);
//                    return 0;
                }
            });*/


        }

    }


    //在真实环境中执行单个任务
    public String getSingleData(OutputEntity output) throws IOException, JSchException {

        //连接本地虚拟机
        String host = "192.168.81.131";
        int port = 22;
        String user = "root";
        String password = "root";


        //连接isec服务器
        /*String host = "47.74.84.61";
        int port = 22;
        String user = "root";
        String password = "ccis@2019";*/

        //连接临时服务器
        /*String host = "47.98.222.243";
        int port = 22;
        String user = "root";
        String password = "ccis@2020";*/

        String workLoad = output.getWorkLoad();
        String workType = output.getWorkType();



        //设置使用cpu百分比
        double cpu_percent = 1.0;
        //使用镜像名称
//        String image = "pi";
        String image = "";
        if(workType.equals("pi")){
            System.out.println("pi");
            image = "pi";
        }else if(workType.equals("kmp")){
            System.out.println("kmp");
            image = "kmp";
        }else if(workType.equals("levenshtein")){
            System.out.println("levenshtein");
            image = "levenshtein";
        }else if(workType.equals("selectsort")){
            System.out.println("selectsort");
            image = "selectsort";
        }

        System.out.println("dockerlink out:");
        String command = "cd workspace\n" +
                "./run.sh" + " " + cpu_percent + " " + image + " " + workLoad;
        String res = exeCommand(host,port,user,password,command);
//            System.out.println(res);
        String[] res_arr = res.split("\n");
            /*for (String item : res_arr) {
                System.out.println("item:");
                System.out.println(item);
            }*/
        String realTime = res_arr[res_arr.length - 2];
        realTime = realTime.substring(0,realTime.length() - 1);
        double price = 1.0;
        String realCost = Integer.parseInt(realTime) * price + "";
        System.out.println("reaTime:" + realTime);
//        System.out.println("realCost:" + realCost);

        //修改真实环境下的执行参数
        output.setRealTime(Double.valueOf(realTime) + "");
        output.setRealCost(realCost);
        output.setRealStatus("SUCCESS");
        output.setRealStartTime(output.getStartTime());

        DecimalFormat dft = new DecimalFormat("######0.00");
        double realFinishTime = Double.valueOf(output.getStartTime()) + Double.valueOf(realTime);
//        System.out.println("realFinishTime:" + realFinishTime);
//        System.out.println("realFinishTime-dft:" + dft.format(realFinishTime));
        output.setRealFinishTime(dft.format(realFinishTime) + "");

        System.out.println(output.toString());
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("real_outputEntity", output);

        return jsonObject.toJSONString();
    }
}
