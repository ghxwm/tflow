console.log('gutil.js is included');

global.T$ = global.T$ || {};

global.HOP = function(obj, prop) {
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

	    var sprintf = function (match, number) {
	      return number in args ? args[number] : match;
	    };

	    return this.replace(sprintfRegex, sprintf);
	  };
	}


	global.ConcolicValue = function(concrete, symbolic) {
        this.concrete = concrete;
        this.symbolic = symbolic;
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
