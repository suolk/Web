var randx, randy, level = 0, success = 0, max;
var randr, randg, randb;

function hidStartButton() {//隐藏游戏开始按钮
    document.getElementById("gameStart").style.display = "none";
    document.getElementById("btn1").style.display = "block";
    document.getElementById("level").style.display = "block";
    document.getElementById("txt1").style.display = "block";
}

function checkLevel() {//点击确定后显示游戏主体
    if (!check())
        return;
    document.getElementById("myCanvas").style.display = "block";
    document.getElementById("success").style.display = "block";
    document.getElementById("txt1").innerHTML = "可以在游戏过程中修改难度";
    success = 0;
    draw();
}

function getColor(r, g, b) {
    var cl = "";
    cl += r.toString(16);
    if (r < 16) cl += '0';
    cl += g.toString(16);
    if (g < 16) cl += '0';
    cl += b.toString(16);
    if (b < 16) cl += '0';
    cl = "#" + cl;
    return cl;
}

function check() {//检查输入是否合法
    var val = document.getElementById("inputLevel").value;
    document.getElementById("inputLevel").value = "";
    if (val == null || val == "") {
        alert("输入为空！");
        return false;
    } else if (val == "wwssaaddabab" && level != 0) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var cl = getColor(~randr, ~randg, ~randb);
        ctx.fillStyle = cl;
        ctx.lineWidth = 3;
        ctx.strokeRect(randx * 50 + 4, randy * 50 + 4, 50, 50);
        return false;
    } else {
        level = Number(val);
        if (level > 100 || level < 1 || isNaN(level)) {
            alert("输入范围不正确！");
            return false;
        }
        return true;
    }
}

function draw() {//游戏主体绘制
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var cl1 = "", cl2 = "";
    var s = "已成功通过 " + success + " 关！"
    ctx.clearRect(0, 0, c.width, c.height);
    document.getElementById("success").innerHTML = s;
    randx = Math.floor(Math.random() * 10), randy = Math.floor(Math.random() * 10);
    // 获取颜色
    randr = Math.floor(Math.random() * 0xff);
    randg = Math.floor(Math.random() * 0xff);
    randb = Math.floor(Math.random() * 0xff);
    cl1 = getColor(randr, randg, randb);
    var tmp1 = Math.floor(level / 3);
    var tmp2 = Math.floor((level - tmp1) / 2);
    if (randr + tmp1 > 0xff)
        randr -= tmp1;
    else
        randr += tmp1;
    if (randg + tmp2 > 0xff)
        randg -= tmp2;
    else
        randg += tmp2;
    if (randb + level - tmp1 - tmp2 > 0xff)
        randb -= level - tmp1 - tmp2;
    else
        randb += level - tmp1 - tmp2;
    cl2 = getColor(randr, randg, randb);
    //绘制
    ctx.fillStyle = cl1;
    for (var i = 0; i < 10; ++i) {
        for (var j = 0; j < 10; ++j) {
            if (i == randx && j == randy)
                continue;
            ctx.fillRect(i * 50 + 5, j * 50 + 5, 48, 48);
        }
    }
    ctx.fillStyle = cl2;
    ctx.fillRect(randx * 50 + 5, randy * 50 + 5, 48, 48);
}

function judge(event) {//判断选择的色块是否正确
    var mousex = event.offsetX, mousey = event.offsetY;
    if (mousex >= randx * 50 + 5 && mousex <= randx * 50 + 5 + 48 && mousey >= randy * 50 + 5 && mousey <= randy * 50 + 5 + 48) {
        ++success;
        draw();
    }
}
