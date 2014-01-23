if (typeof window === 'undefined') {
    require('/home/xwm/code/jalangi-master/src/js/analysis.js');
    require('/home/xwm/code/jalangi-master/src/js/InputManager.js');
    require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js');
    require(process.cwd() + '/inputs.js');
}
{
    jalangiLabel2:
        while (true) {
            try {
                J$.Se(121, '/home/xwm/code/jalangi-master/tests/unit/array_t11_.js');
                J$.N(129, 'bar', J$.T(125, bar, 12), false);
                J$.N(137, 'foo', J$.T(133, foo, 12), false);
                function bar(args) {
                    jalangiLabel0:
                        while (true) {
                            try {
                                J$.Fe(49, arguments.callee, this);
                                arguments = J$.N(53, 'arguments', arguments, true);
                                args = J$.N(57, 'args', args, true);
                                J$.M(13, J$.I(typeof console === 'undefined' ? console = J$.R(5, 'console', undefined, true) : console = J$.R(5, 'console', console, true)), 'warn', false)(J$.T(9, 'bar', 21));
                                J$.P(29, J$.R(17, 'args', args, false), J$.T(21, 0, 22), J$.T(25, 0, 22));
                                J$.P(45, J$.R(33, 'args', args, false), J$.T(37, 1, 22), J$.T(41, 0, 22));
                            } catch (J$e) {
                                console.log(J$e);
                                console.log(J$e.stack);
                                throw J$e;
                            } finally {
                                if (J$.Fr(141))
                                    continue jalangiLabel0;
                                else
                                    return J$.Ra();
                            }
                        }
                }
                function foo(a, b) {
                    jalangiLabel1:
                        while (true) {
                            try {
                                J$.Fe(89, arguments.callee, this);
                                arguments = J$.N(93, 'arguments', arguments, true);
                                a = J$.N(97, 'a', a, true);
                                b = J$.N(101, 'b', b, true);
                                J$.F(69, J$.R(61, 'bar', bar, false), false)(J$.I(typeof arguments === 'undefined' ? arguments = J$.R(65, 'arguments', undefined, true) : arguments = J$.R(65, 'arguments', arguments, true)));
                                J$.M(85, J$.I(typeof console === 'undefined' ? console = J$.R(73, 'console', undefined, true) : console = J$.R(73, 'console', console, true)), 'log', false)(J$.B(6, '+', J$.R(77, 'a', a, false), J$.R(81, 'b', b, false)));
                            } catch (J$e) {
                                console.log(J$e);
                                console.log(J$e.stack);
                                throw J$e;
                            } finally {
                                if (J$.Fr(145))
                                    continue jalangiLabel1;
                                else
                                    return J$.Ra();
                            }
                        }
                }
                J$.F(117, J$.R(105, 'foo', foo, false), false)(J$.T(109, 3, 22), J$.T(113, 4, 22));
            } catch (J$e) {
                console.log(J$e);
                console.log(J$e.stack);
                throw J$e;
            } finally {
                if (J$.Sr(149))
                    continue jalangiLabel2;
                else
                    break jalangiLabel2;
            }
        }
}
// JALANGI DO NOT INSTRUMENT

//@ sourceMappingURL=array_t11_.js.map
