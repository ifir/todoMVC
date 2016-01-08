require.config({
	baseUrl : './components',
	paths : {
		jquery 	: '../js/jquery.min',
		base 	: '../js/base',
		// storage	: '../js/storage',
		// sTodo	: '../services/sTodo'
	},
});

require(['jquery','msgHub','todoApp'],function($,msgHub,todoApp){
	todoApp.render( $('#app') );
});