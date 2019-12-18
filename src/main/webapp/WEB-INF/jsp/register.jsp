<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/11/29 0029
  Time: 15:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>registerPage</title>
    <link rel="stylesheet" href="/layui/css/layui.css" media="all">
    <link rel="stylesheet" href="/css/login.css" media="all">
    <style>
        /* 覆盖原框架样式 */
        .layui-elem-quote{background-color: inherit!important;}
        .layui-input, .layui-select, .layui-textarea{background-color: inherit; padding-left: 30px;}
        .register{
            width: 425px;
            margin-top: 5px;
            margin-left: 13px;
        }
    </style>
    <link id="layuicss-layer" rel="stylesheet" href="/layui/css/layer_v3.1.1.css" media="all">
</head>
<body>
<div class="register_main">
        <form class="layui-form zyl_pad_01" action="">
            <div class="layui-col-sm12 layui-col-md12">
                <div class="layui-form-item">
                    <input type="text" name="username" lay-verify="required|userName" autocomplete="off" placeholder="用户名" class="layui-input">
                    <i class="layui-icon layui-icon-username zyl_lofo_icon"></i>
                </div>
            </div>
            <div class="layui-col-sm12 layui-col-md12">
                <div class="layui-form-item">
                    <input type="password" name="password" lay-verify="required|pass" autocomplete="off" placeholder="密码" class="layui-input">
                    <i class="layui-icon layui-icon-password zyl_lofo_icon"></i>
                </div>
            </div>
            <div class="layui-col-sm12 layui-col-md12">
                <div class="layui-form-item">
                    <input type="password" name="rePassword" lay-verify="required|pass" autocomplete="off" placeholder="确认密码" class="layui-input">
                    <i class="layui-icon layui-icon-password zyl_lofo_icon"></i>
                </div>
            </div>
            <div class="layui-col-sm12 layui-col-md12">
                <div class="layui-form-item">
                    <input type="text" name="email" lay-verify="required|userName" autocomplete="off" placeholder="邮箱" class="layui-input">
                    <i class="layui-icon layui-icon-read zyl_lofo_icon"></i>
                </div>
            </div>
            <div class="layui-col-sm12 layui-col-md12">
                <div class="layui-form-item">
                    <input type="text" name="address" lay-verify="required|userName" autocomplete="off" placeholder="地址" class="layui-input">
                    <i class="layui-icon layui-icon-location zyl_lofo_icon"></i>
                </div>
            </div>
            <div class="layui-col-sm12 layui-col-md12">
                <div class="layui-form-item">
                    <input type="text" name="organization" lay-verify="required|userName" autocomplete="off" placeholder="组织" class="layui-input">
                    <i class="layui-icon layui-icon-user zyl_lofo_icon"></i>
                </div>
            </div>
            <div class="layui-col-sm12 layui-col-md12">
                <div class="layui-form-item">
                    <input type="text" name="telnumber" lay-verify="required|userName" autocomplete="off" placeholder="电话" class="layui-input">
                    <i class="layui-icon layui-icon-cellphone-fine zyl_lofo_icon"></i>
                </div>
            </div>
            <div class="layui-col-sm12 layui-col-md12">
                <div class="layui-row">
                    <div class="layui-col-xs4 layui-col-sm4 layui-col-md4">
                        <div class="layui-form-item">
                            <input type="text" name="vercode" id="vercode" lay-verify="required|vercodes" autocomplete="off" placeholder="验证码" class="layui-input" maxlength="4">
                            <i class="layui-icon layui-icon-vercode zyl_lofo_icon"></i>
                        </div>
                    </div>
                    <div class="layui-col-xs4 layui-col-sm4 layui-col-md4">
                        <div class="zyl_lofo_vercode zylVerCode" onclick="zylVerCode()">xMYb</div>
                    </div>
                </div>
            </div>
            <div class="layui-col-sm12 layui-col-md12">
                <button class="layui-btn layui-btn-fluid" lay-submit="" lay-filter="demo1">提交</button>
            </div>
        </form>
</div>

</body>
<%--<script type="text/javascript" src="/jquery/jquery.min.js"></script>--%>
<script type="text/javascript" src="/jquery/jquery-1.9.1.min.js"></script>
<!-- Layui Js -->
<%--<script type="text/javascript" src="/layui/layui.js"></script>--%>
<script type="text/javascript" src="/layui/layui.all.js"></script>
<!-- Jqarticle Js -->
<script type="text/javascript" src="/jquery/jparticle.min.js"></script>
<!-- ZylVerificationCode Js-->
<script type="text/javascript" src="/jquery/zylVerificationCode.js"></script>
<script>
    layui.use(['carousel', 'form'], function(){
        var carousel = layui.carousel
            ,form = layui.form;

        //自定义验证规则
        form.verify({
            username: function(value){
                if(value.length <= 5 ){
                    return '账号至少得5个字符';
                }
            }
            ,password: [/^[\S]{4,12}$/,'密码必须4到12位，且不能出现空格']
            ,rePassword: [/^[\S]{4,12}$/,'确认密码必须4到12位，且不能出现空格']
            ,email: [/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,'邮箱格式不正确']
            // ,address: [/^[\S]{4,12}$/,'确认密码必须4到12位，且不能出现空格']
            // ,organization: [/^[\S]{4,12}$/,'确认密码必须4到12位，且不能出现空格']
            ,telnumber: [/^1[3|4|5|8][0-9]\d{4,8}$/,'手机号码格式不正确！']
            ,vercodes: function(value){
                //获取验证码
                var zylVerCode = $(".zylVerCode").html().toLowerCase();
                var vercode = value.toLowerCase();
                if(vercode != zylVerCode){
                    return '验证码错误（区分大小写）';
                }
            }
            ,content: function(value){
                layedit.sync(editIndex);
            }
        });
        //监听提交
        form.on('submit(demo1)', function(data){
            // 获取表单数据
            var formData = JSON.stringify(data.field);
            /*layer.alert(JSON.stringify(data.field),{
                title: '最终的提交信息'
            })*/
            formData = eval("("+formData+")");
            //重新生成json数据
            var username = formData['username'];
            var psw = formData['password'];
            var rePsw = formData['rePassword'];
            var email = formData['email'];
            // var address = formData['address'];
            // var organization = formData['organization'];
            var telnumber = formData['telnumber'];

            var email_reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            var telnumber_reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
            var flag = true;
            if(username.length < 4){
                flag = false;
                layer.msg("用户名长度不能小于4位",
                    {time:1000}
                );
                return false;
            }
            if(psw.length < 4 || psw.length > 12 || psw.indexOf(" ") != -1){
                flag = false;
                layer.msg("确认密码必须4到12位，且不能出现空格",
                    {time:1000}
                );
                return false;
            }
            if(psw != rePsw){
                flag = false;
                layer.msg("确认密码和密码不一致！",
                    {time:1000}
                );
                return false;
            }
            if(!email_reg.test(email)){
                flag = false;
                layer.msg("邮箱格式不正确！",
                    {time:1000}
                );
                return false;
            }
            if(!telnumber_reg.test(telnumber)){
                flag = false;
                layer.msg("手机号码格式不正确！",
                    {time:1000}
                );
                return false;
            }
            if(flag){
                var data = JSON.stringify(data.field);
                console.log(data);
                $.ajax({
                    url:"/register",
                    data:data,
                    type:"POST",
                    dataType: "text",
                    contentType: "application/json; charset=utf-8",
                    async : false,
                    success:function (res) {
                        if(res == "success"){
                            layer.msg("注册成功，前往登录！",
                                {time:2000},
                                function(){
                                    parent.location.reload();
                                }
                            );
                            return false;
                        }
                        else if(res == "existed"){
                            layer.msg();layer.msg("该用户已注册，请使用账号密码登录！",
                                {time:2000},
                                function(){
                                    parent.location.reload();
                                }
                            );
                            return false;
                        }
                        else{
                            layer.msg("注册失败，请重新注册！",
                                {time:2000},
                                function(){
                                    parent.location.reload();
                                }
                            );
                            return false;
                        }
                        // console.log(res);
                    },
                    error:function (res) {
                        layer.msg("注册失败，请重新注册");
                        window.location.href = "/";
                        // console.log(res);
                    }
                })
                return false;
            }


        });


    });

</script>
</html>
