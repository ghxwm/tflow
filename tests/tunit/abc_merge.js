if (typeof window === 'undefined') {
    require('/home/xwm/code/jalangi-master/src/js/analyses/taint/gutil.js');
    require('/home/xwm/code/jalangi-master/src/js/analysis.js');
    require('/home/xwm/code/jalangi-master/src/js/analyses/taint/policy.js');
    require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js');
}
{
    try {
        T$.Se(13, 'tests/tunit/a_t_.js');
        var x = T$.W(9, 'x', T$.T(5, 1, 22), x);
    } catch (T$e) {
        console.log(T$e);
        console.log(T$e.stack);
        throw T$e;
    } finally {
        T$.Sr(17);
    }
}
//DO NOT INSTRUMENT

//@ sourceMappingURL=a_t_.js.map
if (typeof window === 'undefined') {
    require('/home/xwm/code/jalangi-master/src/js/analysis.js');
    require('/home/xwm/code/jalangi-master/src/js/analyses/taint/gutil.js');
    require('/home/xwm/code/jalangi-master/src/js/analyses/taint/policy.js');
    require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js');
}
{
    try {
        T$.Se(29, 'tests/tunit/b_t_.js');
        var y = T$.W(25, 'y', T$.T(21, 1, 22), y);
    } catch (T$e) {
        console.log(T$e);
        console.log(T$e.stack);
        throw T$e;
    } finally {
        T$.Sr(33);
    }
}
//DO NOT INSTRUMENT

//@ sourceMappingURL=b_t_.js.map
if (typeof window === 'undefined') {
    require('/home/xwm/code/jalangi-master/src/js/analysis.js');
    require('/home/xwm/code/jalangi-master/src/js/analyses/taint/gutil.js');
    require('/home/xwm/code/jalangi-master/src/js/analyses/taint/policy.js');
    require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js');
}
{
    try {
        T$.Se(65, 'tests/tunit/c_t_.js');
        var z;
        z = T$.W(45, 'z', T$.B(6, '+', T$.R(37, 'x', x, true), T$.R(41, 'y', y, true)), z);
        T$.M(61, T$.R(49, 'console', console, true), 'log', false)(T$.B(10, '+', T$.T(53, 'z=x+y=', 21), T$.R(57, 'z', z, false)));
    } catch (T$e) {
        console.log(T$e);
        console.log(T$e.stack);
        throw T$e;
    } finally {
        T$.Sr(69);
    }
}
//DO NOT INSTRUMENT

//@ sourceMappingURL=c_t_.js.map

require('./a.js')
