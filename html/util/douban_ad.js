(function (c) {
    var f, b, d, a, e;
    f = (function () {
        var i, m, g, j, h, l, k, n;
        m = function (o, q, p) {
            if (o.addEventListener) {
                o.addEventListener(q, p, false)
            } else {
                if (o.attachEvent) {
                    o.attachEvent("on" + q, p)
                } else {
                    o["on" + q] = p
                }
            }
        };
        g = function (q, o) {
            o.parentNode.removeChild(o);
            c[q] = undefined;
            try {
                delete c[q]
            } catch (p) {}
        };
        j = function (q, r) {
            var s = "",
                o, p;
            for (o in q) {
                if (q.hasOwnProperty(o)) {
                    o = r ? encodeURIComponent(o) : o;
                    p = r ? encodeURIComponent(q[o]) : q[o];
                    s += o + "=" + p + "&"
                }
            }
            return s.replace(/&$/, "")
        };
        h = function () {
            var r = "",
                q = [],
                o = "0123456789ABCDEF",
                p = 0;
            for (p = 0; p < 32; p += 1) {
                q[p] = o.charAt(Math.floor(Math.random() * 16))
            }
            q[12] = "4";
            q[16] = o.charAt((q[16] & 3) | 8);
            r = "erebor_" + q.join("");
            return r
        };
        l = function (p, o) {
            if (typeof p !== "undefined") {
                p(o)
            }
        };
        k = function (q, p, o) {
            if (typeof q !== "undefined") {
                q(p, o)
            }
        };
        n = function (o) {
            if (typeof o !== "undefined") {
                o()
            }
        };
        i = {};
        i.get = function (r) {
            r = r || {};
            var q = r.url,
                u = r.query || {}, s = r.callbackParameter || "callback",
                v = h(),
                p = c.document.createElement("script"),
                o = c.document.getElementsByTagName("script")[0],
                t = "?";
            if (typeof q === "undefined") {
                throw new Error("URL must be specified!")
            }
            u[s] = v;
            if (q.indexOf("?") >= 0) {
                t = "&"
            }
            q += t + j(u, true);
            c[v] = function (w) {
                if (typeof w === "undefined") {
                    l(r.error, "Invalid JSON data returned")
                } else {
                    k(r.success, u, w)
                }
                g(v, p);
                n(r.complete)
            };
            p.setAttribute("src", q);
            o.parentNode.insertBefore(p, o);
            m(p, "error", function () {
                g(v, p);
                n(r.complete);
                l(r.error, "Error while trying to access the URL")
            })
        };
        return i
    })();
    b = function (g) {
        if (c.console) {
            c.console.log(g)
        }
    };
    a = function (g) {
        while (g) {
            if (g === c.document) {
                return true
            }
            g = g.parentNode
        }
        return false
    };
    d = function (g, j) {
        var h = ("toolbar=0,status=1,resizable=1,menubar=no,location=yes,scrollbars=yes"),
            i = c.window.open(g, j, h);
        if (i) {
            i.focus()
        }
        return i
    };
    e = function (i, h) {
        i = i || {};
        h = h || {};
        var g = i.unit || "",
            j = i.debug || false;
        err = h.msg, html = h.html || "", width = h.width || 0, height = h.height || 0, margin = h.margin || "", debugHash = h.debug || "", adSlot = c.document.getElementById(g), adFrame = c.document.getElementById(g + "_frame");
        if (j && (debugHash !== "")) {
            d("http://ad.douban.com/debug/view/?er=" + encodeURIComponent(debugHash))
        }
        if (typeof err !== "undefined") {
            return
        }
        if (!a(adSlot)) {
            b("Cannot find slot " + g);
            return
        }
        if (!a(adFrame)) {
            adFrame = c.document.createElement("iframe");
            adFrame.id = g + "_frame";
            adFrame.frameBorder = 0;
            adFrame.scrolling = "no";
            adFrame.style.overflow = "hidden";
            adFrame.style.margin = margin;
            adFrame.width = width;
            adFrame.height = height;
            adSlot.appendChild(adFrame)
        }
        adFrame.contentWindow.document.open();
        adFrame.contentWindow.document.write(html);
        adFrame.contentWindow.document.close()
    };
    c.DoubanAdGet = function (q, m) {
        var j = c.DoubanAdRequest || {}, q = q || [],
            m = m || {}, g = j.src || "",
            o = j.uid || "",
            l = j.bid || "",
            p = j.ip || "",
            s = j.crtr || "",
            n = j.prv || "",
            h = j.debug || false,
            r = new Date().getTime(),
            v, t;
        if (typeof q === "string") {
            q = [q]
        }
        if (typeof m === "function") {
            var u = m;
            m = {};
            for (var k = 0; k < q.length; k++) {
                m[q[k]] = u
            }
        }
        if (g === "") {
            throw new Error("Ad service url must be specified!")
        }
        if (l === "") {
            throw new Error("Browser id must be specified!")
        }
        if (n !== "") {
            g = g + "preview/"
        }
        for (var k = 0; k < q.length; k++) {
            v = c.document.getElementById(q[k]);
            if (a(v)) {
                t = {
                    unit: q[k],
                    uid: o,
                    bid: l,
                    ip: p,
                    crtr: s,
                    ts: r,
                    prv: n,
                    debug: h
                };
                f.get({
                    url: g,
                    query: t,
                    success: m[q[k]] || e,
                    error: b
                })
            } else {
                b("Nonexistent slot " + q[k])
            }
        }
    };
    c.DoubanAdGet(c.DoubanAdSlots, c.DoubanAdLoaders)
})(this);
