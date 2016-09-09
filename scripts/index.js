/**
 * Created by lisa on 16/9/4.
 */

var element = document.getElementById("object");
//var canvas = document.getElementById("canvas");
var canvas= document.getElementById("canvas");
//test.offsetLeft是移动的相对横坐标
//test.offsetTop是移动的相对纵坐标
//offsetLeft是点击的位置相对被点击对象的横坐标
//offsetTop是点击的位置相对被点击对象的纵坐标
//clientX是点击的那个点的横坐标
//clientY是点击的那个点的纵坐标


//移动物体的功能
function move(event, offsetLeft, offsetTop) {
    var x = event.clientX-offsetLeft-3-canvas.offsetLeft;
    if(x > 570) {
        x = 570;
    } else if(x < 0 ){
        x = 0;
    }
    var y = event.clientY-3-offsetTop-canvas.offsetTop;
    if(y > 350 ) {
        y = 350;
    } else if(y < 0 ){
        y = 0;
    }
    //console.log(x, y)
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


//每点击一下就增加一个圆圈;
var middle = document.getElementById("middle");
var slider = document.getElementById("slider");
var animate = document.getElementById("animate");
var event = slider.event;
//移动圆圈的功能
function move3(event, offsetLeft, offsetTop, circle) {
    console.log(event.clientX, 1)
    var x = event.clientX-offsetLeft-animate.offsetLeft-middle.offsetLeft;
    if(x > 595) {
        x = 595;
    } else if(x < -5 ){
        x = -5;
    }
    //var y = event.clientY;
    //console.log(x, y)
    circle.style.left = x+"px";
}
//产生圆圈的功能
function generate(event) {
    var circle = document.createElement("div");
    //阻挡原始拖动的产生
    circle.addEventListener("dragstart", function (e) {
        e.preventDefault();
    });
    circle.addEventListener("mousedown", function (event) {
        var offsetLeft = event.offsetX;
        var offsetTop = event.offsetY;
        function move4(event) {
            move3(event, offsetLeft, offsetTop, circle);
        }
        window.addEventListener("mousemove", move4);
        window.addEventListener("mouseup", function () {
            window.removeEventListener("mousemove", move4);
        });
    });
    circle.className = "circle";
    var x = event.offsetX - 5;
    circle.style.left = x + "px";
    middle.appendChild(circle);

};

slider.addEventListener("click", function (event) {
    generate (event);
});


//可以移动圆圈的功能
//var spot = document.getElementByClassName("circle")






//"red"

