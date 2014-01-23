var   http = require('http');
var   url=require('url');
var path = require('path');
var zlib = require('zlib');
//var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');
var inst = require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument');
var   PORT=5000;
 
console.log("http proxy start at port: "+PORT);
 
http.globalAgent.maxSockets=16;
 
http.createServer(function(req,res){
      
     var _url=url.parse(req.url);
     var _host=req.headers.host.split(":");
     var pathname = _url['pathname'] || ''; 
     
     var ext = path.extname(pathname).substring(1);
     var nh = needHandle(ext); 
     function needHandle(ext){return ext === 'html' || ext === 'js' || ext === 'javascript' || ext === 'x-javascript'}
     		function isJsFileType(ext){return ext === 'js' || ext === 'javascript' || ext === 'x-javascript';}
     
     res._end=res.end;
     res.end=function(data){res._end(data);console.log('finish request '+ req.method,res.statusCode,pathname);}
          
     res.on('end',function(){ console.log('end');});
     req.headers['connection']='close';
	delete req.headers['proxy-connection']     
	req.headers['accept-encoding']='identity';
     console.log(JSON.stringify(req.headers));
	var option={'host':_host[0],
                  'port':Number(_host[1]||'80'),
                  'path':_url['pathname']+(_url['search']||""),
                  'method':req.method,
                  'headers':req.headers
                  };
     console.log('proxy server send request '+pathname+'\nheaders'+JSON.stringify(req.headers));
     if(req.headers['if-none-match']==2012){
        res.statusCode=304;
        res.end();
        return;
     }
      
     var clientReq=http.request(option);
     req.on('data',function(c){ clientReq.write(c);});
     req.on('end',function(){ clientReq.end();});
 
     clientReq.on('response', function (response) {
         var hs=response.headers;
	var gziped = hs['content-encoding'] === 'gzip';
	var ctype = hs['content-type'];
	if(ctype){ctype=path.basename(ctype.split(";")[0]);nh=needHandle(ctype);}
	if(hs['content-security-policy'])delete hs['content-security-policy'];
	console.log("remote server response header:"+JSON.stringify(hs));
	var rdata = new BufferHelper();
         if(!(hs['pragma']||"").match(/no-cache/) && !(hs['cache-control']||"").match(/private|no-cache/)){
            hs.etag="2012";
         }
	 
        // res.writeHeader(response.statusCode,hs);
         response.on('data',function(chunk){ 
		rdata.concat(chunk); 
	});
         response.on('end',function(){ 
		var data = rdata.toBuffer();
		if(data.length === 0){res.end();}
		if(nh) {
			if(gziped){
				zlib.gunzip(data,function(err,buf){ //解压数据.
					data = buf.toString();
					processData(data);
					return ;
				});
			}else{data = data.toString();}
		}
		processData(data);
		function processData(data){
			if( isJsFileType(ext) || isJsFileType(path.basename(ctype)) ){
				data = processJs(data,path.basename(pathname));		
			}else if(ctype === 'html'){
				data = processHtml(data.toString(),pathname);
			}
			if(nh)console.log('receive data from ' + pathname + ':\n' + data.toString().substring(0,100));
			hs['content-length']=data.length;
			res.writeHead(response.statusCode,hs);
			res.write(data);
			res.end(); 
		}
		
		});
     });
      
     clientReq.on('error',function(e){console.log(e);});
 }).listen(PORT);


function processJs(content,pathname){
	console.log('processing file:' + pathname+"\n");
	//if(pathname == 'ga.js'){return '';}
	try{
		var ret =  inst.instrumentCode(content,pathname);
		console.log('instrumented file:' + pathname+"\n" + ret.substring(0,100));
		return ret;
	}catch(e){
		console.log('instrument file:+'+pathname+" exception!",e.stack)
		return content;
	}finally{
		
	}
}

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
		if(p1.indexOf('src') != -1 || !p2){
			return matched;		
		}
		if(!p1)p1 = 'type="text/javascript"';		
		if(p2){
			//console.log('instrumenting script code:'+p2);
			if( p2[0] === '{' )p2="("+p2+")";//p2 is object literal
			var ret = "<script inst "+p1+">"+inst.instrumentCode(p2,pathname)+"</script>"
			return ret;
		} 
	}
	//inject script file and instrument inner script code;
	console.log('before instrumented html content:'+content);
	//var ret = content;
	var ret = content.replace(/(<head>[\s\S]*?<\/head>)/,shead+"$1").replace(/<script([\s\S]*?)>([\s\S]*?)<\/script>/g,replacer);
	//var ret = content.replace(/(<head>[\s\S]*?<\/head>)/,shead+"$1");
	//console.log('instrumented html content:'+ret);	
	return ret;
}
