import { jsx as m, jsxs as S } from "react/jsx-runtime";
import { useState as J, useCallback as T, useLayoutEffect as Y } from "react";
function O(t, c, r, s) {
  const u = new Date(c.getFullYear(), c.getMonth(), t.day), g = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }, y = u.toISOString().split("T")[0], E = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  return /* @__PURE__ */ m("td", { role: "gridcell", "data-day": y, children: /* @__PURE__ */ m(
    "button",
    {
      className: y === E ? "DateButton Today" : "DateButton",
      id: "dc" + y,
      onClick: (b) => r == null ? void 0 : r(b),
      "aria-label": u.toLocaleDateString(s, g),
      children: t.day
    }
  ) }, t.day);
}
const x = {
  days: {
    en: {
      Sunday: "Su",
      Monday: "Mo",
      Tuesday: "Tu",
      Wednesday: "We",
      Thursday: "Th",
      Friday: "Fr",
      Saturdau: "Sa"
    },
    pt: {
      Domingo: "D",
      SegundaFeira: "S",
      TercaFeira: "T",
      QuartaFeira: "Q",
      QuintaFeira: "Q",
      SextaFeira: "S",
      Sabado: "S"
    }
  },
  months: {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    pt: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "dezembro"
    ]
  }
};
function $(t) {
  return Object.entries(x.days[t]);
}
function j(t) {
  return new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
}
function Q(t) {
  return new Date(t.getFullYear(), t.getMonth(), 1).getDay();
}
function R(t) {
  let c = Q(t);
  return [...Array(j(t)).keys()].map(() => (c > 6 && (c = 0), c++));
}
function W(t) {
  const c = R(t), r = [[]];
  let s = 0, u = 0;
  return c.forEach((g) => {
    r[s].push({ day: ++u, pos: g }), g === 6 && (s++, r.push([]));
  }), r;
}
function w(t) {
  document.querySelectorAll(`.${t}`).forEach((c) => {
    c.classList.remove(t);
  });
}
function B(t) {
  t.forEach(w);
}
function D(t, c) {
  t.forEach((r) => {
    var s;
    (s = document.getElementById(c)) == null || s.classList.add(r);
  });
}
function G({ mode: t = "single", locale: c = "en", ...r }) {
  var A;
  const [s, u] = J(/* @__PURE__ */ new Date()), g = W(s), y = T(() => {
    u((n) => new Date(n.getFullYear(), n.getMonth() - 1, 1));
  }, [u]), E = T(() => {
    u((n) => new Date(n.getFullYear(), n.getMonth() + 1, 1));
  }, [u]), b = T((n) => {
    var l;
    const e = r.setSelected, a = ((l = n.currentTarget.parentElement) == null ? void 0 : l.getAttribute("data-day")) ?? "";
    e((o) => {
      if ((o == null ? void 0 : o.getTime()) !== new Date(a).getTime())
        return new Date(a);
    });
  }, [r.setSelected]), I = T((n) => {
    var f;
    const [e, a] = [r.selected, r.setSelected], l = new Date(((f = n.currentTarget.parentElement) == null ? void 0 : f.getAttribute("data-day")) ?? "");
    if (e === void 0) {
      a([l]);
      return;
    }
    const o = e.findIndex(
      (d) => d.getTime() === l.getTime()
    );
    a == null || a((d) => o > -1 ? d.filter((h) => h.getTime() !== l.getTime()) : [...d.values()].concat([l]));
  }, [r.selected, r.setSelected]), M = T((n) => {
    var f, d, h;
    const [e, a] = [r.selected, r.setSelected], l = ((f = n.currentTarget.parentElement) == null ? void 0 : f.getAttribute("data-day")) ?? "", o = new Date(l);
    if (e === void 0) {
      a({ from: new Date(o), to: void 0 });
      return;
    }
    if (((d = e.from) == null ? void 0 : d.getTime()) === o.getTime())
      a((i) => ({ ...i, from: void 0 }));
    else if (((h = e.to) == null ? void 0 : h.getTime()) === o.getTime())
      a((i) => ({ ...i, to: void 0 }));
    else if (e.from === void 0) {
      if (e.to && o.getTime() > e.to.getTime()) {
        a((i) => ({ from: i.to, to: o }));
        return;
      }
      a((i) => ({ ...i, from: o }));
    } else if (e.to === void 0) {
      if (e.from && o.getTime() < e.from.getTime()) {
        a((i) => ({ from: o, to: i.from }));
        return;
      }
      a((i) => ({ ...i, to: o }));
    } else e.from && e.to && (o.getTime() < e.from.getTime() && a((i) => ({ ...i, from: o })), o.getTime() > e.to.getTime() ? a((i) => ({ ...i, to: o })) : a((i) => ({ ...i, from: o })));
  }, [r.selected, r.setSelected]), v = T((n) => {
    n.preventDefault(), t === "range" ? M(n) : t === "multiple" ? I(n) : b(n);
  }, [t, b, I, M]);
  return Y(() => {
    var n;
    if (w(F), w(C), t === "single")
      D([F], `dc${(n = r.selected) == null ? void 0 : n.toISOString().split("T")[0]}`);
    else if (t === "multiple") {
      const e = r.selected;
      e == null || e.forEach(
        (a) => D([F], `dc${a.toISOString().split("T")[0]}`)
      );
    } else if (t === "range") {
      const e = r.selected;
      if (B([L, k]), e === void 0) return;
      if (Object.values(e).forEach((a) => {
        const l = `dc${a == null ? void 0 : a.toISOString().split("T")[0]}`;
        D([F], l);
      }), e.from && e.to) {
        const [a, l] = [e.from, e.to], o = document.querySelector("#calendarTable");
        D([L], `dc${e.from.toISOString().split("T")[0]}`), D([k], `dc${e.to.toISOString().split("T")[0]}`), o == null || o.childNodes.item(1).childNodes.forEach((f) => {
          f.childNodes.forEach((d) => {
            var i, N;
            const h = new Date((d == null ? void 0 : d.getAttribute("data-day")) ?? "");
            h.getTime() > ((i = a.getTime) == null ? void 0 : i.call(a)) && h.getTime() < l.getTime() && ((N = d.firstChild) == null || N.classList.add(C));
          });
        });
      }
    }
  }, [t, r.selected, s]), /* @__PURE__ */ S("div", { className: "Calendar", children: [
    /* @__PURE__ */ S("div", { className: "CalendarTop", children: [
      /* @__PURE__ */ m("button", { onClick: y, children: "<" }),
      /* @__PURE__ */ S("span", { children: [
        x.months[c][s.getMonth()],
        " - ",
        s.getFullYear()
      ] }),
      /* @__PURE__ */ m("button", { onClick: E, children: ">" })
    ] }),
    /* @__PURE__ */ S("table", { id: "calendarTable", children: [
      /* @__PURE__ */ m("thead", { "aria-hidden": !0, children: /* @__PURE__ */ m("tr", { children: $(c).map((n) => /* @__PURE__ */ m("th", { "aria-label": n[0], scope: "col", children: n[1] }, n[0])) }) }),
      /* @__PURE__ */ S("tbody", { children: [
        /* @__PURE__ */ S("tr", { children: [
          [...Array(g[0][0].pos).keys()].map((n) => /* @__PURE__ */ m("td", {}, n)),
          (A = g.shift()) == null ? void 0 : A.map((n) => O(n, s, v, c))
        ] }),
        g.map((n) => /* @__PURE__ */ m("tr", { children: n.map((e) => O(e, s, v, c)) }, g.findIndex((e) => e === n)))
      ] })
    ] })
  ] });
}
const F = "Selected", C = "InRange", L = "First", k = "Last";
export {
  G as Calendar,
  L as FIRST,
  C as IN_RANGE,
  k as LAST,
  F as SELECTED
};
