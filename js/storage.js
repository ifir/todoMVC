define(function(require,exports,module){
	function Storage(){}

	Storage.prototype.put = function(id, data){
		localStorage.setItem( id, JSON.stringify(data) );
	};

	Storage.prototype.get = function(id){
		return JSON.parse( localStorage.getItem(id) || '[]' );
	};

	Storage.prototype.clean = function(id){
		this.put(id,[]);
	}
	exports.Storage = Storage;
})