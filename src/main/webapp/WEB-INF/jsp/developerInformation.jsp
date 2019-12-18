<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>FogWorkflowSim</title>
    <meta charset="utf-8">
    <script src="/jquery/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/layui/layui.all.js"></script>
    <script type="text/javascript" src="/layui/layui.js"></script>
    <script type="text/javascript" src="/js/developerInformation.js"></script>
    <link rel="stylesheet" href="/layui/css/layui.css">
</head>
<style>
.developInfo{
    width:580px;
    margin-left:10px;
    margin-right:10px;
}

</style>
<body>

<table class="developInfo layui-table">
    <colgroup>
        <col width="150">
        <col width="200">
        <col>
    </colgroup>
    <thead>
    <tr>
        <th>Developer Name</th>
        <th>University</th>
        <th>E-mail</th>
    </tr>
    </thead>
    <tbody id="developer_tb">

    </tbody>
</table>

</body>
</html>