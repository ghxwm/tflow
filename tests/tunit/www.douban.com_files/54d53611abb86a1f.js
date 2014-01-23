try {
    T$.Se(371069, '54d53611abb86a1f_t_.js');
    T$.M(368077, T$.I(typeof Do !== 'undefined' ? T$.R(367561, 'Do', Do, true) : undefined), 'ready', false)(T$.T(368073, function () {
        try {
            T$.Fe(368053, arguments.callee, this);
            T$.N(368061, 'getEventInfo', T$.T(368057, getEventInfo, 12), false);
            T$.N(368069, 'renderEventItem', T$.T(368065, renderEventItem, 12), false);
            var $events = T$.W(367597, '$events', T$.F(367573, T$.I(typeof $ !== 'undefined' ? T$.R(367565, '$', $, true) : undefined), false)(T$.T(367569, '#events', 21)), $events), $eventList = T$.W(367601, '$eventList', T$.F(367585, T$.I(typeof $ !== 'undefined' ? T$.R(367577, '$', $, true) : undefined), false)(T$.T(367581, '#event-list', 21)), $eventList), curEvent = T$.W(367605, 'curEvent', T$.T(367589, {}, 11), curEvent), isRendering = T$.W(367609, 'isRendering', T$.T(367593, false, 23), isRendering);
            T$.M(367785, T$.R(367613, '$events', $events, false), 'delegate', false)(T$.T(367617, 'h2 a', 21), T$.T(367621, 'click', 21), T$.T(367781, function (e) {
                try {
                    T$.Fe(367777, arguments.callee, this);
                    T$.M(367629, T$.R(367625, 'e', e, false), 'preventDefault', false)();
                    {
                        T$.Cb(7);
                        if (T$.C(3, T$.R(367633, 'isRendering', isRendering, false))) {
                            return T$.Rt(367641, T$.T(367637, false, 23));
                        }
                        T$.Ce(7);
                    }
                    isRendering = T$.W(367649, 'isRendering', T$.T(367645, true, 23), isRendering);
                    T$.M(367773, T$.I(typeof $ !== 'undefined' ? T$.R(367653, '$', $, true) : undefined), 'getJSON', false)(T$.T(367657, '/j/misc/event_random', 21), T$.R(367661, 'curEvent', curEvent, false), T$.T(367769, function (data) {
                        try {
                            T$.Fe(367765, arguments.callee, this);
                            curEvent = T$.W(367669, 'curEvent', T$.T(367665, {}, 11), curEvent);
                            {
                                T$.Cb(23);
                                if (T$.C(19, T$.B(21906, 'in', T$.T(367673, 'type', 21), T$.R(367677, 'data', data, false)))) {
                                    T$.F(367701, T$.R(367681, 'getEventInfo', getEventInfo, false), false)(T$.G(367689, T$.R(367685, 'data', data, false), 'type'), T$.G(367697, T$.R(367693, 'data', data, false), 'id'));
                                    T$.P(367717, T$.R(367705, 'curEvent', curEvent, false), 'id', T$.G(367713, T$.R(367709, 'data', data, false), 'id'));
                                } else {
                                    T$.M(367761, window, 'DoubanAdGet', false)(T$.T(367721, 'dale_homepage_online_activity_promo', 21), T$.T(367757, function (query, parameters) {
                                        try {
                                            T$.Fe(367753, arguments.callee, this);
                                            {
                                                T$.Cb(15);
                                                if (T$.C(11, T$.B(21910, 'in', T$.T(367725, 'url', 21), T$.R(367729, 'parameters', parameters, false)))) {
                                                    T$.F(367741, T$.R(367733, 'renderEventItem', renderEventItem, false), false)(T$.R(367737, 'parameters', parameters, false));
                                                } else {
                                                    isRendering = T$.W(367749, 'isRendering', T$.T(367745, false, 23), isRendering);
                                                }
                                                T$.Ce(15);
                                            }
                                        } catch (T$e) {
                                            console.log(T$e);
                                            console.log(T$e.stack);
                                            throw T$e;
                                        } finally {
                                            T$.Fr(367753);
                                            return T$.Ra();
                                        }
                                    }, 12));
                                }
                                T$.Ce(23);
                            }
                        } catch (T$e) {
                            console.log(T$e);
                            console.log(T$e.stack);
                            throw T$e;
                        } finally {
                            T$.Fr(367765);
                            return T$.Ra();
                        }
                    }, 12));
                } catch (T$e) {
                    console.log(T$e);
                    console.log(T$e.stack);
                    throw T$e;
                } finally {
                    T$.Fr(367777);
                    return T$.Ra();
                }
            }, 12));
            T$.M(367801, T$.M(367797, T$.R(367789, '$events', $events, false), 'find', false)(T$.T(367793, 'h2 a', 21)), 'click', false)();
            function getEventInfo(type, id) {
                try {
                    T$.Fe(367849, arguments.callee, this);
                    T$.M(367845, T$.I(typeof $ !== 'undefined' ? T$.R(367805, '$', $, true) : undefined), 'getJSON', false)(T$.T(367809, '/j/misc/event_info', 21), T$.T(367821, {
                        'type': T$.R(367813, 'type', type, false),
                        'id': T$.R(367817, 'id', id, false)
                    }, 11), T$.T(367841, function (data) {
                        try {
                            T$.Fe(367837, arguments.callee, this);
                            T$.F(367833, T$.R(367825, 'renderEventItem', renderEventItem, false), false)(T$.R(367829, 'data', data, false));
                        } catch (T$e) {
                            console.log(T$e);
                            console.log(T$e.stack);
                            throw T$e;
                        } finally {
                            T$.Fr(367837);
                            return T$.Ra();
                        }
                    }, 12));
                } catch (T$e) {
                    console.log(T$e);
                    console.log(T$e.stack);
                    throw T$e;
                } finally {
                    T$.Fr(367849);
                    return T$.Ra();
                }
            }
            function renderEventItem(data) {
                try {
                    T$.Fe(368049, arguments.callee, this);
                    var template = T$.W(368025, 'template', T$.M(368021, T$.T(368013, [
                            T$.T(367853, '<li>', 21),
                            T$.T(367857, '<div class="pic">', 21),
                            T$.T(367861, '<a href="', 21),
                            T$.G(367869, T$.R(367865, 'data', data, false), 'url'),
                            T$.T(367873, '" target="_blank"><img src="', 21),
                            T$.G(367881, T$.R(367877, 'data', data, false), 'icon'),
                            T$.T(367885, '"/></a>', 21),
                            T$.T(367889, '</div>', 21),
                            T$.T(367893, '<div class="content">', 21),
                            T$.T(367897, '<div class="title">', 21),
                            (_$r = T$.C(27, T$.G(367905, T$.R(367901, 'data', data, false), 'count_url')) ? T$.T(367909, '<span class="title-prefix">\u54c1\u724c</span>', 21) : T$.T(367913, '', 21), T$.Ce(), _$r),
                            T$.T(367917, '<a href="', 21),
                            T$.G(367925, T$.R(367921, 'data', data, false), 'url'),
                            T$.T(367929, '" target="_blank">', 21),
                            T$.G(367937, T$.R(367933, 'data', data, false), 'title'),
                            T$.T(367941, '</a>', 21),
                            T$.T(367945, '</div>', 21),
                            T$.T(367949, '\u65f6\u95f4\uff1a', 21),
                            T$.G(367957, T$.R(367953, 'data', data, false), 'time'),
                            T$.T(367961, '<br/>', 21),
                            T$.T(367965, '\u53c2\u52a0\uff1a', 21),
                            T$.G(367973, T$.R(367969, 'data', data, false), 'comment'),
                            T$.T(367977, '</div>', 21),
                            (_$r = T$.C(31, T$.G(367985, T$.R(367981, 'data', data, false), 'count_url')) ? T$.B(21918, '+', T$.B(21914, '+', T$.T(367989, '<img src="', 21), T$.G(367997, T$.R(367993, 'data', data, false), 'count_url')), T$.T(368001, '" width="0" height="0" />', 21)) : T$.T(368005, '', 21), T$.Ce(), _$r),
                            T$.T(368009, '</li>', 21)
                        ], 10), 'join', false)(T$.T(368017, '', 21)), template);
                    T$.M(368037, T$.R(368029, '$eventList', $eventList, false), 'html', false)(T$.R(368033, 'template', template, false));
                    isRendering = T$.W(368045, 'isRendering', T$.T(368041, false, 23), isRendering);
                } catch (T$e) {
                    console.log(T$e);
                    console.log(T$e.stack);
                    throw T$e;
                } finally {
                    T$.Fr(368049);
                    return T$.Ra();
                }
            }
        } catch (T$e) {
            console.log(T$e);
            console.log(T$e.stack);
            throw T$e;
        } finally {
            T$.Fr(368053);
            return T$.Ra();
        }
    }, 12));
    T$.M(369469, T$.I(typeof Do !== 'undefined' ? T$.R(368081, 'Do', Do, true) : undefined), 'ready', false)(T$.T(369465, function () {
        try {
            T$.Fe(369453, arguments.callee, this);
            T$.N(369461, 'fixed', T$.T(369457, fixed, 12), false);
            {
                T$.Cb(39);
                if (T$.C(35, T$.B(21922, '>', T$.M(368097, T$.F(368093, T$.I(typeof $ !== 'undefined' ? T$.R(368085, '$', $, true) : undefined), false)(T$.T(368089, '.aside', 21)), 'height', false)(), T$.M(368113, T$.F(368109, T$.I(typeof $ !== 'undefined' ? T$.R(368101, '$', $, true) : undefined), false)(T$.T(368105, '.article', 21)), 'height', false)()))) {
                    return T$.Rt(368117, undefined);
                }
                T$.Ce(39);
            }
            function fixed(b, c) {
                try {
                    T$.Fe(369397, arguments.callee, this);
                    var a = T$.W(368137, 'a', T$.M(368133, T$.T(368121, /ipod|iphone|ipad|android|blackberry|webos|windows phone/i, 14), 'test', false)(T$.G(368129, T$.I(typeof navigator !== 'undefined' ? T$.R(368125, 'navigator', navigator, true) : undefined), 'userAgent')), a);
                    {
                        T$.Cb(55);
                        if (T$.C(51, T$.C(47, T$.C(43, T$.G(368149, T$.G(368145, T$.I(typeof $ !== 'undefined' ? T$.R(368141, '$', $, true) : undefined), 'browser'), 'ie')) ? T$.B(21930, '|', T$.G(368161, T$.G(368157, T$.I(typeof $ !== 'undefined' ? T$.R(368153, '$', $, true) : undefined), 'browser'), 'version'), T$.B(21926, '<', T$.T(368165, 0, 22), T$.T(368169, 7, 22))) : T$._()) ? T$._() : T$.R(368173, 'a', a, false))) {
                            return T$.Rt(368177, undefined);
                        }
                        T$.Ce(55);
                    }
                    {
                        T$.Cb(67);
                        if (T$.C(63, T$.C(59, T$.U(21934, '!', T$.R(368181, 'b', b, false))) ? T$._() : T$.B(21938, '==', T$.G(368189, T$.R(368185, 'b', b, false), 'length'), T$.T(368193, 0, 22)))) {
                            return T$.Rt(368197, undefined);
                        }
                        T$.Ce(67);
                    }
                    var e = T$.W(368209, 'e', T$.F(368205, T$.I(typeof $ !== 'undefined' ? T$.R(368201, '$', $, true) : undefined), false)(window), e);
                    var d = T$.W(368217, 'd', T$.T(368213, [], 10), d);
                    return T$.Rt(369393, T$.T(369389, {
                        init: T$.T(368429, function () {
                            try {
                                T$.Fe(368425, arguments.callee, this);
                                var f = T$.W(368241, 'f', T$.P(368237, T$.R(368221, 'this', this, false), 'container', T$.F(368233, T$.I(typeof $ !== 'undefined' ? T$.R(368225, '$', $, true) : undefined), false)(T$.T(368229, '<div class="fixed-fields"></div>', 21))), f);
                                var g = T$.W(368257, 'g', T$.C(71, T$.G(368249, T$.R(368245, 'c', c, false), 'gap')) ? T$._() : T$.T(368253, 10, 22), g);
                                T$.M(368301, T$.R(368261, 'f', f, false), 'css', false)(T$.T(368297, {
                                    position: T$.T(368265, 'fixed', 21),
                                    paddingTop: T$.R(368269, 'g', g, false),
                                    width: T$.M(368289, T$.M(368285, T$.M(368281, T$.R(368273, 'b', b, false), 'eq', false)(T$.T(368277, 0, 22)), 'parent', false)(), 'width', false)(),
                                    top: T$.T(368293, 0, 22)
                                }, 11));
                                T$.M(368329, T$.R(368305, 'f', f, false), 'insertAfter', false)(T$.M(368325, T$.R(368309, 'b', b, false), 'eq', false)(T$.B(21942, '-', T$.G(368317, T$.R(368313, 'b', b, false), 'length'), T$.T(368321, 1, 22))));
                                T$.M(368393, T$.I(typeof $ !== 'undefined' ? T$.R(368333, '$', $, true) : undefined), 'each', false)(T$.R(368337, 'b', b, false), T$.T(368389, function (h) {
                                    try {
                                        T$.Fe(368385, arguments.callee, this);
                                        var j = T$.W(368353, 'j', T$.M(368349, T$.R(368341, 'b', b, false), 'eq', false)(T$.R(368345, 'h', h, false)), j);
                                        T$.M(368381, T$.R(368357, 'j', j, false), 'data', false)(T$.T(368361, 'position-top', 21), T$.B(21946, '-', T$.G(368373, T$.M(368369, T$.R(368365, 'j', j, false), 'position', false)(), 'top'), T$.R(368377, 'g', g, false)));
                                    } catch (T$e) {
                                        console.log(T$e);
                                        console.log(T$e.stack);
                                        throw T$e;
                                    } finally {
                                        T$.Fr(368385);
                                        return T$.Ra();
                                    }
                                }, 12));
                                T$.M(368401, T$.R(368397, 'this', this, false), 'bindResizeEvent', false)();
                                T$.M(368409, T$.R(368405, 'this', this, false), 'bindScrollEvent', false)();
                                T$.M(368421, T$.R(368413, 'e', e, false), 'trigger', false)(T$.T(368417, 'resize', 21));
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(368425);
                                return T$.Ra();
                            }
                        }, 12),
                        currentNodes: T$.T(368433, [], 10),
                        bindScrollEvent: T$.T(368545, function () {
                            try {
                                T$.Fe(368541, arguments.callee, this);
                                var f = T$.W(368441, 'f', T$.R(368437, 'this', this, false), f);
                                T$.M(368537, T$.R(368445, 'e', e, false), 'bind', false)(T$.T(368449, 'scroll', 21), T$.F(368533, T$.T(368529, function () {
                                    try {
                                        T$.Fe(368525, arguments.callee, this);
                                        var g;
                                        return T$.Rt(368521, T$.T(368517, function (h) {
                                            try {
                                                T$.Fe(368513, arguments.callee, this);
                                                T$.C(75, T$.R(368453, 'g', g, false)) ? T$.F(368465, T$.I(typeof clearTimeout !== 'undefined' ? T$.R(368457, 'clearTimeout', clearTimeout, true) : undefined), false)(T$.R(368461, 'g', g, false)) : T$._();
                                                g = T$.W(368509, 'g', T$.F(368505, T$.I(typeof setTimeout !== 'undefined' ? T$.R(368469, 'setTimeout', setTimeout, true) : undefined), false)(T$.T(368497, function () {
                                                    try {
                                                        T$.Fe(368493, arguments.callee, this);
                                                        T$.M(368489, T$.G(368477, T$.R(368473, 'f', f, false), 'handleScroll'), 'call', false)(T$.R(368481, 'f', f, false), T$.R(368485, 'h', h, false));
                                                    } catch (T$e) {
                                                        console.log(T$e);
                                                        console.log(T$e.stack);
                                                        throw T$e;
                                                    } finally {
                                                        T$.Fr(368493);
                                                        return T$.Ra();
                                                    }
                                                }, 12), T$.T(368501, 0, 22)), g);
                                            } catch (T$e) {
                                                console.log(T$e);
                                                console.log(T$e.stack);
                                                throw T$e;
                                            } finally {
                                                T$.Fr(368513);
                                                return T$.Ra();
                                            }
                                        }, 12));
                                    } catch (T$e) {
                                        console.log(T$e);
                                        console.log(T$e.stack);
                                        throw T$e;
                                    } finally {
                                        T$.Fr(368525);
                                        return T$.Ra();
                                    }
                                }, 12), false)());
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(368541);
                                return T$.Ra();
                            }
                        }, 12),
                        bindResizeEvent: T$.T(368657, function () {
                            try {
                                T$.Fe(368653, arguments.callee, this);
                                var f = T$.W(368553, 'f', T$.R(368549, 'this', this, false), f);
                                T$.M(368649, T$.R(368557, 'e', e, false), 'bind', false)(T$.T(368561, 'resize', 21), T$.F(368645, T$.T(368641, function () {
                                    try {
                                        T$.Fe(368637, arguments.callee, this);
                                        var g;
                                        return T$.Rt(368633, T$.T(368629, function (h) {
                                            try {
                                                T$.Fe(368625, arguments.callee, this);
                                                T$.C(79, T$.R(368565, 'g', g, false)) ? T$.F(368577, T$.I(typeof clearTimeout !== 'undefined' ? T$.R(368569, 'clearTimeout', clearTimeout, true) : undefined), false)(T$.R(368573, 'g', g, false)) : T$._();
                                                g = T$.W(368621, 'g', T$.F(368617, T$.I(typeof setTimeout !== 'undefined' ? T$.R(368581, 'setTimeout', setTimeout, true) : undefined), false)(T$.T(368609, function () {
                                                    try {
                                                        T$.Fe(368605, arguments.callee, this);
                                                        T$.M(368601, T$.G(368589, T$.R(368585, 'f', f, false), 'handleResize'), 'call', false)(T$.R(368593, 'f', f, false), T$.R(368597, 'h', h, false));
                                                    } catch (T$e) {
                                                        console.log(T$e);
                                                        console.log(T$e.stack);
                                                        throw T$e;
                                                    } finally {
                                                        T$.Fr(368605);
                                                        return T$.Ra();
                                                    }
                                                }, 12), T$.T(368613, 20, 22)), g);
                                            } catch (T$e) {
                                                console.log(T$e);
                                                console.log(T$e.stack);
                                                throw T$e;
                                            } finally {
                                                T$.Fr(368625);
                                                return T$.Ra();
                                            }
                                        }, 12));
                                    } catch (T$e) {
                                        console.log(T$e);
                                        console.log(T$e.stack);
                                        throw T$e;
                                    } finally {
                                        T$.Fr(368637);
                                        return T$.Ra();
                                    }
                                }, 12), false)());
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(368653);
                                return T$.Ra();
                            }
                        }, 12),
                        backupDynamicIframe: T$.T(368761, function (g) {
                            try {
                                T$.Fe(368757, arguments.callee, this);
                                var f = T$.W(368673, 'f', T$.M(368669, T$.R(368661, 'g', g, false), 'find', false)(T$.T(368665, 'iframe', 21)), f);
                                {
                                    T$.Cb(87);
                                    if (T$.C(83, T$.B(21950, '==', T$.G(368681, T$.R(368677, 'f', f, false), 'length'), T$.T(368685, '', 21)))) {
                                        return T$.Rt(368689, undefined);
                                    }
                                    T$.Ce(87);
                                }
                                var h = T$.W(368705, 'h', T$.M(368701, T$.R(368693, 'f', f, false), 'attr', false)(T$.T(368697, 'src', 21)), h);
                                {
                                    T$.Cb(99);
                                    if (T$.C(95, T$.C(91, T$.U(21954, '!', T$.R(368709, 'h', h, false))) ? T$._() : T$.B(21958, '==', T$.R(368713, 'h', h, false), T$.T(368717, 'javascript:;', 21)))) {
                                        return T$.Rt(368753, T$.B(21962, '+', T$.T(368721, '<!DOCTYPE html><html>', 21), T$.G(368749, T$.G(368745, T$.G(368741, T$.G(368737, T$.G(368733, T$.R(368725, 'f', f, false), T$.T(368729, 0, 22)), 'contentWindow'), 'document'), 'documentElement'), 'innerHTML')));
                                    }
                                    T$.Ce(99);
                                }
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(368757);
                                return T$.Ra();
                            }
                        }, 12),
                        recoverDynamicIframe: T$.T(368837, function (g, f) {
                            try {
                                T$.Fe(368833, arguments.callee, this);
                                {
                                    T$.Cb(107);
                                    if (T$.C(103, T$.U(21966, '!', T$.R(368765, 'f', f, false)))) {
                                        return T$.Rt(368769, undefined);
                                    }
                                    T$.Ce(107);
                                }
                                var h = T$.W(368801, 'h', T$.G(368797, T$.G(368793, T$.G(368789, T$.M(368781, T$.R(368773, 'g', g, false), 'find', false)(T$.T(368777, 'iframe', 21)), T$.T(368785, 0, 22)), 'contentWindow'), 'document'), h);
                                T$.M(368809, T$.R(368805, 'h', h, false), 'open', false)();
                                T$.M(368821, T$.R(368813, 'h', h, false), 'write', false)(T$.R(368817, 'f', f, false));
                                T$.M(368829, T$.R(368825, 'h', h, false), 'close', false)();
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(368833);
                                return T$.Ra();
                            }
                        }, 12),
                        handleScroll: T$.T(369173, function () {
                            try {
                                T$.Fe(369169, arguments.callee, this);
                                var l = T$.W(368845, 'l', T$.R(368841, 'this', this, false), l);
                                var h = T$.W(368857, 'h', T$.M(368853, T$.R(368849, 'e', e, false), 'scrollTop', false)(), h);
                                var k = T$.W(368893, 'k', T$.C(111, T$.G(368869, T$.R(368861, 'd', d, false), T$.T(368865, 0, 22))) ? T$.M(368889, T$.G(368881, T$.R(368873, 'd', d, false), T$.T(368877, 0, 22)), 'data', false)(T$.T(368885, 'position-top', 21)) : T$._(), k);
                                var j;
                                var g = T$.W(368901, 'g', T$.T(368897, 0, 22), g);
                                var f = T$.W(369005, 'f', T$.T(369001, function () {
                                        try {
                                            T$.Fe(368997, arguments.callee, this);
                                            var o = T$.W(368909, 'o', T$.T(368905, 0, 22), o);
                                            var q;
                                            {
                                                T$.Cb(119);
                                                while (T$.C(115, q = T$.W(368933, 'q', T$.G(368929, T$.G(368917, T$.R(368913, 'l', l, false), 'currentNodes'), T$.B(21974, '-', o = T$.W(368925, 'o', T$.B(21970, '+', T$.R(368921, 'o', o, false), 1), o), 1)), q))) {
                                                    var p = T$.W(368949, 'p', T$.M(368945, T$.R(368937, 'l', l, false), 'backupDynamicIframe', false)(T$.R(368941, 'q', q, false)), p);
                                                    T$.M(368965, T$.R(368953, 'q', q, false), 'insertBefore', false)(T$.G(368961, T$.R(368957, 'l', l, false), 'container'));
                                                    T$.M(368981, T$.R(368969, 'l', l, false), 'recoverDynamicIframe', false)(T$.R(368973, 'q', q, false), T$.R(368977, 'p', p, false));
                                                }
                                                T$.Ce(119);
                                            }
                                            T$.P(368993, T$.R(368985, 'l', l, false), 'currentNodes', T$.T(368989, [], 10));
                                        } catch (T$e) {
                                            console.log(T$e);
                                            console.log(T$e.stack);
                                            throw T$e;
                                        } finally {
                                            T$.Fr(368997);
                                            return T$.Ra();
                                        }
                                    }, 12), f);
                                {
                                    T$.Cb(151);
                                    if (T$.C(147, T$.C(123, T$.B(21978, '==', T$.G(369013, T$.R(369009, 'd', d, false), 'length'), T$.T(369017, 0, 22))) ? T$._() : T$.B(21982, '<', T$.R(369021, 'h', h, false), T$.R(369025, 'k', k, false)))) {
                                        T$.P(369037, T$.R(369029, 'l', l, false), 'statFixed', T$.T(369033, false, 23));
                                        T$.F(369045, T$.R(369041, 'f', f, false), false)();
                                    } else {
                                        {
                                            T$.Cb(143);
                                            if (T$.C(139, T$.C(127, T$.B(21986, '>=', T$.R(369049, 'h', h, false), T$.R(369053, 'k', k, false))) ? T$.U(21990, '!', T$.G(369061, T$.R(369057, 'l', l, false), 'statFixed')) : T$._())) {
                                                T$.P(369073, T$.R(369065, 'l', l, false), 'statFixed', T$.T(369069, true, 23));
                                                T$.F(369081, T$.R(369077, 'f', f, false), false)();
                                                {
                                                    T$.Cb(135);
                                                    while (T$.C(131, j = T$.W(369101, 'j', T$.G(369097, T$.R(369085, 'd', d, false), T$.B(21998, '-', g = T$.W(369093, 'g', T$.B(21994, '+', T$.R(369089, 'g', g, false), 1), g), 1)), j))) {
                                                        T$.M(369117, T$.G(369109, T$.R(369105, 'l', l, false), 'currentNodes'), 'push', false)(T$.R(369113, 'j', j, false));
                                                        var m = T$.W(369133, 'm', T$.M(369129, T$.R(369121, 'l', l, false), 'backupDynamicIframe', false)(T$.R(369125, 'j', j, false)), m);
                                                        T$.M(369149, T$.G(369141, T$.R(369137, 'l', l, false), 'container'), 'append', false)(T$.R(369145, 'j', j, false));
                                                        T$.M(369165, T$.R(369153, 'l', l, false), 'recoverDynamicIframe', false)(T$.R(369157, 'j', j, false), T$.R(369161, 'm', m, false));
                                                    }
                                                    T$.Ce(135);
                                                }
                                            }
                                            T$.Ce(143);
                                        }
                                    }
                                    T$.Ce(151);
                                }
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(369169);
                                return T$.Ra();
                            }
                        }, 12),
                        handleResize: T$.T(369385, function () {
                            try {
                                T$.Fe(369381, arguments.callee, this);
                                var f = T$.W(369197, 'f', T$.C(155, T$.B(22002, '-', T$.M(369181, T$.R(369177, 'e', e, false), 'height', false)(), T$.G(369189, T$.R(369185, 'c', c, false), 'extraHeight'))) ? T$._() : T$.T(369193, 0, 22), f);
                                d = T$.W(369357, 'd', T$.F(369353, T$.T(369349, function () {
                                    try {
                                        T$.Fe(369345, arguments.callee, this);
                                        var j = T$.W(369205, 'j', T$.T(369201, [], 10), j);
                                        var g = T$.W(369213, 'g', T$.T(369209, 0, 22), g);
                                        var h = T$.W(369229, 'h', T$.B(22006, '-', T$.G(369221, T$.R(369217, 'b', b, false), 'length'), T$.T(369225, 1, 22)), h);
                                        {
                                            T$.Cb(171);
                                            for (; T$.C(167, T$.B(22010, '>=', T$.R(369233, 'h', h, false), T$.T(369237, 0, 22))); T$.B(22018, '+', h = T$.W(369245, 'h', T$.B(22014, '-', T$.R(369241, 'h', h, false), 1), h), 1)) {
                                                g = T$.W(369301, 'g', T$.B(22026, '+', T$.R(369297, 'g', g, false), T$.B(22022, '+', T$.M(369261, T$.M(369257, T$.R(369249, 'b', b, false), 'eq', false)(T$.R(369253, 'h', h, false)), 'height', false)(), T$.F(369293, T$.I(typeof parseInt !== 'undefined' ? T$.R(369265, 'parseInt', parseInt, true) : undefined), false)(T$.M(369285, T$.M(369277, T$.R(369269, 'b', b, false), 'eq', false)(T$.R(369273, 'h', h, false)), 'css', false)(T$.T(369281, 'margin-bottom', 21)), T$.T(369289, 10, 22)))), g);
                                                {
                                                    T$.Cb(163);
                                                    if (T$.C(159, T$.B(22030, '<=', T$.R(369305, 'g', g, false), T$.R(369309, 'f', f, false)))) {
                                                        T$.M(369329, T$.R(369313, 'j', j, false), 'push', false)(T$.M(369325, T$.R(369317, 'b', b, false), 'eq', false)(T$.R(369321, 'h', h, false)));
                                                    }
                                                    T$.Ce(163);
                                                }
                                            }
                                            T$.Ce(171);
                                        }
                                        return T$.Rt(369341, T$.M(369337, T$.R(369333, 'j', j, false), 'reverse', false)());
                                    } catch (T$e) {
                                        console.log(T$e);
                                        console.log(T$e.stack);
                                        throw T$e;
                                    } finally {
                                        T$.Fr(369345);
                                        return T$.Ra();
                                    }
                                }, 12), false)(), d);
                                T$.P(369369, T$.R(369361, 'this', this, false), 'statFixed', T$.T(369365, false, 23));
                                T$.M(369377, T$.R(369373, 'this', this, false), 'handleScroll', false)();
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(369381);
                                return T$.Ra();
                            }
                        }, 12)
                    }, 11));
                } catch (T$e) {
                    console.log(T$e);
                    console.log(T$e.stack);
                    throw T$e;
                } finally {
                    T$.Fr(369397);
                    return T$.Ra();
                }
            }
            ;
            T$.F(369449, T$.I(typeof setTimeout !== 'undefined' ? T$.R(369401, 'setTimeout', setTimeout, true) : undefined), false)(T$.T(369441, function () {
                try {
                    T$.Fe(369437, arguments.callee, this);
                    T$.M(369433, T$.F(369429, T$.R(369405, 'fixed', fixed, false), false)(T$.F(369417, T$.I(typeof $ !== 'undefined' ? T$.R(369409, '$', $, true) : undefined), false)(T$.T(369413, '.aside > div', 21)), T$.T(369425, { extraHeight: T$.T(369421, 80, 22) }, 11)), 'init', false)();
                } catch (T$e) {
                    console.log(T$e);
                    console.log(T$e.stack);
                    throw T$e;
                } finally {
                    T$.Fr(369437);
                    return T$.Ra();
                }
            }, 12), T$.T(369445, 800, 22));
        } catch (T$e) {
            console.log(T$e);
            console.log(T$e.stack);
            throw T$e;
        } finally {
            T$.Fr(369453);
            return T$.Ra();
        }
    }, 12));
    T$.F(371065, T$.I(typeof Do !== 'undefined' ? T$.R(369473, 'Do', Do, true) : undefined), false)(T$.T(369477, 'http://img3.douban.com/f/shire/dbb9175fd0556e1e4772153012e7e6ea99c2696f/js/lib/hotkeys.js', 21), T$.T(371061, function () {
        try {
            T$.Fe(371057, arguments.callee, this);
            T$.F(371053, T$.I(typeof $ !== 'undefined' ? T$.R(369481, '$', $, true) : undefined), false)(T$.T(371049, function () {
                try {
                    T$.Fe(371045, arguments.callee, this);
                    var h = T$.W(370053, 'h', T$.U(22034, '-', T$.T(369485, 1, 22)), h), a = T$.W(370057, 'a', T$.T(369489, 0, 22), a), f = T$.W(370061, 'f', T$.F(369501, T$.I(typeof $ !== 'undefined' ? T$.R(369493, '$', $, true) : undefined), false)(T$.T(369497, '#statuses', 21)), f), i = T$.W(370065, 'i', T$.F(369509, T$.I(typeof $ !== 'undefined' ? T$.R(369505, '$', $, true) : undefined), false)(document), i), b = T$.W(370069, 'b', T$.F(369517, T$.I(typeof $ !== 'undefined' ? T$.R(369513, '$', $, true) : undefined), false)(window), b), j, l = T$.W(370073, 'l', T$.M(369529, T$.R(369521, 'f', f, false), 'find', false)(T$.T(369525, '.status-item', 21)), l), e = T$.W(370077, 'e', T$.T(369577, function (m) {
                            try {
                                T$.Fe(369573, arguments.callee, this);
                                T$.M(369549, T$.M(369541, T$.R(369533, 'f', f, false), 'find', false)(T$.T(369537, '.status-current', 21)), 'removeClass', false)(T$.T(369545, 'status-current', 21));
                                T$.M(369569, T$.M(369561, T$.R(369553, 'l', l, false), 'eq', false)(T$.R(369557, 'm', m, false)), 'addClass', false)(T$.T(369565, 'status-current', 21));
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(369573);
                                return T$.Ra();
                            }
                        }, 12), e), k = T$.W(370081, 'k', T$.T(369657, function () {
                            try {
                                T$.Fe(369653, arguments.callee, this);
                                var o = T$.W(369609, 'o', T$.M(369593, T$.F(369589, T$.I(typeof $ !== 'undefined' ? T$.R(369581, '$', $, true) : undefined), false)(T$.T(369585, '.thispage', 21)), 'next', false)(), o), m = T$.W(369613, 'm', T$.B(22038, '|', T$.M(369601, T$.R(369597, 'o', o, false), 'text', false)(), T$.R(369605, 'o', o, false)), m);
                                {
                                    T$.Cb(179);
                                    if (T$.C(175, T$.R(369617, 'm', m, false))) {
                                        T$.P(369649, T$.G(369625, T$.I(typeof self !== 'undefined' ? T$.R(369621, 'self', self, true) : undefined), 'location'), 'href', T$.B(22046, '+', T$.B(22042, '+', T$.G(369637, T$.G(369633, T$.I(typeof self !== 'undefined' ? T$.R(369629, 'self', self, true) : undefined), 'location'), 'pathname'), T$.T(369641, '?p=', 21)), T$.R(369645, 'm', m, false)));
                                    }
                                    T$.Ce(179);
                                }
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(369653);
                                return T$.Ra();
                            }
                        }, 12), k), g = T$.W(370085, 'g', T$.T(369737, function () {
                            try {
                                T$.Fe(369733, arguments.callee, this);
                                var o = T$.W(369689, 'o', T$.M(369673, T$.F(369669, T$.I(typeof $ !== 'undefined' ? T$.R(369661, '$', $, true) : undefined), false)(T$.T(369665, '.thispage', 21)), 'prev', false)(), o), m = T$.W(369693, 'm', T$.B(22050, '|', T$.M(369681, T$.R(369677, 'o', o, false), 'text', false)(), T$.R(369685, 'o', o, false)), m);
                                {
                                    T$.Cb(187);
                                    if (T$.C(183, T$.R(369697, 'm', m, false))) {
                                        T$.P(369729, T$.G(369705, T$.I(typeof self !== 'undefined' ? T$.R(369701, 'self', self, true) : undefined), 'location'), 'href', T$.B(22058, '+', T$.B(22054, '+', T$.G(369717, T$.G(369713, T$.I(typeof self !== 'undefined' ? T$.R(369709, 'self', self, true) : undefined), 'location'), 'pathname'), T$.T(369721, '?p=', 21)), T$.R(369725, 'm', m, false)));
                                    }
                                    T$.Ce(187);
                                }
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(369733);
                                return T$.Ra();
                            }
                        }, 12), g), d = T$.W(370089, 'd', T$.T(369881, function () {
                            try {
                                T$.Fe(369877, arguments.callee, this);
                                {
                                    T$.Cb(195);
                                    if (T$.C(191, T$.R(369741, 'j', j, false))) {
                                        T$.M(369749, window, 'clearTimeout', false)(T$.R(369745, 'j', j, false));
                                    }
                                    T$.Ce(195);
                                }
                                var n, m;
                                {
                                    T$.Cb(203);
                                    if (T$.C(199, T$.B(22066, '>=', T$.B(22062, '+', T$.R(369753, 'h', h, false), T$.T(369757, 1, 22)), T$.G(369765, T$.R(369761, 'l', l, false), 'length')))) {
                                        T$.F(369773, T$.R(369769, 'k', k, false), false)();
                                        return T$.Rt(369777, undefined);
                                    }
                                    T$.Ce(203);
                                }
                                T$.B(22074, '-', h = T$.W(369785, 'h', T$.B(22070, '+', T$.R(369781, 'h', h, false), 1), h), 1);
                                m = T$.W(369801, 'm', T$.M(369797, T$.R(369789, 'l', l, false), 'eq', false)(T$.R(369793, 'h', h, false)), m);
                                n = T$.W(369817, 'n', T$.G(369813, T$.M(369809, T$.R(369805, 'm', m, false), 'offset', false)(), 'top'), n);
                                {
                                    T$.Cb(211);
                                    if (T$.C(207, T$.B(22078, '===', T$.M(369829, T$.R(369821, 'm', m, false), 'css', false)(T$.T(369825, 'display', 21)), T$.T(369833, 'none', 21)))) {
                                        T$.F(369841, T$.R(369837, 'd', d, false), false)();
                                        return T$.Rt(369845, undefined);
                                    }
                                    T$.Ce(211);
                                }
                                T$.F(369857, T$.R(369849, 'e', e, false), false)(T$.R(369853, 'h', h, false));
                                T$.M(369873, window, 'scrollTo', false)(T$.T(369861, 0, 22), T$.B(22082, '-', T$.R(369865, 'n', n, false), T$.T(369869, 20, 22)));
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(369877);
                                return T$.Ra();
                            }
                        }, 12), d), c = T$.W(370093, 'c', T$.T(370049, function () {
                            try {
                                T$.Fe(370045, arguments.callee, this);
                                {
                                    T$.Cb(219);
                                    if (T$.C(215, T$.R(369885, 'j', j, false))) {
                                        T$.M(369893, window, 'clearTimeout', false)(T$.R(369889, 'j', j, false));
                                    }
                                    T$.Ce(219);
                                }
                                var m = T$.W(369941, 'm', T$.M(369925, T$.R(369897, 'l', l, false), 'eq', false)((_$r = T$.C(223, T$.B(22090, '<', T$.B(22086, '-', T$.R(369901, 'h', h, false), T$.T(369905, 1, 22)), T$.T(369909, 0, 22))) ? T$.T(369913, 0, 22) : T$.B(22094, '-', T$.R(369917, 'h', h, false), T$.T(369921, 1, 22)), T$.Ce(), _$r)), m), n = T$.W(369945, 'n', T$.G(369937, T$.M(369933, T$.R(369929, 'm', m, false), 'offset', false)(), 'top'), n);
                                {
                                    T$.Cb(231);
                                    if (T$.C(227, T$.B(22102, '<', T$.B(22098, '-', T$.R(369949, 'h', h, false), T$.T(369953, 1, 22)), T$.T(369957, 0, 22)))) {
                                        h = T$.W(369965, 'h', T$.T(369961, 0, 22), h);
                                        T$.F(369973, T$.R(369969, 'g', g, false), false)();
                                        return T$.Rt(369977, undefined);
                                    }
                                    T$.Ce(231);
                                }
                                T$.B(22110, '+', h = T$.W(369985, 'h', T$.B(22106, '-', T$.R(369981, 'h', h, false), 1), h), 1);
                                {
                                    T$.Cb(239);
                                    if (T$.C(235, T$.B(22114, '===', T$.M(369997, T$.R(369989, 'm', m, false), 'css', false)(T$.T(369993, 'display', 21)), T$.T(370001, 'none', 21)))) {
                                        T$.F(370009, T$.R(370005, 'c', c, false), false)();
                                        return T$.Rt(370013, undefined);
                                    }
                                    T$.Ce(239);
                                }
                                T$.F(370025, T$.R(370017, 'e', e, false), false)(T$.R(370021, 'h', h, false));
                                T$.M(370041, window, 'scrollTo', false)(T$.T(370029, 0, 22), T$.B(22118, '-', T$.R(370033, 'n', n, false), T$.T(370037, 20, 22)));
                            } catch (T$e) {
                                console.log(T$e);
                                console.log(T$e.stack);
                                throw T$e;
                            } finally {
                                T$.Fr(370045);
                                return T$.Ra();
                            }
                        }, 12), c);
                    {
                        T$.Cb(279);
                        if (T$.C(275, T$.G(370101, T$.R(370097, 'l', l, false), 'length'))) {
                            T$.M(370273, T$.R(370105, 'b', b, false), 'bind', false)(T$.T(370109, 'scroll', 21), T$.T(370269, function (m) {
                                try {
                                    T$.Fe(370265, arguments.callee, this);
                                    {
                                        T$.Cb(247);
                                        if (T$.C(243, T$.R(370113, 'j', j, false))) {
                                            T$.M(370121, window, 'clearTimeout', false)(T$.R(370117, 'j', j, false));
                                        }
                                        T$.Ce(247);
                                    }
                                    j = T$.W(370261, 'j', T$.M(370257, window, 'setTimeout', false)(T$.T(370249, function () {
                                        try {
                                            T$.Fe(370245, arguments.callee, this);
                                            var p = T$.W(370133, 'p', T$.M(370129, T$.R(370125, 'i', i, false), 'scrollTop', false)(), p), o, n;
                                            {
                                                T$.Cb(255);
                                                if (T$.C(251, T$.B(22126, '<', T$.R(370137, 'p', p, false), T$.B(22122, '-', T$.G(370157, T$.M(370153, T$.M(370149, T$.R(370141, 'l', l, false), 'eq', false)(T$.T(370145, 0, 22)), 'offset', false)(), 'top'), T$.T(370161, 20, 22))))) {
                                                    h = T$.W(370169, 'h', T$.T(370165, 0, 22), h);
                                                    return T$.Rt(370173, undefined);
                                                }
                                                T$.Ce(255);
                                            }
                                            {
                                                T$.Cb(271);
                                                for (o = T$.W(370181, 'o', T$.T(370177, 0, 22), o), n = T$.W(370193, 'n', T$.G(370189, T$.R(370185, 'l', l, false), 'length'), n); T$.C(267, T$.B(22130, '<', T$.R(370197, 'o', o, false), T$.R(370201, 'n', n, false))); T$.B(22138, '-', o = T$.W(370209, 'o', T$.B(22134, '+', T$.R(370205, 'o', o, false), 1), o), 1)) {
                                                    {
                                                        T$.Cb(263);
                                                        if (T$.C(259, T$.B(22142, '>', T$.G(370229, T$.M(370225, T$.M(370221, T$.R(370213, 'l', l, false), 'eq', false)(T$.R(370217, 'o', o, false)), 'pos', false)(), 'y'), T$.R(370233, 'p', p, false)))) {
                                                            h = T$.W(370241, 'h', T$.R(370237, 'o', o, false), h);
                                                            break;
                                                        }
                                                        T$.Ce(263);
                                                    }
                                                }
                                                T$.Ce(271);
                                            }
                                        } catch (T$e) {
                                            console.log(T$e);
                                            console.log(T$e.stack);
                                            throw T$e;
                                        } finally {
                                            T$.Fr(370245);
                                            return T$.Ra();
                                        }
                                    }, 12), T$.T(370253, 100, 22)), j);
                                } catch (T$e) {
                                    console.log(T$e);
                                    console.log(T$e.stack);
                                    throw T$e;
                                } finally {
                                    T$.Fr(370265);
                                    return T$.Ra();
                                }
                            }, 12));
                        }
                        T$.Ce(279);
                    }
                    T$.M(371041, T$.I(typeof $ !== 'undefined' ? T$.R(370277, '$', $, true) : undefined), 'hotKeys', false)(T$.T(371037, [
                        T$.T(370361, {
                            keys: T$.T(370285, [T$.T(370281, 191, 22)], 10),
                            handler: T$.T(370357, function () {
                                try {
                                    T$.Fe(370353, arguments.callee, this);
                                    var m = T$.W(370301, 'm', T$.F(370297, T$.I(typeof $ !== 'undefined' ? T$.R(370289, '$', $, true) : undefined), false)(T$.T(370293, 'input[name=search_text]', 21)), m);
                                    {
                                        T$.Cb(287);
                                        if (T$.C(283, T$.G(370309, T$.R(370305, 'm', m, false), 'length'))) {
                                            T$.M(370317, T$.R(370313, 'm', m, false), 'focus', false)();
                                            T$.F(370349, T$.I(typeof setTimeout !== 'undefined' ? T$.R(370321, 'setTimeout', setTimeout, true) : undefined), false)(T$.T(370341, function () {
                                                try {
                                                    T$.Fe(370337, arguments.callee, this);
                                                    T$.M(370333, T$.R(370325, 'm', m, false), 'val', false)(T$.T(370329, '', 21));
                                                } catch (T$e) {
                                                    console.log(T$e);
                                                    console.log(T$e.stack);
                                                    throw T$e;
                                                } finally {
                                                    T$.Fr(370337);
                                                    return T$.Ra();
                                                }
                                            }, 12), T$.T(370345, 10, 22));
                                        }
                                        T$.Ce(287);
                                    }
                                } catch (T$e) {
                                    console.log(T$e);
                                    console.log(T$e.stack);
                                    throw T$e;
                                } finally {
                                    T$.Fr(370353);
                                    return T$.Ra();
                                }
                            }, 12)
                        }, 11),
                        T$.T(370377, {
                            keys: T$.T(370369, [T$.T(370365, 'j', 21)], 10),
                            handler: T$.R(370373, 'd', d, false)
                        }, 11),
                        T$.T(370493, {
                            keys: T$.T(370385, [T$.T(370381, 73, 22)], 10),
                            handler: T$.T(370489, function () {
                                try {
                                    T$.Fe(370485, arguments.callee, this);
                                    var m, n = T$.W(370401, 'n', T$.M(370397, T$.R(370389, 'f', f, false), 'find', false)(T$.T(370393, '.status-current', 21)), n);
                                    {
                                        T$.Cb(295);
                                        if (T$.C(291, T$.B(22146, '===', T$.G(370409, T$.R(370405, 'n', n, false), 'length'), T$.T(370413, 0, 22)))) {
                                            return T$.Rt(370417, undefined);
                                        }
                                        T$.Ce(295);
                                    }
                                    m = T$.W(370433, 'm', T$.M(370429, T$.R(370421, 'n', n, false), 'find', false)(T$.T(370425, '.comment-text', 21)), m);
                                    {
                                        T$.Cb(303);
                                        if (T$.C(299, T$.B(22150, '>', T$.G(370441, T$.R(370437, 'm', m, false), 'length'), T$.T(370445, 0, 22)))) {
                                            T$.F(370481, T$.I(typeof setTimeout !== 'undefined' ? T$.R(370449, 'setTimeout', setTimeout, true) : undefined), false)(T$.T(370473, function () {
                                                try {
                                                    T$.Fe(370469, arguments.callee, this);
                                                    T$.M(370465, T$.G(370461, T$.R(370453, 'm', m, false), T$.T(370457, 0, 22)), 'focus', false)();
                                                } catch (T$e) {
                                                    console.log(T$e);
                                                    console.log(T$e.stack);
                                                    throw T$e;
                                                } finally {
                                                    T$.Fr(370469);
                                                    return T$.Ra();
                                                }
                                            }, 12), T$.T(370477, 20, 22));
                                        }
                                        T$.Ce(303);
                                    }
                                } catch (T$e) {
                                    console.log(T$e);
                                    console.log(T$e.stack);
                                    throw T$e;
                                } finally {
                                    T$.Fr(370485);
                                    return T$.Ra();
                                }
                            }, 12)
                        }, 11),
                        T$.T(370581, {
                            keys: T$.T(370501, [T$.T(370497, 65, 22)], 10),
                            handler: T$.T(370577, function () {
                                try {
                                    T$.Fe(370573, arguments.callee, this);
                                    var m, n = T$.W(370517, 'n', T$.M(370513, T$.R(370505, 'f', f, false), 'find', false)(T$.T(370509, '.status-current', 21)), n);
                                    {
                                        T$.Cb(311);
                                        if (T$.C(307, T$.B(22154, '===', T$.G(370525, T$.R(370521, 'n', n, false), 'length'), T$.T(370529, 0, 22)))) {
                                            return T$.Rt(370533, undefined);
                                        }
                                        T$.Ce(311);
                                    }
                                    m = T$.W(370549, 'm', T$.M(370545, T$.R(370537, 'n', n, false), 'find', false)(T$.T(370541, '.btn-key-like', 21)), m);
                                    {
                                        T$.Cb(319);
                                        if (T$.C(315, T$.B(22158, '>', T$.G(370557, T$.R(370553, 'm', m, false), 'length'), T$.T(370561, 0, 22)))) {
                                            T$.M(370569, T$.R(370565, 'm', m, false), 'click', false)();
                                        }
                                        T$.Ce(319);
                                    }
                                } catch (T$e) {
                                    console.log(T$e);
                                    console.log(T$e.stack);
                                    throw T$e;
                                } finally {
                                    T$.Fr(370573);
                                    return T$.Ra();
                                }
                            }, 12)
                        }, 11),
                        T$.T(370669, {
                            keys: T$.T(370589, [T$.T(370585, 84, 22)], 10),
                            handler: T$.T(370665, function () {
                                try {
                                    T$.Fe(370661, arguments.callee, this);
                                    var m, n = T$.W(370605, 'n', T$.M(370601, T$.R(370593, 'f', f, false), 'find', false)(T$.T(370597, '.status-current', 21)), n);
                                    {
                                        T$.Cb(327);
                                        if (T$.C(323, T$.B(22162, '===', T$.G(370613, T$.R(370609, 'n', n, false), 'length'), T$.T(370617, 0, 22)))) {
                                            return T$.Rt(370621, undefined);
                                        }
                                        T$.Ce(327);
                                    }
                                    m = T$.W(370637, 'm', T$.M(370633, T$.R(370625, 'n', n, false), 'find', false)(T$.T(370629, '.btn-key-reshare', 21)), m);
                                    {
                                        T$.Cb(335);
                                        if (T$.C(331, T$.B(22166, '>', T$.G(370645, T$.R(370641, 'm', m, false), 'length'), T$.T(370649, 0, 22)))) {
                                            T$.M(370657, T$.R(370653, 'm', m, false), 'click', false)();
                                        }
                                        T$.Ce(335);
                                    }
                                } catch (T$e) {
                                    console.log(T$e);
                                    console.log(T$e.stack);
                                    throw T$e;
                                } finally {
                                    T$.Fr(370661);
                                    return T$.Ra();
                                }
                            }, 12)
                        }, 11),
                        T$.T(370705, {
                            keys: T$.T(370681, [
                                T$.T(370673, 71, 22),
                                T$.T(370677, 71, 22)
                            ], 10),
                            handler: T$.T(370701, function () {
                                try {
                                    T$.Fe(370697, arguments.callee, this);
                                    T$.M(370693, window, 'scrollTo', false)(T$.T(370685, 0, 22), T$.T(370689, 0, 22));
                                } catch (T$e) {
                                    console.log(T$e);
                                    console.log(T$e.stack);
                                    throw T$e;
                                } finally {
                                    T$.Fr(370697);
                                    return T$.Ra();
                                }
                            }, 12)
                        }, 11),
                        T$.T(370797, {
                            keys: T$.T(370713, [T$.T(370709, 82, 22)], 10),
                            handler: T$.T(370793, function (o) {
                                try {
                                    T$.Fe(370789, arguments.callee, this);
                                    var m, n = T$.W(370729, 'n', T$.M(370725, T$.R(370717, 'f', f, false), 'find', false)(T$.T(370721, '.status-current', 21)), n);
                                    {
                                        T$.Cb(343);
                                        if (T$.C(339, T$.B(22170, '===', T$.G(370737, T$.R(370733, 'n', n, false), 'length'), T$.T(370741, 0, 22)))) {
                                            return T$.Rt(370745, undefined);
                                        }
                                        T$.Ce(343);
                                    }
                                    m = T$.W(370761, 'm', T$.M(370757, T$.R(370749, 'n', n, false), 'find', false)(T$.T(370753, '.btn-action-reply', 21)), m);
                                    {
                                        T$.Cb(351);
                                        if (T$.C(347, T$.G(370769, T$.R(370765, 'm', m, false), 'length'))) {
                                            T$.M(370785, T$.M(370781, T$.R(370773, 'm', m, false), 'eq', false)(T$.T(370777, 0, 22)), 'click', false)();
                                        }
                                        T$.Ce(351);
                                    }
                                } catch (T$e) {
                                    console.log(T$e);
                                    console.log(T$e.stack);
                                    throw T$e;
                                } finally {
                                    T$.Fr(370789);
                                    return T$.Ra();
                                }
                            }, 12)
                        }, 11),
                        T$.T(370881, {
                            keys: T$.T(370805, [T$.T(370801, 78, 22)], 10),
                            handler: T$.T(370877, function (m) {
                                try {
                                    T$.Fe(370873, arguments.callee, this);
                                    T$.M(370817, window, 'scrollTo', false)(T$.T(370809, 0, 22), T$.T(370813, 0, 22));
                                    T$.F(370869, T$.I(typeof setTimeout !== 'undefined' ? T$.R(370821, 'setTimeout', setTimeout, true) : undefined), false)(T$.T(370861, function () {
                                        try {
                                            T$.Fe(370857, arguments.callee, this);
                                            {
                                                T$.Cb(359);
                                                if (T$.C(355, T$.G(370829, T$.I(typeof Do !== 'undefined' ? T$.R(370825, 'Do', Do, true) : undefined), '_init_isay'))) {
                                                    T$.M(370837, T$.I(typeof Do !== 'undefined' ? T$.R(370833, 'Do', Do, true) : undefined), '_init_isay', false)();
                                                } else {
                                                    T$.M(370853, T$.F(370849, T$.I(typeof $ !== 'undefined' ? T$.R(370841, '$', $, true) : undefined), false)(T$.T(370845, '#isay-cont', 21)), 'focus', false)();
                                                }
                                                T$.Ce(359);
                                            }
                                        } catch (T$e) {
                                            console.log(T$e);
                                            console.log(T$e.stack);
                                            throw T$e;
                                        } finally {
                                            T$.Fr(370857);
                                            return T$.Ra();
                                        }
                                    }, 12), T$.T(370865, 10, 22));
                                } catch (T$e) {
                                    console.log(T$e);
                                    console.log(T$e.stack);
                                    throw T$e;
                                } finally {
                                    T$.Fr(370873);
                                    return T$.Ra();
                                }
                            }, 12)
                        }, 11),
                        T$.T(370929, {
                            keys: T$.T(370889, [T$.T(370885, 71, 22)], 10),
                            shift: T$.T(370893, true, 23),
                            handler: T$.T(370925, function () {
                                try {
                                    T$.Fe(370921, arguments.callee, this);
                                    T$.M(370917, window, 'scrollTo', false)(T$.T(370897, 0, 22), T$.M(370913, T$.F(370909, T$.I(typeof $ !== 'undefined' ? T$.R(370901, '$', $, true) : undefined), false)(T$.T(370905, 'body', 21)), 'innerHeight', false)());
                                } catch (T$e) {
                                    console.log(T$e);
                                    console.log(T$e.stack);
                                    throw T$e;
                                } finally {
                                    T$.Fr(370921);
                                    return T$.Ra();
                                }
                            }, 12)
                        }, 11),
                        T$.T(370945, {
                            keys: T$.T(370937, [T$.T(370933, 'k', 21)], 10),
                            handler: T$.R(370941, 'c', c, false)
                        }, 11),
                        T$.T(370965, {
                            keys: T$.T(370953, [T$.T(370949, '}', 21)], 10),
                            shift: T$.T(370957, 1, 22),
                            handler: T$.R(370961, 'k', k, false)
                        }, 11),
                        T$.T(370985, {
                            keys: T$.T(370973, [T$.T(370969, '{', 21)], 10),
                            shift: T$.T(370977, 1, 22),
                            handler: T$.R(370981, 'g', g, false)
                        }, 11),
                        T$.T(371033, {
                            keys: T$.T(370997, [
                                T$.T(370989, 80, 22),
                                T$.T(370993, 49, 22)
                            ], 10),
                            handler: T$.T(371029, function () {
                                try {
                                    T$.Fe(371025, arguments.callee, this);
                                    T$.P(371021, T$.G(371005, T$.I(typeof self !== 'undefined' ? T$.R(371001, 'self', self, true) : undefined), 'location'), 'href', T$.G(371017, T$.G(371013, T$.I(typeof self !== 'undefined' ? T$.R(371009, 'self', self, true) : undefined), 'location'), 'pathname'));
                                } catch (T$e) {
                                    console.log(T$e);
                                    console.log(T$e.stack);
                                    throw T$e;
                                } finally {
                                    T$.Fr(371025);
                                    return T$.Ra();
                                }
                            }, 12)
                        }, 11)
                    ], 10));
                } catch (T$e) {
                    console.log(T$e);
                    console.log(T$e.stack);
                    throw T$e;
                } finally {
                    T$.Fr(371045);
                    return T$.Ra();
                }
            }, 12));
        } catch (T$e) {
            console.log(T$e);
            console.log(T$e.stack);
            throw T$e;
        } finally {
            T$.Fr(371057);
            return T$.Ra();
        }
    }, 12));
} catch (T$e) {
    console.log(T$e);
    console.log(T$e.stack);
    throw T$e;
} finally {
    T$.Sr(371069);
}
//DO NOT INSTRUMENT
