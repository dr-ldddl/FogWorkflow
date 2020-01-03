<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>FogWorkflowSim</title>
    <meta charset="utf-8">
    <script src="/jquery/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/layui/layui.all.js"></script>
    <script type="text/javascript" src="/layui/layui.js"></script>
    <script type="text/javascript" src="/js/jquery.table2excel.js"></script>
    <script type="text/javascript" src="/js/index.js"></script>
    <%--<script type="text/javascript" src="/js/global.js"></script>--%>
    <link rel="stylesheet" href="/css/index.css">
    <link rel="stylesheet" href="/layui/css/layui.css">
    <%--/////////////////////////////////////////////////////////////////////////////////--%>

    <%--/////////////////////////////////////////////////////////////////////////////////--%>
</head>
<body>
<script>
    //注意：导航 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function(){
        var element = layui.element;

        //…
    });
</script>
<%--标题栏start--%>
<div class="title-bar">

    <div class="title-logo">
        <img src="/images/titleLog.png" alt="...">
    </div>
    <div class="developer">
        <div class="developer_logo">
            <img src="/images/developers.png">
        </div>
        <div class="developer_png">
            System<br>Informations
        </div>
    </div>
    <div id="login_div" class="user buttons">
        <div class="layui-btn-group">
            <button id="user_login" type="button" class="layui-btn layui-btn-radius layui-btn-primary">Login</button>
            <button id="user_register" type="button" class="layui-btn layui-btn-radius layui-btn-primary">Register</button>
        </div>
    </div>
    <div id="userinfo_div" class="user" hidden>
        <ul class="layui-nav" style="background-color: #4597E6">
            <%--<li class="layui-nav-item">
                <a href="">个人中心<span class="layui-badge-dot"></span></a>
            </li>--%>
            <li class="layui-nav-item">
                <a id="username_a"><img src="//t.cn/RCzsdCq" class="layui-nav-img">我</a>
                <dl class="layui-nav-child">
                    <%--<dd><a id="changeInfo" href="javascript:;">修改信息</a></dd>--%>
                    <dd><a  id="logout" href="javascript:;">Logout</a></dd>
                </dl>
            </li>
        </ul>
    </div>
    <div class="title-line1">FogWorkflowSim: An Automated Simulation Toolkit for</div>
    <div class="title-line2">Workflow Performance Evaluation in Fog Computing</div>
</div>
<%--标题栏end--%>

<%--底部logo start--%>
<div class="foot-logo">
    <%--<div class="clustrrmap"><br><div style="text-align:left"><a href="http://www.clustrmaps.com/map/sites.google.com/site/drxiaoliu/" style="line-height:1.6;font-size:10pt;background-color:transparent" title="Visitor Map for sites.google.com/site/drxiaoliu/" rel="nofollow"><img src="//www.clustrmaps.com/map_v2.png?u=qPeh&amp;d=g_dgqlQ4X6dkN1YcoFlwuHFkkaOhicHGj3rCFl246DI"></a></div>--%>
    <img src="/images/schoolLogo.png">
</div>
<div class="foot-QRCode">
    <div class="clustrmap">
           <%-- <a href="http://www.clustrmaps.com/site/1b10d" style="line-height:1.6;font-size:10pt;background-color:transparent;margin-right: 10px;" title="Visitor Map for iseclab.org.cn" rel="nofollow">
                <img width="150%" src="//www.clustrmaps.com/map_v2.png?u=qPeh&amp;d=g_dgqlQ4X6dkN1YcoFlwuHFkkaOhicHGj3rCFl246DI">
            </a>--%>
               <%--<a href="http://www.clustrmaps.com/site/1b10d" style="line-height:1.6;font-size:10pt;background-color:transparent;margin-right: 10px;" title="Visitor Map for iseclab.org.cn" rel="nofollow">
                   <img width="150%" src="//www.clustrmaps.com/map_v2.png?u=qPeh&amp;d=g_dgqlQ4X6dkN1YcoFlwuHFkkaOhicHGj3rCFl246DI">
               </a>--%>
               <script type="text/javascript" id="clustrmaps" src="//cdn.clustrmaps.com/map_v2.js?d=OZ5USxbSCBbe0YwvtXfxIlsvW6PMudDLV8qXCA4EX4M&cl=ffffff&w=a"></script>
    </div>
    <div class="foot-QRCode1">
        <div class="youtube">
            <span>Scan QR code to enter</span>
        </div>
        <img src="/images/QRCode01.png">
    </div>
    <div class="foot-QRCode2">
        <div class="github">
            <span>Scan QR code to enter</span>
        </div>
        <img src="/images/QRCode02.png">
    </div>
</div>
<%--底栏 start--%>
<div class="foot-bar">
    <div>Copyright ©  Intelligent Software and Edge Computing Lab, Anhui University</div>
    <div id="versions">Version:--</div>
    <div id="visitcount">
        <span>Total number of visits：-- || </span>
        <span>Total number of visits today：--  </span>
    </div>
</div>
<%--底栏 start--%>
<div style="display: none" id="parent_cloud_tips"></div>
<div style="display: none" id="chart_content"></div>
<div class="main-div">
    <div class="middle-div">
        <%--左边--%>
        <div class="left-div">
            <div class="fog-environment-div">
                <div class="setting-title-div">
                    Fog Computing Environment Setting
                </div>
                <div class="number-left-div">
                    <div class="fog-top-div">
                        <div class="number-div">
                            <div class="number-label">Number of Cloud Servers:</div>
                            <div class="number_div">
                                <input id="cloudServer_input" type="text" class="number_input">
                                <select id="cloudServer" class="choose-imgs">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div class="show-imgs" id="cloudServerImgs"></div>
                        </div>
                        <div class="number-div">
                            <div class="number-label">Number of Fog Nodes:</div>
                            <div class="number_div">
                                <input id="fogServer_input" type="text" class="number_input">
                                <select id="fogServer" class="choose-imgs">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div class="show-imgs" id="fogServerImgs"></div>
                        </div>
                        <div class="number-div">
                            <div class="number-label">Number of End Devices:</div>
                            <div class="number_div">
                                <input id="mobile_input" type="text" class="number_input">
                                <select id="mobile" class="choose-imgs">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div class="show-imgs" id="mobileImgs"></div>
                        </div>
                    </div>
                    <%--<button class="more-btn layui-btn layui-btn-radius layui-btn-primary" id="more">More Details</button>--%>
                    <button class="more-btn layui-btn layui-btn-radius layui-btn-normal" id="more">More Details</button>
                </div>
            </div>
            <div class="action-div">
                <div class="action-div-1">
                    <%--<button class="action-btn layui-btn layui-btn-radius layui-btn-primary" id="simulation">Start Simulation</button>
                    <button class="action-btn layui-btn layui-btn-radius layui-btn-primary" id="compare">Compare</button>--%>
                    <button class="action-btn layui-btn layui-btn-radius layui-btn-normal" id="simulation">Start Simulation</button>
                    <button class="action-btn layui-btn layui-btn-radius layui-btn-normal" id="compare">Compare</button>
                </div>
                <div class="action-div-1">
                    <%--<button class="action-btn layui-btn layui-btn-radius layui-btn-primary" id="setting">Algorithms Setting</button>
                    <button id="export" class="action-btn layui-btn layui-btn-radius layui-btn-primary">Export</button>--%>
                    <button class="action-btn layui-btn layui-btn-radius layui-btn-primary" id="setting">Algorithms Setting</button>
                    <button id="export" class="action-btn layui-btn layui-btn-radius layui-btn-primary">Export</button>
                </div>
            </div>
        </div>
        <div class="line-sep-div"></div>
        <%--右边--%>

        <div class="right-div">
            <div class="strategy-div">
                <div class="setting-title-div">
                    Strategy & Algorithms & Objective
                </div>
                <div class="strategy-content-div">
                    <div class="strategy-label">Offloading Strategies:</div>
                    <div class="strategy-label">
                        <select id="strategy">
                            <option value="0"></option>
                            <option value="1">All-in-Fog</option>
                            <option value="2">All-in-Cloud</option>
                            <option value="3">Simple</option>
                        </select>
                    </div>
                </div>


                <div class="scheduling-div">
                    Scheduling Algorithms:
                </div>
                <div class="strategy-content-div">
                    <div class="minmin-input">
                        <input id="minmin" type="checkbox" value="0" class="al_check" checked/> MINMIN
                    </div>
                    <div class="minmin-input">
                        <input type="checkbox" value="1" class="al_check"/> MAXMIN
                    </div>
                    <div class="minmin-input">
                        <input type="checkbox" value="2" class="al_check"/> FCFS
                    </div>
                    <div class="round-input">
                        <input type="checkbox" value="3" class="al_check"/> ROUDROBIN
                    </div>
                </div>
                <div class="strategy-content-div">
                    <div class="minmin-input">
                        <input type="checkbox" value="4" class="al_check"/> PSO
                    </div>
                    <div class="ga-input">
                        <input type="checkbox" value="5" class="al_check"/> GA
                    </div>
                </div>
                <div class="strategy-content-div">
                    <div class="objective-label">Objective:</div>

                    <%--<div class="minmin-input">
                        <input id="time" type="radio" value="0" name="radioGroup" checked="checked"/> Time
                    </div>
                    <div class="minmin-input">
                        <input id="energy" type="radio" value="1" name="radioGroup"/> Energy
                    </div>
                    <div class="minmin-input">
                        <input id="cost" type="radio" value="2" name="radioGroup"/> Cost
                    </div>--%>
                    <div class="radio_option">
                         <div class="radio_input" style="margin-left:-110px;">
                            <input id="time" type="radio" value="0" name="radioGroup" checked="checked" value="Time"/>
                            <label for="time"></label>
                             &nbsp;<span>Time</span>
                        </div>
                        <div class="radio_input">
                            <input id="energy" type="radio" value="1" name="radioGroup"/>
                            <label for="energy"></label>
                            &nbsp;<span>Energy</span>
                        </div>
                        <div class="radio_input" style="margin-left:30px;">
                            <input id="cost" type="radio" value="2" name="radioGroup"/>
                            <label for="cost"></label>
                            &nbsp;<span>Cost</span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="workflow-div">
                <div class="setting-title-div">
                    Workflow Setting
                </div>
                <div class="strategy-content-div">
                    <div class="type-label">Type:</div>
                    <select id="sType" class="type-select"></select>
                    <div class="amount-label">Amount:</div>
                    <select class="amount-select" id="amount">
                        <option value="1">20</option>
                        <option value="1">20</option>
                        <option value="1">20</option>
                    </select>
                </div>
                <div class="strategy-content-div">
                    <div class="custom-checkbox">
                        <input id="custom" type="checkbox"/> Custom
                    </div>
                    <input class="custom-input" id="custom_input" type="text" disabled="disabled"/>
                    <input class="custom-input" style="display: none" type="file" id="select-file"/>
                    <%--<button class="layui-btn layui-btn-radius layui-btn-primary" id="select_file_btn" disabled="disabled" style="margin-left:10px;margin-top:-4px;">Select File</button>--%>
                    <button id="select_file_btn" class="layui-btn layui-btn layui-btn-radius layui-btn-normal" disabled="disabled">Select File</button>
                </div>
                <div class="strategy-content-div">
                    <div class="deadline-label">Deadline:</div>
                    <div>
                        <input class="deadline-input" type="text" id="deadline"/>
                        <button id="draw_workflow" class="layui-btn layui-btn-radius layui-btn-normal">Draw Workflow</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%--<div class="middle-sep-div"></div>--%>
</div>
<div class="main-bottom-div">
    <div class="bottom-div">
        <div class="output-div">
            <div class="output-label">Output result display area:</div>
            <select class="output-input" id="output"></select>
            <div id="output-time" class="output-time"></div>
        </div>
    </div>
        <table class="layui-table table" lay-size="sm" lay-even lay-skin="nob" id="output-table">
            <thead>
                <th>Job ID</th>
                <th>Task ID</th>
                <th>Status</th>
                <th>Datacenter ID</th>
                <th>VM ID</th>
                <th>Time</th>
                <th>Start Time</th>
                <th>Finish Time</th>
                <th>Depth</th>
                <th>Cost</th>
                <th>Parents</th>
            </thead>
            <tbody id="data_tbody">


            </tbody>
        </table>
    </div>
</div>

</body>
</html>
