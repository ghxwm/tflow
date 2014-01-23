if (typeof window === 'undefined') {
    require('/home/xwm/code/jalangi-master/src/js/analysis.js');
    require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js');
}
{
    try {
        T$.Se(41, 'tests/tunit/instrument-test_t_.js');
        var c = T$.W(9, 'c', T$.T(5, 1, 22), c);
        function f1(a, b) {
            try {
                T$.Fe(25, arguments.callee, this);
                var c = T$.W(21, 'c', T$.B(6, '+', T$.R(13, 'a', a, false), T$.R(17, 'b', b, false)), c);
            } catch (T$e) {
                console.log(T$e);
                console.log(T$e.stack);
                throw T$e;
            } finally {
                T$.Fr(45);
                return T$.Ra();
            }
        }
        with (T$.Wo(49, T$.R(29, 'o', o, true))) {
            c = T$.W(37, 'c', T$.T(33, 2, 22), c);
        }
    } catch (T$e) {
        console.log(T$e);
        console.log(T$e.stack);
        throw T$e;
    } finally {
        T$.Sr(53);
    }
}
//DO NOT INSTRUMENT

//@ sourceMappingURL=instrument-test_t_.js.map