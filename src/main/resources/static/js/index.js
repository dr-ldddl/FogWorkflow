$(document).ready(function () {

    //根据屏幕大小设置样式
    var screen = $(window).width();
    // console.log(screen);
    if(screen < 1400 && screen > 700){
        // console.log(111);
        var schoolLogo = $("#schoolLogo");
        var schoolLogo_w = schoolLogo.width();
        var schoolLogo_h = schoolLogo.height();
        schoolLogo.css({
            "width" : schoolLogo_w*0.7, "height" : schoolLogo_h*0.7
        });

        var QRCode01 = $("#QRCode01");
        var QRCode01_w = QRCode01.width();
        var QRCode01_h = QRCode01.height();
        QRCode01.css({
            "width" : QRCode01_w*0.7, "height" : QRCode01_h*0.7
        });

        var QRCode02 = $("#QRCode02");
        var QRCode02_w = QRCode02.width();
        var QRCode02_h = QRCode02.height();
        QRCode02.css({
            "width" : QRCode02_w*0.7, "height" : QRCode02_h*0.7
        });

        var clustrmap = $("#clustrmap");
        var clustrmap_w = clustrmap.width();
        var clustrmap_h = clustrmap.height();
        clustrmap.css({
            "width" : clustrmap_w*0.5, "height" : clustrmap_h*0.5,"right":"-15px","top":"-120px"
        });

        /*$(".foot-QRCode").css("bottom","0px");
        $(".foot-QRCode2").css("margin-top","15px");*/

        $(".title-line1").css("font-size","27px");
        $(".title-line2").css("font-size","27px");

    }
    if(screen > 1500 && screen <1950){
        // console.log(222);
        var schoolLogo = $("#schoolLogo");
        var schoolLogo_w = schoolLogo.width();
        var schoolLogo_h = schoolLogo.height();
        schoolLogo.css({
            "width" : schoolLogo_w*0.7, "height" : schoolLogo_h*0.7
        });

        var QRCode01 = $("#QRCode01");
        var QRCode01_w = QRCode01.width();
        var QRCode01_h = QRCode01.height();
        QRCode01.css({
            "width" : QRCode01_w*0.7, "height" : QRCode01_h*0.7
        });

        var QRCode02 = $("#QRCode02");
        var QRCode02_w = QRCode02.width();
        var QRCode02_h = QRCode02.height();
        QRCode02.css({
            "width" : QRCode02_w*0.7, "height" : QRCode02_h*0.7
        });

        var clustrmap = $("#clustrmap");
        var clustrmap_w = clustrmap.width();
        var clustrmap_h = clustrmap.height();
        clustrmap.css({
            // "width" : clustrmap_w*0.5, "height" : clustrmap_h*0.5,"right":"150px","top":"-182px"
            "width" : clustrmap_w*0.5, "height" : clustrmap_h*0.5,"right":"-15px","top":"-120px"
        });
    }

    {
        var alSet = new Set();
        var strategyList = ['','All-in-Fog','All-in-Cloud','Simple'];
        var alList = ['MINMIN','MAXMIN','FCFS','ROUNDROBIN','PSO','GA'];
        var typeList = ["Montage","CyberShake","Epigenomics","Inspiral","Sipht"];
        var objList = ['Time','Energy','Cost'];
        var records = null;
        var three_object = null;
        $("#energy").attr("disabled", true);
        $("#cost").attr("disabled", true);
        checkChange($("#minmin"));

        var cloud_number;
        var fog_number;
        var mobile_number;
        var cloud_mips_list = [];
        var cloud_cost_list = [];
        var fog_mips_list = [];
        var fog_cost_list = [];
        var mobile_mips_list = [];

        var typeJson = new Object();
        var userJson = new Object();
        var xmlMame = new Object();
        //获取完整用户信息
        var cookieEmail = $.cookie("email");
        // console.log(cookieEmail == undefined)
        var emailAddress = $("#emailAddress").val();
        if(emailAddress!=""){
            $.cookie("email",emailAddress,{ expires: 1});
        }else{
            if (cookieEmail == "null" || cookieEmail == undefined){
                emailAddress = "";
            }else{
                emailAddress = $.cookie("email");
            }
        }
        // console.log(emailAddress);
        if(emailAddress != ""){
            emailAddress = emailAddress.replace("%20","").replace("%40","@");
            $.cookie("email",emailAddress,{ expires: 7});
            $.ajax({
                url:"/getUser",
                type:"GET",
                data:{"email":emailAddress},
                dataType:"text",
                async:false,
                contentType:"application/json",
                success:function (res) {
                    if(res != ""){
                        userJson = eval("("+res+")");
                        // console.log(userJson);
                        var username = userJson['username'];
                        var xmlfils = eval("("+userJson['xmlfiles']+")");
                        // console.log(xmlfils);
                        // $("#customXML").empty();
                        for(var i = 0; i < xmlfils.length; i++){
                            // debugger
                            // console.log(xmlfils[i]);
                            $("#customXML").append('<option value="'+i+'">'+xmlfils[i]+'</option>');

                        }
                        $("#username_a").html($("#username_a").html().replace('我',username));
                        $("#userinfo_div").show();
                        $("#login_div").hide();
                    }else{
                        // console.log(userJson);
                        // console.log("no user");
                    }
                },
                error:function(res){
                    layer.msg("Failed to obtain user information!");
                }
            });
        }

        //获取algorithms参数
        $.ajax({
            url:"/getAlgorithms",
            type:"POST",
            // data:"",
            dataType:"text",
            async: false,
            contentType: "application/json",
            success:function (res) {
                //console.log(res);
                typeJson = eval("("+res+")");

            },
            error:function () {
                alert("import error!");
            }
        });
        //获取自定义xml文件

        
        /*$.ajax({
            url:"/getxmlfile",
            type:"POST",
            // data:"",
            dataType:"text",
            async: false,
            contentType: "application/json",
            success:function (res) {
                //console.log(res);
                 var xmlDetail = eval("("+res+")");
                 xmlMame = xmlDetail[0];

            },
            error:function () {
                alert("import error!");
            }
        });*/

    }

    // 输出提示信息
    function tips(content) {
        layer.open({
            type: 1
            , title: "Tips"
            , offset: '200px' //具体配置参考：offset参数项
            , content: '<div style="padding: 20px 80px;">' + content + '</div>'
            , btn: 'Ok'
            , btnAlign: 'c' //按钮居中
            , shade: 0 //不显示遮罩
            , yes: function () {
                layer.closeAll();
            }
        });
    }

    function showTypeSelect() {
        //TODO
        /*var data = '${typeJson}';
        typeJson = eval("("+data+")");*/

        $("#sType").empty();
        for (var i=0; i<typeList.length; i++) {
            $("#sType").append('<option value="'+i+'">'+typeList[i]+'</option>');
        }
    }

    showTypeSelect();


    function sortNumber(a,b) {
        return parseInt(a) - parseInt(b);
    }

    function showAmountSelect(ele) {
        $("#amount").empty();
        var typeName = typeList[$(ele).val()];
        var list = typeJson[typeName];
        list = list.sort(sortNumber);
        for (var i=0; i<list.length; i++) {
            $("#amount").append('<option value="'+i+'">'+list[i]+'</option>');
        }
    }

    showAmountSelect($("#sType"));

    $("#sType").change(function () {
        showAmountSelect(this);
    });

    function initParams() {
        var json = new Object();
        cloud_mips_list = [1600];
        cloud_cost_list = [0.96];
        fog_mips_list = [1300];
        fog_cost_list = [0.48];
        mobile_mips_list = [1000];
        cloud_number = 1;
        fog_number = 1;
        mobile_number = 1;
        json["cloud_mips_list"] = cloud_mips_list;
        json["cloud_cost_list"] = cloud_cost_list;
        json["fog_mips_list"] = fog_mips_list;
        json["fog_cost_list"] = fog_cost_list;
        json["mobile_mips_list"] = mobile_mips_list;
        json["cloud_number"] = cloud_number;
        json["fog_number"] = fog_number;
        json["mobile_number"] = mobile_number;

        var pso_json = new Object();
        var ga_json = new Object();

        pso_json["PSO-particleNum"] = 20;
        pso_json["PSO-iterateNum"] = 100;
        pso_json["PSO-c1"] = 1.37;
        pso_json["PSO-c2"] = 1.37;
        pso_json["PSO-w"] = 0.73;
        pso_json["PSO-repeat"] = 1;

        ga_json["GA-popsize"] = 20;
        ga_json["GA-gmax"] = 100;
        ga_json["GA-crossoverProb"] = 0.8;
        ga_json["GA-mutationRate"] = 0.01;
        ga_json["GA-repeat"] = 1;

        json["GA"] = ga_json;
        json["PSO"] = pso_json;
        $('#parent_cloud_tips').text(JSON.stringify(json));

        $(".number_input").val('1');
    }

    //根据隐藏json串反馈给界面
    function feedSetting() {
        var data = $("#parent_cloud_tips").text();
        var json = eval("("+data+")");
        cloud_mips_list = json["cloud_mips_list"];
        cloud_cost_list = json["cloud_cost_list"];
        fog_mips_list = json["fog_mips_list"];
        fog_cost_list = json["fog_cost_list"];
        mobile_mips_list = json["mobile_mips_list"];

        cloud_number = json["cloud_number"];
        fog_number = json["fog_number"];
        mobile_number = json["mobile_number"];

        /*$("#cloudServer").val(cloud_number);
        $("#fogServer").val(fog_number);
        $("#mobile").val(mobile_number);*/

        $("#cloudServer_input").val(cloud_number);
        $("#fogServer_input").val(fog_number);
        $("#mobile_input").val(mobile_number);

        /*addImgs($("#cloudServer"));
        addImgs($("#fogServer"));
        addImgs($("#mobile"));*/
        addImgs_input($("#cloudServer_input"));
        addImgs_input($("#fogServer_input"));
        addImgs_input($("#mobile_input"));
    }

    //初始化fog环境变量
    initParams();
    feedSetting();

    //下拉选择参数设置
    function addImgs(e) {
        var pic_name = "/images/" + $(e).attr("id") + ".png";
        var list = "#" + $(e).attr("id") + "Imgs";
        $(list).empty();
        for (var i = 0; i < $(e).val(); i++) {
            $("<img class='imgs' src=" + pic_name + ">").appendTo($(list));
        }
    }
    //手动输入填写参数设置
    function addImgs_input(e) {
        var id = $(e).attr("id").substring(0,$(e).attr("id").length-6);
        var pic_name = "/images/" + id + ".png";
        var list = "#" + id + "Imgs";
        var sum = $(e).val();
        $(list).empty();
        for (var i = 0; i < sum; i++) {
            $("<img class='imgs' src=" + pic_name + ">").appendTo($(list));
        }

    }
    //Fog Environemnt参数配置
    function changeNumbers() {
        /*cloud_number = $("#cloudServer").val();
        fog_number = $("#fogServer").val();
        mobile_number = $("#mobile").val();
        var data = $("#parent_cloud_tips").text();
        var json = eval("("+data+")");
        json["cloud_number"] = cloud_number;
        json["fog_number"] = fog_number;
        json["mobile_number"] = mobile_number;
        $('#parent_cloud_tips').text(JSON.stringify(json));*/

        var data = $("#parent_cloud_tips").text();
        var json = eval("("+data+")");
        cloud_mips_list = json["cloud_mips_list"];
        cloud_cost_list = json["cloud_cost_list"];
        fog_mips_list = json["fog_mips_list"];
        fog_cost_list = json["fog_cost_list"];
        mobile_mips_list = json["mobile_mips_list"];

        cloud_number = $("#cloudServer_input").val();
        fog_number = $("#fogServer_input").val();
        mobile_number = $("#mobile_input").val();
        var data = $("#parent_cloud_tips").text();
        var json = eval("("+data+")");
        // debugger;

        cloud_mips_list = [];
        cloud_cost_list = [];
        for(var i = 0; i < cloud_number; i++){
            cloud_mips_list.push(1600);
            cloud_cost_list.push(0.96);
        }

        fog_mips_list = [];
        fog_cost_list = [];
        for(var i = 0; i< fog_number; i++){
            fog_mips_list.push(1300);
            fog_cost_list.push(0.48);
        }

        mobile_mips_list = [];
        for(var i = 0; i< mobile_number; i++){
            mobile_mips_list.push(1000);
        }

        json["cloud_number"] = cloud_number;
        json["fog_number"] = fog_number;
        json["mobile_number"] = mobile_number;
        json["cloud_mips_list"] = cloud_mips_list;
        json["cloud_cost_list"] = cloud_cost_list;
        json["fog_mips_list"] = fog_mips_list;
        json["fog_cost_list"] = fog_cost_list;
        json["mobile_mips_list"] = mobile_mips_list;
        $('#parent_cloud_tips').text(JSON.stringify(json));
    }

    $(".choose-imgs").change(function () {
       /* addImgs($(this));
        changeNumbers();*/

        var number = $(this).val();
        $(this).parent().find(".number_input").val(number);
        addImgs($(this));
        changeNumbers();

    });



    // Fog Computing Environment Setting文本框内容改变事件
    $(".number_input").change(function(){
        // debugger
        var number = $(this).val();
        var reg = /^[1-9]\d*$/;
        if(!reg.test(number)){
            tips("Please enter a positive integer!");
            $(this).val('1');
            addImgs_input($(this));
            changeNumbers();
            return;
        }
        $(this).parent().find(".number_input").val(number);
        addImgs_input($(this));
        changeNumbers();
    });

    // Algorithms Setting按钮
    $("#setting").click(function () {
        layer.open({
            type: 2
            , offset: "140px"
            , title: "Algorithms Setting"
            , content: "/alg/PSO"
            , skin: 'title-style'
            , area: ['600px', '580px']
            ,cancel: function(){
                // feedSetting();
            }
        });
    });

    // Developer Information
    $(".developer_logo").click(function () {
        layer.open({
            type: 2,
            offset: "140px",
            title: "System Informations",
            content: "/systemInfo",
            skin: "title-style",
            area: ['700px', '500px'],
            cancel: function(){

            }
        });
    });

    // Developer Information
    $(".developer_png").click(function () {
        layer.open({
            type: 2,
            offset: "140px",
            title: "System Informations",
            content: "/systemInfo",
            skin: "title-style",
            area: ['700px', '500px'],
            cancel: function(){

            }
        });
    });

    // more Detail按钮
    $("#more").click(function () {
        layer.open({
            type: 2
            , offset: "140px"
            , title: "Fog Computing Environment Setting"
            , content: "/fog"
            , skin: 'title-style'
            , area: ['1000px', '650px']
            ,cancel: function(){
                feedSetting();
            }
        });
    });

    // 复选框改变事件
    function checkChange(ele) {
        var value = $(ele).val();
        if ($(ele).prop("checked")) {
            alSet.add(value);
            $("#output").append("<option value='"+value+"'>"+alList[value]+"</option>")
            if (alSet.has("0") || alSet.has("1") || alSet.has("2") || alSet.has("3")) {
                $("#energy").attr("disabled", true);
                $("#cost").attr("disabled", true);
                $("#time").prop("checked", "checked");
            }
        } else {
            $("#output option[value='"+value+"']").remove();
            alSet.delete(value);
            if (alSet.size == 0) {
                $("#energy").attr("disabled", false);
                $("#cost").attr("disabled", false);
            } else if (!alSet.has("0") && !alSet.has("1") && !alSet.has("2") && !alSet.has("3")) {
                $("#energy").attr("disabled", false);
                $("#cost").attr("disabled", false);
            }
        }
    }

    // Scheduling Algorithms的复选框改变触发的事件
    $(".al_check").change(function () {
        checkChange(this);
    });

    // custom复选框
    $("#custom").click(function () {
        if ($(this).prop("checked")) {
            $("#custom_input").attr("disabled", false);
            $("#select_file_btn").attr("disabled", false);
        } else {
            $("#custom_input").attr("disabled", true);
            $("#select_file_btn").attr("disabled", true);
        }
    });

    $("#select_file_btn").click(function () {
        // return $("#select-file").click();
        layer.open({
            type: 2
            , offset: "140px"
            , title: "Select Custom XML File"
            , content: "/selectCustomFile"
            , skin: 'title-style'
            , area: ['1000px', '650px']
            ,cancel: function(){
                feedSetting();
            }
        });
    });

    // 上传自定义的xml文件
    /*$("#select-file").change(function () {
        var formData = new FormData();
        formData.append("file",$(this)[0].files[0]);
        $.ajax({
            url:"/customFile",
            type:"POST",
            data:formData,
            dataType:"text",
            processData: false,
            cache:false,
            contentType: false,
            mimeType:"multipart/form-data",
            success:function (res) {
                // console.log(res);
                $("#custom_input").val(res);
            },
            error:function () {
                // alert("import error!");
            }
        })
        $(this).val("");
    });*/



    // 转化自定义的xml文件
    $("#trans_workflow").click(function () {
         $("#import-file").click();

    });
    $("#import-file").change(function () {
        var WorkflowData = new FormData();
        WorkflowData.append("file",$(this)[0].files[0]);
        $.ajax({
            url:"/transformFile",
            type:"POST",
            data:WorkflowData,
            dataType:"text",
            //上传文件无需缓存
            cache: false,
            //用于对data参数进行序列化处理 这里必须false
            processData: false,
            contentType: false,
            mimeType:"multipart/form-data",
           success:function (data) {
               // alert("Transform Success!"+"  Saved in :E:/" );
               // console.log(data);
               var url = "/getfinalXML?filename=" + data; //提交数据和下载地址

               var form = $("<form></form>").attr("action", url).attr("method", "post");
               //将数据赋值给Input进行form表单提交数据
               form.append($("<input></input>").attr("type", "hidden").attr("name", "queryJson").attr("value", data));
               form.appendTo('body').submit().remove(); //模拟提交
            },
            error:function () {
                alert("Transform Error!");
            }
        })

    });





    var ajaxbg = $("#background,#progressBar");
    // 开始模拟，传入simulation/compare
    function start(url) {
        // ajaxbg.show();
        var cloudServer = $("#cloudServer").val();
        var fogServer = $("#fogServer").val();
        var mobile = $("#mobile").val();
        var strategy = strategyList[$("#strategy").val()];
        var optimize_objective = objList[$("input[name='radioGroup'][checked]").val()];
        var workflow_type = $("#sType").find("option:selected").text();
        var nodeSize = $("#amount").find("option:selected").text();
        var daxPath = workflow_type + "_" + nodeSize + ".xml";
        // var custom = $("#custom_input").val();
        var custom = $("#customXML").find("option:selected").text();
        var deadline = $("#deadline").val();
        /*var real = 0;
        if ($("#real").prop("checked")){
            real = 1;
        }*/


        var json = new Object();
        json.cloudServer = cloudServer;
        json.fogServer = fogServer;
        json.mobile = mobile;
        json.strategy = strategy;
        json.optimize_objective = optimize_objective;
        json.daxPath = daxPath;
        json.nodeSize = nodeSize;
        // json.real = real;

       /* if ($("#custom").prop("checked")) {
            var fileType = custom.substring(custom.length - 4);
            var customName = custom.substring(0,custom.length - 4);
            var customArr = customName.split('_');
            var reg1 = /^[A-Za-z0-9]+$/;
            var reg2 = /^\d+$/;
            // console.log(fileType);
            // console.log(customArr);
            // console.log(fileType != ".xml");
            // console.log(customArr.length != 2 );
            // console.log(!reg1.test(customArr[0]));
            // console.log(!reg2.test(customArr[1]));
            if(fileType != ".xml" || customArr.length != 2 || !reg1.test(customArr[0]) || !reg2.test(customArr[1])){
                tips("The file format you selected is incorrect. Please select again!");
                return;
            }
            json.custom = custom;
        }*/
       // console.log(custom);
       if($(".workflow_custom").hasClass("layui-form-radioed")){
           /*var fileType = custom.substring(custom.length - 4);
           var customName = custom.substring(0,custom.length - 4);
           var customArr = customName.split('_');
           var reg1 = /^[A-Za-z0-9]+$/;
           var reg2 = /^\d+$/;
           // console.log(fileType);
           // console.log(customArr);
           // console.log(fileType != ".xml");
           // console.log(customArr.length != 2 );
           // console.log(!reg1.test(customArr[0]));
           // console.log(!reg2.test(customArr[1]));
           if(fileType != ".xml" || customArr.length != 2 || !reg1.test(customArr[0]) || !reg2.test(customArr[1])){
               tips("The file format you selected is incorrect. Please select again!");
               return;
           }*/
           json.custom = custom;
       }
        json.deadline = deadline;

        var data = $("#parent_cloud_tips").text();
        var setting_json = eval("("+data+")");
        json.setting_json = setting_json;

        var al_array = [];
        alSet.forEach(function (value) {
            al_array.push(alList[value]);
        });
        json.alSet = al_array;
        $.ajax({
            type: "POST",
            url: url,
            data: {json: JSON.stringify(json)},
            async: true,
            dataType:"JSON",
            success: function (res) {
                // console.log(res);
                records = res["outputMap"];
                three_object = res["record"];
                $("#output").empty();
                for (var record in records) {
                    $("#output").append("<option value='"+record+"'>"+record+"</option>")
                }
                var pso_time = res["pso_time"];
                var ga_time = res["ga_time"];
                $("#output-time").text("PSO:"+pso_time+"ms     GA:"+ga_time+"ms");


                if (url == 'simulation') {
                    if (al_array[0] == 'PSO' || al_array['0'] == 'GA') {
                        var x_num = res["x"];
                        var x = [];
                        for (var i=0; i<x_num; i++) {
                            x[i] = i;
                        }
                        var y = res["y"];
                        var char_json = new Object();
                        char_json.x = x;
                        char_json.y = y;
                        char_json.x_name = "Iterations";
                        char_json.y_name = optimize_objective;
                        char_json.alg = al_array[0];
                        $("#chart_content").text(JSON.stringify(char_json));
                        //关闭加载动画
                        layer.open({
                            type: 2
                            , offset: "140px"
                            , title: "FogWorkflowSim simulation result"
                            , content: "/lineChart"
                            , skin: 'title-style'
                            , area: ['1000px', '580px']
                            ,cancel: function(){
                                // feedSetting();
                                ajaxbg.hide();
                            }
                        });
                    }
                    var list = res["record"];
                    for (var i=0; i<list.length; i++) {
                        var content = list[i];
                        if (content[0] == 1) content[0] = 'MINMIN';
                        if (content[0] == 2) content[0] = 'MAXMIN';
                        if (content[0] == 3) content[0] = 'FCFS';
                        if (content[0] == 4) content[0] = 'ROUNDROBIN';
                        if (content[0] == 5) content[0] = 'PSO';
                        if (content[0] == 6) content[0] = 'GA';
                    }
                } else if (url == 'compare') {
                    var head = ['product', 'Time', 'Energy', 'Cost'];
                    var list = res["record"];
                    var source = [];
                    source.push(head);
                    for (var i=0; i<list.length; i++) {
                        var content = list[i];
                        if (content[0] == 1) content[0] = 'MINMIN';
                        if (content[0] == 2) content[0] = 'MAXMIN';
                        if (content[0] == 3) content[0] = 'FCFS';
                        if (content[0] == 4) content[0] = 'ROUNDROBIN';
                        if (content[0] == 5) content[0] = 'PSO';
                        if (content[0] == 6) content[0] = 'GA';
                        source.push(list[i]);
                    }

                    $("#chart_content").text("");
                    // $("#chart_doubleContent").text("");
                    $("#chart_content").text(JSON.stringify(source));
                    // var record_double = res["record_double"];
                    // $("#chart_doubleContent").text(JSON.stringify(record_double));
                    // console.log("record_double:" + $("#chart_doubleContent").text());
                    layer.open({
                        type: 2
                        , offset: "140px"
                        , title: "FogWorkflowSim simulation result"
                        , content: "/barChart"
                        , skin: 'title-style'
                        , area: ['1000px', '580px']
                        ,cancel: function(){
                            // feedSetting();
                            ajaxbg.hide();
                        }
                    });
                }
                showTable();
                //关闭加载动画
                ajaxbg.hide();
            },
        });
    }

    // start simulation按钮
    $("#simulation").click(function () {
        if (alSet.size > 1) {
            tips("You chose more than one, please click the 'Compare' button!");
            return;
        } else if (alSet.size == 0) {
            tips("Please choose an Algorithm!");
            return;
        }
        var url = "simulation";
        //开启加载动画
        ajaxbg.show();
        start(url);
    });

    // compare按钮
    $("#compare").click(function () {
        if (alSet.size == 1) {
            tips("You selected one scheduling algorithm, please click the 'Start Simulation' button!");
            return;
        } else if (alSet.size == 0) {
            tips("Please select at least two algorithms!");
            return;
        }
        // debugger
        var url = "compare";
        // console.log("dddd");
        /*layer.msg("Please waiting！"
        );*/
        ajaxbg.show();
        start(url);
        // ajaxbg.hide();
    });

    // 表格添加数据
    function showTable() {
        $(".tr-line").remove();
        var key = $("#output").val();
        var list = records[key];
        /*for (var i=0; i<list.length; i++) {
            var obj = list[i];
            var line = '<tr class="tr-line">'+
                    '<td>'+obj["jobId"]+'</td>'+
                    '<td>'+obj["taskId"]+'</td>'+
                    '<td>'+obj["status"]+'</td>'+
                    '<td>'+obj["dataCenterId"]+'</td>'+
                    '<td>'+obj["vmId"]+'</td>'+
                    '<td>'+obj["time"]+'</td>'+
                    '<td>'+obj["startTime"]+'</td>'+
                    '<td>'+obj["finishTime"]+'</td>'+
                    '<td>'+obj["depth"]+'</td>'+
                    '<td>'+obj["cost"]+'</td>'+
                    '<td>'+obj["parents"]+'</td>'+
                '</tr>';
            $("#output-table").append(line);

        }*/

        var html = '';
        for (var i=0; i<list.length; i++) {
            var obj = list[i];

            var jobId = obj["jobId"];
            var taskId = obj["taskId"];
            var status = obj["status"];
            var dataCenterId = obj["dataCenterId"];
            var vmId = obj["vmId"];
            var time = obj["time"];
            var cost = obj["cost"];
            var startTime = obj["startTime"];
            var finishTime = obj["finishTime"];
            var depth = obj["depth"];
            var realTime = obj["realTime"];
            var realCost = obj["realCost"];
            var parents = obj["parents"];
            var realStartTime = obj["realStartTime"];
            var realFinishTime = obj["realFinishTime"];
            var realStatus = obj["realStatus"];

            if(realTime == undefined){
                realTime = "--";
            }
            if(realCost == undefined){
                realCost = "--";
            }
            if(realStartTime == undefined){
                realStartTime = "--";
            }
            if(realFinishTime == undefined){
                realFinishTime = "--";
            }

            if(status == "SUCCESS"){
                status = '<button class=\'btn_realStatus_success\'></button>';
            }else{
                status = '<button class=\'btn_realStatus_failed\'></button>';
            }

            // console.log(obj["realTime"]);
            html += '<tr class="tr-line">'+
                '<td>'+ jobId +'</td>'+
                '<td>'+ taskId +'</td>'+
                '<td>'+ status +'</td>'+
                '<td>'+ dataCenterId +'</td>'+
                '<td>'+ vmId +'</td>'+
                '<td>'+ time +'</td>'+
                '<td>'+ cost +'</td>' +
                '<td>'+ realStartTime +'</td>'+
                '<td>'+ realFinishTime +'</td>'+
                '<td>'+ depth +'</td>'+
                '<td style="color: #ff0000">'+ realTime +'</td>' +
                '<td style="color: #ff0000">'+ realCost +'</td>';

            var temp_parent = '';
            if(i%2 == 0){
                temp_parent = '<td><input class="input_even" value="'+ parents +'" onblur="parents_blur(this)" onfocus="parents_focus(this)"></td>';
            }else{
                temp_parent = '<td><input class="input_odd" value="'+ parents +'" onblur="parents_blur(this)" onfocus="parents_focus(this)"></td>';
            }
            html += temp_parent;
            var temp_realStatus = '';
            if(realStatus == "FAILED"){
                temp_realStatus = "<td><button class='btn_realStatus_failed'></button></td>";
            }else{
                temp_realStatus = "<td><button class='btn_realStatus_success'></button></td>";
            }
            html += temp_realStatus;
            html += '</tr>';
        }
        $("#data_tbody").html(html);



        //向数组中添加不重复元素
        Array.prototype.pushNoRepeat = function() {
            for (var i = 0; i < arguments.length; i++) {
                var ele = arguments[i];
                if (this.indexOf(ele) == -1) {
                    this.push(ele);
                }
            }
        }
        var cloud_ids = [];
        var fog_ids = [];
        var mobile_ids = [];
        for(var i = 0; i < list.length; i++){
            var item = list[i];
            var dataCenterId = item["dataCenterId"];
            var vmId = item["vmId"];
            if(dataCenterId.indexOf("cloud") != -1){
                cloud_ids.pushNoRepeat(vmId);
            }else if(dataCenterId.indexOf("f") != -1){
                fog_ids.pushNoRepeat(vmId);
            }else if(dataCenterId.indexOf("m") != -1){
                mobile_ids.pushNoRepeat(vmId);
            }
        }
        // console.log("cloud_ids:" + cloud_ids);
        // console.log("fog_ids:" + fog_ids);
        // console.log("mobile_ids:" + mobile_ids);
        // console.log(cloud_ids.length);
        // console.log(fog_ids.length);
        // console.log(mobile_ids.length);
        var cloud_ids_min = Math.min.apply(null, cloud_ids);
        var fog_ids_min = Math.min.apply(null, fog_ids);
        var mobile_ids_min = Math.min.apply(null, mobile_ids);
        for(var i = 0; i < cloud_ids.length; i++){
            cloud_ids[i] = cloud_ids[i] - cloud_ids_min;
        }
        for(var i = 0; i < fog_ids.length; i++){
            fog_ids[i] = fog_ids[i] - fog_ids_min;
        }
        for(var i = 0; i < mobile_ids.length; i++){
            mobile_ids[i] = mobile_ids[i] - mobile_ids_min;
        }
        // console.log("cloud_ids:" + cloud_ids);
        // console.log("fog_ids:" + fog_ids);
        // console.log("mobile_ids:" + mobile_ids);
        //展示轮播

        // console.log("cloud info:");
        // console.log(cloud_mips_list);
        // console.log(cloud_cost_list);

        // console.log("fog info:");
        // console.log(fog_mips_list);
        // console.log(fog_cost_list);

        // console.log("mobile info:");
        // console.log(mobile_mips_list);
        //设置云服务器信息

        var cloudInfo = $("#cloudInfo");
        var html = "";

        html += "<div class=\"layui-col-xs3 cloudrow\">";
            if(cloud_ids.length != 0){
                for(var i = 0; i < cloud_ids.length; i++){
                    var cloud_vmid = cloud_ids[i];
                    html += "<div class=\"layui-col-md12\" style=\"border: 1px red solid; text-align: center;\">";
                    html += "<input value='" + cloud_mips_list[cloud_vmid] + "' hidden>";
                    html += "<input value='" + cloud_cost_list[cloud_vmid] + "' hidden>";
                    html +=     '<img id="cloudServer_' + cloud_vmid + '" class="servers" src="/images/cloudServer.png" >';
                    html += "</div>";
                }
            }else{
                html += "<div class=\"layui-col-md12\" style=\"border: 1px red solid; text-align: center;color:orangered\">";
                html += "This is not Cloud Servers";
                html += "</div>";
                // cloudInfo.hide();
            }
        html += "</div>";

        if(cloud_ids.length != 0){
            html += "<div id=\"cloudDetail\" class=\"layui-col-xs9\">";
            html += "</div>";
        }

        cloudInfo.html(html);

        //设置边缘服务器信息
        var fogInfo = $("#fogInfo");
        html = "";
        html += "<div class=\"layui-col-xs3 fogrow\">";
        if(fog_ids.length != 0){
            for(var i = 0; i < fog_ids.length; i++){
                var fog_vmid = fog_ids[i];
                html += "<div class=\"layui-col-md12\" style=\"border: 1px red solid; text-align: center;\">";
                html += "<input value='" + fog_mips_list[fog_vmid] + "' hidden>";
                html += "<input value='" + fog_cost_list[fog_vmid] + "' hidden>";
                html +=     '<img id="fogServer_' + fog_vmid + '" class="servers" src="/images/fogServer.png">';
                html += "</div>";
            }
        }else{
            html += "<div class=\"layui-col-md12\" style=\"border: 1px red solid; text-align: center;color:orangered\">";
            html += "This is not Fog Servers";
            html += "</div>";
            // fogInfo.hide();
        }
        html += "</div>";

        if(fog_ids.length != 0){
            html += "<div id=\"fogDetail\" class=\"layui-col-xs9\">";
            html += "</div>";
        }

        fogInfo.html(html);


        //设置终端设备信息
        var mobileInfo = $("#mobileInfo");
        html = "";
        html += "<div class=\"layui-col-xs3 mobilerow\">";
        if(mobile_ids.length != 0){
            for(var i = 0; i < mobile_ids.length; i++){
                var mobile_vmid = mobile_ids[i];
                html += "<div class=\"layui-col-md12\" style=\"border: 1px red solid; text-align: center;\">";
                html += "<input value='" + mobile_mips_list[mobile_vmid] + "' hidden>";
                html += "<input value='" + "0" + "' hidden>";
                html +=     '<img id="mobile_' + mobile_vmid + '" class="servers" src="/images/mobile.png">';
                html += "</div>";
            }
        }else{
            html += "<div class=\"layui-col-md12\" style=\"border: 1px red solid; text-align: center;color:orangered\">";
            html += "This is not End Devices";
            html += "</div>";
            // mobileInfo.hide();
        }
        html += "</div>";

        if(mobile_ids.length != 0){
            html += "<div id=\"mobileDetail\" class=\"layui-col-xs9\">";
            html += "</div>";
        }

        mobileInfo.html(html);

        var cloudServer_first = $(".cloudrow").children().eq(0).find("img");
        var fogServer_first = $(".fogrow").children().eq(0).find("img");
        var mobile_first = $(".mobilerow").children().eq(0).find("img");

        cloudServer_first.click();
        fogServer_first.click();
        mobile_first.click();


        //绘制柱状图
        barChart(three_object);

        //绘制饼图
        pieChart(list);

        //绘制折线图
        lineChart(list);

        //绘制甘特图
        ganttChart(list);


        $("#runTime").css("background-color", "rgba(255,255,255,1)");
        cloudInfo.css("background-color", "rgba(255,255,255,1)");
        fogInfo.css("background-color", "rgba(255,255,255,1)");
        mobileInfo.css("background-color", "rgba(255,255,255,1)");

    }
    //设置柱状图
    function barChart(threeObject){
        var key = $("#output").val();
        // console.log("key:" + key);
        // console.log(threeObject);
        var data = [];
        var arr_sim = [];
        var arr_real = [];

        arr_sim.push("Sim");
        arr_real.push("Real");
        var realFlag = false;
        for (var i = 0; i < threeObject.length ; i++) {
            var algo = threeObject[i];
            if(key.indexOf(algo[0]) >= 0){
                var count = algo.length;

                arr_sim.push(algo[1]);
                arr_sim.push(algo[2]);
                arr_sim.push(algo[3]);
                if(count == 7){
                    realFlag = true;
                    arr_real.push(algo[4]);
                    arr_real.push(algo[5]);
                    arr_real.push(algo[6]);
                }
            }
        }
        // console.log(arr_sim);
        // console.log(arr_real);

        data.push(['standard', 'Time', 'Energy', 'Cost']);

        data.push(arr_sim);
        if(realFlag){
            data.push(arr_real);
        }

        // console.log("data:" + data);

        option = {
            title : {
                text: 'Objectives\' Comparison',
                subtext: 'Comparison of optimization objectives in different environments',
                x:'center'
            },
            legend: {
                orient: 'vertical',
                left: 'left'

            },
            tooltip: {},
            grid:{
                left: '15%',
                right: '10%',
                bottom: '10%',
                // containLabel: true
            },
            dataset: {
                // 提供一份数据。
                /*source: [
                    ['standard', 'Time', 'Energy', 'Cost'],
                    ['Sim', 43.3, 85.8, 93.7],
                    ['Real', 83.1, 73.4, 55.1],
                ]*/
                source:data
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
            xAxis: {
                type: 'category',
                name: "Sim/Real"
            },
            // 声明一个 Y 轴，数值轴。
            yAxis: {},
            // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
            series: [
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'}
            ]
        };

        var barChart = echarts.init(document.getElementById('barChartMain'));
        barChart.clear();
        barChart.setOption(option);



    }

    //设置饼图
    function pieChart(outputEntityList){
        var key = $("#output").val();

        // console.log(key);

        var flag_cloud = flag_fog = flag_mobile = false;
        var hostdata = [];// 存放主机所有信息
        var cloudInfo = [];// 存放每个主机及每个主机的任务信息
        var cloudTemp = {};
        var fogInfo = [];// 存放雾主机及任务信息
        var fogTemp = {};
        var mobileInfo = [];// 存放终端设备及任务信息
        var mobileTemp = {};
        // 云上主机及任务量
        for (var i = 0; i < outputEntityList.length; i++) {
            if(outputEntityList[i].dataCenterId == "cloud"){
                for (var j = 0; j < cloudInfo.length; j++) {
                    if(cloudInfo[j].name == outputEntityList[i].vmId){
                        cloudInfo[j].value++;
                        flag_cloud = true;
                        j = 0;
                        break;
                    }
                }
                if(!flag_cloud){
                    cloudTemp = {name:outputEntityList[i].vmId,value:1};
                    cloudInfo.push(cloudTemp);
                }
                flag_cloud = false;
            }else if(outputEntityList[i].dataCenterId == "f-0"){// 雾上主机及任务量
                for (var j = 0; j < fogInfo.length; j++) {
                    if(fogInfo[j].name == outputEntityList[i].vmId){
                        fogInfo[j].value++;
                        flag_fog = true;
                        j = 0;
                        break;
                    }
                }
                if(!flag_fog){
                    fogTemp = {name:outputEntityList[i].vmId,value:1};
                    fogInfo.push(fogTemp);
                }
                flag_fog = false;
            }else if(outputEntityList[i].dataCenterId == "m-0-0"){// 终端设备上主机及任务量
                for (var j = 0; j < mobileInfo.length; j++) {
                    if(mobileInfo[j].name == outputEntityList[i].vmId){
                        mobileInfo[j].value++;
                        flag_mobile = true;
                        j = 0;
                        break;
                    }
                }
                if(!flag_mobile){
                    mobileTemp = {name:outputEntityList[i].vmId,value:1};
                    mobileInfo.push(mobileTemp);
                }
                flag_mobile = false;
            }
        }

        for (var i = 0; i < cloudInfo.length; i++) {
            cloudInfo[i].name = "cloud"+(i+1);
            hostdata.push(cloudInfo[i]);
        }
        for (var i = 0; i < fogInfo.length; i++) {
            fogInfo[i].name = "fog"+(i+1);
            hostdata.push(fogInfo[i]);
        }
        for (var i = 0; i < mobileInfo.length; i++) {
            mobileInfo[i].name = "mobile"+(i+1);
            hostdata.push(mobileInfo[i]);
        }

        var hostKeyData = [];
        for (var i = 0; i < hostdata.length; i++) {
            hostKeyData.push(hostdata[i].name);
        }

        option = {
            title : {
                text: 'Task Allocation',
                subtext: 'Number of tasks per machine',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: hostKeyData
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            series : [
                {
                    name: '来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    /*data:[
                        {value:5, name:'Cloud1'},
                        {value:10, name:'Fog1'},
                        {value:2, name:'Fog2'},
                        {value:4, name:'Local1'}],*/
                    data: hostdata,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        var pieChart = echarts.init(document.getElementById('pieChartMain'));
        pieChart.clear();
        pieChart.setOption(option);

    }

    //设置折线图
    function lineChart(list) {
        //设置运行时间折线图
        var jobIds = [];
        var simTimes = {};
        var realTimes = {};
        var realFlag = true;
        for(var i = 0; i < list.length; i++){
            var item = list[i];
            var jobId = item["jobId"];
            var simTime = item["time"];
            var realTime = item["realTime"];
            jobIds.push(jobId);
            simTimes[jobId] = simTime;
            if(realTime == undefined){
                realFlag = false;
                realTime = 0;
            }
            realTimes[jobId] = realTime;

        }

        var legend = [];
        var x_data =[];
        var series_simTime = {};
        var series_realTime = {};
        var series_simTime_y = [];
        var series_realTime_y = [];
        var series = [];



        //添加标题
        legend.push("simTimes");
        if(realFlag){
            legend.push("realTimes");
        }
        //添加横坐标-任务Id
        for(key in simTimes){
            x_data.push(key);
            series_simTime_y.push(simTimes[key]);
        }
        if(realFlag){
            for(key in realTimes){
                series_realTime_y.push(realTimes[key]);
            }
        }


        //添加数据
        series_simTime['name'] = "simTimes";
        series_simTime['type'] = "line";
        series_simTime['data'] = series_simTime_y;
        series.push(series_simTime);

        if(realFlag){
            series_realTime['name'] = "realTimes";
            series_realTime['type'] = "line";
            series_realTime['data'] = series_realTime_y;
            series.push(series_realTime)
        }

        option = {
            title : {
                text: 'Scientific Workflow Execution',
                subtext: 'The execution time of the entire scientific workflow',
                x:'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legend,
                left: "left"
            },
            grid:{
                left: '10%',
                right: '10%',
                bottom: '10%',
                // containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                name: "JobId",
                type: 'category',
                boundaryGap: false,
                data: x_data
            },
            yAxis: {
                name: "Time(ms)",
                type: 'value'
            },
            series: series
        };

        var lineChart = echarts.init(document.getElementById('lineChartMain'));
        lineChart.clear();
        lineChart.setOption(option);
    }

    //设置甘特图
    function ganttChart(outputEntityList){
        var jobs = [];// 存储job名称
        var startTime = [];// 存储任务开始时间
        var finishTime = [];// 存储任务结束时间
        var totalExecutionTime = [];// 存储任务总执行时间

        //判断真实环境中的执行时间是否存在
        var realTimeFlag = true;
        for (var i = 0; i < outputEntityList.length; i++) {
            var outputEntity = outputEntityList[i];
            if(outputEntity.realStartTime == undefined){
                realTimeFlag = false;
                break;
            }

        }

        //甘特图颜色
        var gantt_color = "";
        // 为Echarts获取指定格式的数据
        if(realTimeFlag){
            gantt_color = "#FF0000";
            for (var i = 0; i < outputEntityList.length; i++) {
                var outputEntity = outputEntityList[i];
                jobs.push(i);
                startTime.push(parseFloat(outputEntity.realStartTime));
                finishTime.push(parseFloat(outputEntity.realFinishTime));
                totalExecutionTime.push(parseFloat(finishTime[i] - startTime[i]).toFixed(2));
            }
        }else{
            gantt_color = "#259d24";
            for (var i = 0; i < outputEntityList.length; i++) {
                var outputEntity = outputEntityList[i]
                jobs.push(i);
                startTime.push(parseFloat(outputEntity.startTime));
                finishTime.push(parseFloat(outputEntity.finishTime));
                totalExecutionTime.push(parseFloat(finishTime[i] - startTime[i]).toFixed(2));
            }
        }

        var option = {
            title: {
                text: 'Task Progress',
                subtext: 'Execution time Gantt chart',
                x:'center'
            },
            legend: {
                data: ['Task progress']
            },
            xAxis: {
                type: 'value',
                name: 'Time(ms)',
                nameLocation: 'end',
            },
            yAxis: {
                //data: ['job1','job2', 'job3','job4'],
                data: jobs,
                name: 'JobId',
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                formatter: function(params) {
                    var res = params[0].name + "</br>"
                    var date0 = params[0].data;
                    var date1 = params[1].data;
                    var finishTime = Number(date1) + Number(date0);
                    // console.log("sum" + finishTime);
                    res += params[0].seriesName + ":" + date0 + "   ";
                    res += "finishTime:" + finishTime + "</br>";
                    res += params[1].seriesName + ":" + date1;
                    return res;
                }
            },
            grid: {
                left: '7%',
                right: '10%',
                bottom: '10%'
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    yAxisIndex: [0],
                    left: '93%',
                    start: 0, //数据窗口范围的起始百分比
                    end: 100,
                    bottom: "18%"
                },
                {
                    type: 'inside',
                    yAxisIndex: [0],
                    start: 0,
                    end: 36
                }
            ],
            series: [
                {
                    name: 'startTime',
                    type: 'bar',
                    stack: '总量',
                    barWidth: '60%',
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    //data: [14.78,15.06,39.79,44.33]
                    data: startTime
                },
                {/*实际存放差值totalExecution，*/
                    name: 'totalExecutionTime',
                    type: 'bar',
                    stack: '总量',
                    barWidth: '60%',
                    itemStyle: {
                        normal: {
                            color: gantt_color,
                            barBorderRadius: 0,
                            shadowColor: 'rgba(0, 0, 0, 0)',
                            shadowBlur: 0 //图形阴影的模糊大小。
                        }
                    },
                    //data: [1,39.79,44.33,44.81]
                    data: totalExecutionTime
                }
            ]
        };

        var ganttChart = echarts.init(document.getElementById('ganttChartMain'));
        ganttChart.clear();
        ganttChart.setOption(option);

    }

    {
        var html = '';
        for (var i=0; i<20; i++) {
            html += '<tr class="tr-line">'+
                '<td></td>'+
                '<td></td>'+
                '<td></td>'+
                '<td></td>'+
                '<td></td>'+
                '<td></td>'+
                '<td></td>'+
                '<td></td>'+
                '<td></td>'+
                '<td></td>'+
                '<td></td>'+
                '<td></td>';

            var temp = '';
            if(i%2 == 0){
                temp = '<td><input class="input_even" value="" onblur="parents_blur(this)" onfocus="parents_focus(this)"></td>';
            }else{
                temp = '<td><input class="input_odd" value="" onblur="parents_blur(this)" onfocus="parents_focus(this)"></td>';
            }
            html += temp;
            html += '<td></td>';
            html += '</tr>';

            // $("#output-table").append(line);
        }
        $("#data_tbody").html(html);
        initChart();

    }

    //初始化柱状图，饼图，折线图，甘特图
    function initChart(){
        //初始化柱状图
        var threeObject = [];
        var MINMIN_example = [];
        MINMIN_example.push("0");
        MINMIN_example.push(400);
        MINMIN_example.push(50);
        MINMIN_example.push(300);
        threeObject.push(MINMIN_example)
        barChart(threeObject);

        //初始化饼图
        var outputList = [];
        var item1 = {"cost":"6.99","dataCenterId":"f-0","depth":"1","finishTime":"14.74","jobId":"0","parents":"20,","realStatus":"FAILED","startTime":"0.17","status":"SUCCESS","taskId":"2","time":"3","vmId":"1","workLoad":"18941"}
        var item2 = {"cost":"8.32","dataCenterId":"m-0-0","depth":"1","finishTime":"27.82","jobId":"1","parents":"20,","realStatus":"FAILED","startTime":"19.16","status":"SUCCESS","taskId":"2","time":"6","vmId":"2","workLoad":"13856"}
        var item3 = {"cost":"18.23","dataCenterId":"cloud","depth":"1","finishTime":"19.16","jobId":"2","parents":"20,","realStatus":"FAILED","startTime":"0.17","status":"SUCCESS","taskId":"2","time":"9","vmId":"0","workLoad":"30383"}
        var item4 = {"cost":"0.00","dataCenterId":"m-0-0","depth":"1","finishTime":"13.63","jobId":"3","parents":"20,","realStatus":"FAILED","startTime":"0.17","status":"SUCCESS","taskId":"2","time":"12","vmId":"2","workLoad":"13460"}
        var item5 = {"cost":"6.48","dataCenterId":"cloud","depth":"2","finishTime":"34.57","jobId":"4","parents":"0,","realStatus":"FAILED","startTime":"27.82","status":"SUCCESS","taskId":"2","time":"15","vmId":"0","workLoad":"10800"}
        var item6 = {"cost":"6.34","dataCenterId":"f-0","depth":"2","finishTime":"60.96","jobId":"5","parents":"1,0,","realStatus":"FAILED","startTime":"54.36","status":"SUCCESS","taskId":"2","time":"18","vmId":"1","workLoad":"10576"}

        outputList.push(item1);
        outputList.push(item2);
        outputList.push(item3);
        outputList.push(item4);
        outputList.push(item5);
        outputList.push(item6);
        // console.log(outputList);

        //初始化绘制饼图，折线图，甘特图
        pieChart(outputList);
        lineChart(outputList);
        ganttChart(outputList);


    }


    // output改变事件
    $("#output").change(function () {
        var flag = false;
        $(".tr-line").each(function(){
            var text = $(this).find("td:first").text();
            if(text == ""|| text ==null){
                flag = true;
                return false;
            }
        });
        if(!flag){
            showTable();
        }
    });

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    // 导出表格数据
    $("#export").click(function () {
        // 判断用户是否登录
        /*if(jQuery.isEmptyObject(userJson)){
            layer.msg("Please log in and export the data！",
                {time:1000}
            );
            return false;
        }*/
        var flag = false;
        $(".tr-line").each(function(){
            var text = $(this).find("td:first").text();
            if(text == ""|| text ==null){
                flag = true;
                // tips("There is no data to export");
                layer.msg("There is no data to export!",
                    {time:1000}
                );
                return false;

            }
        });

        if(!flag){
            var filename = "";
            var algorithms_type = $("#output").text();
            var currentTime = new Date().Format("yyyy-MM-dd_HH:mm:ss");

            // console.log(currentTime);
            filename = currentTime + "_" + algorithms_type;
            $("#output-table-tbody").table2excel({
                exclude: ".noExl",//class="noExl"的列不导出
                name: "Excel Document Name",
                filename: filename,//文件名称
                fileext: ".xlsx",//文件后缀名
                exclude_img: true,//导出图片
                exclude_links: true,//导出超链接
                exclude_inputs: true//导出输入框内容
            });
        }

    });

    //可视化工作流
    $("#draw_workflow").click(function(){
        if(jQuery.isEmptyObject(userJson)){
            layer.msg("Please log in！",
                {time:1000}
            );
            return false;
        }
        var email = userJson['email'];
        var password = userJson['password'];
        // console.log(email);
        // console.log(password);
        // window.location.href = 'http://47.74.84.61:8089/index?email=" + email + "&password=" + password';
        // window.location.href = "http://127.0.0.1:8089/index?email=" + email + "&password=" + password;
        // debugger;

        $.cookie('email', null);
        $.cookie('password', null);
        $.cookie("email",email,{ expires: 7});
        $.cookie("password",password,{ expires: 7});

        // console.log("cookie:");
        // console.log($.cookie("email"));
        // console.log($.cookie("password"));



        // var email_encode = encrypt(email);
        // var password_encode = encrypt(password);
        // var email_encode = encode64(email);
        // var password_encode = encode64(password);
        // console.log(email_encode+"ggggggggggggggg");
        // window.location.href = "http://127.0.0.1:8089/index?email=" + email_encode + "&password=" + password_encode;

        window.location.href = "http://127.0.0.1:8089/index";

        // window.location.href = 'http://www.iseclab.org.cn:8089/index';

        // window.location.href = 'http://47.98.222.243:8089/index';





    });


    //获取版本信息
    $.ajax({
        url : "/getCurrentVersion",
        data : "",
        type : "POST",
        dataType : "JSON",
        contentType : "application/json;charset=utf-8",
        async : false,
        success : function(res){
            // debugger
            // console.log(res);
            // console.log(res);
            var versionNum = res['versionNum'];
            var note = res['note'];
            var updateTime = res['updateTime'];
            $("#versions").html("Version:" + versionNum);

        },
        error : function(res){
            // console.log(res);
            console.log("error");
        }
    });
    var username = userJson['username'];
    //统计网页被访问次数
   $.ajax({
       url : "/getVisitCount",
       data : "",
       type : "POST",
       dataType : "JSON",
       contentType : "application/json;charset=utf-8",
       async : false,
       success : function(res){
                // console.log(res);
                var sum = res['sum'];
                var sum_today = res['sum_today'];

                // $("#visitcount").children()[0].innerHTML = "Total number of visits：" + sum + " || ";
                // $("#visitcount").children()[1].innerHTML = "Total number of visits today：" + sum_today + "  ";

       },
       error : function(res){
            // console.log(res);
            console.log("error");
       }
   })
   //登录
    $("#user_login").click(function(){
        layer.open({
            type: 2
            , offset: "140px"
            , title: "Login"
            , content: "/To_login"
            , skin: 'title-style'
            , area: ['600px', '580px']
            ,cancel: function(){
                // feedSetting();
            }
        });
    });

   // 用户注册
    $("#user_register").click(function(){
        layer.open({
            type: 2
            , offset: "140px"
            , title: "Register"
            , content: "/To_register"
            , skin: 'title-style'
            , area: ['600px', '580px']
            ,cancel: function(){
                // feedSetting();
            }
        });
    });

    // 修改信息
    $("#changeInfo").click(function(){
        console.log("changeInfo");
    });

    //退出登录
    $("#logout").click(function(){
        $.cookie("email",null);
        $.cookie("password",null);
        // console.log("logout");
       /* $("#userinfo_div").hide();
        $("#login_div").show();*/
        window.location.href = "/";
    })

    //意见按钮
    $(".advices").click(function(){
        /*if(jQuery.isEmptyObject(userJson)){
            layer.msg("Please log in and submit recommendations！",
                {time:1000}
            );
            return false;
        }
        console.log(userJson);*/
        var username = userJson['username'];
        if(username == "root"){
            layer.open({
                type: 2
                , offset: "140px"
                , title: "All recommendations"
                , content: "/allRecommendations"
                , skin: 'title-style'
                , area: ['600px', '500px']
                ,cancel: function(){
                    // feedSetting();
                }
            });
        }else{
            layer.open({
                type: 2
                , offset: "140px"
                , title: "Submit recommendations"
                , content: "/recommendations"
                , skin: 'title-style'
                , area: ['600px', '500px']
                ,cancel: function(){
                    // feedSetting();
                }
            });
        }


    });

    //workflow setting 单选按钮1
    $(".workflow_example").click(function(){
        //设置Custom单选框和当前单选框
        $(this).addClass("layui-form-radioed");
        $(this).html("<i class=\"layui-anim layui-icon layui-anim-scaleSpring\"></i><div>Example&nbsp;&nbsp;Type:</div>");
        $(".workflow_custom").removeClass("layui-form-radioed");
        $(".workflow_custom").html("<i class=\"layui-anim layui-icon\"></i><div>Custom&nbsp;&nbsp;&nbsp;Type:</div>");

        //设置下拉框允许点击和不允许点击
        $("#sType").attr("disabled",false);
        $("#amount").attr("disabled",false);
        $("#custom_input").attr("disabled", true);
        $("#select_file_btn").attr("disabled", true);
        $("#customXML").attr("disabled",true);
    });

    // workflow setting单选按钮2
    $(".workflow_custom").click(function(){
        // 判断用户是否登录
        var flag_isLogin = jQuery.isEmptyObject(userJson);
        if(flag_isLogin){
            layer.msg("Please log in!",
                {time:1000}
            );
            return false;
        }
        //设置Example单选框和当前单选框
        $(this).addClass("layui-form-radioed");
        $(this).html("<i class=\"layui-anim layui-icon layui-anim-scaleSpring\"></i><div>Custom&nbsp;&nbsp;&nbsp;Type:</div>");
        $(".workflow_example").removeClass("layui-form-radioed");
        $(".workflow_example").html("<i class=\"layui-anim layui-icon\"></i><div>Example&nbsp;&nbsp;Type:</div>");

        //设置下拉框允许点击和不允许点击
        $("#sType").attr("disabled",true);
        $("#amount").attr("disabled",true);
        $("#custom_input").attr("disabled", false);
        $("#select_file_btn").attr("disabled", false);
        $("#customXML").attr("disabled",false);
    });


    //展示数据区域,轮播
    layui.use('carousel', function(){
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
            elem: '#detailInfo'
            ,width: '100%' //设置容器宽度
            ,arrow: 'always' //始终显示箭头
            // ,anim: 'updown' //切换动画方式
        });
    });


    //Start鼠标悬停主机提示框
    var subtips;
    function openServersMsg(id, mips, cost) {
        var data = "Id:" + id + "<br/>" +
                    "MIPS:" + mips + "<br/>" +
                    "Cost:" + cost + "<br/>";
        subtips = layer.tips(data, '#' + id,{tips:[2,'#5BC0DE'],time: 30000,area: ['120px', 'auto']});
    }
    //End鼠标悬停主机提示框


    //Start展示区域-鼠标悬浮在主机上
    $("#detailInfo").on("mouseenter", ".servers", function(){
        var par = $(this).parent();
        var mips = par.children("input").eq(0).val();
        var cost = par.children("input").eq(1).val();
        /*console.log(mips);
        console.log(cost);
        console.log(this.id);
        console.log("mouseenter");*/
        openServersMsg(this.id, mips, cost);
    });
    $("#detailInfo").on("mouseleave", ".servers", function(){
        // console.log("mouseleave");
        layer.close(subtips);
    });
    //End展示区域-鼠标悬浮在主机上


    //Start鼠标悬停主机提示框
    var taskTips;
    function openTasksMsg(id, jobId, taskId, status, dataCenterId, vmId, time, startTime,
                          finishTime, depth, cost, parents, realCost, realTime) {
        var data ="jobId:" + jobId + "<br/>" +
                  "taskId:" + taskId + "<br/>" +
                  "status:" + status + "<br/>" +
                  "dataCenterId:" + dataCenterId + "<br/>" +
                  "vmId:" + vmId + "<br/>" +
                  "time:" + time + "<br/>" +
                  "startTime:" + startTime + "<br/>" +
                  "finishTime:" + finishTime + "<br/>" +
                  "depth:" + depth + "<br/>" +
                  "cost:" + cost + "<br/>" +
                  "parents:" + parents + "<br/>" +
                  "realCost:" + realCost + "<br/>" +
                  "realTime:" + realTime + "<br/>" +
                  "";
        taskTips = layer.tips(data, '#' + id,{tips:[1,'#5BC0DE'],time: 30000,area: ['150px', 'auto']});
    }
    //End鼠标悬停主机提示框

    //展示区域-鼠标悬浮在任务上
    $("#detailInfo").on("mouseenter", ".tasks", function(){
        var inputs = $(this).parent().children("input");

        var jobId_item = inputs.eq(0).val();
        var taskId_item = inputs.eq(1).val();
        var status_item = inputs.eq(2).val();
        var dataCenterId_item = inputs.eq(3).val();
        var vmId_item = inputs.eq(4).val();
        var time_item = inputs.eq(5).val();
        var startTime_item = inputs.eq(6).val();
        var finishTime_item = inputs.eq(7).val();
        var depth_item = inputs.eq(8).val();
        var cost_item = inputs.eq(9).val();
        var parents_item = inputs.eq(10).val();
        var realCost_item = inputs.eq(11).val();
        var realTime_item = inputs.eq(12).val();
        /*console.log(jobId_item + "--" + taskId_item  + "--" + status_item + "--" +
            dataCenterId_item + "--" + vmId_item + "--" + time_item + "--" + startTime_item
            + "--" + finishTime_item + "--" + depth_item + "--" + cost_item + "--" +parents_item
            + "--" + realCost_item + "--" + realTime_item
        );*/
        // console.log("task mouseenter");
        openTasksMsg(this.id, jobId_item, taskId_item, status_item, dataCenterId_item, vmId_item,
            time_item, startTime_item, finishTime_item, depth_item, cost_item, parents_item,
            realCost_item, realTime_item);
    });
    $("#detailInfo").on("mouseleave", ".tasks", function(){
        // console.log("task mouseleave");
        layer.close(taskTips);
    });


    //展示区域-鼠标点击主机

    $("#detailInfo").on("click", ".servers", function(){
        var key = $("#output").val();
        var list = records[key];

        var img_id = this.id;
        // console.log(img_id);
        var dataCenter = img_id.split("_")[0];
        var vmId = img_id.split("_")[1];
        // console.log("dataCenter" + dataCenter);
        // console.log("vmId:" + vmId);
        var cloud_num = $(".cloudrow div").length;
        var fog_num = $(".fogrow div").length;
        var mobile_num = $(".mobilerow div").length;
        // console.log("cloud_num:" + cloud_num);
        // console.log("fog_num:" + fog_num);
        // console.log("mobile_num:" + mobile_num);

        if(dataCenter == "cloudServer"){
            var cloud_vmId = vmId;
            // console.log("cloudServer:" + cloud_vmId);

            var html = "";
            html += "<div class=\"layui-row\">";

            for(var i = 0; i < list.length; i++){
                var item = list[i];

                var dataCenterId_item = item["dataCenterId"];
                var vmId_item = item["vmId"];
                if(dataCenterId_item == "cloud" && cloud_vmId == vmId_item){

                    var realTime_item = item["realTime"];
                    var realCost_item = item["realCost"];
                    if(realTime_item == undefined){
                        realTime_item = "--";
                    }
                    if(realCost_item == undefined){
                        realCost_item = "--";
                    }

                    var jobId_item = item["jobId"];
                    var taskId_item = item["taskId"];
                    var status_item = item["status"];
                    var dataCenterId_item = item["dataCenterId"];
                    var vmId_item = item["vmId"];
                    var time_item = item["time"];
                    var startTime_item = item["startTime"];
                    var finishTime_item = item["finishTime"];
                    var depth_item = item["depth"];
                    var cost_item = item["cost"];
                    var parents_item = item["parents"];
                    // console.log(jobId_item + "--" + taskId_item  + "--" + status_item + "--" +
                    //     dataCenterId_item + "--" + vmId_item + "--" + time_item + "--" + startTime_item
                    //     + "--" + finishTime_item + "--" + depth_item + "--" + cost_item + "--" +parents_item
                    //     + "--" + realCost_item + "--" + realTime_item
                    // );
                    html += "<div class=\"layui-col-xs3\">";
                    html += "<input value='"+ jobId_item +"' hidden>";
                    html += "<input value='"+ taskId_item +"' hidden>";
                    html += "<input value='"+ status_item +"' hidden>";
                    html += "<input value='"+ dataCenterId_item +"' hidden>";
                    html += "<input value='"+ vmId_item +"' hidden>";
                    html += "<input value='"+ time_item +"' hidden>";
                    html += "<input value='"+ startTime_item +"' hidden>";
                    html += "<input value='"+ finishTime_item +"' hidden>";
                    html += "<input value='"+ depth_item +"' hidden>";
                    html += "<input value='"+ cost_item +"' hidden>";
                    html += "<input value='"+ parents_item +"' hidden>";
                    html += "<input value='"+ realCost_item +"' hidden>";
                    html += "<input value='"+ realTime_item +"' hidden>";
                    html += "<img id=cloudTask_" + jobId_item + " src=\"/images/task.jpg\" class=\"tasks\" style=\"width: 25%; height: auto\">"
                    html += "</div>";
                }
            }
            html += "</div>";
            var cloudDetail = $("#cloudDetail");
            cloudDetail.html(html)
            // console.log(cloudDetail.attr("id"));
            // console.log(cloudDetail.text());
        }else if(dataCenter == "fogServer"){
            var fog_vmId = parseInt(vmId) + parseInt(cloud_num);
            // console.log("fogServer:" + fog_vmId);

            var html = "";
            html += "<div class=\"layui-row\">";
            for(var i = 0; i < list.length; i++){
                var item = list[i];

                var dataCenterId_item = item["dataCenterId"];
                var vmId_item = item["vmId"];
                if(dataCenterId_item == "f-0" && fog_vmId == vmId_item){


                    var realTime_item = item["realTime"];
                    var realCost_item = item["realCost"];
                    if(realTime_item == undefined){
                        realTime_item = "--";
                    }
                    if(realCost_item == undefined){
                        realCost_item = "--";
                    }
                    var jobId_item = item["jobId"];
                    var taskId_item = item["taskId"];
                    var status_item = item["status"];
                    var dataCenterId_item = item["dataCenterId"];
                    var vmId_item = item["vmId"];
                    var time_item = item["time"];
                    var startTime_item = item["startTime"];
                    var finishTime_item = item["finishTime"];
                    var depth_item = item["depth"];
                    var cost_item = item["cost"];
                    var parents_item = item["parents"];
                    /*console.log(jobId_item + "--" + taskId_item  + "--" + status_item + "--" +
                        dataCenterId_item + "--" + vmId_item + "--" + time_item + "--" + startTime_item
                        + "--" + finishTime_item + "--" + depth_item + "--" + cost_item + "--" +parents_item
                        + "--" + realCost_item + "--" + realTime_item
                    );*/

                    html += "<div class=\"layui-col-xs3\">";
                    html += "<input value='"+ jobId_item +"' hidden>";
                    html += "<input value='"+ taskId_item +"' hidden>";
                    html += "<input value='"+ status_item +"' hidden>";
                    html += "<input value='"+ dataCenterId_item +"' hidden>";
                    html += "<input value='"+ vmId_item +"' hidden>";
                    html += "<input value='"+ time_item +"' hidden>";
                    html += "<input value='"+ startTime_item +"' hidden>";
                    html += "<input value='"+ finishTime_item +"' hidden>";
                    html += "<input value='"+ depth_item +"' hidden>";
                    html += "<input value='"+ cost_item +"' hidden>";
                    html += "<input value='"+ parents_item +"' hidden>";
                    html += "<input value='"+ realCost_item +"' hidden>";
                    html += "<input value='"+ realTime_item +"' hidden>";
                    html += "<img id=fogTask_" + jobId_item + " src=\"/images/task.jpg\" class=\"tasks\" style=\"width: 25%; height: auto\">"
                    html += "</div>";
                }
            }
            html += "</div>";

            var fogDetail = $("#fogDetail");
            fogDetail.html(html);
            // console.log(fogDetail.attr("id"));
            // console.log(fogDetail.text());
        }else if(dataCenter == "mobile"){
            var mobile_vmId = parseInt(vmId) + parseInt(cloud_num) + parseInt(fog_num);
            // console.log("mobile:" + mobile_vmId);

            var html = "";
            html += "<div class=\"layui-row\">";
            for(var i = 0; i < list.length; i++){
                var item = list[i];

                var dataCenterId_item = item["dataCenterId"];
                var vmId_item = item["vmId"];
                if(dataCenterId_item == "m-0-0" && mobile_vmId == vmId_item){


                    var realTime_item = item["realTime"];
                    var realCost_item = item["realCost"];
                    if(realTime_item == undefined){
                        realTime_item = "--";
                    }
                    if(realCost_item == undefined){
                        realCost_item = "--";
                    }

                    var jobId_item = item["jobId"];
                    var taskId_item = item["taskId"];
                    var status_item = item["status"];
                    var dataCenterId_item = item["dataCenterId"];
                    var vmId_item = item["vmId"];
                    var time_item = item["time"];
                    var startTime_item = item["startTime"];
                    var finishTime_item = item["finishTime"];
                    var depth_item = item["depth"];
                    var cost_item = item["cost"];
                    var parents_item = item["parents"];
                    /*console.log(jobId_item + "--" + taskId_item  + "--" + status_item + "--" +
                        dataCenterId_item + "--" + vmId_item + "--" + time_item + "--" + startTime_item
                        + "--" + finishTime_item + "--" + depth_item + "--" + cost_item + "--" +parents_item
                        + "--" + realCost_item + "--" + realTime_item
                    );*/
                    html += "<div class=\"layui-col-xs3\">";
                    html += "<input value='"+ jobId_item +"' hidden>";
                    html += "<input value='"+ taskId_item +"' hidden>";
                    html += "<input value='"+ status_item +"' hidden>";
                    html += "<input value='"+ dataCenterId_item +"' hidden>";
                    html += "<input value='"+ vmId_item +"' hidden>";
                    html += "<input value='"+ time_item +"' hidden>";
                    html += "<input value='"+ startTime_item +"' hidden>";
                    html += "<input value='"+ finishTime_item +"' hidden>";
                    html += "<input value='"+ depth_item +"' hidden>";
                    html += "<input value='"+ cost_item +"' hidden>";
                    html += "<input value='"+ parents_item +"' hidden>";
                    html += "<input value='"+ realCost_item +"' hidden>";
                    html += "<input value='"+ realTime_item +"' hidden>";
                    html += "<img id=mobileTask_" + jobId_item + " src=\"/images/task.jpg\" class=\"tasks\" style=\"width: 25%; height: auto\">"
                    html += "</div>";
                }
            }
            html += "</div>";

            var mobileDetail = $("#mobileDetail");
            mobileDetail.html(html);
            // console.log(mobileDetail.attr("id"));
            // console.log(mobileDetail.text());
        }
    });







    //Real Enviorment按钮
    $("#realOperate").click(function(){
        //判断是否存在仿真数据
        var simulate_flag = true;
        $(".tr-line").each(function(){
            var text = $(this).find("td:first").text();
            if(text == ""|| text ==null){
                // tips("There is no data to export");
                layer.msg("There is no simulation data , Please simulate first!",
                    {time:1000}
                );
                simulate_flag = false;
            }
        });
        if(!simulate_flag){
            return;
        }
        //加载loading图标
        $("#real_loading").css("display" , "block");

        var key = $("#output").val();
        var list = records[key];
        // operateReal(records);


        //定时执行单个任务

        //===========================================================
        var list_real = [];
        var currentIndex = 0;
        var realTimeClData;
        var data_tbody = $("#data_tbody");
        var td_realTime = new Object();
        var td_realCost = new Object();
        var td_realStartTime = new Object();
        var td_realFinishTime = new Object();
        var td_realStatus_btn = new Object();


        realTimeClData = setInterval(function(){
            var outputEntity = list[currentIndex];
            var jobId = outputEntity['jobId'];
            // console.log("currentIndex:" + currentIndex);
            data_tbody.find("tr").each(function(){
                var jobId_td = $(this).children("td").eq(0);
                if(jobId == jobId_td.text()){
                    var tr_current = $(this);
                    td_realStartTime = tr_current.children("td").eq(7);
                    td_realFinishTime = tr_current.children("td").eq(8);
                    td_realTime = tr_current.children("td").eq(10);
                    td_realCost = tr_current.children("td").eq(11);
                    td_realStatus_btn = tr_current.children("td").eq(13).find("button");

                }
            });

            $.ajax({
                type: "POST",
                url: "/realOperate",
                data:JSON.stringify(outputEntity),
                dataType: "text",
                async: false,
                contentType:"application/json",
                success: function (res) {
                    currentIndex++;

                    // console.log(res);
                    var res_obj = eval("("+res+")");
                    var real_item = res_obj["real_outputEntity"];
                    list_real.push(real_item);
                    var jobId = real_item["jobId"];
                    var realTime = real_item["realTime"];
                    var realCost = real_item["realCost"];
                    var realStartTime = real_item["realStartTime"];
                    var realFinishTime = real_item["realFinishTime"];

                    td_realStartTime.text(realStartTime);
                    td_realFinishTime.text(realFinishTime);
                    td_realCost.text(realCost);
                    td_realTime.text(realTime);
                    td_realStatus_btn.removeClass("btn_realStatus_failed");
                    td_realStatus_btn.addClass("btn_realStatus_success");

                    //执行成功取消定时器
                    if(currentIndex == (list.length)){
                        console.log("cleartimedata");
                        clearInterval(realTimeClData);

                        //删除加载图标
                        $("#real_loading").css("display" , "none");

                        //重新绘制四个状态图
                        getRealThreeObject(key , list_real);
                        pieChart(list_real);
                        lineChart(list_real);
                        ganttChart(list_real);

                    }

                },
                error: function(data){
                    console.log("error...");
                    currentIndex++;
                }
            });
        },2000);

        records[key] = list_real;





        //===========================================================


        return;
        // console.log(records);
        // console.log("list:" + list);
        /*var list_real = [];
        for(var i = 0 ; i < list.length; i++){
            var outputEntity = list[i];
            var jobId = outputEntity['jobId'];

            var data_tbody = $("#data_tbody");
            var tr_current = new Object();
            var td_realTime = new Object();
            var td_realCost = new Object();
            data_tbody.find("tr").each(function(){
                var jobId_td = $(this).children("td").eq(0);
                if(jobId == jobId_td.text()){
                    tr_current = $(this);
                    td_realTime = tr_current.children("td").eq(10);
                    td_realCost = tr_current.children("td").eq(11);
                }
            });
            $.ajax({
                url:"/realOperate",
                type:"POST",
                data:JSON.stringify(outputEntity),
                dataType:"text",
                async:false,
                contentType:"application/json",
                success:function (res) {
                    console.log(res);
                    var res_obj = eval("("+res+")");
                    var real_item = res_obj["real_outputEntity"];
                    list_real.push(real_item);

                    var jobId = real_item["jobId"];
                    var realTime = real_item["realTime"];
                    var realCost = real_item["realCost"];
                    var data_tbody = $("#data_tbody");
                    console.log("jobId:" + jobId);
                    console.log("realTime:" + realTime);
                    console.log("realCost:" + realCost);
                    td_realCost.text(realCost);
                    td_realTime.text(realTime);

                },
                error:function(res){
                    layer.msg("Failed to operate in real enviorment!");
                }
            });
        }
        records[key] = list_real;*/

    });

    //获取真实环境中执行的总时间，能耗，成本
    function getRealThreeObject(key , listReal){
        // console.log(listReal);
        var count = listReal.length;
        var outputJson = new Object();
        outputJson['count'] = count;
        for(var i = 0 ; i < listReal.length ; i++){
            var outputEntity = listReal[i];
            var outputItem = new Object();
            outputItem.jobId = outputEntity["jobId"];
            outputItem.taskId = outputEntity["taskId"];
            outputItem.status = outputEntity["status"];
            outputItem.dataCenterId = outputEntity["dataCenterId"];
            outputItem.vmId = outputEntity["vmId"];
            outputItem.time = outputEntity["time"];
            outputItem.startTime = outputEntity["startTime"];
            outputItem.finishTime = outputEntity["finishTime"];
            outputItem.depth = outputEntity["depth"];
            outputItem.cost = outputEntity["cost"];
            outputItem.parents = outputEntity["parents"];
            outputItem.realTime = outputEntity["realTime"];
            outputItem.realCost = outputEntity["realCost"];
            outputItem.workLoad = outputEntity["workLoad"];
            outputJson[i] = outputItem;
        }
        // var data = {"list": output};
        // console.log(outputJson);
        var realTotalTime;
        var realTotalCost;
        var mobileTotalEnergy;
        $.ajax({
            type: "POST",
            url: "/getRealTotal",
            data: JSON.stringify(outputJson),
            dataType: "text",
            async: false,
            contentType:"application/json",
            success: function (data) {
                var totalThree = eval("("+data+")");
                realTotalTime = totalThree['realTotalTime'];
                realTotalCost = totalThree['realTotalCost'];
                mobileTotalEnergy = totalThree['mobileTotalEnergy'];
                // console.log(data);
            },
            error: function(data){
                console.log("error...");
            }
        });
        // console.log(key);
        // console.log(three_object);
        for(var i = 0 ; i < three_object.length ; i++){
            var record = three_object[i];
            if(key.indexOf(record[0]) >= 0){
                record[4] = realTotalTime;
                record[5] = mobileTotalEnergy;
                record[6] = realTotalCost;
            }
            // console.log(record);
        }
        barChart(three_object);
    }

    // 标题栏图标点击链接
    $("#ahu_logo").click(function(){
        window.open("http://www.ahu.edu.cn/");
    });
    $("#deakin_logo").click(function(){
        window.open("http://www.deakin.edu.au/");
    });
    $("#swinburne_logo").click(function(){
        window.open("https://www.swinburne.edu.au/");
    });
    $("#monash_logo").click(function(){
        window.open("https://www.monash.edu/");
    });

});



function loadCustomXml(xmlName){
    console.log(xmlName);
    $("#custom_input").val(xmlName);
}
function parents_blur(obj){
    if(obj.className.indexOf("input_even")){
        // console.log(obj.className);
        obj.className = "input_odd";
    }
    else{
        obj.className = "input_even";
    }
}
function parents_focus(obj){
    obj.className += ' input_border';
}



//粒子特效Start
/*function n(n, e, t) {
    return n.getAttribute(e) || t
}
function e(n) {
    return document.getElementsByTagName(n)
}
function t() {
    var t = e("script"),
        o = t.length,
        i = t[o - 1];
    return {
        l: o,
        z: n(i, "zIndex", -1),
        o: n(i, "opacity", .5),
        c: n(i, "color", "0,0,0"),
        n: n(i, "count", 99)
    }
}
function o() {
    a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}
function i() {
    r.clearRect(0, 0, a, c);
    var n, e, t, o, m, l;
    s.forEach(function(i, x) {
        for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++) n = u[e],
        null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m), t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
    }),
        x(i)
}
var a, c, u, m = document.createElement("canvas"),
    d = t(),
    l = "c_n" + d.l,
    r = m.getContext("2d"),
    x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(n) {
            window.setTimeout(n, 1e3 / 45)
        },
    w = Math.random,
    y = {
        x: null,
        y: null,
        max: 2e4
    };
m.id = l,
    m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o,
    e("body")[0].appendChild(m),
    o(),
    window.onresize = o,
    window.onmousemove = function(n) {
        n = n || window.event,
            y.x = n.clientX,
            y.y = n.clientY
    },
    window.onmouseout = function() {
        y.x = null,
            y.y = null
    };
for (var s = [], f = 0; d.n > f; f++) {
    var h = w() * a,
        g = w() * c,
        v = 2 * w() - 1,
        p = 2 * w() - 1;
    s.push({
        x: h,
        y: g,
        xa: v,
        ya: p,
        max: 6e3
    })
}
u = s.concat([y]),
    setTimeout(function() {
            i()
        },
        100)*/
//粒子特效End



