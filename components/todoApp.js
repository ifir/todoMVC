define(function(require, exports, module){
	var $ = require('jquery');
	var base = require('base');
	var sTodo = require('sTodo');
	var newTodo = require('newTodo'); //添加
	var listTodo = require('todoList');	//列表
	var sortTodo = require('todoSort'); //排序


	//组件属性
	// var _opt = {
	// 	file : "todoApp.js"
	// };

	//Dom元素对象
	var _dom = {
		slot : null //获取的dom元素
	};

	//HTML字符串 ，todoMVC的整体框架
	var _htm = {
		main:
			"<section id='todoapp'>"+
				"<h1>todos</h1>"+
				"<header id='header'></header>"+
	            "<section id='main'></section>"+
	            "<footer id='footer'></footer>"+
			"</section>"
	};
	//渲染
	function render(slot){
		_dom.slot = slot;
		//渲染本组件的View层
		_dom.slot.html(_htm.main);

		//回调函数调用的是newTodo组件里的render
		//渲染newTodo组件
		newTodo.render(_dom.slot.find("#header"));
		//渲染listTodo组件
		listTodo.render(_dom.slot.find("#main"));
		//渲染sortTodo组件
		sortTodo.render(_dom.slot.find("#footer"));
	}





	exports.render = render;
})