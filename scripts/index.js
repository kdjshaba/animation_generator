/**
 * Created by lisa on 16/9/4.
 */

var element = document.getElementById("object");
//var canvas = document.getElementById("canvas");
var test= document.getElementById("canvas");
//test.offsetLeft是横坐标
//test.offsetTop是纵坐标

function move(event, offsetLeft, offsetTop) {
    var x = event.clientX-offsetLeft-3-test.offsetLeft;
    if(x > 570) {
        x = 570;
    } else if(x < 0 ){
        x = 0;
    }
    var y = event.clientY-3-offsetTop-test.offsetTop;
    if(y > 350 ) {
        y = 350;
    } else if(y < 0 ){
        y = 0;
    }
        console.log(x, y)
    element.style.transform = "translate("+x+"px,"+y+"px)";

}

//阻挡原始拖动的产生
element.addEventListener("dragstart", function (e) {
    e.preventDefault();
})

//鼠标按下移动松开停止的功能
element.addEventListener("mousedown", function (e) {
    function move2() {
        move(event, e.offsetX, e.offsetY);

    }
    window.addEventListener("mousemove", move2);
    window.addEventListener("mouseup",function () {
           window.removeEventListener("mousemove",move2);
    })
 });



