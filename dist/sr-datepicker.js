import { jsx as f, jsxs as S } from "react/jsx-runtime";
import { useState as J, useCallback as T, useLayoutEffect as Y } from "react";
function O(t, s, r, c) {
  const u = new Date(s.getFullYear(), s.getMonth(), t.day), g = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }, y = u.toISOString().split("T")[0], v = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  return /* @__PURE__ */ f("td", { role: "gridcell", "data-day": y, children: /* @__PURE__ */ f(
    "button",
    {
      className: y === v ? "DateButton Today" : "DateButton",
      id: "dc" + y,
      onClick: (b) => r == null ? void 0 : r(b),
      "aria-label": u.toLocaleDateString(c, g),
      children: t.day
    }
  ) }, t.day);
}
const $ = { days: { Sunday: "Su", Monday: "Mo", Tuesday: "Tu", Wednesday: "We", Thursday: "Th", Friday: "Fr", Saturday: "Sa" }, months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }, B = { days: { Domingo: "D", "Segunda-feira": "S", "Terça-feira": "T", "Quarta-feira": "Q", "Quinta-feira": "Q", "Sexta-feira": "S", Sábado: "S" }, months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "dezembro"] }, x = {
  en: $,
  pt: B
};
function j(t) {
  return Object.entries(x[t].days);
}
function Q(t) {
  return new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
}
function R(t) {
  return new Date(t.getFullYear(), t.getMonth(), 1).getDay();
}
function W(t) {
  let s = R(t);
  return [...Array(Q(t)).keys()].map(() => (s > 6 && (s = 0), s++));
}
function q(t) {
  const s = W(t), r = [[]];
  let c = 0, u = 0;
  return s.forEach((g) => {
    r[c].push({ day: ++u, pos: g }), g === 6 && (c++, r.push([]));
  }), r;
}
function w(t) {
  document.querySelectorAll(`.${t}`).forEach((s) => {
    s.classList.remove(t);
  });
}
function z(t) {
  t.forEach(w);
}
function D(t, s) {
  t.forEach((r) => {
    var c;
    (c = document.getElementById(s)) == null || c.classList.add(r);
  });
}
const E = "Selected", C = "InRange", L = "First", k = "Last";
function _({ mode: t = "single", locale: s = "en", ...r }) {
  var A;
  const [c, u] = J(/* @__PURE__ */ new Date()), g = q(c), y = T(() => {
    u((n) => new Date(n.getFullYear(), n.getMonth() - 1, 1));
  }, [u]), v = T(() => {
    u((n) => new Date(n.getFullYear(), n.getMonth() + 1, 1));
  }, [u]), b = T((n) => {
    var l;
    const e = r.setSelected, a = ((l = n.currentTarget.parentElement) == null ? void 0 : l.getAttribute("data-day")) ?? "";
    e((o) => {
      if ((o == null ? void 0 : o.getTime()) !== new Date(a).getTime())
        return new Date(a);
    });
  }, [r.setSelected]), I = T((n) => {
    var m;
    const [e, a] = [r.selected, r.setSelected], l = new Date(((m = n.currentTarget.parentElement) == null ? void 0 : m.getAttribute("data-day")) ?? "");
    if (e === void 0) {
      a([l]);
      return;
    }
    const o = e.findIndex(
      (d) => d.getTime() === l.getTime()
    );
    a == null || a((d) => o > -1 ? d.filter((h) => h.getTime() !== l.getTime()) : [...d.values()].concat([l]));
  }, [r.selected, r.setSelected]), M = T((n) => {
    var m, d, h;
    const [e, a] = [r.selected, r.setSelected], l = ((m = n.currentTarget.parentElement) == null ? void 0 : m.getAttribute("data-day")) ?? "", o = new Date(l);
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
  }, [r.selected, r.setSelected]), N = T((n) => {
    n.preventDefault(), t === "range" ? M(n) : t === "multiple" ? I(n) : b(n);
  }, [t, b, I, M]);
  return Y(() => {
    var n;
    if (w(E), w(C), t === "single")
      D([E], `dc${(n = r.selected) == null ? void 0 : n.toISOString().split("T")[0]}`);
    else if (t === "multiple") {
      const e = r.selected;
      e == null || e.forEach(
        (a) => D([E], `dc${a.toISOString().split("T")[0]}`)
      );
    } else if (t === "range") {
      const e = r.selected;
      if (z([L, k]), e === void 0) return;
      if (Object.values(e).forEach((a) => {
        const l = `dc${a == null ? void 0 : a.toISOString().split("T")[0]}`;
        D([E], l);
      }), e.from && e.to) {
        const [a, l] = [e.from, e.to], o = document.querySelector("#calendarTable");
        D([L], `dc${e.from.toISOString().split("T")[0]}`), D([k], `dc${e.to.toISOString().split("T")[0]}`), o == null || o.childNodes.item(1).childNodes.forEach((m) => {
          m.childNodes.forEach((d) => {
            var i, F;
            const h = new Date((d == null ? void 0 : d.getAttribute("data-day")) ?? "");
            h.getTime() > ((i = a.getTime) == null ? void 0 : i.call(a)) && h.getTime() < l.getTime() && ((F = d.firstChild) == null || F.classList.add(C));
          });
        });
      }
    }
  }, [t, r.selected, c]), /* @__PURE__ */ S("div", { className: "Calendar", children: [
    /* @__PURE__ */ S("div", { className: "CalendarTop", children: [
      /* @__PURE__ */ f("button", { className: "NavigationButton", onClick: y, children: "<" }),
      /* @__PURE__ */ S("span", { children: [
        x[s].months[c.getMonth()],
        " - ",
        c.getFullYear()
      ] }),
      /* @__PURE__ */ f("button", { className: "NavigationButton", onClick: v, children: ">" })
    ] }),
    /* @__PURE__ */ S("table", { id: "calendarTable", children: [
      /* @__PURE__ */ f("thead", { "aria-hidden": !0, children: /* @__PURE__ */ f("tr", { children: j(s).map((n) => /* @__PURE__ */ f("th", { "aria-label": n[0], scope: "col", children: n[1] }, n[0])) }) }),
      /* @__PURE__ */ S("tbody", { children: [
        /* @__PURE__ */ S("tr", { children: [
          [...Array(g[0][0].pos).keys()].map((n) => /* @__PURE__ */ f("td", {}, n)),
          (A = g.shift()) == null ? void 0 : A.map((n) => O(n, c, N, s))
        ] }),
        g.map((n) => /* @__PURE__ */ f("tr", { children: n.map((e) => O(e, c, N, s)) }, g.findIndex((e) => e === n)))
      ] })
    ] })
  ] });
}
export {
  _ as Calendar
};
