var SPECIAL_PROP_POLICY="*policy*";
T$[SPECIAL_PROP_POLICY] = T$[SPECIAL_PROP_POLICY] || {};
(function(sandbox){
	//url list
	sandbox.whitelist=[];
	//object property list
	sandbox.smap={
			'document':['cookie','domain','forms','lastModified','links','location','referrer','title','URL'],
			'history':['go','back','forward','length','state'],
			'location':['protocol','host','auth','hostname','port','pathname','href','hash','search'],
			'window':[],
			'#image':['src'],
			'#iframe':['src'],
			'#form':[''],
			'global':['t_x','t_y']
	};
	sandbox.smap['window']=sandbox.smap['global'];
	sandbox.smap['#document']=sandbox.smap['document'];
	sandbox.hasLocation = function(objName,propName){
		objName = objName || 'global';
		if(HOP(this.smap,objName)){
			if(HOP(this.smap[objName],propName)){
				return true;
			}
		}
		return false;
	}
	
	sandbox.inWhitelist = function(url){
		var i = 0 ,w;
		for(;i < whitelist.length;i++){
				w=whitelist[i];
				if(w instanceof RegExp && w.test(url)){
						return true;
				}else if(w === url){
					return true;
				}
		}
		return false;
	}
	
	//convert array to map
	function arrToMap(arr){
		var ret = {};
		for(i in arr){
			ret[arr[i]]=true;
		}
		return ret;
	}
	//element search in hash is fast than array.
	var list,smap=sandbox.smap;
	for(k in smap){
		if(HOP(smap,k)){
			list=smap[k];
			smap[k]=arrToMap(list);
		}
	}
}(T$[SPECIAL_PROP_POLICY]));
