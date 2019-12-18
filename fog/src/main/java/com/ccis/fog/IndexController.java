package com.ccis.fog;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Controller
@RequestMapping("/")
public class IndexController {

    @Autowired
    private IndexService indexService;

//    开发人员按钮
    @RequestMapping("developerInfo")
    public String developerInfo(Model model){
        return "developerInformation";
    }

//    主页面初始化-->重定向到FogWorkflowSim
    @RequestMapping("")
    public String index(/*Model model*/) {
        /*String typeJson = indexService.initTypeList();
        model.addAttribute("typeJson", typeJson);
        return "index";*/
        return "redirect:/FogWorkflowSim";
    }
//    实际上的初始化界面
    @RequestMapping("FogWorkflowSim")
    public String fogWorkflowSim(Model model){
        String typeJson = indexService.initTypeList();
        model.addAttribute("typeJson", typeJson);
        return "index";
    }

    @ResponseBody
    @RequestMapping("getAlgorithms")
    public String getAlgorithms() {
        String typeJson = indexService.initTypeList();
        return typeJson;
    }

    private String al_type = "";

//    algorithmsSetting页面
    @RequestMapping("alg/{al_type}")
    public String algorithmsSetting(Model model, @PathVariable("al_type") String alType) {
//        model.addAttribute("al_type", alType);
        al_type = alType;
        return "algorithmsSetting";
    }

    @ResponseBody
    @RequestMapping("getAlType")
    public String getAlType() {
//        System.out.print(json);
//        String typeJson = indexService.initTypeList();
        return al_type;
    }

    @RequestMapping("fog")
    public String fogSetting(Model model) {
//        model.addAttribute("cloud_number", IndexService.cloudNumber);
//        model.addAttribute("fog_number", IndexService.fogNumber);
//        model.addAttribute("mobile_number", IndexService.mobileNumber);
        return "fogSetting";
    }

    @RequestMapping("fogImport")
    public String fogImport() {
        return "fogImport";
    }

    @RequestMapping("lineChart")
    public String lineChart() {
        return "lineChart";
    }

    @RequestMapping("barChart")
    public String barChart() {
        return "barChart";
    }

//    @RequestMapping("alExport")
//    public void alExport(@RequestParam(required = false, value = "xml") String xml, HttpServletResponse response) throws IOException {
//        response.setContentType("application/force-download");
//        // 设置下载后的文件名以及header
//        response.addHeader("Content-disposition", "attachment;fileName=" + "ga.xml");
//        // 创建输出对象
//        OutputStream os = response.getOutputStream();
//        // 常规操作
//        os.write(xml.getBytes());
//    }

    @ResponseBody
    @RequestMapping("customFile")
    public String customFile(@RequestParam("file") MultipartFile file){
        return indexService.upload(file);
    }

    @ResponseBody
    @RequestMapping("export")
    public void export(HttpServletResponse response) throws IOException {
//        int count = IndexService.outputMap.size();
//        if(count == 1){
//            Date date = new Date();
//            String d = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
//            try {
//                exportTable(table, null, selectdisplay.getSelectedItem().toString()+"-result-"+d);//结果导出Excel表格
//            } catch (IOException e1) {
//                e1.printStackTrace();
//            }
//        } else {
//            String path = null;
//            for(int i = 0; i < count; i++){
//                selectdisplay.setSelectedIndex(i);
//                Date date = new Date();
//                String d = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
//                if(i == 0)
//                    path = d;
//                try {
//                    exportTable(table, path, selectdisplay.getSelectedItem().toString()+"-result-"+d);//结果导出Excel表格
//                } catch (IOException e1) {
//                    e1.printStackTrace();
//                }
//            }
//            try {
//                Runtime.getRuntime().exec("rundll32 SHELL32.DLL,ShellExec_RunDLL "+ "Explorer.exe /select,"
//                        +new File("results").getAbsolutePath()+"\\"+path);
//            } catch (IOException e1) {
//                e1.printStackTrace();
//            }
//        }

//        response.setContentType("application/force-download");
//        // 设置下载后的文件名以及header
//        response.addHeader("Content-disposition", "attachment;fileName=" + "ga.xml");
//        // 创建输出对象
//        OutputStream os = response.getOutputStream();
//        // 常规操作
//        os.write(xml.getBytes());
    }

    @ResponseBody
    @RequestMapping("alImport")
    public String alImport(@RequestParam("file") MultipartFile file) throws IOException {
        JSONObject jsonObject = new JSONObject();
        // 获取原始名字
        String fileName = file.getOriginalFilename();
        // 获取后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        if (!suffixName.equals(".xml")) {
            jsonObject.put("result", "Please choose xml file.");
            return jsonObject.toJSONString();
        }

        SAXReader reader = new SAXReader();
        InputStream in = null;
        try {
            in = file.getInputStream();
            Document doc = reader.read(in);
            Element root = doc.getRootElement();
            String name = root.getName();
            if (name.equals("GA")) {
                JSONObject ga_json = new JSONObject();
                if (root.element("Population_Size") != null && !root.element("Population_Size").getText().equals("null") && !root.element("Population_Size").getText().isEmpty())
                    ga_json.put("GA-popsize",Double.parseDouble(root.element("Population_Size").getText()));
                if (root.element("Number_of_Iterations") != null && !root.element("Number_of_Iterations").getText().equals("null") && !root.element("Number_of_Iterations").getText().isEmpty())
                    ga_json.put("GA-gmax",Double.parseDouble(root.element("Number_of_Iterations").getText()));
                if (root.element("Cross_Rate") != null && !root.element("Cross_Rate").getText().equals("null") && !root.element("Cross_Rate").getText().isEmpty())
                    ga_json.put("GA-crossoverProb", Double.parseDouble(root.element("Cross_Rate").getText()));
                if (root.element("Mutation_Rate") != null && !root.element("Mutation_Rate").getText().equals("null") && !root.element("Mutation_Rate").getText().isEmpty())
                    ga_json.put("GA-mutationRate", Double.parseDouble(root.element("Mutation_Rate").getText()));
                if (root.element("Repeated_experiment") != null && !root.element("Repeated_experiment").getText().equals("null") && !root.element("Repeated_experiment").getText().isEmpty())
                    ga_json.put("GA-repeat", Double.parseDouble(root.element("Repeated_experiment").getText()));
                jsonObject.put("GA", ga_json);
            } else if (name.equals("PSO")) {
                JSONObject pso_json = new JSONObject();
                if (root.element("Number_of_Particles") != null && !root.element("Number_of_Particles").getText().equals("null") && !root.element("Number_of_Particles").getText().isEmpty())
                    pso_json.put("PSO-particleNum",Double.parseDouble(root.element("Number_of_Particles").getText()));
                if (root.element("Number_of_Iterations") != null && !root.element("Number_of_Iterations").getText().equals("null") && !root.element("Number_of_Iterations").getText().isEmpty())
                    pso_json.put("PSO-iterateNum",Double.parseDouble(root.element("Number_of_Iterations").getText()));
                if (root.element("Learning_Factor_c1") != null && !root.element("Learning_Factor_c1").getText().equals("null") && !root.element("Learning_Factor_c1").getText().isEmpty())
                    pso_json.put("PSO-c1",Double.parseDouble(root.element("Learning_Factor_c1").getText()));
                if (root.element("Learning_Factor_c2") != null && !root.element("Learning_Factor_c2").getText().equals("null") && !root.element("Learning_Factor_c2").getText().isEmpty())
                    pso_json.put("PSO-c2",Double.parseDouble(root.element("Learning_Factor_c2").getText()));
                if (root.element("Inertia_Weight") != null && !root.element("Inertia_Weight").getText().equals("null") && !root.element("Inertia_Weight").getText().isEmpty())
                    pso_json.put("PSO-w",Double.parseDouble(root.element("Inertia_Weight").getText()));
                if (root.element("Repeated_experiment") != null && !root.element("Repeated_experiment").getText().equals("null") && !root.element("Repeated_experiment").getText().isEmpty())
                    pso_json.put("PSO-repeat",Double.parseDouble(root.element("Repeated_experiment").getText()));
                jsonObject.put("PSO", pso_json);
            }
        } catch (FileNotFoundException | DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            in.close();
        }
        return jsonObject.toJSONString();
    }

//    @ResponseBody
//    @RequestMapping(value = "uploadFile")
//    public String uploadFile(@RequestParam("file") MultipartFile file) {
//        if (!file.isEmpty()) {
//
//        }
//        return null;
//    }

//    @ResponseBody
//    @RequestMapping(value = "changeNumbers")
//    public String changeNumbers(@RequestParam("json") String json) {
//        indexService.initFogSetting(json);
//        return null;
//    }

    @ResponseBody
    @RequestMapping(value = "simulation")
    public String simulation(@RequestParam("json") String json) {
        JSONObject jsonObject = JSON.parseObject(json);
        JSONObject retJson = indexService.doSim(jsonObject);
//        return JSON.toJSONString(IndexService.outputMap);
        return retJson.toJSONString();
    }

    @ResponseBody
    @RequestMapping(value = "compare")
    public String compare(@RequestParam("json") String json) {
        JSONObject jsonObject = JSON.parseObject(json);
        JSONObject retJson = indexService.doSim(jsonObject);
//        return JSON.toJSONString(IndexService.outputMap);
        return retJson.toJSONString();
    }

    @RequestMapping("drawWorkflow")
    public String drawWorkflow() {
        return "drawWorkflow";
    }
}
