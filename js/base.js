define(function(require, exports, module){
	var $ = require('jquery');
	var _evtFns = {},
		_fnImpl = {};

	//触发消息(一个消息对应多个事件)
	function trigger(){
		var key = Array.prototype.shift.call(arguments);
		var fns = _evtFns[key];
		if(!fns || 0===fns.length){
			return false;
		}
		//特别注意这里是=而不是==，要是==的话循环就没法进行了。 
		// 这个条件判断很扯，我也比较晕。类似于： 
		// if(a=b) {...} //注意是=
		// 此时如果b是false，那就会返回false了。 
		// 回到上面的例子中，如果i++加出了头，那ary[i++]就是false值了（null,undefined都算），所以条件就成了false，所以循环就断了。 
		// 这个例子局限很大，snandy也提到了，比如你数组中就是有个0，那也可能会导致循环终结。
		for(var i=0,fn; fn=fns[i++];){
			fn.apply(this, arguments);
		}
	}

	//请求消息(一个消息对应一个实现)
	function request(){
		//把arguments的数组第一个删除,
		var key = Array.prototype.shift.call(arguments);
		var fn  = _fnImpl[key];

		if(fn instanceof Function){
			return fn.apply(this, arguments);
		}else{
			return false
		}
	}

	//绑定事件函数（多个）
	function bind(key, fns){
		if(fns instanceof Array){
			for(var i in fns){
				doBind(key, fns[i]);
			}
		}else{
			doBind(key, fns);
		}
	}

	//绑定事件函数
	function doBind(key, fn){
		if(!(fn instanceof Function))
			return;
		_evtFns[key] = _evtFns[key] || [];
		_evtFns[key].push(fn);
	}

	//解除事件函数绑定
	function unBind(key, fn){
		var fns = _evtFns[key];
		if(!fns) return;
		if(!fn){
			fns && (fns.length=0);
		}else{
			for(var i=0,_fn; _fn=fns[i++];){
				if(_fn===fn) fns.splice(i,1);
			}
		}
	}

	//实现请求消息
	function impl(key,fn){
		if(!fn instanceof Function){
			console.log("fn is not a Function.");
		}
		_fnImpl[key] = fn;
	}

	exports.trigger = trigger;
	exports.request = request;
	exports.bind = bind;
	exports.doBind = doBind;
	exports.unBind = unBind;
	exports.impl = impl;
})