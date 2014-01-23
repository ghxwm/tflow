// Author: Koushik Sen


/*
To perform analysis in browser without recording, set window.JALANGI_MODE to 'concrete' and J$.analysis to a suitable analysis file.
To redefine all instrumentation functions, set JALANGI_MODE to 'symbolic' and J$.analysis to a suitable library containing redefinitions of W, R, etc.

 */

if (typeof T$ === 'undefined') T$ = {};
(function(sandbox) {
		 var sandbox=T$;
    var MODE_RECORD = 1,
        MODE_REPLAY = 2,
        MODE_NO_RR_IGNORE_UNINSTRUMENTED = 3,
        MODE_NO_RR = 4,
        MODE_DIRECT = 5;

    var isBrowser =  !(typeof exports !== 'undefined' && this.exports !== exports);
    var isBrowserReplay;
    var mode;
    var rrEngine;
    var executionIndex;
    var branchCoverageInfo;

//------------------------------- Stats for the paper -----------------------
        var skippedReads = 0;
        var skippedGetFields = 0;
        var unoptimizedLogs = 0;
        var optimizedLogs = 0;

//-------------------------------- Constants ---------------------------------

        var EVAL_ORG = eval;

        var PREFIX1 = "T$";
        var SPECIAL_PROP = "*"+PREFIX1+"*";
        var SPECIAL_PROP2 = "*"+PREFIX1+"I*";//函数字面量标识
        var SPECIAL_PROP3 = "*"+PREFIX1+"C*";
        var DEBUG = false;
        var WARN = false;
        var SERIOUS_WARN = false;

        var T_NULL = 0,
            T_NUMBER = 1,
            T_BOOLEAN = 2,
            T_STRING = 3,
            T_OBJECT = 4,
            T_FUNCTION = 5,
            T_UNDEFINED = 6,
            T_ARRAY = 7;

        var F_TYPE = 0,
            F_VALUE = 1,
            F_IID = 2,
            F_SEQ = 3,
            F_FUNNAME = 4;

        var  N_LOG_FUNCTION_ENTER = 4,
            N_LOG_SCRIPT_ENTER = 6,
            N_LOG_GETFIELD = 8,
            N_LOG_ARRAY_LIT = 10,
            N_LOG_OBJECT_LIT = 11,
            N_LOG_FUNCTION_LIT = 12,
            N_LOG_RETURN = 13,
            N_LOG_REGEXP_LIT = 14,
            N_LOG_READ = 17,
            N_LOG_HASH = 19,
            N_LOG_SPECIAL = 20,
            N_LOG_STRING_LIT = 21,
            N_LOG_NUMBER_LIT = 22,
            N_LOG_BOOLEAN_LIT = 23,
            N_LOG_UNDEFINED_LIT = 24,
            N_LOG_NULL_LIT = 25;

        //-------------------------------- End constants ---------------------------------


        //-------------------------------------- Symbolic functions -----------------------------------------------------------

        var log = (function(){
            var list;

            return {
                reset: function() {
                    list = [];
                },

                log: function(str) {
                    if (list)
                        list.push(str);
                },

                getLog: function() {
                    return list;
                }
            }
        })();


        function getConcrete(val) {
            if (sandbox.analysis && sandbox.analysis.getConcrete) {
                return sandbox.analysis.getConcrete(val);
            } else {
                return val;
            }
        }

        function getSymbolic(val) {
            if (sandbox.analysis && sandbox.analysis.getSymbolic) {
                return sandbox.analysis.getSymbolic(val);
            } else {
                return val;
            }
        }

        function create_fun(f) {
            return function() {
                var len = arguments.length;
                for (var i = 0; i<len; i++) {
                    arguments[i] = getConcrete(arguments[i]);
                							}
                return f.apply(getConcrete(this),arguments);
            				}
        }

        function getSymbolicFunctionToInvokeAndLog (f, isConstructor) {
        					if(isNative(f) || !HOP(f,SPECIAL_PROP2)){ //本地方法或者没有被inst的方法
        						return [isConstructor?f:create_fun(f),isConstructor];
        								}
        					return [null,true];
        	
            /*if (f === Array ||
                f === Error ||
                f === String ||
                f === Number ||
                f === Boolean ||
                f === RegExp ||
                f === J$.addAxiom ||
                f === J$.readInput) {
                return [f, true];
            } else if (//f === Function.prototype.apply ||
                //f === Function.prototype.call ||
                f === Object.defineProperty ||
                f === console.log ||
                f === RegExp.prototype.test ||
                f === String.prototype.indexOf ||
                f === String.prototype.lastIndexOf ||
                f === String.prototype.substring ||
                f === String.prototype.substr ||
                f === String.prototype.charCodeAt ||
                f === String.prototype.charAt ||
                f === String.prototype.replace ||
                f === String.fromCharCode ||
                f === Math.abs ||
                f === Math.acos ||
                f === Math.asin ||
                f === Math.atan ||
                f === Math.atan2 ||
                f === Math.ceil ||
                f === Math.cos ||
                f === Math.exp ||
                f === Math.floor ||
                f === Math.log ||
                f === Math.max ||
                f === Math.min ||
                f === Math.pow ||
                f === Math.round ||
                f === Math.sin ||
                f === Math.sqrt ||
                f === Math.tan ||
                f === parseInt) {
                return  [create_fun(f), false];
            }
            return [null, true];*/
        }

        function isReturnLogNotRequired(f) {
            if (f === console.log ||
                f === RegExp.prototype.test ||
                f === String.prototype.indexOf ||
                f === String.prototype.lastIndexOf ||
                f === String.prototype.substring ||
                f === Math.abs ||
                f === Math.acos ||
                f === Math.asin ||
                f === Math.atan ||
                f === Math.atan2 ||
                f === Math.ceil ||
                f === Math.cos ||
                f === Math.exp ||
                f === Math.floor ||
                f === Math.log ||
                f === Math.max ||
                f === Math.min ||
                f === Math.pow ||
                f === Math.round ||
                f === Math.sin ||
                f === Math.sqrt ||
                f === Math.tan ||
                f === String.prototype.charCodeAt ||
                f === parseInt
                ) {
                return true;
            }
            return false;
        }

        //---------------------------- Utility functions -------------------------------
        function addAxiom(c) {
            if (sandbox.analysis && sandbox.analysis.installAxiom) {
                sandbox.analysis.installAxiom(c);
            }
        }

        function HOP(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }



        function debugPrint(s) {
            if (DEBUG) {
                console.log("***" + s);
            }
        }

        function warnPrint(iid, s) {
            if (WARN && iid !== 0) {
                console.log("        at " + iid + " " + s);
            }
        }

        function seriousWarnPrint(iid, s) {
            if (SERIOUS_WARN && iid !== 0) {
                console.log("        at " + iid + " Serious " + s);
            }
        }

        function slice(a, start) {
            return Array.prototype.slice.call(a, start || 0);
        }

        function isNative(f) {
            return f.toString().indexOf('[native code]') > -1 || f.toString().indexOf('[object ') === 0;
        }


        function printValueForTesting(loc, iid, val) {
            return;
            var type = typeof val;
            if (type !== 'object' && type !== 'function') {
                console.log(loc+":"+iid+":"+type+":"+val);
            } else if (val===null) {
                console.log(loc+":"+iid+":"+type+":"+val);
            } else if (HOP(val,SPECIAL_PROP) && HOP(val[SPECIAL_PROP],SPECIAL_PROP)) {
                console.log(loc+":"+iid+":"+type+":"+val[SPECIAL_PROP][SPECIAL_PROP]);
            } else {
                console.log(loc+":"+iid+":"+type+":object");
            }
        }
        //---------------------------- End utility functions -------------------------------


        //-------------------------------- Execution indexing --------------------------------
        			//记录执行时函数调用栈的信息,以及统计函数调用的次数.
        function ExecutionIndex() {
            var counters = {};
            var countersStack = [counters];
            				//调用函数时进栈
            function executionIndexCall() {
                counters = {};
                countersStack.push(counters);
            }
            		//函数返回时出栈
            function executionIndexReturn() {
                countersStack.pop();
                counters = countersStack[countersStack.length-1];
            }
            				//增加指定函数的调用次数
            function executionIndexInc(iid) {
                var c = counters[iid];
                if (c===undefined) {
                    c = 1;
                } else {
                    c++;
                						}
                counters[iid] = c;
                counters.iid = iid;
                counters.count = c;
            }
            				//获取函数调用次数统计信息
            function executionIndexGetIndex() {
                var i, ret = [];
                var iid;
                for (i= countersStack.length-1; i >=0; i-- ) {
                    iid = countersStack[i].iid;
                    if (iid !== undefined) {
                        ret.push(iid);
                        ret.push(countersStack[i].count);
                    				}
                			}
                return (ret+"").replace(/,/g,"_");
            }

            if (this instanceof ExecutionIndex) {
                this.executionIndexCall = executionIndexCall;
                this.executionIndexReturn = executionIndexReturn;
                this.executionIndexInc = executionIndexInc;
                this.executionIndexGetIndex = executionIndexGetIndex;
            } else {
                return new ExecutionIndex();
            }
        }
        //-------------------------------- End Execution indexing --------------------------------

        //----------------------------------- Begin Jalangi Library backend ---------------------------------
        			//关注函数是否是调用者，是否是构造器
        var isInstrumentedCaller = false, isConstructorCall = false;
        var returnVal;//函数返回值
        var scriptCount = 0;
        var lastVal;
        var switchLeft;
        var switchKeyStack = [];



        function callAsNativeConstructorWithEval(Constructor, args) {
            var a = [];
            for (var i = 0; i < args.length; i++)
                a[i] = 'args[' + i + ']';
            var eval = EVAL_ORG;
            return eval('new Constructor(' + a.join() + ')');
        }
        			//通过new运算符构造对象.new newExpression
        function callAsNativeConstructor (Constructor, args) {
            if (args.length === 0) {
                return new Constructor();
            }
            if (args.length === 1) {
                return new Constructor(args[0]);
            }
            if (args.length === 2) {
                return new Constructor(args[0], args[1]);
            }
            if (args.length === 3) {
                return new Constructor(args[0], args[1], args[2]);
            }
            if (args.length === 4) {
                return new Constructor(args[0], args[1], args[2], args[3]);
            }
            if (args.length === 5) {
                return new Constructor(args[0], args[1], args[2], args[3], args[4]);
            }
            return callAsNativeConstructorWithEval(Constructor, args);
        }

        function callAsConstructor(Constructor, args) {
            if (isNative(Constructor)) {//native构造器
                return callAsNativeConstructor(Constructor,args);
            } else { //通过原型继承构造对象
                var Temp = function(){}, inst, ret;//Temp可以理解为Constructor的子类
                Temp.prototype = getConcrete(Constructor.prototype);//指定父类
                inst = new Temp;//构造子类对象
                ret = Constructor.apply(inst, args);//调用父类构造函数,注意构造函数可以有返回值.即可以拦截new 表达式的返回值
                return Object(ret) === ret ? ret : inst;//当调用父类构造函数没有返回值或者返回者不是对象时,返回ret,否者返回子类实例inst.
            }
        }

        			//调用eval函数,对code进行instrument后再eval.
        function invokeEval(base, f, args) {
                return f(sandbox.instrumentCode(getConcrete(args[0]),true));
        }

        			//调用函数
        function invokeFun(iid, base, f, args, isConstructor) {
            var g, invoke, val, ic, tmpIsConstructorCall, tmpIsInstrumentedCaller;

            var f_c = getConcrete(f);

            tmpIsConstructorCall = isConstructorCall;
            isConstructorCall = isConstructor;

            sandbox.analysis.invokeFunPre(iid, f, base, args, isConstructor);
            				//函数调用次数+1
            executionIndex.executionIndexInc(iid);

            var arr = getSymbolicFunctionToInvokeAndLog(f_c, isConstructor);
            tmpIsInstrumentedCaller = isInstrumentedCaller;
            ic = isInstrumentedCaller = f_c === undefined || HOP(f_c,SPECIAL_PROP2) || typeof f_c !== "function";

            invoke = arr[0] || isInstrumentedCaller;
            g = arr[0] || f_c ;

            pushSwitchKey();
            try {
                if (g === EVAL_ORG){
                    val = invokeEval(base, g, args);
                } else if (invoke) {
                    if (isConstructor) {
                        val = callAsConstructor(g, args);
                    } else {
                        val = g.apply(base, args);//执行函数调用
                    							}
                }  else {
                    val = undefined;
                }
            } finally {
                popSwitchKey();
                isInstrumentedCaller = tmpIsInstrumentedCaller;
                isConstructorCall = tmpIsConstructorCall;
            }

            val = sandbox.analysis.invokeFun(iid, f, base, args, val, isConstructor);//触发after操作，已经获取函数返回值
            printValueForTesting(2, iid,val);
            return val;
        }

        //var globalInstrumentationInfo;
        			//获取属性值	,返回分析后的值
        function G(iid, base, offset, norr) {
            if (offset===SPECIAL_PROP || offset === SPECIAL_PROP2 || offset === SPECIAL_PROP3) {
                return undefined;
            					}
            var base_c = getConcrete(base);//conrete base
            					//触发preField事件
                sandbox.analysis.getFieldPre(iid, base, offset);
            	//计算member expression的值.base[offset]
            var val = base_c[getConcrete(offset)];//concrete base and conrete offset.


                				//触发after操作,已经获取计算后的值
             val = sandbox.analysis.getField(iid, base, offset, val);

             printValueForTesting(1, iid,val);
            return val;//val值的后去可能要经过concrete,getField操作
        }
        			//存储属性值,返回val,
        function P(iid, base, offset, val) {
            if (offset===SPECIAL_PROP || offset === SPECIAL_PROP2 || offset === SPECIAL_PROP3) {
                return undefined;
            					}

            var base_c = getConcrete(base);//concrete base
            //前置触发,值未存储
                sandbox.analysis.putFieldPre(iid, base, offset, val);
            				//执行put操作
            if (typeof base_c==='function' && getConcrete(offset)==='prototype') {
                base_c[getConcrete(offset)] = getConcrete(val);// 保存原型继承
            } else {
                base_c[getConcrete(offset)] = val;
            }

            	//后置触发,值已经存储
                sandbox.analysis.putField(iid, base, offset, val);
            return val;
        }
        			//函数变换,新的函数绑定this.
        function F(iid, f, isConstructor) {
            return function() {
                var base = this;
                return invokeFun(iid, base, f, arguments, isConstructor);
            }
        }
        		//成员函数调用.返回成员然后调用成员
        function M(iid, base, offset, isConstructor) {
            return function() {
                var f = G(iid, base, offset);
                if(f == Function.prototype.apply || f == Function.prototype.call){
                									f = base;
                						}
                return invokeFun(iid, base, f, arguments, isConstructor);
            };
        }

        function Fe(iid, val, dis /* this */) {
        					//入函数调用栈
            executionIndex.executionIndexCall();

            returnVal = undefined;
            if (sandbox.analysis && sandbox.analysis.functionEnter) {
                sandbox.analysis.functionEnter(iid, val, dis);
            }
        }

        function Fr(iid) {
            var ret = false;
            					//出栈
            executionIndex.executionIndexReturn();

            ret = sandbox.analysis.functionExit(iid);
            return ret;
        }

        			//保存函数返回值
        function Rt(iid, val) {
            return returnVal = val;
        }
        //return语句 触发return_函数
        function Ra() {
            var ret = returnVal;
            returnVal = undefined;
            if (sandbox.analysis && sandbox.analysis.return_) {
                ret = sandbox.analysis.return_(ret);
            }
            return ret;
        }

        	//进入脚本
     function Se(iid,val) {
            scriptCount++;
            sandbox.analysis.scriptEnter(iid,val);
        }
     	//退出脚本
        function Sr(iid) {
            scriptCount--;
            		sandbox.analysis.scriptExit(iid);
            if (scriptCount === 0) {
                endExecution();
            				}
        }
        			//单参数函数,直接返回参数,不做任何加工操作
        function I(val) {
            return val;
        			}
        			//函数字面量
        function T(iid, val, type) {
            if (sandbox.analysis && sandbox.analysis.literalPre) {
                sandbox.analysis.literalPre(iid, val);
            					}

            if (type === N_LOG_FUNCTION_LIT) {
                if (Object && Object.defineProperty && typeof Object.defineProperty === 'function') {
                    Object.defineProperty(val, SPECIAL_PROP2, {
                        enumerable: false,
                        writable: true,
                    						});
                				}
                val[SPECIAL_PROP2] = true; //函数字面量标识
            					}

              val = sandbox.analysis.literal(iid, val);

              return val;
        }

        function H(iid, val) {
        						if(sandbox.analysis.forIn){
        										return sandbox.analysis.forIn(iid,val);
        						}
            return val;
        }


        //读操作,读取取指定名称的值
   function R(iid, name, val, isGlobal) {
            sandbox.analysis.readPre(iid, name, val, isGlobal);

            val = sandbox.analysis.read(iid, name, val, isGlobal);
            
            printValueForTesting(3, iid, val);
            return val;
        }
   		//写操作
        function W(iid, name, val, lhs) {
                sandbox.analysis.writePre(iid, name, val);

                val = sandbox.analysis.write(iid, name, val);
            return val;
        }
        //变量声明,函数声明,函数参数
        function N(iid, name, val, isArgumentSync) {
            return val;
        }

        			//复合赋值操作
        function A(iid,base,offset,op) {
            var oprnd1 = G(iid,base, offset);
            return function(oprnd2) {
                var val = B(iid, op, oprnd1, oprnd2);
                return P(iid, base, offset, val);
            };
        }
        			//二元操作
        function B(iid, op, left, right) {
            var left_c, right_c, result_c;

                sandbox.analysis.binaryPre(iid, op, left, right);

            left_c = getConcrete(left);
            right_c = getConcrete(right);

            switch(op) {
                case "+":
                    result_c = left_c + right_c;
                    break;
                case "-":
                    result_c = left_c - right_c;
                    break;
                case "*":
                    result_c = left_c * right_c;
                    break;
                case "/":
                    result_c = left_c / right_c;
                    break;
                case "%":
                    result_c = left_c % right_c;
                    break;
                case "<<":
                    result_c = left_c << right_c;
                    break;
                case ">>":
                    result_c = left_c >> right_c;
                    break;
                case ">>>":
                    result_c = left_c >>> right_c;
                    break;
                case "<":
                    result_c = left_c < right_c;
                    break;
                case ">":
                    result_c = left_c > right_c;
                    break;
                case "<=":
                    result_c = left_c <= right_c;
                    break;
                case ">=":
                    result_c = left_c >= right_c;
                    break;
                case "==":
                    result_c = left_c == right_c;
                    break;
                case "!=":
                    result_c = left_c != right_c;
                    break;
                case "===":
                    result_c = left_c === right_c;
                    break;
                case "!==":
                    result_c = left_c !== right_c;
                    break;
                case "&":
                    result_c = left_c & right_c;
                    break;
                case "|":
                    result_c = left_c | right_c;
                    break;
                case "^":
                    result_c = left_c ^ right_c;
                    break;
                case "instanceof":
                    result_c = left_c instanceof right_c;
                    break;
                case "in":
                    result_c = left_c in right_c;
                    break;
                case "&&":
                    result_c = left_c && right_c;
                    break;
                case "||":
                    result_c = left_c || right_c;
                    break;
                case "regexin":
                    result_c = right_c.test(left_c);
                    break;
                default:
                    throw new Error(op +" at "+iid+" not found");
                    break;
            }

            result_c = sandbox.analysis.binary(iid, op, left, right, result_c);
            return result_c;
        }

        			//单元操作
        function U(iid, op, left) {
            var left_c, result_c;

            sandbox.analysis.unaryPre(iid, op, left);

            left_c = getConcrete(left);

            switch(op) {
                case "+":
                    result_c = + left_c;
                    break;
                case "-":
                    result_c = - left_c;
                    break;
                case "~":
                    result_c = ~ left_c;
                    break;
                case "!":
                    result_c = ! left_c;
                    break;
                case "typeof":
                    result_c = typeof left_c;
                    break;
                default:
                    throw new Error(op +" at "+iid+" not found");
                    break;
            }

            result_c = sandbox.analysis.unary(iid, op, left, result_c);
            return result_c;
        }
        			//switch key进栈
        function pushSwitchKey() {
            switchKeyStack.push(switchLeft);
        }
        		//switch key出栈
        function popSwitchKey() {
            switchLeft = switchKeyStack.pop();
        }

        function last() {
            return lastVal;
        };
        			//switch 操作,保存switchLeft
        function C1(iid, left) {
            var left_c;

            left_c = getConcrete(left);
            switchLeft = left;
            return left_c;
        };
        			//case匹配操作
        function C2(iid, left) {
            var left_c, ret;
            				//case分支执行次数+1
            executionIndex.executionIndexInc(iid);

            left_c = getConcrete(left);
            left = B(iid, "===", switchLeft, left);

            if (sandbox.analysis && sandbox.analysis.conditionalPre) {
                sandbox.analysis.conditionalPre(iid, left);
            }

            ret = !!getConcrete(left);

            if (sandbox.analysis && sandbox.analysis.conditional) {
                sandbox.analysis.conditional(iid, left, ret);
            }
            					//记录分支匹配结果
            if (branchCoverageInfo) {
                branchCoverageInfo.updateBranchInfo(iid, ret);
            					}
            					//日志输出匹配结果
            log.log("B"+iid+":"+(left_c?1:0));
            return left_c;
        };
        			//条件表达式
        function C(iid, left) {
            var left_c, ret;
            executionIndex.executionIndexInc(iid);
            if (sandbox.analysis && sandbox.analysis.conditionalPre) {
                sandbox.analysis.conditionalPre(iid, left);
            }

            left_c = getConcrete(left);
            ret = !!left_c;

            lastVal = sandbox.analysis.conditional(iid, left, ret);

            if (branchCoverageInfo) {
                branchCoverageInfo.updateBranchInfo(iid, ret);
            }

            log.log("B"+iid+":"+(left_c?1:0));
            return left_c;
        }
        			//
        function endExecution() {
        					//存储分支覆盖率信息
            if (branchCoverageInfo)
                branchCoverageInfo.storeBranchInfo();
            var pSkippedReads = 100.0*skippedReads/(unoptimizedLogs-optimizedLogs);
            var pOptimizedLogs = 100.0*optimizedLogs/unoptimizedLogs;
            //console.log("Reads Skipped, GetFields Skipped, Total Logs (unoptimized), Total Logs (optimized), % of skips that are local reads, % of reduction in logging = "+
            //    skippedReads+" , "+skippedGetFields+" , "+unoptimizedLogs+" , "+optimizedLogs+ " , "+pSkippedReads+"% , "+pOptimizedLogs+"%");
            if (sandbox.analysis && sandbox.analysis.endExecution) {
                sandbox.analysis.endExecution();
            }
        }


        // initialize rrEngine, sandbox.analysis, executionIndex, and require.uncache
        executionIndex = new ExecutionIndex();
       /* path = require('path');
    			ANALYSIS=path.resolve(__dirname,'analyses/taint/TaintEngine');
        var SymbolicEngine = require(ANALYSIS);
        sandbox.analysis = new SymbolicEngine(executionIndex);*/

        sandbox.U = U; // Unary operation
        sandbox.B = B; // Binary operation
        sandbox.C = C; // Condition
        sandbox.C1 = C1; // Switch key
        sandbox.C2 = C2; // case label C1 === C2
        sandbox.Cb = Cb;
        sandbox.Ce = Ce;
        sandbox.addAxiom = addAxiom; // Add axiom
        sandbox.getConcrete = getConcrete;  // Get concrete value
        sandbox._ = last;  // Last value passed to C

        sandbox.H = H; // hash in for-in
        sandbox.I = I; // Ignore argument
        sandbox.G = G; // getField
        sandbox.P = P; // putField
        sandbox.R = R; // Read
        sandbox.W = W; // Write
        sandbox.N = N; // Init
        sandbox.T = T; // object/function/regexp/array Literal
        sandbox.F = F; // Function call
        sandbox.M = M; // Method call
        sandbox.A = A; // Modify and assign +=, -= ...
        sandbox.Fe = Fe; // Function enter
        sandbox.Fr = Fr; // Function return
        sandbox.Se = Se; // Script enter
        sandbox.Sr = Sr; // Script return
        sandbox.Rt = Rt; // returned value
        sandbox.Ra = Ra;
        			
        			
        sandbox.endExecution = endExecution;//all script exit

        sandbox.log = log;
})(T$)