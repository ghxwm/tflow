/**
 * TSET为间接信息流.
 *   obj.tinfo为对象的污点信息.
 */
(function(sandbox){
	
		//无重复元素的集合类
		function Set(o){
			this.__data=[];
			this.size = 0;
			this.add(o);
		}
		
		Set.prototype.add = function(o) {//向集合中添加元素,元素可以是对象,数组,集合
			if(o instanceof Set){
				this.addCollection(o.__data);
			}else if(o instanceof Array){
				this.addCollection(o);
			}else{
				this.addElement(o);
			}
			
		}
		
		Set.prototype.addElement = function(e){
			if(typeof e === 'undefined')return ;
			if(!this.has(e)){
				this.__data.push(e);
				this.size += 1;
			}
		}
		
		Set.prototype.addCollection = function(arr){
			for(i in arr){
				this.addElement(arr[i]);
			}
		}
		
		Set.prototype.has = function(e){
			
			if(HOP(e,'__eq__')){
				for(i in this.__data){  //使用对象的__eq__方法进行比较
					if(e.__eq__(this.__data[i]))return true;
				}
			}
			
			for(i in this.__data){
				if(this.__data[i] === e)return true;
			}
			return false;
		}
		
		Set.prototype.remove = function(e){
			if(HOP(e,'__eq__')){
				for(i in this.__data){  //使用对象的__eq__方法进行比较
					if(e.__eq__(this.__data[i])){
						delete this.__data[i];
						this.size--;
					}
				}
			}
			for(i in this.__data){
				if(this.__data[i] === e){
					delete this.__data[i];
					this.size--;
				}
			}
		}
		
		Set.prototype.clear = function(){
			this.__data=[];
			this.size = 0;
		}
		
		Set.prototype.size = function() {
			return this.size;
		}
		
		Set.prototype.data = function() {
			return this.__data;
		}
	
		Set.prototype.isSubset = function(t){//s是t的子集?
			if(!t instanceof Set)return false;
			return !t.isSuperset(this);
		}
		
		Set.prototype.isSuperset = function(t) { //s是t的超集?
			var i,e;
			if(!t instanceof Set)return false;
			for(i = 0 ;i < t.size; i++){
				e = t.__data[i];
				if(!this.has(e)){
					return false;
				}
			}
			return false;
		}
		
		Set.prototype.union = function(t) { //集合的并集
			var c = this.copy();
			c.add(t);
			return c;
		}
		
		Set.prototype.intersection = function(t) {//集合的交集
			var ret = new Set(),e,i;
			if(!t instanceof Set)throw Error;
			
			for(i in t.__data){
				if(HOP(t.__data,i)){
					e = t.__data[i];
					if(!this.has(e)){
						ret.add(e);
					}
				}
			}
			return ret;
		}
		
		Set.prototype.difference = function(t){
			var c = this.copy(),i;
			if(!t instanceof Set)throw Error;
			for(i in t.__data){
				if(HOP(t.__data,i)){
					e = t.__data[i];
					c.remove(e);
				}
			}
			return c;
		}
		
		Set.prototype.copy = function() { //浅拷贝
			var ret = new Set();
			ret.__data = [].concat(this.__data);
			ret.size = this.size;
			return ret;
		}
		
		Set.prototype.toString = function(){
			return "["+this.__data.join(',')+"]";
		}
		
		//污点信息类
		function TLabel(label,url){
			this.label = label;
			this.url = url;
		}
		
		TLabel.prototype.toString = function(){
			return "{label:{0},url:{1}}".format(this.label,this.url);
		}
		
		TLabel.prototype.__eq__ = function(other) {
			if(other instanceof Taint){
				return this.label === other.label && this.url === other.url;
			}
			return false;
		}
		
		TLabel.prototype.isLabeled = function(lbl){
			return this.label === label;
		}
		
		TLabel.prototype.isIntegrity = function(){
			return HOP(SLABEL.UMARK,this.label);
		}
		
		var HOST_URL = new Uri("");
		var log = console.log;
		
		var SLABEL = {  //安全标记
				SECRET:'secret',
				UNTRUST:'untrust',
				UMARK:{  //变量所在页面与主页面之间的关系
					SAME_PAGE:'sp', //同一个页面
					SAME_ORIGINAL:'so',//同源
					SAME_DOMAIN:'sd',//同域名
					WHITELIST:'wl',//白名单
					UNKNOWN:'uk',//未知
				}
				
		};
		
    function TaintEngine(executionIndex) {

        if (!(this instanceof TaintEngine)) {
            return new TaintEngine(executionIndex);
        }

        var getConcrete = this.getConcrete = ConcolicValue.getConcrete;
        var getSymbolic = this.getSymbolic = ConcolicValue.getSymbolic;
        
        this.installAxiom = function(c) { }


        this.makeConcolic = function(idx, val, getNextSymbol) {
            return val;
        }

        this.makeConcolicPost = function() { }

   var SPECIAL_PROP_OBJ = "*T$*";   //对象字面量标记
		var SPECIAL_PROP_FUN = "*T$I*";//函数字面量标记
		var SPECIAL_PROP_TAINT = "taint_"; //存储污点信息的属性名称前缀
		var SPECIAL_PROP_TAINT_ROOT = "*root*";
		var SPECIAL_PROP_OBJ_ALIAS = "*alias*";//对象的名字.用于别名
		var SPECIAL_PROP_URL = "*url*"; //url属性
		var SPECIAL_PROP_WITH = "*with*";
		var SPECIAL_PROP_LENGTH="length";
		var SPECIAL_PROP_POLICY="*policy*";
		var GLOBAL = global || window; //全局对象
		var TRC = {};//taint read counter
		var TWC = {};//taint write counter
		var policy = T$[SPECIAL_PROP_POLICY];
       		//log('policy keys is '); 
        		//当前间接流污点集合的getter方法
        this.currentTaintSet = function() {
        				return this.TSET;
        			}
        //当前的间接流污点setter方法
        		this.setCurrentTaintSet = function(s){
        						this.TSET = s;
        		}
        		
        		//备份全局间接流污点集合,iid为备份点
        		this.backupTaintSet = function(iid){
        							this['bkp'+iid] = this.TSET;
        							log('backup global taint set:{1} in the check point {0}'.format(iid,this.TSET));
        		}
        		
        		this.backupUrl = function(iid){
        							this['bkpUrl'+iid]=this[SPECIAL_PROP_URL];
        		}
        		
        		this.restoreUrl = function(iid){
        							this[SPECIAL_PROP_URL] = this['bkpUrl'+iid];
        		}
        		
        		//定点恢复备份的间接污点集合.
        		this.restoreTaintSet = function(iid){
        						this.TSET = this['bkp'+iid];
        						log('restore global taint set:{1} with the check point {0}'.format(iid,this.TSET));
        		}
        					//set copy on write(lazy copy)
        		function set_cow(s1,v1){ //向s1集合中添加v1,采用写时复制的方式.如果v1在s1中,或者v1是s1的子集,返回s1;否则返回新的集合
        			if(v1 == undefined || s1 === v1)return s1;
        			v1 = v1 instanceof Set ? v1 : v1 instanceof TLabel ? new Set(v1) :getSymbolic(v1);
        			if(!v1)return s1;  //v1 is undefined or null
        			var ns1 = s1;
        			if( !(v1 instanceof Set) ){
        											console.error("updateCurrentTaintSet method parameter TypeError:it should be Set,TLabel or Concolic's symbolic type is Set");
        						}
        			if( !(s1.isSuperset(v1)) ){ //
        						ns1 = s1.union(v1);
        							}
        			return ns1;
        		}
        		
        		//更新当前的间接流污点集合,即累计新的污点数据,val可以为TLabel,Set或者Concolic<V,Set>
        this.updateCurrentTaintSet = function(val){
        			var nc = set_cow(this.currentTaintSet(),val);
        			this.setCurrentTaintSet(nc);
        			log('update taint set:{0}'.format(this.TSET));
        	}
        
        		
       /*this.hasLocation = function(objName,propName){
        			objName = objName || 'global';
        			var plist;
        			if(HOP(this.whitelist,objName)){
        				plist = this.whitelist[objName];
        							if(HOP(plist,propName)){
        										return true;
        							}
        			}
        		}*/
        //在source位置处注入污点
        this.injectTaint = function(obj,prop,val){
        				var obj_c = getConcrete(obj),
        							prop_name=getConcrete(prop),
        							obj_name = 'global';
        				if(HOP(obj_c,SPECIAL_PROP_OBJ_ALIAS)){
        							obj_name = obj_c[SPECIAL_PROP_OBJ_ALIAS];
        				}else if(isDom(obj_c)){
        								obj_name = obj_c.nodeName;
        							}
        				//在指定路径和位置注入污点
        				var curl = this[SPECIAL_PROP_URL],t;
        				if( policy.hasLocation(obj_name,prop_name) && curl != null){
        					log('inject taint for site:{0}.{1}'.format(obj_name,prop_name));
        					t = new TLabel(SLABEL.SECRET,curl);
        					this.addVariableTaint(val,t);
        					checkTaintRead(val,obj_name,prop_name);
        							//check read
        				}
        }
        
        this.labelForUrl = function (){
        	
        	function isSameOriginal(u1,u2){
								return u1.protocol() === u2.protocol() && u1.host() === u2.host() && u1.prot() === u2.port();
							}
							function isSameDomain(u1,u2){
								return u1.host() === u2.host(); 
							}
							function isSamePage(u1,u2){
								return u1.path() === u2.path();
							}
							
							function isInWhitelist(url){
								policy.inWhitelist(url);
							}
        	
        			var hostUrl = HOST_URL,curl=this[SPECIAL_PROP_URL],pageUrl = new Uri(curl),label ;
    						if(isSamePage(hostUrl,pageUrl)){
    							label= SLABEL.UMARK.SAME_PAGE;
    						}else if(isSameDomain(hostUrl,pageUrl)){
    							label = SLABEL.UMARK.SAME_DOMAIN;
    						}else if(isSameOriginal(hostUrl,pageUrl)){
    							label = SLABEL.UMARK.SAME_ORIGINAL;
    						}else if(isInWhitelist(curl)){
    										label = SLABEL.UMARK.WHITELIST;
    						}else{
    							label = SLABEL.UMARK.UNKNOWN;
    						}
        			
    							log("label for page {0} is {1}".format(curl,label));
        			return new TLabel(label,curl);
        		}
        
        
        this.updateVariableTaintSetForCurrent = function(val) { // x = I + x.taints
        					var itaints = this.currentTaintSet();//当前污点集合
        					var ns = set_cow(itaints,val);//更新对象自身污点self=self+i
        					if(itaints === ns && val instanceof ConcolicValue){
        									//log("variable {0} taint unchanged".format(''));
        						return val;
        								}
        					//log("variable taint updated,add set=".format(ns.difference(itaints)));
        					return new ConcolicValue(getConcrete(val),ns);
        }
        
        this.wrapVaribleTaintSet = function(val,ts){
        					var val_c = getConcrete(val),val_s = getSymbolic(val);
        					if(ts === val_s)return val;
        					return new ConcolicValue(val_c,ts);
        }
        var getVariableTaintSet = this.getVariableTaintSet = function(val){
        					return getSymbolic(val);
        	}
        	
        	this.addVariableTaint = function(v,t){
        					var ts = getSymbolic(v);
        					ts.add(t);
        	}
        
        /*this.TInfo = function(){
						return ({
										taints:new Set(),			//taint标记集合,用于判断变量是否是taint.
										varFlow:[],//执行路径所经历过的变量集合.用于完整性安全策略检测.
										urlFlow:new Set(this.url),//varFlow变量集合的fromUrl集合,用于快速检测完整性.
										locationPath:[], //['document','cookie']
										fromUrl:this.url
								});
					}*/
        
				/*	this.accumulateTaint(val1,val2){
						
					}*/
					
					this.annotateObject =function(obj,tinfo){
        						var shadowKey;
        						for(key in obj){
        											if(HOP(obj,key)){
        																shadowKey=SPECIAL_PROP_TAINT + key;
        																obj[shadowKey]=this.literal(null,obj[key]);
        																			
        											}
        									}
        						return new ConcolicValue(obj,tinfo);
        			}
        
        this.annotateFunction = function (fn,tinfo){
        					fn[SPECIAL_PROP_TAINT]=tinfo;
        					fn[SPECIAL_PROP_URL]=this[SPECIAL_PROP_TAINT_ROOT];
        					return new ConcolicValue(fn,tinfo);//函数被封装成ConcolicValue对象
        		}
        		
        function annotatePrimitive(val,tinfo){
        				return new ConcolicValue(val,tinfo);
        		}
        
        		
        this.checkWrite = function(val,base,offset){//base可以为None
        	if(HOP(val,SPECIAL_PROP_WITH)){
								base = val[SPECIAL_PROP_WITH];
        				}
						var base_c = getConcrete(base),offset_c= getConcrete(offset);
						var val_c = getConcrete(val),alias='global';
						if(val_c !== undefined && val_c !== null){
							alias = val_c[SPECIAL_PROP_OBJ_ALIAS];
						}
						this.checkTaintWrite(val,alias,offset_c);
        		}
        		
       this.checkRead = function(base,offset,val){//检查是否可以将val赋值给base,offset.
        				if(HOP(val,SPECIAL_PROP_WITH)){
        									base = val[SPECIAL_PROP_WITH];
        							}
        				var base_c = getConcrete(base),offset_c= getConcrete(offset);
        				var val_c = getConcrete(val),alias='global';
        				if(val_c !== undefined && val_c !== null){
        						alias = val_c[SPECIAL_PROP_OBJ_ALIAS];
        							}
        						this.checkTaintRead(val,alias,offset_c);
        		}
       
       					//计数器的值加1.
       		function incCounter(counter,path){
       						var l = c = counter,p;	//l is last path element,c is current path element
       						for(i in path){
       							p = path[i];
       							l = c;
       							c[p] = c[p] || {};
       							c = c[p];
       									}
       						if(typeof l[p] === 'object')l[p] = 0;
       						l[p]++;
       					}
       
       		this.checkTaintRead = function(val,objName,propName){
       						var taints = getSymbolic(val).data(),t;
       						var path=[objName,propName,this[SPECIAL_PROP_URL]];
       						for(i in taints){
       									t = taints[i];
       									if(t.isLabeled(SLABLE.SECRET)){ //scret taint
       										incCounter(TRC,path);
       													log("confidentiality policy violation:read taint value {2} at site {0}.{1}".format(objName,propName,getConcrete(val)));
       									}
       								}
       		}
       		
       		this.checkTaintWrite = function(val,objName,propName){
       						var taints = getSymbolic(val).data(),t;
       						var path=[objName,propName];
       						var lblIndex = path.length;
       						for(i in taints){
       							t = taints[i];
       							//violate integrition
       							path[lblIndex] = t.label;
       										if(t.isIntegrity()){
       											incCounter(TWC,path);
       											log("write taint value at {0}.{1} from url {2}".format(objName,propName,t.url));
       										}
       										
       						}
       		}
       
       			/*this.copyTaintInfo = function(obj,tf){
       							var ret={},taints=tf?tf.concat(obj.taints):obj.taints;
       										ret.taints = taints;
       										ret.ref=ref;
       										ret.url = this.url;		
       			}
        
       			
       this.extendTaintValue=function(val,TF,ref){
       					var otinfo,ntinfo,ntaints=[].concat(TF);
    	   		if(val instanceof ConcolicValue){
    	   								if(TF.length === 0) return val;
       						otinfo = getSymbolic(val);
       						ntaints.concat(otinfo.taints);
       						ntinfo=this.copyTaintInfo(otinfo,ntaints);
       						return new ConcolicValue(getConcrete(val),ntinfo);
       					}
       					return new ConcolicValue(val,{taints:TF,url:this.url,ref:ref});
       			}
       			
       	this.wrapTaint = function(val,taints,ref){
       				var tinfo = {
       								taints:taints,
       									url:this.url,
       									ref:ref
       				};
       				return new ConcolicValue(val,tinfo);
       			}*/
       			
        this.literalPre = function(iid, val) {
        	
        			}

        this.literal = function(iid, val) {
        		var type = typeof val,tinfo=this.currentTaintSet();
        		if(type === 'object'){
        							return this.annotateObject(val,tinfo);
        		}else if(type === 'function'){
        							return this.annotateFunction(val,tinfo);
        		}else{
        							return annotatePrimitive(val,tinfo);
        					}
        			}

        this.invokeFunPre = function(iid, f, base, args, isConstructor) { //function alias
        	
        	
        }
        			
       function isDom(val){
    	   		return typeof val === 'object' && val.nodeName;
        		}
        
        this.invokeFun = function(iid, f, base, args, val, isConstructor) {
           var f_c = getConcrete(f);
        
           if(!HOP(f_c,SPECIAL_PROP_FUN)){//未instrument的方法
            					return this.updateVariableTaintSetForCurrent(val);
            			}
        	return val;
        }

        this.getFieldPre = function(iid, base, offset) { //inject taint
        	//this.injectTaint(base,offset);
        	//this.checkRead(base,offset);
        }

        this.getField = function(iid, base, offset, val) {
        			var base_c = getConcrete(base),offset_c = getConcrete(offset);
        			//处理string,array的长度属性
        			if( (typeof base_c === 'string' || isArr(base_c) && offset_c == 'length') ){
        							return this.wrapVariableTaintSet(val,getSymbolic(base_c));
        						}
        			//var ref=[base_c[SPECIAL_PROP_OBJ_ALIAS],offset_c];
        			var t_offset = SPECIAL_PROP_TAINT + offset_c;
        			var t_val = base_c[t_offset];
        			var ret = this.updateVariableTaintSetForCurrent(t_val || val);
        			this.injectTaint(base_c,offset_c,ret);
        			//this.checkTaintRead(ret, objName, propName);
        			log('read object prop {0}.{1}  with taint set{2}'.format(base_c[SPECIAL_PROP_OBJ_ALIAS],offset_c,getVariableTaintSet(ret)));
        			return ret;
        }

        this.putFieldPre = function(iid, base, offset, val) {
        					this.checkWrite(val, base, offset);
        	
        }
        			//store the tainted value in taint offset;
        this.putField = function(iid, base, offset, val) {
        					var base_c=getConcrete(base),offset_c=getConcrete(offset);
        					var toffset_c = SPECIAL_PROP_TAINT + offset_c;
        					base_c[toffset_c] = this.updateVariableTaintSetForCurrent(val);
        }

        this.readPre = function(iid, name, val, isGlobal) {  //read check
        								//binding object alias
        					var val_c = getConcrete(val);
        					if(typeof val_c === 'object' && val_c != null && !(val instanceof ConcolicValue) && !val_c[SPECIAL_PROP_OBJ_ALIAS]) {
        									val_c[SPECIAL_PROP_OBJ_ALIAS]=name;	
        								}
        					if(HOP(val_c,SPECIAL_PROP_WITH)){
        							this.injectTaint(val_c[SPECIAL_PROP_WITH],name,val);
        					}else if(isGlobal){
        									this.injectTaint(GLOBAL,name,val);
        								}
        }

        this.read = function(iid, name, val, isGlobal) {
        				val = this.updateVariableTaintSetForCurrent(val);
        				//checkRead(name,null,val);
        				var val_c = getConcrete(val);
        				if(typeof val_c === 'function'){
        								val_c = 'function literal';
        							}
        				log('read variable {0} with value {1} and taint set{2}'.format(name,val_c,getVariableTaintSet(val)));
        				return val;
        }

        this.writePre = function(iid, name, val) {
        	var base = null;
        	if(HOP(val,SPECIAL_PROP_WITH)){
        					base=val[SPECIAL_PROP_WITH];
        				}
        			this.checkWrite(val,base,name);
        	
        }

        this.write = function(iid, name, val) {
        	var val_c = getConcrete(val);
						if(typeof val_c === 'function'){
								val_c = 'function literal';
						}
        	log('write variable {0} with value {1} and taint set{2}'.format(name,val_c,getVariableTaintSet(val)));
         return val;
        }

        this.binaryPre = function(iid, op, left, right) { }

        this.binary = function (iid, op, left, right, result_c) {
        		 var taints = set_cow(getVariableTaintSet(left),getVariableTaintSet(right));
            return this.wrapVaribleTaintSet(result_c, taints);
        }

        this.unaryPre = function(iid, op, left) { }

        this.unary = function (iid, op, left, result_c) {
        		 var ts = getVariableTaintSet(left);
            return this.wrapVaribleTaintSet(result_c, ts);
        }

        this.conditionalPre = function(iid, left) { 
        			this.updateCurrentTaintSet(getVariableTaintSet(left));
        }

        this.conditional = function (iid, left, result_c) {
            return left;
        }
        
        		this.controlBegin = function(iid){
        							this.backupTaintSet(iid);
        		}
        		
        		this.controlEnd = function(iid){
        								this.restoreTaintSet(iid);
        		}

        		this.withObject = function(iid,obj){
        			var obj_c = getConcrete(val),ret={};
        						if(typeof obj_c == 'object'){
        							for(k  in obj_c){
        								if(HOP(k,obj_c)){
        													ret[k]=getField(iid, obj, k, obj_c[k]);
        													ret[k][SPECIAL_PROP_WITH]= obj_c;
        								}
        							}
        						}
        						return ret;
        		}
        		
        this.beginExecution = function(data) { }

        this.endExecution = function() {
        					log("==========execution finished=================")
        					log("TRC="+JSON.stringify(TRC));
        					log("TWC="+JSON.stringify(TWC));
        					
        					var objName,propName,url,cnt,it;
        					log("object\tproperty\turl\tread count");
        					for(objName in TRC){
        							it = TRC[objName];
        							for(propName in it){
        										it = it[propName];
        										for(url in it){
        														cnt = it[url];
        														log("{0}\t{1}\t{2}\t{3}".format(objName,propName,url,cnt));
        													}
        										}
        							}
        				log("\nobject\tproperty\tlabel\twrite count");
        				for(objName in TWC){
    								it = TWC[objName];
    								for(propName in it){
    										it = it[propName];
    										for(label in it){
    														cnt = it[label];
    														log("{0}\t{1}\t{2}\t{3}".format(objName,propName,label,cnt));
    													}
    										}
    							}
        					
        			}

        this.scriptEnter = function(iid,url){
        					log("====enter script:{0}===".format(url));
        					this.TSET = this.TSET || new Set();
        					this[SPECIAL_PROP_URL] = url;
        					this.backupUrl(iid);
        					var tlbl = this.labelForUrl();
        					this.backupTaintSet(iid);
        					this.updateCurrentTaintSet(tlbl);
        					this[SPECIAL_PROP_TAINT_ROOT]=tlbl;
        		}
        		
       this.scriptExit = function(iid){
    	   				this.restoreUrl(iid);
    	   				this.restoreTaintSet(iid);
    	   				log("====exit script:{0}====".format(this[SPECIAL_PROP_URL]));
        		}
        
        this.functionEnter = function(iid, fun, dis) { 
        					this.backupTaintSet(iid);
        					this.setCurrentTaintSet(fun[SPECIAL_PROP_TAINT]);//更改上下文
        					//this['furl'+iid]=this[SPECIAL_PROP_URL];
        					this.backupUrl(iid);
        					this[SPECIAL_PROP_URL]=fun[SPECIAL_PROP_URL];//更改当前url为函数定义时的url
        }

        this.functionExit = function(iid) {
        		 this.restoreTaintSet(iid);
        		 this.restoreurl(iid);
        		 return false;
        }
        			//J$.Ra,val为函数返回值
        this.return_ = function(val) {
            return updateVariableTaintSetForCurrent(val);
        }

    }

   // module.exports = TaintEngine;
    	sandbox.analysis = new TaintEngine(null);
})(T$);
