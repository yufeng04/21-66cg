/**
 * @file 下拉菜单的鼠标滑入滑出效果、轮播方式的选择、tab切换、输入框级联
 * @author yufeng(mail)
 */
if (window.addEventListener) {
    window.addEventListener("load", carousel, false);
    window.addEventListener("load", tabChange, false);
    window.addEventListener("load", inputConnection, false);
}
else {
    window.attachEvent("onload", carousel);
    window.attachEvent("onload", tabChange);
    window.attachEvent("onload", inputConnection);
}


function carousel() {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var timer;
    
    function animate(offset) {                
        //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
        //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
        var newLeft = parseInt(document.defaultView.getComputedStyle(list,null).left) + offset;
                 // console.log(newLeft);
            list.style.left = newLeft + 'px';
                 //无限滚动判断
                if (newLeft > -960) {
                    list.style.left = -2880 + 'px';
                }
                if (newLeft < -2880) {
                    list.style.left = -960 + 'px';
                }
            }
 
        function play() {
            //重复执行的定时器
            timer = setInterval(function() {
                next.onclick();
                }, 2000)
            }
 
        function stop() {
            clearInterval(timer);
            }
 
        function buttonsShow() {
            //将之前的小圆点的样式清除
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].className == "on") {
                    buttons[i].className = "";
                    }
                }
            //数组从0开始，故index需要-1
                buttons[index - 1].className = "on";
            }
 
            prev.onclick = function() {
                index -= 1;
                if (index < 1) {
                    index = 3
                }
                buttonsShow();
                animate(960);
            };
 
            next.onclick = function() {
                //由于上边定时器的作用，index会一直递增下去，我们只有3个小圆点，所以需要做出判断
                index += 1;
                if (index > 3) {
                    index = 1
                }
                animate(-960);
                buttonsShow();
            };
 
            for (var i = 0; i < buttons.length; i++) {
                (function(i) {
                    buttons[i].onclick = function() {
 
                        /*   这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
                        /*   由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
                        var clickIndex = parseInt(this.getAttribute('index'));
                        var offset = 960 * (index - clickIndex); //这个index是当前图片停留时的index
                        animate(offset);
                        index = clickIndex; //存放鼠标点击后的位置，用于小圆点的正常显示
                        buttonsShow();
                    }
                })(i)
            }
 
            container.onmouseover = stop;
            container.onmouseout = play;
            play();
    }


// 轮播方式的选择
/**
 *下拉列表的onchange事件；当选项的索引为2时，给轮播模块添加 carousel-fade类，
 *实现淡入淡出效果；为其他值时为滑入滑出效果；
 *
 *@param {boject} obj onchange事件作用的对象
 */
function changeStyle(obj) {
    var carouselStyle = document.getElementsByClassName("carousel slide");
    if (obj.selectedIndex === 2) {
        carouselStyle[0].setAttribute("class", "carousel-fade carousel slide");
    }
    else {
        carouselStyle[0].setAttribute("class", "carousel slide");
    }
}

/**
 *实现tab切换中，鼠标移入弹出内容框，在html中移除#myTab，
 *即可变成按键式
 */
// tab导航
function tabChange() {
    var tab = document.getElementById("tab").getElementsByTagName("li");
    var con = document.getElementById("con").getElementsByTagName("div");
    for (var i = 0; i < tab.length; i++) {
        tab[i].index = i;
        tab[i].onmouseover = function() {
            for (var k = 0; k<con.length; k++) {
                con[k].style.display = "none";
                tab[k].className = " ";
            }
            tab[this.index].className = "cur";
            con[this.index].style.display = "block";
        }
    }
}


// 输入框级联
var country = document.getElementById("country");
var city = document.getElementById("city");
var arrCountry = new Array(new Option("Select your country", ""), 
                           new Option("中国", "China"), 
                           new Option("美国", "American"));
var arrCity = new Array();
arrCity[0] = new Array(new Option("Select your country",""));

arrCity[1] = new Array(new Option("北京", "Beijing"), 
                       new Option("上海", "Shanghai"),  
                       new Option("深圳", "Shenzhen"));

arrCity[2] = new Array(new Option("纽约", "NewYork"), 
                       new Option("华盛顿", "Washington"));
/**
 *动态载入所有省份
 */
function inputConnection() {
    for (var i = 0; i < arrCountry.length; i++) {
        country.options[i] = arrCountry[i];
    }
}
//选中国家之后，根据索引动态载入相应城市
function changeCity() {
    //清空上次的选项
    city.options.length = 0;
    //获取国家一级的下拉列表选中的索引
    var index = country.selectedIndex;
    for (var i = 0; i < arrCity[index].length; i++){
        city.options[i] = arrCity[index][i];
    }
}




