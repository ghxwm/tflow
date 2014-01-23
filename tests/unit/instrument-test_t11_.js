if (typeof window === 'undefined') {
    require('/home/xwm/code/jalangi-master/src/js/analysis.js');
    require('/home/xwm/code/jalangi-master/src/js/InputManager.js');
    require('/home/xwm/code/jalangi-master/src/js/instrument/esnstrument.js');
    require(process.cwd() + '/inputs.js');
}
{
    jalangiLabel9:
        while (true) {
            try {
                J$.Se(969, '/home/xwm/code/jalangi-master/tests/unit/instrument-test_t11_.js');
                J$.N(973, 'i', i, false);
                J$.N(977, 'a', a, false);
                J$.N(985, 'f1', J$.T(981, f1, 12), false);
                J$.N(989, 'o', o, false);
                J$.N(993, 'arr', arr, false);
                J$.N(997, 'arr2', arr2, false);
                J$.N(1001, 'regex1', regex1, false);
                J$.N(1005, 'undef', undef, false);
                J$.N(1009, 'infty', infty, false);
                J$.N(1017, 'Con', J$.T(1013, Con, 12), false);
                J$.N(1021, 'c', c, false);
                J$.N(1029, 'bar', J$.T(1025, bar, 12), false);
                J$.N(1037, 'foo', J$.T(1033, foo, 12), false);
                J$.N(1045, 'f3', J$.T(1041, f3, 12), false);
                J$.N(1049, 'x', x, false);
                var i;
                var a = J$.W(25, 'a', J$.T(21, [
                        J$.T(5, 1, 22),
                        J$.T(9, 2, 22),
                        J$.T(13, 3, 22),
                        J$.T(17, 4, 22)
                    ], 10), a);
                lbl1:
                    for (i = J$.W(33, 'i', J$.T(29, 0, 22), i); J$.C(12, J$.B(6, '<', J$.R(37, 'i', i, false), J$.G(45, J$.R(41, 'a', a, false), 'length'))); J$.B(14, '-', i = J$.W(53, 'i', J$.B(10, '+', J$.R(49, 'i', i, false), 1), i), 1)) {
                        {
                            J$.Cb(8);
                            if (J$.C(4, J$.B(18, '===', J$.R(57, 'i', i, false), J$.T(61, 0, 22)))) {
                                continue;
                            }
                            J$.Ce(8);
                        }
                        J$.M(81, J$.I(typeof console === 'undefined' ? console = J$.R(65, 'console', undefined, true) : console = J$.R(65, 'console', console, true)), 'log', false)(J$.G(77, J$.R(69, 'a', a, false), J$.R(73, 'i', i, false)));
                    }
                function f1(j) {
                    jalangiLabel2:
                        while (true) {
                            try {
                                J$.Fe(253, arguments.callee, this);
                                arguments = J$.N(257, 'arguments', arguments, true);
                                j = J$.N(261, 'j', j, true);
                                J$.N(269, 'f2', J$.T(265, f2, 12), false);
                                function f2(c) {
                                    jalangiLabel0:
                                        while (true) {
                                            try {
                                                J$.Fe(193, arguments.callee, this);
                                                arguments = J$.N(197, 'arguments', arguments, true);
                                                c = J$.N(201, 'c', c, true);
                                                J$.N(205, 'sum', sum, false);
                                                J$.N(209, 'x', x, false);
                                                var sum = J$.W(89, 'sum', J$.R(85, 'c', c, false), sum);
                                                var x;
                                                try {
                                                    sum = J$.W(101, 'sum', J$.B(22, '*', J$.R(97, 'sum', sum, false), J$.R(93, 'j', j, false)), sum);
                                                    {
                                                        J$.Cb(20);
                                                        if (J$.C(16, J$.B(26, '>', J$.R(105, 'sum', sum, false), J$.T(109, 4, 22)))) {
                                                            sum = J$.W(117, 'sum', J$.U(30, '-', J$.R(113, 'sum', sum, false)), sum);
                                                        }
                                                        J$.Ce(20);
                                                    }
                                                    i = J$.W(125, 'i', J$.T(121, 0, 22), i);
                                                    {
                                                        J$.Cb(28);
                                                        while (J$.C(24, J$.B(34, '<', J$.R(129, 'i', i, false), J$.R(133, 'sum', sum, false)))) {
                                                            J$.M(145, J$.I(typeof console === 'undefined' ? console = J$.R(137, 'console', undefined, true) : console = J$.R(137, 'console', console, true)), 'log', false)(J$.R(141, 'i', i, false));
                                                            J$.B(42, '-', i = J$.W(153, 'i', J$.B(38, '+', J$.R(149, 'i', i, false), 1), i), 1);
                                                        }
                                                        J$.Ce(28);
                                                    }
                                                    {
                                                        J$.Cb(36);
                                                        do {
                                                            J$.M(165, J$.I(typeof console === 'undefined' ? console = J$.R(157, 'console', undefined, true) : console = J$.R(157, 'console', console, true)), 'log', false)(J$.R(161, 'i', i, false));
                                                            J$.B(50, '+', i = J$.W(173, 'i', J$.B(46, '-', J$.R(169, 'i', i, false), 1), i), 1);
                                                        } while (J$.C(32, J$.B(54, '>', J$.R(177, 'i', i, false), J$.T(181, 0, 22))));
                                                        J$.Ce(36);
                                                    }
                                                } finally {
                                                    return J$.Rt(189, J$.R(185, 'sum', sum, false));
                                                }
                                            } catch (J$e) {
                                                console.log(J$e);
                                                console.log(J$e.stack);
                                                throw J$e;
                                            } finally {
                                                if (J$.Fr(1053))
                                                    continue jalangiLabel0;
                                                else
                                                    return J$.Ra();
                                            }
                                        }
                                }
                                return J$.Rt(249, J$.T(245, function f6(i) {
                                    jalangiLabel1:
                                        while (true) {
                                            try {
                                                J$.Fe(233, arguments.callee, this);
                                                arguments = J$.N(237, 'arguments', arguments, true);
                                                i = J$.N(241, 'i', i, true);
                                                return J$.Rt(229, J$.B(58, '+', J$.R(213, 'j', j, false), J$.F(225, J$.R(217, 'f2', f2, false), false)(J$.R(221, 'i', i, false))));
                                            } catch (J$e) {
                                                console.log(J$e);
                                                console.log(J$e.stack);
                                                throw J$e;
                                            } finally {
                                                if (J$.Fr(1057))
                                                    continue jalangiLabel1;
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
                                if (J$.Fr(1061))
                                    continue jalangiLabel2;
                                else
                                    return J$.Ra();
                            }
                        }
                }
                var o = J$.W(325, 'o', J$.T(321, {
                        x: J$.T(273, 1, 22),
                        f1: J$.T(313, function () {
                            jalangiLabel3:
                                while (true) {
                                    try {
                                        J$.Fe(305, arguments.callee, this);
                                        arguments = J$.N(309, 'arguments', arguments, true);
                                        J$.A(285, J$.R(277, 'this', this, false), 'x', '+')(J$.T(281, 5, 22));
                                        J$.A(301, J$.R(289, 'this', this, false), J$.R(293, 'x', x, false), '-')(J$.T(297, 4, 22));
                                    } catch (J$e) {
                                        console.log(J$e);
                                        console.log(J$e.stack);
                                        throw J$e;
                                    } finally {
                                        if (J$.Fr(1065))
                                            continue jalangiLabel3;
                                        else
                                            return J$.Ra();
                                    }
                                }
                        }, 12),
                        del: J$.T(317, 5, 22)
                    }, 11), o);
                J$.M(333, J$.R(329, 'o', o, false), 'f1', false)();
                delete J$.R(337, 'o', o, false).del;
                J$.M(365, J$.I(typeof console === 'undefined' ? console = J$.R(341, 'console', undefined, true) : console = J$.R(341, 'console', console, true)), 'log', false)(J$.F(361, J$.F(353, J$.R(345, 'f1', f1, false), false)(J$.T(349, 3, 22)), false)(J$.T(357, 5, 22)));
                var arr = J$.W(393, 'arr', J$.T(389, J$.F(385, J$.I(typeof Array === 'undefined' ? Array = J$.R(369, 'Array', undefined, true) : Array = J$.R(369, 'Array', Array, true)), true)(J$.T(373, 'a', 21), J$.T(377, 'b', 21), J$.T(381, 'c', 21)), 11), arr);
                var arr2 = J$.W(413, 'arr2', J$.T(409, [
                        J$.T(397, 'a', 21),
                        J$.R(401, 'i', i, false),
                        J$.R(405, 'o', o, false)
                    ], 10), arr2);
                var regex1 = J$.W(421, 'regex1', J$.T(417, /Hello/gi, 14), regex1);
                var undef = J$.W(429, 'undef', J$.T(425, undefined, 24), undef);
                var infty = J$.W(437, 'infty', J$.T(433, Infinity, 22), infty);
                infty = J$.W(445, 'infty', J$.T(441, NaN, 22), infty);
                for (i in J$.H(485, J$.R(449, 'arr', arr, false))) {
                    J$.M(461, J$.I(typeof console === 'undefined' ? console = J$.R(453, 'console', undefined, true) : console = J$.R(453, 'console', console, true)), 'log', false)(J$.R(457, 'i', i, false));
                    J$.M(481, J$.I(typeof console === 'undefined' ? console = J$.R(465, 'console', undefined, true) : console = J$.R(465, 'console', console, true)), 'log', false)(J$.G(477, J$.R(469, 'arr', arr, false), J$.R(473, 'i', i, false)));
                }
                function Con() {
                    jalangiLabel5:
                        while (true) {
                            try {
                                J$.Fe(537, arguments.callee, this);
                                arguments = J$.N(541, 'arguments', arguments, true);
                                J$.P(497, J$.R(489, 'this', this, false), 'x', J$.T(493, 1, 22));
                                J$.P(533, J$.R(501, 'this', this, false), 'f1', J$.T(529, function () {
                                    jalangiLabel4:
                                        while (true) {
                                            try {
                                                J$.Fe(521, arguments.callee, this);
                                                arguments = J$.N(525, 'arguments', arguments, true);
                                                J$.A(509, J$.R(505, 'this', this, false), 'x', '+')(1);
                                                J$.A(517, J$.R(513, 'this', this, false), 'x', '-')(1);
                                            } catch (J$e) {
                                                console.log(J$e);
                                                console.log(J$e.stack);
                                                throw J$e;
                                            } finally {
                                                if (J$.Fr(1069))
                                                    continue jalangiLabel4;
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
                                if (J$.Fr(1073))
                                    continue jalangiLabel5;
                                else
                                    return J$.Ra();
                            }
                        }
                }
                o = J$.W(549, 'o', J$.T(545, null, 25), o);
                {
                    J$.Cb(44);
                    if (J$.C(40, J$.B(66, '===', J$.U(62, 'typeof', J$.R(553, 'o', o, false)), J$.T(557, 'object', 21)))) {
                        J$.M(569, J$.I(typeof console === 'undefined' ? console = J$.R(561, 'console', undefined, true) : console = J$.R(561, 'console', console, true)), 'log', false)(J$.T(565, 'o is null', 21));
                    }
                    J$.Ce(44);
                }
                o = J$.W(577, 'o', J$.T(573, {}, 11), o);
                J$.P(593, J$.R(581, 'o', o, false), J$.T(585, 'C', 21), J$.R(589, 'Con', Con, false));
                var c = J$.W(609, 'c', J$.T(605, J$.F(601, J$.R(597, 'Con', Con, false), true)(), 11), c);
                J$.M(621, J$.R(613, 'c', c, false), J$.T(617, 'f1', 21), false)();
                J$.M(637, J$.I(typeof console === 'undefined' ? console = J$.R(625, 'console', undefined, true) : console = J$.R(625, 'console', console, true)), 'log', false)(J$.G(633, J$.R(629, 'c', c, false), 'x'));
                c = J$.W(653, 'c', J$.T(649, J$.M(645, J$.R(641, 'o', o, false), 'C', true)(), 11), c);
                J$.M(661, J$.R(657, 'c', c, false), 'f1', false)();
                J$.M(677, J$.I(typeof console === 'undefined' ? console = J$.R(665, 'console', undefined, true) : console = J$.R(665, 'console', console, true)), 'log', false)(J$.G(673, J$.R(669, 'c', c, false), 'x'));
                x = J$.W(685, 'x', J$.T(681, 'global', 21), x);
                function bar(s) {
                    jalangiLabel6:
                        while (true) {
                            try {
                                J$.Fe(701, arguments.callee, this);
                                arguments = J$.N(705, 'arguments', arguments, true);
                                s = J$.N(709, 's', s, true);
                                J$.M(697, J$.I(typeof console === 'undefined' ? console = J$.R(689, 'console', undefined, true) : console = J$.R(689, 'console', console, true)), 'log', false)(J$.R(693, 's', s, false));
                            } catch (J$e) {
                                console.log(J$e);
                                console.log(J$e.stack);
                                throw J$e;
                            } finally {
                                if (J$.Fr(1077))
                                    continue jalangiLabel6;
                                else
                                    return J$.Ra();
                            }
                        }
                }
                function foo() {
                    jalangiLabel7:
                        while (true) {
                            try {
                                J$.Fe(737, arguments.callee, this);
                                arguments = J$.N(741, 'arguments', arguments, true);
                                J$.N(745, 'x', x, false);
                                J$.N(749, 'e', e, false);
                                var x = J$.W(717, 'x', J$.T(713, 'local', 21), x);
                                var e = J$.W(721, 'e', eval, e);
                                eval = J$.W(729, 'eval', J$.R(725, 'e', e, false), J$.I(typeof eval === 'undefined' ? undefined : eval));
                                eval(J$.instrumentCode(J$.getConcrete(J$.T(733, 'console.log(x);', 21)), true));
                            } catch (J$e) {
                                console.log(J$e);
                                console.log(J$e.stack);
                                throw J$e;
                            } finally {
                                if (J$.Fr(1081))
                                    continue jalangiLabel7;
                                else
                                    return J$.Ra();
                            }
                        }
                }
                J$.F(757, J$.R(753, 'foo', foo, false), false)();
                function f3(a, b, c) {
                    jalangiLabel8:
                        while (true) {
                            try {
                                J$.Fe(865, arguments.callee, this);
                                arguments = J$.N(869, 'arguments', arguments, true);
                                a = J$.N(873, 'a', a, true);
                                b = J$.N(877, 'b', b, true);
                                c = J$.N(881, 'c', c, true);
                                J$.N(885, 'ret', ret, false);
                                var ret = J$.W(765, 'ret', J$.T(761, null, 25), ret);
                                try {
                                    ret = J$.W(777, 'ret', J$.M(773, J$.R(769, 'c', c, false), 'f1', false)(), ret), J$.C(56, J$.C(52, J$.C(48, J$.R(781, 'a', a, false)) ? J$.R(785, 'b', b, false) : J$._()) ? J$._() : J$.R(789, 'c', c, false)) ? J$.R(793, 'a', a, false) : J$.R(797, 'b', b, false);
                                    throw J$.T(813, J$.F(809, J$.I(typeof Error === 'undefined' ? Error = J$.R(801, 'Error', undefined, true) : Error = J$.R(801, 'Error', Error, true)), true)(J$.T(805, 'Test', 21)), 11);
                                } catch (e) {
                                    J$.M(825, J$.I(typeof console === 'undefined' ? console = J$.R(817, 'console', undefined, true) : console = J$.R(817, 'console', console, true)), 'log', false)(J$.T(821, 'f1 is undefined', 21));
                                } finally {
                                    return J$.Rt(833, J$.R(829, 'ret', ret, false));
                                }
                                try {
                                    throw J$.T(849, J$.F(845, J$.I(typeof Error === 'undefined' ? Error = J$.R(837, 'Error', undefined, true) : Error = J$.R(837, 'Error', Error, true)), true)(J$.T(841, 'Test2', 21)), 11);
                                } catch (e) {
                                    J$.M(861, J$.I(typeof console === 'undefined' ? console = J$.R(853, 'console', undefined, true) : console = J$.R(853, 'console', console, true)), 'log', false)(J$.R(857, 'e', e, false));
                                }
                            } catch (J$e) {
                                console.log(J$e);
                                console.log(J$e.stack);
                                throw J$e;
                            } finally {
                                if (J$.Fr(1085))
                                    continue jalangiLabel8;
                                else
                                    return J$.Ra();
                            }
                        }
                }
                J$.F(905, J$.R(889, 'f3', f3, false), false)(J$.T(893, true, 23), J$.T(897, false, 23), J$.T(901, true, 23));
                var x = J$.W(913, 'x', J$.T(909, '1', 21), x);
                switch (J$.C1(60, J$.R(917, 'x', x, false))) {
                case J$.C2(64, J$.T(921, '2', 21)):
                case J$.C2(68, J$.T(925, '3', 21)):
                    J$.M(937, J$.I(typeof console === 'undefined' ? console = J$.R(929, 'console', undefined, true) : console = J$.R(929, 'console', console, true)), 'log', false)(J$.T(933, 'x > 1', 21));
                    break;
                case J$.C2(72, J$.T(941, '1', 21)):
                    J$.M(953, J$.I(typeof console === 'undefined' ? console = J$.R(945, 'console', undefined, true) : console = J$.R(945, 'console', console, true)), 'log', false)(J$.T(949, 'x === 1', 21));
                    break;
                default:
                    J$.M(965, J$.I(typeof console === 'undefined' ? console = J$.R(957, 'console', undefined, true) : console = J$.R(957, 'console', console, true)), 'log', false)(J$.T(961, 'x not in {1, 2 , 3}', 21));
                }
            } catch (J$e) {
                console.log(J$e);
                console.log(J$e.stack);
                throw J$e;
            } finally {
                if (J$.Sr(1089))
                    continue jalangiLabel9;
                else
                    break jalangiLabel9;
            }
        }
}
// JALANGI DO NOT INSTRUMENT

//@ sourceMappingURL=instrument-test_t11_.js.map