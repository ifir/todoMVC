define(function(require,exports,module){
	var $ = require('jquery');
	var base = require('base');

	var _dom = {
		slot : null,
		remainingCount: null,//未完成数量
		completedCount: null//已完成数量
	};

	var _htm = {
		main : 
			"<span id='todo-count'><strong id='remainingCount'>0</strong> items left</span>"+
        	"<ul id='filters'>"+
        		"<li><a href='javascript:void(0)' value='all' class='selected'>All</a></li>"+
        		"<li><a href='javascript:void(0)' value='active'>Active</a></li>"+
        		"<li><a href='javascript:void(0)' value='completed'>Completed</a></li>"+
        	"</ul>"+
        	"<button id='clear-completed'>Clear completed (<span id='completedCount'>0</span>)</button>"
	};

	function render(slot){
		_dom.slot = slot;
		_dom.slot.html(_htm.main);

		//实例DOM对象
		_dom.remainingCount = _dom.slot.find('#remainingCount');//左下角未完成数字
		_dom.completedCount = _dom.slot.find('#completedCount');//右下角已完成数字

		//绑定事件函数
		var filters = _dom.slot.find('#filters');
		filters.find('a').click(function(){
			onFilter($(this));
		});
		var clearBtn = _dom.slot.find('#clear-completed');
		clearBtn.click( clearCompleted );

		//刷新组件状态
		refresh();
	};

	//组件状态刷新函数
	function refresh(){
		if(null===_dom.slot) return;
		//Todo总数为0时，隐藏本组件，否则显示该组件。
		var todosCount = base.request('getTodosCount');
		if(0===todosCount){
			_dom.slot.addClass('hidden');
			return;
		}else{
			_dom.slot.removeClass('hidden');
		}

		var remainingCount = base.request('getRemainingCount');
		_dom.remainingCount.text(remainingCount);

		//完成的Todo数量大于0时显示'clear-completed'按钮，否则隐藏。
		var completedCount = base.request('getCompletedCount');
		if(completedCount>0){
			//parent() 获得当前匹配元素集合中每个元素的父元素
			_dom.completedCount.parent().removeClass('hidden');
			//左下角显示未完成数量
			_dom.completedCount.text(completedCount);
		}else{
			_dom.completedCount.parent().addClass('hidden');
		}
	};
	//筛选all,active,completed三种状态
	function onFilter(filterBtn){
		//获取value获得当前要筛选的状态
		var filterKey = filterBtn.attr('value');
		//closest() 从当前元素开始。沿 DOM 树向上遍历，直到找到已应用选择器的一个匹配为止。
		filterBtn.closest('#filters').find('a').removeClass('selected');
		filterBtn.addClass('selected');
		base.trigger('SortTodo_onFilter',filterKey);
	}
	//右下角Clear completed按钮事件
	function clearCompleted(){
		var ok = base.request('clearCompleted');
		ok ? base.trigger('SortTodo_clearCompleted') : console.log('Error of clearCompleted.');
	};

	exports.render = render;
	exports.refresh = refresh;
})