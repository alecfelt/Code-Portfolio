var curVal = null;
var recOp = false;
var op = [];

function appendVal(val) {
  if(recOp == true || $("#text").val() == "error") {
    clr();
    recOp = false;
  }
  if(curVal == null) {
    $("#text").val(val);
    curVal = val.toString();
  }else{
    $("#text").val($("#text").val() + val);
    curVal += val;
  }
}

function cl() {
  clr();
  recOp = false;
  op = [];
}

function clr() {
  $("#text").val("");
  curVal = null;
}

function nine() { appendVal("9"); }
function eight() { appendVal("8"); }
function seven() { appendVal("7"); }
function six() { appendVal("6"); }
function five() { appendVal("5"); }
function four() { appendVal("4"); }
function three() { appendVal("3"); }
function two() { appendVal("2"); }
function one() { appendVal("1"); }
function zero() { appendVal("0"); }
function point() {
  if(recOp == true || $("#text").val() == "error") {
    clr();
    recOp = false;
  }
  if(curVal == null) {
    curVal = "0.";
    $("#text").val("0.");
  } else {
    curVal += ".";
    $("#text").val($("#text").val() + ".");
  }
}

function add() {
  if(curVal == null) {
    error();
  }else{
    op.push(curVal);
    op.push("+");
    recOp = true;
  }
}
function subtract() {
  if(curVal == null) {
    error();
  }else{
    op.push(curVal);
    op.push("-");
    recOp = true;
  }
}
function multiply() {
  if(curVal == null) {
    error();
  }else{
    op.push(curVal);
    op.push("x");
    recOp = true;
  }
}
function divide() {
  if(curVal == null) {
    error();
  }else{
    op.push(curVal);
    op.push("÷");
    recOp = true;
  }
}
function equals() {
  if(recOp == true) {
    error();
  }else{
    var num = 0;
    op.push(curVal);
    for(var i = 0; i < op.length; i++) {
      if(op[i] == "x") {
        num = (parseFloat(op[i-1]) * parseFloat(op[i+1]));
        op.splice(i-1, 3, num);
        i--;
      } else if(op[i] == "÷") {
        num = (parseFloat(op[i-1]) / parseFloat(op[i+1]));
        op.splice(i-1, 3, num);
        i--;
      }
    }
    for(var i = 0; i < op.length; i++) {
      if(op[i] == "+") {
        num = (parseFloat(op[i-1]) + parseFloat(op[i+1]));
        op.splice(i-1, 3, num);
        i--;
      } else if(op[i] == "-") {
        num = (parseFloat(op[i-1]) - parseFloat(op[i+1]));
        op.splice(i-1, 3, num);
        i--;
      }
    }
    if(op.length == 1) {
      curVal = null;
      $("#text").val(op.shift());
      op = [];
    }
  }
}

function error() {
  op = [];
  curVal = null;
  recOp = false;
  $("#text").val("error");
}
