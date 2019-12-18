<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/11/21 0021
  Time: 9:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>draw workflow</title>
    <script type="text/javascript" src="/jquery/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/layui/layui.all.js"></script>
    <script type="text/javascript" src="/layui/layui.js"></script>
    <%--<script type="text/javascript" src="/jquery/raphael.min.js"></script>--%>
    <link rel="stylesheet" href="/layui/css/layui.css">
    <!--<script type="text/javascript" src="js/jquery-1.8.1.min.js"></script>-->
</head>
<body>
<div class="layui-tab">
    <ul class="layui-tab-title">
        <li class="layui-this">Montage</li>
        <li>CyberShake</li>
        <li>Epigenomics</li>
        <li>Inspiral</li>
        <li>Sipht</li>
        <li>Other</li>
    </ul>
    <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">
            <%@ include file="DrawWorkflow/montage.jsp"%>
        </div>
        <div class="layui-tab-item">
            <%@include file="DrawWorkflow/cyberShake.jsp"%>
        </div>
        <div class="layui-tab-item">
            <%@include file="DrawWorkflow/epigenomics.jsp"%>
        </div>
        <div class="layui-tab-item">
            <%@include file="DrawWorkflow/inspiral.jsp"%>
        </div>
        <div class="layui-tab-item">
            <%@include file="DrawWorkflow/sipht.jsp"%>
        </div>
        <div class="layui-tab-item">
            <%@include file="DrawWorkflow/other.jsp"%>
        </div>
    </div>
</div>

<%--<script>
    //注意：选项卡 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function(){
        var element = layui.element;

        //…
    });
</script>--%>
<div id="raphael"></div>
<%--<script type="text/javascript">
    //整体画布
    var paper = Raphael("raphael", 1200, 500);
    //环节数据
    var jsonA = [{'taskId':201,'name':'任务1','duration':2,'xAxis':100,'yAxis':0},
        {'taskId':202,'name':'任务2','duration':3,'xAxis':200,'yAxis':0},
        {'taskId':203,'name':'任务3','duration':5,'xAxis':300,'yAxis':0},
        {'taskId':204,'name':'任务4','duration':1,'xAxis':200,'yAxis':100},
        {'taskId':205,'name':'任务5','duration':1,'xAxis':400,'yAxis':0}];
    //环节与环节直接的关系
    var jsonB = [{'taskId':201,'pTaskId':202},
        {'taskId':202,'pTaskId':203},
        {'taskId':201,'pTaskId':204},
        {'taskId':203,'pTaskId':205},
        {'taskId':204,'pTaskId':205}];
    var jsonC =[];
    //循环调用执行生成环节
    for(var i in jsonA){
        createNode(jsonA[i]);//环节绘制
    }
    function createNode(obj){
        var move = function (dx, dy, x, y) {
            //console.log(dx, dy, x, y);
            var attr = {x: this.xx + dx, y: this.yy + dy};
            this.attr(attr);
            var lb = this.data("cooperative");
            //console.log(this.xx, dx, this.yy, dy)
            var attr1 = {x: this.xx+ dx+this.attr("width") / 2, y: this.yy+dy+this.attr("height") / 2};
            lb.attr(attr1);
            /*重绘指定线路*/
            jsonC=[];
            for (var i in jsonB) {
                if (jsonB[i].taskId==obj.taskId) {
                    jsonC.push(jsonB[i]);
                }
                if (jsonB[i].pTaskId==obj.taskId) {
                    jsonC.push(jsonB[i]);
                }
            }
            for(var i in jsonC){
                var pn=paper.getById(jsonC[i].taskId+"_"+jsonC[i].pTaskId);
                pn.remove();
                drawArr(jsonC[i]);
            }
        }, start = function (x, y) {
            this.attr({opacity: 1});
            this.lastX = x;
            this.lastY = y;
            this.xx = this.attr("x");
            this.yy = this.attr("y");
        },up = function () {
            this.attr({opacity: 0.8});
        };
        this.text = paper.text(obj.xAxis+25, obj.yAxis+25,obj.duration).attr({
            "fill":"#17A9C6", // font-color
            "font-size":12, // font size in pixels
            "text-anchor":"start",
            "font-family":"century gothic" // font family of the text
        });
        var p =paper.rect(obj.xAxis, obj.yAxis, 50, 50, 10);
        p.attr({"fill":"green", stroke:"#666", 'opacity':0.3,"title":obj.name});
        p.id=obj.taskId;
        p.drag(move, start, up);
        //p.dblclick(msg(obj));
        p.dblclick(function a() {
                jsonC=[];
                for (var i in jsonB) {
                    if (jsonB[i].taskId==obj.taskId) {
                        // alert("<<<<<<<<"+jsonB[i].taskId);//获得该id下的名字
                        jsonC.push(jsonB[i]);
                    }
                    if (jsonB[i].pTaskId==obj.taskId) {
                        // alert("<<<<<<<<"+jsonB[i].taskId);//获得该id下的名字
                        jsonC.push(jsonB[i]);
                    }
                }
                console.log(jsonC);
            }
        );
        p.data("cooperative", this.text).toBack();
    }
    //循环执行
    for(var i in jsonB){
        drawArr(jsonB[i]);
    }
    function drawArr(obj) {
        var obj1=paper.getById(obj.taskId);
        var obj2=paper.getById(obj.pTaskId);
        var json1 = getStartEnd(obj1, obj2);
        var x2=(json1.end.x-json1.start.x)/2;
        var y2=(json1.end.y-json1.start.y)/2;
        // paper.path("M "+ json1.start.x +" "+json1.start.y  +" h "+x2+"   v "+ y2+"   h "+x2+" ").attr({
        var b=paper.path("M "+ json1.start.x +" "+json1.start.y  +" L "+ json1.end.x +" "+json1.end.y  +"");
        b.attr({
            stroke: "blue",
            "stroke-width": "2px",
            "arrow-end": "classic-wide-long" });
        b.id=obj.taskId+"_"+obj.pTaskId;
        return obj;
    };


    function getStartEnd(obj1, obj2) {
        var bb1 = obj1.getBBox(),
            bb2 = obj2.getBBox();
        var p = [
            { x: bb1.x + bb1.width / 2, y: bb1.y - 1 },
            { x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1 },
            { x: bb1.x - 1, y: bb1.y + bb1.height / 2 },
            { x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2 },
            { x: bb2.x + bb2.width / 2, y: bb2.y - 1 },
            { x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1 },
            { x: bb2.x - 1, y: bb2.y + bb2.height / 2 },
            { x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2 }
        ];
        var d = {}, dis = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 4; j < 8; j++) {
                var dx = Math.abs(p[i].x - p[j].x),
                    dy = Math.abs(p[i].y - p[j].y);
                if (
                    (i == j - 4) ||
                    (((i != 3 && j != 6) || p[i].x < p[j].x) &&
                        ((i != 2 && j != 7) || p[i].x > p[j].x) &&
                        ((i != 0 && j != 5) || p[i].y > p[j].y) &&
                        ((i != 1 && j != 4) || p[i].y < p[j].y))
                ) {
                    dis.push(dx + dy);
                    d[dis[dis.length - 1]] = [i, j];
                }
            }
        }
        if (dis.length == 0) {
            var res = [0, 4];
        } else {
            res = d[Math.min.apply(Math, dis)];
        }
        var result = {};
        result.start = {};
        result.end = {};
        result.start.x = p[res[0]].x;
        result.start.y = p[res[0]].y;
        result.end.x = p[res[1]].x;
        result.end.y = p[res[1]].y;
        return result;
    }

    function msg(obj)
    {
        alert(obj.taskId) ;
        for (var i in jsonB) {
            if ([i].taskId==this.id) {
                alert("<<<<<<<<"+[i].taskId);//获得该id下的名字
            }
        }
    }
</script>--%>
</body>
</html>