define(function(require, exports, module){
	var $ = require('jquery');
	var newTodo = require('newTodo'); //添加
	var listTodo = require('listTodo');	//列表
	var sortTodo = require('sortTodo'); //排序


	//组件属性
	var _opt = {
		file : "todoApp.js"
	};

	//Dom元素对象
	var _dom = {
		slot : null
	};

	//HTML
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
		_dom.slot.html(_htm.main,_opt.file);

		//渲染newTodo组件
		newTodo.render(_dom.slot.find("#header"));
		//渲染listTodo组件
		listTodo.render(_dom.slot.find("#main"));
		//渲染sortTodo组件
		sortTodo.render(_dom.slot.find("#footer"));
	}





	//exports.render = render;
})