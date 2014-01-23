if (typeof window === 'undefined') {
    require('/home/xwm/code/jalangi-master/src/js/analysis.js');
    require('/home/xwm/code/jalangi-master/src/js/InputManager.js');
    require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js');
    require(process.cwd() + '/inputs.js');
}
{
    jalangiLabel1:
        while (true) {
            try {
                J$.Se(81, '/home/xwm/code/jalangi-master/tests/unit/instrument-small_t11_.js');
                J$.N(85, 'a', a, false);
                J$.N(93, 'f2', J$.T(89, f2, 12), false);
                var a = J$.W(17, 'a', J$.T(13, {
                        x: J$.T(5, 1, 22),
                        y: J$.T(9, 2, 22)
                    }, 11), a);
                function f2(c) {
                    jalangiLabel0:
                        while (true) {
                            try {
                                J$.Fe(57, arguments.callee, this);
                                arguments = J$.N(61, 'arguments', arguments, true);
                                c = J$.N(65, 'c', c, true);
                                {
                                    if (J$.C(4, J$.B(6, '>', J$.R(21, 'c', c, false), J$.T(25, 5, 22))))
                                        J$.P(45, J$.R(29, 'a', a, false), 'y', J$.B(10, '+', J$.G(37, J$.R(33, 'a', a, false), 'x'), J$.R(41, 'c', c, false)));
                                    J$.Ce();
                                }
                                return J$.Rt(53, J$.R(49, 'c', c, false));
                            } catch (J$e) {
                                console.log(J$e);
                                console.log(J$e.stack);
                                throw J$e;
                            } finally {
                                if (J$.Fr(97))
                                    continue jalangiLabel0;
                                else
                                    return J$.Ra();
                            }
                        }
                }
                J$.F(77, J$.I(typeof f1 === 'undefined' ? f1 = J$.R(69, 'f1', undefined, true) : f1 = J$.R(69, 'f1', f1, true)), false)(J$.T(73, 12, 22));
            } catch (J$e) {
                console.log(J$e);
                console.log(J$e.stack);
                throw J$e;
            } finally {
                if (J$.Sr(101))
                    continue jalangiLabel1;
                else
                    break jalangiLabel1;
            }
        }
}
// JALANGI DO NOT INSTRUMENT

//@ sourceMappingURL=instrument-small_t11_.js.map