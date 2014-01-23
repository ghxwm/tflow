// Author: Koushik Sen
(function(sandbox) {
    if (typeof esprima === 'undefined'){
        //根据代码生成ast
    			esprima = require("esprima");
    			//根据ast生成代码
        escodegen = require('escodegen');
    }

    //js文件经过打桩后的文件名称后缀.
    var FILESUFFIX1 = "_t_";
    //统计代码覆盖率
    var COVERAGE_FILE_NAME = "t_coverage";
    //iids文件,保存文件中标识符或操作对应的位置信息.
    var SMAP_FILE_NAME = "t_sourcemap.js";
    //对象的名称
    var PREFIX1 = "T$";
    //参数替换.用参数替换含有占位符的字符串代码
    var RP = PREFIX1+"_";
    		//污点流,全局变量,用于存储间接流.或者函数定义时的最后一个变量,用于传递函数上下文(函数调用者)的污点.
    //记录各种操作类型
//    var N_LOG_LOAD = 0,
//    var N_LOG_FUN_CALL = 1,
//        N_LOG_METHOD_CALL = 2,
    var  N_LOG_FUNCTION_ENTER = 4, //进入函数
//        N_LOG_FUNCTION_RETURN = 5,
        N_LOG_SCRIPT_ENTER = 6,//进入脚本
//        N_LOG_SCRIPT_EXIT = 7,
        N_LOG_GETFIELD = 8,//获取对象的域
//        N_LOG_GLOBAL = 9,
        N_LOG_ARRAY_LIT = 10,//数组字面量
        N_LOG_OBJECT_LIT = 11,//对象字面量
        N_LOG_FUNCTION_LIT = 12,//函数声明或函数表达式
        N_LOG_RETURN = 13,//函数返回
        N_LOG_REGEXP_LIT = 14,//正则表达式字面量
//        N_LOG_LOCAL = 15,
//        N_LOG_OBJECT_NEW = 16,
        N_LOG_READ = 17,//读取变量的值
//        N_LOG_FUNCTION_ENTER_NORMAL = 18,
        N_LOG_HASH = 19,//调用hash函数
        N_LOG_SPECIAL = 20,//操作对象的特殊属性
        N_LOG_STRING_LIT = 21,//字符串字面量
        N_LOG_NUMBER_LIT = 22,//数字字面量
        N_LOG_BOOLEAN_LIT = 23,//bool字面量
        N_LOG_UNDEFINED_LIT = 24,//undefined字面量
        N_LOG_NULL_LIT = 25;//null字面量

        
    var logFunctionEnterFunName = PREFIX1+".Fe";//进入函数
    
    var logFunctionReturnFunName = PREFIX1+".Fr";//退出函数
   
    var logFunCallFunName = PREFIX1+".F"; //函数调用
    
    var logMethodCallFunName = PREFIX1+".M";//方法调用
    
    var logAssignFunName = PREFIX1+".A";//赋值操作
   
    var logPutFieldFunName = PREFIX1+".P";//对象域的写操作
   
    var logGetFieldFunName = PREFIX1+".G";//对象域的读操作
    
    var logScriptEntryFunName = PREFIX1+".Se";//进入脚本
    
    var logScriptExitFunName = PREFIX1+".Sr";//退出脚本
    
    var logReadFunName = PREFIX1+".R";//读取变量
    
    var logWriteFunName = PREFIX1+".W";//变量写操作
    
    var logIFunName = PREFIX1+".I";//忽视函数参数,读写操作进行undefined检查时调用.
    
    var logHashFunName = PREFIX1+".H";//hash函数,for in语句使用
  
    var logLitFunName = PREFIX1+".T";//字面量操作
    
    var logInitFunName = PREFIX1+".N";//init操作
  
    var logReturnFunName = PREFIX1+".Rt";//返回
    
    var logReturnAggrFunName = PREFIX1+".Ra";//返回

    
    var logBinaryOpFunName = PREFIX1+".B";//二元运算
    
    var logUnaryOpFunName = PREFIX1+".U";//单元运算
    
    var logConditionalFunName = PREFIX1+".C";//条件操作
    
    	var logControlEndFunName = PREFIX1 + ".Ce";
    	
    	var logControlBeginFunName = PREFIX1 + ".Cb";
    
    var logSwitchLeftFunName = PREFIX1+".C1";//switch操作
    
    var logSwitchRightFunName = PREFIX1+".C2";//case操作
    
    var logWithObjectFunName = PREFIX1 + ".Wo";
    
    var logLastFunName = PREFIX1+"._";//case后的default操作

    var instrumentCodeFunName = PREFIX1+".instrumentCode";//打桩函数

    	//语法组成
    var Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement'
    };


    	//返回有效路径
    function sanitizePath(path) {
        if (typeof process !== 'undefined' && process.platform == "win32") {
            return path.split("\\").join("\\\\")
        }
        return path
    }
    	//HasOwnProperty方法的缩写
    function HOP(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    };

    	//是否是数组
    function isArr(val) {
        return Object.prototype.toString.call( val ) === '[object Array]';
    }
    	//数组映射操作.
    function MAP(arr, fun) {
        var len = arr.length;
        if (!isArr(arr)) {
            throw new TypeError();
        }
        if (typeof fun != "function") {
            throw new TypeError();
        }

        var res = new Array(len);
        for (var i = 0; i < len; i++) {
            if (i in arr) {
                res[i] = fun(arr[i]);
            }
        }
        return res;
    }
    	//获取文件中的代码
    function getCode(filename) {
        var fs = require('fs');
        return fs.readFileSync(filename, "utf8");
    }

    	//上下文
    var CONTEXT = {
        RHS: 1,  //right handler side
        IGNORE: 2, //ignore
        OEXP: 3, //object expression
        PARAMS: 4, //params
        OEXP2: 5,//object expression2
        GETTER: 6,//getter function
        SETTER: 7 //setter function
    };

    	//当调用J$.I方法时忽略参数
    function ignoreSubAst(node) {
        return node.type === 'CallExpression' && node.callee.type==='MemberExpression' &&
            node.callee.object.type === 'Identifier' && node.callee.object.name===PREFIX1 &&
            node.callee.property.type === 'Identifier' && node.callee.property.name==='I'
    }
    
    		//语法树转换
    function transformAst(object, visitorPost, visitorPre, context, noIgnore) {
        var key, child, type, ret, newContext;

        type = object.type;//节点类型
        if (visitorPre && HOP(visitorPre,type))
            visitorPre[type](object, context);//pre visit操作

        for (key in object) {  //key为节点属性
            if (object.hasOwnProperty(key)) {
                child = object[key];//child为字节点
                if (typeof child === 'object' && child !== null && key !== "scope" && (noIgnore || !ignoreSubAst(object))) {
                							//属性节点为对象时
                    if ((type === 'AssignmentExpression' && key === 'left') || //赋值操作的左节点
                        (type === 'UpdateExpression' && key === 'argument') ||//++操作
                        (type === 'UnaryExpression' && key === 'argument' && object.operator === 'delete') ||//delete操作
                        (type === 'ForInStatement' && key === 'left') ||//for in left节点
                        ((type === 'FunctionExpression' || type === 'FunctionDeclaration') && key === 'id') ||//id节点
                        (type === 'LabeledStatement' && key ==='label') ||//label节点
                        (type === 'BreakStatement' && key ==='label') ||
                        (type === 'CatchClause' && key ==='param') ||
                        (type === 'ContinueStatement' && key ==='label') ||
                        ((type === 'CallExpression' || type === 'NewExpression') &&
                            key === 'callee' &&
                            (object.callee.type === 'MemberExpression' ||//成员函数
                                (object.callee.type === 'Identifier' && object.callee.name === 'eval'))) ||//evel函数
                        (type === 'VariableDeclarator' && key === 'id') ||//变量声明
                        (type === 'MemberExpression' && !object.computed && key === 'property')) {//对象property节点
                        newContext = CONTEXT.IGNORE;//忽略上下文
                    } else if (type === 'ObjectExpression' && key === 'properties') {
                        newContext = CONTEXT.OEXP;  //object expression
                    } else if ((type === 'FunctionExpression' || type === 'FunctionDeclaration') && key === 'params') {
                        newContext = CONTEXT.PARAMS;//参数上下文
                    } else if (context===CONTEXT.OEXP) {
                        newContext = CONTEXT.OEXP2;
                    } else if (context===CONTEXT.OEXP2 && key === 'key') {
                        newContext = CONTEXT.IGNORE;
                    } else if (context===CONTEXT.PARAMS) {
                        newContext = CONTEXT.IGNORE;//参数节点忽略上下文
                    } else if (type === 'Property' && key === 'value' && object.kind === 'get') {
                        newContext = CONTEXT.GETTER;//属性getter函数
                    } else if (type === 'Property' && key === 'value' && object.kind === 'set') {
                        newContext = CONTEXT.SETTER;//属性setter函数
                    } else {
                        newContext = CONTEXT.RHS;
                    							}
                    								//递归转换字节点
                    object[key] = transformAst(child, visitorPost, visitorPre, newContext, noIgnore);

                }//end typeof object
            			}
        		}//end for
        			//节点访问的后置操作
        if (visitorPost && HOP(visitorPost,type))
            ret = visitorPost[type](object, context);
        else
            ret = object;
        return ret;//返回转换后的节点

    }

    var filename;//文件名

// J$_i in expression context will replace it by an AST
// {J$_i} will replace the body of the block statement with an array of statements passed as argument
    	//参数替换
    function replaceInStatement(code) {
        var asts = arguments;
        var visitorReplaceInExpr = {
            'Identifier': function(node) {
                if (node.name.indexOf(RP) === 0) {//替换RP开头的参数
                    var i = parseInt(node.name.substring(RP.length));
                    return asts[i];
                } else {
                    return node;
                }
            },
            'BlockStatement' : function(node) {
            						//body's first element is a expression array
                if (node.body[0].type === 'ExpressionStatement' && isArr(node.body[0].expression)) {//program body is array,
                    node.body = node.body[0].expression;
                }
                return node;
            }
        }
        var ast = esprima.parse(code);
        			//后置替换操作转换ast.
        var newAst = transformAst(ast, visitorReplaceInExpr, undefined, undefined, true);
        //console.log(newAst);
        return newAst.body;
    }
    	//替换函数占位符参数
    function replaceInExpr(code) {
        var ret =  replaceInStatement.apply(this,arguments);//ret is expression statement
        return ret[0].expression;
    }
    	//创建字面量
    function createLiteralAst(name) {
        return {type: Syntax.Literal, value: name};
    }
    	//创建标识符
    function createIdentifierAst(name) {
        return {type: Syntax.Identifier, name: name};
    }
    
    	function createBlockStatementAst(){
    				return {type:Syntax.BlockStatement,body:undefined};
    			
    	}
    
    	//将原节点的位置信息记录到新节点中
    function transferLoc(newNode, oldNode) {
        if (oldNode.loc)
            newNode.loc = oldNode.loc;
        if (oldNode.raw)
            newNode.raw = oldNode.loc;
    }
    	//iid有3中，每种递增4
    var inc = 4;
    var condCount = 0+inc;//条件语句，从4开始
    var iid = 1+inc; //iid,从5开始
    var opIid = 2+inc;//运算操作,从6开始

    	//获取ast形式的iid
    function getIid() {
        var tmpIid = iid;
        iid = iid + inc;
        return createLiteralAst(tmpIid);
    }
    	//获取前一个iid
    function getPrevIidNoInc() {
        return createLiteralAst(iid-inc);
    }
    	//获取ast形式的条件iid
    function getCondIid() {
        var tmpIid = condCount;
        condCount = condCount + inc;
        return createLiteralAst(tmpIid);
    }
    	//获取ast形式的opId
    function getOpIid() {
        var tmpIid = opIid;
        opIid = opIid + inc;
        return createLiteralAst(tmpIid);
    }

    	//将iid信息写入sourceMap文件,iids[idx]=[filename,line,column]//line为起始行,column为起始行所在列
    function printLineInfoAux(i,ast) {
        if (ast && ast.loc) {
            writeLine('iids['+i+'] = [filename,'+(ast.loc.start.line)+","+(ast.loc.start.column+1)+"];\n");
        }
//        else {
//            console.log(i+":undefined:undefined");
//        }
    }
    	//记录iid信息
    function printIidToLoc(ast0) {
        printLineInfoAux(iid, ast0);
    }
    		//记录opId信息
    function printOpIidToLoc(ast0) {
        printLineInfoAux(opIid, ast0);
    }
    	//记录condId信息
    function printCondIidToLoc(ast0) {
        printLineInfoAux(condCount, ast0);
    }
    	//sourceMap文件句柄
    var traceWfh;
    var fs;
    		//打开sourceMap文件
    function openFile() {
        if (traceWfh === undefined) {
            fs = require('fs');
            traceWfh = fs.openSync(SMAP_FILE_NAME, 'w');
        }
    }
    	//将信息写入到sourceMap文件中
    function writeLine(str) {
        if (traceWfh) {
            fs.writeSync(traceWfh, str);
        }
    }

    	//关闭文件
    function closeFile() {
        if (traceWfh) {
            fs.closeSync(traceWfh);
            traceWfh = null;
        }
    }

    	//对象域赋值,将base[offset]=rvalue转换成J$.P(iid,base,offset,rvalue)
    function wrapPutField(node, base, offset, rvalue) {
        printIidToLoc(node);//将该操作记录到sourcemap文件中
        var ret =  replaceInExpr( 
            logPutFieldFunName+
                "("+RP+"1, "+RP+"2, "+RP+"3, "+RP+"4)",
            getIid(),
            base,
            offset,
            rvalue
        );
        transferLoc(ret, node);//记录新节点的位置信息
        return ret;
    }
    	//base[offset] op rvalue
    function wrapModAssign(node, base, offset, op, rvalue) {
        printIidToLoc(node);
        var ret = replaceInExpr(
            logAssignFunName+"("+RP+"1,"+RP+"2,"+RP+"3,"+RP+"4)("+RP+"5)",
            getIid(),
            base,
            offset,
            createLiteralAst(op),
            rvalue
        );
        transferLoc(ret, node);
        return ret;
    }
    	//base.offset(...)=M(iid,base,offset,isCtor)
    function wrapMethodCall(node, base, offset, isCtor) {
        printIidToLoc(node);
        var ret = replaceInExpr(
            logMethodCallFunName+"("+RP+"1, "+RP+"2, "+RP+"3, "+(isCtor?"true":"false")+")",
            getIid(),
            base,
            offset
        );
        transferLoc(ret, node);
        return ret;
    }
    	//F(iid,ast,isCtor)
    function wrapFunCall(node, ast, isCtor) {
        printIidToLoc(node);
        var ret = replaceInExpr(
            logFunCallFunName+"("+RP+"1, "+RP+"2, "+(isCtor?"true":"false")+")",
            getIid(),
            ast
        );
        transferLoc(ret, node);
        return ret;
    }
    	//base.offset G(iid,base,offset)
    function wrapGetField(node, base, offset) {
        printIidToLoc(node);
        var ret = replaceInExpr(
            logGetFieldFunName+"("+RP+"1, "+RP+"2, "+RP+"3)",
            getIid(),
            base,
            offset
        );
        transferLoc(ret, node);
        return ret;
    }
    	//R(iid,name,val)
    function wrapRead(node, name, val, isReUseIid, isGlobal) {
        printIidToLoc(node);
        var ret = replaceInExpr(
            logReadFunName+"("+RP+"1, "+RP+"2, "+RP+"3,"+(isGlobal?"true":"false")+")",
            isReUseIid?getPrevIidNoInc():getIid(),
            name,
            val
        );
        transferLoc(ret, node);
        return ret;
    }

//    function wrapReadWithUndefinedCheck(node, name) {
//        var ret = replaceInExpr(
//            "("+logIFunName+"(typeof ("+name+") === 'undefined'? "+RP+"2 : "+RP+"3))",
//            createIdentifierAst(name),
//            wrapRead(node, createLiteralAst(name),createIdentifierAst("undefined")),
//            wrapRead(node, createLiteralAst(name),createIdentifierAst(name), true)
//        );
//        transferLoc(ret, node);
//        return ret;
//    }
    		// 读取变量时进行undefined检查I（name,）
    function wrapReadWithUndefinedCheck(node, name) {
        var ret = replaceInExpr(
            "("+logIFunName+"(typeof ("+name+") === 'undefined'? ("+name+"="+RP+"2) : ("+name+"="+RP+"3)))",
            createIdentifierAst(name),
            wrapRead(node, createLiteralAst(name),createIdentifierAst("undefined"), false, true),
            wrapRead(node, createLiteralAst(name),createIdentifierAst(name), true, true)
        );
        transferLoc(ret, node);
        return ret;
    }

    function wrapWrite(node, name, val, lhs) {
        printIidToLoc(node);
        var ret = replaceInExpr(
            logWriteFunName+"("+RP+"1, "+RP+"2, "+RP+"3, "+RP+"4)",
            getIid(),
            name,
            val,
            lhs
        );
        transferLoc(ret, node);
        return ret;
    }
    	//写变量 时进行undefined值检查
    function wrapWriteWithUndefinedCheck(node, name, val, lhs) {
        printIidToLoc(node);
//        var ret2 = replaceInExpr(
//            "("+logIFunName+"(typeof ("+name+") === 'undefined'? "+RP+"2 : "+RP+"3))",
//            createIdentifierAst(name),
//            wrapRead(node, createLiteralAst(name),createIdentifierAst("undefined")),
//            wrapRead(node, createLiteralAst(name),createIdentifierAst(name), true)
//        );
        var ret = replaceInExpr(
            logWriteFunName+"("+RP+"1, "+RP+"2, "+RP+"3, "+logIFunName+"(typeof("+lhs.name+")==='undefined'?undefined:"+lhs.name+"))",
            getIid(),
            name,
            val
        );
        transferLoc(ret, node);
        return ret;
    }
    	//right hand side,left op right
    function wrapRHSOfModStore(node, left, right, op) {
        var ret = replaceInExpr( RP+"1 "+op+" "+RP+"2",
            left, right);
        transferLoc(ret, node);
        return ret;
    }
    	//left hand side,left=right
    function wrapLHSOfModStore(node, left, right) {
        var ret = replaceInExpr( RP+"1 = "+RP+"2",
            left, right);
        transferLoc(ret, node);
        return ret;
    }
    	//
    function wrapLiteral(node, ast, funId) {
        printIidToLoc(node);
        var ret =  replaceInExpr(
            logLitFunName+"("+RP+"1, "+RP+"2, "+RP+"3)",
            getIid(),
            ast,
            createLiteralAst(funId)
        );
        transferLoc(ret, node);
        return ret;
    }

    function wrapReturn(node, expr) {
        var lid = (expr === null)? node: expr;
        printIidToLoc(lid);
        if (expr === null) {
            expr = createIdentifierAst("undefined");
        }
        var ret =  replaceInExpr(
            logReturnFunName+"("+RP+"1, "+RP+"2)",
            getIid(),
            expr
        );
        transferLoc(ret, lid);
        return ret;
    }

    function wrapHash(node, ast) {
        printIidToLoc(node);
        var ret =  replaceInExpr(
            logHashFunName+"("+RP+"1, "+RP+"2)",
            getIid(),
            ast
        );
        transferLoc(ret, node);
        return ret;
    }
    		//对eval函数参数进行解析
    function wrapEvalArg(ast) {
        var ret =  replaceInExpr(
            instrumentCodeFunName+"("+PREFIX1+".getConcrete("+RP+"1), true)",
            ast
        );
        transferLoc(ret, ast);
        return ret;
    }

    function wrapUnaryOp(node, argument, operator) {
        printOpIidToLoc(node);
        var ret =replaceInExpr(
            logUnaryOpFunName+"("+RP+"1,"+RP+"2,"+RP+"3)",
            getOpIid(),
            createLiteralAst(operator),
            argument
        );
        transferLoc(ret, node);
        return ret;
    }

    function wrapBinaryOp(node, left, right, operator) {
        printOpIidToLoc(node);
        var ret =replaceInExpr(
            logBinaryOpFunName+"("+RP+"1, "+RP+"2, "+RP+"3, "+RP+"4)",
            getOpIid(),
            createLiteralAst(operator),
            left,
            right
        );
        transferLoc(ret, node);
        return ret;
    }

    function wrapLogicalAnd(node, left, right) {
        printCondIidToLoc(node);
        var ret =replaceInExpr(
            logConditionalFunName+"("+RP+"1, "+RP+"2)?"+RP+"3:"+logLastFunName+"()",
            getCondIid(),
            left,
            right
        );
        transferLoc(ret, node);
        return ret;
    }

    function wrapLogicalOr(node, left, right) {
        printCondIidToLoc(node);
        var ret =replaceInExpr(
            logConditionalFunName+"("+RP+"1, "+RP+"2)?"+logLastFunName+"():"+RP+"3",
            getCondIid(),
            left,
            right
        );
        transferLoc(ret, node);
        return ret;
    }

    function wrapSwitchDiscriminant(node, discriminant) {
        printCondIidToLoc(node);
        var ret =replaceInExpr(
            logSwitchLeftFunName+"("+RP+"1, "+RP+"2)",
            getCondIid(),
            discriminant
        );
        transferLoc(ret, node);
        return ret;
    }

    function wrapSwitchTest(node, test) {
        printCondIidToLoc(node);
        var ret = replaceInExpr(
            logSwitchRightFunName+"("+RP+"1, "+RP+"2)",
            getCondIid(),
            test
        );
        transferLoc(ret, node);
        return ret;
    }
    
    function wrapWithObject(node,obj){
				printIidToLoc(node);
				var ret= replaceInExpr(
						logWithObjectFunName + "(" + RP + "1 ," + RP + "2)",
						getIid(),
						obj
						);
				transferLoc(ret,node);
				return ret;
    }

    function wrapConditional(node, test) {
        if (node === null) {
            return node;
        } // to handle for(;;) ;

        printCondIidToLoc(node);
        var ret= replaceInExpr(
            logConditionalFunName+"("+RP+"1, "+RP+"2)",
            getCondIid(),
            test
        );
        transferLoc(ret, node);
        return ret;
    }

    function createCallWriteAsStatement(node, name, val) {
        printIidToLoc(node);
        var ret =replaceInStatement(
            logWriteFunName+"("+RP+"1, "+RP+"2, "+RP+"3)",
            getIid(),
            name,
            val
        );
        transferLoc(ret[0].expression,node);
        return ret;
    }

    function createCallInitAsStatement(node, name, val, isArgumentSync) {
        printIidToLoc(node);
        var ret;

        if (isArgumentSync)
            ret =replaceInStatement(
                RP+"1 = "+logInitFunName+"("+RP+"2, "+RP+"3, "+RP+"4, "+isArgumentSync+")",
                val,
                getIid(),
                name,
                val
            );
        else
            ret =replaceInStatement(
                logInitFunName+"("+RP+"1, "+RP+"2, "+RP+"3, "+isArgumentSync+")",
                getIid(),
                name,
                val
            );

        transferLoc(ret[0].expression,node);
        return ret;
    }
    	//J$.Fe(iid,arguments,callee,this)
    function createCallAsFunEnterStatement(node) {
        printIidToLoc(node);
        var id = getIid();
        node.eeid = id;//function entry and exit id are the same
        var ret = replaceInStatement(
            logFunctionEnterFunName+"("+RP+"1,arguments.callee, this)",
            id
        );
        transferLoc(ret[0].expression, node);
        return ret;
    }
    		//J$.Se(iid,filename)
    function createCallAsScriptEnterStatement(node, instrumentedFileName) {
        printIidToLoc(node);
        var id = getIid();
        	node.eeid = id;
        var ret = replaceInStatement(logScriptEntryFunName+"("+RP+"1,"+RP+"2)",
            id,
            createLiteralAst(instrumentedFileName));
        transferLoc(ret[0].expression, node);
        return ret;
    }

    var labelCounter = 0;
    		//将代码用try catch包装，代码因此变得复杂
    function wrapScriptBodyWithTryCatch(node, body) {
        printIidToLoc(node);
        var l = labelCounter++;
        var ret = replaceInStatement(
            "function n() { try {"+RP+"1} catch("+PREFIX1+
                "e) { console.log("+PREFIX1+"e); console.log("+
                PREFIX1+"e.stack); throw "+PREFIX1+
                "e; } finally { "+logScriptExitFunName+"("+
                RP+"2);}\n }", body,
            node.eeid
        );
        //console.log("script body:" + escodegen.generate({type:"Program",body:[ret[0].body]}));

        ret = ret[0].body.body;
        transferLoc(ret[0], node);
        return ret;
    }

    function wrapFunBodyWithTryCatch(node, body) {
        printIidToLoc(node);
        var l = labelCounter++;
/*        var ret = replaceInStatement(
         "function n() { jalangiLabel"+l+": while(true) { try {"+RP+"1} catch("+PREFIX1+
                "e) { console.log("+PREFIX1+"e); console.log("+
                PREFIX1+"e.stack); throw "+PREFIX1+
                "e; } finally { if ("+logFunctionReturnFunName+"("+
                RP+"2)) continue jalangiLabel"+l+";\n else \n  return "+logReturnAggrFunName+"();\n }\n }}",body,getIid());
*/         

        var ret = replaceInStatement(
            "function n() { try {"+RP+"1} catch("+PREFIX1+
                "e) { console.log("+PREFIX1+"e); console.log("+
                PREFIX1+"e.stack); throw "+PREFIX1+
                "e; } finally { "+logFunctionReturnFunName+"("+ RP+"2);return "+logReturnAggrFunName+"();\n }\n}", body,
            node.eeid
        );

        //console.log(JSON.stringify(ret));

        ret = ret[0].body.body;//ret[0] is function decleration,ret[0].body.body is function content;
       // console.log("function body:"+JSON.stringify(ret))
        transferLoc(ret[0], node);
        return ret;
    }

//    function wrapScriptBodyWithTryCatch(node, body) {
//        printIidToLoc(node);
//        var ret = replaceInStatement("try {"+RP+"1} catch("+PREFIX1+
//                "e) { console.log("+PREFIX1+"e); console.log("+
//                PREFIX1+"e.stack); throw "+PREFIX1+
//                "e; } finally { "+logScriptExitFunName+"("+
//                RP+"2); }",
//            body,
//            getIid()
//        );
//        transferLoc(ret[0], node);
//        return ret;
//    }
    	//获取前置代码
    	/*
    if (typeof window === 'undefined') {
    require('/home/xwm/workspace/yjs2/jalangi-master/src/js/analysis.js');
    require('/home/xwm/workspace/yjs2/jalangi-master/src/js/InputManager.js');
    require('/home/xwm/workspace/yjs2/jalangi-master/src/js/instrument/esnstrument.js');
    require(process.cwd() + '/inputs.js');
}*/
    function prependScriptBody(node, body) {
        var path = require('path');
        var analysisFile = path.resolve(__dirname,'../analysis.js');
//        var inputManagerFile = path.resolve(__dirname,'../InputManager.js');
        var thisFile = path.resolve(__filename);
//        var taintEngineFile = path.resolve(__dirname,'../../analyses/taint/TaintEngine');
//        var inputFile = path.resolve(process.cwd()+"/inputs.js");
    		var gutilFile = path.resolve(__dirname,'../analyses/taint/gutil.js');
       var policyFile = path.resolve(__dirname,'../analyses/taint/policy.js');

        var n_code = '/*if (typeof window ==="undefined") */{\n' +
        		 '    require("'+sanitizePath(gutilFile)+'");\n' +
        		 '    require("'+sanitizePath(policyFile)+'");\n' +
            '    require("'+sanitizePath(analysisFile)+'");\n' +
            //            '    require("'+sanitizePath(inputManagerFile)+'");\n' +
            '    require("'+sanitizePath(thisFile)+'");\n' +
//            '    require("'+sanitizePath(taintEngineFile)+'");\n' +
            '}\n';
        var ret = replaceInStatement(n_code+
            "\n{"+RP+"1}\n",
            body
        );
        transferLoc(ret[0], node);
        return ret;
    }

    function instrumentFunctionEntryExit(node, ast) {
        var body = createCallAsFunEnterStatement(node).
            concat(syncDefuns(node, scope, false)).concat(ast);
        return body;
    }

//    function instrumentFunctionEntryExit(node, ast) {
//        return wrapFunBodyWithTryCatch(node, ast);
//    }

    function instrumentScriptEntryExit(node, body0) {
        var modFile = (typeof filename === "string")?
            filename.replace(".js",FILESUFFIX1+".js"):
            "internal";
        var body = createCallAsScriptEnterStatement(node, modFile).
            concat(syncDefuns(node, scope, true)).concat(body0);
            
        return body;
    }


    function syncDefuns(node, scope, isScript) {
        var ret = [];
        if(!isScript) {
            ret = ret.concat(createCallInitAsStatement(node,
                createLiteralAst("arguments"),
                createIdentifierAst("arguments"),
                true));
        			}
        if (scope){
            for (var name in scope.vars) {
                if (HOP(scope.vars, name)) {
                    if (scope.vars[name] ==="defun") {
                        var ident = createIdentifierAst(name);
                        ident.loc = scope.funLocs[name];
                        ret = ret.concat(createCallInitAsStatement(node,
                            createLiteralAst(name),
                            wrapLiteral(ident, ident, N_LOG_FUNCTION_LIT),
                            false));
                    								}
                    if (scope.vars[name] ==="arg") {
                        ret = ret.concat(createCallInitAsStatement(node,
                            createLiteralAst(name),
                            createIdentifierAst(name),
                            true));
                    								}
                    if (scope.vars[name] ==="var") {
                        ret = ret.concat(createCallInitAsStatement(node,
                            createLiteralAst(name),
                            createIdentifierAst(name),
                            false));
                    							}
                			}//end if HOP
            }//end for
        		}//end scope
        return ret;
    }

    function getPropertyAsAst(ast) {
        return ast.computed?ast.property:createLiteralAst(ast.property.name);
    }

    function instrumentCall(ast, isCtor) {
        var ret;
        if (ast.type==='MemberExpression') {
            ret = wrapMethodCall(ast, ast.object,
                getPropertyAsAst(ast),
                isCtor);
            return ret;
        } else if (ast.type ==='Identifier' && ast.name === "eval") {
                return ast;
        } else {
            ret = wrapFunCall(ast, ast, isCtor);
            return ret;
        }
    }

    function instrumentStore(node) {
        var ret;
        if (node.left.type === 'Identifier') {
            if (scope.hasVar(node.left.name)) {
                ret = wrapWrite(node.right, createLiteralAst(node.left.name), node.right, node.left);
            } else {
                ret = wrapWriteWithUndefinedCheck(node.right, createLiteralAst(node.left.name), node.right, node.left);

            				}
            node.right = ret;
            return node;
        } else {
            ret = wrapPutField(node, node.left.object, getPropertyAsAst(node.left), node.right);
            return ret;
        }
    }

    function instrumentLoadModStore(node) {
        if (node.left.type === 'Identifier') {
            var ret = instrumentLoad(node.left);
            var tmp1 = wrapRHSOfModStore(node.right, ret, node.right, node.operator.substring(0,node.operator.length-1));

            var tmp2;
            if (scope.hasVar(node.left.name)) {
                tmp2= wrapWrite(node.right, createLiteralAst(node.left.name),tmp1, node.left);
            } else {
                tmp2= wrapWriteWithUndefinedCheck(node.right, createLiteralAst(node.left.name),tmp1, node.left);

            					}
            tmp2 = wrapLHSOfModStore(node, node.left, tmp2);
            return tmp2;
        } else {
            var ret = wrapModAssign(node, node.left.object,
                getPropertyAsAst(node.left),
                node.operator.substring(0,node.operator.length-1),
                node.right);
            return ret;
        }
    }

    function instrumentPreIncDec(node) {
        var right = createLiteralAst(1);
        var ret = wrapRHSOfModStore(node, node.argument, right, node.operator.substring(0,1)+"=");
        return instrumentLoadModStore(ret);
    }

    function adjustIncDec(op, ast) {
        if (op==='++') {
            op = '-';
        } else {
            op = '+';
        }
        var right = createLiteralAst(1);
        var ret = wrapRHSOfModStore(ast, ast, right, op);
        return ret;
    }

    function instrumentLoad(ast) {
        var ret;
        if (ast.type ==='Identifier') {
            if (ast.name === "undefined") {
                ret = wrapLiteral(ast, ast, N_LOG_UNDEFINED_LIT);
                return ret;
            } else if (ast.name === "NaN" || ast.name === "Infinity") {
                ret = wrapLiteral(ast, ast, N_LOG_NUMBER_LIT);
                return ret;
            } if(ast.name === PREFIX1 ||
                ast.name === "eval"){
                return ast;
            } else if (scope.hasVar(ast.name)) {
                ret = wrapRead(ast, createLiteralAst(ast.name),ast);
                return ret;
            } else {
                //ret = wrapReadWithUndefinedCheck(ast, ast.name);
                ret = wrapRead(ast, createLiteralAst(ast.name),ast,false,true);
                return ret;
            			}
        			}
        else if (ast.type==='MemberExpression') {
            return wrapGetField(ast, ast.object, getPropertyAsAst(ast));
        			} 
        else {
            return ast;
        			}
    }


    var tryCatch = false;

    var scope;

    function setScope(node) {
        scope = node.scope;
    }

    var visitorRRPre = {
        'Program': setScope,
        'FunctionDeclaration': setScope,
        'FunctionExpression': setScope
    }

    
    var visitorRRPost = {  //先于visitorOps执行
        'Literal': function(node, context) {
            if (context === CONTEXT.RHS){

                var litType;
                switch(typeof node.value) {
                    case 'number':
                        litType = N_LOG_NUMBER_LIT;
                        break;
                    case 'string':
                        litType = N_LOG_STRING_LIT;
                        break;
                    case 'object': // for null
                        if (node.value === null)
                            litType = N_LOG_NULL_LIT;
                        else
                            litType = N_LOG_REGEXP_LIT;
                        break;
                    case 'boolean':
                        litType = N_LOG_BOOLEAN_LIT;
                        break;
                						}
                var ret1 = wrapLiteral(node, node, litType);
                return ret1;
            } else {
                return node;
            				}
        },
        "Program": function(node) {
           // if (!tryCatch) {
                var ret = instrumentScriptEntryExit(node, node.body);
                node.body = ret;

            //}
            scope = scope.parent;
            return node;
        },
        "VariableDeclaration": function (node) {
            var declarations = MAP(node.declarations, function(def){
                if (def.init !== null) {
                    var init = wrapWrite(def.init, createLiteralAst(def.id.name), def.init, def.id);
                    def.init = init;
                							}
                return def;
            		});
            node.declarations = declarations;
            return node;
        },
        "NewExpression": function(node) {
            var ret = {
                type: 'CallExpression',
                callee: instrumentCall(node.callee, true),
                'arguments': node.arguments
            };
            transferLoc(ret, node);
            var ret1 = wrapLiteral(node, ret, N_LOG_OBJECT_LIT);
            return ret1;
        },
        "CallExpression": function(node) {
            var isEval = node.callee.type === 'Identifier' && node.callee.name === "eval";
            var callee = instrumentCall(node.callee, false);
            node.callee = callee;
            if (isEval) {
                node.arguments = MAP(node.arguments, wrapEvalArg);
            }
            return node;
        },
        "AssignmentExpression": function(node) {
            var ret1;
            if (node.operator === "=") {
                ret1 = instrumentStore(node);
            } else {
                ret1 = instrumentLoadModStore(node);
            }
            return ret1;
        },
        "UpdateExpression": function(node) {
            var ret1;
            ret1 = instrumentPreIncDec(node);
            if (!node.prefix) {
                ret1 = adjustIncDec(node.operator, ret1);
            }
            return ret1;
        },
        "FunctionExpression": function(node, context) {
            node.body.body = instrumentFunctionEntryExit(node, node.body.body);
            var ret1;
            if (context === CONTEXT.GETTER || context === CONTEXT.SETTER) {
                ret1 = node;
            } else {
                ret1 = wrapLiteral(node, node, N_LOG_FUNCTION_LIT);
            }
            scope = scope.parent;
            return ret1;
        },
        "FunctionDeclaration": function(node) {
            node.body.body = instrumentFunctionEntryExit(node, node.body.body);
            scope = scope.parent;
            return node;
        },
        "ObjectExpression": function(node) {
            var ret1 = wrapLiteral(node, node, N_LOG_OBJECT_LIT);
            return ret1;
        },
        "ArrayExpression": function(node) {
            var ret1 = wrapLiteral(node, node, N_LOG_ARRAY_LIT);
            return ret1;
        },
        'ThisExpression': function(node) {
            var ret = wrapRead(node, createLiteralAst('this'),node);
            return ret;
        },
        'Identifier': function(node, context) {
            if (context === CONTEXT.RHS){
                var ret = instrumentLoad(node);
                return ret;
            } else {
                return node;
            }
        },
        'MemberExpression': function(node, context) {
            if (context === CONTEXT.RHS){
                var ret = instrumentLoad(node);
                return ret;
            } else {
                return node;
            }
        },
        "ForInStatement": function(node) {
            var ret = wrapHash(node.right, node.right);
            node.right = ret;
            return node;
        },
        "ReturnStatement": function(node) {
            var ret = wrapReturn(node, node.argument);
            node.argument = ret;
            return node;
        }
    }

    
    function funCond(node) {
        var ret = wrapConditional(node.test, node.test);
        node.test  = ret;
        return node;
    }

    	function wrapConditionExpression(node){
    				node = funCond(node);
    					var code = "_$r="+RP+"1,"+logControlEndFunName+"(),_$r";
    						var seqExp = replaceInExpr(code,node);
    						transferLoc(seqExp, node);
    						return seqExp;
    	}
    
    	function appendConditionEndCall(node){
    		   node = funCond(node);
    		   			var cid = getCondIid();
    		  	var code = "{"+logControlBeginFunName + "("+RP+"1);" + logControlEndFunName+"("+RP+"2);}";
    		  	var blockStmt = replaceInStatement(code,cid,cid)[0];
    		  	blockStmt.body=[blockStmt.body[0],node,blockStmt.body[1]];
    		  	transferLoc(blockStmt, node);
    				return blockStmt;
    	}


    var visitorOps = {
        "Program": function(node) { //node.body is array
            var body = wrapScriptBodyWithTryCatch(node, node.body);//returned body is array
            if (!tryCatch) {
                var ret = prependScriptBody(node, body);
            }
            node.body = body;
            return node;
        },
        'BinaryExpression': function(node) {
            var ret = wrapBinaryOp(node, node.left, node.right, node.operator);
            return ret;
        },
        'LogicalExpression': function(node) {
            var ret;
            if (node.operator === "&&") {
                ret = wrapLogicalAnd(node, node.left, node.right);
            } else if (node.operator === "||") {
                ret = wrapLogicalOr(node, node.left, node.right);
            }
            return ret;
        },
        'UnaryExpression': function(node) {
            var ret;
            if(node.operator === "delete" || node.operator ==="void") {
                return node;
            } else {
                ret = wrapUnaryOp(node, node.argument, node.operator);
            }
            return ret;
        },
        "SwitchStatement": function(node) {
            var dis = wrapSwitchDiscriminant(node.discriminant, node.discriminant);
            var cases =  MAP(node.cases, function(acase){
                var test;
                if (acase.test) {
                    test = wrapSwitchTest(acase.test, acase.test);
                    acase.test = test;
                }
                return acase;
            });
            node.discriminant = dis;
            node.cases = cases;
            return node;
        },
        "FunctionExpression": function(node) {
            node.body.body = wrapFunBodyWithTryCatch(node, node.body.body);
            return node;
        },
        "FunctionDeclaration": function(node) {
            node.body.body = wrapFunBodyWithTryCatch(node, node.body.body);
            return node;
        },
        "ConditionalExpression": function(node){
        			return wrapConditionExpression(code);		
        		},
       "WithStatement":function(node){
    	   		node.object = wrapWithObject(node,node.object);
						return node;
        		},
        "IfStatement": appendConditionEndCall,
        "WhileStatement":appendConditionEndCall,
        "DoWhileStatement": appendConditionEndCall,
        "ForStatement": appendConditionEndCall
    };

    function addScopes(ast) {

        function Scope(parent) {
            this.vars = {};
            this.funLocs = {};
            this.hasEval = false;
            this.hasArguments = false;
            this.parent = parent;
        }

        Scope.prototype.addVar = function(name, type, loc) {
            this.vars[name] = type;
            if (type === 'defun') {
                this.funLocs[name] = loc;
            }
        };

        Scope.prototype.hasVar = function(name) {
            var s = this;
            while (s !== null) {
                if (HOP(s.vars,name))
                    return s.vars[name];
                s = s.parent;
            }
            return null;
        };

        Scope.prototype.addEval = function() {
            var s = this;
            while (s !== null) {
                s.hasEval = true;
                s = s.parent;
            }
        };

        Scope.prototype.addArguments = function() {
            var s = this;
            while (s !== null) {
                s.hasArguments = true;
                s = s.parent;
            }
        };

        Scope.prototype.usesEval = function() {
            return this.hasEval;
        };

        Scope.prototype.usesArguments = function() {
            return this.hasArguments;
        };


        var currentScope = null;

        function handleFun(node) {
            var oldScope = currentScope;
            currentScope = new Scope(currentScope);
            node.scope = currentScope;
            if (node.type === 'FunctionDeclaration') {
                oldScope.addVar(node.id.name, "defun", node.loc);
                MAP(node.params, function(param) {
                    currentScope.addVar(param.name, "arg");
                })
            } else if (node.type === 'FunctionExpression') {
                if (node.id !== null) {
                    currentScope.addVar(node.id.name, "lambda");
                }
                MAP(node.params, function(param) {
                    currentScope.addVar(param.name, "arg");
                })
            }
        }

        function handleVar(node) {
            currentScope.addVar(node.id.name, "var");
        }

        function handleCatch(node) {
            currentScope.addVar(node.param.name, "catch");
        }

        function popScope(node) {
            currentScope = currentScope.parent;
            return node;
        }

        var visitorPre = {
            'Program': handleFun,
            'FunctionDeclaration': handleFun,
            'FunctionExpression': handleFun,
            'VariableDeclarator': handleVar,
            'CatchClause': handleCatch
        }

        var visitorPost = {
            'Program': popScope,
            'FunctionDeclaration': popScope,
            'FunctionExpression': popScope
        }

        transformAst(ast, visitorPost, visitorPre);
    }


    function transformString(code, visitorsPost, visitorsPre) {
        var newAst = esprima.parse(code, {loc:true, range:true});
        addScopes(newAst);
        var len = visitorsPost.length;
        for (var i=0; i<len; i++) {
            newAst = transformAst(newAst, visitorsPost[i], visitorsPre[i], CONTEXT.RHS);
        }
        return newAst;
    }

    var noInstr = "//DO NOT INSTRUMENT";

    function instrumentCode(code,fileName) {
        var oldCondCount;
        var noTryCatchAtTop = true;
        			filename = fileName;
        if (typeof  code === "string" && !(code.indexOf(noInstr)>=0)) {
            if (noTryCatchAtTop) {
                oldCondCount = condCount;
                condCount = 3;
            					}
            tryCatch = noTryCatchAtTop;
            var newAst = transformString(code, [visitorRRPost, visitorOps], [visitorRRPre, undefined]);
	    
            var newCode = escodegen.generate(newAst);

            if (noTryCatchAtTop) {
                condCount = oldCondCount;
            }
            var ret = newCode+"\n"+noInstr+"\n";
            return ret;
        } else {
            return code;
        }
    }

    function instrumentFile(arg) {
        var args = arg?(isArr(arg)?arg:[arg]):process.argv.slice[2], i;
        var fs = require('fs');
        var path = require('path');

        function regex_escape (text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }

        var saveCode = function(code, filename, fileOnly) {
//            var preFile = path.resolve(__dirname,'analysis.js');
//            var inputManagerFile = path.resolve(__dirname,'InputManager.js');
//            var thisFile = path.resolve(__filename);
//            var inputFile = path.resolve(process.cwd()+"/inputs.js");

//            var n_code = 'if (typeof window ==="undefined") {\n' +
//                '    require("'+preFile+'");\n' +
//                '    require("'+inputManagerFile+'");\n' +
//                '    require("'+thisFile+'");\n' +
//                '    require("'+inputFile+'");\n' +
//                '}\n'+
            var n_code = code +"\n"+noInstr +"\n";
            n_code += '\n//@ sourceMappingURL='+fileOnly+'.map\n';
            fs.writeFileSync(filename, n_code,"utf8");
            fs.writeFileSync(COVERAGE_FILE_NAME, JSON.stringify({"covered":0, "branches":condCount/inc*2, "coverage":[]}),"utf8");
        }


        openFile();
        writeLine("(function (sandbox) { var iids = sandbox.iids = []; var filename;\n")
        for (i=0; i< args.length; i++) {
            filename = args[i];
            writeLine("filename = \"" + sanitizePath(require('path').resolve(process.cwd(),filename)) + "\";\n");
            console.log("Instrumenting "+filename+" ...");
            var code = getCode(filename);
            tryCatch = true;
            var newAst = transformString(code, [visitorRRPost, visitorOps], [visitorRRPre, undefined]);
            //console.log("new ast:"+JSON.stringify(newAst));
            var newFileName = filename.replace(".js",FILESUFFIX1+".js");
            var fileOnly = path.basename(filename);
            var newFileOnly = path.basename(newFileName);
            var smap = escodegen.generate(newAst, {sourceMap: fileOnly});
            smap = smap.replace(fileOnly, newFileOnly);
            fs.writeFileSync(newFileName+".map", smap,"utf8");

            var n_code = escodegen.generate(newAst);
            saveCode(n_code, newFileName, newFileOnly);
        }
        writeLine("}(typeof "+PREFIX1+" === 'undefined'? "+PREFIX1+" = {}:"+PREFIX1+"));\n")
        closeFile();
    }



    if (typeof window === 'undefined' && (typeof require !== "undefined") && require.main === module) {
        instrumentFile();
        //console.log(instrumentCode('({"f1":"hello", "f2":"world"})', true));
    } else {
        sandbox.instrumentCode = instrumentCode;
        sandbox.instrumentFile = instrumentFile;
    }
}((typeof T$ === 'undefined')?exports:T$));
//console.log(transformString("var x = 3 * 4;", visitor1));
//console.log(transformFile("tests/unit/instrument-test.js", [visitorRRPost, visitorOps], [visitorRRPre, undefined]));


