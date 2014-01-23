try {
    T$.Se(181, 'test_t_.js');
    var a = T$.W(9, 'a', T$.T(5, 1, 22), a);
    {
        T$.Cb(8);
        if (T$.C(4, T$.R(13, 'a', a, false))) {
            var x = T$.W(21, 'x', T$.T(17, 2, 22), x);
        }
        T$.Ce(8);
    }
    var read = T$.W(177, 'read', T$.T(173, function (e) {
            try {
                T$.Fe(169, arguments.callee, this);
                {
                    T$.Cb(40);
                    if (T$.C(36, (_$r = T$.C(12, T$.B(10, '===', T$.R(25, 'e', e, false), T$.U(6, '!', T$.T(29, 0, 22)))) ? T$.U(14, '!', T$.A(37, T$.R(33, 'x', x, false), 'readyWait', '-')(1)) : T$.U(18, '!', T$.G(45, T$.R(41, 'x', x, false), 'isReady')), T$.Ce(), _$r))) {
                        {
                            T$.Cb(20);
                            if (T$.C(16, T$.U(22, '!', T$.G(53, T$.R(49, 'a', a, false), 'body')))) {
                                return T$.Rt(73, T$.F(69, T$.R(57, 'setTimeout', setTimeout, true), false)(T$.G(65, T$.R(61, 'x', x, false), 'ready')));
                            }
                            T$.Ce(20);
                        }
                        T$.P(85, T$.R(77, 'x', x, false), 'isReady', T$.U(26, '!', T$.T(81, 0, 22))), T$.C(32, T$.C(24, T$.B(34, '!==', T$.R(89, 'e', e, false), T$.U(30, '!', T$.T(93, 0, 22)))) ? T$.B(38, '>', T$.A(101, T$.R(97, 'x', x, false), 'readyWait', '-')(1), T$.T(105, 0, 22)) : T$._()) ? T$._() : (T$.M(125, T$.R(109, 'n', n, true), 'resolveWith', false)(T$.R(113, 'a', a, false), T$.T(121, [T$.R(117, 'x', x, false)], 10)), T$.C(28, T$.G(137, T$.G(133, T$.R(129, 'x', x, false), 'fn'), 'trigger')) ? T$.M(165, T$.M(157, T$.F(149, T$.R(141, 'x', x, false), false)(T$.R(145, 'a', a, false)), 'trigger', false)(T$.T(153, 'ready', 21)), 'off', false)(T$.T(161, 'ready', 21)) : T$._());
                    }
                    T$.Ce(40);
                }
            } catch (T$e) {
                console.log(T$e);
                console.log(T$e.stack);
                throw T$e;
            } finally {
                T$.Fr(169);
                return T$.Ra();
            }
        }, 12), read);
} catch (T$e) {
    console.log(T$e);
    console.log(T$e.stack);
    throw T$e;
} finally {
    T$.Sr(181);
}
//DO NOT INSTRUMENT

//@ sourceMappingURL=test_t_.js.map
