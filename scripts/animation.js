/**
 * Created by lisa on 16/9/19.
 */

var arr = [
    {
        time: 0,
        condition: "transform:translate(0,0)"
    },
    {
        time: 100,
        condition: "transform:translate(0,0)"
    }
];

/**
 * style样式中的animation语句
 * @type {string}
 */

/**
 * 将str放入到样式表中,将样式放在html中
 * @type {Element}
 */

var play = document.getElementById("play");
play.addEventListener("click", function () {
    var str = "@-webkit-keyframes animation{";
    for(var i = 0; i < arr.length; i++) {
        str += arr[i].time + "% {";
        str += arr[i].condition + "}"
    }
    str += "}";
    str += ".animation {-webkit-animation:animation 5s}"

    var style = document.createElement("style");
    style.innerHTML = str;
    document.head.appendChild(style);

    element.className = "animation";
})


