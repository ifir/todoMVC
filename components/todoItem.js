define(function(require, exports, module){
	var $ = require('jquery');
	var base = require('base');

	var _opt = {
		file : "todoItem.js"
	};

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
})