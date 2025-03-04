import { jsx as m, jsxs as D } from "react/jsx-runtime";
import { useRef as Y, useState as $, useCallback as b, useLayoutEffect as j } from "react";
function L(a, d, e, r, c) {
  const l = new Date(e.getFullYear(), e.getMonth(), d.day), h = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }, T = l.toISOString().split("T")[0], E = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  return /* @__PURE__ */ m("td", { style: a, role: "gridcell", "data-day": T, children: /* @__PURE__ */ m(
    "button",
    {
      className: T === E ? "DateButton Today" : "DateButton",
      id: "dc" + T,
      onClick: (v) => r == null ? void 0 : r(v),
      "aria-label": l.toLocaleDateString(c, h),
      children: d.day
    }
  ) }, d.day);
}
const Q = { days: { Sunday: "Su", Monday: "Mo", Tuesday: "Tu", Wednesday: "We", Thursday: "Th", Friday: "Fr", Saturday: "Sa" }, months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }, W = { days: { Domingo: "D", "Segunda-feira": "S", "Terça-feira": "T", "Quarta-feira": "Q", "Quinta-feira": "Q", "Sexta-feira": "S", Sábado: "S" }, months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "dezembro"] }, R = {
  en: Q,
  pt: W
};
function H(a) {
  return Object.entries(R[a].days);
}
function z(a) {
  return new Date(a.getFullYear(), a.getMonth() + 1, 0).getDate();
}
function G(a) {
  return new Date(a.getFullYear(), a.getMonth(), 1).getDay();
}
function P(a) {
  let d = G(a);
  return [...Array(z(a)).keys()].map(() => (d > 6 && (d = 0), d++));
}
function p(a) {
  const d = P(a), e = [[]];
  let r = 0, c = 0;
  return d.forEach((l) => {
    e[r].push({ day: ++c, pos: l }), l === 6 && (r++, e.push([]));
  }), e;
}
function q(a, d) {
  a.forEach((e) => w(e, d));
}
function w(a, d) {
  d !== null && d.childNodes[1].childNodes.forEach((e) => e.childNodes.forEach((r) => {
    var c;
    return (c = r.firstChild) == null ? void 0 : c.classList.remove(a);
  }));
}
function C(a, d, e) {
  d !== null && a.length !== 0 && d.childNodes[1].childNodes.forEach((r) => r.childNodes.forEach((c) => {
    const l = c.firstChild;
    (l == null ? void 0 : l.id) === e && a.forEach((h) => l == null ? void 0 : l.classList.add(h));
  }));
}
const N = "Selected", k = "InRange", x = "First", J = "Last";
function V({ mode: a = "single", locale: d = "en", styles: e, ...r }) {
  var O;
  const c = Y(null), [l, h] = $(/* @__PURE__ */ new Date()), T = p(l), E = b(() => {
    h((n) => new Date(n.getFullYear(), n.getMonth() - 1, 1));
  }, [h]), v = b(() => {
    h((n) => new Date(n.getFullYear(), n.getMonth() + 1, 1));
  }, [h]), F = b((n) => {
    var f;
    const o = r.setSelected, t = ((f = n.currentTarget.parentElement) == null ? void 0 : f.getAttribute("data-day")) ?? "";
    o((i) => {
      if ((i == null ? void 0 : i.getTime()) !== new Date(t).getTime())
        return new Date(t);
    });
  }, [r.setSelected]), I = b((n) => {
    var S;
    const [o, t] = [r.selected, r.setSelected], f = new Date(((S = n.currentTarget.parentElement) == null ? void 0 : S.getAttribute("data-day")) ?? "");
    if (o === void 0) {
      t([f]);
      return;
    }
    const i = o.findIndex(
      (g) => g.getTime() === f.getTime()
    );
    t == null || t((g) => i > -1 ? g.filter((s) => s.getTime() !== f.getTime()) : [...g.values()].concat([f]));
  }, [r.selected, r.setSelected]), M = b((n) => {
    var S, g, s;
    const [o, t] = [r.selected, r.setSelected], f = ((S = n.currentTarget.parentElement) == null ? void 0 : S.getAttribute("data-day")) ?? "", i = new Date(f);
    if (o === void 0) {
      t({ from: new Date(i), to: void 0 });
      return;
    }
    if (((g = o.from) == null ? void 0 : g.getTime()) === i.getTime())
      t((u) => ({ ...u, from: void 0 }));
    else if (((s = o.to) == null ? void 0 : s.getTime()) === i.getTime())
      t((u) => ({ ...u, to: void 0 }));
    else if (o.from === void 0) {
      if (o.to && i.getTime() > o.to.getTime()) {
        t((u) => ({ from: u.to, to: i }));
        return;
      }
      t((u) => ({ ...u, from: i }));
    } else if (o.to === void 0) {
      if (o.from && i.getTime() < o.from.getTime()) {
        t((u) => ({ from: i, to: u.from }));
        return;
      }
      t((u) => ({ ...u, to: i }));
    } else o.from && o.to && (i.getTime() < o.from.getTime() && t((u) => ({ ...u, from: i })), i.getTime() > o.to.getTime() ? t((u) => ({ ...u, to: i })) : t((u) => ({ ...u, from: i })));
  }, [r.selected, r.setSelected]), A = b((n) => {
    n.preventDefault(), a === "range" ? M(n) : a === "multiple" ? I(n) : F(n);
  }, [a, F, I, M]);
  return j(() => {
    var n, o;
    if (w(N, c.current), w(k, c.current), console.log(c.current), a === "single")
      C([N], c.current, `dc${(n = r.selected) == null ? void 0 : n.toISOString().split("T")[0]}`);
    else if (a === "multiple") {
      const t = r.selected;
      t == null || t.forEach(
        (f) => C([N], c.current, `dc${f.toISOString().split("T")[0]}`)
      );
    } else if (a === "range") {
      const t = r.selected;
      if (q([x, J], c.current), t === void 0) return;
      if (Object.values(t).forEach((f) => {
        const i = `dc${f == null ? void 0 : f.toISOString().split("T")[0]}`;
        C([N], c.current, i);
      }), t.from && t.to) {
        const [f, i] = [t.from, t.to];
        C([x], c.current, `dc${t.from.toISOString().split("T")[0]}`), C([J], c.current, `dc${t.to.toISOString().split("T")[0]}`), (o = c.current) == null || o.childNodes.item(1).childNodes.forEach((S) => {
          S.childNodes.forEach((g) => {
            var u, B;
            const s = new Date((g == null ? void 0 : g.getAttribute("data-day")) ?? "");
            s.getTime() > ((u = f.getTime) == null ? void 0 : u.call(f)) && s.getTime() < i.getTime() && ((B = g.firstChild) == null || B.classList.add(k));
          });
        });
      }
    }
  }, [a, r.selected, l, c]), /* @__PURE__ */ D("div", { className: "Calendar", style: e == null ? void 0 : e.Calendar, children: [
    /* @__PURE__ */ D("div", { className: "CalendarTop", style: e == null ? void 0 : e.CalendarTop, children: [
      /* @__PURE__ */ m("button", { className: "NavigationButton", style: e == null ? void 0 : e.NavigationButtons, onClick: E, children: "<" }),
      /* @__PURE__ */ D("span", { style: e == null ? void 0 : e.CalendarTitle, children: [
        R[d].months[l.getMonth()],
        " - ",
        l.getFullYear()
      ] }),
      /* @__PURE__ */ m("button", { className: "NavigationButton", style: e == null ? void 0 : e.NavigationButtons, onClick: v, children: ">" })
    ] }),
    /* @__PURE__ */ D("table", { id: "calendarTable", ref: c, style: e == null ? void 0 : e.CalendarTable, children: [
      /* @__PURE__ */ m("thead", { "aria-hidden": !0, style: e == null ? void 0 : e.CalendarTHead, children: /* @__PURE__ */ m("tr", { children: H(d).map(
        (n) => /* @__PURE__ */ m("th", { style: e == null ? void 0 : e.CalendarTHeadCell, "aria-label": n[0], scope: "col", children: n[1] }, n[0])
      ) }) }),
      /* @__PURE__ */ D("tbody", { style: e == null ? void 0 : e.CalendarTBody, children: [
        /* @__PURE__ */ D("tr", { children: [
          [...Array(T[0][0].pos).keys()].map((n) => /* @__PURE__ */ m("td", { style: e == null ? void 0 : e.CalendarTBodyCell }, n)),
          (O = T.shift()) == null ? void 0 : O.map((n) => L(e == null ? void 0 : e.CalendarTBodyCell, n, l, A, d))
        ] }),
        T.map((n) => /* @__PURE__ */ m("tr", { children: n.map((o) => L(e == null ? void 0 : e.CalendarTBodyCell, o, l, A, d)) }, T.findIndex((o) => o === n)))
      ] })
    ] })
  ] });
}
export {
  V as Calendar
};
