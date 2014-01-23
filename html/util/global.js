var isWin = typeof window !== 'undefined'? true:false;
var global = isWin?window :GLOBAL;
global.isWin = isWin;
if(isWin)window.global = window;

if(isWin){
	global.loadScript = function(fileName){
		/*var doc = window.document;
		var scriptEl = doc.createElement("script");
		var attrInsted = "insted";
		scriptEl.setAttribute(attrInsted,'');
		fileName = "file://" + require('path').resolve(process.cwd(),fileName);
		scriptEl.setAttribute('src',fileName);
		console.log(scriptEl.getAttribute('src'));
		document.documentElement.appendChild(scriptEl);*/
		var path = require('path'),fs=require('fs');
		var fullPath=fileName;
		var code = fs.readFileSync(fullPath,'utf-8').toString();
		var icode = T$.instrumentCode(code,fullPath);
		fs.writeFile(fullPath.replace('.js','_t_.js'),icode);
		run(icode);
	}
}else{
	global.loadScript = function(fileName){
		var path = require('path'),fs=require('fs');
		var fullPath=fileName;
		var code = fs.readFileSync(fullPath,'utf-8').toString();
		var icode = T$.instrumentCode(code,fullPath);
		fs.writeFile(fullPath.replace('.js','_t_.js'),icode);
		var Script = process.binding('evals').NodeScript;
		var runInThisContext = Script.runInThisContext;
		runInThisContext(icode,fullPath);
	}
}


global.T$ = {};

