try {
    T$.Se(101, 'a_t_.js');
    var x = T$.W(77, 'x', T$.T(73, 1, 22), x);
    function f1() {
        try {
            T$.Fe(89, arguments.callee, this);
            x = T$.W(85, 'x', T$.T(81, 2, 22), x);
        } catch (T$e) {
            console.log(T$e);
            console.log(T$e.stack);
            throw T$e;
        } finally {
            T$.Fr(89);
            return T$.Ra();
        }
    }
    var t_x = T$.W(97, 't_x', T$.T(93, 3, 22), t_x);
} catch (T$e) {
    console.log(T$e);
    console.log(T$e.stack);
    throw T$e;
} finally {
    T$.Sr(101);
}
//DO NOT INSTRUMENT
