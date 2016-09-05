/**
 * Created by lisa on 16/9/4.
 */

var element = document.getElementById("object");
var canvas = document.getElementById("canvas");
var test= document.getElementById("canvas");
//test.offsetLeft是横坐标
//test.offsetTop是纵坐标

function move(event) {
    element.style.transform = "translate("+(event.clientX-25-test.offsetLeft)+"px,"+(event.clientY-25-test.offsetTop)+"px)";
}

//想了半天想加一个监听事件
canvas.addEventListener("mousemove",function () {
    element.addEventListener("mousedown", function () {
        window.addEventListener("mousemove",move);
        window.addEventListener("mouseup",function () {
            window.removeEventListener("mousemove",move);
        })

    });
})



