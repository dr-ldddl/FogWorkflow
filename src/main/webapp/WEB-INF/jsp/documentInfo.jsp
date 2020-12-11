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
    <title>Documentation</title>
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
    <div class="layui-container">

        <div class="layui-row">

            <div class="layui-col-md3 main_left">
                <div class="sidenav">
                    <a href="#Project" class="class1">Project</a>
                    <a href="#Introduction" class="class2">Introduction</a>
                    <a href="#History" class="class2">History</a>
                    <a href="#Committers" class="class2">Committers</a>

                    <a href="#Links" class="class1">Resources&Links</a>
                    <a href="#Mailing" class="class2">Mailing lists</a>
                    <a href="#GitHub" class="class2">GitHub Link</a>
                    <a href="#ISEC" class="class2">ISEC Lab Link</a>
                </div>
            </div>

            <div class="layui-col-md9 main_right">
                <div class="">
                    <fieldset class="layui-elem-field">
                        <div class="layui-field-box">
                            <br /><h1 id="Project" style="color:#017cee;">Project</h1>
                            <br /><h2 id="Introduction" style="">Introduction</h2><br />
                            <p>This work presents EdgeWorkflowReal, an edge computing based workflow execution engine for smart systems. EdgeWorkflowReal supports:
                                <br />&nbsp;&nbsp;(1) the real edge computing environment generation;
                                <br />&nbsp;&nbsp;(2) visualized modelling and binding computing tasks for different workflow structure;
                                <br />&nbsp;&nbsp;(3) automatic deployment, monitoring and evaluation of various workflow tasks in edge computing environment.

                            </p>
                            <br /><br />
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/2e7Vm7rM5Zc"
                                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                                gyroscope; picture-in-picture"
                                    style="position:relative; width: 99%; height: 645px; max-width: 100%"allowfullscreen>
                            </iframe>
                            <br />
                            <br />
                            <br />
                            <iframe src="//player.bilibili.com/player.html?aid=627857443&bvid=BV1Yt4y1a7K9&cid=257341945&page=1"
                                    scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"
                                    style="position:relative;width: 99%; height: 645px; max-width: 100%">
                            </iframe>
                            <br />
                            <br />

                            <br /><h2 id="History" style="">History</h2><br />
                            <p>EdgeWorkflowReal was started in November 2020 by Xiao Liu. It was open source from the very first commit and officially brought under the GitHub and announced in December 2020.</p>
                            <br /><h2 id="Committers" style="">Committers</h2><br />
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
                        </div>

                    </fieldset>

                    <fieldset class="layui-elem-field">
                        <div class="layui-field-box">
                            <h1 id="Links" style="color:#017cee;">Resources&Links</h1>
                            <br>
                            <h2 id="Mailing" style="">Mailing lists</h2><br />
                            <table border="1" class="layui-table table" lay-size="sm" lay-even lay-skin="nob">
                                <thead>
                                    <td>Name</td>
                                    <td>University</td>
                                    <td>Email Address</td>
                                </thead>
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
                            <h2 id="GitHub" style="">GitHub Link</h2><br />
                            <a href="https://github.com/ISEC-AHU/EdgeWorkflowReal/" target="_blank" class="class3">https://github.com/ISEC-AHU/EdgeWorkflowReal/</a><br />
                            <br />
                            <h2 id="ISEC" style="">ISEC Lab Link</h2><br />
                            <a href="http://isec.ahu.edu.cn/" target="_blank"class="class3">http://isec.ahu.edu.cn/</a><br />

                        </div>
                    </fieldset>
                </div>
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
    //粒子特效Start
    function n(n, e, t) {
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
            100)
    //粒子特效End

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