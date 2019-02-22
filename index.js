var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var user_input = document.querySelector("#email-input")
var sug_wrapper = document.querySelector("#email-sug-wrapper");

user_input.oninput = function() {
	if(sug_wrapper.childNodes) {
		console.log(sug_wrapper.childNodes);
		addToWrapper();
	}else {
		correctWrapper();
	}
	wrapperController();
}

//获取用户输入
function getUserInput() {
	return user_input.value.replace(/(^\s*)|(\s*$)/g, "");
}

//生成提示框内容
function creatHintBox() {
	var trim = getUserInput();
  var currentfixList = postfixList.concat();
	for (var i = 0;i < 5;i++) {
		currentfixList[i] = trim + "@" + currentfixList[i];
	}
	return currentfixList;
}

//将提示框内容添加到email-sug-wrapper中
function addToWrapper() {
	var arr = creatHintBox();
	for (var i = 0;i < 5;i++) {
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
	sug_wrapper.setAttribute("style", "visibility: hidden");
  for(var i = sug_wrapper.childNodes.length - 1;i >= 0;i--) {
    sug_wrapper.removeChild(sug_wrapper.childNodes[i]);
}
}

//显示提示框
function visWrapper() {
	sug_wrapper.setAttribute("style", "visibility: visible");
}