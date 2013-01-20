/// <reference path="raphael-2.1.d.ts"/>
var paper: RaphaelPaper;
var st: RraphaelSet;

var x = 100;
var y = 100;
var rot = 0;
var deltaRot = 90;
var length = 3;
var word = "F";
var n = 6;

window.onload = () => {
    alert("onload");
    paper = Raphael(10, 50, 2000, 2000);
    for (var i = 0; i < n; i++) {
        word = applyRules(word);
    }
    alert(word);
    st = paper.set();
    draw(word);
    st.attr("fill", "blue");
    st.attr("stroke", "blue");
    st.attr("opacity", "1");
};

var line = () =>{
    var xend = x + Math.cos(rot/180*Math.PI) * length;
    var yend = y + Math.sin(rot/180*Math.PI) * length;
    st.push(paper.path("M" + x + "," + y + "L" + xend + "," + yend));
    x = xend;
    y = yend;
}

var rotateUp = () =>{
    rot += deltaRot;
}

var rotateDown = () =>{
    rot -= deltaRot;
}
class Pos { x: number; y: number; rot: number;
    constructor (x: number, y: number, rot: number) {
        this.x = x;
        this.y = y;
        this.rot = rot;
    }
}
var stack: Pos[] = new Pos[];
var push = () =>{
    var pos = new Pos(x, y, rot);
    stack.push(pos);
}
var pop = () =>{
    var pos = stack.pop();
    x = pos.x;
    y = pos.y;
    rot = pos.rot;
}

var grammar = [];
//grammar["X"] = "F-[[X]+X]+F[+FX]-X"; //farn
//grammar["X"] = "F--[X]+[X]++++[X]-[X]"; //symm baum
//grammar["F"] = "FF"; farn & baum
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

var applyRules = (word: string) => {
    var newWord = "";
    for (var i = 0; i < word.length; i++) { 
        var char = word[i];
        newWord += grammar[char];
    }
    return newWord;
}

var draw = (word:string) =>{
    for (var i = 0; i < word.length; i++) { 
        var char = word[i];
        if (drawing[char] != undefined) { var func = drawing[char]; func(); }
    }
}