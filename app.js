require.config({
	baseUrl : './components',
	paths : {
		jquery 	: '../js/jquery.min',
		base 	: '../js/base',
		storage	: '../js/storage',
		sTodo	: '../services/sTodo'
	},
});

require(['jquery','msg','todoApp'],function($,msg,todoApp){
	todoApp.render( $('#app') );
});