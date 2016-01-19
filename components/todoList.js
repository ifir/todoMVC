define(function(require,exports,module){
	var $ = require('jquery');
	var base = require('base');


	var _opt = {
		filterKey: "all"
	};

	var _dom = {
		slot   : null,
		chkAll : null
	};

	var _htm = {
		main :
			"<input id='toggle-all' type='checkbox'>"+
            "<ul id='todo-list'></ul>"
	};

	function render(slot){
		_dom.slot = slot;
		_dom.slot.html(_htm.main);

		//实例DOM对象
		_dom.todosUl = _dom.slot.find("#todo-list");//todos列表
		_dom.chkAll = _dom.slot.find("#toggle-all");//全选按钮

		//绑定事件函数
		//全选事件
		_dom.chkAll.click(function(){
			toggleAll($(this)[0].checked);//传递true和false
		})

		//加载数据
		loadData();
	}
	//加载数据
	function loadData(){
		if(!_dom.slot) return;//没有list节点,return
		base.trigger('ListTodo_load');//触发ListTodo_load事件

		//Todo总数为0时，隐藏本组件，否则显示该组件。
		var todosCount = base.request("getTodosCount");
		if(0===todosCount){
			_dom.slot.addClass("hidden");
			return; //如何没有todos就直接跳出函数,提高性能
		}else{
			_dom.slot.removeClass("hidden");
		}
		//列表的状态
		listTodos(_opt.filterKey);
		//更新全选按钮状态
		updateChkAllBtn();
	}
	//列表的状态
	function listTodos(filterKey){
		var completed;
		switch(filterKey){
			case 'all':
				_opt.filterKey = 'all';
				break;
			case 'active':
				_opt.filterKey = 'active';
				completed = false;
				break;
			case 'completed':
				_opt.filterKey = 'completed';
				completed = true;
				break;
			default:
				_opt.filterKey = 'all';
				break;
		}
		_dom.todosUl.html('');//清空todos
		//请求listTodosByCompleted的函数
		//todos存储completed状态的数据数组
		var todos = base.request("listTodosByCompleted",completed) || [];
		for(var i=0, todo; todo=todos[i]; i++){
			//请求appendTodo的函数
			//添加新的todoItem
			base.request("appendTodo", _dom.todosUl, todo);
		}
	}
	//checkbox全选
	function toggleAll(completed){
		var todos = base.request("getAllTodos");//获取所有todos的数据
		$(todos).each(function(i,todo){
			var ok = base.request("toggleCompleted", todo.id, completed);//更新todod的completed状态
			ok ? loadData() : console.log("Error of toggleCompleted.");
		});
		loadData();
	}
	//更新全选按钮状态
	function updateChkAllBtn(){
		if(undefined === _dom.chkAll[0]) //如果没有全选按钮,return
			return;
		//getCompletedCount获取已完成的Todo数量 && getRemainingCount获取未完成的Todo数量
		//当全选按钮为选中时表示未完成的Todo数量为0并且完成的todo数量要大于0,防止todo数量为零,全选按钮的状态bug
		if( base.request('getCompletedCount')>0 && base.request('getRemainingCount')==0 ){
			_dom.chkAll[0].checked = true;
		}else{
			_dom.chkAll[0].checked = false;
		}
	}

	exports.render = render;
	exports.loadData = loadData;
	exports.listTodos = listTodos;

})