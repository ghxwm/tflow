#! /usr/bin/env node
var path=require('path');
var fs = require('fs');


//var instFile=path.resolve(__dirname,'../../src/js/instrument/esnstrument.js');
//var inst = require(instFile);


var runMode = "nodejs";//window|nodejs;

var scripts = ['global.js',
	         '/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js',
	         '/home/xwm/code/jalangi-master/src/js/analyses/taint/gutil.js',
	         '/home/xwm/code/jalangi-master/src/js/analyses/taint/jsuri-1.1.1.js',
	         '/home/xwm/code/jalangi-master/src/js/analyses/taint/policy.js',
	         '/home/xwm/code/jalangi-master/src/js/analyses/taint/TaintEngine.js',
	         '/home/xwm/code/jalangi-master/src/js/analysis.js'
	         ];


function prependScripts(){
	var runner = null,i;
	var context = global;
	if(runMode === 'window'){
		var jsdom = require('jsdom').jsdom;
		var document = jsdom("<html><head></head><body>hello world</body></html>");
		var win = document.parentWindow;
		win.require=require;
		win.process=process;
		context = win;
		global._win = win;
		runner = runInWindow;
	}else{
		runner=runInModule;
	}
	for(i=0;i<scripts.length;i++){
		runner(context,scripts[i]);
	}
}

function runInWindow(win,fileName,inst){
	var code = fs.readFileSync(fileName).toString();
	if(inst){
		code = win.T$.instrumentCode(code,true);
	}
	win.run(code,fileName);
}

function runInModule(global,fileName){
	if(fileName && fileName.charAt(0) !== '/'){
		fileName = path.resolve(__dirname,fileName);
	}
	require(fileName);
}

function runSAP(){ //run single application page
	prependScripts();
	var args = process.argv.slice(2)
	if(args.length != 1){
		console.log('usage:runner.js fileName.')
	}
	var file = args[0] || 'c.js',
		ifile=file.replace('.js','_t_.js');
	var t$;
	if(runMode === 'window'){
		t$ = global._win.T$;
		t$.instrumentFile(file);
		runInWindow(global._win,ifile,true);
	}else{
		t$ = global.T$;
		t$.instrumentFile(file);
		runInModule(null,ifile);
	}
	
	
}

runSAP();

/*var document = jsdom("<html><head></head><body>hello world</body></html>");
var win = document.parentWindow;
win.require=require;

for(var i = 0 ;i < scripts.length;i++){
	runInWindow(window,scripts[i]);
}

runInWindow(window,'c.js',true);
*/
/*jsdom.env({
	html:'<html><body></body></html>',
	scripts:['global.js',
	         '/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js',
	         'file:///home/xwm/code/jalangi-master/src/js/analyses/taint/gutil.js',
	         'file:///home/xwm/code/jalangi-master/src/js/analyses/taint/policy.js',
	         '/home/xwm/code/jalangi-master/src/js/analyses/taint/TaintEngine.js'],
	features:{
			"FetchExternalResources": ['script', 'link', 'img', 'css', 'frame'],
		  "ProcessExternalResources": ['script', 'frame', 'iframe'],
		  "MutationEvents": '2.0',
		  "SkipExternalResources": false
	},
	done:function(errors,window){
		//console.log('x='+window.x);
		if(errors){console.log(JSON.stringify(errors));}
		
		
		//window.loadScript('c.js');
		var doc = window.document;
		var scripts = doc.getElementsByTagName("script");
		var srcs = [];
		for(i =0;i < scripts.length;i++){
			srcs.push(scripts[i].getAttribute('src'));
		}
		console.log("import script files:"+srcs.join(','));
		console.log("content:"+window.document.innerHTML);
		
		window.close();
	}
});
*/