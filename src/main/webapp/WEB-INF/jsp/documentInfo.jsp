<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/1/2 0002
  Time: 15:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Document Information</title>
    <link rel="shortcut icon" href="/images/edgeWR_logo.png">
    <link rel="stylesheet" href="/layui/css/layui.css">
    <link rel="stylesheet" type="text/css" href="/layui/css/jquery-ui-1.10.4.min.css">
    <link rel="stylesheet" href="/css/documentInfo.css">
</head>
<body>
<%----------------------------总布局开始----------------------------------------------%>
<div class="layui-container mainContainer">

    <%------------------------标题栏开始------------------------------%>
    <div class="layui-container title_main">
        <div class="layui-row">
            <div class="layui-col-xs3">
                <div class="logo_div"><img src="/images/edgeWR_logo.png" class="edge_img"></div>
            </div>
            <div class="layui-col-xs2">
                <div id="doc_div" class="doc_div">Documentation</div>
            </div>
            <div class="layui-col-xs2">
                <div id="developer_div" class="developer_div" >Developers</div>
            </div>
            <div class="layui-col-xs2">
                <div id="version_info" class="version_info">Versions</div>
            </div>
            <div class="layui-col-xs3">
            </div>
        </div>
    </div>
    <%------------------------标题栏结束------------------------------%>

    <%------------------------展示区域开始----------------------------%>
    <div class="main_middle layui-row">

        <div class="layui-row layui-col-space10">
            <%--            <div class="col-sm-3">--%>
            <%--                                <div class="list-group">--%>
            <%--                                    <a href="#Project">Project</a>--%>
            <%--                                    <a href="#License">License</a>--%>
            <%--                                    <a href="#Quick">Quick Start</a>--%>
            <%--                                    <a href="#Tutorial">Tutorial</a>--%>

            <%--                                </div>--%>
            <%--            </div>--%>

            <div class="layui-col-md2">
                <div class="sidenav">
                    <a href="#Project" class="class1">Project</a>
                    <a href="#Introduction" class="class2">Introduction</a>
                    <a href="#History" class="class2">History</a>
                    <a href="#Committers" class="class2">Committers</a>

                    <a href="#Links" class="class1">Resources&Links</a>
                    <a href="#Mailing" class="class2">Mailing lists</a>
                    <a href="#GitHub" class="class2">GitHub Link</a>
                    <a href="#ISEC" class="class2">ISEC Lab Link</a>

                    <%--                    <a href="#License" class="class1">License</a>--%>
                    <%--                    <a href="#Quick" class="class1">Quick Start</a>--%>
                    <%--                    <a href="#Tutorial" class="class1">Tutorial</a>--%>
                </div>

                <%--                <ul class=" layui-nav layui-nav-tree layui-inline" lay-filter="demo" style="margin-right: 10px;">--%>
                <%--                    <li class="layui-nav-item layui-nav-itemed">--%>
                <%--                    <li class="layui-nav-item"><a href="#Project">Project</a></li>--%>
                <%--                    <li class="layui-nav-item"><a href="#License">License</a></li>--%>
                <%--                    <li class="layui-nav-item"><a href="#Quick">Quick Start</a></li>--%>
                <%--                    <li class="layui-nav-item"><a href="#Tutorial">Tutorial</a></li>--%>
                <%--                </ul>--%>
            </div>
            <div class="layui-col-md9 ">

                <fieldset class="layui-elem-field">
                    <%--                    <legend ></legend>--%>
                    <div class="layui-field-box">
                        <br /><h1 id="Project" style="margin-top: -170px;padding-top: 170px;color:#017cee;">Project</h1>
                        <br /><h2 id="Introduction" style="margin-top: -150px;padding-top: 150px;">Introduction</h2><br />
                        <p>This work presents EdgeWorkflowReal, an edge computing based workflow execution engine for smart systems. EdgeWorkflowReal supports:
                            <br />&nbsp;&nbsp;(1) the real edge computing environment generation;
                            <br />&nbsp;&nbsp;(2) visualized modelling and binding computing tasks for different workflow structure;
                            <br />&nbsp;&nbsp;(3) automatic deployment, monitoring and evaluation of various workflow tasks in edge computing environment.

                        </p>
                        <br /><br />
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/2e7Vm7rM5Zc"
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                                gyroscope; picture-in-picture"
                                style="width: 960px; height: 645px; max-width: 100%"allowfullscreen>
                        </iframe>
                        <br />
                        <br />
                        <br />
                        <iframe src="//player.bilibili.com/player.html?aid=627857443&bvid=BV1Yt4y1a7K9&cid=257341945&page=1"
                                scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"
                                style="width: 960px; height: 645px; max-width: 100%">
                        </iframe>
                        <br />
                        <br />

                        <br /><h2 id="History" style="margin-top: -150px;padding-top: 150px;">History</h2><br />
                        <p>EdgeWorkflowReal was started in November 2020 by Xiao Liu. It was open source from the very first commit and officially brought under the GitHub and announced in December 2020.</p>
                        <br /><h2 id="Committers" style="margin-top: -150px;padding-top: 150px;">Committers</h2><br />
                        <p>
                            @Xiao Liu&nbsp;&nbsp;(Senior Lecturer)<br />
                            @Xuejun Li&nbsp;&nbsp;(Professor)<br />
                            @Yun Yang&nbsp;&nbsp;(Professor)<br />
                            @John Grundy&nbsp;&nbsp;(Professor)<br />
                            @Ding Ran&nbsp;&nbsp;(Master Degree Candidate)<br />
                            @Jia Xu&nbsp;&nbsp;(PhD)<br />
                            @Lingmin Fan&nbsp;&nbsp;(Master Graduate)<br />
                            @Lina Gong&nbsp;&nbsp;(Master Degree Candidate)<br />
                            @Gan Li&nbsp;&nbsp;(Master Degree Candidate)<br />
                            @Liju Chu&nbsp;&nbsp;(Master Degree Candidate)<br />
                            @Yansong Zhang&nbsp;&nbsp;(Master Degree Candidate)<br />
                            @Dan Lu&nbsp;&nbsp;(UI Designer)
                        </p>



                        <%--                        <br /><h2>Resources & links</h2><br />--%>


                    </div>

                </fieldset>

                <fieldset class="layui-elem-field">
                    <div class="layui-field-box">
                        <h1 id="Links" style="margin-top: -150px;padding-top: 150px;color:#017cee;">Resources&Links</h1>
                        <br>
                        <h2 id="Mailing" style="margin-top: -150px;padding-top: 150px;">Mailing lists</h2><br />
                        <table border="1">

                            <tr>
                                <th>Name</th>
                                <th>University</th>
                                <th>Email Address</th>
                            </tr>
                            <tr>
                                <td>Xiao Liu</td>
                                <td>Deakin University </td>
                                <td>xiao.liu@deakin.edu.au</td>
                            </tr>
                            <tr>
                                <td> Xuejun Li</td>
                                <td>Anhui University</td>
                                <td>xjli@ahu.edu.cn</td>
                            </tr>
                            <tr>
                                <td>Yun Yang</td>
                                <td>Swinburne University of Technology</td>
                                <td>yyang@swin.edu.au</td>
                            </tr>
                            <tr>
                                <td>John Grundy</td>
                                <td>Monash University</td>
                                <td>john.grundy@monash.edu</td>
                            </tr>
                            <tr>
                                <td>Ran Ding</td>
                                <td>Anhui University</td>
                                <td>dingran1012@163.com</td>
                            </tr>
                            <tr>
                                <td>Jia Xu</td>
                                <td>Anhui University</td>
                                <td>xujia_ahu@qq.com</td>
                            </tr>
                            <tr>
                                <td>Lingmin Fan</td>
                                <td>Anhui University</td>
                                <td>870138190@qq.com</td>
                            </tr>
                            <tr>
                                <td>Lina Gong</td>
                                <td>Anhui University</td>
                                <td>Linagln@qq.com</td>
                            </tr>
                            <tr>
                                <td>Gan Li</td>
                                <td>Anhui University</td>
                                <td>754439055@qq.com</td>
                            <tr>
                            <tr>
                                <td>Liju Chu</td>
                                <td>Anhui University</td>
                                <td>clj1118@163.com</td>
                            </tr>
                            <tr>
                                <td>Yansong Zhang</td>
                                <td>Anhui University</td>
                                <td>first.song@qq.com</td>
                            </tr>
                            <tr>
                                <td>Dan Lu</td>
                                <td>Anhui University</td>
                                <td>1157136694@qq.com</td>
                            <tr>



                        </table>

                        <br />
                        <h2 id="GitHub" style="margin-top: -150px;padding-top: 150px;">GitHub Link</h2><br />
                        <a href="https://github.com/ISEC-AHU/EdgeWorkflowReal/" target="_blank" class="class3">https://github.com/ISEC-AHU/EdgeWorkflowReal/</a><br />
                        <br />
                        <h2 id="ISEC" style="margin-top: -150px;padding-top: 150px;">ISEC Lab Link</h2><br />
                        <a href="http://isec.ahu.edu.cn/" target="_blank"class="class3">http://isec.ahu.edu.cn/</a><br />


                        <%--                        <p>--%>
                        <%--                        Xiao Liu	Deakin University	xiao.liu@deakin.edu.au<br />--%>
                        <%--                        Lingmin Fan	   Anhui University	870138190@qq.com<br />--%>
                        <%--                        Jia Xu	  Anhui University	xujia_ahu@qq.com<br />--%>
                        <%--                        Xuejun Li	Anhui University	xjli@ahu.edu.cn<br />--%>
                        <%--                        Lina Gong	Anhui University	Linagln@qq.com<br />--%>
                        <%--                        John Grundy	Monash University	john.grundy@monash.edu<br />--%>
                        <%--                        Yun Yang	Swinburne University of Technology	yyang@swin.edu.au<br />--%>
                        <%--                        Ran Ding	Anhui University	dingran1012@163.com<br />--%>
                        <%--                        Liju Chu	Anhui University	clj1118@163.com<br />--%>
                        <%--                        Yansong Zhang	Anhui University	clj1118@163.com<br />--%>
                        <%--                        </p>--%>



                        <%--                        <fieldset id="slicense" class="layui-elem-field">--%>
                        <%--                        ahahhaahah--%>
                        <%--                        </fieldset>--%>


                    </div>
                </fieldset>

                <%--                <fieldset class="layui-elem-field">--%>
                <%--                    <div class="layui-field-box">--%>
                <%--                        <br /><h1 id="Quick" style="margin-top: -200px;padding-top: 200px;color:#017cee;">Quick Start</h1><br />--%>
                <%--                        <div>--%>
                <%--                            <br /><a href="http://www.baidu.com/" target="_blank">Baidu!</a><br />--%>
                <%--                        </div>--%>


                <%--                    </div>--%>
                <%--                </fieldset>--%>

                <%--                <fieldset class="layui-elem-field">--%>
                <%--&lt;%&ndash;                    <legend id="Tutorial">Tutorial</legend>&ndash;%&gt;--%>
                <%--                    <div class="layui-field-box">--%>
                <%--                        <br /><h1 id="Tutorial" style="margin-top: -200px;padding-top: 200px;color:#017cee;">Tutorial</h1><br />--%>
                <%--                        1<br />1<br />1<br />1<br />1<br />--%>
                <%--                        2<br />1<br />1<br />1<br />1<br />--%>
                <%--                        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />--%>
                <%--                        <br /><br /><br /><br /><br /><br /><br />--%>

                <%--                    </div>--%>
                <%--                </fieldset>--%>
                <%--            </div>--%>
                <%--                    <h3 id="Project">Project</h3>--%>
                <%--            <h3 id="License">License</h3>--%>
                <%--            <h3 id="Quick">Quick Start</h3>--%>
                <%--            <h3 id="Tutorial">Tutorial</h3>--%>
                <%--            <div class="layui-col-md4">--%>
                <%--                1/3--%>
                <%--            </div>--%>
            </div>
        </div>
        <%------------------------展示区域结束----------------------------%>

    </div>

</body>
<script type="text/javascript" src="/jquery/jquery.min.js"></script>
<script type="text/javascript" src="/layui/layui.all.js"></script>
<script type="text/javascript" src="/layui/layui.js"></script>
<script>
    //注意：选项卡 依赖 element 模块，否则无法进行功能性操作
    /*layui.use('element', function(){
        var element = layui.element;

        //…
    });*/
    //标题栏Developers
    $("#developer_div").click(function(){

        layer.open({
            type: 2,
            offset: "140px",
            title: "Developers\' Informations",
            content: "/developersInfo",
            skin: "title-style",
            area: ['700px', '500px'],
            cancel: function(){

            }
        });
    });

    //标题栏Versions
    $("#version_info").click(function(){
        layer.open({
            type: 2,
            offset: "140px",
            title: "Version Informations",
            content: "/versionInfo",
            skin: "title-style",
            area: ['700px', '500px'],
            cancel: function(){

            }
        });
    });


</script>
<style>

</style>
</html>