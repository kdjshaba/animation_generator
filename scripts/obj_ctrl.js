/**
 * Created by lisa on 16/9/18.
 */

const CANVAS_BORDER = 1;
const OBJ_BORDER = 1;
const CANVAS_WIDTH = 620;
const CANVAS_HEIGHT = 400;
const OBJ_WIDTH = 50;
const OBJ_HEIGHT = 50;

//移动物体的功能
var element = document.getElementById("element");
//var canvas = document.getElementById("canvas");
var canvas= document.getElementById("canvas");
var object = document.getElementById("object");
//test.offsetLeft是移动的相对横坐标
//test.offsetTop是移动的相对纵坐标
//offsetLeft是点击的位置相对被点击对象的横坐标
//offsetTop是点击的位置相对被点击对象的纵坐标
//clientX是点击的那个点的横坐标
//clientY是点击的那个点的纵坐标
function move1(event, offsetLeft, offsetTop) {
    var x = event.clientX - offsetLeft- (CANVAS_BORDER + OBJ_BORDER) - canvas.offsetLeft;
    if(x > CANVAS_WIDTH - OBJ_WIDTH) {
        x = CANVAS_WIDTH - OBJ_WIDTH;
    } else if(x < 0 ){
        x = 0;
    }
    var y = event.clientY - (CANVAS_BORDER + OBJ_BORDER) - offsetTop - canvas.offsetTop;
    if(y > CANVAS_HEIGHT - OBJ_HEIGHT) {
        y = CANVAS_HEIGHT - OBJ_HEIGHT;
    } else if(y < 0 ){
        y = 0;
    }

    element.style.top = y + "px";
    element.style.left = x + "px";
}

//阻挡原始拖动的产生

preventDrag(element);

//鼠标按下移动松开停止的功能
object.addEventListener("mousedown", function (e) {
    function move2() {
        move1(event, e.offsetX, e.offsetY);
    }
    window.addEventListener("mousemove", move2);
    window.addEventListener("mouseup", function () {
        window.removeEventListener("mousemove", move2);
    });
});


//旋转物体的功能
var rotate = document.getElementById("rotate");
var xxx = 0;

function romate1(event, rotate) {
    xxx ++;

    var x1 = element.offsetLeft;
    var y1 = element.offsetTop;
    var x2 = event.clientX - (CANVAS_BORDER + OBJ_BORDER) - canvas.offsetLeft;
    var y2 = event.clientY - (CANVAS_BORDER + OBJ_BORDER) - canvas.offsetTop;
    var x = Math.abs(x1 - x2);
    var y = Math.abs(y1 - y2);
    var z = Math.sqrt(x * x + y * y);
    var rotat = Math.round((Math.asin(y / z) / Math.PI * 180));
// 第一象限
    /*
     if (x2 >= x1 && y2 <= y1) {
     rotat = rotat;
     }*/
// 第二象限
    if (x2 <= x1 && y2 <= y1) {
        rotat = 180 - rotat;
    }
// 第三象限
    else if (x2 <= x1 && y2 >= y1) {
        rotat = 180 + rotat;
    }
// 第四象限
    else if(x2 >= x1 && y2 >= y1){
        rotat = 360 - rotat;
    }
    element.style.transform = "rotate(" + (-rotat) + "deg)";
}

//鼠标按下移动松开停止的功能
rotate.addEventListener("mousedown", function () {
    function rotate2(event) {
        romate1(event,rotate);
    }
    window.addEventListener("mousemove", rotate2);
    window.addEventListener("mouseup", function () {
        window.removeEventListener("mousemove", rotate2);
    })
});