var x = 1;
var d = document;
var cookie = document.cookie;
x=2;
var ck = cookie;
d.cookie = '1';
document.cookie = '2';
var obj = {a:1,b:{c:2},c:function(){}};

function f1(a,b){
	console.log('f1 caller:'+arguments.callee.caller);
	return a;
}
function f2(){
	f1(1,2);
}
f2();
f1(1,2);
obj=undefined;
for(var i in obj){
	console.log('i='+i);
}
var a=1;
a = a==1?2:3;
eval('a==4');
