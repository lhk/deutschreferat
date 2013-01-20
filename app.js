var paper;
var st;
var x = 100;
var y = 100;
var rot = 0;
var deltaRot = 90;
var length = 3;
var word = "F";
var n = 6;
window.onload = function () {
    alert("onload");
    paper = Raphael(10, 50, 2000, 2000);
    for(var i = 0; i < n; i++) {
        word = applyRules(word);
    }
    alert(word);
    st = paper.set();
    draw(word);
    st.attr("fill", "blue");
    st.attr("stroke", "blue");
    st.attr("opacity", "1");
};
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
grammar["F"] = "F+F-F-F+F";
grammar["+"] = "+";
grammar["-"] = "-";
grammar["["] = "[";
grammar["]"] = "]";
var drawing = [];
drawing["F"] = line;
drawing["+"] = rotateUp;
drawing["-"] = rotateDown;
drawing["]"] = pop;
drawing["["] = push;
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
            var func = drawing[char];
            func();
        }
    }
};
