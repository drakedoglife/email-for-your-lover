var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var user_input = document.querySelector("#email-input")
var sug_wrapper = document.querySelector("#email-sug-wrapper");

//监听输入
user_input.oninput = function() {
 console.log("event handle")
  if(sug_wrapper.childNodes.length == 0) {
     addToWrapper();
  }else {
    correctWrapper();
  }
  wrapperController();
}

//

//获取用户输入
function getUserInput() {
 var value = user_input.value.trim();
 return value;
}

//生成提示框内容
function creatHintBox() {
  var trim = getUserInput();
  var index = trim.indexOf("@");
  var currentfixList = postfixList.concat();
  var newfixList = [];
  if(index != -1) {
   var temp_trim = trim;
   var trim = temp_trim.substring(0, temp_trim.indexOf("@"));
   var trim_after = temp_trim.substring(temp_trim.indexOf("@") + 1);
   for (var i = 0;i < currentfixList.length;i++) {
     if (trim_after && currentfixList[i].substring(0, trim_after.length) === trim_after){
        newfixList.push(currentfixList[i]);
     }
   }
     if (newfixList.length === 0) {
       newfixList = currentfixList.concat();
   }
  }else {
     newfixList = currentfixList.concat();
   }
   for (var j = 0;j < newfixList.length;j++) {
     newfixList[j] = trim + "@" + newfixList[j];
   }
  return newfixList;
}

//将提示框内容添加到email-sug-wrapper中
function addToWrapper() {
  var arr = creatHintBox();
  console.log(arr);
  for (var i = 0;i < arr.length;i++) {
    var li = document.createElement("li");
    var node = document.createTextNode(arr[i]);
    li.appendChild(node);
    sug_wrapper.appendChild(li);
  }
}

//修改提示框内容
function correctWrapper() {
  var arr = creatHintBox();
  var child = sug_wrapper.childNodes;
  for(var i = child.length - 1;i >= 0;i--) {
    child[i].innerHTML = arr[i];
    if (arr[i] == undefined) {
      child[i].setAttribute("style", "display: none");
    }else {
      child[i].setAttribute("style", "display: block");
    }
  }
}

//控制email-sug-wrapper的显隐状态
function wrapperController() {
  var text = getUserInput();
  if (text == "") {
    hideWrapper();
  }else {
    visWrapper();
  }
}

//隐藏提示框
function hideWrapper() {
  sug_wrapper.setAttribute("style", "display: none");
  for(var i = sug_wrapper.childNodes.length - 1;i >= 0;i--) {
    sug_wrapper.removeChild(sug_wrapper.childNodes[i]);
}
}

//显示提示框
function visWrapper() {
  sug_wrapper.setAttribute("style", "display: block");
}

//选择DOM节点并放到输入框中
sug_wrapper.onclick = function(e) {
  console.log("Mousefunction");
  if (e.target.nodeName.toLowerCase() == "li") {
    user_input.value = e.target.innerHTML;
    sug_wrapper.setAttribute("style", "display: none");
  }
}
