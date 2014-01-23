var   http = require('http');
var   url=require('url');
var path = require('path');
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
     var ext = path.extname(pathname) || 'html';
     var nh = needHandle(ext); 
     function needHandle(ext){return ext === 'html' || ext === 'js'}
	
     res._end=res.end;
     res.end=function(data){res._end(data);console.log(req.method,res.statusCode,pathname);}
          
     res.on('end',function(){ console.log('end');});

     var option={'host':_host[0],
                  'port':Number(_host[1]||'80'),
                  'path':_url['pathname']+(_url['search']||""),
                  'method':req.method,
                  'headers':req.headers
                  };
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
	var rdata = new BufferHelper();
         if(!(hs['pragma']||"").match(/no-cache/) && !(hs['cache-control']||"").match(/private|no-cache/)){
            hs.etag="2012";
         }
	 
         res.writeHeader(response.statusCode,hs);
         response.on('data',function(chunk){ rdata.concat(chunk); });
         response.on('end',function(){ 
		var data = rdata.toBuffer();
/*
		if(nh) data = data.toString();
		if(ext === 'js'){
			data = processJs(data);		
		}else if(ext === 'html'){
			data = processHtml(data);
		}
*/
		res.write(data);
		res.end(); 
	});
     });
      
     clientReq.on('error',function(e){console.log(e);});
 }).listen(PORT);

function processJs(content){
	return inst.instrumentCode(content);
}

var scripts = [
	         '/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js',
	         '/home/xwm/code/jalangi-master/src/js/analyses/taint/gutil.js',
	         '/home/xwm/code/jalangi-master/src/js/analyses/taint/jsuri-1.1.1.js',
	         '/home/xwm/code/jalangi-master/src/js/analyses/taint/policy.js',
	         '/home/xwm/code/jalangi-master/src/js/analyses/taint/TaintEngine.js',
	         '/home/xwm/code/jalangi-master/src/js/analysis.js'
	         ];
var shead = '';
for(var i = 0 ; i < scripts.length;i++){
	shead += "<script src='file://>" + scripts[i] + "'></script>";
}
function processHtml(content){
	var ret = content.replace(/(<head>.*<\/head>)/,shead+"$1");
	return ret;
}
