var toggle = true;
var paper;
var st;
var x = 0;
var y = 0;
var rot = 45;
var deltaRot = 25;
var length = 2;
var line = function () {
    var xend = x + Math.cos(rot / 180 * Math.PI) * length;
    var yend = y + Math.sin(rot / 180 * Math.PI) * length;
    st.push(paper.path("M" + x + "," + y + "L" + xend + "," + yend));
    x = xend;
    y = yend;
};
var rotateUp = function () {
    rot += deltaRot;
};
var rotateDown = function () {
    rot -= deltaRot;
};
var Pos = (function () {
    function Pos(x, y, rot) {
        this.x = x;
        this.y = y;
        this.rot = rot;
    }
    return Pos;
})();
var stack = new Array();
var push = function () {
    var pos = new Pos(x, y, rot);
    stack.push(pos);
};
var pop = function () {
    var pos = stack.pop();
    x = pos.x;
    y = pos.y;
    rot = pos.rot;
};
var grammar = [];
grammar["X"] = "F-[[X]+X]+F[+FX]-X";
grammar["F"] = "FF";
grammar["+"] = "+";
grammar["-"] = "-";
grammar["["] = "[";
grammar["]"] = "]";
var drawing = [];
drawing["F"] = line;
drawing["+"] = rotateUp;
drawing["-"] = rotateDown;
drawing["]"] = push;
drawing["["] = pop;
var applyRules = function (word) {
    var newWord = "";
    for(var i = 0; i < word.length; i++) {
        var char = word[i];
        newWord += grammar[char];
    }
    return newWord;
};
var draw = function (word) {
    for(var i = 0; i < word.length; i++) {
        var char = word[i];
        if(drawing[char] != undefined) {
            drawing[char]();
        }
    }
};
window.onload = function () {
    var paper = Raphael(10, 50, 1000, 1000);
    var word = "X";
    paper.clear();
    var n = 4;
    for(var i = 0; i < n; i++) {
        word = applyRules(word);
    }
    var set1 = paper.set();
    draw(word);
    set1.attr("fill", "green");
    set1.attr("stroke", "green");
    set1.attr("opacity", "1");
};
