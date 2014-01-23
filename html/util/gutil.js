console.log('gutil.js is included');

global.T$ = global.T$ || {};

global.HOP = function(obj, prop) {
								if(obj == null)return false;
            return Object.prototype.hasOwnProperty.call(obj, prop);
}

global.isArr = function(val) {
    return Object.prototype.toString.call( val ) === '[object Array]';
}

global.isNative = function (f) {
    return f.toString().indexOf('[native code]') > -1 || f.toString().indexOf('[object ') === 0;
}

/*global.loadScript = function(fileName){
	var path = require('path'),fs=require('fs');
	//var fullPath = path.relative(fileName);
	var fullPath=fileName;
//	var extname = path.extname(fileName);
	var code = fs.readFileSync(fullPath,'utf-8');
	var icode = T$.instrumentCode(code,true);
	fs.writeFileSync(fullPath.replace('.js','_t_.js'),icode);
	var Script = process.binding('evals').NodeScript;
	var runInThisContext = Script.runInThisContext;
	runInThisContext(icode,fullPath);
}*/

if (!String.prototype.format) {
	  String.prototype.format = function() {

	    var args = arguments;
	    var sprintfRegex = /\{(\d+)\}/g;
	    var toStrFunc;
	    	for(var i in args){
	    		if(typeof args[i] === 'object' && args[i]){
	    			if(args[i].toString instanceof ConcolicValue){
	    					toStrFunc = ConcolicValue.getConcrete(args[i].toString);
	    				}else{
	    					toStrFunc = args[i].toString;
	    				}
	    				if(typeof toStrFunc !== 'function'){
	    					toStrFunc=Object.prototype.toString;
	    				}
	    				args[i] = toStrFunc.call(args[i]);
	    		}
	    	}
	    
	    var sprintf = function (match, number) {
	      return number in args ? args[number] : match;
	    };

	    return this.replace(sprintfRegex, sprintf);
	  };
	}


global.ConcolicValue = function(concrete, symbolic,metainfo) {
        this.concrete = concrete;
        this.symbolic = symbolic;
        if(metainfo != undefined)this.dict=metainfo;
    }

	

    ConcolicValue.prototype.toString = function() {
        return "concrete={0},symbolic={1}".format(this.concrete,this.symbolic);
    };

    ConcolicValue.prototype.valueOf = function() {
        if (this.concrete !== null && this.concrete !== undefined)
            return this.concrete.valueOf();
        else
            return this.concrete;
    }
    
    	ConcolicValue.prototype.setSymbolic =function(sym){
    				this.symbolic = sym;
    	}
    
    ConcolicValue.getConcrete = function (val) {
        if (val instanceof ConcolicValue) {
            return val.concrete;
        } else {
            return val;
        }
    }

    ConcolicValue.getSymbolic = function (val) {
        if (val instanceof ConcolicValue) {
            return val.symbolic;
        } else {
            return undefined;
        }
    }
