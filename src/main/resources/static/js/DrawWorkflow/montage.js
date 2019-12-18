

//删除的绝对位置
var topDiv = $("#del img").offset().top;    //距离上
var leftDiv = $("#del img").offset().left;    //距离左
$('.sameline .operate_node').draggable({
    proxy:'clone',
    revert:true,
    onStopDrag : function (event){
        var mathR = generateMixed(5);
        $("#panel").append("<div id='"+ this.getAttribute('id') + "_" + mathR +"' class='"+ this.getAttribute("class") +"' style=\"position:absolute;left:"+(event.clientX-40)+"px;top:"+(event.clientY-40)+"px;\"><div>");
        $("#"+this.getAttribute('id') + "_" + mathR).draggable({
            onStopDrag : function (event){
                if(event.clientX > leftDiv && event.clientX < (leftDiv+60) && event.clientY > topDiv && event.clientY < (topDiv+60)){
                    var msg = "您真的确定要删除吗？\n请确认！";
                    if (!confirm(msg)){
                        return;
                    }else{
                        $("#"+this.id).remove();
                    }
                }
            }
        });
    }
});

//重置按钮
$("#montage_reset").click(function(){
    $("#panel").html("");
});

//保存按钮
$("#montage_save").click(function(){

});

//获取随机数
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function generateMixed(n) {
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    return res;
}



































