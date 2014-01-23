(function(a) {
    a.qkit = {};
    a.extend((a.qClass = {}), {
        inherits: function(c, b) {
            function d() {}
            d.prototype = b.prototype;
            c.superClass_ = b.prototype;
            c.prototype = new d();
            c.prototype.constructor = c;
        },
        base: function(f, b, h) {
            var d = arguments.callee.caller;
            if (d.superClass_) {
                return d.superClass_.constructor.apply(f, Array.prototype.slice.call(arguments, 1));
            }
            var c = Array.prototype.slice.call(arguments, 2);
            var g = false;
            for (var e = f.constructor; e; e = e.superClass_ && e.superClass_.constructor) {
                if (e.prototype[b] === d) {
                    g = true;
                } else {
                    if (g) {
                        return e.prototype[b].apply(f, c);
                    }
                }
            }
            if (f[b] === d) {
                return f.constructor.prototype[b].apply(f, c);
            } else {
                throw Error("lib.base called from a method of one name to a method of a different name");
            }
        }
    });
})(jQuery);
(function(b) {
    var a = function() {
        throw new Error("qWidget is only a abstract class!" + this.moduleName || "");
    };
    b.qWidget = a;
    b.extend(b.qWidget.prototype, {
        init: function() {
            this.initData();
        },
        initData: function() {
            var c = this;
            b.getJSON(this.getUrl(),
            function(d) {
                c.rawModelData = d;
                if (c.isSuccessStatus(d)) {
                    c.success(d.data);
                }
            });
        },
        getUrl: function() {
            return this.url.indexOf("?") > -1 ? (this.url + "&callback=?") : (this.url + "callback=?");
        },
        isSuccessStatus: function(c) {
            return c.ret == 1;
        },
        success: function(g, j, f) {
            try {
                var i = this.format(g);
                var c = QTMPL[this.moduleName].render(i);
                this.render(c);
                this.setupBoxView();
                this.bindEvent();
            } catch(h) {
                console.log(h);
            }
        },
        render: function(c) {
            this.$container.html(c);
            this.$container.show();
        },
        setupBoxView: a,
        bindEvent: a,
        formate: a
    });
})(jQuery);
(function(c) {
    c.tabs = {};
    var b = c(document.body);
    function d(f) {
        var e = {};
        c("[data-tab]", f).each(function() {
            var g = c(this);
            var h = g.data("tab");
            if (!e[h]) {
                a(f, h, g.data("tab-id"), g.data("tab-active"));
                e[h] = true;
            }
        });
    }
    function a(h, i, e, j) {
        if (!i || !e) {
            return;
        }
        var l = j || "active";
        var m = h.find("[data-tab='" + i + "'][data-tab-id='" + e + "']");
        var k = h.find("[data-panel='" + i + "'][data-panel-id='" + e + "']");
        if (m.hasClass(l) && k.is(":visible")) {
            return;
        }
        var f;
        (f = h.find("[data-tab='" + i + "']")).removeClass(l);
        m.addClass(l);
        h.find("[data-panel='" + i + "']").hide().removeClass("js-transition-after js-transition-before");
        k.addClass("js-transition-before");
        k.show();
        setTimeout(function() {
            k.addClass("js-transition-after");
        },
        20);
        var g = h.find("[data-tab='" + i + "'][data-tab-id='" + e + "']:radio");
        if (g.length) {
            g.attr("checked", "checked");
        }
        c.tabs[i] = e;
        c(c.tabs).trigger(i + "-change", [e, m, k, f]);
    }
    c.tabs.changeTab = a;
    c.tabs.init = function(e, g) {
        var f = e || b;
        var g = g || "click";
        d(f);
        f.delegate("[data-tab]", g,
        function(i) {
            var j = c(this).data("tab");
            var h = c(this).data("tab-id");
            var k = c(this).data("tab-active");
            a(f, j, h, k);
            i.stopPropagation();
        });
    };
})(jQuery);
(function(d) {
    var f = document;
    var h = ".";
    var c = "beforeSwitch";
    var e = "switch";
    var b = "afterSwitch";
    var g = "able-switchable-";
    d.extend({
        able: {
            Switchable: a
        }
    });
    SP = a.prototype;
    a.Plugins = [];
    function a(k, j) {
        var i = this;
        i.config = d.extend({},
        d.fn.switchable.defaults, j || {});
        i.$container = k;
        i._init();
    }
    d.extend(SP, {
        _init: function() {
            var i = this,
            j = i.config;
            i.activeIndex = j.activeIndex;
            i.$evtBDObject = d("<div />");
            i._parseStructure();
            if (j.hasTriggers) {
                i._bindTriggers();
            }
            d.each(a.Plugins,
            function() {
                this._init(i);
            });
        },
        _parseStructure: function() {
            var i = this,
            k = i.$container,
            j = i.config;
            switch (j.type) {
            case 0:
                i.$triggers = k.find(h + j.navCls).children();
                i.$panels = k.find(h + j.contentCls).children();
                break;
            case 1:
                i.$triggers = k.find(h + j.triggerCls);
                i.$panels = k.find(h + j.panelCls);
                break;
            }
            i.viewLength = i.$panels.length / j.step;
        },
        _bindTriggers: function() {
            var i = this,
            k = i.config,
            j = i.$triggers,
            l = k.events;
            j.each(function(n, m) {
                if (d.inArray("click", l) !== -1) {
                    d(m).click(function(o) {
                        if (i.activeIndex === n) {
                            return i;
                        }
                        if (i.switchTimer) {
                            clearTimeout(i.switchTimer);
                        }
                        i.switchTimer = setTimeout(function() {
                            i.switchTo(n);
                        },
                        k.delay * 1000);
                        o.stopPropagation();
                    });
                }
                if (d.inArray("hover", l) !== -1) {
                    d(m).hover(function(o) {
                        if (i.activeIndex === n) {
                            return i;
                        }
                        if (i.switchTimer) {
                            clearTimeout(i.switchTimer);
                        }
                        i.switchTimer = setTimeout(function() {
                            i.switchTo(n);
                        },
                        k.delay * 1000);
                    },
                    function(o) {
                        if (i.switchTimer) {
                            clearTimeout(i.switchTimer);
                        }
                        o.stopPropagation();
                    });
                }
            });
        },
        beforeSwitch: function(i) {
            if (d.isFunction(i)) {
                this.$evtBDObject.bind(c, i);
            }
        },
        afterSwitch: function(i) {
            if (d.isFunction(i)) {
                this.$evtBDObject.bind(b, i);
            }
        },
        switchTo: function(l) {
            var p = this,
            j = p.config,
            n = d.makeArray(p.$triggers),
            m = d.makeArray(p.$panels),
            q = p.activeIndex,
            i = j.step,
            o = q * i,
            k = l * i;
            p.$evtBDObject.trigger(c, [l]);
            if (j.hasTriggers) {
                p._switchTrigger(q > -1 ? n[q] : null, n[l]);
            }
            p._switchView(m.slice(o, o + i), m.slice(k, k + i), l);
            p.activeIndex = l;
            p.$evtBDObject.trigger(b, [l]);
        },
        prev: function() {
            var j = this,
            i = j.activeIndex;
            j.switchTo(i > 0 ? i - 1 : j.viewLength - 1);
        },
        next: function() {
            var j = this,
            i = j.activeIndex;
            j.switchTo(i < j.viewLength - 1 ? i + 1 : 0);
        },
        _switchTrigger: function(k, i) {
            var j = this.config.activeTriggerCls;
            if (k) {
                d(k).removeClass(j);
            }
            d(i).addClass(j);
        },
        _switchView: function(k, j, i) {
            d.each(k,
            function() {
                d(this).hide();
            });
            d.each(j,
            function() {
                d(this).show();
            });
        }
    });
    d.fn.switchable = function(i) {
        var j = this;
        var k = j.data("switchables");
        j.data("switchables", k ? k: []);
        return j.each(function() {
            j.data("switchables").push(new a(d(this), i));
        });
    };
    d.fn.switchable.defaults = {
        type: 0,
        navCls: g + "nav",
        contentCls: g + "content",
        triggerCls: g + "trigger",
        panelCls: g + "panel",
        hasTriggers: true,
        activeIndex: 0,
        activeTriggerCls: "active",
        events: ["click", "hover"],
        step: 1,
        delay: 0.1,
        viewSize: []
    };
})(jQuery);
(function(g) {
    var i;
    var f = "display";
    var a = "block";
    var p = "opacity";
    var n = "z-index";
    var j = "position";
    var h = "relative";
    var e = "absolute";
    var c = "scrollx";
    var b = "scrolly";
    var k = "none";
    var d = "fade";
    var m = "liner";
    var l = "swing";
    var o = g.able.Switchable;
    g.extend(g.fn.switchable.defaults, {
        effect: "none",
        duration: 0.5,
        easing: m,
        circle: false,
        viewportLen: null
    });
    o.Effects = {
        none: function(r, q, s) {
            g.each(r,
            function() {
                g(this).hide();
            });
            g.each(q,
            function() {
                g(this).show();
            });
            s();
        },
        fade: function(v, u, w) {
            if (v.length !== 1) {
                return;
            }
            var q = this,
            s = q.config,
            r = v[0],
            t = u[0];
            if (q.$anim) {
                q.$anim.clearQueue();
            }
            g(t).css(p, 1);
            if (r === t) {
                return;
            }
            q.$anim = g(r).animate({
                opacity: 0,
                duration: s.duration,
                easing: s.easing
            },
            function() {
                q.$anim = null;
                g(t).css(n, 9);
                g(r).css(n, 1);
                w();
            });
        },
        scroll: function(q, t, A, y) {
            var B = this,
            r = B.config,
            C = r.effect === c,
            z = B.viewSize[C ? 0 : 1] * y,
            v = {};
            var u = y == 0 && B.activeIndex == B.viewLength - 1,
            s = y == B.viewLength - 1 && B.activeIndex == 0,
            x, w = B.viewSize[C ? 0 : 1] * B.viewLength;
            if (u) {
                x = z;
                z = w;
            } else {
                if (s) {
                    B.$panels.parent().css(C ? "left": "top", -w);
                }
            }
            v[C ? "left": "top"] = -z;
            g.extend(v, {
                duration: r.duration,
                easing: r.easing
            });
            if (B.$anim) {
                B.$anim.clearQueue();
            }
            B.$anim = B.$panels.parent().animate(v, r.duration * 1000,
            function() {
                if (u) {
                    B.$panels.parent().css(C ? "left": "top", x);
                }
                B.$anim = null;
                A();
            });
        }
    };
    i = o.Effects;
    i[c] = i[b] = i.scroll;
    o.Plugins.push({
        name: "effect",
        _init: function(x) {
            var s = x.config,
            z = s.effect,
            q = x.$panels,
            r = s.step,
            y = x.activeIndex,
            v = y * r,
            t = v + r - 1,
            w = q.length;
            s.viewportLen = s.viewportLen || s.step;
            x.viewSize = [s.viewSize[0] || q.outerWidth(true) * r, s.viewSize[1] || q.outerHeight(true) * r];
            if (z !== k) {
                q.css(f, a);
                switch (z) {
                case c:
                case b:
                    q.parent().css("position", e);
                    q.parent().parent().css("position", h);
                    if (z === c) {
                        q.css("float", "left");
                        q.parent().css("width", x.viewSize[0] * x.viewLength + "px");
                        q.parent().css("width", x.viewSize[0] * (x.viewLength + (s.viewportLen || 1)) + "px");
                    }
                    var u;
                    if (s.circle) {
                        u = q.slice(0, s.viewportLen);
                        u.parent().append(u.clone());
                    }
                    u = null;
                    break;
                case d:
                    q.each(function(A) {
                        g(this).css({
                            opacity:
                            (A >= v && A <= t) ? 1 : 0,
                            position: e,
                            zIndex: (A >= v && A <= t) ? 9 : 1
                        });
                    });
                    break;
                }
            }
        }
    });
    g.extend(o.prototype, {
        _switchView: function(w, v, s) {
            var q = this,
            r = q.config,
            u = r.effect,
            t = g.isFunction(u) ? u: i[u];
            t.call(q, w, v,
            function() {},
            s);
        }
    });
})(jQuery);
(function(g) {
    g.qdatepicker = {};
    var s = g.qdatepicker.ROOT_KEY = "q-datepicker";
    var k;
    var b = 0;
    var d = {
        "2013-01-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元旦",
            holidayClass: "yuandan"
        },
        "2013-02-09": {
            afterTime: 0,
            beforeTime: 0,
            dayindex: 0,
            holidayName: "除夕",
            holidayClass: "chuxi"
        },
        "2013-02-10": {
            afterTime: 0,
            beforeTime: 0,
            dayindex: 0,
            holidayName: "春节",
            holidayClass: "chunjie"
        },
        "2013-02-11": {
            afterTime: 0,
            beforeTime: 0,
            dayindex: 0,
            holidayName: "正月初二",
            holidayClass: "chunjie"
        },
        "2013-02-12": {
            afterTime: 0,
            beforeTime: 0,
            dayindex: 0,
            holidayName: "正月初三",
            holidayClass: "chunjie"
        },
        "2013-02-24": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元宵",
            holidayClass: "yuanxiao"
        },
        "2013-04-04": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "清明",
            holidayClass: "qingming"
        },
        "2013-05-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "五一",
            holidayClass: "laodong"
        },
        "2013-06-12": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "端午",
            holidayClass: "duanwu"
        },
        "2013-09-10": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "教师"
        },
        "2013-09-19": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "中秋",
            holidayClass: "zhongqiu"
        },
        "2013-10-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "国庆",
            holidayClass: "guoqing"
        },
        "2013-12-25": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "圣诞",
            holidayClass: "shengdan"
        },
        "2014-01-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元旦",
            holidayClass: "yuandan"
        },
        "2014-01-30": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "除夕",
            holidayClass: "chuxi"
        },
        "2014-01-31": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "春节",
            holidayClass: "chunjie"
        },
        "2014-02-14": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元宵",
            holidayClass: "yuanxiao"
        },
        "2014-04-05": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "清明",
            holidayClass: "qingming"
        },
        "2014-05-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "五一",
            holidayClass: "laodong"
        },
        "2014-06-02": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "端午",
            holidayClass: "duanwu"
        },
        "2014-09-08": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "中秋",
            holidayClass: "zhongqiu"
        },
        "2014-10-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "国庆",
            holidayClass: "guoqing"
        },
        "2014-12-25": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "圣诞",
            holidayClass: "shengdan"
        }
    };
    var o = {
        week: "周",
        day: "天",
        before: "前",
        after: "后"
    };
    var n = {
        LANG: {
            prev: "",
            next: "",
            day_names: ["日", "一", "二", "三", "四", "五", "六"],
            OUT_OF_RANGE: "超出范围",
            ERR_FORMAT: "格式错误"
        },
        CLASS: {
            group: "g",
            header: "h",
            calendar: "c",
            next: "n",
            prev: "p",
            title: "t",
            week: "w",
            month: "cm_",
            day_default: "st",
            day_selected: "st-a",
            day_othermonth: "st-s",
            day_today: "st-t",
            day_hover: "st-h",
            day_disabled: "st-d",
            day_round: "st-a-r",
            day_holiday: "st-holi-",
            day_area_bg: "st-area"
        },
        WEEKDAYS: 7,
        STARTDAY: 1,
        showOtherMonths: false,
        defaultDay: "",
        disabledDays: "",
        customClass: "",
        customActiveClass: "",
        multi: 2,
        showTip: true,
        linkTo: null,
        linkRules: "",
        refObj: null,
        forceCorrect: true,
        formatTitle: function(u) {
            return u.getFullYear() + "年" + (u.getMonth() + 1) + "月";
        },
        showOnInit: false,
        showOnFocus: false,
        container: null,
        minDate: null,
        maxDate: null,
        ui: null,
        sDay: null,
        endDay: null,
        pos: "",
        parseDate: function(v) {
            var u = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
            return u ? new Date(u[1], u[2] * 1 - 1, u[3]) : null;
        },
        formatDate: function(u) {
            return u.getFullYear() + "-" + c(u.getMonth() + 1, 2) + "-" + c(u.getDate(), 2);
        },
        minuteDate: function(v) {
            var u = new Date();
            u = new Date(u.getFullYear() + "/" + (u.getMonth() + 1) + "/" + u.getDate());
            return (v - u) / (24 * 60 * 60 * 1000);
        }
    };
    var i = function() {
        var v = this;
        for (var w = 0, u = arguments.length; w < u; w++) {
            g.each(arguments[w],
            function(z, y) {
                var x;
                if (v.prototype[z] && jQuery.isFunction(v.prototype[z])) {
                    x = v.prototype[z];
                }
                v.prototype[z] = y;
                if (x) {
                    v.prototype[z]["_PARENT_"] = x;
                }
            });
        }
        if (!v.prototype.parent) {
            v.prototype.parent = function() {
                return arguments.callee.caller._PARENT_.apply(this, arguments);
            };
        }
    };
    function c(x, w) {
        x = x == null ? "": x + "";
        for (var v = 0, u = w - x.length; v < u; v++) {
            x = "0" + x;
        }
        return x;
    }
    var j = q(d);
    function l(v) {
        var u = v.split("-");
        return new Date(u[0], u[1] - 1, u[2]);
    }
    function q(F) {
        var w = {};
        for (var E in F) {
            var v = E;
            var A = F[E];
            w[E] = A;
            var z = "";
            var C = "";
            if (A.beforeTime > 0) {
                for (var x = 1; x <= A.beforeTime; x++) {
                    var B = {};
                    var G = new Date(l(v).getTime() - x * 24 * 3600 * 1000);
                    var y = p(G);
                    B.holidayName = A.holidayName + o.before + x + o.day;
                    B.dayindex = A.dayindex;
                    if (!w[y]) {
                        w[y] = B;
                    } else {
                        if ((A.dayindex > w[y].dayindex) && w[y].beforeTime == null) {
                            w[y] = B;
                        }
                    }
                }
            }
            if (A.afterTime > 0) {
                for (var x = 1; x <= A.afterTime; x++) {
                    var B = {};
                    var D = new Date(l(v).getTime() + x * 24 * 3600 * 1000);
                    var u = p(D);
                    B.holidayName = A.holidayName + o.after + x + o.day;
                    B.dayindex = A.dayindex;
                    if (!w[u]) {
                        w[u] = B;
                    } else {
                        if ((A.dayindex > w[u].dayindex) && w[p(new Date(G))].afterTime == null) {
                            w[u] = B;
                        }
                    }
                }
            }
        }
        return w;
    }
    function p(u) {
        if (typeof u == "number") {
            u = new Date(u);
        }
        return u.getFullYear() + "-" + t(u.getMonth() + 1) + "-" + t(u.getDate());
    }
    function t(u) {
        return u < 10 ? "0" + u: u;
    }
    function e(u) {
        u.setHours(0);
        u.setMinutes(0);
        u.setSeconds(0);
        u.setMilliseconds(0);
        return u;
    }
    function h(u) {
        var v = u.offset();
        v.top += u.outerHeight();
        return v;
    }
    function r(w) {
        var u;
        if (w && !w.nodeType) {
            u = jQuery.event.fix(w || window.event).target;
        } else {
            u = w;
        }
        if (!u) {
            return null;
        }
        var v = g(u).parents("." + s);
        return v.size() > 0 ? v.eq(0).data(s) : null;
    }
    function m() {}
    m.implement = i;
    g.extend(m.prototype, {
        isUI: 1,
        init: function() {
            var u = this,
            v = this.picker,
            w = v.ns;
            u.attachedEl = u.attachedEl || new g;
            g(document).bind("mousedown." + w,
            function(z) {
                var y;
                if ((v.activeEl[0] === z.target && (y = 1)) || (u.attachedEl.index(z.target) != -1 && (y = 2))) {
                    if (!v.visible()) {
                        v.show(u.getDate());
                    } else {
                        v.hide();
                    }
                    if (y == 2) {
                        v.activeEl.focus();
                    }
                    return;
                }
                var A;
                if ((A = r(z)) && A.key === v.key) {
                    return;
                } else {
                    v.hide();
                }
            });
            var x = function() {
                if (!v.get("container")) {
                    v.getContainer().css(h(v.activeEl));
                }
            };
            x();
            g(window).bind("load." + w + " resize." + w, x);
            v.activeEl.bind("focus." + w,
            function(y) {
                if (v.get("showOnFocus")) {
                    v.show(u.getDate());
                }
            });
            v.activeEl.bind("keydown." + w,
            function(y) {
                switch (y.keyCode) {
                case 40:
                    u.setDate(new Date(u.getDate().getTime() + 24 * 60 * 60 * 1000));
                    var z = u.validate();
                    if (!z.success) {
                        return;
                    }
                    v.show(u.getDate());
                    break;
                case 38:
                    u.setDate(new Date(u.getDate().getTime() - 24 * 60 * 60 * 1000));
                    var z = u.validate();
                    if (!z.success) {
                        return;
                    }
                    v.show(u.getDate());
                    break;
                case 9:
                case 27:
                    v.hide();
                    break;
                default:
                    u.onKeyDown(y);
                }
            });
        },
        _init: function(u) {
            this.picker = u;
        },
        select: function(u) {
            this.picker.activeEl.val(this.picker.args.formatDate(u));
        },
        change: function(u, v, w) {
            this.draw(v);
        },
        posHandler: function(v, u) {
            var z = this.picker.activeEl.attr("data-pos"),
            y = v,
            x,
            w = u.parseDate(this.picker.activeEl.val()).getMonth();
            if (z === "right") {
                if ((this.picker.activeEl.attr("data-prefix") === "返" || this.picker.activeEl.attr("data-prefix") === "离店") && v.getMonth() == w) {
                    y = y.getTime() - y.getDate() * 24 * 3600 * 1000;
                }
            }
            if (z === "left" && (this.picker.activeEl.attr("data-prefix") === "返" || this.picker.activeEl.attr("data-prefix") === "离店") && v.getMonth() != u.minDate.getMonth()) {
                y = y.getTime() - y.getDate() * 24 * 3600 * 1000;
            }
            x = new Date(y);
            x.setDate(1);
            return x;
        },
        draw: function(y, w) {
            this.drawDate = y;
            e(y);
            var v = this.picker,
            w = g.extend({},
            v.args, w || {}),
            C = w.multi,
            A = w.CLASS;
            w.activeDate = w.activeDate || w.parseDate(v.activeEl.val());
            var u = [],
            B;
            w.count = C;
            B = this.posHandler(y, w);
            u.push('<div class="' + A.group + " " + A.group + C + '">');
            for (var z = 0; z < C; z++) {
                u.push('<div class="' + A.calendar + '" data-index="' + z + '">');
                w.index = z;
                u.push(this._drawTitle(B, w));
                u.push(this._drawBody(B, w));
                u.push('<div class="' + A.month, B.getMonth() + 1, '">' + (B.getMonth() + 1) + "</div>");
                u.push("</div>");
                B.setMonth(B.getMonth() + 1);
            }
            u.push("</div>");
            g(u.join("")).appendTo(v.getContainer().empty());
            this.picker.selectUi();
        },
        dispose: function() {
            var u = "." + this.picker.ns;
            g(document).unbind(u);
            g(window).unbind(u);
        },
        getDate: function() {
            var u = this.picker.get("parseDate")(this.picker.activeEl.val());
            return u != u ? null: u;
        },
        setDate: function(u) {
            this.picker.activeEl.val(this.picker.get("formatDate")(u));
        },
        onBeforeDraw: function(w) {
            var u = function(D, C) {
                if (D.getFullYear() > C.getFullYear()) {
                    return 1;
                } else {
                    if (D.getFullYear() === C.getFullYear()) {
                        return (D.getMonth() - C.getMonth()) / (Math.abs(D.getMonth() - C.getMonth()) || 1);
                    } else {
                        return - 1;
                    }
                }
            };
            if (this.selectedDate && this.drawDate) {
                w.setTime(this.drawDate.getTime());
            } else {
                var v = this.picker,
                y = v.get("minDate"),
                B = v.get("maxDate"),
                A = v.get("multi");
                var z = new Date(w.getFullYear(), w.getMonth() + A - 1, 1);
                if (B && u(z, B) > 0) {
                    for (var x = 1; B && A && A > 1 && A - x > 0; x++) {
                        z = new Date(w.getFullYear(), w.getMonth() + A - x - 1, 1);
                        if (u(z, B) <= 0) {
                            z.setMonth(z.getMonth() - A + 1);
                            break;
                        }
                    }
                } else {
                    z = null;
                }
                if (z && (!y || z.getTime() >= y.getTime())) {
                    w.setTime(z.getTime());
                }
            }
        },
        onKeyDown: function(u) {},
        onSet: function() {
            this.selectedDate = null;
        },
        _drawTitle: function(y, A) {
            var v = A.LANG,
            D = A.CLASS;
            var B = [];
            var z = A.minDate,
            u = A.maxDate;
            var C = A.index === 0;
            var w = A.count === A.index + 1;
            B.push('<div class="' + D.header + '">');
            B.push('<span href="#" class="' + D.next + '"', (!u || u.getFullYear() > y.getFullYear() || (u.getFullYear() === y.getFullYear() && u.getMonth() > y.getMonth())) && w ? "": ' style="display:none;"', " onclick=\"QDP.change( event , '+1M' );return false;\">", v.next, "</span>");
            B.push('<span href="#" class="' + D.prev + '"', (!z || z.getFullYear() < y.getFullYear() || (z.getFullYear() === y.getFullYear() && z.getMonth() < y.getMonth())) && C ? "": ' style="display:none;"', " onclick=\"QDP.change( event , '-1M' );return false;\">", v.prev, "</span>");
            B.push('<div class="' + D.title + '">', A.formatTitle(y), "</div>");
            B.push("</div>");
            return B.join("");
        },
        _drawBody: function(U, y) {
            var S = y.STARTDAY,
            z = y.WEEKDAYS;
            var G = y.LANG,
            u = y.CLASS;
            var H = y.activeDate;
            var F = y.minDate,
            K = y.maxDate;
            if (H && H != H) {
                H = null;
            }
            var v = new Date();
            var J = ["<table>", "<thead>", "<tr>"];
            for (var R = 0; R < z; R++) {
                var O = (S + R) % z;
                J.push('<th class="' + u.week + O + '">', G.day_names[O] || "", "</th>");
            }
            J.push("</tr>", "</thead>");
            J.push("<tbody>");
            var D = [];
            var L = U.getFullYear(),
            V = U.getMonth() + 1;
            var B = new Date(L, V - 1, 1);
            var M = 1,
            T = new Date(L, V, 0).getDate();
            var w = B.getDay() - S;
            while (w < 0) {
                w += z;
            }
            var N = M - w;
            var W = (z - (((1 - N + T) % z) || z)) + T;
            for (var R = N, Q = 0; R <= W; R++, Q++) {
                var E = new Date(L, V - 1, R);
                if (Q % z == 0) {
                    D.push("</tr>", "<tr>");
                }
                var O = (S + Q) % z;
                D.push('<td class="' + u.week + O + " " + u.day_default);
                var A = false;
                if (g.grep(["getFullYear", "getMonth", "getDate"],
                function(x) {
                    return E[x]() == v[x]();
                }).length == 3) {
                    D.push(" " + u.day_today);
                }
                if (H != null && H.getTime() == E.getTime()) {
                    D.push(" " + u.day_selected);
                }
                var C = false;
                if (R < 1 || R > T) {
                    D.push(" " + u.day_othermonth);
                    C = true;
                }
                if (F && E.getTime() < F.getTime() || K && E.getTime() > K.getTime() || ~y.disabledDays.toString().indexOf(y.formatDate(E))) {
                    if (!C) {
                        D.push(" " + u.day_disabled);
                    }
                    A = true;
                }
                var P = this._getDateClass(E);
                if (P && !C) {
                    D.push(" " + P);
                }
                D.push('"');
                if (!A) {
                    D.push(' onclick="QDP.select(event,new Date(' + E.getFullYear() + "," + E.getMonth() + "," + E.getDate() + "));", 'return false;"');
                }
                if (!A && !C) {
                    D.push(" data-sort=" + y.minuteDate(E) + ">");
                } else {
                    D.push(">");
                }
                if (!C || y.showOtherMonths) {
                    D.push('<span class="');
                    var I = d[y.formatDate(E)];
                    dateText = E.getDate();
                    if (!A && I && I.holidayClass) {
                        D.push(" " + u.day_holiday + "default");
                        D.push(" " + u.day_holiday + I.holidayClass);
                        dateText = I.holidayName;
                    }
                    D.push('">');
                    if (dateText === new Date().getDate() && y.minuteDate(E) === 0) {
                        dateText = "今天";
                    }
                    D.push(dateText);
                    D.push("</span>");
                } else {
                    D.push("&nbsp;");
                }
                D.push("</td>");
            }
            J.push(D.length > 0 ? D.slice(1, -1).join("") : "");
            J.push("</tbody>", "</table>");
            return J.join("");
        },
        _getDateClass: function(v) {
            var x = this.picker.args.formatDate(v);
            var w = "";
            var u = parseInt(this.picker.activeEl.val().replace(/-/g, ""));
            var y = parseInt(x.replace(/-/g, ""));
            if (this.picker.get("linkTo")) {
                this.picker.args.sDay = this.picker.activeEl.val();
                if (linkedQDP = this.picker.get("linkTo").data(g.qdatepicker.ROOT_KEY)) {
                    if (typeof(linkedQDP.activeEl.val()) != "undefined" && x == linkedQDP.activeEl.val()) {
                        w = this.addRoundClass("BACK");
                        this.picker.args.endDay = linkedQDP.activeEl.val();
                    }
                }
                if (y < parseInt(linkedQDP.activeEl.val().replace(/-/g, "")) && y > u) {
                    w = this.addRoundClass("AREAR");
                }
            } else {
                if (this.picker.get("refObj")) {
                    if (typeof(this.picker.activeEl.val()) != "undefined" && x == this.picker.activeEl.val()) {
                        w = this.addRoundClass("BACK");
                        this.picker.args.endDay = this.picker.activeEl.val();
                    }
                    if (refQDP = this.picker.get("refObj").data(g.qdatepicker.ROOT_KEY)) {
                        if (typeof(refQDP.activeEl.val()) != "undefined" && x == refQDP.activeEl.val()) {
                            w = this.addRoundClass("FROM");
                            this.picker.args.sDay = refQDP.activeEl.val();
                        }
                    }
                    if (y > parseInt(refQDP.activeEl.val().replace(/-/g, "")) && y < u) {
                        w = this.addRoundClass("AREAR");
                    }
                }
            }
            if (d[x]) {
                w += " holi";
            }
            return g.trim(w);
        }
    });
    function a(v, u) {
        if (!this.init) {
            return new a(v, u);
        } else {
            return this.init(v, u);
        }
    }
    window.QDP = {};
    g.each(["select", "change", "_trigger"],
    function(w, u) {
        window.QDP[u] = function() {
            if (!arguments[0]) {
                return;
            }
            var v = r(arguments[0]);
            if (v && v[u]) {
                if (u === "select") {
                    return v[u].apply(v, Array.prototype.slice.call(arguments));
                } else {
                    return v[u].apply(v, Array.prototype.slice.call(arguments, 1));
                }
            }
        };
    });
    g.extend(a.prototype, {
        init: function(v, u) {
            u = u || {};
            if (u.ui) {
                if (u.ui["isUI"]) {
                    this.ui = u.ui;
                } else {
                    if (typeof u.ui == "string" && g.qdatepicker.uis[u.ui]) {
                        this.ui = new g.qdatepicker.uis[u.ui];
                    }
                }
            }
            if (!this.ui) {
                this.ui = new m();
            }
            this.ui._init(this);
            u = this.args = g.extend(true, {},
            n, u || {});
            this.key = ++b;
            var w = this.ns = s + this.key;
            var x = this.activeEl = g(v);
            this.el = g('<div class="' + s + (u.customClass ? " " + u.customClass: "") + '"></div>').appendTo(this.args.container || document.body).hide();
            g(this.el).data(s, this);
            this.ui.init();
            this.lastShowedDate = null;
            this.showedDate = null;
            if (u.showOnInit) {
                this.show();
            }
            g.each(u.on || {},
            function(z, y) {
                x.bind(z + "." + w, y);
            });
            return this;
        },
        _trigger: function() {
            this.activeEl.triggerHandler.apply(this.activeEl, arguments);
        },
        select: function() {
            if (arguments.length > 1) {
                var u = arguments[0] || window.event;
                date = arguments[1];
            } else {
                var u = u || window.event;
                date = arguments[0];
            }
            if (u) {
                var v = u.srcElement ? u.srcElement: u.target;
                if (g(v).parents("." + this.args.CLASS.calendar).data("index") === 1) {
                    this.activeEl.attr("data-pos", "right");
                }
                if (g(v).parents("." + this.args.CLASS.calendar).data("index") === 0) {
                    this.activeEl.attr("data-pos", "left");
                }
            }
            this.ui.select(date);
            this.hide();
            this._trigger("q-datepicker-select", [date]);
        },
        _selectTd: function(x, w, v) {
            for (var u = parseInt(x); u < parseInt(w); u++) {
                g("td[data-sort='" + u + "']:not('.st-d')").addClass(n.CLASS.day_area_bg);
            }
        },
        selectUi: function() {
            var x = this,
            C, u, z, A, y, w;
            var v = x.args.minuteDate(new Date(x.activeEl.val().replace(/-/g, "/")));
            var B = x.activeEl[0]["id"];
            y = this.args;
            if (y.sDay) {
                u = y.minuteDate(new Date(y.sDay.replace(/-/g, "/")));
            }
            if (y.endDay) {
                z = y.minuteDate(new Date(y.endDay.replace(/-/g, "/")));
            }
            g('.q-datepicker td:not(".st_d")').bind("mouseover",
            function(D) {
                g(this).addClass(y.CLASS.day_hover);
                w = g(this).parents(".ch_sch_form");
                if (w.find("[data-type = 'oneWay']").length < 1) {
                    C = parseInt(g(this).attr("data-sort"));
                    if (u === z && v === u && x.activeEl.attr("data-prefix") === "往" && C > z) {
                        return;
                    }
                    if (C < z + 1 && v === u) {
                        g(".q-datepicker td").removeClass(y.CLASS.day_area_bg);
                        g(".q-datepicker td[data-sort='" + u + "']").removeClass(y.CLASS.day_selected);
                        if (C === z) {
                            x._selectTd(C, z);
                        } else {
                            x._selectTd(C + 1, z);
                        }
                    }
                    if (C > z && v === u) {
                        g(".q-datepicker td").removeClass(y.CLASS.day_area_bg);
                        g(".q-datepicker td[data-sort='" + z + "']").removeClass(y.CLASS.day_selected + " " + n.CLASS.day_round);
                    }
                    if (C > u - 1 && v === z) {
                        g(".q-datepicker td").removeClass(y.CLASS.day_area_bg);
                        g(".q-datepicker td[data-sort='" + z + "']").removeClass(y.CLASS.day_selected + " " + n.CLASS.day_round);
                        if (C === u) {
                            x._selectTd(u, C);
                        } else {
                            x._selectTd(u + 1, C);
                        }
                    }
                    if (u === z && v === u && x.activeEl.attr("data-prefix") === "返") {
                        g(".q-datepicker td[data-sort='" + z + "']").addClass(y.CLASS.day_selected + " " + n.CLASS.day_round);
                    }
                }
            }).mouseout(function() {
                g(this).removeClass(y.CLASS.day_hover);
                if (w.find("[data-type = 'oneWay']").length < 1) {
                    g(".q-datepicker td").removeClass(y.CLASS.day_area_bg);
                    g(".q-datepicker td[data-sort='" + u + "']").addClass(y.CLASS.day_selected);
                    g(".q-datepicker td[data-sort='" + z + "']").addClass(y.CLASS.day_round);
                    x._selectTd(u + 1, z);
                }
            });
        },
        set: function(y, B, A) {
            if (!this.ui.onSet || this.ui.onSet(y, B, A) === false) {
                return;
            }
            if (typeof y === "string") {
                var C = false;
                switch (y) {
                case "container":
                    this.el.appendTo(B || document.body);
                    this.el.css({
                        top: "",
                        left: ""
                    });
                    break;
                }
                for (var x = 0, v = y.split("."), u = v.length, D = this.args; x < u && (x !== u - 1 && (D[v[x]] || (D[v[x]] = {})) || (D[v[x]] = B)); D = D[v[x]], x++) {}
            }
            if (A && this.visible()) {
                this._show(this.showedDate);
            }
        },
        get: function(y) {
            for (var x = 0, A = this.args, v = y.split("."), u = v.length; x < u && (A = A[v[x]]); x++) {}
            return A;
        },
        change: function(w) {
            var v = typeof w === "string" ? k(w, this.showedDate) : w;
            var u = this.showedDate;
            this.lastShowedDate = this.showedDate;
            this.showedDate = v;
            this.ui.change(u, v, w);
            this._trigger("q-datepicker-change", [u, v, w]);
        },
        show: function(u) {
            var w, v = this.get("minDate"),
            x = this.get("maxDate");
            if (!u) {
                w = new Date();
            } else {
                w = u;
            }
            if (v && w.getTime() < v.getTime()) {
                w.setTime(v.getTime());
            } else {
                if (x && w.getTime() > x.getTime()) {
                    w.setTime(x.getTime());
                }
            }
            this.ui.onBeforeDraw(w);
            this._show.call(this, w);
            this._trigger("q-datepicker-show", [u]);
        },
        _show: function(u) {
            this.lastShowedDate = this.showedDate;
            this.showedDate = u;
            if (this.ui.draw(u) !== false) {}
            this.el.show();
        },
        hide: function() {
            if (this.visible()) {
                this.el.hide();
                this._trigger("q-datepicker-hide");
            }
        },
        dispose: function() {
            this.ui.dispose();
            this.el.remove();
            this.activeEl.unbind("." + this.ns);
            this._trigger("q-datepicker-dispose");
        },
        visible: function() {
            return this.el.is(":visible");
        },
        getContainer: function() {
            return this.el;
        }
    });
    var f = {
        "+M": function(v, w) {
            var u = v.getDate();
            v.setMonth(v.getMonth() + w);
            if (v.getDate() !== u) {
                v.setDate(0);
            }
        },
        "-M": function(v, w) {
            var u = v.getDate();
            v.setMonth(v.getMonth() - w);
            if (v.getDate() !== u) {
                v.setDate(0);
            }
        },
        "+D": function(u, v) {
            u.setDate(u.getDate() + v);
        },
        "-D": function(u, v) {
            u.setDate(u.getDate() - v);
        },
        "+Y": function(u, v) {
            u.setFullYear(u.getFullYear() + v);
        },
        "-Y": function(u, v) {
            u.setFullYear(u.getFullYear() - v);
        }
    };
    g.extend(g.qdatepicker, {
        uis: [],
        createUI: function(v, y) {
            var w = y && g.qdatepicker.uis[y] ? g.qdatepicker.uis[y] : m;
            var u = function() {};
            g.extend(u, w);
            g.extend(u.prototype = {},
            w.prototype);
            if (v) {
                g.qdatepicker.uis[v] = u;
                u.prototype.name = v;
            }
            return u;
        },
        calcTime: function(A, v) {
            A = (A || "").toString();
            var y;
            if (v) {
                y = new Date(v.getTime());
            } else {
                y = new Date();
                var z = A.match(/^\d+/);
                if (z) {
                    y.setTime(z[0] * 1);
                }
            }
            var x = /([+-])(\d+)([MDY])/g,
            u;
            while (u = x.exec(A)) {
                var w = u[1] + u[3];
                if (f[w]) {
                    f[w](y, u[2] * 1);
                }
            }
            return y;
        }
    });
    g.qdatepicker.createUI("qunar").implement({
        init: function() {
            this.parent.apply(this, arguments);
            var v = this,
            w = this.picker;
            var y = w.get("customActiveClass");
            var x = this.triggerEl = w.activeEl.wrap('<div class="qunar-dp' + (y ? " " + y: "") + '"></div>').before('<div class="dp-prefix"></div><div class="dp-info"><b/><span class="dp-text"></span></div>').parent();
            var u = this.picker.args.prefix || w.activeEl.data("prefix");
            if (u) {
                x.find(".dp-prefix").text(u);
                w.activeEl.css({
                    "margin-left": x.find(".dp-prefix").outerWidth(true) + "px"
                });
            } else {
                x.find(".dp-prefix").remove();
            }
            w.set("container", x[0]);
            this.attachedEl = this.attachedEl.add(x.find(".dp-info > b , .dp-info")).add(x.find(".dp-info > b , .dp-info > .dp-text "));
            w.activeEl.attr("maxlength", 10);
            w.activeEl.addClass("textbox");
            w.activeEl.bind("keyup." + w.ns,
            function(z) {
                v.updateTip(v.validate.call(v));
            }).bind("blur." + w.ns,
            function(z) {
                v.autoCheck.call(v);
            });
            if (w.get("defaultDay") != null) {
                this.setDate(this.getDefaultDate());
            }
            this.updateTip(this.validate());
            this.selectedDate = null;
            this.checkLinked();
            this.forIframe(w);
        },
        forIframe: function(u) {
            g(window).bind("blur." + u.ns,
            function() {
                u.hide();
            });
        },
        getDefaultDate: function() {
            var v = this.picker;
            var u = k(v.get("defaultDay"));
            var w = v.get("minDate"),
            x = v.get("maxDate");
            if (w && w.getTime() > u.getTime() || x && x.getTime() < u.getTime()) {
                u = w || x;
            }
            return u;
        },
        checkLinked: function(B) {
            var C = this.picker,
            u;
            if (!C.get("linkTo") || !(u = C.get("linkTo").data(g.qdatepicker.ROOT_KEY)) || u.ui.name.indexOf("qunar") !== 0) {
                return;
            }
            var w = (C.get("linkRules") || "").split(",");
            var y = this.getDate();
            if (y == null) {
                return;
            }
            if (B) {
                if (B.restPos && B.pos || B.restPos && !u.activeEl.attr("data-pos")) {
                    u.activeEl.attr("data-pos", B.restPos);
                }
            }
            var D = {};
            g.each(["ds", "mind", "maxd"],
            function(G, F) {
                if (w[G]) {
                    D[F] = k(w[G], y);
                }
            });
            var A = u.get("strictMinDate"),
            v = u.get("strictMaxDate");
            if (D.mind || A) {
                var E = (D.mind ? D.mind.getTime() : -1) > (A ? A.getTime() : -1) ? D.mind: A;
                u.set("minDate", E, false);
            }
            if (D.maxd || v) {
                var E = (D.maxd ? D.maxd.getTime() : Number.MAX_VALUE) > (v ? v.getTime() : Number.MAX_VALUE) ? v: D.maxd;
                u.set("maxDate", E, false);
            }
            u.set(null, null, true);
            var x = u.ui.validate();
            if (!x.success && C.get("forceCorrect")) {
                u.select(D.ds);
                u.ui.drawDate = null;
                x = u.ui.validate();
            }
            u.ui.updateTip(x);
            var z = "Y";
            return z;
        },
        select: function(v, w) {
            var u = this.picker;
            this.parent.apply(this, arguments);
            this.selectedDate = v;
            if (!w) {
                this.autoCheck();
            }
        },
        showText: function(v) {
            var u = this.triggerEl.find(".dp-text");
            u.removeClass("errtext").html(v);
        },
        showErrText: function(v) {
            var u = this.triggerEl.find(".dp-text");
            u.addClass("errtext").html(v);
        },
        autoCheck: function() {
            var u = this.picker;
            var v = this.validate();
            var w = u.activeEl.attr("data-pos");
            if (!v.success && u.get("forceCorrect")) {
                this.setDate(this.getDefaultDate());
                this.updateTip(this.validate());
            } else {
                if (v.formatted) {
                    u.activeEl.val(v.formatted);
                }
                this.updateTip(v);
            }
            this.checkLinked({
                pos: u.args.pos,
                restPos: w
            });
            u.args.pos = "";
        },
        updateTip: function(u) {
            if (!this.picker.get("showTip")) {
                return;
            }
            if (!u.success) {
                this.showErrText(u.errmsg);
            } else {
                this.showText(u.daytip);
            }
        },
        validate: function() {
            var B = this.picker;
            var x = this.picker.activeEl.val();
            var y = this.getDate();
            var D = this;
            if (this.selectedDate && this.selectedDate.getTime() != y.getTime()) {
                this.selectedDate = null;
            }
            var A = "";
            if (y == null) {
                A = B.get("LANG.ERR_FORMAT");
                B._trigger("q-datepicker-error", ["FORMAT", x]);
            } else {
                var z = B.get("minDate"),
                u = B.get("maxDate");
                if (z && z.getTime() > y.getTime() || u && u.getTime() < y.getTime()) {
                    A = B.get("LANG.OUT_OF_RANGE");
                    B.args.pos = "change";
                    B._trigger("q-datepicker-error", ["RANGE", x]);
                }
            }
            var v = {
                success: !A,
                errmsg: A,
                formatted: null,
                daytip: null
            };
            if (v.success) {
                var w = B.get("formatDate")(y),
                C;
                switch (B.args.minuteDate(y)) {
                case 0:
                    C = "今天";
                    break;
                case 1:
                    C = "明天";
                    break;
                case 2:
                    C = "后天";
                    break;
                default:
                    C = "周" + B.get("LANG.day_names")[y.getDay()];
                    break;
                }
                v.daytip = j[w] ? j[w]["holidayName"] : C;
                v.formatted = w;
            }
            return v;
        },
        addRoundClass: function(u) {
            if (u == "FROM") {
                return this.picker.get("CLASS")["day_selected"];
            } else {
                if (u == "BACK") {
                    return this.picker.get("CLASS")["day_round"];
                } else {
                    if (u == "AREAR") {
                        return this.picker.get("CLASS")["day_area_bg"];
                    }
                }
            }
        }
    });
    g.fn.qdatepicker = function() {
        if (this[0]) {
            if (arguments.length > 1 && this.data(s)) {
                var v = this.data(s);
                if (arguments[0] === "option" || arguments[0] === "setting") {
                    return arguments.length > 2 ? v.set(arguments[1], arguments[2]) : v.get(arguments[1]);
                }
            } else {
                if (arguments.length <= 1) {
                    if (this.data(s)) {
                        this.data(s).dispose();
                        this.removeData(s);
                    }
                    var u = new a(this[0], arguments[0]);
                    this.data(s, u);
                }
            }
        }
        return this;
    };
    k = g.qdatepicker.calcTime;
})(jQuery);
(function(g, b) {
    var d = g.jQuery,
    h = g.document;
    var f = "YSELECTOR",
    i = ".SELECTOR_EVENT",
    c = "hover",
    e = d.browser.msie && d.browser.version === "6.0";
    var a = function() {};
    a.options = {
        emptyHidden: false,
        maxRows: 10,
        index: null,
        direction: "bottom",
        onchange: function() {},
        onselect: function(j) {
            return j || "";
        }
    };
    a.prototype = {
        _init: function(k) {
            var j = this;
            j._setOptions(k || {});
            j._bindEvents();
        },
        _bindEvents: function() {
            var l = this,
            k = l.option("jquery"),
            m = false;
            function j(n) {
                if (l.option("disable")) {
                    return;
                }
                if (m) {
                    l._hide();
                } else {
                    l._show();
                }
                m = !m;
            }
            k.delegate(".yselector_input", "click" + i, j).delegate(".yselector_arraw", "mousedown" + i,
            function(n) {
                l.option("input").focus();
                n.preventDefault();
                if (this.setCapture) {
                    this.setCapture();
                }
                j(n);
            }).delegate(".yselector_arraw", "click" + i,
            function(n) {
                if (this.releaseCapture) {
                    this.releaseCapture();
                }
            }).delegate(".yselector_input", "focusout" + i,
            function() {
                if (m) {
                    l._hide();
                    m = false;
                }
                var o = l.val(),
                n = l._getByValue(o);
                d(d.fn.yselector.events).trigger("blur", [l, n, l.option("holder")]);
            }).delegate(".yselector_suggest ul", "mousedown" + i,
            function(p) {
                p.preventDefault();
                if (this.setCapture) {
                    this.setCapture();
                }
                var o = p.target;
                if (o.tagName !== "A") {
                    return;
                }
                var n = d(o).data("index");
                l.index(n);
                j(p);
            }).delegate(".yselector_suggest ul", "click" + i,
            function(n) {
                if (this.releaseCapture) {
                    this.releaseCapture();
                }
            }).delegate(".yselector_suggest ul", "mouseenter" + i,
            function(n) {
                l._cur().removeClass(c);
            }).delegate(".yselector_input", "keydown" + i,
            function(o) {
                if (l.option("disable")) {
                    return;
                }
                var n = o.keyCode;
                if (n === 37 || n === 38) {
                    l.previous();
                    return false;
                } else {
                    if (n === 39 || n === 40) {
                        l.next();
                        return false;
                    } else {
                        if (n === 13) {
                            j(o);
                        } else {
                            if (n === 8) {
                                return false;
                            }
                        }
                    }
                }
            });
        },
        _cur: function(k) {
            var j = this,
            l = (k == null) ? j.option("index") : k,
            m = j.option("suggest").find("a:eq(" + l + ")");
            return m;
        },
        _drawHtml: function() {
            var k = this;
            var m = ['<div class="yselector">', '<div class="yselector_box">', '<div class="yselector_arraw"><b></b></div>', '<span class="yselector_input" tabindex="0"></span>', "</div>", '<div style="display:none;" class="yselector_suggest">', "<ul></ul>", "</div>", "</div>"];
            var j = d(m.join("\n")),
            l = k.option("holder").hide();
            l.after(j);
            k.option("jquery", j);
            k.option("suggest", d(".yselector_suggest", j));
            k.option("input", d(".yselector_input", j));
        },
        _drawSuggest: function() {
            var k = [],
            o,
            m = this,
            p = m.option("data");
            for (var n = 0, j = p.length; n < j; n++) {
                o = p[n];
                k.push('<li><a data-value="' + o.value + '" hidefocus="on" data-index="' + n + '"');
                k.push(' onclick="return false;" href="javascript:;" tabindex="-1">' + o.text + "</a></li>");
            }
            m.option("suggest").html("<ul>" + k.join("\n") + "</ul>");
        },
        _setOptions: function(o) {
            var k = this;
            k.options = d.extend({},
            a.options, o);
            var j = o.rawSelect,
            m = j.options,
            l = j.selectedIndex,
            n;
            var p = function() {
                var s = [];
                for (var r = 0, q = m.length; r < q; r++) {
                    n = m[r];
                    s.push({
                        value: n.value || n.text,
                        text: n.text
                    });
                }
                return s;
            };
            k.option("holder", d(j));
            k.option("index", o.index != null ? o.index: l);
            k._drawHtml();
            k.setOptions(p());
            d(j).bind("update",
            function() {
                k.setOptions(p());
            });
        },
        _getByValue: function(p, m) {
            if (!p) {
                return;
            }
            var o = this.option("data"),
            n;
            m = m || "value";
            for (var k = 0, j = o.length; k < j; k++) {
                n = o[k];
                if (n[m] == p) {
                    return n;
                }
            }
        },
        _setByObject: function(p, o) {
            p = p || {};
            if (!o && this.option("index") === p.index) {
                return;
            }
            var k = this,
            n = k.option("onselect"),
            l = k.option("onchange");
            var q = n ? n(p.text) : (p.text || "");
            k.option("value", p.value || "");
            k.option("text", q);
            k.option("index", p.index || 0);
            var m = k.option("holder"),
            j = k.option("input");
            if (m) {
                m[0].selectedIndex = p.index;
            }
            if (j) {
                k.option("input").text(q);
            }
            if (l) {
                l.call(k, p);
            }
            d(d.fn.yselector.events).trigger("change", [k, p, k.option("holder")]);
        },
        _triggerClass: function(m, l) {
            var k = this;
            if (m === l) {
                return;
            }
            k._cur(m).removeClass(c);
            k._cur(l).addClass(c);
        },
        _show: function() {
            var l = this,
            q = l.option("suggest"),
            m = l.option("index"),
            p = l.option("direction");
            l._drawSuggest();
            var n = q.find("a");
            n.eq(m).addClass(c);
            q.show();
            var k = l.option("maxRows");
            var j = Math.min(n.size(), k) * n.height();
            var o = p === "top" ? 0 - j - l.option("jquery").height() : 0;
            q.find("ul").css("height", j).css("top", o);
        },
        _hide: function() {
            this.option("suggest").hide();
        },
        setOptions: function(q) {
            var o = this,
            n = o.option("jquery");
            q = q || [];
            var j = o.option("holder")[0];
            j.length = 0;
            for (var p = 0, k = q.length, m; p < k; p++) {
                m = q[p];
                m.index = p;
                j.options.add(new Option(m.text, m.value));
            }
            o.option("data", q);
            if (!q.length && o.option("emptyHidden")) {
                n.hide();
            } else {
                n.show();
            }
            o._setByObject(q[o.option("index")] || q[0], true);
        },
        first: function() {
            return this.option("data")[0] || {};
        },
        option: function(j, k) {
            if (k != null) {
                this.options[j] = k;
            } else {
                return this.options[j];
            }
        },
        previous: function() {
            var j = this,
            k = j.index() - 1;
            if (k < 0) {
                k = j.option("data").length + k;
            }
            j.index(k);
        },
        next: function() {
            var j = this;
            j.index(j.option("index") + 1);
        },
        index: function(l) {
            var j = this;
            if (l == null) {
                return j.option("index");
            }
            var m = j.option("data"),
            n = m[l],
            k = j.option("index");
            if (!n) {
                n = j.first();
                l = 0;
            }
            j._setByObject(n);
        },
        val: function(l, k) {
            var j = this;
            if (l == null) {
                return j.option("value");
            }
            var m = j._getByValue(l);
            if (m == null) {
                m = j.first();
            }
            j._setByObject(m, k);
        },
        text: function(l) {
            var j = this;
            if (l == null) {
                return j.option("text");
            }
            var k = j._getByValue(l, "text");
            if (k == null) {
                k = j.first();
            }
            j._setByObject(k);
        },
        disable: function() {
            this.option("jquery").addClass("disble");
            this.option("disable", true);
        },
        enable: function() {
            this.option("jquery").removeClass("disble");
            this.option("disable", false);
        }
    };
    d.fn.extend({
        yselector: function(j) {
            d.fn.yselector.events = {};
            this.each(function(l, m) {
                var k = d(this);
                var n = k.data(f);
                if (!n) {
                    j = j || {};
                    j.rawSelect = k[0];
                    n = new a();
                    k.data(f, n);
                    n._init(j);
                }
                return n;
            });
            return this;
        }
    });
})(this);
(function(g) {
    if (!g.bui) {
        g.bui = {};
    }
    var b = {};
    var a = {};
    var c = /^\d+$/;
    jQuery.expr[":"].focus = function(h) {
        return h === document.activeElement && (h.type || h.href);
    };
    function e(h) {
        if (typeof h == "string") {
            if (c.test(h)) {
                return parseInt(h, 10);
            }
        }
        return h;
    }
    function d(h, i) {
        if (h.compareDocumentPosition) {
            return h === i || !!(h.compareDocumentPosition(i) & 16);
        }
        if (h.contains && i.nodeType === 1) {
            return h.contains(i) && h !== i;
        }
        while ((i = i.parentNode)) {
            if (i === h) {
                return true;
            }
        }
        return false;
    }
    g.RegisterUI = function(h, i) {
        if (b[h]) {
            return;
        }
        i = i || {};
        b[h] = function(k) {
            var j = this;
            this.el = k;
            this.$el = g(k);
            this._options = {};
            this._plugins = {};
            g.each(i.propertychange || {},
            function(m, l) {
                j.on(m + "_changed", l);
            });
            g.each(i.properties || {},
            function(m, l) {
                j._options[m] = l;
            });
        };
        b[h].prototype = g.extend({
            options: function(k) {
                var j = this;
                g.each(k,
                function(l, m) {
                    j.set(l, m);
                });
            },
            dom: function() {
                return this.el;
            },
            plugins: function(j, k) {
                if (k) {
                    this._plugins[j] = k;
                } else {
                    return this._plugins[j];
                }
            },
            data: function(j, k) {
                if (arguments.length == 1) {
                    return this.get(j) || this.$el.data(h + "-" + j);
                } else {
                    this.$el.data(h + "-" + j, k);
                    this.set(j, k);
                }
            },
            set: function(j, l, k) {
                l = e(l);
                var m = {
                    name: j,
                    new_value: l,
                    old_value: this.get(j)
                };
                if (k != true) {
                    g(this).trigger(j + "_before_change", [m]);
                }
                this._options[j] = m.new_value;
                if (k != true) {
                    g(this).trigger(j + "_changed", [l]);
                }
            },
            get: function(j) {
                return this._options[j];
            },
            on: function(j, k) {
                g(this).bind(j, k);
            },
            un: function(j) {
                g(this).unbind(j);
            },
            fire: function() {
                var j = g(this);
                j.trigger.apply(j, Array.prototype.slice.apply(arguments));
            }
        },
        i);
        g.fn[h] = function(l) {
            l = l || {};
            if (g.isPlainObject(l)) {
                return g.each(this,
                function() {
                    var o = g(this).data(h);
                    if (!o) {
                        var p = new b[h](this);
                        g(this).data(h, p);
                        p.options(l);
                        p.initialize();
                    } else {
                        g(this).data(h).options(l);
                    }
                });
            } else {
                if (typeof l == "string") {
                    var j = arguments[0];
                    var k = Array.prototype.slice.call(arguments, 1);
                    var m = g(this).data(h);
                    if (g.isFunction(m[j])) {
                        return m[j].apply(m, k);
                    }
                }
            }
            return this;
        };
    };
    g.RegisterPlugin = function(i, m, l, k) {
        if (!b[i]) {
            alert("not found UI[" + i + "]");
            return;
        }
        var j = a[i] = a[i] || {};
        var h = j[m] = j[m] || {};
        h[l] = k;
    };
    g.usePlugin = function(i, h) {
        g.each(a[h],
        function(k, j) {
            g.each(j,
            function(l, n) {
                if (i.data(k) === l) {
                    var m = function() {
                        this.ui = i;
                        this.initialize();
                    };
                    m.prototype = n;
                    i.plugins(k, new m());
                }
            });
        });
    };
    var f = g.fn.val;
    jQuery.fn.val = function(h) {
        var i = this[0];
        if (i && i.qcbox) {
            if (h != null) {
                if (g.trim(h) == "") {
                    i.qcbox.showPlaceHolder();
                } else {
                    i.qcbox.hidePlaceHolder();
                }
            }
        }
        return f.apply(this, Array.prototype.slice.apply(arguments));
    };
    g.RegisterUI("qcbox", {
        initialize: function() {
            var j = this;
            var l = this.$el;
            l[0].qcbox = this;
            var n = null;
            var m = this.data("customclass");
            var h = this.$wrap = l.wrap('<div class="qunar-qcbox' + (m ? " " + m: "") + '"></div>').before('<div class="qcbox-placeholder"></div>').before('<div class="qcbox-prefix"></div><div class="qcbox-info"><b /></div>').after('<div class="qcbox-fixed"></div>').parent();
            var k = this.$fixed = h.find(".qcbox-fixed");
            var i = this.$handler = h.find(".qcbox-info b");
            l.addClass("textbox");
            if (this.data("hideicon")) {
                i.hide();
            }
            h.click(function(o) {
                j.fire("qcbox-focus");
            });
            g(document.body).bind("mouseup",
            function(o) {
                if (g(o.target).closest(".qunar-qcbox").length == 0) {
                    j.fire("qcbox-blur");
                }
            });
            h.mouseup(function(o) {
                l.focus();
            });
            l.bind("blur",
            function() {
                j.resetPlaceHolder();
            });
            l.bind("focus",
            function() {
                j.hidePlaceHolder();
                this.select();
            });
            l.keyup(function(o) {
                switch (o.keyCode) {
                case 9:
                    h.find(".qcbox-placeholder").hide();
                    break;
                default:
                    break;
                }
            });
            this._resetWidth();
            g.usePlugin(j, "qcbox");
            this._resetHotcity();
            this._resetPlaceHolder();
        },
        _resetHotcity: function() {
            var n = this.plugins("hotcity");
            if (!n) {
                return;
            }
            var j = 0;
            var m = this;
            var l = this.$el;
            var i = this.$wrap;
            n.attachedEl = n.attachedEl || new g();
            this.$el.keydown(function(o) {
                k();
            });
            n.attachedEl = n.attachedEl.add(i.find(".qcbox-info > b , .qcbox-info")).add(i.find(".qcbox-info > b , .qcbox-info > .qcbox-text ").add(i.find(".qcbox-placeholder")));
            g(document).bind("mouseup",
            function(p) {
                var o;
                if ((l[0] === p.target && (o = 1)) || ~n.attachedEl.index(p.target) && (o = 2)) {
                    if (!n.$hotcity || !n.$hotcity.is(":visible")) {
                        h();
                    } else {
                        k();
                    }
                    if (o == 2) {
                        l.focus();
                    }
                    return;
                }
                if (!g(p.target).data("hotcity-nogo") && g(p.target).parents("[data-hotcity-nogo]").length == 0) {
                    k();
                }
            });
            function h() {
                var o = m.$el;
                var p = m.$fixed;
                if (!n.initialized) {
                    p.empty();
                    n.$hotcity = p.append("<div class='hotcity'><div>").find(".hotcity");
                    n.initializeStruct();
                    n.initialized = true;
                }
                g(n).trigger("hotcity-preshow", [n]);
                n.$hotcity.show();
                j = 1;
                g(n).trigger("hotcity-show");
            }
            function k() {
                if (typeof n == "undefined" || !n.$hotcity) {
                    return;
                }
                n.$hotcity.hide();
                j = 0;
                g(n).trigger("hotcity-hide");
            }
            n.showHotcity = h;
            n.hideHotcity = k;
        },
        _resetPlaceHolder: function() {
            var i = this;
            var l = this.$wrap.find(".qcbox-placeholder");
            function k() {
                var m = i.$el.val();
                if (g.trim(m) == "") {
                    h();
                } else {
                    j();
                }
            }
            function h() {
                l.text(i.data("placeholder"));
                l.show();
            }
            function j() {
                l.hide();
            }
            k();
            this.showPlaceHolder = h;
            this.hidePlaceHolder = j;
            this.resetPlaceHolder = k;
        },
        _resetWidth: function() {
            var j = this.$el;
            var h = this.$wrap;
            var i = this.data("prefix");
            if (i) {
                h.find(".qcbox-prefix").text(i);
                j.css({
                    "margin-left": h.find(".qcbox-prefix").outerWidth(true) + "px"
                });
            } else {
                h.find(".qcbox-prefix").remove();
            }
            h.find(".qcbox-placeholder").css({
                width: j.width(),
                left: j.css("margin-left"),
                "padding-left": j.css("padding-left"),
                height: j.height(),
                "line-height": j.height() + "px"
            });
        }
    });
})(jQuery);
(function(f) {
    var g = (function() {
        var n = "data-detect-oninput",
        k = {},
        m = {},
        o = 1,
        p = 1;
        var q = function(t, v, u, s) {
            if (t.addEventListener) {
                t.addEventListener(v, u, false);
            } else {
                if (t.attachEvent) {
                    t.attachEvent("on" + v, u);
                }
            } (k[s] || (k[s] = [])).push({
                t: v,
                h: u
            });
        };
        var r = function(v, s) {
            if (!k[s]) {
                return;
            }
            for (var u = 0, t; t = k[s][u]; u++) {
                if (v.removeEventListener) {
                    v.removeEventListener(t.t, t.h, false);
                } else {
                    if (v.detachEvent) {
                        v.detachEvent("on" + t.t, t.h);
                    }
                }
            }
            delete k[s];
        };
        var l = function(u, v) {
            var t = u.value;
            var s = function() {
                var w;
                if ((w = u.value) !== t) {
                    if (s._sleep !== true) {
                        v.call(u, w, t);
                    }
                    t = u.value;
                }
            };
            return s;
        };
        var j = navigator.userAgent.toLowerCase();
        return {
            version: "1.3",
            bind: function(t, x) {
                var u, s = x[n];
                if (!s) {
                    x[n] = s = o++;
                }
                if (! (u = t.getAttribute(n))) {
                    t.setAttribute(n, u = "" + p++);
                }
                var v = l(t, x);
                if ("oninput" in t && !/msie\s9/.test(j) && !/opera/.test(j)) {
                    q(t, "input", v, s);
                } else {
                    var w;
                    q(t, "focus",
                    function() {
                        if (!w) {
                            w = setInterval(v, 100);
                        }
                    },
                    s);
                    q(t, "blur",
                    function() {
                        if (w) {
                            clearInterval(w);
                            w = null;
                        }
                    },
                    s);
                }
                m[s] = {
                    eid: u,
                    checker: v
                };
                return t;
            },
            unbind: function(s, t) {
                if (t[n]) {
                    r(s, t[n]);
                    delete m[t[n]];
                }
                return s;
            },
            set: function(t, y) {
                var v = t.getAttribute(n);
                if (v) {
                    var x = [];
                    for (var u in m) {
                        if (m[u]["eid"] === v) {
                            x.push(m[u]["checker"]);
                            m[u]["checker"]._sleep = true;
                        }
                    }
                    t.value = y;
                    for (var w = 0, s = x.length; w < s; w++) {
                        x[w].call(t);
                        x[w]._sleep = false;
                    }
                } else {
                    t.value = y;
                }
            }
        };
    })();
    f.qsuggest = {
        version: "1.2"
    };
    var i = f.qsuggest.ROOT_KEY = "q-suggest";
    var d = 0;
    var c = {
        ajax: {
            url: null,
            cache: false,
            success: function() {}
        },
        reader: function(j) {
            return j;
        },
        loader: function(j) {
            return j;
        },
        max: 10,
        min: 1,
        container: null,
        delay: 100,
        rdelay: 1000,
        requestWithNothing: false,
        trimQuery: true,
        autoSelect: true,
        css: {
            "z-index": 500
        },
        setValue: function(j) {
            return j;
        },
        render: function(j) {
            return String(j).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        exattr: function(j) {
            return j;
        }
    };
    function b(j) {
        var k = j.offset();
        k.top += j.outerHeight();
        return k;
    }
    function h(j) {
        return j.closest("table").data("data")[j.attr("data-ind") * 1];
    }
    function a(r) {
        var s = this;
        var o = s.visible();
        var l = r.keyCode;
        if (l === 40 && !o) {
            s.show();
            return;
        }
        var j = s.el.find("tr");
        var q = j.filter(".active");
        switch (l) {
        case 38:
        case 40:
            if (o) {
                s._excludeEl = s._mouseFocus;
                q.removeClass("active");
                var k = r.keyCode === 38 ? q.prev() : q.next();
                if (k.size() === 0) {
                    k = j.filter(l === 38 ? ":last": ":first");
                }
                var m = s.args.getData || h;
                var n = m(k);
                s.setValue(n);
                k.addClass("active");
                r.preventDefault();
                s._trigger("q-suggest-user-action", [r.type, n, l]);
            }
            break;
        case 13:
        case 27:
            if (o) {
                s.hide();
                s._trigger("q-suggest-user-action", [r.type, s.getValue(), l]);
            }
            break;
        case 18:
        case 9:
            break;
        default:
        }
    }
    function e(k, j) {
        if (!this.init) {
            return new qsuggest(k, j);
        } else {
            return this.init(k, j);
        }
    }
    f.extend(e.prototype, {
        init: function(m, l) {
            this.key = ++d;
            var n = this.ns = i + this.key;
            l = this.args = f.extend(true, {},
            c, l || {});
            var o = this.activeEl = f(m);
            var k = this;
            this.el = f('<div class="' + i + (l.customClass ? " " + l.customClass: "") + '"></div>').appendTo(l.container || document.body).hide();
            this.el.data(i, this);
            this._handler = null;
            this._ajaxHandler = null;
            this._excludeEl = null;
            this._mouseFocus = null;
            this._last = [];
            this._cache = {};
            this._value = null;
            f.each(l.on || {},
            function(q, p) {
                o.bind(q + "." + n, p);
            });
            if (l.css) {
                this.el.css(k.args.css);
            }
            var k = this;
            var j = false;
            o.bind("keydown." + n,
            function(p) {
                var q = p.keyCode;
                if (q >= 229) {
                    j = true;
                }
            });
            g.bind(o[0],
            function() {
                k._trigger("q-suggest-inputChange");
                k.show();
            });
            o.bind("keydown." + n,
            function(p) {
                if (j) {
                    j = false;
                    return;
                }
                var q = k.args.keyevent || a;
                q.call(k, p);
                j = false;
            });
            o.bind("blur." + n,
            function(q) {
                if (k.visible()) {
                    var r = k.el.find("tr.active");
                    if (r.length > 0) {
                        var p = k.args.getData || h;
                        if (k.args.autoSelect) {
                            k.setValue(p(r));
                        }
                    } else {
                        k._trigger("q-suggest-noresult", [o]);
                    }
                    k.hide();
                }
            });
            f("tr", this.el[0]).live("mouseover." + n + " mouseout." + n + " mousedown." + n,
            function(q) {
                var s = f.nodeName(q.target, "tr") ? f(q.target) : f(q.target).parents("tr").eq(0);
                if (f(s[0]).attr("data-sug_type") == 1) {
                    q.preventDefault();
                    return;
                }
                var r = s[0] != k._excludeEl;
                if (q.type === "mouseover") {
                    if (r) {
                        s.parents().children().removeClass("active");
                        s.addClass("active");
                        k._excludeEl = null;
                    }
                    k._mouseFocus = s[0];
                } else {
                    if (q.type === "mouseout") {
                        k._mouseFocus = null;
                    } else {
                        var p = k.args.getData || h;
                        k.setValue(p(s));
                        k.hide();
                        k._trigger("q-suggest-user-action", [q.type, k.getValue(), null]);
                    }
                }
            });
            return this;
        },
        req: function() {
            var j = this;
            if (j._handler) {
                clearTimeout(j._handler);
            }
            if (j._timeoutHandler) {
                clearTimeout(j._timeoutHandler);
                j._timeoutHandler = null;
            }
            if (j._ajaxHandler) {
                j._ajaxHandler = null;
            }
            j._handler = setTimeout(function() {
                var l = j.activeEl.val(),
                p = j.args.loader(l),
                o = null,
                k;
                if (j.args.trimQuery) {
                    p = f.trim(p);
                }
                if (!p && !j.args.requestWithNothing) {
                    j.draw(null);
                    return;
                }
                if (j._last && j._last[0] === p) {
                    j.draw(j._last[1]);
                    return;
                }
                if (j._last && j._last[0] == p) {
                    o = j._last;
                } else {
                    if (j.args.cache && j._cache[p]) {
                        o = j._cache[p];
                    }
                }
                var m = typeof j.args.ajax.url == "function" ? j.args.ajax.url() : j.args.ajax.url;
                if (o) {
                    j.draw((j._last = o)[1]);
                } else {
                    if (!m) {
                        j.draw(null);
                    } else {
                        m = m.replace(/\*([^*]+)$/, encodeURIComponent(p) + "$1");
                        var n = j.args.ajax.success;
                        j._timeoutHandler = setTimeout(function() {
                            j.hide();
                        },
                        j.args.rdelay);
                        j._ajaxHandler = f.ajax(f.extend({},
                        j.args.ajax, {
                            url: m,
                            success: function(s, q) {
                                clearTimeout(j._timeoutHandler);
                                j._timeoutHandler = null;
                                j._ajaxHandler = null;
                                if (l !== j.activeEl.val()) {
                                    return;
                                }
                                var r = j.args.reader.call(j, s, q);
                                if (j.type(r) === "Array") {
                                    j.draw(r, s);
                                    j._last = j._cache[p] = [p, r, q];
                                }
                                n.apply(this, arguments);
                            }
                        }));
                    }
                }
            },
            j.args.delay);
        },
        type: function(j) {
            return Object.prototype.toString.call(j).slice(8, -1);
        },
        show: function() {
            this.req();
        },
        hide: function() {
            if (this.visible()) {
                this.el.hide();
                this._trigger("q-suggest-hide");
            }
        },
        draw: function(m, t) {
            this.el.empty();
            var l = this.args.min,
            p = this.args.max;
            if (!m || !m.length || m.length < l) {
                this.hide();
                return;
            }
            var q = [],
            j = this.args.render,
            n = this.args.exattr,
            s = true;
            q.push('<table cellspacing="0" cellpadding="2"><tbody>');
            f.each(m,
            function(r, o) {
                if (r >= p) {
                    return false;
                }
                var u = "";
                if (o.type !== 1 && s) {
                    s = false;
                    u = ' class="active';
                }
                if (o.exClass) {
                    u = u ? u + " " + o.exClass + '" ': ' class="' + o.exClass + '" ';
                } else {
                    u = u ? u + '" ': "";
                }
                q.push("<tr", u, ' data-ind="', r, '" ', n(o), "><td>", j(o), "</td></tr>");
            });
            q.push("</tbody></table>");
            this._trigger("q-suggest-beforeshow", [this.el, t]);
            var k = f(q.join("")).appendTo(this.el).data("data", m);
            if (!this.args.container) {
                this.el.css(b(this.activeEl));
            }
            this.el.show();
            this._trigger("q-suggest-show", [m]);
        },
        dispose: function() {
            this._trigger("q-suggest-dispose");
            this.activeEl.unbind("." + this.ns);
            f(window).unbind("." + this.ns);
            this.el.remove();
        },
        visible: function() {
            return this.el.is(":visible");
        },
        _trigger: function() {
            this.activeEl.triggerHandler.apply(this.activeEl, arguments);
        },
        setValue: function(j) {
            g.set(this.activeEl[0], j);
            this._value = j;
            this._setExtData();
            this._trigger("q-suggest-setvalue", [j, this.activeEl]);
        },
        _setExtData: function() {
            var j = this.args.getExtData ? this.args.getExtData(this.el.find("tr.active")) : {};
            this._trigger("q-suggest-setextdata", [j, this.activeEl]);
        },
        getValue: function() {
            return this._value;
        },
        set: function(m, n) {
            var o = false;
            switch (m) {
            case "container":
                this.el.appendTo(n || document.body);
                this.el.css({
                    top: "",
                    left: ""
                });
                break;
            }
            if (!o) {
                for (var l = 0, k = m.split("."), j = k.length, p = this.args; l < j && (l !== j - 1 && (p[k[l]] || (p[k[l]] = {})) || (p[k[l]] = n)); p = p[k[l]], l++) {}
            }
            return n;
        },
        get: function(m) {
            for (var l = 0, n = this.args, k = m.split("."), j = k.length; l < j && (n = n[k[l]]); l++) {}
            return n;
        }
    });
    f.fn.qsuggest = function() {
        var j = arguments;
        if (arguments.length > 1 && this.data(i)) {
            var k = null;
            if (arguments[0] === "option" || arguments[0] === "setting") {
                this.each(function(o, n) {
                    var m = f(n);
                    var l = this.data(i);
                    if (l) {
                        k = k || (j.length > 2 ? l.set(j[1], j[2]) : l.get(j[1]));
                    }
                });
            }
            return k;
        } else {
            if (arguments.length <= 1) {
                this.each(function(o, n) {
                    var m = f(n);
                    if (m.data(i)) {
                        m.data(i).dispose();
                        m.removeData(i);
                    }
                    var l = new e(n, j[0]);
                    m.data(i, l);
                });
            }
        }
        return this;
    };
})(jQuery);
(function(e) {
    e.qhistory = {};
    var i = null;
    var j = null;
    var d = "#js_ifrmHistory";
    var h = "http://history.qunar.com/history/newhistory.html";
    function g(m) {
        var l = m.contentWindow.QunarHistory;
        i = a(l);
        j = f(l);
    }
    function a(l) {
        var r = l.findEntries("SF");
        var q = l.findEntries("DL");
        var t = [],
        p = [],
        s = [],
        m = [];
        e.each(r,
        function(u, v) {
            if (b(v)) {
                t.push(k(v));
                return false;
            }
        });
        e.each(r,
        function(u, v) {
            if (!b(v)) {
                p.push(k(v));
                return false;
            }
        });
        e.each(q,
        function(u, v) {
            v.roundtrip = true;
            if (b(v)) {
                s.push(k(v));
                return false;
            }
        });
        e.each(q,
        function(u, v) {
            v.roundtrip = true;
            if (!b(v)) {
                m.push(k(v));
                return false;
            }
        });
        var o = [],
        n = [];
        o = o.concat(p).concat(m);
        n = n.concat(t).concat(s);
        o.sort(function(v, u) {
            return parseInt(u.timestamp, 10) - parseInt(v.timestamp, 10);
        });
        n.sort(function(v, u) {
            return parseInt(u.timestamp, 10) - parseInt(v.timestamp, 10);
        });
        return {
            domesticFirst: o[0],
            interFirst: n[0]
        };
    }
    function f(l) {
        return {
            HL: l.findEntries("HL")[0],
            HDL: l.findEntries("HDL")[0],
            HBL: l.findEntries("HBL")[0],
            HLL: l.findEntries("HLL")[0]
        };
    }
    function b(p) {
        var m = p.fromCountry;
        var o = p.toCountry;
        var n = m;
        var l = o;
        if (~m.indexOf("-")) {
            n = m.split("-")[0];
            l = m.split("-")[1];
        }
        p.fromCountry = n;
        p.toCountry = l;
        return c(n) !== "中国" || c(l) !== "中国";
    }
    function c(l) {
        return decodeURIComponent(l);
    }
    function k(l) {
        e.each(l,
        function(n, m) {
            l[n] = c(m);
        });
        return l;
    }
    e.qhistory.init = function(l) {
        var m = e(l.frameid || d);
        m.attr("src", l.src || h);
        m.bind("load",
        function() {
            g(m[0]);
            var n = {
                flight: i,
                hotel: j
            };
            var o = l.success ||
            function() {};
            o(n);
        });
    };
})(jQuery);
(function() {
    var a = {};
    $.qload = function(c, d) {
        var b = ["http://qunarzz.com/home/prd/scripts/geilivible/release/", c, "-", QZZVERSION, ".js"].join("");
        if (a[c]) {
            return;
        }
        $.ajax({
            url: b,
            dataType: "script",
            cache: true,
            success: function() {
                a[c] = true;
                d();
            }
        });
    };
})();
var Hogan = {};
(function(j, h) {
    j.Template = function(o, p, n, m) {
        this.r = o || this.r;
        this.c = n;
        this.options = m;
        this.text = p || "";
        this.buf = (h) ? [] : "";
    };
    j.Template.prototype = {
        r: function(o, n, m) {
            return "";
        },
        v: c,
        t: e,
        render: function b(o, n, m) {
            return this.ri([o], n || {},
            m);
        },
        ri: function(o, n, m) {
            return this.r(o, n, m);
        },
        rp: function(o, q, p, m) {
            var n = p[o];
            if (!n) {
                return "";
            }
            if (this.c && typeof n == "string") {
                n = this.c.compile(n, this.options);
            }
            return n.ri(q, p, m);
        },
        rs: function(p, o, q) {
            var m = p[p.length - 1];
            if (!g(m)) {
                q(p, o, this);
                return;
            }
            for (var n = 0; n < m.length; n++) {
                p.push(m[n]);
                q(p, o, this);
                p.pop();
            }
        },
        s: function(s, n, q, o, t, m, p) {
            var r;
            if (g(s) && s.length === 0) {
                return false;
            }
            if (typeof s == "function") {
                s = this.ls(s, n, q, o, t, m, p);
            }
            r = (s === "") || !!s;
            if (!o && r && n) {
                n.push((typeof s == "object") ? s: n[n.length - 1]);
            }
            return r;
        },
        d: function(q, n, p, r) {
            var s = q.split("."),
            t = this.f(s[0], n, p, r),
            m = null;
            if (q === "." && g(n[n.length - 2])) {
                return n[n.length - 1];
            }
            for (var o = 1; o < s.length; o++) {
                if (t && typeof t == "object" && s[o] in t) {
                    m = t;
                    t = t[s[o]];
                } else {
                    t = "";
                }
            }
            if (r && !t) {
                return false;
            }
            if (!r && typeof t == "function") {
                n.push(m);
                t = this.lv(t, n, p);
                n.pop();
            }
            return t;
        },
        f: function(q, m, p, r) {
            var t = false,
            n = null,
            s = false;
            for (var o = m.length - 1; o >= 0; o--) {
                n = m[o];
                if (n && typeof n == "object" && q in n) {
                    t = n[q];
                    s = true;
                    break;
                }
            }
            if (!s) {
                return (r) ? false: "";
            }
            if (!r && typeof t == "function") {
                t = this.lv(t, m, p);
            }
            return t;
        },
        ho: function(s, m, p, r, o) {
            var q = this.c;
            var n = this.options;
            n.delimiters = o;
            var r = s.call(m, r);
            r = (r == null) ? String(r) : r.toString();
            this.b(q.compile(r, n).render(m, p));
            return false;
        },
        b: (h) ?
        function(m) {
            this.buf.push(m);
        }: function(m) {
            this.buf += m;
        },
        fl: (h) ?
        function() {
            var m = this.buf.join("");
            this.buf = [];
            return m;
        }: function() {
            var m = this.buf;
            this.buf = "";
            return m;
        },
        ls: function(n, u, r, o, m, p, v) {
            var q = u[u.length - 1],
            s = null;
            if (!o && this.c && n.length > 0) {
                return this.ho(n, q, r, this.text.substring(m, p), v);
            }
            s = n.call(q);
            if (typeof s == "function") {
                if (o) {
                    return true;
                } else {
                    if (this.c) {
                        return this.ho(s, q, r, this.text.substring(m, p), v);
                    }
                }
            }
            return s;
        },
        lv: function(q, o, p) {
            var n = o[o.length - 1];
            var m = q.call(n);
            if (typeof m == "function") {
                m = e(m.call(n));
                if (this.c && ~m.indexOf("{\u007B")) {
                    return this.c.compile(m, this.options).render(n, p);
                }
            }
            return e(m);
        }
    };
    var i = /&/g,
    d = /</g,
    a = />/g,
    l = /\'/g,
    k = /\"/g,
    f = /[&<>\"\']/;
    function e(m) {
        return String((m === null || m === undefined) ? "": m);
    }
    function c(m) {
        m = e(m);
        return f.test(m) ? m.replace(i, "&amp;").replace(d, "&lt;").replace(a, "&gt;").replace(l, "&#39;").replace(k, "&quot;") : m;
    }
    var g = Array.isArray ||
    function(m) {
        return Object.prototype.toString.call(m) === "[object Array]";
    };
})(typeof exports !== "undefined" ? exports: Hogan, true);
(function(n) {
    var f = /\S/,
    j = /\"/g,
    o = /\n/g,
    k = /\r/g,
    u = /\\/g,
    a = {
        "#": 1,
        "^": 2,
        "/": 3,
        "!": 4,
        ">": 5,
        "<": 6,
        "=": 7,
        _v: 8,
        "{": 9,
        "&": 10
    };
    n.scan = function m(G, B) {
        var O = G.length,
        y = 0,
        D = 1,
        x = 2,
        z = y,
        C = null,
        Q = null,
        P = "",
        J = [],
        F = false,
        N = 0,
        K = 0,
        H = "{{",
        M = "}}";
        function L() {
            if (P.length > 0) {
                J.push(new String(P));
                P = "";
            }
        }
        function A() {
            var S = true;
            for (var R = K; R < J.length; R++) {
                S = (J[R].tag && a[J[R].tag] < a._v) || (!J[R].tag && J[R].match(f) === null);
                if (!S) {
                    return false;
                }
            }
            return S;
        }
        function I(U, R) {
            L();
            if (U && A()) {
                for (var S = K, T; S < J.length; S++) {
                    if (!J[S].tag) {
                        if ((T = J[S + 1]) && T.tag == ">") {
                            T.indent = J[S].toString();
                        }
                        J.splice(S, 1);
                    }
                }
            } else {
                if (!R) {
                    J.push({
                        tag: "\n"
                    });
                }
            }
            F = false;
            K = J.length;
        }
        function E(V, S) {
            var U = "=" + M,
            R = V.indexOf(U, S),
            T = q(V.substring(V.indexOf("=", S) + 1, R)).split(" ");
            H = T[0];
            M = T[1];
            return R + U.length - 1;
        }
        if (B) {
            B = B.split(" ");
            H = B[0];
            M = B[1];
        }
        for (N = 0; N < O; N++) {
            if (z == y) {
                if (w(H, G, N)) {--N;
                    L();
                    z = D;
                } else {
                    if (G.charAt(N) == "\n") {
                        I(F);
                    } else {
                        P += G.charAt(N);
                    }
                }
            } else {
                if (z == D) {
                    N += H.length - 1;
                    Q = a[G.charAt(N + 1)];
                    C = Q ? G.charAt(N + 1) : "_v";
                    if (C == "=") {
                        N = E(G, N);
                        z = y;
                    } else {
                        if (Q) {
                            N++;
                        }
                        z = x;
                    }
                    F = N;
                } else {
                    if (w(M, G, N)) {
                        J.push({
                            tag: C,
                            n: q(P),
                            otag: H,
                            ctag: M,
                            i: (C == "/") ? F - M.length: N + H.length
                        });
                        P = "";
                        N += M.length - 1;
                        z = y;
                        if (C == "{") {
                            if (M == "}}") {
                                N++;
                            } else {
                                r(J[J.length - 1]);
                            }
                        }
                    } else {
                        P += G.charAt(N);
                    }
                }
            }
        }
        I(F, true);
        return J;
    };
    function r(x) {
        if (x.n.substr(x.n.length - 1) === "}") {
            x.n = x.n.substring(0, x.n.length - 1);
        }
    }
    function q(x) {
        if (x.trim) {
            return x.trim();
        }
        return x.replace(/^\s*|\s*$/g, "");
    }
    function w(x, B, z) {
        if (B.charAt(z) != x.charAt(0)) {
            return false;
        }
        for (var A = 1, y = x.length; A < y; A++) {
            if (B.charAt(z + A) != x.charAt(A)) {
                return false;
            }
        }
        return true;
    }
    function b(D, A, y, C) {
        var x = [],
        B = null,
        z = null;
        while (D.length > 0) {
            z = D.shift();
            if (z.tag == "#" || z.tag == "^" || e(z, C)) {
                y.push(z);
                z.nodes = b(D, z.tag, y, C);
                x.push(z);
            } else {
                if (z.tag == "/") {
                    if (y.length === 0) {
                        throw new Error("Closing tag without opener: /" + z.n);
                    }
                    B = y.pop();
                    if (z.n != B.n && !g(z.n, B.n, C)) {
                        throw new Error("Nesting error: " + B.n + " vs. " + z.n);
                    }
                    B.end = z.i;
                    return x;
                } else {
                    x.push(z);
                }
            }
        }
        if (y.length > 0) {
            throw new Error("missing closing tag: " + y.pop().n);
        }
        return x;
    }
    function e(A, y) {
        for (var z = 0, x = y.length; z < x; z++) {
            if (y[z].o == A.n) {
                A.tag = "#";
                return true;
            }
        }
    }
    function g(B, z, y) {
        for (var A = 0, x = y.length; A < x; A++) {
            if (y[A].c == B && y[A].o == z) {
                return true;
            }
        }
    }
    n.generate = function(x, A, y) {
        var z = 'var _=this;_.b(i=i||"");' + t(x) + "return _.fl();";
        if (y.asString) {
            return "function(c,p,i){" + z + ";}";
        }
        return new n.Template(new Function("c", "p", "i", z), A, n, y);
    };
    function v(x) {
        return x.replace(u, "\\\\").replace(j, '\\"').replace(o, "\\n").replace(k, "\\r");
    }
    function i(x) {
        return (~x.indexOf(".")) ? "d": "f";
    }
    function t(y) {
        var B = "";
        for (var A = 0, z = y.length; A < z; A++) {
            var x = y[A].tag;
            if (x == "#") {
                B += h(y[A].nodes, y[A].n, i(y[A].n), y[A].i, y[A].end, y[A].otag + " " + y[A].ctag);
            } else {
                if (x == "^") {
                    B += s(y[A].nodes, y[A].n, i(y[A].n));
                } else {
                    if (x == "<" || x == ">") {
                        B += d(y[A]);
                    } else {
                        if (x == "{" || x == "&") {
                            B += c(y[A].n, i(y[A].n));
                        } else {
                            if (x == "\n") {
                                B += l('"\\n"' + (y.length - 1 == A ? "": " + i"));
                            } else {
                                if (x == "_v") {
                                    B += p(y[A].n, i(y[A].n));
                                } else {
                                    if (x === undefined) {
                                        B += l('"' + v(y[A]) + '"');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return B;
    }
    function h(y, C, B, A, x, z) {
        return "if(_.s(_." + B + '("' + v(C) + '",c,p,1),c,p,0,' + A + "," + x + ',"' + z + '")){_.rs(c,p,function(c,p,_){' + t(y) + "});c.pop();}";
    }
    function s(x, z, y) {
        return "if(!_.s(_." + y + '("' + v(z) + '",c,p,1),c,p,1,0,0,"")){' + t(x) + "};";
    }
    function d(x) {
        return '_.b(_.rp("' + v(x.n) + '",c,p,"' + (x.indent || "") + '"));';
    }
    function c(y, x) {
        return "_.b(_.t(_." + x + '("' + v(y) + '",c,p,0)));';
    }
    function p(y, x) {
        return "_.b(_.v(_." + x + '("' + v(y) + '",c,p,0)));';
    }
    function l(x) {
        return "_.b(" + x + ");";
    }
    n.parse = function(y, z, x) {
        x = x || {};
        return b(y, "", [], x.sectionTags || []);
    },
    n.cache = {};
    n.compile = function(A, x) {
        x = x || {};
        var z = A + "||" + !!x.asString;
        var y = this.cache[z];
        if (y) {
            return y;
        }
        y = this.generate(this.parse(this.scan(A, x.delimiters), A, x), A, x);
        return this.cache[z] = y;
    };
})(typeof exports !== "undefined" ? exports: Hogan);
if (typeof define === "function" && define.amd) {
    define(Hogan);
}
function trackAction(c, b, a) {
    var d = "/track.htm?action=" + c + "&t=" + Date.parse(new Date());
    if (b) {
        d += "&rId=" + b;
    } else {
        if (trackAction.rid) {
            d += "&rId=" + trackAction.rid;
        }
    }
    if (a) {
        d = d.replace("track.htm", "timetrack.htm");
    }
    new Image().src = d;
}
function trackHotelCityBox(a, b) {
    new Image().src = "http://www.qunar.com/track.htm?_=" + new Date().getTime() + "&hotel=citybox&q=" + encodeURIComponent(a) + "&c=" + b;
}
function gaClk(b) {
    var g = window.QNRGA,
    h = +new Date();
    if (window.location.protocol.indexOf("https") >= 0 || !g) {
        return false;
    }
    if (typeof b === "string") {
        b = {
            a: b,
            t: h
        };
    }
    if (g.clk) {
        g.clk(b);
    } else {
        g = new g();
        g.add("utmwv", "0.1");
        g.add("t", Math.random());
        g.add("utmsr", screen.width + "*" + screen.height);
        g.add("utmasr", screen.availWidth + "*" + screen.availHeight);
        g.add("utmr", document.referrer || "-1");
        g.add("utmp", window.location.href.toString());
        g.add("utmhn", window.location.host.toString());
        g.add("s", window._ba_utm_s || null);
        if (window._ba_utm_ex) {
            var e = window._ba_utm_ex;
            for (var f in e) {
                g.add(f, e[f]);
            }
        }
        b = b || {};
        for (var f in b) {
            g.add(f, b[f]);
        }
        var i = [];
        var a = g.param;
        for (var c in a) {
            i.push(c + "=" + encodeURIComponent(a[c]));
        }
        i = i.join("&");
        var d = new Image();
        d.src = "http://bc.qunar.com/clk?" + i;
    }
}
function gaNotClk(e) {
    var d = window.QNRGA,
    c = +new Date();
    if (window.location.protocol.indexOf("https") >= 0 || !d) {
        return false;
    }
    if (typeof e === "string") {
        e = {
            a: e,
            t: c
        };
    }
    d = new d();
    d.add("utmwv", "0.1");
    d.add("t", Math.random());
    d.add("utmsr", screen.width + "*" + screen.height);
    d.add("utmasr", screen.availWidth + "*" + screen.availHeight);
    d.add("utmr", document.referrer || "-1");
    d.add("utmp", window.location.href.toString());
    d.add("utmhn", window.location.host.toString());
    d.add("s", window._ba_utm_s || null);
    if (window._ba_utm_ex) {
        var b = window._ba_utm_ex;
        for (var a in b) {
            d.add(a, b[a]);
        }
    }
    e = e || {};
    for (var a in e) {
        d.add(a, e[a]);
    }
    d.send();
}
var Cookie = {
    originalString: document.cookie,
    read: function() {
        this.originalString = document.cookie;
    },
    _getCookieHash: function() {
        var c = this.originalString.split(";");
        var b = {};
        for (var a = 0; a < c.length; a++) {
            if (c[a].indexOf("=") != -1) {
                b[c[a].split("=")[0].replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")] = unescape(c[a].split("=")[1]).replace(/(^\s*)/g, "").replace(/(\s*$)/g, "");
            }
        }
        return b;
    },
    setCookie: function(e, f, d, a, b) {
        var c = e + "=" + escape(f);
        if (d) {
            c += "; expires=" + d.toGMTString();
        }
        if (a) {
            c += "; domain=" + a;
        }
        if (b) {
            c += "; path=" + b;
        }
        document.cookie = c;
        this.originalString = document.cookie;
        this.values = this._getCookieHash();
    },
    deleteCookie: function(b) {
        var a = new Date(1);
        document.cookie = b + "=;expires=" + a.toGMTString();
        this.originalString = document.cookie;
        this.values = this._getCookieHash();
    },
    refresh: function() {
        this.read();
        Cookie.values = Cookie._getCookieHash();
    }
};
Cookie.values = Cookie._getCookieHash();
if (typeof(QNR) === "undefined") {
    QNR = {};
}
QNR.FlightSearchBoxConf = {
    hotCity: {
        domesticfrom: [{
            title: "热门",
            key: "domesticfrom"
        },
        {
            title: "ABCDE",
            key: "ABCDE"
        },
        {
            title: "FGHJ",
            key: "FGHJ"
        },
        {
            title: "KLMNP",
            key: "KLMNP"
        },
        {
            title: "QRSTW",
            key: "QRSTW"
        },
        {
            title: "XYZ",
            key: "XYZ"
        }],
        domesticto: [{
            title: "热门",
            key: "domesticto"
        },
        {
            title: "ABCDE",
            key: "ABCDE"
        },
        {
            title: "FGHJ",
            key: "FGHJ"
        },
        {
            title: "KLMNP",
            key: "KLMNP"
        },
        {
            title: "QRSTW",
            key: "QRSTW"
        },
        {
            title: "XYZ",
            key: "XYZ"
        }],
        interfrom: [{
            title: "热门",
            key: "interfrom"
        },
        {
            title: "ABCDE",
            key: "ABCDE"
        },
        {
            title: "FGHJ",
            key: "FGHJ"
        },
        {
            title: "KLMNP",
            key: "KLMNP"
        },
        {
            title: "QRSTW",
            key: "QRSTW"
        },
        {
            title: "XYZ",
            key: "XYZ"
        },
        {
            title: "国际·港澳台",
            key: "国际·港澳台"
        }],
        interto: [{
            title: "热门城市",
            key: "国际·港澳台"
        },
        {
            title: "亚洲/大洋洲",
            key: "亚洲/大洋洲"
        },
        {
            title: "美洲",
            key: "美洲"
        },
        {
            title: "欧洲",
            key: "欧洲"
        },
        {
            title: "非洲",
            key: "非洲"
        },
        {
            title: "国内",
            key: "domesticfrom"
        }],
        data: {
            domesticfrom: {
                cityList: [{
                    name: "上海",
                    country: "中国"
                },
                {
                    name: "北京",
                    country: "中国"
                },
                {
                    name: "广州",
                    country: "中国"
                },
                {
                    name: "昆明",
                    country: "中国"
                },
                {
                    name: "西安",
                    country: "中国"
                },
                {
                    name: "成都",
                    country: "中国"
                },
                {
                    name: "深圳",
                    country: "中国"
                },
                {
                    name: "厦门",
                    country: "中国"
                },
                {
                    name: "乌鲁木齐",
                    country: "中国"
                },
                {
                    name: "南京",
                    country: "中国"
                },
                {
                    name: "重庆",
                    country: "中国"
                },
                {
                    name: "杭州",
                    country: "中国"
                },
                {
                    name: "大连",
                    country: "中国"
                },
                {
                    name: "长沙",
                    country: "中国"
                },
                {
                    name: "海口",
                    country: "中国"
                },
                {
                    name: "哈尔滨",
                    country: "中国"
                },
                {
                    name: "青岛",
                    country: "中国"
                },
                {
                    name: "沈阳",
                    country: "中国"
                },
                {
                    name: "三亚",
                    country: "中国"
                },
                {
                    name: "济南",
                    country: "中国"
                },
                {
                    name: "武汉",
                    country: "中国"
                },
                {
                    name: "郑州",
                    country: "中国"
                },
                {
                    name: "贵阳",
                    country: "中国"
                },
                {
                    name: "南宁",
                    country: "中国"
                },
                {
                    name: "福州",
                    country: "中国"
                },
                {
                    name: "天津",
                    country: "中国"
                },
                {
                    name: "长春",
                    country: "中国"
                },
                {
                    name: "太原",
                    country: "中国"
                },
                {
                    name: "南昌",
                    country: "中国"
                },
                {
                    name: "丽江",
                    country: "中国"
                }],
                title: "热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            domesticto: {
                cityList: [{
                    name: "上海",
                    country: "中国"
                },
                {
                    name: "北京",
                    country: "中国"
                },
                {
                    name: "广州",
                    country: "中国"
                },
                {
                    name: "昆明",
                    country: "中国"
                },
                {
                    name: "西安",
                    country: "中国"
                },
                {
                    name: "成都",
                    country: "中国"
                },
                {
                    name: "深圳",
                    country: "中国"
                },
                {
                    name: "厦门",
                    country: "中国"
                },
                {
                    name: "乌鲁木齐",
                    country: "中国"
                },
                {
                    name: "南京",
                    country: "中国"
                },
                {
                    name: "重庆",
                    country: "中国"
                },
                {
                    name: "杭州",
                    country: "中国"
                },
                {
                    name: "大连",
                    country: "中国"
                },
                {
                    name: "长沙",
                    country: "中国"
                },
                {
                    name: "海口",
                    country: "中国"
                },
                {
                    name: "哈尔滨",
                    country: "中国"
                },
                {
                    name: "青岛",
                    country: "中国"
                },
                {
                    name: "沈阳",
                    country: "中国"
                },
                {
                    name: "三亚",
                    country: "中国"
                },
                {
                    name: "济南",
                    country: "中国"
                },
                {
                    name: "武汉",
                    country: "中国"
                },
                {
                    name: "郑州",
                    country: "中国"
                },
                {
                    name: "贵阳",
                    country: "中国"
                },
                {
                    name: "南宁",
                    country: "中国"
                },
                {
                    name: "福州",
                    country: "中国"
                },
                {
                    name: "天津",
                    country: "中国"
                },
                {
                    name: "南昌",
                    country: "中国"
                },
                {
                    name: "丽江",
                    country: "中国"
                },
                {
                    name: "香港",
                    country: "中国"
                },
                {
                    name: "台北",
                    country: "中国"
                }],
                title: "热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            interfrom: {
                cityList: [{
                    name: "上海",
                    country: "中国"
                },
                {
                    name: "北京",
                    country: "中国"
                },
                {
                    name: "香港",
                    country: "中国"
                },
                {
                    name: "厦门",
                    country: "中国"
                },
                {
                    name: "重庆",
                    country: "中国"
                },
                {
                    name: "广州",
                    country: "中国"
                },
                {
                    name: "成都",
                    country: "中国"
                },
                {
                    name: "昆明",
                    country: "中国"
                },
                {
                    name: "曼谷",
                    country: "泰国"
                },
                {
                    name: "南京",
                    country: "中国"
                },
                {
                    name: "杭州",
                    country: "中国"
                },
                {
                    name: "深圳",
                    country: "中国"
                },
                {
                    name: "首尔",
                    country: "韩国"
                },
                {
                    name: "沈阳",
                    country: "中国"
                },
                {
                    name: "澳门",
                    country: "中国澳门"
                },
                {
                    name: "新加坡",
                    country: "新加坡"
                },
                {
                    name: "武汉",
                    country: "中国"
                },
                {
                    name: "天津",
                    country: "中国"
                },
                {
                    name: "青岛",
                    country: "中国"
                },
                {
                    name: "西安",
                    country: "中国"
                },
                {
                    name: "大连",
                    country: "中国"
                },
                {
                    name: "台北",
                    country: "中国"
                },
                {
                    name: "东京",
                    country: "日本"
                },
                {
                    name: "吉隆坡",
                    country: "马来西亚"
                },
                {
                    name: "南宁",
                    country: "中国"
                },
                {
                    name: "福州",
                    country: "中国"
                },
                {
                    name: "普吉",
                    country: "泰国"
                },
                {
                    name: "长沙",
                    country: "中国"
                },
                {
                    name: "哈尔滨",
                    country: "中国"
                },
                {
                    name: "悉尼",
                    country: "澳大利亚"
                }],
                title: "热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            ABCDE: {
                charSort: true,
                cityList: [{
                    "char": "A",
                    list: [{
                        name: "阿里",
                        country: "中国"
                    },
                    {
                        name: "阿尔山",
                        country: "中国"
                    },
                    {
                        name: "安庆",
                        country: "中国"
                    },
                    {
                        name: "阿勒泰",
                        country: "中国"
                    },
                    {
                        name: "安康",
                        country: "中国"
                    },
                    {
                        name: "鞍山",
                        country: "中国"
                    },
                    {
                        name: "安顺",
                        country: "中国"
                    },
                    {
                        name: "阿克苏",
                        country: "中国"
                    }]
                },
                {
                    "char": "B",
                    list: [{
                        name: "包头",
                        country: "中国"
                    },
                    {
                        name: "北海",
                        country: "中国"
                    },
                    {
                        name: "北京",
                        country: "中国"
                    },
                    {
                        name: "百色",
                        country: "中国"
                    },
                    {
                        name: "保山",
                        country: "中国"
                    },
                    {
                        name: "博乐",
                        country: "中国"
                    },
                    {
                        name: "毕节",
                        country: "中国"
                    },
                    {
                        name: "巴彦淖尔",
                        country: "中国"
                    }]
                },
                {
                    "char": "C",
                    list: [{
                        name: "长治",
                        country: "中国"
                    },
                    {
                        name: "池州",
                        country: "中国"
                    },
                    {
                        name: "长春",
                        country: "中国"
                    },
                    {
                        name: "常州",
                        country: "中国"
                    },
                    {
                        name: "昌都",
                        country: "中国"
                    },
                    {
                        name: "朝阳",
                        country: "中国"
                    },
                    {
                        name: "常德",
                        country: "中国"
                    },
                    {
                        name: "长白山",
                        country: "中国"
                    },
                    {
                        name: "成都",
                        country: "中国"
                    },
                    {
                        name: "重庆",
                        country: "中国"
                    },
                    {
                        name: "长沙",
                        country: "中国"
                    },
                    {
                        name: "赤峰",
                        country: "中国"
                    }]
                },
                {
                    "char": "D",
                    list: [{
                        name: "大同",
                        country: "中国"
                    },
                    {
                        name: "大连",
                        country: "中国"
                    },
                    {
                        name: "东营",
                        country: "中国"
                    },
                    {
                        name: "大庆",
                        country: "中国"
                    },
                    {
                        name: "丹东",
                        country: "中国"
                    },
                    {
                        name: "大理",
                        country: "中国"
                    },
                    {
                        name: "敦煌",
                        country: "中国"
                    },
                    {
                        name: "达州",
                        country: "中国"
                    },
                    {
                        name: "稻城",
                        country: "中国"
                    }]
                },
                {
                    "char": "E",
                    list: [{
                        name: "恩施",
                        country: "中国"
                    },
                    {
                        name: "鄂尔多斯",
                        country: "中国"
                    },
                    {
                        name: "二连浩特",
                        country: "中国"
                    }]
                }],
                title: "拼音A-E城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            FGHJ: {
                charSort: true,
                cityList: [{
                    "char": "F",
                    list: [{
                        name: "佛山",
                        country: "中国"
                    },
                    {
                        name: "福州",
                        country: "中国"
                    },
                    {
                        name: "阜阳",
                        country: "中国"
                    }]
                },
                {
                    "char": "G",
                    list: [{
                        name: "贵阳",
                        country: "中国"
                    },
                    {
                        name: "桂林",
                        country: "中国"
                    },
                    {
                        name: "广州",
                        country: "中国"
                    },
                    {
                        name: "广元",
                        country: "中国"
                    },
                    {
                        name: "格尔木",
                        country: "中国"
                    },
                    {
                        name: "赣州",
                        country: "中国"
                    },
                    {
                        name: "固原",
                        country: "中国"
                    }]
                },
                {
                    "char": "H",
                    list: [{
                        name: "哈密",
                        country: "中国"
                    },
                    {
                        name: "呼和浩特",
                        country: "中国"
                    },
                    {
                        name: "黑河",
                        country: "中国"
                    },
                    {
                        name: "海拉尔",
                        country: "中国"
                    },
                    {
                        name: "哈尔滨",
                        country: "中国"
                    },
                    {
                        name: "海口",
                        country: "中国"
                    },
                    {
                        name: "黄山",
                        country: "中国"
                    },
                    {
                        name: "杭州",
                        country: "中国"
                    },
                    {
                        name: "邯郸",
                        country: "中国"
                    },
                    {
                        name: "合肥",
                        country: "中国"
                    },
                    {
                        name: "黄龙",
                        country: "中国"
                    },
                    {
                        name: "汉中",
                        country: "中国"
                    },
                    {
                        name: "和田",
                        country: "中国"
                    },
                    {
                        name: "淮安",
                        country: "中国"
                    }]
                },
                {
                    "char": "J",
                    list: [{
                        name: "鸡西",
                        country: "中国"
                    },
                    {
                        name: "晋江",
                        country: "中国"
                    },
                    {
                        name: "锦州",
                        country: "中国"
                    },
                    {
                        name: "景德镇",
                        country: "中国"
                    },
                    {
                        name: "嘉峪关",
                        country: "中国"
                    },
                    {
                        name: "井冈山",
                        country: "中国"
                    },
                    {
                        name: "济宁",
                        country: "中国"
                    },
                    {
                        name: "九江",
                        country: "中国"
                    },
                    {
                        name: "佳木斯",
                        country: "中国"
                    },
                    {
                        name: "济南",
                        country: "中国"
                    },
                    {
                        name: "加格达奇",
                        country: "中国"
                    },
                    {
                        name: "金昌",
                        country: "中国"
                    }]
                }],
                title: "拼音F-J城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            KLMNP: {
                charSort: true,
                cityList: [{
                    "char": "K",
                    list: [{
                        name: "喀什",
                        country: "中国"
                    },
                    {
                        name: "昆明",
                        country: "中国"
                    },
                    {
                        name: "康定",
                        country: "中国"
                    },
                    {
                        name: "克拉玛依",
                        country: "中国"
                    },
                    {
                        name: "库尔勒",
                        country: "中国"
                    },
                    {
                        name: "库车",
                        country: "中国"
                    },
                    {
                        name: "喀纳斯",
                        country: "中国"
                    },
                    {
                        name: "凯里",
                        country: "中国"
                    }]
                },
                {
                    "char": "L",
                    list: [{
                        name: "兰州",
                        country: "中国"
                    },
                    {
                        name: "洛阳",
                        country: "中国"
                    },
                    {
                        name: "丽江",
                        country: "中国"
                    },
                    {
                        name: "荔波",
                        country: "中国"
                    },
                    {
                        name: "林芝",
                        country: "中国"
                    },
                    {
                        name: "柳州",
                        country: "中国"
                    },
                    {
                        name: "泸州",
                        country: "中国"
                    },
                    {
                        name: "连云港",
                        country: "中国"
                    },
                    {
                        name: "黎平",
                        country: "中国"
                    },
                    {
                        name: "连城",
                        country: "中国"
                    },
                    {
                        name: "拉萨",
                        country: "中国"
                    },
                    {
                        name: "临沧",
                        country: "中国"
                    },
                    {
                        name: "临沂",
                        country: "中国"
                    }]
                },
                {
                    "char": "M",
                    list: [{
                        name: "芒市",
                        country: "中国"
                    },
                    {
                        name: "牡丹江",
                        country: "中国"
                    },
                    {
                        name: "满洲里",
                        country: "中国"
                    },
                    {
                        name: "绵阳",
                        country: "中国"
                    },
                    {
                        name: "梅县",
                        country: "中国"
                    },
                    {
                        name: "漠河",
                        country: "中国"
                    }]
                },
                {
                    "char": "N",
                    list: [{
                        name: "南京",
                        country: "中国"
                    },
                    {
                        name: "南充",
                        country: "中国"
                    },
                    {
                        name: "南宁",
                        country: "中国"
                    },
                    {
                        name: "南阳",
                        country: "中国"
                    },
                    {
                        name: "南通",
                        country: "中国"
                    },
                    {
                        name: "南昌",
                        country: "中国"
                    },
                    {
                        name: "那拉提",
                        country: "中国"
                    },
                    {
                        name: "宁波",
                        country: "中国"
                    }]
                },
                {
                    "char": "P",
                    list: [{
                        name: "攀枝花",
                        country: "中国"
                    }]
                }],
                title: "拼音K-P城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            QRSTW: {
                charSort: true,
                cityList: [{
                    "char": "Q",
                    list: [{
                        name: "衢州",
                        country: "中国"
                    },
                    {
                        name: "黔江",
                        country: "中国"
                    },
                    {
                        name: "秦皇岛",
                        country: "中国"
                    },
                    {
                        name: "庆阳",
                        country: "中国"
                    },
                    {
                        name: "且末",
                        country: "中国"
                    },
                    {
                        name: "齐齐哈尔",
                        country: "中国"
                    },
                    {
                        name: "青岛",
                        country: "中国"
                    }]
                },
                {
                    "char": "R",
                    list: [{
                        name: "日喀则",
                        country: "中国"
                    }]
                },
                {
                    "char": "S",
                    list: [{
                        name: "汕头",
                        country: "中国"
                    },
                    {
                        name: "深圳",
                        country: "中国"
                    },
                    {
                        name: "石家庄",
                        country: "中国"
                    },
                    {
                        name: "三亚",
                        country: "中国"
                    },
                    {
                        name: "沈阳",
                        country: "中国"
                    },
                    {
                        name: "上海",
                        country: "中国"
                    },
                    {
                        name: "思茅",
                        country: "中国"
                    }]
                },
                {
                    "char": "T",
                    list: [{
                        name: "唐山",
                        country: "中国"
                    },
                    {
                        name: "铜仁",
                        country: "中国"
                    },
                    {
                        name: "塔城",
                        country: "中国"
                    },
                    {
                        name: "腾冲",
                        country: "中国"
                    },
                    {
                        name: "台州",
                        country: "中国"
                    },
                    {
                        name: "天水",
                        country: "中国"
                    },
                    {
                        name: "天津",
                        country: "中国"
                    },
                    {
                        name: "通辽",
                        country: "中国"
                    },
                    {
                        name: "吐鲁番",
                        country: "中国"
                    },
                    {
                        name: "太原",
                        country: "中国"
                    }]
                },
                {
                    "char": "W",
                    list: [{
                        name: "威海",
                        country: "中国"
                    },
                    {
                        name: "武汉",
                        country: "中国"
                    },
                    {
                        name: "梧州",
                        country: "中国"
                    },
                    {
                        name: "文山",
                        country: "中国"
                    },
                    {
                        name: "无锡",
                        country: "中国"
                    },
                    {
                        name: "潍坊",
                        country: "中国"
                    },
                    {
                        name: "武夷山",
                        country: "中国"
                    },
                    {
                        name: "乌兰浩特",
                        country: "中国"
                    },
                    {
                        name: "温州",
                        country: "中国"
                    },
                    {
                        name: "乌鲁木齐",
                        country: "中国"
                    },
                    {
                        name: "万州",
                        country: "中国"
                    },
                    {
                        name: "乌海",
                        country: "中国"
                    }]
                }],
                title: "拼音Q-W城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            XYZ: {
                charSort: true,
                cityList: [{
                    "char": "X",
                    list: [{
                        name: "兴义",
                        country: "中国"
                    },
                    {
                        name: "西昌",
                        country: "中国"
                    },
                    {
                        name: "厦门",
                        country: "中国"
                    },
                    {
                        name: "香格里拉",
                        country: "中国"
                    },
                    {
                        name: "西安",
                        country: "中国"
                    },
                    {
                        name: "西宁",
                        country: "中国"
                    },
                    {
                        name: "襄阳(中国)",
                        country: "中国"
                    },
                    {
                        name: "锡林浩特",
                        country: "中国"
                    },
                    {
                        name: "西双版纳",
                        country: "中国"
                    },
                    {
                        name: "徐州",
                        country: "中国"
                    }]
                },
                {
                    "char": "Y",
                    list: [{
                        name: "义乌",
                        country: "中国"
                    },
                    {
                        name: "永州",
                        country: "中国"
                    },
                    {
                        name: "榆林",
                        country: "中国"
                    },
                    {
                        name: "扬州",
                        country: "中国"
                    },
                    {
                        name: "延安",
                        country: "中国"
                    },
                    {
                        name: "运城",
                        country: "中国"
                    },
                    {
                        name: "烟台",
                        country: "中国"
                    },
                    {
                        name: "银川",
                        country: "中国"
                    },
                    {
                        name: "宜昌",
                        country: "中国"
                    },
                    {
                        name: "宜宾",
                        country: "中国"
                    },
                    {
                        name: "宜春",
                        country: "中国"
                    },
                    {
                        name: "盐城",
                        country: "中国"
                    },
                    {
                        name: "延吉",
                        country: "中国"
                    },
                    {
                        name: "玉树",
                        country: "中国"
                    },
                    {
                        name: "伊宁",
                        country: "中国"
                    },
                    {
                        name: "伊春",
                        country: "中国"
                    }]
                },
                {
                    "char": "Z",
                    list: [{
                        name: "珠海",
                        country: "中国"
                    },
                    {
                        name: "昭通",
                        country: "中国"
                    },
                    {
                        name: "张家界",
                        country: "中国"
                    },
                    {
                        name: "舟山",
                        country: "中国"
                    },
                    {
                        name: "郑州",
                        country: "中国"
                    },
                    {
                        name: "中卫",
                        country: "中国"
                    },
                    {
                        name: "芷江",
                        country: "中国"
                    },
                    {
                        name: "湛江",
                        country: "中国"
                    },
                    {
                        name: "遵义",
                        country: "中国"
                    },
                    {
                        name: "张掖",
                        country: "中国"
                    },
                    {
                        name: "张家口",
                        country: "中国"
                    }]
                }],
                title: "拼音X-Z城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            "国际·港澳台": {
                cityList: [{
                    name: "香港",
                    country: "中国香港"
                },
                {
                    name: "曼谷",
                    country: "泰国"
                },
                {
                    name: "台北",
                    country: "中国台湾"
                },
                {
                    name: "马尼拉",
                    country: "菲律宾"
                },
                {
                    name: "吉隆坡",
                    country: "马来西亚"
                },
                {
                    name: "首尔",
                    country: "韩国"
                },
                {
                    name: "新加坡",
                    country: "新加坡"
                },
                {
                    name: "普吉",
                    country: "泰国"
                },
                {
                    name: "澳门",
                    country: "中国澳门"
                },
                {
                    name: "洛杉矶",
                    country: "美国"
                },
                {
                    name: "东京",
                    country: "日本"
                },
                {
                    name: "清迈",
                    country: "泰国"
                },
                {
                    name: "胡志明市",
                    country: "越南"
                },
                {
                    name: "纽约",
                    country: "美国"
                },
                {
                    name: "巴厘岛",
                    country: "印度尼西亚"
                },
                {
                    name: "悉尼",
                    country: "澳大利亚"
                },
                {
                    name: "墨尔本",
                    country: "澳大利亚"
                },
                {
                    name: "巴黎",
                    country: "法国"
                },
                {
                    name: "济州岛",
                    country: "韩国"
                },
                {
                    name: "奥克兰",
                    country: "新西兰"
                },
                {
                    name: "伦敦",
                    country: "英国"
                },
                {
                    name: "暹粒",
                    country: "柬埔寨"
                },
                {
                    name: "高雄",
                    country: "中国台湾"
                },
                {
                    name: "旧金山",
                    country: "美国"
                },
                {
                    name: "温哥华",
                    country: "加拿大"
                },
                {
                    name: "大阪",
                    country: "日本"
                },
                {
                    name: "马累",
                    country: "马尔代夫"
                },
                {
                    name: "金边",
                    country: "柬埔寨"
                },
                {
                    name: "法兰克福",
                    country: "德国"
                },
                {
                    name: "多伦多",
                    country: "加拿大"
                }],
                title: "热门国际城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "热门城市": {
                cityList: [{
                    name: "香港",
                    country: "中国香港"
                },
                {
                    name: "新加坡",
                    country: "新加坡"
                },
                {
                    name: "首尔",
                    country: "韩国"
                },
                {
                    name: "曼谷",
                    country: "泰国"
                },
                {
                    name: "东京",
                    country: "日本"
                },
                {
                    name: "台北",
                    country: "中国台湾"
                },
                {
                    name: "吉隆坡",
                    country: "马来西亚"
                },
                {
                    name: "悉尼",
                    country: "澳大利亚"
                },
                {
                    name: "纽约",
                    country: "美国"
                },
                {
                    name: "澳门",
                    country: "中国澳门"
                },
                {
                    name: "伦敦",
                    country: "英国"
                },
                {
                    name: "巴黎",
                    country: "伦敦"
                },
                {
                    name: "洛杉矶",
                    country: "美国"
                },
                {
                    name: "马尼拉",
                    country: "菲律宾"
                },
                {
                    name: "墨尔本",
                    country: "澳大利亚"
                },
                {
                    name: "大阪",
                    country: "日本"
                },
                {
                    name: "胡志明市",
                    country: "越南"
                },
                {
                    name: "普吉",
                    country: "泰国"
                },
                {
                    name: "温哥华",
                    country: "加拿大"
                },
                {
                    name: "迪拜",
                    country: "阿联酋"
                },
                {
                    name: "釜山",
                    country: "韩国"
                },
                {
                    name: "多伦多",
                    country: "加拿大"
                },
                {
                    name: "法兰克福",
                    country: "德国"
                },
                {
                    name: "河内",
                    country: "越南"
                },
                {
                    name: "旧金山",
                    country: "美国"
                },
                {
                    name: "加德满都",
                    country: "尼泊尔"
                },
                {
                    name: "金边",
                    country: "柬埔寨"
                },
                {
                    name: "马累",
                    country: "马尔代夫"
                },
                {
                    name: "奥克兰",
                    country: "新西兰"
                },
                {
                    name: "皇后镇",
                    country: "新西兰"
                }],
                title: "热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "亚洲/大洋洲": {
                cityList: [{
                    name: "香港",
                    country: "中国香港"
                },
                {
                    name: "新加坡",
                    country: "新加坡"
                },
                {
                    name: "首尔",
                    country: "韩国"
                },
                {
                    name: "曼谷",
                    country: "泰国"
                },
                {
                    name: "吉隆坡",
                    country: "马来西亚"
                },
                {
                    name: "东京",
                    country: "日本"
                },
                {
                    name: "台北",
                    country: "中国台湾"
                },
                {
                    name: "悉尼",
                    country: "澳大利亚"
                },
                {
                    name: "澳门",
                    country: "中国澳门"
                },
                {
                    name: "普吉",
                    country: "泰国"
                },
                {
                    name: "墨尔本",
                    country: "澳大利亚"
                },
                {
                    name: "胡志明市",
                    country: "越南"
                },
                {
                    name: "大阪",
                    country: "日本"
                },
                {
                    name: "巴厘岛",
                    country: "印度尼西亚"
                },
                {
                    name: "马尼拉",
                    country: "菲律宾"
                },
                {
                    name: "河内",
                    country: "越南"
                },
                {
                    name: "加德满都",
                    country: "尼泊尔"
                },
                {
                    name: "金边",
                    country: "柬埔寨"
                },
                {
                    name: "雅加达",
                    country: "印度尼西亚"
                },
                {
                    name: "马累",
                    country: "马尔代夫"
                },
                {
                    name: "暹粒",
                    country: "柬埔寨"
                },
                {
                    name: "迪拜",
                    country: "阿拉伯联合酋长国"
                },
                {
                    name: "釜山",
                    country: "韩国"
                },
                {
                    name: "名古屋",
                    country: "日本"
                },
                {
                    name: "奥克兰",
                    country: "新西兰"
                },
                {
                    name: "布里斯班",
                    country: "澳大利亚"
                },
                {
                    name: "槟城",
                    country: "马来西亚"
                },
                {
                    name: "高雄",
                    country: "中国台湾"
                },
                {
                    name: "新德里",
                    country: "印度"
                },
                {
                    name: "济州岛",
                    country: "韩国"
                }],
                title: "亚洲/大洋洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "美洲": {
                cityList: [{
                    name: "纽约",
                    country: "美国"
                },
                {
                    name: "洛杉矶",
                    country: "美国"
                },
                {
                    name: "多伦多",
                    country: "加拿大"
                },
                {
                    name: "温哥华",
                    country: "加拿大"
                },
                {
                    name: "旧金山",
                    country: "美国"
                },
                {
                    name: "芝加哥",
                    country: "美国"
                },
                {
                    name: "华盛顿",
                    country: "美国"
                },
                {
                    name: "西雅图",
                    country: "美国"
                },
                {
                    name: "波士顿",
                    country: "美国"
                },
                {
                    name: "底特律",
                    country: "美国"
                },
                {
                    name: "亚特兰大",
                    country: "美国"
                },
                {
                    name: "蒙特利尔",
                    country: "加拿大"
                },
                {
                    name: "休斯敦",
                    country: "美国"
                },
                {
                    name: "火奴鲁鲁",
                    country: "美国"
                },
                {
                    name: "达拉斯",
                    country: "美国"
                },
                {
                    name: "拉斯维加斯",
                    country: "美国"
                },
                {
                    name: "费城",
                    country: "美国"
                },
                {
                    name: "圣保罗（巴西）",
                    country: "巴西"
                },
                {
                    name: "明尼阿波利斯",
                    country: "美国"
                },
                {
                    name: "渥太华",
                    country: "加拿大"
                },
                {
                    name: "凤凰城",
                    country: "美国"
                },
                {
                    name: "墨西哥",
                    country: "墨西哥"
                },
                {
                    name: "迈阿密",
                    country: "美国"
                },
                {
                    name: "丹佛",
                    country: "美国"
                },
                {
                    name: "奥兰多",
                    country: "美国"
                },
                {
                    name: "卡尔加里",
                    country: "加拿大"
                },
                {
                    name: "埃德蒙顿",
                    country: "加拿大"
                },
                {
                    name: "布宜诺斯艾利斯",
                    country: "阿根廷"
                },
                {
                    name: "里约热内卢",
                    country: "巴西"
                },
                {
                    name: "匹兹堡",
                    country: "美国"
                }],
                title: "美洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "欧洲": {
                cityList: [{
                    name: "伦敦",
                    country: "英国"
                },
                {
                    name: "巴黎",
                    country: "法国"
                },
                {
                    name: "法兰克福",
                    country: "德国"
                },
                {
                    name: "莫斯科",
                    country: "俄罗斯"
                },
                {
                    name: "阿姆斯特丹",
                    country: "荷兰"
                },
                {
                    name: "罗马（意大利）",
                    country: "意大利"
                },
                {
                    name: "米兰",
                    country: "意大利"
                },
                {
                    name: "马德里",
                    country: "西班牙"
                },
                {
                    name: "慕尼黑",
                    country: "德国"
                },
                {
                    name: "柏林",
                    country: "德国"
                },
                {
                    name: "斯德哥尔摩",
                    country: "瑞典"
                },
                {
                    name: "伊斯坦布尔",
                    country: "土耳其"
                },
                {
                    name: "伯明翰（英国）",
                    country: "英国"
                },
                {
                    name: "巴塞罗那(西班牙)",
                    country: "西班牙"
                },
                {
                    name: "雅典",
                    country: "希腊"
                },
                {
                    name: "哥本哈根",
                    country: "丹麦"
                },
                {
                    name: "苏黎世",
                    country: "瑞士"
                },
                {
                    name: "布鲁塞尔",
                    country: "比利时"
                },
                {
                    name: "赫尔辛基",
                    country: "芬兰"
                },
                {
                    name: "爱丁堡",
                    country: "英国"
                },
                {
                    name: "维也纳",
                    country: "奥地利"
                },
                {
                    name: "格拉斯哥（英国）",
                    country: "英国"
                },
                {
                    name: "日内瓦",
                    country: "瑞士"
                },
                {
                    name: "圣彼得堡",
                    country: "俄罗斯"
                },
                {
                    name: "都柏林(爱尔兰)",
                    country: "爱尔兰"
                },
                {
                    name: "汉堡",
                    country: "德国"
                },
                {
                    name: "杜塞尔多夫",
                    country: "德国"
                },
                {
                    name: "布拉格",
                    country: "捷克"
                },
                {
                    name: "布达佩斯",
                    country: "匈牙利"
                },
                {
                    name: "基辅",
                    country: "乌克兰"
                }],
                title: "欧洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "非洲": {
                cityList: [{
                    name: "开罗",
                    country: "埃及"
                },
                {
                    name: "约翰内斯堡",
                    country: "南非"
                },
                {
                    name: "内罗毕",
                    country: "肯尼亚"
                },
                {
                    name: "开普敦",
                    country: "南非"
                },
                {
                    name: "毛里求斯",
                    country: "毛里求斯"
                },
                {
                    name: "拉各斯",
                    country: "尼日利亚"
                },
                {
                    name: "喀土穆",
                    country: "苏丹"
                },
                {
                    name: "亚的斯亚贝巴",
                    country: "埃塞俄比亚"
                },
                {
                    name: "阿克拉",
                    country: "加纳"
                },
                {
                    name: "达累斯萨拉姆",
                    country: "坦桑尼亚"
                },
                {
                    name: "塞舌尔",
                    country: "塞舌尔共和国"
                },
                {
                    name: "阿尔及尔",
                    country: "阿尔及利亚"
                },
                {
                    name: "的黎波里",
                    country: "利比亚"
                },
                {
                    name: "阿布贾",
                    country: "尼日利亚"
                },
                {
                    name: "卡萨布兰卡",
                    country: "摩洛哥"
                },
                {
                    name: "突尼斯",
                    country: "突尼斯"
                }],
                title: "非洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "国内": {
                cityList: [{
                    name: "上海",
                    country: "中国"
                },
                {
                    name: "北京",
                    country: "中国"
                },
                {
                    name: "广州",
                    country: "中国"
                },
                {
                    name: "昆明",
                    country: "中国"
                },
                {
                    name: "西安",
                    country: "中国"
                },
                {
                    name: "成都",
                    country: "中国"
                },
                {
                    name: "深圳",
                    country: "中国"
                },
                {
                    name: "厦门",
                    country: "中国"
                },
                {
                    name: "乌鲁木齐",
                    country: "中国"
                },
                {
                    name: "南京",
                    country: "中国"
                },
                {
                    name: "重庆",
                    country: "中国"
                },
                {
                    name: "杭州",
                    country: "中国"
                },
                {
                    name: "大连",
                    country: "中国"
                },
                {
                    name: "长沙",
                    country: "中国"
                },
                {
                    name: "海口",
                    country: "中国"
                },
                {
                    name: "哈尔滨",
                    country: "中国"
                },
                {
                    name: "青岛",
                    country: "中国"
                },
                {
                    name: "沈阳",
                    country: "中国"
                },
                {
                    name: "三亚",
                    country: "中国"
                },
                {
                    name: "济南",
                    country: "中国"
                },
                {
                    name: "武汉",
                    country: "中国"
                },
                {
                    name: "郑州",
                    country: "中国"
                },
                {
                    name: "贵阳",
                    country: "中国"
                },
                {
                    name: "南宁",
                    country: "中国"
                },
                {
                    name: "福州",
                    country: "中国"
                },
                {
                    name: "天津",
                    country: "中国"
                },
                {
                    name: "长春",
                    country: "中国"
                },
                {
                    name: "石家庄",
                    country: "中国"
                },
                {
                    name: "太原",
                    country: "中国"
                },
                {
                    name: "兰州",
                    country: "中国"
                }],
                title: "热门国内城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            }
        }
    }
};
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.FlightSearchBox = new Hogan.Template(function(e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="e_csh_sch_flpn">');
    a.b("\n" + b);
    a.b('    <div class="ch_search_tab">');
    a.b("\n" + b);
    a.b('        <div class="rt_link"><a href="http://user.qunar.com/flight_toolbox.jsp?catalog=ownorders&from=qunarindexP1" target="_blank">出票状态查询</a> | <a href="http://user.qunar.com/flight_toolbox.jsp?catalog=ownorders&from=tuigai" target="_blank">退票改签</a></div>');
    a.b("\n" + b);
    a.b('        <ul class="ul_search_tab">');
    a.b("\n" + b);
    a.b('            <li class="cur" id="js_domestic_tab"><a href="#" onclick="return false;">国内机票</a></li>');
    a.b("\n" + b);
    a.b('            <li id="js_inter_tab"><a href="#" onclick="return false;">国际·港澳台机票</a></li>');
    a.b("\n" + b);
    a.b("        </ul>");
    a.b("\n" + b);
    a.b("    </div>");
    a.b("\n" + b);
    a.b('    <div class="ch_sch_form ch_sch_flt_bf clrfix" id="js_flighttype_tab_domestic">');
    a.b("\n" + b);
    a.b('        <form action="/twell/flight/Search.jsp" method="get" id="js_flight_domestic_searchbox">');
    a.b("\n" + b);
    a.b('            <input type="hidden" value="qunarindex" name="from" />');
    a.b("\n" + b);
    a.b('            <div class="crl_group">');
    a.b("\n" + b);
    a.b('                <div class="crl_lab">&nbsp;</div>');
    a.b("\n" + b);
    a.b('                <div class="controls">');
    a.b("\n" + b);
    a.b('                    <label class="lal_rdo" for="js_searchtype_oneway" hidefocus="on">');
    a.b("\n" + b);
    a.b('                        <input name="searchType" type="radio" class="inp_rad js-searchtype-oneway" value="OnewayFlight" checked="checked" id="js_searchtype_oneway" />');
    a.b("\n" + b);
    a.b("                        单程</label>");
    a.b("\n" + b);
    a.b('                    <label class="lal_rdo" for="js_searchtype_roundtrip" hidefocus="on">');
    a.b("\n" + b);
    a.b('                        <input name="searchType" type="radio" class="inp_rad js-searchtype-roundtrip" value="RoundTripFlight" id="js_searchtype_roundtrip" />');
    a.b("\n" + b);
    a.b("                        往返</label>");
    a.b("\n" + b);
    a.b('                    <label class="lal_rdo" for="js_searchtype_deals" hidefocus="on">');
    a.b("\n" + b);
    a.b('                        <input name="searchType" type="radio" class="inp_rad js-searchtype-deals" value="DealsFlight" id="js_searchtype_deals" />');
    a.b("\n" + b);
    a.b("                        特价</label>");
    a.b("\n" + b);
    a.b("                </div>");
    a.b("\n" + b);
    a.b("            </div>");
    a.b("\n" + b);
    a.b('            <div class="crl_group">');
    a.b("\n" + b);
    a.b('                <div class="crl_sp2_1">');
    a.b("\n" + b);
    a.b('                    <a class="lnk_change js-exchagne-city" href="#" title="调换出发地和目的地">换</a>');
    a.b("\n" + b);
    a.b('                    <div class="crl_lab">城市</div>');
    a.b("\n" + b);
    a.b('                    <div class="controls">');
    a.b("\n" + b);
    a.b('                        <div class="qcbox qcity" style="z-index: 40;">');
    a.b("\n" + b);
    a.b('                            <input type="text" value="" name="fromCity" class="cinput" data-qcbox-placeholder="出发地" data-qcbox-prefix="从" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" />');
    a.b("\n" + b);
    a.b('                            <div class="qsuggest-contaier js-suggestcontainer"></div>');
    a.b("\n" + b);
    a.b("                        </div>");
    a.b("\n" + b);
    a.b("                    </div>");
    a.b("\n" + b);
    a.b('                    <div class="crl_lab">&nbsp;</div>');
    a.b("\n" + b);
    a.b('                    <div class="controls">');
    a.b("\n" + b);
    a.b('                        <div class="qcbox qcity" style="z-index: 30;">');
    a.b("\n" + b);
    a.b('                            <input type="text" value="" name="toCity" class="cinput" data-qcbox-placeholder="目的地" data-qcbox-prefix="到" data-qcbox-suggest="flight-tocity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" />');
    a.b("\n" + b);
    a.b('                            <div class="qsuggest-contaier js-suggestcontainer"></div>');
    a.b("\n" + b);
    a.b("                        </div>");
    a.b("\n" + b);
    a.b("                    </div>");
    a.b("\n" + b);
    a.b("                </div>");
    a.b("\n" + b);
    a.b('                <div class="crl_sp2_2">');
    a.b("\n" + b);
    a.b('                    <div class="crl_lab">日期</div>');
    a.b("\n" + b);
    a.b('                    <div class="controls">');
    a.b("\n" + b);
    a.b('                        <div class="qcbox qdate fromD" style="z-index: 20;">');
    a.b("\n" + b);
    a.b('                            <input type="text" id="js_domestic_fromdate" value="" name="fromDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="往" />');
    a.b("\n" + b);
    a.b("                        </div>");
    a.b("\n" + b);
    a.b("                    </div>");
    a.b("\n" + b);
    a.b('                    <div class="crl_lab">&nbsp;</div>');
    a.b("\n" + b);
    a.b('                    <div class="controls js-backdate" style="visibility:hidden;">');
    a.b("\n" + b);
    a.b('                        <div class="qcbox qdate toD" style="z-index: 10;">');
    a.b("\n" + b);
    a.b('                            <input type="text" id="js_domestic_todate" value="" name="toDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="返" />');
    a.b("\n" + b);
    a.b("                        </div>");
    a.b("\n" + b);
    a.b("                    </div>");
    a.b("\n" + b);
    a.b("                </div>");
    a.b("\n" + b);
    a.b("            </div>");
    a.b("\n" + b);
    a.b('            <div class="crl_group crl_group_submit">');
    a.b("\n" + b);
    a.b('                <div class="crl_lab">&nbsp;</div>');
    a.b("\n" + b);
    a.b('                <div class="controls"> <span class="p_btn">&nbsp;<button type="submit" class="btn_search"></button></span>');
    a.b("\n" + b);
    a.b('                    <p class="p_text">');
    a.b("\n" + b);
    a.b('                        <span id="js_alsosearch_domestic"></span>');
    a.b("\n" + b);
    a.b('                        可实时搜索&nbsp;<span class="highlight">3356</span>&nbsp;条国内航线');
    a.b("\n" + b);
    a.b("                    </p>");
    a.b("\n" + b);
    a.b("                </div>");
    a.b("\n" + b);
    a.b("            </div>");
    a.b("\n" + b);
    a.b("        </form>");
    a.b("\n" + b);
    a.b("    </div>");
    a.b("\n" + b);
    a.b('    <div class="ch_sch_form ch_sch_flt_bf clrfix" style="display:none" id="js_flighttype_tab_inter">');
    a.b("\n" + b);
    a.b('        <form action="/twell/flight/Search.jsp" id="js_flight_international_searchbox" method="get">');
    a.b("\n" + b);
    a.b('            <input type="hidden" value="qunarindex" name="from" />');
    a.b("\n" + b);
    a.b('            <div class="crl_group">');
    a.b("\n" + b);
    a.b('                <div class="crl_lab">&nbsp;</div>');
    a.b("\n" + b);
    a.b('                <div class="controls">');
    a.b("\n" + b);
    a.b('                    <label class="lal_rdo" for="js_intersearchtype_oneway" hidefocus="on">');
    a.b("\n" + b);
    a.b('                        <input name="searchType" type="radio" value="OnewayFlight" class="inp_rad js-searchtype-oneway" id="js_intersearchtype_oneway" />');
    a.b("\n" + b);
    a.b("                        单程</label>");
    a.b("\n" + b);
    a.b('                    <label class="lal_rdo" for="js_intersearchtype_roundtrip" hidefocus="on">');
    a.b("\n" + b);
    a.b('                        <input name="searchType" type="radio" value="RoundTripFlight" class="inp_rad js-searchtype-roundtrip" checked="checked" id="js_intersearchtype_roundtrip" />');
    a.b("\n" + b);
    a.b("                        往返</label>");
    a.b("\n" + b);
    a.b("                </div>");
    a.b("\n" + b);
    a.b("            </div>");
    a.b("\n" + b);
    a.b('            <div class="crl_group">');
    a.b("\n" + b);
    a.b('                <div class="crl_sp2_1">');
    a.b("\n" + b);
    a.b('                    <a class="lnk_change js-exchagne-city" href="#" title="调换出发地和目的地">换</a>');
    a.b("\n" + b);
    a.b('                    <div class="crl_lab">城市</div>');
    a.b("\n" + b);
    a.b('                    <div class="controls">');
    a.b("\n" + b);
    a.b('                        <div class="qcbox qcity" style="z-index: 40;">');
    a.b("\n" + b);
    a.b('                            <input type="text" value="" name="fromCity" class="cinput" data-qcbox-placeholder="出发地" data-qcbox-prefix="从" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" />');
    a.b("\n" + b);
    a.b('                            <div class="qsuggest-contaier js-suggestcontainer"></div>');
    a.b("\n" + b);
    a.b("                        </div>");
    a.b("\n" + b);
    a.b("                    </div>");
    a.b("\n" + b);
    a.b('                    <div class="crl_lab">&nbsp;</div>');
    a.b("\n" + b);
    a.b('                    <div class="controls">');
    a.b("\n" + b);
    a.b('                        <div class="qcbox qcity" style="z-index: 30;">');
    a.b("\n" + b);
    a.b('                            <input type="text" value="" name="toCity" class="cinput" data-qcbox-placeholder="目的地" data-qcbox-prefix="到" data-qcbox-suggest="flight-tocity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" />');
    a.b("\n" + b);
    a.b('                            <div class="qsuggest-contaier js-suggestcontainer"></div>');
    a.b("\n" + b);
    a.b("                        </div>");
    a.b("\n" + b);
    a.b("                    </div>");
    a.b("\n" + b);
    a.b("                </div>");
    a.b("\n" + b);
    a.b('                <div class="crl_sp2_2">');
    a.b("\n" + b);
    a.b('                    <div class="crl_lab">日期</div>');
    a.b("\n" + b);
    a.b('                    <div class="controls">');
    a.b("\n" + b);
    a.b('                        <div class="qcbox qdate fromD" style="z-index: 20;">');
    a.b("\n" + b);
    a.b('                            <input type="text" value="" id="fromDate" name="fromDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="往" />');
    a.b("\n" + b);
    a.b("                        </div>");
    a.b("\n" + b);
    a.b("                    </div>");
    a.b("\n" + b);
    a.b('                    <div class="crl_lab">&nbsp;</div>');
    a.b("\n" + b);
    a.b('                    <div class="controls js-backdate">');
    a.b("\n" + b);
    a.b('                        <div class="qcbox qdate toD" style="z-index: 10;">');
    a.b("\n" + b);
    a.b('                            <input type="text" value="" id="toDate" name="toDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="返" />');
    a.b("\n" + b);
    a.b("                        </div>");
    a.b("\n" + b);
    a.b("                    </div>");
    a.b("\n" + b);
    a.b("                </div>");
    a.b("\n" + b);
    a.b("            </div>");
    a.b("\n" + b);
    a.b('            <div class="crl_group crl_group_submit">');
    a.b("\n" + b);
    a.b('                <div class="crl_lab">&nbsp;</div>');
    a.b("\n" + b);
    a.b('                <div class="controls"> <span class="p_btn">&nbsp;<button type="submit" class="btn_search"></button></span>');
    a.b("\n" + b);
    a.b('                    <p class="p_text">');
    a.b("\n" + b);
    a.b('                        <span id="js_alsosearch_inter"></span>');
    a.b("\n" + b);
    a.b('                        可实时搜索&nbsp;<span class="highlight">43000</span>&nbsp;条国际航线');
    a.b("\n" + b);
    a.b("                    </p>");
    a.b("\n" + b);
    a.b("                </div>");
    a.b("\n" + b);
    a.b("            </div>");
    a.b("\n" + b);
    a.b("        </form>");
    a.b("\n" + b);
    a.b("    </div>");
    a.b("\n" + b);
    a.b('    <div class="ch_agt_inf">');
    a.b("\n" + b);
    a.b('        <abbr id="ifrCataAd" style="display:none;" data-type="qad" data-query="f=s&cur_page_num=0&rep=1&tag=99&vataposition=QNR_MzQ%3D_CN&vatacon=&rows=1&qtype=js&vataframe=bannerDefault" data-style="width:100%;" data-lazyAD="1"></abbr>');
    a.b("\n" + b);
    a.b("    </div>");
    a.b("\n" + b);
    a.b("</div>");
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.FlightHotCity = new Hogan.Template(function(e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="hint"');
    if (a.s(a.f("width", e, d, 1), e, d, 0, 27, 53, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b(' style="width:');
            f.b(f.v(f.f("width", h, g, 0)));
            f.b('px"');
        });
        e.pop();
    }
    a.b(' data-hotcity-nogo="true">');
    a.b("\n" + b);
    a.b('    <img class="closeImg js_close_flight_hotcity" src="http://source.qunar.com/site/images/new_main/Button_Hotcity_Close.gif"><div id="js_t-');
    a.b(a.v(a.f("type", e, d, 0)));
    a.b("-flight-hotcity-");
    a.b(a.v(a.f("cityType", e, d, 0)));
    a.b('" class="b_hct_tit">热门城市(可直接输入中文名/拼音/英文名/三字码)</div>');
    a.b("\n" + b);
    a.b('    <div class="b_hct_nav">');
    a.b("\n" + b);
    if (a.s(a.f("sort", e, d, 1), e, d, 0, 363, 494, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b('        <span data-key="');
            f.b(f.v(f.f("key", h, g, 0)));
            f.b('" data-tab="');
            f.b(f.v(f.f("type", h, g, 0)));
            f.b("-flight-hotcity-");
            f.b(f.v(f.f("cityType", h, g, 0)));
            f.b('" data-tab-id="dfh-');
            f.b(f.v(f.f("tab", h, g, 0)));
            f.b('">');
            f.b(f.v(f.f("tab", h, g, 0)));
            f.b("</span>");
            f.b("\n");
        });
        e.pop();
    }
    a.b("    </div>");
    a.b("\n" + b);
    if (a.s(a.f("sort", e, d, 1), e, d, 0, 528, 645, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b('    <div data-panel="');
            f.b(f.v(f.f("type", h, g, 0)));
            f.b("-flight-hotcity-");
            f.b(f.v(f.f("cityType", h, g, 0)));
            f.b('" data-panel-id="dfh-');
            f.b(f.v(f.f("tab", h, g, 0)));
            f.b('" class="b_hct_lst"></div>');
            f.b("\n");
        });
        e.pop();
    }
    a.b("</div>");
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.FlightHotCityList = new Hogan.Template(function(e, d, b) {
    var a = this;
    a.b(b = b || "");
    if (a.s(a.f("charSort", e, d, 1), e, d, 0, 13, 262, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            if (f.s(f.f("cityList", h, g, 1), h, g, 0, 27, 248, "{{ }}")) {
                f.rs(h, g,
                function(k, j, i) {
                    if (i.s(i.f("char", k, j, 1), k, j, 0, 37, 238, "{{ }}")) {
                        i.rs(k, j,
                        function(n, m, l) {
                            l.b('<dl class="e_hct_lst">');
                            l.b("\n" + b);
                            l.b("	<dt>");
                            l.b(l.v(l.f("char", n, m, 0)));
                            l.b("</dt>");
                            l.b("\n" + b);
                            l.b("	<dd>");
                            l.b("\n" + b);
                            l.b("		<ul>");
                            l.b("\n" + b);
                            if (l.s(l.f("list", n, m, 1), n, m, 0, 108, 204, "{{ }}")) {
                                l.rs(n, m,
                                function(r, q, o) {
                                    o.b('		    <li><a class="js-hotcitylist" data-country="');
                                    o.b(o.v(o.f("country", r, q, 0)));
                                    o.b('" href="#">');
                                    o.b(o.v(o.f("name", r, q, 0)));
                                    o.b("</a></li>");
                                    o.b("\n");
                                });
                                n.pop();
                            }
                            l.b("		</ul>");
                            l.b("\n" + b);
                            l.b("	</dd>");
                            l.b("\n" + b);
                            l.b("</dl>");
                            l.b("\n");
                        });
                        k.pop();
                    }
                });
                h.pop();
            }
        });
        e.pop();
    }
    a.b("\n" + b);
    if (!a.s(a.f("charSort", e, d, 1), e, d, 1, 0, 0, "")) {
        a.b("<ul>");
        a.b("\n" + b);
        if (a.s(a.f("cityList", e, d, 1), e, d, 0, 310, 397, "{{ }}")) {
            a.rs(e, d,
            function(h, g, f) {
                f.b('	<li><a class="js-hotcitylist" data-country="');
                f.b(f.v(f.f("country", h, g, 0)));
                f.b('" href="#">');
                f.b(f.v(f.f("name", h, g, 0)));
                f.b("</a></li>");
                f.b("\n");
            });
            e.pop();
        }
        a.b("</ul>");
        a.b("\n");
    }
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.MainSliderShowBox = new Hogan.Template(function(e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b("<!-- \r");
    a.b("\n" + b);
    a.b("data structure: \r");
    a.b("\n" + b);
    a.b("sliders: [\r");
    a.b("\n" + b);
    a.b("{\r");
    a.b("\n" + b);
    a.b('	title: "cxcxc"\r');
    a.b("\n" + b);
    a.b('	subtitile: "cafda",\r');
    a.b("\n" + b);
    a.b('	desc: "dfasdfa"\r');
    a.b("\n" + b);
    a.b("}\r");
    a.b("\n" + b);
    a.b("],\r");
    a.b("\n" + b);
    a.b("\r");
    a.b("\n" + b);
    a.b("tailTitleFn: fn,\r");
    a.b("\n" + b);
    a.b("tailSubTitleFn: fn,\r");
    a.b("\n" + b);
    a.b("tailDescFn: fn\r");
    a.b("\n" + b);
    a.b("-->\r");
    a.b("\n" + b);
    a.b("\r");
    a.b("\n" + b);
    a.b('<div class="e_pic_wrap">\r');
    a.b("\n" + b);
    a.b("	<ul>\r");
    a.b("\n" + b);
    if (a.s(a.f("sliders", e, d, 1), e, d, 0, 214, 813, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b('	<li style="position: relative;">\r');
            f.b("\n" + b);
            f.b('		<a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank">\r');
            f.b("\n" + b);
            f.b('			<img width="728" height="215" alt="" src="');
            f.b(f.v(f.f("imgurl", h, g, 0)));
            f.b('">\r');
            f.b("\n" + b);
            f.b("		</a>\r");
            f.b("\n" + b);
            f.b('		<div class="e_flt_inf">\r');
            f.b("\n" + b);
            f.b('			<h2><a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank" title="');
            f.b(f.v(f.f("tailTitleFn", h, g, 0)));
            f.b('">');
            f.b(f.v(f.f("title_tailed", h, g, 0)));
            f.b("</a></h2>\r");
            f.b("\n" + b);
            f.b('			<h3><a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank" title="');
            f.b(f.v(f.f("tailSubTitleFn", h, g, 0)));
            f.b('">');
            f.b(f.v(f.f("subtitle_tailed", h, g, 0)));
            f.b("</a></h3>\r");
            f.b("\n" + b);
            f.b('			<p class="t_info" title="');
            f.b(f.v(f.f("tailDescFn", h, g, 0)));
            f.b('"><a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank">');
            f.b(f.v(f.f("desc_tailed", h, g, 0)));
            f.b('</a><a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" class="l_view">去看看</a></p>\r');
            f.b("\n" + b);
            f.b("		</div>\r");
            f.b("\n" + b);
            f.b('		<div class="e_bg_flt"> </div>\r');
            f.b("\n" + b);
            f.b("	</li>\r");
            f.b("\n");
        });
        e.pop();
    }
    a.b("	</ul>\r");
    a.b("\n" + b);
    a.b("</div>\r");
    a.b("\n" + b);
    a.b("\r");
    a.b("\n" + b);
    a.b('<div class="e_prevnext">\r');
    a.b("\n" + b);
    a.b('    <div class="btn_prev"><a href="javascript: void 0;"></a></div>\r');
    a.b("\n" + b);
    a.b('    <div class="btn_next"><a href="javascript: void 0;"></a></div>\r');
    a.b("\n" + b);
    a.b("</div>\r");
    a.b("\n" + b);
    a.b("\r");
    a.b("\n" + b);
    if (a.s(a.f("fixed_anchor_fn", e, d, 1), e, d, 0, 1037, 1122, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b('<div class="e_sep"><a href="');
            f.b(f.v(f.f("fixedurl", h, g, 0)));
            f.b('" target="_blank">');
            f.b(f.v(f.f("fixedname", h, g, 0)));
            f.b("</a></div>\r");
            f.b("\n");
        });
        e.pop();
    }
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.HotTuan = new Hogan.Template(function(e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="e_hot_tit">\r');
    a.b("\n" + b);
    a.b('    <div class="rt_lnk">\r');
    a.b("\n" + b);
    a.b('        <div class="cs">\r');
    a.b("\n" + b);
    a.b('            <input type="hidden" value="机票产品" name="categories" id="adviceCategories" />\r');
    a.b("\n" + b);
    a.b("            \r");
    a.b("\n" + b);
    a.b("            <select id='tuanCitySelector' style=\"display: none;\">\r");
    a.b("\n" + b);
    if (a.s(a.f("cities", e, d, 1), e, d, 0, 275, 365, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b('                <option data-city="');
            f.b(f.v(f.f("cityname", h, g, 0)));
            f.b('">');
            f.b(f.v(f.f("cityname", h, g, 0)));
            f.b("</option>\r");
            f.b("\n");
        });
        e.pop();
    }
    a.b("            </select>\r");
    a.b("\n" + b);
    a.b("            \r");
    a.b("\n" + b);
    a.b("        </div>\r");
    a.b("\n" + b);
    a.b('        <div class="m_tab_sel">\r');
    a.b("\n" + b);
    a.b("            <ul>\r");
    a.b("\n" + b);
    if (a.s(a.d("initcity.tuanproducts", e, d, 1), e, d, 0, 524, 728, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b('                <li class="" data-moreurl="');
            f.b(f.v(f.f("moreurl", h, g, 0)));
            f.b('" data-tab="city" data-tab-id="city-');
            f.b(f.v(f.f("categoryname", h, g, 0)));
            f.b('" data-tab-active="cur"><a href="javascript:void 0;">');
            f.b(f.v(f.f("categoryname", h, g, 0)));
            f.b("</a></li>\r");
            f.b("\n");
        });
        e.pop();
    }
    a.b("            </ul>\r");
    a.b("\n" + b);
    a.b("        </div>\r");
    a.b("\n" + b);
    a.b('        <a href="');
    a.b(a.v(a.f("moreurl0", e, d, 0)));
    a.b('" class="lnk_more" target="_blank">更多</a></div>\r');
    a.b("\n" + b);
    a.b("    <h3>热门团购排行</h3>\r");
    a.b("\n" + b);
    a.b("</div>\r");
    a.b("\n" + b);
    a.b("\r");
    a.b("\n" + b);
    a.b('<div class="e_hot_cont" data-city="');
    a.b(a.v(a.d("initcity.cityname", e, d, 0)));
    a.b('">\r');
    a.b("\n" + b);
    a.b('    <ul class="ul_hot_tuan clrfix" data-panel="city" data-panel-id="city-');
    a.b(a.v(a.d("initcity.currentPoduct.categoryname", e, d, 0)));
    a.b('" data-moreurl="');
    a.b(a.v(a.d("initcity.currentPoduct.moreurl", e, d, 0)));
    a.b('">\r');
    a.b("\n" + b);
    if (a.s(a.d("initcity.currentPoduct.categoryvalue", e, d, 1), e, d, 0, 1175, 1803, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b("        <li>\r");
            f.b("\n" + b);
            f.b('            <div class="h_img"> <a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank"><img src="');
            f.b(f.v(f.f("image", h, g, 0)));
            f.b('" alt="" width="162" height="110" title="');
            f.b(f.v(f.f("tailTitleFn", h, g, 0)));
            f.b('" /></a><a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank"><em class="m_disct" data-discount="');
            f.b(f.v(f.f("discount", h, g, 0)));
            f.b('"><b>6</b>.5折</em></a> </div>\r');
            f.b("\n" + b);
            f.b('            <div class="h_inf"> <a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" title="');
            f.b(f.v(f.f("tailTitleFn", h, g, 0)));
            f.b('" target="_blank">');
            f.b(f.v(f.f("title_tailed", h, g, 0)));
            f.b("</a> </div>\r");
            f.b("\n" + b);
            f.b('            <div class="h_prc"> <a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank"><span class="prc"><b>&yen;</b>');
            f.b(f.v(f.f("price_new", h, g, 0)));
            f.b('</span></a> 市场价：&yen;<em class="t_c">');
            f.b(f.v(f.f("price_old", h, g, 0)));
            f.b("</em> </div>\r");
            f.b("\n" + b);
            f.b("        </li>\r");
            f.b("\n");
        });
        e.pop();
    }
    a.b("    </ul>\r");
    a.b("\n" + b);
    a.b("</div>");
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.HotTuan_Panel = new Hogan.Template(function(e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="e_hot_cont" data-city="');
    a.b(a.v(a.f("cityname", e, d, 0)));
    a.b('">\r');
    a.b("\n" + b);
    a.b('    <ul class="ul_hot_tuan clrfix" data-panel="city" data-panel-id="city-');
    a.b(a.v(a.d("currentPoduct.categoryname", e, d, 0)));
    a.b('" data-moreurl="');
    a.b(a.v(a.d("currentPoduct.moreurl", e, d, 0)));
    a.b('">\r');
    a.b("\n" + b);
    if (a.s(a.d("currentPoduct.categoryvalue", e, d, 1), e, d, 0, 239, 867, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b("        <li>\r");
            f.b("\n" + b);
            f.b('            <div class="h_img"> <a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank"><img src="');
            f.b(f.v(f.f("image", h, g, 0)));
            f.b('" alt="" width="162" height="110" title="');
            f.b(f.v(f.f("tailTitleFn", h, g, 0)));
            f.b('" /></a><a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank"><em class="m_disct" data-discount="');
            f.b(f.v(f.f("discount", h, g, 0)));
            f.b('"><b>6</b>.5折</em></a> </div>\r');
            f.b("\n" + b);
            f.b('            <div class="h_inf"> <a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" title="');
            f.b(f.v(f.f("tailTitleFn", h, g, 0)));
            f.b('" target="_blank">');
            f.b(f.v(f.f("title_tailed", h, g, 0)));
            f.b("</a> </div>\r");
            f.b("\n" + b);
            f.b('            <div class="h_prc"> <a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank"><span class="prc"><b>&yen;</b>');
            f.b(f.v(f.f("price_new", h, g, 0)));
            f.b('</span></a> 市场价：&yen;<em class="t_c">');
            f.b(f.v(f.f("price_old", h, g, 0)));
            f.b("</em> </div>\r");
            f.b("\n" + b);
            f.b("        </li>\r");
            f.b("\n");
        });
        e.pop();
    }
    a.b("    </ul>\r");
    a.b("\n" + b);
    a.b("</div>");
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.HotTuan_Tab = new Hogan.Template(function(e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<ul class="ul_hot_tuan clrfix" data-panel="city" data-panel-id="city-');
    a.b(a.v(a.f("categoryname", e, d, 0)));
    a.b('" data-moreurl="');
    a.b(a.v(a.f("moreurl", e, d, 0)));
    a.b('">\r');
    a.b("\n" + b);
    if (a.s(a.f("categoryvalue", e, d, 1), e, d, 0, 135, 721, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b("	<li>\r");
            f.b("\n" + b);
            f.b('	    <div class="h_img"> <a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank"><img src="');
            f.b(f.v(f.f("image", h, g, 0)));
            f.b('" alt="" width="162" height="110" title="');
            f.b(f.v(f.f("tailTitleFn", h, g, 0)));
            f.b('" /></a><a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank"><em class="m_disct" data-discount="');
            f.b(f.v(f.f("discount", h, g, 0)));
            f.b('"><b>6</b>.5折</em></a> </div>\r');
            f.b("\n" + b);
            f.b('	    <div class="h_inf"> <a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" title="');
            f.b(f.v(f.f("tailTitleFn", h, g, 0)));
            f.b('" target="_blank">');
            f.b(f.v(f.f("title_tailed", h, g, 0)));
            f.b("</a> </div>\r");
            f.b("\n" + b);
            f.b('	    <div class="h_prc"> <a href="');
            f.b(f.v(f.f("anchorTarget", h, g, 0)));
            f.b('" target="_blank"><span class="prc"><b>&yen;</b>');
            f.b(f.v(f.f("price_new", h, g, 0)));
            f.b('</span></a> 市场价：&yen;<em class="t_c">');
            f.b(f.v(f.f("price_old", h, g, 0)));
            f.b("</em> </div>\r");
            f.b("\n" + b);
            f.b("	</li>\r");
            f.b("\n");
        });
        e.pop();
    }
    a.b("</ul>");
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.PackageCross = new Hogan.Template(function(e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="b_hot_cross">\r');
    a.b("\n" + b);
    a.b('	<div class="e_hot_tit">\r');
    a.b("\n" + b);
    a.b('		<div class="rt_lnk"><a target="_blank" href="javascript:void(0)" class="lnk_change"><i class="arrow"></i>换一换</a></div>\r');
    a.b("\n" + b);
    a.b('		<h3><b class="highlight">免费领取</b>旅游度假代金券，抢到就省</h3>\r');
    a.b("\n" + b);
    a.b("	</div>\r");
    a.b("\n" + b);
    a.b('	<div class="e_hot_cont">\r');
    a.b("\n" + b);
    a.b('		<ul class="ul_cross clrfix">\r');
    a.b("\n" + b);
    if (a.s(a.f("list", e, d, 1), e, d, 0, 309, 761, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b("			<li>\r");
            f.b("\n" + b);
            f.b('				<div class="box_img">\r');
            f.b("\n" + b);
            f.b('					<a target="_blank" href="');
            f.b(f.v(f.f("url", h, g, 0)));
            f.b('">\r');
            f.b("\n" + b);
            f.b('						<img width="162" height="108" src="');
            f.b(f.v(f.f("image", h, g, 0)));
            f.b('" />\r');
            f.b("\n" + b);
            f.b("						<p>");
            f.b(f.v(f.f("name", h, g, 0)));
            f.b("</p>\r");
            f.b("\n" + b);
            f.b("					</a>\r");
            f.b("\n" + b);
            f.b("				</div>\r");
            f.b("\n" + b);
            f.b('				<div class="coupon">\r');
            f.b("\n" + b);
            f.b('					<p class="spe">\r');
            f.b("\n" + b);
            f.b('						<a target="_blank" href="');
            f.b(f.v(f.f("url", h, g, 0)));
            f.b('">立即领取</a>\r');
            f.b("\n" + b);
            f.b("						<span><b>&yen;</b>");
            f.b(f.v(f.f("price", h, g, 0)));
            f.b("</span>\r");
            f.b("\n" + b);
            f.b("					</p>\r");
            f.b("\n" + b);
            f.b('					<p class="desc">');
            f.b(f.v(f.f("name", h, g, 0)));
            f.b("专用优惠券</p>\r");
            f.b("\n" + b);
            f.b('					<p class="date">有效日期:');
            f.b(f.v(f.f("dateFrom", h, g, 0)));
            f.b("-");
            f.b(f.v(f.f("dateTo", h, g, 0)));
            f.b("</p>\r");
            f.b("\n" + b);
            f.b("				</div>\r");
            f.b("\n" + b);
            f.b("			</li>\r");
            f.b("\n");
        });
        e.pop();
    }
    a.b("			<li>\r");
    a.b("\n" + b);
    a.b('				<div class="box_img">\r');
    a.b("\n" + b);
    a.b('					<a target="_blank" href="');
    a.b(a.v(a.d("common.url", e, d, 0)));
    a.b('">\r');
    a.b("\n" + b);
    a.b('						<img width="162" height="108" src="');
    a.b(a.v(a.d("common.image", e, d, 0)));
    a.b('" />\r');
    a.b("\n" + b);
    a.b("						<p>通用</p>\r");
    a.b("\n" + b);
    a.b("					</a>								\r");
    a.b("\n" + b);
    a.b("				</div>\r");
    a.b("\n" + b);
    a.b('				<div class="coupon subcoupon">\r');
    a.b("\n" + b);
    a.b('					<p class="spe">\r');
    a.b("\n" + b);
    a.b('						<a target="_blank" href="');
    a.b(a.v(a.d("common.url", e, d, 0)));
    a.b('">立即领取</a>\r');
    a.b("\n" + b);
    a.b("						<span><b>&yen;</b>");
    a.b(a.v(a.d("common.price", e, d, 0)));
    a.b("</span>\r");
    a.b("\n" + b);
    a.b("					</p>\r");
    a.b("\n" + b);
    a.b('					<p class="desc">全场通用优惠券</p>\r');
    a.b("\n" + b);
    a.b('					<p class="date">有效日期:');
    a.b(a.v(a.d("common.dateFrom", e, d, 0)));
    a.b("-");
    a.b(a.v(a.d("common.dateTo", e, d, 0)));
    a.b("</p>\r");
    a.b("\n" + b);
    a.b("				</div>\r");
    a.b("\n" + b);
    a.b("			</li>\r");
    a.b("\n" + b);
    a.b("		</ul>\r");
    a.b("\n" + b);
    a.b("	</div>\r");
    a.b("\n" + b);
    a.b("</div>");
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.PackageList = new Hogan.Template(function(e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="b_hot_cross">\r');
    a.b("\n" + b);
    a.b('	<div class="e_hot_tit">\r');
    a.b("\n" + b);
    a.b('		<div class="rt_lnk"><a target="_blank" href="');
    a.b(a.v(a.f("moreUrl", e, d, 0)));
    a.b('" class="lnk_more">查看更多&gt;&gt;</a></div>\r');
    a.b("\n" + b);
    a.b("		<h3>猜你喜欢</h3>\r");
    a.b("\n" + b);
    a.b("	</div>\r");
    a.b("\n" + b);
    a.b('	<div class="e_hot_cont">\r');
    a.b("\n" + b);
    a.b('		<ul class="ul_cross clrfix">\r');
    a.b("\n" + b);
    if (a.s(a.f("data", e, d, 1), e, d, 0, 251, 732, "{{ }}")) {
        a.rs(e, d,
        function(h, g, f) {
            f.b("			<li>\r");
            f.b("\n" + b);
            f.b('				<div class="box_img">\r');
            f.b("\n" + b);
            f.b('					<a target="_blank" href="http://dujia.qunar.com');
            f.b(f.v(f.f("url", h, g, 0)));
            f.b('">\r');
            f.b("\n" + b);
            f.b('						<img width="162" height="108" src="');
            f.b(f.v(f.f("image", h, g, 0)));
            f.b('">\r');
            f.b("\n" + b);
            f.b("						<h6>");
            f.b(f.v(f.f("lineDes", h, g, 0)));
            f.b("</h6>\r");
            f.b("\n" + b);
            f.b("					</a>								\r");
            f.b("\n" + b);
            f.b("				</div>\r");
            f.b("\n" + b);
            f.b('				<div class="title"><a target="_blank" href="http://dujia.qunar.com');
            f.b(f.v(f.f("url", h, g, 0)));
            f.b('">');
            f.b(f.v(f.f("title", h, g, 0)));
            f.b("</a></div>\r");
            f.b("\n" + b);
            f.b('				<div class="price">\r');
            f.b("\n" + b);
            f.b('					<span class="raw"><b>&yen;</b>');
            f.b(f.v(f.f("price", h, g, 0)));
            f.b("</span>\r");
            f.b("\n" + b);
            f.b('					市场价：<span class="market"><b>&yen;</b>');
            f.b(f.v(f.f("origPrice", h, g, 0)));
            f.b("</span>\r");
            f.b("\n" + b);
            f.b("				</div>\r");
            f.b("\n" + b);
            f.b("			</li>\r");
            f.b("\n");
        });
        e.pop();
    }
    a.b("		</ul>\r");
    a.b("\n" + b);
    a.b("	</div>\r");
    a.b("\n" + b);
    a.b("</div>");
    return a.fl();
});
var FlightSuggest = (function(e) {
    var b = false;
    function d(n, k) {
        var q = [],
        p,
        m,
        j,
        h;
        var g = function(s) {
            var r = s.type,
            i = s.display;
            i = i.replace(h, '<span class="keyString">$1</span>');
            if (r === 4) {
                i = "·邻近机场：" + i;
            } else {
                if (r === 9) {
                    i = "·相关城市：" + i;
                }
            }
            if (s.length) {
                i += ("-" + s.length + "公里");
            }
            if (r === 1) {
                i += "-该城市没有机场";
            } else {
                if (r === 2) {
                    i += "-该地区的机场有";
                } else {
                    if (r === 6) {
                        i += "-该景点没有机场";
                    } else {
                        if (r === 7) {
                            i += "-该目的地为省份";
                        } else {
                            if (r === 8) {
                                i += "-该目的地为国家";
                            }
                        }
                    }
                }
            }
            return i;
        };
        if (n) {
            p = n.result || [];
            j = n.userInput;
            h = new RegExp("(" + j + ")", "i");
            for (var l = 0, o = p.length; l < o; l += 1) {
                m = p[l];
                q.push({
                    txt: g(m),
                    val: m.key,
                    type: /[1678]/.test(m.type) ? 1 : 0,
                    country: m.country
                });
            }
        }
        if (q.length === 0) {
            q.push({
                txt: '<span style="color: red">对不起，不支持该' + k + "</span>",
                val: "12",
                type: 1,
                country: null
            });
        }
        return q;
    }
    function f(i) {
        var h = i.closest("table").data("data"),
        g = h[i.attr("data-ind") * 1];
        return g;
    }
    function c(g, h) {
        var n = h.visible();
        var j = g.keyCode;
        if (j === 40 && !n) {
            h.show();
            return;
        }
        if (!n) {
            return;
        }
        var l = h.el.find('tr[data-sug_type="0"]');
        var m = l.filter(".active");
        switch (j) {
        case 38:
        case 40:
            h._excludeEl = h._mouseFocus;
            var i = l.index(m);
            i = g.keyCode === 38 ? i - 1 : i + 1;
            if (i >= l.length) {
                i = 0;
            }
            if (i < 0) {
                i = l.length - 1;
            }
            m.removeClass("active");
            m = l.eq(i);
            var k = "";
            if (m.length > 0) {
                k = f(m);
                h.setValue(k.val);
                m.addClass("active");
            }
            g.preventDefault();
            h._trigger("q-suggest-user-action", [g.type, k.val, j]);
            break;
        case 13:
            if (m.length > 0) {
                var k = "";
                k = f(m);
                h.setValue(k.val);
                trackAction("QH|HCT|suggest|" + k.val);
            }
        case 27:
            h.hide();
            h._trigger("q-suggest-user-action", [g.type, h.getValue(), j]);
            break;
        case 18:
        case 9:
            break;
        }
    }
    function a() {}
    e.extend(a.prototype, {
        init: function(h) {
            var g = this;
            e.RegisterPlugin("qcbox", "suggest", h.name, {
                initialize: function() {
                    var i = this.ui.$el;
                    i.qsuggest({
                        ajax: {
                            url: "http://www.qunar.com/suggest/livesearch2.jsp?lang=zh&q=*&sa=true&callback=?",
                            dataType: "jsonp",
                            cache: false
                        },
                        delay: 200,
                        render: function(j) {
                            return j.txt;
                        },
                        reader: function(j) {
                            return d(j, h.tiptext);
                        },
                        container: h.container,
                        exattr: function(j) {
                            return "data-sug_type=" + j.type;
                        },
                        keyevent: function(j) {
                            c(j, this);
                        },
                        getData: function(l) {
                            var k = l.closest("table").data("data"),
                            j = k[l.attr("data-ind") * 1];
                            return j.val;
                        },
                        getExtData: function(l) {
                            if (l.length < 1) {
                                return {};
                            }
                            var k = l.closest("table").data("data"),
                            j = k[l.attr("data-ind") * 1];
                            return j;
                        },
                        on: {
                            "q-suggest-show": function() {
                                i.bind("keydown.kd",
                                function(j) { (j.keyCode == 13) && j.preventDefault();
                                });
                            },
                            "q-suggest-setextdata": function(j, l, k) {
                                k.data("country", l.country);
                                k.data("valided", true);
                            },
                            "q-suggest-setvalue": function(j, l, k) {
                                e(g).trigger("setvalue", [k]);
                            },
                            "q-suggest-noresult": function(j, k) {
                                k.data("country", null);
                                k.data("valided", false);
                                e(g).trigger("setvalue", [k]);
                            },
                            "q-suggest-hide": function(j) {
                                i.unbind("keydown.kd");
                            },
                            "q-suggest-beforeshow": function(j, m, k) {
                                if ( !! k && !!k.c) {
                                    var l = ['<div class="qcity_guess">你要找的是不是<span class="hl">', k.userInput, "</span></div>"];
                                    m.append(l.join(""));
                                }
                            },
                            "q-suggest-user-action": function(j, l, k) {
                                if (l == "mousedown") {
                                    trackAction("QH|HCT|suggest|" + k);
                                }
                            }
                        }
                    });
                }
            });
        },
        isvalid: function() {
            return b;
        }
    });
    return a;
})(jQuery);
var FlightHotCity = (function(b) {
    var f = ".js_close_flight_hotcity";
    var i = QNR.FlightSearchBoxConf.hotCity;
    var h = 360;
    function g(m) {
        var l = i[m.type];
        var n = i.data;
        var j = [];
        b.each(l,
        function(o, q) {
            var p = {
                key: q.key,
                tab: q.title,
                title: n[q.key].title
            };
            j.push(p);
        });
        var k = QTMPL.FlightHotCity.render({
            sort: j,
            type: m.type,
            cityType: m.cityType,
            width: m.width
        });
        return b(k);
    }
    function e(l, j) {
        var k = l.type + "-flight-hotcity-" + l.cityType;
        b(b.tabs).bind(k + "-change",
        function(o, n, q, r) {
            var p = q.data("key");
            var m = r;
            d(i.data[p], m);
        });
        b(j).bind("hotcity-show",
        function() {
            b(l).trigger("hotcity-show");
        });
        c(l, j);
    }
    function c(k, j) {
        j.$hotcity.delegate("a.js-hotcitylist", "click",
        function(l) {
            l.preventDefault();
            var m = j.ui.$el.data("q-suggest");
            if (m) {
                m.setValue(b(this).text());
            } else {
                j.ui.$el.val(b(this).text());
            }
            j.ui.$el.data("country", b(this).data("country"));
            j.ui.$el.data("valided", true);
            b(k).trigger("setvalue", [j.ui.$el]);
            b(k).trigger("hotcity-select", [b(this).text()]);
            j.hideHotcity();
        });
    }
    function d(l, j) {
        if (j.html()) {
            return;
        }
        var k = QTMPL.FlightHotCityList.render(l);
        j.html(k);
    }
    function a() {
        this.cityType = null;
        this.$dom = null;
        this.data = {};
    }
    b.extend(a.prototype, {
        init: function(j) {
            var k = this;
            b.RegisterPlugin("qcbox", "hotcity", "flight", {
                initialize: function() {
                    k.cityType = j.cityType;
                    k.data = j.data;
                    k.type = j.type;
                    k.defaultTab = j.defaultTab;
                    k.width = j.width || h;
                },
                initializeStruct: function() {
                    var m = this.ui.$el,
                    n = this.ui,
                    l = this;
                    k.$dom = g(k);
                    this.$hotcity.append(k.$dom);
                    k.$dom.find(f).click(function() {
                        l.hideHotcity();
                    });
                    e(k, l);
                    b.tabs.init(k.$dom);
                }
            });
        }
    });
    return a;
})(jQuery);
AlsoSearch = (function() {
    function b(i) {
        return document.getElementById(i);
    }
    function h(i) {
        return ["http://clk.qunar.com/q?k=", i.s || "", "&e=", i.e].join("");
    }
    function e(j) {
        var k = document.createElement("script"),
        i = document.getElementsByTagName("head")[0];
        k.charset = "utf-8";
        k.async = true;
        k.src = j;
        i.insertBefore(k, i.lastChild);
    }
    function a() {
        if (!a._singleton) {
            a._singleton = this;
            this.init();
        }
        return a._singleton;
    }
    a.prototype = {
        init: function() {
            this._status = 0;
            this._calls = [];
            this._url = "http://a.qunar.com/vataplan?f=s&cur_page_num=0&rep=1&tag=99&vataposition=QNR_OTU%3D_CN&vatacon=&rows=10&callback=";
        },
        getData: function(i) {
            if (this._status === 2) {
                i(this.$data);
            } else {
                this._calls.push(i);
                if (this._status === 0) {
                    this._loadData();
                }
            }
        },
        _dataReady: function() {
            this._status = 2;
            var l = this._calls;
            for (var k = 0, j = l.length; k < j; k++) {
                l[k](this.$data);
            }
        },
        _loadData: function() {
            var i = this,
            j = "also_search_" + (new Date()).valueOf();
            window[j] = function(m) {
                i.$data = m && m.key_data || [];
                var q = "",
                p, o;
                for (var l = 0, k = i.$data.length; l < k; l++) {
                    q = i.$data[l].description;
                    p = q.split("||");
                    o = {
                        show: p[1] || "yes",
                        city: p[0] ? p[0].split(",") : []
                    };
                    i.$data[l].description = o;
                }
                i._dataReady();
                try {
                    delete window[j];
                } catch(n) {}
            };
            i._status = 1;
            e(this._url + j);
        }
    };
    a.prototype.constructor = a;
    function f() {
        var i = window.external && window.external.max_version;
        return i || /maxthon/i.test(navigator.userAgent);
    }
    var d = f();
    var c = 0;
    var g = function(j, i) {
        this.id = j;
        this._cks_key = "check_" + (c++);
        this.opts = i || {};
        this.init();
    };
    g.prototype = {
        init: function() {
            this._dc = new a();
        },
        _findAD: function(k, j) {
            var i = this;
            if (!k || d) {
                j([]);
                return;
            }
            if (k === i._nowKey) {
                return;
            }
            i._nowKey = k;
            this._dc.getData(function(r) {
                if (i._nowKey !== k) {
                    return;
                }
                if (i._lastKey !== k) {
                    i.$curAD = null;
                }
                i._lastKey = i._nowKey;
                i._nowKey = null;
                var q, p = [],
                n,
                m;
                var s = i.opts.getCountry.call(i);
                for (var o = 0, l = r.length; o < l; o++) {
                    q = r[o].description.city;
                    for (n = 0, m = q.length; n < m; n++) {
                        if ((s == "中国" && q[n] == "国内全部") || (s !== "中国" && q[n] == "国际全部") || (q[n] === k)) {
                            p.push(r[o]);
                            return j(p);
                        }
                    }
                }
                j([]);
            });
        },
        toggle: function(k) {
            var i = this;
            var j = this.opts.getKey.call(this);
            i._findAD(j,
            function(l) {
                i._show(l, k);
            });
        },
        _show: function(l, k) {
            var j = 0;
            if (l.length > 1) {
                j = Math.floor(Math.random() * l.length);
            }
            var i = l[j];
            this.$last_AD = this.$curAD;
            this.$curAD = i;
            this._render(i);
            this._bindEvent();
            this.opts.onChange && this.opts.onChange.call(this, !!i);
            k && k.call(this, !!i);
        },
        _render: function(i) {
            var m = this.opts,
            p = this.id;
            var k = b(m.container);
            var j = this._cks_key;
            if (!k) {
                return;
            }
            if (i) {
                if (this.$last_AD === i) {
                    i[j] = this.$last_AD[j];
                } else {
                    i[j] = i.description.show === "yes" ? true: false;
                }
                var o = i[j] ? 'checked="checked"': "";
                var n = i.title.split("||");
                var l = ['<label class="chk_lab" for="alsosearchchk_', p, '">', '<input name="" autocomplete="off" id="alsosearchchk_', p, '" type="checkbox" ', o, ' class="inp_chk" />', n[1], n[0], "</label>"].join("");
                if (k) {
                    k.innerHTML = l;
                    k.style.display = "inline";
                }
            } else {
                k.style.display = "none";
                k.innerHTML = "";
            }
        },
        _bindEvent: function() {
            var i = b(this.opts.container),
            k,
            j = this;
            if (i) {
                k = i.getElementsByTagName("input")[0];
                k && (k.onclick = function() {
                    j.$curAD[j._cks_key] = this.checked;
                });
            }
            i = k = null;
        },
        getAdUrl: function() {
            if (!this.$curAD || !this.$curAD[this._cks_key]) {
                return "";
            }
            return h(this.$curAD);
        },
        action: function() {
            if (!this.$curAD || !this.$curAD[this._cks_key]) {
                return false;
            }
            try {
                var m = window.screen.availHeight * 1;
                var l = window.screen.availWidth * 1;
                var k = window.open("about:blank", "qunar", "scrollbars=yes,location=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes,toolbar=yes,width=" + Math.round(l) + ",height=" + Math.round(m));
                k.blur();
                k.opener.focus();
                k.location = h(this.$curAD);
            } catch(j) {}
        },
        isActive: function() {
            return !! this.$curAD;
        }
    };
    g.prototype.constructor = g;
    return g;
})();
var BaseFlightSearchBox = (function(f) {
    var r = "input[name=fromCity]";
    var u = "input[name=toCity]";
    var t = "input[name=fromDate]";
    var e = "input[name=toDate]";
    var p = ".js-exchagne-city";
    var n = "input[name=from]";
    var k = ".js-searchtype-deals";
    var c = ".js-searchtype-oneway";
    var i = ".js-searchtype-roundtrip";
    var o = ".js-suggestcontainer";
    var g = ".js-backdate";
    var a = 211;
    function b(w) {
        return w.prevAll(".dp-prefix");
    }
    function d(w) {
        w.qdatepicker("setting", "linkTo", null);
        w.data("q-datepicker").select(v(w.val()));
    }
    function h(w, x) {
        w.qdatepicker("setting", "linkTo", x);
        w.data("q-datepicker").select(v(w.val()));
    }
    function q(w) {
        return w !== "";
    }
    function m(z) {
        var z = new Date(z);
        var x = window.SERVER_TIME || new Date();
        if (z.getTime() < x.getTime()) {
            z = new Date(x.getTime() + 2 * 24 * 60 * 60 * 1000);
        }
        var B = z.getFullYear();
        var w = z.getMonth() + 1;
        var A = z.getDate();
        w = w < 10 ? ("0" + w) : w;
        A = A < 10 ? ("0" + A) : A;
        return [B, w, A].join("-");
    }
    function v(y) {
        var w = y.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        return w ? new Date(w[1], w[2] * 1 - 1, w[3]) : null;
    }
    function l(w, x) {
        f.each(x,
        function(z, y) {
            if (z === "value") {
                var A = w.data("q-suggest");
                if (A) {
                    A.setValue(y);
                }
                w.val(y);
            } else {
                switch (z) {
                case "country":
                    w.data("country", y);
                    break;
                case "valided":
                    w.data("valided", y);
                    break;
                }
            }
        });
    }
    function s(w) {
        return f.extend({},
        w.data(), {
            value: f.trim(w.val())
        });
    }
    function j() {}
    f.extend(j.prototype, {
        init: function(z) {
            var x = this;
            if (x._inited) {
                return;
            }
            var w = f(z.form);
            var A = z.hotcity;
            var y = z.delay || null;
            x.form = z.form;
            x.$form = w;
            x.$toDate = w.find(e);
            x.$fromDate = w.find(t);
            x.$fromCity = w.find(r);
            x.$toCity = w.find(u);
            x.$backdate = w.find(g);
            x.$onewayRadio = f(c, w);
            x.$roundtripRadio = f(i, w);
            x.$dealsRadio = f(k, w);
            x.$exchange = f(p, w);
            x.$from = f(n, w);
            x.alsosearch = z.alsosearch;
            x.placeHolder = {};
            x._initCityInput(A);
            x._initDatePicker(y);
            x._bindEvents();
            x.$toDatePrefix = b(x.$toDate);
            x.$fromDatePrefix = b(x.$fromDate);
            x._inited = true;
            f(x).trigger("initialized");
            x.$onewayRadio.trigger("click");
            return x;
        },
        _initCityInput: function(y) {
            var E = this;
            var w = E.$fromCity.nextAll(o);
            var F = E.$toCity.nextAll(o);
            var B = E.$fromCity,
            z = E.$toCity;
            var A = new FlightHotCity();
            var D = new FlightHotCity();
            var x = new FlightSuggest();
            var C = new FlightSuggest();
            f.each([A, D, x, C],
            function(G, H) {
                f(H).bind("setvalue",
                function(I, J) {
                    E._clearError(J);
                    f(E).trigger("boxchange");
                    f(E).trigger("citychange");
                });
            });
            f(A).bind("hotcity-show",
            function() {
                try {
                    E.$fromCity.data("q-suggest").hide();
                } catch(G) {}
                trackAction("QH|HCT|open");
            });
            f(D).bind("hotcity-show",
            function() {
                try {
                    E.$toCity.data("q-suggest").hide();
                } catch(G) {}
                trackAction("QH|HCT|open");
            });
            f.each([A, D],
            function(G, H) {
                f(H).bind("hotcity-select",
                function(I, J) {
                    trackAction("QH|HCT|select|" + encodeURIComponent(J));
                });
            });
            A.init({
                type: y.fromtype,
                cityType: "from",
                defaultTab: y.fromDefaultTab,
                width: y.hotcityWidth
            });
            x.init({
                name: "flight-fromcity",
                container: w,
                tiptext: B.data("qcbox-placeholder")
            });
            B.qcbox();
            D.init({
                type: y.totype,
                cityType: "to",
                defaultTab: y.toDefaultTab,
                width: y.hotcityWidth
            });
            C.init({
                name: "flight-tocity",
                container: F,
                tiptext: z.data("qcbox-placeholder")
            });
            z.qcbox();
        },
        _initDatePicker: function(D) {
            var H = this;
            var y = typeof SERVER_TIME !== "undefined" ? SERVER_TIME: new Date(),
            C = new Date(y.getFullYear(), y.getMonth(), y.getDate()),
            x = new Date(y.getFullYear(), y.getMonth(), y.getDate() + a);
            var G = D ? D.fromDateDelay: 2;
            toDateDelay = D ? D.toDateDelay: 5;
            var z = new Date(y.getFullYear(), y.getMonth(), y.getDate() + G),
            F = new Date(y.getFullYear(), y.getMonth(), y.getDate() + toDateDelay);
            var B = H.$fromDate,
            w = H.$toDate;
            var A = w.qdatepicker({
                ui: "qunar",
                refObj: B,
                defaultDay: F.valueOf(),
                maxDate: x,
                on: {
                    "q-datepicker-select": function() {
                        f(H).trigger("boxchange");
                    },
                    "q-datepicker-show": function() {
                        trackAction("QH|DP|open");
                    }
                }
            });
            var E = B.qdatepicker({
                ui: "qunar",
                linkRules: "+3D,+0D",
                minDate: C,
                maxDate: x,
                linkTo: A,
                defaultDay: z.valueOf(),
                on: {
                    "q-datepicker-select": function() {
                        f(H).trigger("boxchange");
                    },
                    "q-datepicker-show": function() {
                        trackAction("QH|DP|open");
                    }
                }
            });
        },
        parseDate: function(w) {
            return v(w);
        },
        _bindEvents: function() {
            var w = this;
            w._submitCheck();
            w._bindExChangeCityEvent();
            w._bindSearchTypeChangeEvent();
            w._bindAlsoSearch();
        },
        _checkAlsoSearch: function(y, z) {
            clearTimeout(this._also_timer);
            var w = this;
            function x() {
                var C = w.alsosearch || [];
                if (C.length == 0) {
                    y && y(null);
                    return;
                }
                var B = 0,
                A = C.length,
                D = function(F) {
                    if (F) {
                        y && y(C[B - 1]);
                    } else {
                        var E = C[B++];
                        if (E) {
                            E.toggle(D);
                        } else {
                            y && y(null);
                        }
                    }
                };
                D(false);
            }
            if (z) {
                x();
            } else {
                this._also_timer = setTimeout(x, 10);
            }
        },
        _bindAlsoSearch: function() {
            var w = this;
            var x = w.alsosearch;
            if (!x) {
                return;
            }
            f(w).bind("boxchange",
            function() {
                w._checkAlsoSearch();
            });
        },
        _bindExChangeCityEvent: function() {
            var w = this;
            w.$exchange.click(function(x) {
                var y = w.getToCity();
                w.setToCity(w.getFromCity());
                w.setFromCity(y);
                trackAction("QH|FC|change");
                x.preventDefault();
            });
        },
        _bindSearchTypeChangeEvent: function() {
            var y = this;
            var x = y.$form,
            w = y.$fromDate,
            z = y.$toDate;
            y.$onewayRadio.click(function() {
                d(w);
                w.attr("data-type", "oneWay");
                y.$backdate.hide();
            });
            y.$roundtripRadio.click(function() {
                h(w, z);
                w.attr("data-type", "");
                y.$backdate.show();
            });
            f(y).trigger("searchtypechagne");
        },
        _showError: function(y, z) {
            var x = this;
            var w;
            switch (y) {
            case "from":
                w = x.$fromCity;
                break;
            case "to":
                w = x.$toCity;
                break;
            }
            if (!w.data("org-placeholder")) {
                w.data("org-placeholder", w.data("qcbox-placeholder"));
            }
            w.data("qcbox-placeholder", z);
            w.val("");
            w.parent().parent().addClass("qcbox_err");
        },
        _clearError: function(w) {
            w.data("qcbox-placeholder", w.data("org-placeholder"));
            w.parent().parent().removeClass("qcbox_err");
        },
        _checkCity: function(x, y) {
            var w = this;
            var z = y.value;
            if (q(z) && !y.valided) {
                return false;
            }
            return true;
        },
        _submitCheck: function() {
            var w = this;
            w.$form.submit(function(x) {
                var D = w.getFromCity(),
                B = w.getToCity();
                var y = D.value;
                var A = B.value;
                var z = w.$dealsRadio.is(":checked");
                var C = true;
                if (!z) {
                    if (!q(y) || !w._checkCity("from", D)) {
                        D.qcbox.$el.trigger("mouseup");
                        C = false;
                    } else {
                        if (!q(A) || !w._checkCity("to", B)) {
                            B.qcbox.$el.trigger("mouseup");
                            C = false;
                        }
                    }
                }
                if ((y === A) && q(y) && q(A)) {
                    w._showError("to", "不能和出发地相同");
                    C = false;
                }
                if (encodeURIComponent(y) === "%E6%9E%97%E6%B5%A9" && encodeURIComponent(A) === "%E6%B0%B8%E8%83%9C") {
                    w._showError("from", decodeURIComponent("%E5%AF%B9%E4%B8%8D%E8%B5%B7"));
                    w._showError("to", decodeURIComponent("%E4%BB%96%E4%BB%AC%E6%98%AF%E5%86%A4%E5%AE%B6"));
                    C = false;
                }
                if (!C) {
                    return false;
                }
                w._checkAlsoSearch(function(E) {
                    if (E) {
                        var I = E.getAdUrl();
                        if (I) {
                            var J = window.screen.availHeight * 1;
                            var H = window.screen.availWidth * 1;
                            var G = "qunar_" + (new Date()).valueOf();
                            var F = window.open("about:blank", G, "scrollbars=yes,location=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes,toolbar=yes,width=" + Math.round(H) + ",height=" + Math.round(J));
                            if (f.browser.msie && f.browser.version == "6.0" && !f.support.style) {
                                F.blur();
                                F.opener.focus();
                                F.location = I;
                            } else {
                                x.preventDefault();
                                w.$form.attr("target", G);
                                setTimeout(function() {
                                    w.$form[0].submit();
                                    setTimeout(function() {
                                        location.href = I;
                                    },
                                    10);
                                },
                                10);
                            }
                        }
                    }
                },
                true);
            });
        },
        getId: function() {
            return this.form;
        },
        setFromCity: function(w) {
            l(this.$fromCity, w);
            this._clearError(this.$fromCity);
            f(this).trigger("boxchange");
            return this;
        },
        getFromCity: function() {
            return s(this.$fromCity);
        },
        setToCity: function(w) {
            l(this.$toCity, w);
            this._clearError(this.$toCity);
            f(this).trigger("boxchange");
            return this;
        },
        getToCity: function() {
            return s(this.$toCity);
        },
        fromDate: function(w) {
            if (w == null) {
                return this.$fromDate.val();
            } else {
                this.$fromDate.data("q-datepicker").select(v(w));
                f(this).trigger("boxchange");
            }
            return this;
        },
        toDate: function(w) {
            if (w == null) {
                return this.$toDate.val();
            } else {
                this.$toDate.data("q-datepicker").select(v(w));
                f(this).trigger("boxchange");
            }
            return this;
        },
        fromParam: function(w) {
            if (w == null) {
                return this.$from.val();
            } else {
                this.$from.val(w);
            }
            return this;
        },
        getDom: function() {
            return this.$form;
        },
        fill: function(x) {
            if (!x) {
                return;
            }
            var w = this;
            w.setFromCity({
                value: x.fromCity,
                country: x.fromCountry,
                valided: true
            });
            w.setToCity({
                value: x.toCity,
                country: x.toCountry,
                valided: true
            });
            trackAction("QH|HCT|history|" + encodeURIComponent(x.fromCity));
            trackAction("QH|HCT|history|" + encodeURIComponent(x.toCity));
            w.fromDate(m(x.fromDate));
            if (x.roundtrip) {
                w.toDate(m(x.toDate));
                w.$roundtripRadio.attr("checked", "checked");
                w.$roundtripRadio.trigger("click");
            } else {
                w.$onewayRadio.attr("checked", "checked");
                w.$onewayRadio.trigger("click");
            }
        }
    });
    return j;
})(jQuery);
var DomesticFlightSearchBox = (function(b) {
    function a() {
        this._cityTempData = {
            from: {},
            to: {}
        };
        this._fromDeals = false;
    }
    b.extend(a.prototype, BaseFlightSearchBox.prototype, {
        changeSerchType: function() {
            var d = this,
            g = d.$fromDatePrefix,
            f = d.$toDatePrefix,
            c = d.$fromDate,
            e = d.$toDate;
            d.$dealsRadio.click(function() {
                g.html("从");
                f.html("到");
                c.qdatepicker("setting", "linkTo", e);
                c.data("q-datepicker").select(d.parseDate(c.val()));
                d.$backdate.show();
                d.$backdate.css({
                    visibility: "visible"
                });
                d._saveCityAndClear();
                d._fromDeals = true;
            });
            d.$onewayRadio.click(function() {
                g.html("往");
                f.html("返");
                d._restoreCity();
            });
            d.$roundtripRadio.click(function() {
                g.html("往");
                f.html("返");
                d.$backdate.css({
                    visibility: "visible"
                });
                d._restoreCity();
            });
        },
        _saveCityAndClear: function() {
            var c = this,
            d = c._cityTempData;
            d.from = b.extend({},
            c.getFromCity());
            d.to = b.extend({},
            c.getToCity());
            c._setPlaceHolder(c.$fromCity, "出发地(可不填)");
            c._setPlaceHolder(c.$toCity, "目的地(可不填)");
            c.setFromCity({
                value: "",
                country: "",
                valided: true
            }).setToCity({
                value: "",
                country: "",
                valided: true
            });
        },
        _restoreCity: function() {
            var c = this;
            if (!c._fromDeals) {
                return;
            }
            var d = c._cityTempData;
            c._setPlaceHolder(c.$fromCity, "出发地");
            c._setPlaceHolder(c.$toCity, "目的地");
            c.setFromCity(d.from);
            c.setToCity(d.to);
            c._fromDeals = false;
        },
        _setPlaceHolder: function(c, d) {
            c.data("org-placeholder", d);
            c.data("qcbox-placeholder", d);
        }
    });
    return a;
})(jQuery);
var InterFlightSearchBox = (function(c) {
    var b = "#js_inter_backdate";
    function a() {}
    c.extend(a.prototype, BaseFlightSearchBox.prototype, {
        backdatepanel: function() {
            return c(b);
        }
    });
    return a;
})(jQuery);
var FlightSearchBox = (function(d) {
    var q = false;
    var t = null;
    var o = "#js_inter_tab";
    var m = "#js_domestic_tab";
    var g = "#js_flighttype_tab_domestic";
    var u = "#js_flighttype_tab_inter";
    var r = null;
    var i = new DomesticFlightSearchBox();
    var l = new InterFlightSearchBox();
    var p = k().from;
    var j = null;
    var b = false;
    var n = "#js_flight_domestic_searchbox";
    var h = "#js_flight_international_searchbox";
    function c(z) {
        var v = d(o),
        w = d(m),
        x = d(u),
        y = d(g);
        v.click(function() {
            v.addClass("cur");
            w.removeClass("cur");
            x.show();
            y.hide();
            if (!b) {
                s();
                b = true;
            }
        });
        w.click(function() {
            w.addClass("cur");
            v.removeClass("cur");
            y.show();
            x.hide();
        });
    }
    function e() {
        var v = i;
        if (IP_ADDRESS) {
            v.setFromCity({
                value: IP_ADDRESS,
                valided: true
            });
        }
        v.fromParam(p);
    }
    function k() {
        var x = {};
        var v = window.location.search.replace("?", "");
        var w = v.split("&");
        d.each(w,
        function(C, B) {
            var y = B.split("=");
            var A = y[0],
            z = y[1];
            x[A] = z || "";
        });
        return x;
    }
    function f() {
        var w = i;
        var v = new AlsoSearch("domestic", {
            container: "js_alsosearch_domestic",
            getKey: function() {
                return w.getToCity().value;
            },
            getCountry: function() {
                return w.getToCity().country;
            }
        });
        d(w).bind("initialized",
        function() {
            w.changeSerchType();
        });
        w.init({
            form: n,
            hotcity: {
                fromtype: "domesticfrom",
                totype: "domesticto",
                fromDefaultTab: "热门",
                toDefaultTab: "热门"
            },
            alsosearch: [v]
        });
    }
    function s() {
        var w = l;
        var v = new AlsoSearch("domestic_inter", {
            container: "js_alsosearch_inter",
            getKey: function() {
                return w.getToCity().value;
            },
            getCountry: function() {
                return w.getToCity().country;
            }
        });
        w.init({
            form: h,
            hotcity: {
                fromtype: "interfrom",
                totype: "interto",
                fromDefaultTab: "热门",
                toDefaultTab: "国际热门",
                hotcityWidth: 450
            },
            alsosearch: [v],
            delay: {
                fromDateDelay: 15,
                toDateDelay: 22
            }
        });
        if (IP_ADDRESS) {
            w.setFromCity({
                value: IP_ADDRESS,
                valided: true
            });
        }
        w.fromParam(p);
        j.interFirst && w.fill(j.interFirst);
        var x = new InterAutoDateHelper("js_flight_international_searchbox");
        x.$jq(w);
        w.$fromCity.css("margin-left", "16px");
        w.$toCity.css("margin-left", "16px");
        w.$fromDate.css("margin-left", "16px");
        w.$toDate.css("margin-left", "16px");
    }
    function a() {}
    d.extend(a.prototype, {
        init: function(v) {
            if (q) {
                return;
            }
            t = d(v);
            var w = QTMPL.FlightSearchBox.render();
            t.html(w);
            f(this);
            c(this);
            e();
            q = true;
            return t;
        },
        parseHistory: function(x) {
            if (!x) {
                return;
            }
            j = x;
            var w = j.domesticFirst;
            var v = j.interFirst;
            w && i.fill(j.domesticFirst);
            if (!r) {
                r = d(o);
            }
            if (v && (!w || (parseInt(v.timestamp, 10) - parseInt(w.timestamp, 10) > 0))) {
                d(u).show();
                r.trigger("click");
            }
        }
    });
    return a;
})(jQuery);
function InterAutoDateHelper(a) {
    this.formId = a;
}
InterAutoDateHelper.prototype._init = function() {
    var a = this.formId;
    this.url = "http://rc.flight.qunar.com/rtripdate?";
    this.isAuto = false;
    this.fromCity = document.getElementById(a).fromCity;
    this.toCity = document.getElementById(a).toCity;
    if (this.toCity.value === "") {
        this.isAuto = true;
    }
    this.fromDate = document.getElementById(a).fromDate;
    this.toDate = document.getElementById(a).toDate;
};
InterAutoDateHelper.prototype.$jsex = function(b) {
    this._init();
    var a = this;
    $jex.event.bind(this.fromDate, "focus",
    function() {
        a.isAuto = false;
    });
    $jex.event.bind(this.toDate, "focus",
    function() {
        a.isAuto = false;
    });
    if (this.isAuto) {
        this._getAutoDate(b);
    }
};
InterAutoDateHelper.prototype._getAutoDate = function(b) {
    var a = this;
    $jex.event.bind(b, "citychange",
    function() {
        if (a.isAuto) {
            if ( !! a.toCity.value) {
                var e = a.fromCity.value;
                var d = a.toCity.value;
                var c = a.url + "dpt=" + encodeURIComponent(e) + "&arr=" + encodeURIComponent(d);
                $jex.jsonp(c,
                function(h) {
                    var g = h.go_date;
                    var f = h.back_date;
                    b.fromDate.setValue(g);
                    b.toDate.setValue(f);
                });
                $jex.event.clear(b, "citychange");
            }
        }
    });
};
InterAutoDateHelper.prototype.$jq = function(b) {
    this._init();
    var a = this;
    jQuery(this.fromDate).bind("focus",
    function() {
        a.isAuto = false;
    });
    jQuery(this.toDate).bind("focus",
    function() {
        a.isAuto = false;
    });
    if (this.isAuto) {
        this._$getAutoDate(b);
    }
};
InterAutoDateHelper.prototype._$getAutoDate = function(b) {
    var a = this;
    jQuery(b).bind("citychange",
    function() {
        if (a.isAuto) {
            var e = a.fromCity.value;
            var d = a.toCity.value;
            if (d != "") {
                a.isAuto = false;
            } else {
                return;
            }
            var c = a.url + "dpt=" + encodeURIComponent(e) + "&arr=" + encodeURIComponent(d) + "&callback=?";
            jQuery.getJSON(c,
            function(h) {
                var g = h.go_date;
                var f = h.back_date;
                jQuery(a.fromDate).data("q-datepicker").select(new Date(g.replace(/-/g, "/")));
                jQuery(a.toDate).data("q-datepicker").select(new Date(f.replace(/-/g, "/")));
            });
        }
    });
};
var MainSliderShowBox = (function(e) {
    var j = document;
    var h = ".";
    var i = "http://tuan.qunar.com/api/indexdata.php?";
    var g = 4000;
    var a = "b_pic_csl",
    f = "js_b_mainslider",
    d = "e_pic_wrap",
    b = "e_flt_inf";
    function k(m, l) {
        e.qClass.base(this, m, l);
        this.triggerDeactivedCls = "deactive";
    }
    e.extend(e.fn.able, {
        MainSlideable: k
    });
    e.qClass.inherits(k, e.able.Switchable);
    e.extend(k.prototype, {
        _parseStructure: function() {
            e.qClass.base(this, "_parseStructure");
            this.$panels = this.$container.find(".e_pic_wrap li");
            this.$panel_aff = this.$container.find("." + b);
            this.$triggers = this.$container.find(".e_prevnext");
            this.$preBtn = this.$triggers.find(".btn_prev");
            this.$nextBtn = this.$triggers.find(".btn_next");
            this.viewLength = this.$panels.length / this.config.step;
        },
        _init: function() {
            var l = this;
            e.qClass.base(this, "_init");
            var m;
            (m = function() {
                if (this.switchTimer) {
                    clearInterval(this.switchTimer);
                }
                this.switchTimer = setInterval(function() {
                    l.next();
                },
                g);
            }).call(l);
            this.$container.hover(function() {
                if (l.switchTimer) {
                    clearInterval(l.switchTimer);
                    delete l.switchTimer;
                }
            },
            function() {
                e.proxy(m, l)();
            });
        },
        _switchTrigger: function() {},
        _bindTriggers: function() {
            var l = this;
            this.$preBtn.click(function(m) {
                l.prev();
            });
            this.$nextBtn.click(function(m) {
                l.next();
            });
        }
    });
    e.fn.mainSlideable = function(l) {
        var n = this;
        var m = n.data("mainSlideables");
        n.data("mainSlideables", m ? m: []);
        return n.each(function() {
            n.data("mainSlideables").push(new k(e(this), l));
        });
    };
    function c() {
        this.moduleName = "MainSliderShowBox";
        this.$container = e("#js_b_mainslider");
        this.url = i;
    }
    e.qClass.inherits(c, e.qWidget);
    e.extend(c.prototype, {
        format: function(m) {
            function l(o, p) {
                return function() {
                    return this[o].length > p ? this[o] : "";
                };
            }
            m.fixedname = m.fixed_anchor[1];
            m.fixedurl = m.fixed_anchor[0];
            e.each(m.sliders,
            function(n, o) {
                e.each([["title", 11], ["subtitle", 14], ["desc", "45"]],
                function(q, p) {
                    o[p[0]].length > p[1] && (o[p[0] + "_tailed"] = o[p[0]].substring(0, p[1]) + "...") || (o[p[0] + "_tailed"] = o[p[0]]);
                });
            });
            m.fixed_anchor_fn = function() {
                return function(o, n) {
                    return n(o);
                };
            };
            m.tailTitleFn = l("title", 11);
            m.tailSubTitleFn = l("subtitle", 14);
            m.tailDescFn = l("desc", 45);
            return m;
        },
        getUrl: function() {
            return this.url + "type=ppt&callback=?";
        },
        isSuccessStatus: function(l) {
            return l.ret == 1 && l.data.sliders instanceof Array && l.data.sliders.length > 0;
        },
        setupBoxView: function() {
            this.$container.find(".e_pic_wrap li").each(function(l, m) {
                if (l != 0) {
                    e(this).hide();
                }
            });
        },
        bindEvent: function() {
            this.$mSliderBox = this.$container.mainSlideable({
                panelCls: d,
                effect: "scrollx",
                circle: true,
                viewSize: [728, 215]
            });
        }
    });
    return c;
})(jQuery);
var HotTuanBox = (function(b) {
    var f = ".",
    g = {
        tuan: "http://tuan.qunar.com/api/indextuan_v4.php?",
        cross: "http://tuan.qunar.com/api/indexcross.php",
        list: "http://dujia.qunar.com/apis/indexVoucherRoutes.jsp?des="
    },
    e = "QN101",
    i = {
        url: "http://dujia.qunar.com/p/generalVoucher?cross="
    },
    a = "b_hot_wrap",
    j = "js_b_hottuan",
    h = "tuanCitySelector";
    var c = {
        formatDate: function(l) {
            var k = new Date(l.replace(/-/g, "/"));
            return k.getMonth() + 1 + "月" + k.getDate() + "日";
        }
    };
    function d() {
        this.$container = b("#" + j);
        this.type = "tuan";
        if (Cookie && Cookie.values && (e in Cookie.values)) {
            this.url = g.list + encodeURIComponent(Cookie.values[e].slice(1));
            this.type = "list";
            if (Cookie.values[e]) {
                this.moreUrl = "http://dujia.qunar.com/pq/list_" + encodeURIComponent(Cookie.values[e].slice(1));
            } else {
                this.moreUrl = "http://dujia.qunar.com/p/list";
            }
        } else {
            if (/ex_track=.+/.test(window.location.href)) {
                this.url = g.cross + window.location.search;
            } else {
                this.url = g.tuan;
            }
        }
    }
    b.qClass.inherits(d, b.qWidget);
    b.extend(d.prototype, {
        format: function(k) {
            try {
                var m = {
                    cities: []
                };
                if (!k.type) {
                    if (this.type == "tuan") {
                        k = {
                            type: "tuan",
                            data: k
                        };
                    } else {
                        if (this.type == "list") {
                            k = {
                                type: "list",
                                moreUrl: this.moreUrl,
                                data: k
                            };
                        }
                    }
                }
                this.type = k.type;
                if (this.type == "tuan") {
                    this.moduleName = "HotTuan";
                    this.modeldata = this.formatTuan(k.data);
                } else {
                    if (this.type == "coupon") {
                        this.moduleName = "PackageCross";
                        this.modeldata = this.formatCoupon(k);
                    } else {
                        if (this.type == "list") {
                            this.moduleName = "PackageList";
                            this.modeldata = this.formatList(k);
                        }
                    }
                }
                return this.modeldata;
            } catch(l) {
                this.moduleName = "HotTuan";
                this.type = "tuan";
                this.modeldata = m;
            }
        },
        formatTuan: function(k) {
            var l = {
                cities: []
            };
            b.each(k,
            function(m, o) {
                if (m == "initcity") {
                    return;
                }
                b.each(o,
                function(p, r) {
                    var q = {};
                    b.each(r,
                    function(s, t) {
                        if (s == "moreurl") {
                            q.moreurl = t;
                            return;
                        }
                        q.categoryname = s;
                        q.categoryvalue = t;
                        b.each(t,
                        function(u, v) {
                            v.title.length > 24 && (v.title_tailed = v.title.substring(0, 23) + "...") || (v.title_tailed = v.title);
                        });
                        q.tailTitleFn = function() {
                            return this.title.length > 24 ? this.title: "";
                        };
                    });
                    o[p] = q;
                });
                var n = {
                    cityname: m,
                    tuanproducts: o
                };
                l.cities.push(n);
                if (k.initcity == m) {
                    l.initcity = n;
                    l.initcity.currentPoduct = l.initcity.tuanproducts[0];
                    l.moreurl0 = l.initcity.currentPoduct.moreurl;
                }
            });
            if (! ("initcity" in l)) {
                l.initcity = l.cities[0];
                if (l.initcity) {
                    l.initcity.currentPoduct = l.initcity.tuanproducts[0];
                    l.moreurl0 = l.initcity.currentPoduct.moreurl;
                }
            }
            return l;
        },
        formatCoupon: function(k) {
            this.couponList = {
                current: 0,
                data: k.citys || []
            };
            b.each(this.couponList.data,
            function() {
                this.url = "http://dujia.qunar.com/pq/list_" + encodeURIComponent(this.name) + "?cross=" + encodeURIComponent(this.name);
            });
            i.dateTo = c.formatDate(k.dateTo);
            i.dateFrom = c.formatDate(k.dateFrom);
            i.price = k.commonPrice;
            i.image = k.commonImage;
            return this.getNextCouponData();
        },
        getNextCouponData: function() {
            var o = this.couponList.current;
            var m = this.couponList.data;
            var n = m.length - (o + 1) * 3;
            n = n < 0 ? -n: 0;
            var l = m.slice(o * 3 - n, o * 3 + 3 - n);
            var k = {
                common: i,
                list: []
            };
            b.each(l,
            function() {
                k.list.push(b.extend({},
                this, {
                    dateFrom: i.dateFrom,
                    dateTo: i.dateTo
                }));
            });
            if (parseInt((m.length + 2) / 3) > o + 1) {
                this.couponList.current++;
            } else {
                this.couponList.current = 0;
            }
            return k;
        },
        couponList: false,
        formatList: function(l) {
            var m = b.extend({
                data: []
            },
            l);
            if (m.data.length < 4) {
                m.data = [];
            }
            for (var k = 0; k < m.data.length; k++) {
                if (m.data[k].dep) {
                    m.data[k].lineDes = m.data[k].dep + "-" + m.data[k].des;
                } else {
                    m.data[k].lineDes = m.data[k].des + "当地游";
                }
            }
            return m;
        },
        sliceModelData: function(n, k, m) {
            var l = null;
            b.each(n,
            function(o, p) {
                if (p[k] == m) {
                    l = p;
                    return false;
                }
            });
            return l;
        },
        _setupTuanDiscount: function(k) {
            b(k).find("em.m_disct").each(function(l, q) {
                var p = b(this).data("discount") + "",
                o = p.split("."),
                n = (o[1] ? ("." + o[1]) : "") + "折",
                m = o[0];
                p = "<b>" + m + "</b>" + n;
                b(this).html(p);
            });
        },
        setupBoxView: function() {
            if (this.type == "tuan") {
                this.setupTuanBoxView();
            } else {
                if (this.type == "coupon") {} else {
                    if (this.type == "list") {}
                }
            }
        },
        setupTuanBoxView: function() {
            var m = this.$container.find("div.m_tab_sel ul");
            b(m[0].firstChild).addClass("cur");
            var o = this.$container.find("div[data-city]").each(function() {
                b(this).hide();
            });
            var l = this.$container.find("div[data-city='" + this.modeldata.initcity.cityname + "']");
            var n = l[0].children[0];
            b(n.children[3]).addClass("last");
            var k = l[0].children.length;
            while (k--) {
                k == 0 && (l[0].children[k].style.display = "block") || (l[0].children[k].style.display = "none");
            }
            l.show();
            this._setupTuanDiscount(n);
        },
        bindEvent: function() {
            if (this.type == "tuan") {
                this.bindTuanEvents();
            } else {
                if (this.type == "coupon") {
                    this.bindCouponEvents();
                } else {
                    if (this.type == "list") {
                        this.bindListEvents();
                    }
                }
            }
        },
        bindListEvents: function() {},
        bindCouponEvents: function() {
            var k = this.$container.find(".lnk_change");
            k.bind("click", b.proxy(function(n) {
                n.preventDefault();
                var m = this.getNextCouponData();
                var l = QTMPL[this.moduleName].render(m);
                this.render(l);
                this.setupBoxView();
                this.bindEvent();
            },
            this));
        },
        bindTuanEvents: function() {
            var m = this;
            var l = b("#tuanCitySelector");
            var k = 0;
            l.children("option").each(function(n, o) {
                if (b(o).text() == m.modeldata.initcity.cityname) {
                    k = n;
                    return false;
                }
            });
            l.yselector({
                index: k,
                onchange: function(o) {
                    var u;
                    var r = "";
                    var n;
                    var q;
                    m.$container.find("div[class='e_hot_cont'][data-city]:visible").hide();
                    u = m.$container.find("div[class='e_hot_cont'][data-city='" + o.value + "']");
                    var s = m.currentcity = m.sliceModelData(m.modeldata.cities, "cityname", o.value); ! ("currentPoduct" in m.currentcity) && (m.currentcity.currentPoduct = m.currentcity.tuanproducts[0]);
                    if (u.length == 0) {
                        var p = QTMPL.HotTuan_Panel.render(s);
                        u = b(p);
                        m.$container.append(u);
                    }
                    n = s.currentPoduct.moreurl;
                    b.each(s.tuanproducts,
                    function(x, w) {
                        var v = '<li class="" data-tab="city" data-tab-id="city-{{catname}}" data-tab-active="cur"	data-moreurl="{{moreurl}}"><a href="javascript:void 0;">{{catname}}</a></li>';
                        r += v.replace(/({{catname}})|({{moreurl}})/g,
                        function() {
                            var y = arguments[1] == "{{catname}}" ? w.categoryname: w.moreurl;
                            return y;
                        });
                    });
                    var t;
                    (t = m.$container.find(".m_tab_sel ul").html(r)).parent().next("a").attr("href", n);
                    t.children("li").each(function(v, w) {
                        if (v == 0) {
                            b(this).addClass("cur");
                            return false;
                        }
                    });
                    q = u.children("ul");
                    q.each(function(w, x) {
                        var v;
                        w != 0 && b(this).hide();
                        w == 0 && (b(x).show(), m._setupTuanDiscount(x), v = x.children.length, b(x.children[v - 1]).addClass("last"));
                    });
                    u.show();
                }
            });
            b(b.tabs).bind("city-change",
            function(o, n, p, q, r) {
                m.$container.find("a.lnk_more").attr("href", p.data("moreurl"));
            });
            this.hover_timer = null;
            this.$container.delegate("li[data-tab='city']", "mouseenter",
            function(n) {
                var o = this;
                m.hover_timer = setTimeout(function() {
                    var s = b(o),
                    r = s.data("tab"),
                    p = s.data("tab-id"),
                    t = s.data("tab-active"),
                    x = m.$container.find("[data-city=" + l.data("YSELECTOR").text() + "]"),
                    u = x.children("ul[data-panel-id='" + p + "']");
                    if (u.length != 0) {
                        b.tabs.changeTab(m.$container, r, p, t);
                    } else {
                        var v = m.currentcity.currentPoduct = m.sliceModelData(m.currentcity.tuanproducts, "categoryname", p.split("-")[1]);
                        var y = QTMPL.HotTuan_Tab.render(v);
                        x.append((u = b(y)));
                        b.tabs.changeTab(m.$container, r, p, t);
                    }
                    var q = u[0].children.length;
                    b(u[0].children[q - 1]).addClass("last");
                    m._setupTuanDiscount(u[0]);
                    delete m.hover_timer;
                },
                250);
                n.stopPropagation();
            }).delegate("li[data-tab='city']", "mouseleave",
            function(n) {
                if (m.hover_timer) {
                    clearTimeout(m.hover_timer);
                    delete m.hover_timer;
                }
            });
        }
    });
    return d;
})(jQuery);
(function(X) {
    if (typeof X.QNR === "undefined") {
        X.QNR = {};
    }
    QNR._AD = {};
    var ai = "getElementsByTagName";
    var ad = X,
    $doc = ad.document,
    P = $doc.body,
    $head = $doc[ai]("head")[0],
    S = "qunar.com",
    D = false,
    ak = 0,
    j,
    O,
    al,
    q,
    T,
    o,
    v;
    try {
        $doc.domain = S;
    } catch(ah) {}
    var W = function() {
        var at = ad.navigator,
        ap = "application/x-shockwave-flash";
        var an = false,
        am, aq;
        var ao = (at.mimeTypes && at.mimeTypes[ap]) ? at.mimeTypes[ap].enabledPlugin: 0;
        if (ao) {
            aq = ao.description;
            if (parseInt(aq.substring(aq.indexOf(".") - 2), 10) >= 8) {
                an = true;
            }
        } else {
            if (ad.ActiveXObject) {
                try {
                    am = new ad.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if (am) {
                        an = true;
                    }
                } catch(ar) {}
            }
        }
        W = function() {
            return an;
        };
        ao = am = aq = at = null;
        return an;
    };
    function u(an, av, az, aw) {
        var e, ay = av.document,
        ap = ay.getElementById(an);
        if (ap) {
            az.id = an;
            if (/MSIE/i.test(navigator.appVersion)) {
                var ax = [];
                ax.push('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
                for (var au in az) {
                    if (az.hasOwnProperty(au)) {
                        au = au.toLowerCase();
                        if (au === "data") {
                            aw.movie = az[au];
                        } else {
                            if (au === "styleclass") {
                                ax.push(' class="', az[au], '"');
                            } else {
                                if (au !== "classid") {
                                    ax.push(" ", au, '="', az[au], '"');
                                }
                            }
                        }
                    }
                }
                ax.push(">");
                for (var at in aw) {
                    if (aw.hasOwnProperty(at)) {
                        ax.push('<param name="', at, '" value="', aw[at], '" />');
                    }
                }
                ax.push("</object>");
                ap.outerHTML = ax.join("");
                e = ay.getElementById(az.id);
            } else {
                var ao = ay.createElement("object");
                ao.style.outline = "none";
                ao.setAttribute("type", "application/x-shockwave-flash");
                for (var ar in az) {
                    if (az.hasOwnProperty(ar)) {
                        ar = ar.toLowerCase();
                        if (ar === "styleclass") {
                            ao.setAttribute("class", az[ar]);
                        } else {
                            if (ar !== "classid") {
                                ao.setAttribute(ar, az[ar]);
                            }
                        }
                    }
                }
                for (var aq in aw) {
                    if (aw.hasOwnProperty(aq) && aq.toLowerCase() !== "movie") {
                        var am = ay.createElement("param");
                        am.setAttribute("name", aq);
                        am.setAttribute("value", aw[aq]);
                        ao.appendChild(am);
                    }
                }
                ap.parentNode.replaceChild(ao, ap);
                e = ao;
            }
            if (!X.adsStatus) {
                X.adsStatus = [];
            } else {
                X.adsStatus.push(an);
            }
        }
        return e;
    }
    function H(ao, an, am, e) {
        if (!W()) {
            return null;
        }
        return u(ao, an, am, e);
    }
    function G(e) {
        return $doc.getElementById(e);
    }
    function f(am, e) {
        return am.getAttribute("data-" + e);
    }
    var w = (function() {
        var e = ["type", "style", "query", "main"],
        an = {};
        function am(at) {
            var ar = {},
            ap;
            if (!at) {
                return {};
            }
            ar.id = at.id;
            for (var aq = 0, ao = e.length; aq < ao; aq++) {
                ap = e[aq];
                ar[ap] = f(at, ap);
            }
            if (ar.type === "qde_text") {
                ar.adurl = f(at, "adurl");
            }
            return ar;
        }
        return function(ao) {
            var aq, ap;
            if (typeof ao === "string") {
                aq = ao;
            } else {
                aq = ao.id;
                ap = ao;
            }
            if (!an[aq]) {
                an[aq] = am(ap || G(aq));
            }
            return an[aq];
        };
    })();
    var J = "qde.qunar.com",
    k = "a.qunar.com";
    var i = String( + new Date()) + parseInt(Math.random() * 10000000, 10);
    function B(an) {
        var am = [];
        for (var e in an) {
            am.push(e + "=" + encodeURIComponent(an[e]));
        }
        return am.join("&");
    }
    function a(ao) {
        var e = J,
        an = "/js.ng/";
        if (ao.type === "qde_text") {
            an = ao.adurl ? "/" + ao.adurl + "?": "/qadjs14_css.nghtml?";
        }
        var ap = i;
        if (ao.id === QNR.AD.__cur_qde_ad) {
            i = String( + new Date()) + parseInt(Math.random() * 10000000, 10);
        }
        var am = ["http://", e, an, "framId=", ao.id, "&", ao.query, "&tile=", ap];
        if (o) {
            am.push("&city=", o);
        }
        if (D) {
            am.push("&adtest=beta");
        }
        if (q) {
            am.push(q);
        }
        return am.join("");
    }
    function E(e) {
        return ac(e.id).urlPath(e);
    }
    function g(am) {
        var e = "";
        switch (am.type) {
        case "qde":
        case "qde_text":
            e = a(am);
            break;
        case "qad":
            e = E(am);
            break;
        default:
            break;
        }
        return e;
    }
    function V() {
        return $doc.createElement("div");
    }
    function y() {
        var e = $doc.createElement("iframe");
        e.setAttribute("height", 0);
        e.setAttribute("frameBorder", 0);
        e.setAttribute("scrolling", "no");
        e.style.display = "none";
        return e;
    }
    function x(am, e) {
        if (e && e.parentNode) {
            e.parentNode.insertBefore(am, e);
        }
    }
    function I(am, e) {
        var an = am === "div" ? V() : y();
        if (e && e.style) {
            an.style.cssText = e.style;
        }
        if (am === "iframe") {
            an.style.display = "none";
        }
        return an;
    }
    function n(ao, am) {
        am = am || "div";
        var e = w(ao),
        an = I(am, e);
        return an;
    }
    function aj(an) {
        var am = n(an, "div"),
        e = G(an);
        if (e && e.parentNode) {
            e.parentNode.insertBefore(am, e);
        }
        return am;
    }
    function s(e) {
        var am = $doc.createElement("script");
        am.charset = "utf-8";
        am.async = true;
        am.src = e;
        $head.insertBefore(am, $head.lastChild);
    }
    var d;
    function K(e) {
        if (!d) {
            d = V();
            d.style.display = "none";
            document.body.appendChild(d);
        }
        d.appendChild(e);
    }
    var Z;
    function Y() {
        if (Z) {
            return Z;
        }
        var ao = $doc[ai]("abbr"),
        an = [];
        for (var am = 0, e = ao.length; am < e; am++) {
            if (f(ao[am], "type") && f(ao[am], "lazyAD") !== "1") {
                an.push(ao[am]);
            }
        }
        return an;
    }
    function r(ao, am) {
        ao = ao || [];
        am = am || {};
        var ar = {},
        av, at, ap, e = /chan=([a-z_]+)/,
        au;
        for (var aq = 0, an = ao.length; aq < an; aq++) {
            av = ao[aq];
            at = w(av);
            if (at.type === "qad") {
                at.callback = QNR.AD.getCallbackName(at.id, true);
            }
            ap = g(at);
            if (!O && at.type === "qde") {
                au = e.exec(ap);
                if (au && au[1]) {
                    O = au[1];
                }
            }
            if (ap) {
                ar[at.id] = ap;
            }
        }
        return {
            ads: ar,
            domain: S
        };
    }
    var c;
    function p() {
        if (c) {
            setTimeout(function() {
                if (c) {
                    c.parentNode.removeChild(c);
                    c = null;
                }
            },
            0);
        }
    }
    function z(ao) {
        var an = $doc.createElement("div");
        an.style.display = "none";
        var am = [];
        j = "http://vata.qunar.com/vata?chan=" + (O || ""),
        am.push('<form name="vata_main_form" target="vata_main_frame" action="' + j + '" method="POST">');
        ao.ads = ao.ads || {};
        for (var e in ao.ads) {
            if (ao.ads.hasOwnProperty(e)) {
                am.push('<input type="text" name="', e, '" value="', ao.ads[e], '" />');
            }
        }
        am.push("</form>");
        am.push("<iframe src='' name='vata_main_frame' id='vata_main_frame'></iframe>");
        an.innerHTML = am.join("");
        c = an;
        K(an);
        if (/MSIE/i.test(navigator.appVersion)) {
            G("vata_main_frame").src = "javascript:'<script>window.onload=function(){document.write(\\'<script>document.domain=\\\"" + S + "\\\";parent.document.vata_main_form.submit();<\\\\/script>\\');document.close();};<\/script>'";
        } else {
            $doc.vata_main_form.submit();
        }
    }
    function h(an) {
        var aq = Y();
        var ar = [],
        ap,
        at = function(au) {
            ap = f(au, "type");
            if (ap === "qde_auto") {
                t(au);
            } else {
                if (ak === 1 || ap === "qde_text") {
                    ae(au, an || {});
                } else {
                    ar.push(au);
                }
            }
        };
        for (var ao = 0, am = aq.length; ao < am; ao++) {
            at(aq[ao]);
        }
        var e = ar.length;
        if (e == 1) {
            ae(ar[0], an || {});
        } else {
            if (e > 1) {
                Z = ar;
                z(r(ar, an));
            }
        }
    }
    function Q(am, e) {
        if (am.attachEvent) {
            am.attachEvent("onload", e);
        } else {
            am.onload = e;
        }
    }
    function U(am, ap) {
        if (am == null || am != am.window) {
            return false;
        }
        var an = am.frameElement;
        var e = am.document.body;
        var ao = function(ar) {
            an.style.display = "";
            var aq = e.offsetHeight;
            if (!ar) {
                Q(am,
                function() {
                    ao(true);
                });
            }
            if (aq == 0) {
                an.style.display = "none";
            } else {
                an.style.height = aq + "px";
                ap && ap();
            }
        };
        ao();
    }
    var F = {};
    var ag = /MSIE 6\.0/.test(navigator.userAgent);
    function l(ao, e) {
        var an = F[e];
        var am = an && an.join("") || "";
        if (am) {
            an.length = 0;
            ao.write(am);
        } else {
            N(e, false);
        }
    }
    var A = {};
    function M(an, e) {
        var am = A[e] || 0;
        A[e] = "";
        am && an.write(am);
    }
    function L(e, am) {
        e = e || "ad_queue_all";
        if (!F[e]) {
            F[e] = [];
        }
        F[e].push(am);
    }
    function C(e) {
        return al + (ag ? ("&rnd=" + e) : "") + "#" + e;
    }
    function ab(ao, am, an, ap) {
        var e = [];
        if (ao) {
            e[e.length] = "<style>" + ao + "</style>";
        }
        if (am) {
            e[e.length] = am.replace(/(scr)_(ipt)/gi, "$1$2");
        }
        if (an) {
            e[e.length] = '<script type="text/javascript">' + an + "<\/script>";
        }
        if (ap) {
            e[e.length] = '<script type="text/javascript" src="' + ap + '"><\/script>';
        }
        return e.join("");
    }
    function af(e, ap) {
        var am = C(e),
        ao = n(e, "iframe");
        ao.src = am;
        if (ap == 1) {
            K(ao);
        } else {
            var an = G(e);
            x(ao, an);
        }
    }
    function aa(e, ap, an) {
        var am = G(e),
        ao = n(e, "iframe");
        ao.style.display = "";
        ao.src = ap;
        ao.id = an || e;
        am.parentNode.replaceChild(ao, am);
    }
    function t(am) {
        var e = am.getAttribute("data-src");
        if (e) {
            aa(am.id, e);
        }
    }
    function ae(aq) {
        var am = w(aq),
        ao = am.id,
        an,
        e,
        ap = "";
        if (!ao) {
            return;
        }
        if (am.type === "qad") {
            am.callback = QNR.AD.getCallbackName(ao);
            e = g(am);
            if (e) {
                s(e);
            }
        } else {
            e = g(am);
            if (!e) {
                return;
            }
            if (am.type === "qde_text") {
                ap = "call_show=1;";
                an = ab("", "", ap, e);
                L(ao, an);
            } else {
                an = '<script type="text/javascript" src="' + e + '"><\/script>';
                A[ao] = an;
            }
            af(ao, 0);
        }
    }
    function m(aq, at, ao, au, e, am) {
        if (ao === '<div style="display:none"></div>') {
            return;
        }
        var ar = G(aq),
        ap = "",
        an = false;
        if (!ar) {
            return;
        }
        an = ao && /top.QNR.AD.run_in_content/.test(ao);
        if (an) {
            am = 1;
        }
        if (!an) {
            N(aq, true);
        }
        if (ak === 1) {
            if (am != 1) {
                au = au || "";
                au = "call_show = 1;" + au;
            }
            ap = ab(at, ao, au, e);
            if (an) {
                ap = ap + "<script>writeContent(document,Current_ad_id);<\/script>";
            }
            L(aq, ap);
            return;
        }
        if (am == 1) {
            ap = ab(at, ao, au, e);
            if (ap) {
                ap = '<script type="text/javascript">Current_ad_id = "' + aq + '";<\/script>' + ap;
            }
        } else {
            au = "call_show=1;" + au;
            ap = ab(at, ao, au, e);
            am = 0;
        }
        L(aq, ap);
        af(aq, am);
    }
    function N(e, an) {
        var am = QNR.AD._DE;
        if (e) {
            if (am[e]) {
                am[e](an);
                delete am[e];
            }
            return;
        }
        for (var ao in am) {
            am[ao](false);
        }
        QNR.AD._DE = {};
    }
    function R(e) {
        this.$aid = e;
        this.params = {};
    }
    R.prototype = {
        constructor: R,
        createCall: function(e) {
            var am = this;
            QNR._AD[this.$aid] = function(an) {
                e(an, am);
            };
        },
        createDiv: function() {
            return aj(this.$aid);
        },
        set: function(e, am) {
            this.params[e] = am;
            return this;
        },
        getId: function() {
            return this.$aid;
        },
        run_in_iframe: function(e, am) {
            if (typeof am == "undefined") {
                am = 1;
            }
            QNR.AD.add_AD_iframe(this.$aid, e, am);
        },
        urlPath: function(an) {
            var am = ["http://", k, "/vataplan?", "framId=", an.id, "&", an.query, "&callback=", an.callback, "&tile=", i];
            if (T) {
                am.push(T);
            }
            var e = B(this.params);
            e && am.push("&", e);
            if (o) {
                am.push("&city=", o);
            }
            return am.join("");
        },
        load: function() {
            QNR.AD.loadOneAD(this.$aid);
        }
    };
    var b = {};
    function ac(am, e) {
        if (!b[am]) {
            b[am] = new R(am);
        }
        e && e(b[am]);
        return b[am];
    }
    QNR.AD = {
        version: "4.3",
        _AD: {},
        _DE: {},
        run_in_content: m,
        run_queue_list: function() {
            var e = "ad_queue_all";
            var an = F[e];
            var am = an && an.join("") || "";
            if (am) {
                an.length = 0;
                am += '<script type="text/javascript">writeContent(document,"ad_queue_all");<\/script>';
                L(e, am);
                af(e, 1);
            }
            p();
            N();
        },
        writeHeadScript: M,
        create_div_container: aj,
        writeContent: l,
        $inject_flash: H,
        createAdFrame: aa,
        createQAd: ac,
        add_AD_iframe: function(e, an, am) {
            if (!an) {
                return;
            }
            if (am) {
                an = an + '<script type="text/javascript">call_show=1;<\/script>';
            }
            L(e, an);
            af(e, 0);
        },
        init: function(e) {
            D = e.debug || false;
            ak = e.type || "";
            if (ag) {
                ak = 1;
            }
            o = e.ip || "";
            q = e.qde_plus || "";
            T = e.qad_plus || "";
            al = e.blank_html || "";
            v = e;
            if (D) {
                J = "qdebeta.qunar.com";
            }
            h(e);
        },
        show: function(am, e) {
            U(am,
            function() {
                QNR.AD.callWinShowFun(e, am);
            });
        },
        getCallbackName: function(e, am) {
            return (am ? "parent.": "") + "QNR._AD." + e;
        },
        callWinShowFun: function(e, ao) {
            var am = e + "_win_",
            an = QNR._AD[am];
            if (an) {
                an(e, ao);
            }
        },
        createWinShowCall: function(e, an) {
            var am = e + "_win_";
            QNR._AD[am] = an;
        },
        createCallback: function(am, an) {
            var e = ac(am);
            e.createCall(function(ap) {
                var ao = e.createDiv();
                an(ao, ap);
            });
        },
        createQdeCallback: function(e, am) {
            QNR.AD._DE[e] = function(an) {
                am(an, e);
            };
        },
        callBackQDE: N,
        change_one_async: function() {
            var e = v;
            e.type = 1;
            QNR.AD.init(e);
            p();
        },
        loadOneAD: function(am) {
            var e = G(am);
            if (e) {
                ae(e);
            }
        }
    };
})(this);
if (typeof QNR === "undefined") {
    var QNR = {};
}
QNR.ips = (function(f) {
    var h = f.document,
    e = location.search.match(/debug=city=([^&#]+)/),
    i = e ? decodeURI(e[1]) : null,
    g = 0,
    b = [];
    function a(l, m) {
        b.push(l);
        if (g) {
            return;
        }
        var j = h.createElement("script");
        d.callback = function(n) {
            if (i !== null) {
                return;
            }
            i = n.city || "";
            c();
            j.parentNode.removeChild(j);
        };
        j.type = "text/javascript";
        j.charset = "utf-8";
        j.src = "http://ws.qunar.com/ips.jcp?callback=QNR.ips.callback&_=" + ( + new Date);
        j.async = true;
        var k = h.getElementsByTagName("head");
        container = k ? k[0] : document.documentElement;
        container.insertBefore(j, container.firstChild);
        g = 1;
        setTimeout(function() {
            d.callback({});
        },
        m || 2000);
    }
    function c() {
        for (var k = 0, j = b.length; k < j; k++) {
            b[k].call(null, i);
        }
        b.length = 0;
    }
    function d(j, k) {
        j = j ||
        function() {};
        if (i !== null) {
            j.call(null, i);
        } else {
            a(j, k);
        }
    }
    return d;
})(this);
(function() {
    function a(h) {
        return document.getElementById(h);
    }
    QNR.AD.getIpAddress = function(h) {
        QNR.ips(h);
    };
    QNR.AD.createWinShowCall("ifmRightTextlink",
    function(h, i) {
        g();
    });
    QNR.AD.createCallback("ifrCataAd",
    function(i, k) {
        i.style.display = "none";
        var h = k && k.key_data && k.key_data.length;
        if (!h) {
            return;
        }
        var j = k.key_data[0].description;
        j = j.replace(/(st)_(yle)/ig, "$1$2");
        QNR.AD.add_AD_iframe("ifrCataAd", j, 1);
    });
    function g() {
        var h = a("ifmRightTextlink_head");
        if (h) {
            h.style.display = "block";
        }
        h = a("ifmRightTextlink_foot");
        if (h) {
            h.style.display = "block";
        }
    }
    function c(h) {
        h("");
    }
    function e(h) {
        h("");
    }
    var b = {};
    function f(h) {
        return~location.search.indexOf(h);
    }
    b.type = f("debug=type=open") ? 1 : 0;
    b.debug = f("adtest=beta");
    b.blank_html = "http://www.qunar.com/vataframe/b.html?_=20120830";
    b.qde_plus = "";
    var d = function() {
        QNR.AD.isInited = false;
        (QNR.AD.getIpAddress || c)(function(h) {
            b.ip = encodeURIComponent(h);
            (QNR.AD.getAdsQuery || e)(function(i) {
                b.qde_plus = i;
                if (f("debug=charge=true")) {
                    b.qde_plus += "&cm=charged";
                }
                QNR.AD.init(b);
                QNR.AD.isInited = true;
                if (QNR.AD.initCallBack) {
                    QNR.AD.initCallBack();
                    QNR.AD.initCallBack = null;
                }
            });
        });
    };
    setTimeout(d, 150);
})();
(function(d) {
    document.domain = "qunar.com";
    function m() {
        var w = new FlightSearchBox();
        w.init("#js_searchbox_flight");
        var x = false;
        d("#js_nva_cgy a").click(function(D) {
            D.preventDefault();
        });
        var A = d("#js_searchbox");
        var u = A.find(".js-searchnav");
        var C = A.find(".js-searchbox-panel");
        var B = j();
        var t = B.tab ? B.tab: "flight";
        var v = B.from ? B.from: null;
        var s = null;
        if (B.ex_track && B.ex_track === "auto_4efe832e") {
            t = "hotel";
            s = "f_sg";
        }
        if (v && v === "mobile") {
            Cookie.setCookie("QN163", 1, null, ".qunar.com", "/");
        } else {
            Cookie.setCookie("QN163", 0, null, ".qunar.com", "/");
        }
        function y() {
            if (!x) {
                if (!QNR.AD.isInited) {
                    QNR.AD.initCallBack = function() {
                        QNR.AD.loadOneAD("ifrCataAd");
                        x = true;
                    };
                } else {
                    QNR.AD.loadOneAD("ifrCataAd");
                    x = true;
                }
            }
        }
        u.click(function() {
            u.removeClass("cur");
            d(this).addClass("cur");
            var D = d(this).attr("data-for");
            C.hide();
            var E = d("#js_searchbox_" + D);
            E.show();
            switch (D) {
            case "flight":
                y();
                trackAction("QH|SB|flight");
                gaClk("tab_flight");
                break;
            case "hotel":
                d.qload("hotel",
                function() {
                    q(E, v, s);
                });
                trackAction("QH|SB|hotel");
                gaClk("tab_hotel");
                break;
            case "tuan":
                d.qload("tuan",
                function() {
                    f(E);
                });
                trackAction("QH|SB|tuan");
                gaClk("tab_tuan");
                break;
            case "piao":
                d.qload("piao",
                function() {
                    g(E);
                });
                trackAction("QH|SB|piao");
                gaClk("tab_piao");
                break;
            case "package":
                d.qload("package",
                function() {
                    l(E);
                });
                trackAction("QH|SB|package");
                gaClk("tab_package");
                break;
            case "mobile":
                d.qload("mobile",
                function() {
                    k(E);
                });
                trackAction("QH|SB|mobile");
                gaClk("tab_mobile");
                break;
            }
        });
        o(w);
        var z = {
            flight: true,
            hotel: true,
            tuan: true,
            piao: true,
            "package": true,
            mobile: true
        };
        if (QNR.AD) {
            QNR.AD.initCallBack = null;
        }
        if (t && t !== "flight" && z[t]) {
            h(t, A);
        }
        if (t === "flight" || !z[t]) {
            y();
        }
    }
    function q(v, s, t) {
        var u = new HotelSearchBox();
        u.init(v);
        if (s || t) {
            u.setExtraFromParam(t);
            u.setUrlFromParam(s);
            u.initSearchBoxFromParam();
        }
    }
    function f(s) {
        TuanLoader.load(s);
    }
    function g(s) {
        PiaoLoader.load(s);
    }
    function l(s) {
        PackageLoader.load(s);
    }
    function k(s) {
        new Mobile().init(s);
    }
    function o(s) {
        d.qhistory.init({
            success: function(t) {
                s.parseHistory(t.flight);
            }
        });
    }
    function e() {
        var s = new MainSliderShowBox();
        s.init();
    }
    function c() {
        var s = new HotTuanBox();
        s.init();
    }
    function a() {
        var s = new QuarterHotBox();
        s.init();
    }
    function i() {
        var s = new StrategyBox();
        s.init();
    }
    function r() {
        var s = new JourneyClientBox();
        s.init();
    }
    function b() {
        var s = new HotelNewModBox();
        s.init();
        s.bindEvent();
    }
    function n() {}
    function h(u, t) {
        var s = t.find("li[data-for='" + u + "']");
        s.click();
    }
    function p(u) {
        var v = {};
        if (u) {
            var z = u.charAt(0) === "?" || u.charAt(0) === "#" ? u.substr(1) : u;
            var t = z.split("&");
            for (var w = 0, s = t.length; w < s; w++) {
                var y = t[w].indexOf("=");
                if (y > 0) {
                    try {
                        v[decodeURIComponent(t[w].substr(0, y))] = decodeURIComponent(t[w].substr(y + 1));
                    } catch(x) {}
                }
            }
        }
        return v;
    }
    function j() {
        var s = p(location.search);
        var u = p(location.hash);
        var t = d.extend({},
        u, s);
        return t;
    }
    m();
    e();
    c();
    d.qload("patch",
    function() {
        a();
        i();
        r();
        b();
    });
})(jQuery);
$(function() {
    if (j()) {
        return;
    }
    var g = 0,
    a = "banner_dynamic_left",
    c = 6;
    var f = setInterval(h, 500),
    d;
    function h() {
        var m = $.inArray(a, window.adsStatus) >= 0;
        if (g++>20 || m) {
            clearInterval(f);
        }
        if (m) {
            g = 0;
            i();
        }
    }
    function i() {
        var m = $('<div class="q_side_code"><a class="close" href="javascript:void(0)"></a><a href="http://phone.qunar.com/?from=qunarindex" class="click-area"></a></div>');
        $(".q_page").append(e(m));
        m.find(".close").click(function() {
            m.remove();
            b();
        });
        k(m);
    }
    function e(m, n) {
        var o = n ? c + "px": (l() || c) + "px";
        return m.css("top", o);
    }
    function k(m) {
        d = setInterval(function() {
            if (g++>20 || typeof closeFlash === "function" && typeof openFlash === "function") {
                clearInterval(d);
                var o = closeFlash,
                n = openFlash;
                closeFlash = function() {
                    o();
                    e(m, true);
                };
                openFlash = function() {
                    n();
                    e(m);
                };
            }
        },
        200);
    }
    function b() {
        if (window.sessionStorage) {
            window.sessionStorage.homeCodeClose = true;
        }
    }
    function j() {
        if (window.sessionStorage) {
            return window.sessionStorage.homeCodeClose || false;
        } else {
            return false;
        }
    }
    function l() {
        return $("#" + a)[0].height;
    }
});
