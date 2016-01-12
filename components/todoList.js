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
		_dom.todosUl = _dom.slot.find("#todo-list");
		_dom.chkAll = _dom.slot.find("#toggle-all");

		//绑定事件函数
		_dom.chkAll.click(function(){
			toggleAll($(this)[0].checked);
		})

		//加载数据
		loadData();
	}
	//加载数据
	function loadData(){
		if(!_dom.slot) return;
		base.trigger('ListTodo_load');

		//Todo总数不为0时，隐藏本组件，否则显示该组件。
		var todosCount = base.request("getTodosCount");
		if(0===todosCount){
			_dom.slot.addClass("hidden");
			return;
		}else{
			_dom.slot.removeClass("hidden");
		}
		listTodos(_opt.filterKey);
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
		_dom.todosUl.html('');
		var todos = base.request("listTodosByCompleted",completed) || [];
		for(var i=0, todo; todo=todos[i]; i++){
			base.request("appendTodo", _dom.todosUl, todo);
		}
	}
	//checkbox全选
	function toggleAll(completed){
		var todos = base.request("getAllTodos");
		$(todos).each(function(i,todo){
			var ok = base.request("toggleCompleted", todo.id, completed);
			ok ? loadData() : console.log("Error of toggleCompleted.");
		});
		loadData();
	}
	//
	function updateChkAllBtn(){
		if(undefined === _dom.chkAll[0])
			return;
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