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
		//获取最后一个todo的id值
		return arr.length>0 ? arr[arr.length-1].id : 0;
	}

	//增加todolist
	function add(todo){
		//todo参数从 request的arguments获取
		var todos = getDB(); //获取'TODO'的数组
		todo.id = ++_opt.currID;//新增id属性
		todos.push(todo); //把todo内容加到todos的数组中
		putDB(todos);//设置新的todo
		return _opt.currID;
	}

	//删除localStorage数据
	function remove(id){
		var todos = getDB();
		todos.splice(indexByTodoID(id),1);//删除id对应的数据
		return putDB(todos);
	}

	//更新localStorage数据
	function update(todo){
		var todos = getDB();
		for(var i=todos.length-1; i>=0; i--){
			if(todo.id==todos[i].id){
				for(var p in todo){
					//把最新获取的todo的参数赋值给todos,更新todos的数据
					todos[i][p] = todo[p];
				}
				// break 语句用于跳出循环。
				// continue 用于跳过循环中的一个迭代。
				// break 语句跳出循环后，会继续执行该循环之后的代码
				//跳出循环，不在执行for循环,还会执行后面的语句
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
				//通过id查询,返回查询的结果
				return todos[i];
			}
		}
	}

	//查（遍历）
	//查询compled的状态,进行分类
	function list(completed){
		var todos = getDB();
		if(undefined===completed){
			return todos;
		}else{
			var rsTodos = [];//用来存储查询的结果
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