if (typeof window === 'undefined') {
    require('/home/xwm/code/jalangi-master/src/js/analysis.js');
    require('/home/xwm/code/jalangi-master/src/js/analyses/taint/gutil.js');
    require('/home/xwm/code/jalangi-master/src/js/analyses/taint/policy.js');
    require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js');
}
{
    try {
        T$.Se(17, 'tests/tunit/d_t_.js');
        T$.F(13, T$.R(5, 'require', require, true), false)(T$.T(9, './c_t_.js', 21));
    } catch (T$e) {
        console.log(T$e);
        console.log(T$e.stack);
        throw T$e;
    } finally {
        T$.Sr(21);
    }
}
//DO NOT INSTRUMENT

//@ sourceMappingURL=d_t_.js.map
