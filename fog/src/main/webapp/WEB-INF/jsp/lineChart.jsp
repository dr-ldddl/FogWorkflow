<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>FogWorkflowSim</title>
    <meta charset="utf-8">
    <script src="/jquery/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/layui/layui.all.js"></script>
    <link rel="stylesheet" href="/css/chart.css">
</head>
<body>
<div id="main" style="width: 900px;height:400px;"></div>
<script src="/echarts/echarts.min.js"></script>
<script>
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    var data = parent.$("#chart_content").text();
    var json = eval("("+data+")");

    // 指定图表的配置项和数据
    var option = {
        xAxis: {
            name: json.x_name,
            type: 'category',
            data: json.x,
        },
        yAxis: {
            name: json.y_name,
            type: 'value',
            min: function (value) {
                return parseInt(value.min) - 5;
            }
        },
        series: [{
            data: json.y,
            type: 'line'
        }]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
</body>
</html>
