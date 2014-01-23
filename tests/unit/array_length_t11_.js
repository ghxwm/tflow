if (typeof window === 'undefined') {
    require('/home/xwm/code/jalangi-master/src/js/analysis.js');
    require('/home/xwm/code/jalangi-master/src/js/InputManager.js');
    require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js');
    require(process.cwd() + '/inputs.js');
}
{
    jalangiLabel0:
        while (true) {
            try {
                J$.Se(81, '/home/xwm/code/jalangi-master/tests/unit/array_length_t11_.js');
                J$.N(85, 'aux', aux, false);
                J$.N(89, 'a', a, false);
                J$.N(93, 'i', i, false);
                var aux = J$.W(17, 'aux', J$.F(13, J$.I(typeof require === 'undefined' ? require = J$.R(5, 'require', undefined, true) : require = J$.R(5, 'require', require, true)), false)(J$.T(9, './array_length_aux', 21)), aux);
                var a = J$.W(29, 'a', J$.M(25, J$.R(21, 'aux', aux, false), 'foo', false)(), a);
                var i;
                for (i = J$.W(37, 'i', J$.T(33, 0, 22), i); J$.C(4, J$.B(6, '<', J$.R(41, 'i', i, false), J$.G(49, J$.R(45, 'a', a, false), 'length'))); J$.B(14, '-', i = J$.W(57, 'i', J$.B(10, '+', J$.R(53, 'i', i, false), 1), i), 1)) {
                    J$.M(77, J$.I(typeof console === 'undefined' ? console = J$.R(61, 'console', undefined, true) : console = J$.R(61, 'console', console, true)), 'log', false)(J$.G(73, J$.R(65, 'a', a, false), J$.R(69, 'i', i, false)));
                }
            } catch (J$e) {
                console.log(J$e);
                console.log(J$e.stack);
                throw J$e;
            } finally {
                if (J$.Sr(97))
                    continue jalangiLabel0;
                else
                    break jalangiLabel0;
            }
        }
}
// JALANGI DO NOT INSTRUMENT

//@ sourceMappingURL=array_length_t11_.js.map