var a = 1;
if(a){var x = 2;}
var read = function(e){
	if(e===!0?!--x.readyWait:!x.isReady){
		if(!a.body){
			return setTimeout(x.ready)
		}
		x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(a,[x]),x.fn.trigger&&x(a).trigger("ready").off("ready"))
	}
}
