package engine;


import org.springframework.boot.autoconfigure.SpringBootApplication;


import java.io.IOException;
import java.io.InputStream;
import org.apache.commons.io.IOUtils;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;


public class DockerLink {

    public static void main(String[] args) throws IOException, JSchException {
//		SpringApplication.run(DockerlinkApplication.class, args);


        //java连接linux
        /*String host = "192.168.81.138";
        int port = 22;
        String user = "root";
        String password = "root";*/

        String host = "47.74.84.61";
        int port = 22;
        String user = "root";
        String password = "ccis@2019";

//        String command = "docker ps";
//        String res = exeCommand(host,port,user,password,command);
//        System.out.println(res);
//
//        String command1 = "docker run -itd --name ubuntu_test ubuntu:18.04 /bin/bash";
//        String res1 = exeCommand(host,port,user,password,command1);
//        System.out.println(res1);
//        res1 = res1.substring(0,11);
//
//        String command2 = "docker exec -it "+ res1 +" /bin/bash \n" +
//                            "ifconfig";
//        String res2 = exeCommand(host,port,user,password,command2);
//        System.out.println(res2);

//        String command3 = "docker rm -f " + res1;
//        String res3 = exeCommand(host,port,user,password,command3);
//        System.out.println(res3);
//        int deviceNum = 2;
//        int fogNum = 3;
//        int cloudNum = 5;
//        String command = "cd workspaces\n" +
//                "./test.sh" + " " + deviceNum + " " + fogNum + " " + cloudNum;

        //设置使用cpu百分比
        double cpu_percent = 1;
        //使用镜像名称
        String image = "count";
        //任务量
        String runtime_arr = "350,480,770,1480,2400,3450,10490,10520,10540,10550,10570,10590,10680,10800,10810,10890,13450,13460,13500,13860";
        String[] runtime_str = runtime_arr.split(",");

//        字符转int
//        int[] runtime_int = new int[runtime_str.length];
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
//        }

        String command = "cd workspace\n" +
                "./run.sh" + " " + cpu_percent + " " + image + " " + runtime_arr;

        long startTime = System.currentTimeMillis();

        String res =exeCommand(host,port,user,password,command);

        long endTime = System.currentTimeMillis();

        System.out.println("耗时: " + (endTime - startTime) + " ms");

        System.out.println(res);


    }

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
}
