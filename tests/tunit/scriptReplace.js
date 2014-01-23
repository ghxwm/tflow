var fs = require('fs');
var file = process.argv[2];
var log = console.log.bind(console);
var content = fs.readFileSync(file).toString();
var inst = require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument');
log(content.substring(0,50));

var scripts = [
		 'global.js', 
		 'esprima.js',
		 'escodegen.browser.js',
	         'esnstrument.browser.js',
	         'gutil.js',
	         'jsuri-1.1.1.js',
	         'policy.js',
//	         'NOPEngine.js',
	         'TaintEngine.js',
	         'analysis.js'
		//'ga_t_.js'
	         ];
var shead = '\n';
for(var i = 0 ; i < scripts.length;i++){
	shead += "<script src='http://127.0.0.1:8888/util/" + scripts[i] + "' type='text/javascript'></script>\n";
}


function processHtml(content,pathname){
	function replacer(matched,p1,p2,offset,all){
		//return matched;
		//console.log('matched from replace:'+matched)
		if(!p1)p1 = ' type="text/javascript"';	
		else if(p1.indexOf('src') != -1 || !p2){ //code from site
			//console.log('matched:'+matched);			
			return matched;
		}
		if(p2){ //local code
			//console.log('instrumenting script code:'+p2);
			if( p2[0] === '{' )p2="("+p2+")";//p2 is object literal
			var r = "<script inst "+p1+">"+p2+"</script>"; 
			console.log('matched2:'+ r);			
			return r;
			
		} 
	}
	//inject script file and instrument inner script code;
	var ret = content.replace(/<script([\s\S]*?)>([\s\S]*?)<\/script>/g,replacer);
	//console.log('instrumented html content:'+ret);
	return ret;
}

content = processHtml(content,file);
fs.writeFile(file+'_t',content)
