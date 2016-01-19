define(function(require, exports, module){
	var $ = require('jquery');
	var _evtFns = {},//储存触发事件的函数
		_fnImpl = {};//储存请求处理的函数

	//触发消息(一个消息对应多个事件)
	function trigger(){
		//把arguments的数组第一个删除,并返回删除的元素
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
			//bind(key,fns)的fns的arguments参数指向trigger的arguments
			//也就是把trigger的arguments传递给sTodo函数
			fn.apply(this, arguments);
		}

	}

	//请求消息(一个消息对应一个实现)
	//key作为请求的标识，与impl()的key值相对应才能完成完整的请求
	//arguments的第一个参数为key,第二个参数传递给impl(key,fn)里的fn也就是sTodo对应的函数
	function request(){
		//把arguments的数组第一个删除,并返回删除的元素
		var key = Array.prototype.shift.call(arguments);
		var fn  = _fnImpl[key];

		if(fn instanceof Function){
			//impl(key,fn)的fn的arguments参数指向request的arguments
			//也就是把request的arguments传递给sTodo函数
			return fn.apply(this, arguments);
		}else{
			return false
		}
	}

	//绑定事件函数（多个）
	function bind(key, fns){
		//fns为数组存放函数
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
		//fn必须是Function
		if(!(fn instanceof Function))
			return;
		//_evtFns[key]与trigger的_evtFns[key]相对应
		//把sTodo中的函数存在_evtFns[key]中
		_evtFns[key] = _evtFns[key] || [];
		_evtFns[key].push(fn);//把fn存入_evtFns[key]数组中
	}

	//解除事件函数绑定
	function unBind(key, fn){
		var fns = _evtFns[key];//fns为一个数组
		if(!fns) return;//fns如果是undefind或null
		if(!fn){
			//if(fns){fns.length=0}
			fns && (fns.length=0);
		}else{
			for(var i=0,_fn; _fn=fns[i++];){
				//splice() 方法从数组中删除元素(可选：并添加新的元素)
				//返回被删除的元素
				if(_fn===fn) fns.splice(i,1);//删除一个第i个位置的元素
			}
		}
	}

	//实现请求消息
	function impl(key,fn){
		if(!fn instanceof Function){
			console.log("fn is not a Function.");
		}
		//把fn存在_fnImpl[key]中
		//与request的_fnImpl[key]相对应
		//request提供arguments参数，传给sTodo
		_fnImpl[key] = fn;
	}

	exports.trigger = trigger;
	exports.request = request;
	exports.bind = bind;
	exports.doBind = doBind;
	exports.unBind = unBind;
	exports.impl = impl;
})