/**
 * Created by lisa on 16/9/4.
 */

var arr = new Array();







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
    //element.style.transform = "translate("+x+"px,"+y+"px)";
    element.style.top = y + "px";
    element.style.left = x + "px";


}
//阻挡原始拖动的产生
element.addEventListener("dragstart", function (e) {
    e.preventDefault();
})
//鼠标按下移动松开停止的功能
object.addEventListener("mousedown", function (e) {
    //alert(1)
    function move2() {
        move1(event, e.offsetX, e.offsetY);
    }
    window.addEventListener("mousemove", move2);
    window.addEventListener("mouseup",function () {
        window.removeEventListener("mousemove",move2);
    })
 });


//旋转物体的功能
var rotate = document.getElementById("rotate");
var xxx = 0;
function romate1(event, rotate) {
xxx ++;
    var x2 = event.clientX-canvas.offsetLeft;

    console.log(element.style.transform)
    var x1 = element.offsetLeft;
    var y1 = element.offsetTop;
    var x2 = event.clientX-3-canvas.offsetLeft;
    var y2 = event.clientY-3-canvas.offsetTop;
    var x = Math.abs(x1-x2);
    var y = Math.abs(y1-y2);
    var z = Math.sqrt(x*x+y*y);
    var rotat = Math.round((Math.asin(y/z)/Math.PI*180));
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
    //return rotat; //真实的角度
    element.style.transform = "rotate(" + (-rotat) + "deg)";
    element.style.transformOrigin = "bottom bottom";
}
//鼠标按下移动松开停止的功能
rotate.addEventListener("mousedown", function (event) {
    function rotate2(event) {
        romate1(event,rotate);
    }
    window.addEventListener("mousemove", rotate2);
    window.addEventListener("mouseup",function () {
        window.removeEventListener("mousemove",rotate2);
    })
});

//每点击一下就增加一个圆圈;
var middle = document.getElementById("middle");
var slider = document.getElementById("slider");
var animate = document.getElementById("animate");
var event = slider.event;

/**
 * 移动圆圈的功能
 * @param event
 * @param offsetLeft
 * @param circle
 */
function move3(event, offsetLeft, circle) {
    //console.log(event)
    var x = event.clientX-offsetLeft-animate.offsetLeft-middle.offsetLeft;
    if(x > 595) {
        x = 595;
    } else if(x < -5 ){
        x = -5;
    }
    //var y = event.clientY;
    //console.log(x, y)
    circle.style.left = x+"px";
    //arr.splice(i, 0, {time: time,offsetX:event.offsetX });
    return x;
}


/**
 * 产生圆圈的功能
 * @param event
 */

function generate(event) {
    var circle = document.createElement("div");
    //阻挡原始拖动的产生
    circle.addEventListener("dragstart", function (e) {
        e.preventDefault();
    });
    circle.addEventListener("mousedown", function (event) {
        var circle = event.target;
        var toBeDel;
        var index;
        for(var i = 0 ; i< arr.length; i++) {
            if(arr[i].view == circle) {
                //index = i;
                toBeDel = (arr.splice(i, 1))[0].view;
                console.log(1)
                break;
            }
        }
        var offsetLeft = event.offsetX;
        var left;
        function move4(event) {
            left = move3(event, offsetLeft, circle);
        }
        window.addEventListener("mousemove", move4);
        var mouseup = function () {
            window.removeEventListener("mousemove", move4);
            var time = left/600;
            var index = -1;
            for(var i = 0; i < arr.length; i++) {
                if(arr[i].time > time) {
                    arr.splice(i, 0, {
                        time: time,
                        offsetX: left,
                        view: toBeDel
                    });
                    console.log(2)
                    index = i;
                    break;
                }
            }
            if(index == -1) {
                console.log(3)
                arr.push({
                    time: time,
                    offsetX: left,
                    view: toBeDel
                });
            }
            window.removeEventListener("mouseup", mouseup);
        };
        window.addEventListener("mouseup", mouseup);
    });

    var time = event.offsetX/600;
    var index = -1;
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].time > time) {
            arr.splice(i, 0, {
                time: time,
                offsetX:event.offsetX,
                view: circle
            });
            index = i;
     //       circle.setAttribute("i", index + "");
            break;

        }
    }
    if(index == -1) {
        arr.push({
            time: time,
            offsetX: event.offsetX,
            view: circle
        });
        /*
        index = 0;
        if(arr.length == 1) {
            index = 0;
        } else {
            index = arr.length - 1;
        }
        */
       // circle.setAttribute("i", index + "");
    }
    /*
    for(var i = 0; i < arr.length; i++) {
        circle.setAttribute("i", i + "");
    }*/


    circle.className = "circle";

    var x = event.offsetX - 5;
    circle.style.left = x + "px";
    middle.appendChild(circle);



}

slider.addEventListener("click", function (event) {
    generate (event);
});


