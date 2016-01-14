define(function(require, exports, module){
	var $ = require('jquery');
	var sto = require('storage');
	var storage = new sto.Storage();
	var _opt = {
		STORAGE_ID : "TODO",//localStorage Key
		currID : getCurrID()//用于存储列表增加之后的id值
	}
	//获取localStorage
	function getDB(){
		return storage.get("TODO");
	}
	//设置localStorage
	function putDB(todos){
		storage.put(_opt.STORAGE_ID, todos);
		return true;
	}
	//删除localStorage
	function cleanDB(){
		storage.clean(_opt.STORAGE_ID);
		return true;
	}

	//获得Todo自增ID的当前值
	function getCurrID(){
		var arr = getDB();
		return arr.length>0 ? arr[arr.length-1].id : 0;
	}

	//增加localStorage数据
	function add(todo){
		console.log(todo)
		var todos = getDB();
		todo.id = ++_opt.currID;
		todos.push(todo);
		putDB(todos);
		return _opt.currID;
	}

	//删除localStorage数据
	function remove(id){
		var todos = getDB();
		todos.splice(indexByTodoID(id),1);
		return putDB(todos);
	}

	//更新localStorage数据
	function update(todo){
		var todos = getDB();
		for(var i=todos.length-1; i>=0; i--){
			if(todo.id==todos[i].id){
				for(var p in todo){
					todos[i][p] = todo[p];
				}
				break;
			}
		}
		return putDB(todos);
	}

	//查（单个）
	function query(id){
		var todos = getDB();
		for(var i=todos.length-1; i>=0; i--){
			if(todos[i].id == id){
				return todos[i];
			}
		}
	}

	//查（遍历）
	function list(completed){
		var todos = getDB();
		if(undefined===completed){
			return todos;
		}else{
			var rsTodos = [];
			$(todos).each(function(i,todo){
				if(completed === todo.completed)
					rsTodos.push(todo);
			});
			return rsTodos;
		}
	}

	//获取Todo总数量
	function getAllCount(){
		return getDB().length;
	}
	//获取未完成的Todo数量
	function getRemainingCount(){
		var todos = getDB();
		var remainingCount = 0;
		$(todos).each(function(i){
			if(false===todos[i].completed){
				remainingCount++;
			}
		});
		return remainingCount;
	}

	//获取已完成的Todo数量
	function getCompletedCount(){
		return getAllCount() - getRemainingCount();
	}

	//清除已完成的Todo
	function clearCompleted(){
		var todos = getDB();
		var newTodos = [];
		$(todos).each(function(i,todo){
			if(false===todo.completed){
				newTodos.push(todo);
			}
		});
		return putDB(newTodos);
	}

	//根据Todo的id获取Todo在List中的索引
	function indexByTodoID(todoID){
		var todos = getDB();
		for(var i=0,todo; todo=todos[i];i++){
			if(todoID == todo.id){
				return i;
			}
		}
	}



	exports.getDB = getDB;
	exports.add = add;
	exports.remove = remove;
	exports.update = update;
	exports.list = list;
	exports.getAllCount = getAllCount;
	exports.getCompletedCount = getCompletedCount;
	exports.getRemainingCount = getRemainingCount;
	exports.clearCompleted = clearCompleted;

})