/**
 * Created by lisa on 16/9/4.
 */

var arr = [];
var middle = document.getElementById("middle");
var slider = document.getElementById("slider");
var animate = document.getElementById("animate");

// slider css 长度
const SLIDER_LEN = 600;
// 圆点半径
const CIRCLE_RADIUS = 5;

/**
 * 移动圆圈的功能
 * @param event
 * @param offsetLeft
 * @param circle
 */
function move3(event, offsetLeft, circle) {
    var x = event.clientX - offsetLeft - animate.offsetLeft - middle.offsetLeft;
    if(x > SLIDER_LEN - CIRCLE_RADIUS) {
        x = SLIDER_LEN - CIRCLE_RADIUS;
    } else if(x < -CIRCLE_RADIUS ){
        x = -CIRCLE_RADIUS;
    }
    circle.style.left = x + "px";
    return x;
}

/**
 * 产生圆圈/绑定移动的功能
 * @param event
 */
function generate(event) {
    var circle = document.createElement("div");
    //阻挡原始拖动的产生
    preventDrag(circle);

    circle.addEventListener("mousedown", function (event) {
        var circle = event.target;
        var toBeDel;
        for(var i = 0 ; i < arr.length; i++) {
            if(arr[i].view === circle) {
                toBeDel = (arr.splice(i, 1))[0].view;
                break;
            }
        }

        //函数:移动circle
        var left;
        (function () {
            var offsetLeft = event.offsetX;
            function move4(event) {
                left = move3(event, offsetLeft, circle);
            }
            window.addEventListener("mousemove", move4);
            var mouseup = function () {
                window.removeEventListener("mousemove", move4);
                var time = left / SLIDER_LEN;
                //弹起来之后将删掉的json放回
                judge(time , left , toBeDel);
                window.removeEventListener("mouseup", mouseup);
            };
            window.addEventListener("mouseup", mouseup);
        })();
    });

    //往数组里面加circle对象
    var time = event.offsetX / SLIDER_LEN;
    judge(time , event.offsetX , circle);
    
    var x = event.offsetX - CIRCLE_RADIUS;
    circle.style.left = x + "px";
    circle.className = "circle";
    middle.appendChild(circle);
}

slider.addEventListener("click", function (event) {
    generate (event);
});


