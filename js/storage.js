define(function(require,exports,module){
	function Storage(){}
	//html5  localStorage本地存储封装
	//设置localStorage
	Storage.prototype.put = function(id, data){
		localStorage.setItem( id, JSON.stringify(data) );
	};
	//获取localStorage
	Storage.prototype.get = function(id){
		return JSON.parse( localStorage.getItem(id) || '[]' );
	};
	//清楚localStorage
	Storage.prototype.clean = function(id){
		this.put(id,[]);
	}
	exports.Storage = Storage;
})