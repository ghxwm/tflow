if (typeof window === 'undefined') {
    require('/home/xwm/code/jalangi-master/src/js/analysis.js');
    require('/home/xwm/code/jalangi-master/src/js/InputManager.js');
    require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js');
    require(process.cwd() + '/inputs.js');
}
{
    jalangiLabel4:
        while (true) {
            try {
                J$.Se(149, '/home/xwm/code/jalangi-master/tests/unit/fun_call_t11_.js');
                J$.N(157, 'foo', J$.T(153, foo, 12), false);
                J$.N(165, 'bar', J$.T(161, bar, 12), false);
                function foo() {
                    jalangiLabel1:
                        while (true) {
                            try {
                                J$.Fe(49, arguments.callee, this);
                                arguments = J$.N(53, 'arguments', arguments, true);
                                J$.M(13, J$.I(typeof console === 'undefined' ? console = J$.R(5, 'console', undefined, true) : console = J$.R(5, 'console', console, true)), 'log', false)(J$.T(9, 'foo', 21));
                                return J$.Rt(45, J$.T(41, function (x) {
                                    jalangiLabel0:
                                        while (true) {
                                            try {
                                                J$.Fe(29, arguments.callee, this);
                                                arguments = J$.N(33, 'arguments', arguments, true);
                                                x = J$.N(37, 'x', x, true);
                                                J$.M(25, J$.I(typeof console === 'undefined' ? console = J$.R(17, 'console', undefined, true) : console = J$.R(17, 'console', console, true)), 'log', false)(J$.R(21, 'x', x, false));
                                            } catch (J$e) {
                                                console.log(J$e);
                                                console.log(J$e.stack);
                                                throw J$e;
                                            } finally {
                                                if (J$.Fr(169))
                                                    continue jalangiLabel0;
                                                else
                                                    return J$.Ra();
                                            }
                                        }
                                }, 12));
                            } catch (J$e) {
                                console.log(J$e);
                                console.log(J$e.stack);
                                throw J$e;
                            } finally {
                                if (J$.Fr(173))
                                    continue jalangiLabel1;
                                else
                                    return J$.Ra();
                            }
                        }
                }
                function bar() {
                    jalangiLabel2:
                        while (true) {
                            try {
                                J$.Fe(77, arguments.callee, this);
                                arguments = J$.N(81, 'arguments', arguments, true);
                                J$.M(65, J$.I(typeof console === 'undefined' ? console = J$.R(57, 'console', undefined, true) : console = J$.R(57, 'console', console, true)), 'log', false)(J$.T(61, 'bar', 21));
                                return J$.Rt(73, J$.T(69, 'ret', 21));
                            } catch (J$e) {
                                console.log(J$e);
                                console.log(J$e.stack);
                                throw J$e;
                            } finally {
                                if (J$.Fr(177))
                                    continue jalangiLabel2;
                                else
                                    return J$.Ra();
                            }
                        }
                }
                J$.F(101, J$.F(89, J$.R(85, 'foo', foo, false), false)(), false)(J$.F(97, J$.R(93, 'bar', bar, false), false)());
                J$.F(145, J$.T(133, function (a, b) {
                    jalangiLabel3:
                        while (true) {
                            try {
                                J$.Fe(117, arguments.callee, this);
                                arguments = J$.N(121, 'arguments', arguments, true);
                                a = J$.N(125, 'a', a, true);
                                b = J$.N(129, 'b', b, true);
                                return J$.Rt(113, J$.B(6, '+', J$.R(105, 'a', a, false), J$.R(109, 'b', b, false)));
                            } catch (J$e) {
                                console.log(J$e);
                                console.log(J$e.stack);
                                throw J$e;
                            } finally {
                                if (J$.Fr(181))
                                    continue jalangiLabel3;
                                else
                                    return J$.Ra();
                            }
                        }
                }, 12), false)(J$.T(137, 1, 22), J$.T(141, 2, 22));
            } catch (J$e) {
                console.log(J$e);
                console.log(J$e.stack);
                throw J$e;
            } finally {
                if (J$.Sr(185))
                    continue jalangiLabel4;
                else
                    break jalangiLabel4;
            }
        }
}
// JALANGI DO NOT INSTRUMENT

//@ sourceMappingURL=fun_call_t11_.js.map