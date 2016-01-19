define(function(require, exports, module){
	var $ = require('jquery');
	var base = require('base');
	var sTodo = require('sTodo');
	var todoList = require('todoList');
	var todoItem = require('todoItem');
	var todoSort = require('todoSort');
	/** ------ 请求消息的实现 ------ **/
	//添加新的todoItem
	base.impl("addTodo", sTodo.add);//impl(key,fn)   fn为sTodo的函数
	//获取Todo总数量
	base.impl("getTodosCount", sTodo.getAllCount);
	//通过查询todos中compled的状态进行分类
	base.impl("listTodosByCompleted", sTodo.list);
	//添加新的todoItem
	base.impl("appendTodo", todoItem.render);
	//删除todoItem
	base.impl("deleteTodo", sTodo.remove);
	//获取所有todos数据
	base.impl("getAllTodos", sTodo.getDB);
	//获取已完成的Todo数量
	base.impl("getCompletedCount", sTodo.getCompletedCount);
	//获取未完成的Todo数量
	base.impl("getRemainingCount", sTodo.getRemainingCount);
	//清除已完成的Todo
	base.impl("clearCompleted", sTodo.clearCompleted);
	//更新todod的completed状态
	base.impl( 'toggleCompleted', function(id,completed){
		return sTodo.update({id:id,completed:completed});
	});
	//更新todo的标题名称
	base.impl( 'updateTodoTitle', function(id,title){
		return sTodo.update({id:id,title:title});
	});

	/** ------------------------- 触发消息的绑定 ------------------------- **/
	//NewTodo组件的消息： bind(key, fns)   fns为数组
	base.bind('NewTodo_addTodo', [
		todoList.loadData
	]);
	//ListTodo组件的消息：
	base.bind('ListTodo_load', [
		todoSort.refresh
	]);
	//TodoItem组件的消息：
	base.bind('TodoItem_removeTodo',[
		todoList.loadData
	]);
	base.bind('TodoItem_toggleCompleted',[
		todoList.loadData
	]);
	//SortTodo组件的消息：
	base.bind('SortTodo_onFilter', [
		todoList.listTodos
	]);
	base.bind('SortTodo_clearCompleted', [
		todoList.loadData
	]);
})