define(function(require, exports, module){
	var $ = require('jquery');
	var base = require('base');

	var _dom = {
		slot : null
	};

	var _htm = {
		main :
			"<li class='todoLi' id='@id'>"+
	        	"<div class='view'>"+
	        		"<input class='toggle' type='checkbox'>"+
	        		"<label class='todoTitle'>@title</label>"+
	        		"<button class='destroy'></button>"+
	        	"</div>"+
	        	"<form><input class='edit'></form>"+
	        "</li>"
	};

	//组件渲染函数
	function render(slot, todo){
		if(!slot || !todo) return; //校验参数

		_dom.slot = slot;
		//进行替换
		var todoLi = $( _htm.main
			.replace('@id',todo.id)
			.replace('@title',todo.title) );
		//如果todoItem完成了添加completed的类
		if(todo.completed){
			todoLi.addClass('completed');
			//checkbox选中
			todoLi.find('input[type=checkbox]')[0].checked = 'checked';
		}

		//绑定事件函数
		//删除todoItem
		todoLi.find('.destroy').click(function(){
			removeTodo(todoLi);
		});
		//修改todoItem是否完成
		todoLi.find('.toggle').click(function(){
			toggleCompleted( todoLi, $(this) );
		});
		//双击修改todoItem标题
		todoLi.find('.todoTitle').dblclick(function(){
			onEditTodo( todoLi );
		});
		//新添加todoItem添加在列表的前面
		//prepend向元素的开头添加与append相反
		_dom.slot.prepend(todoLi);
	};

	//删除Todo
	function removeTodo(todoLi){
		var ok = base.request( "deleteTodo", todoLi.attr("id") );
		ok ? base.trigger("TodoItem_removeTodo") : console.log("Error of removeTodo.");
	};

	//变更Todo的状态
	function toggleCompleted(todoLi, chk){
		var ok = base.request('toggleCompleted', todoLi.attr('id'), chk[0].checked);
		ok ? base.trigger('TodoItem_toggleCompleted') : console.log('Error of toggleCompleted.');
	};

	//编辑Todo
	function onEditTodo(todoLi){
		todoLi.addClass('editing');
		var title = todoLi.find('.todoTitle').text();//把title存起来
		var editInpt = todoLi.find('input[class=edit]');//获取编辑的input元素
		editInpt.blur(function(){//失去焦点触发
			var title = editInpt.val();//把title赋值给editInpt的value
			var ok = base.request('updateTodoTitle',todoLi.attr('id'),title);
			if(ok){
				todoLi.removeClass('editing');
				todoLi.find('.todoTitle').text(title);
			}else{
				console.log('Error of onEditTodo.');
			}
		});
		//进入焦点触发
		editInpt.val(title).focus();
	};

	exports.render = render;
})