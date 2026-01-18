var e = function(t2, n2) {
  return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e2, t3) {
    e2.__proto__ = t3;
  } || function(e2, t3) {
    for (var n3 in t3) Object.prototype.hasOwnProperty.call(t3, n3) && (e2[n3] = t3[n3]);
  }, e(t2, n2);
}, t = function() {
  return t = Object.assign || function(e2) {
    for (var t2, n2 = 1, r2 = arguments.length; n2 < r2; n2++) for (var o2 in t2 = arguments[n2]) Object.prototype.hasOwnProperty.call(t2, o2) && (e2[o2] = t2[o2]);
    return e2;
  }, t.apply(this, arguments);
};
function n(e2, t2, n2) {
  for (var r2, o2 = 0, i2 = t2.length; o2 < i2; o2++) !r2 && o2 in t2 || (r2 || (r2 = Array.prototype.slice.call(t2, 0, o2)), r2[o2] = t2[o2]);
  return e2.concat(r2 || Array.prototype.slice.call(t2));
}
var r = function(t2) {
  function n2() {
    return null !== t2 && t2.apply(this, arguments) || this;
  }
  return function(t3, n3) {
    if ("function" != typeof n3 && null !== n3) throw new TypeError("Class extends value " + String(n3) + " is not a constructor or null");
    function r2() {
      this.constructor = t3;
    }
    e(t3, n3), t3.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
  }(n2, t2), n2;
}(Error), o = {}, i = /* @__PURE__ */ new Set(), c = {};
function a(e2, n2) {
  if ("string" == typeof e2 || "number" == typeof e2 && !isNaN(e2) && Math.abs(e2) !== 1 / 0 || null == e2 || "boolean" == typeof e2) return e2;
  var r2 = n2.indexOf(e2);
  if (-1 !== r2) return "#$@__instance__" + r2;
  n2.push(e2);
  var o2 = n2.length - 1;
  if (e2.constructor === Array) {
    var s2 = e2.map(function(e3) {
      return a(e3, n2);
    });
    return s2.unshift("#$@__reference__" + o2), s2;
  }
  if (e2.constructor === Object) {
    var u2 = Object.fromEntries(Object.entries(e2).map(function(e3) {
      return [e3[0], a(e3[1], n2)];
    }));
    return u2["#$@__reference__"] = o2, u2;
  }
  i.add(e2.constructor);
  var l2 = {};
  l2 = Object.defineProperty(l2, "#$@__constructor__", { value: e2.constructor.name, enumerable: true }), l2 = Object.defineProperty(l2, "#$@__reference__", { value: o2, enumerable: true });
  var f2 = function(e3, t2) {
    if (Object.keys(c).includes(e3.constructor.name)) return c[e3.constructor.name].toPlain(e3, function(e4) {
      return a(e4, t2);
    });
  }(e2, n2);
  return void 0 !== f2 ? t(t({}, f2), l2) : (Object.getOwnPropertyNames(e2).forEach(function(t2) {
    Object.defineProperty(l2, t2, { value: a(e2[t2], n2), enumerable: true });
  }), l2);
}
function s(e2, t2, n2) {
  var o2;
  if ("string" == typeof e2 && 0 === e2.indexOf("#$@__instance__")) return n2[l2 = parseInt(e2.slice(15))];
  if ("string" == typeof e2 || "number" == typeof e2 || null == e2 || "boolean" == typeof e2) return e2;
  if (e2.constructor === Array) {
    if (0 === e2.length) return [];
    var i2 = e2.shift();
    if ("string" != typeof i2 || "#$@__reference__" !== i2.substring(0, 16)) {
      if (0 === Object.keys(n2).length) return e2.unshift(i2), e2;
      throw new r();
    }
    var a2 = [];
    n2[l2 = i2.slice(16)] = a2;
    for (var u2 = 0; u2 < e2.length; u2++) a2[u2] = s(e2[u2], t2, n2);
    return a2;
  }
  if (e2.constructor === Object) {
    var l2;
    if (null === (l2 = null !== (o2 = e2["#$@__reference__"]) && void 0 !== o2 ? o2 : null)) {
      if (0 === Object.keys(n2).length) return e2;
      throw new r();
    }
    if (delete e2["#$@__reference__"], !Object.keys(e2).includes("#$@__constructor__")) {
      for (var f2 in a2 = {}, n2[l2] = a2, e2) a2[f2] = s(e2[f2], t2, n2);
      return a2;
    }
    var h2 = e2["#$@__constructor__"];
    delete e2["#$@__constructor__"];
    var d = function(e3, t3, n3, r2) {
      if (Object.keys(c).includes(t3)) return c[t3].fromPlain(e3, function(e4) {
        return s(e4, n3, r2);
      });
    }(e2, h2, t2, n2);
    if (void 0 !== d) return d;
    if (!Object.keys(t2).includes(h2)) throw new Error("The class " + h2 + " is not allowed");
    var p = {};
    for (var f2 in n2[l2] = p, e2) p[f2] = s(e2[f2], t2, n2);
    return Object.setPrototypeOf(p, t2[h2].prototype), p;
  }
}
function u(e2) {
  o[e2.name] = e2;
}
function l(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
!function(e2, t2) {
  e2("Date", (e3) => ({ time: e3.getTime() }), function(e3) {
    let t3 = /* @__PURE__ */ new Date();
    return t3.setTime(e3.time), t3;
  }), e2("BigInt", (e3) => ({ number: e3.toString() }), (e3) => BigInt(e3.number)), e2("String", (e3) => ({ text: e3.toString() }), (e3) => new String(e3.text)), e2("RegExp", (e3) => ({ source: e3.source, flags: e3.flags }), (e3) => new RegExp(e3.source, e3.flags)), e2("Number", function(e3) {
    let t3 = { nan: false, infinity: false, positive: true, number: null };
    return Math.abs(e3) === 1 / 0 ? (t3.infinity = true, t3.positive = Math.abs(e3) === e3, t3) : isNaN(e3) ? (t3.nan = true, t3) : (t3.number = e3.valueOf(), t3);
  }, function(e3) {
    return e3.nan ? NaN : e3.infinity ? 1 / 0 * (e3.positive ? 1 : -1) : new Number(e3.number);
  }), e2("Map", (e3, t3) => ({ data: Array.from(e3.entries()).map((e4) => t3(e4)) }), function(e3, t3) {
    const n2 = /* @__PURE__ */ new Map();
    return e3.data.map((e4) => t3(e4)).forEach(([e4, t4]) => n2.set(e4, t4)), n2;
  }), e2("Set", (e3, t3) => ({ data: Array.from(e3.values()).map((e4) => t3(e4)) }), function(e3, t3) {
    const n2 = /* @__PURE__ */ new Set();
    return e3.data.map((e4) => t3(e4)).forEach((e4) => n2.add(e4)), n2;
  }), e2("ArrayBuffer", (e3, t3) => ({ data: t3(new Uint8Array(e3)) }), (e3, t3) => t3(e3.data).buffer), e2("DataView", (e3, t3) => ({ buffer: t3(e3.buffer), offset: e3.byteOffset, length: e3.byteLength }), (e3, t3) => new DataView(t3(e3.buffer), e3.offset, e3.length)), [Error, EvalError, RangeError, AggregateError, ReferenceError, SyntaxError, TypeError, URIError, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array].forEach((e3) => t2(e3));
}(function(e2, t2, n2) {
  c[e2] = { toPlain: t2, fromPlain: n2 };
}, u);
var f, h = {};
function m(e2) {
  let t2, n2 = e2[0], r2 = 1;
  for (; r2 < e2.length; ) {
    const o2 = e2[r2], i2 = e2[r2 + 1];
    if (r2 += 2, ("optionalAccess" === o2 || "optionalCall" === o2) && null == n2) return;
    "access" === o2 || "optionalAccess" === o2 ? (t2 = n2, n2 = i2(n2)) : "call" !== o2 && "optionalCall" !== o2 || (n2 = i2((...e3) => n2.call(t2, ...e3)), t2 = void 0);
  }
  return n2;
}
(f = h).defaults = {}, f.set = function(e2, t2, n2) {
  var r2 = n2 || {}, o2 = f.defaults, i2 = r2.expires || o2.expires, c2 = r2.domain || o2.domain, a2 = void 0 !== r2.path ? r2.path : void 0 !== o2.path ? o2.path : "/", s2 = void 0 !== r2.secure ? r2.secure : o2.secure, u2 = void 0 !== r2.httponly ? r2.httponly : o2.httponly, l2 = void 0 !== r2.samesite ? r2.samesite : o2.samesite, h2 = i2 ? new Date("number" == typeof i2 ? (/* @__PURE__ */ new Date()).getTime() + 864e5 * i2 : i2) : 0;
  document.cookie = e2.replace(/[^+#$&^`|]/g, encodeURIComponent).replace("(", "%28").replace(")", "%29") + "=" + t2.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) + (h2 && h2.getTime() >= 0 ? ";expires=" + h2.toUTCString() : "") + (c2 ? ";domain=" + c2 : "") + (a2 ? ";path=" + a2 : "") + (s2 ? ";secure" : "") + (u2 ? ";httponly" : "") + (l2 ? ";samesite=" + l2 : "");
}, f.get = function(e2) {
  for (var t2 = document.cookie.split(";"); t2.length; ) {
    var n2 = t2.pop(), r2 = n2.indexOf("=");
    if (r2 = r2 < 0 ? n2.length : r2, decodeURIComponent(n2.slice(0, r2).replace(/^\s+/, "")) === e2) return decodeURIComponent(n2.slice(r2 + 1));
  }
  return null;
}, f.erase = function(e2, t2) {
  f.set(e2, "", { expires: -1, domain: t2 && t2.domain, path: t2 && t2.path, secure: 0, httponly: 0 });
}, f.all = function() {
  for (var e2 = {}, t2 = document.cookie.split(";"); t2.length; ) {
    var n2 = t2.pop(), r2 = n2.indexOf("=");
    r2 = r2 < 0 ? n2.length : r2, e2[decodeURIComponent(n2.slice(0, r2).replace(/^\s+/, ""))] = decodeURIComponent(n2.slice(r2 + 1));
  }
  return e2;
};
const _ = [], w = (e2) => {
  ((e3) => {
    const t2 = "undefined" != typeof process && "production" === m([process, "access", (e4) => e4.env, "optionalAccess", (e4) => e4.NODE_ENV]);
    _.includes(e3) || t2 || ("undefined" == typeof window && (e3 += "\nAre you running on a server? Most of storages are not available while running on a server."), console.warn(e3), _.push(e3));
  })(`Unable to find the ${e2}. No data will be persisted.`);
};
let A = function(e2) {
  return void 0 === e2 ? "undefined" : JSON.stringify(a(e2, []));
}, S = function(e2, t2) {
  if (void 0 === t2 && (t2 = void 0), "string" != typeof e2) return e2;
  if (void 0 === t2 && (t2 = {}), "undefined" !== e2) {
    t2 = Object.fromEntries(n(n([], Object.entries(t2), true), Object.entries(o)));
    try {
      return s(JSON.parse(e2), t2, {});
    } catch (t3) {
      return e2;
    }
  }
};
function j(e2, t2, n2) {
  const r2 = t2.getValue(n2);
  return null !== r2 && e2.set(r2), t2.addListener && t2.addListener(n2, (t3) => {
    e2.set(t3);
  }), e2.subscribe((e3) => {
    t2.setValue(n2, e3);
  }), { ...e2, delete() {
    t2.deleteValue(n2);
  } };
}
function x() {
}
function N(e2 = x, t2 = x) {
  const n2 = [];
  return { callListeners(e3, t3) {
    void 0 !== t3 && n2.filter(({ key: t4 }) => t4 === e3).forEach(({ listener: e4 }) => e4(t3));
  }, addListener(t3, r2) {
    n2.push({ key: t3, listener: r2 }), 1 === n2.length && e2();
  }, removeListener(e3, r2) {
    const o2 = n2.indexOf({ key: e3, listener: r2 });
    -1 !== o2 && n2.splice(o2, 1), 0 === n2.length && t2();
  } };
}
function C(e2, t2 = false) {
  const n2 = (t3) => {
    const n3 = t3.key;
    t3.storageArea === e2 && o2(n3, S(t3.newValue));
  }, { removeListener: r2, callListeners: o2, addListener: i2 } = N(() => {
    t2 && "undefined" != typeof window && m([window, "optionalAccess", (e3) => e3.addEventListener]) && window.addEventListener("storage", n2);
  }, () => {
    t2 && "undefined" != typeof window && m([window, "optionalAccess", (e3) => e3.removeEventListener]) && window.removeEventListener("storage", n2);
  });
  return { addListener: i2, removeListener: r2, getValue(t3) {
    const n3 = e2.getItem(t3);
    return S(n3);
  }, deleteValue(t3) {
    e2.removeItem(t3);
  }, setValue(t3, n3) {
    e2.setItem(t3, A(n3));
  } };
}
function k(e2) {
  try {
    return "object" == typeof window[e2];
  } catch (e3) {
    return false;
  }
}
function I(e2 = false) {
  return k("localStorage") ? C(window.localStorage, e2) : (w("window.localStorage"), U());
}
function V(e2 = false) {
  return k("sessionStorage") ? C(window.sessionStorage, e2) : (w("window.sessionStorage"), U());
}
function R(e2) {
  return "undefined" == typeof document || "string" != typeof m([document, "optionalAccess", (e3) => e3.cookie]) ? (w("document.cookies"), U()) : { getValue(e3) {
    const t2 = h.get(e3);
    return S(t2);
  }, deleteValue(t2) {
    h.erase(t2, { samesite: "Strict", ...e2 });
  }, setValue(t2, n2) {
    h.set(t2, A(n2), { samesite: "Strict", ...e2 });
  } };
}
var M;
function U() {
  return { getValue: () => null, deleteValue() {
  }, setValue() {
  } };
}
function $() {
}
!function(e2) {
  e2[e2.LOCAL = 0] = "LOCAL";
  e2[e2.SESSION = 1] = "SESSION";
  e2[e2.SYNC = 2] = "SYNC";
}(M || (M = {}));
const D = [];
function Y(e2, t2 = $) {
  let n2;
  const r2 = /* @__PURE__ */ new Set();
  function o2(t3) {
    if (function(e3, t4) {
      return e3 != e3 ? t4 == t4 : e3 !== t4 || e3 && "object" == typeof e3 || "function" == typeof e3;
    }(e2, t3) && (e2 = t3, n2)) {
      const t4 = !D.length;
      for (const t5 of r2) t5[1](), D.push(t5, e2);
      if (t4) {
        for (let e3 = 0; e3 < D.length; e3 += 2) D[e3][0](D[e3 + 1]);
        D.length = 0;
      }
    }
  }
  function i2(t3) {
    o2(t3(e2));
  }
  return { set: o2, update: i2, subscribe: function(c2, a2 = $) {
    const s2 = [c2, a2];
    return r2.add(s2), 1 === r2.size && (n2 = t2(o2, i2) || $), c2(e2), () => {
      r2.delete(s2), 0 === r2.size && n2 && (n2(), n2 = null);
    };
  } };
}
const z = {};
function G(e2) {
  if (!Object.keys(z).includes(e2)) switch (e2) {
    case "cookie":
      z[e2] = R();
      break;
    case "local":
      z[e2] = I();
      break;
    case "session":
      z[e2] = V();
  }
  return z[e2];
}
function J(e2, t2) {
  return j(e2, G("local"), t2);
}
function X(e2, t2, n2) {
  return J(Y(t2, n2), e2);
}
function H(e2, t2, n2) {
  return X(e2, t2, n2);
}
var W, Z = function(e2) {
  return Math.round(e2 / 1099511627776) || 32;
}, ee = function(e2) {
  var t2, n2 = e2.length;
  return 0 === n2 ? 0 : (t2 = e2[n2 - 1], 32 * (n2 - 1) + Z(t2));
}, te = function(e2) {
  var t2, n2 = "", r2 = e2.length;
  for (t2 = 0; t2 < r2; t2++) n2 += (263882790666240 + (0 | e2[t2])).toString(16).substr(4);
  return n2.substr(0, ee(e2) / 4);
};
l(te);
var re = function(e2, t2, n2) {
  return 32 === e2 ? t2 : (0 | t2) + 1099511627776 * e2;
}, oe = function(e2, t2) {
  if (32 * e2.length < t2) return e2;
  var n2 = (e2 = e2.slice(0, Math.ceil(t2 / 32))).length;
  return t2 &= 31, n2 > 0 && t2 && (e2[n2 - 1] = re(t2, e2[n2 - 1] & 2147483648 >> t2 - 1)), e2;
}, ie = function(e2) {
  var t2, n2, r2, o2 = [];
  for (r2 = (e2 = e2.replace(/\s|0x/g, "")).length, n2 = (e2 += "00000000").length, t2 = 0; t2 < n2; t2 += 8) o2.push(0 ^ parseInt(e2.substr(t2, 8), 16));
  return oe(o2, 4 * r2);
};
l(ie);
var ae = { cipher: {}, hash: {}, keyexchange: {}, mode: {}, misc: {}, codec: {}, exception: { corrupt: function(e2) {
  this.toString = function() {
    return "CORRUPT: " + this.message;
  }, this.message = e2;
}, invalid: function(e2) {
  this.toString = function() {
    return "INVALID: " + this.message;
  }, this.message = e2;
}, bug: function(e2) {
  this.toString = function() {
    return "BUG: " + this.message;
  }, this.message = e2;
}, notReady: function(e2) {
  this.toString = function() {
    return "NOT READY: " + this.message;
  }, this.message = e2;
} } };
ae.cipher.aes = function(e2) {
  this._tables[0][0][0] || this._precompute();
  var t2, n2, r2, o2, i2, c2 = this._tables[0][4], a2 = this._tables[1], s2 = e2.length, u2 = 1;
  if (4 !== s2 && 6 !== s2 && 8 !== s2) throw new ae.exception.invalid("invalid aes key size");
  for (this._key = [o2 = e2.slice(0), i2 = []], t2 = s2; t2 < 4 * s2 + 28; t2++) r2 = o2[t2 - 1], (t2 % s2 == 0 || 8 === s2 && t2 % s2 == 4) && (r2 = c2[r2 >>> 24] << 24 ^ c2[r2 >> 16 & 255] << 16 ^ c2[r2 >> 8 & 255] << 8 ^ c2[255 & r2], t2 % s2 == 0 && (r2 = r2 << 8 ^ r2 >>> 24 ^ u2 << 24, u2 = u2 << 1 ^ 283 * (u2 >> 7))), o2[t2] = o2[t2 - s2] ^ r2;
  for (n2 = 0; t2; n2++, t2--) r2 = o2[3 & n2 ? t2 : t2 - 4], i2[n2] = t2 <= 4 || n2 < 4 ? r2 : a2[0][c2[r2 >>> 24]] ^ a2[1][c2[r2 >> 16 & 255]] ^ a2[2][c2[r2 >> 8 & 255]] ^ a2[3][c2[255 & r2]];
}, ae.cipher.aes.prototype = { encrypt: function(e2) {
  return this._crypt(e2, 0);
}, decrypt: function(e2) {
  return this._crypt(e2, 1);
}, _tables: [[[], [], [], [], []], [[], [], [], [], []]], _precompute: function() {
  var e2, t2, n2, r2, o2, i2, c2, a2, s2 = this._tables[0], u2 = this._tables[1], l2 = s2[4], f2 = u2[4], h2 = [], d = [];
  for (e2 = 0; e2 < 256; e2++) d[(h2[e2] = e2 << 1 ^ 283 * (e2 >> 7)) ^ e2] = e2;
  for (t2 = n2 = 0; !l2[t2]; t2 ^= r2 || 1, n2 = d[n2] || 1) for (i2 = (i2 = n2 ^ n2 << 1 ^ n2 << 2 ^ n2 << 3 ^ n2 << 4) >> 8 ^ 255 & i2 ^ 99, l2[t2] = i2, f2[i2] = t2, a2 = 16843009 * h2[o2 = h2[r2 = h2[t2]]] ^ 65537 * o2 ^ 257 * r2 ^ 16843008 * t2, c2 = 257 * h2[i2] ^ 16843008 * i2, e2 = 0; e2 < 4; e2++) s2[e2][t2] = c2 = c2 << 24 ^ c2 >>> 8, u2[e2][i2] = a2 = a2 << 24 ^ a2 >>> 8;
  for (e2 = 0; e2 < 5; e2++) s2[e2] = s2[e2].slice(0), u2[e2] = u2[e2].slice(0);
}, _crypt: function(e2, t2) {
  if (4 !== e2.length) throw new ae.exception.invalid("invalid aes block size");
  var n2, r2, o2, i2, c2 = this._key[t2], a2 = e2[0] ^ c2[0], s2 = e2[t2 ? 3 : 1] ^ c2[1], u2 = e2[2] ^ c2[2], l2 = e2[t2 ? 1 : 3] ^ c2[3], f2 = c2.length / 4 - 2, h2 = 4, d = [0, 0, 0, 0], p = this._tables[t2], g = p[0], y = p[1], m2 = p[2], b = p[3], v = p[4];
  for (i2 = 0; i2 < f2; i2++) n2 = g[a2 >>> 24] ^ y[s2 >> 16 & 255] ^ m2[u2 >> 8 & 255] ^ b[255 & l2] ^ c2[h2], r2 = g[s2 >>> 24] ^ y[u2 >> 16 & 255] ^ m2[l2 >> 8 & 255] ^ b[255 & a2] ^ c2[h2 + 1], o2 = g[u2 >>> 24] ^ y[l2 >> 16 & 255] ^ m2[a2 >> 8 & 255] ^ b[255 & s2] ^ c2[h2 + 2], l2 = g[l2 >>> 24] ^ y[a2 >> 16 & 255] ^ m2[s2 >> 8 & 255] ^ b[255 & u2] ^ c2[h2 + 3], h2 += 4, a2 = n2, s2 = r2, u2 = o2;
  for (i2 = 0; i2 < 4; i2++) d[t2 ? 3 & -i2 : i2] = v[a2 >>> 24] << 24 ^ v[s2 >> 16 & 255] << 16 ^ v[u2 >> 8 & 255] << 8 ^ v[255 & l2] ^ c2[h2++], n2 = a2, a2 = s2, s2 = u2, u2 = l2, l2 = n2;
  return d;
} }, ae.bitArray = { bitSlice: function(e2, t2, n2) {
  return e2 = ae.bitArray._shiftRight(e2.slice(t2 / 32), 32 - (31 & t2)).slice(1), void 0 === n2 ? e2 : ae.bitArray.clamp(e2, n2 - t2);
}, extract: function(e2, t2, n2) {
  var r2 = Math.floor(-t2 - n2 & 31);
  return (-32 & (t2 + n2 - 1 ^ t2) ? e2[t2 / 32 | 0] << 32 - r2 ^ e2[t2 / 32 + 1 | 0] >>> r2 : e2[t2 / 32 | 0] >>> r2) & (1 << n2) - 1;
}, concat: function(e2, t2) {
  if (0 === e2.length || 0 === t2.length) return e2.concat(t2);
  var n2 = e2[e2.length - 1], r2 = ae.bitArray.getPartial(n2);
  return 32 === r2 ? e2.concat(t2) : ae.bitArray._shiftRight(t2, r2, 0 | n2, e2.slice(0, e2.length - 1));
}, bitLength: function(e2) {
  var t2, n2 = e2.length;
  return 0 === n2 ? 0 : (t2 = e2[n2 - 1], 32 * (n2 - 1) + ae.bitArray.getPartial(t2));
}, clamp: function(e2, t2) {
  if (32 * e2.length < t2) return e2;
  var n2 = (e2 = e2.slice(0, Math.ceil(t2 / 32))).length;
  return t2 &= 31, n2 > 0 && t2 && (e2[n2 - 1] = ae.bitArray.partial(t2, e2[n2 - 1] & 2147483648 >> t2 - 1, 1)), e2;
}, partial: function(e2, t2, n2) {
  return 32 === e2 ? t2 : (n2 ? 0 | t2 : t2 << 32 - e2) + 1099511627776 * e2;
}, getPartial: function(e2) {
  return Math.round(e2 / 1099511627776) || 32;
}, equal: function(e2, t2) {
  if (ae.bitArray.bitLength(e2) !== ae.bitArray.bitLength(t2)) return false;
  var n2, r2 = 0;
  for (n2 = 0; n2 < e2.length; n2++) r2 |= e2[n2] ^ t2[n2];
  return 0 === r2;
}, _shiftRight: function(e2, t2, n2, r2) {
  var o2, i2, c2;
  for (void 0 === r2 && (r2 = []); t2 >= 32; t2 -= 32) r2.push(n2), n2 = 0;
  if (0 === t2) return r2.concat(e2);
  for (o2 = 0; o2 < e2.length; o2++) r2.push(n2 | e2[o2] >>> t2), n2 = e2[o2] << 32 - t2;
  return i2 = e2.length ? e2[e2.length - 1] : 0, c2 = ae.bitArray.getPartial(i2), r2.push(ae.bitArray.partial(t2 + c2 & 31, t2 + c2 > 32 ? n2 : r2.pop(), 1)), r2;
}, _xor4: function(e2, t2) {
  return [e2[0] ^ t2[0], e2[1] ^ t2[1], e2[2] ^ t2[2], e2[3] ^ t2[3]];
}, byteswapM: function(e2) {
  var t2, n2;
  for (t2 = 0; t2 < e2.length; ++t2) n2 = e2[t2], e2[t2] = n2 >>> 24 | n2 >>> 8 & 65280 | (65280 & n2) << 8 | n2 << 24;
  return e2;
} }, ae.codec.utf8String = { fromBits: function(e2) {
  var t2, n2, r2 = "", o2 = ae.bitArray.bitLength(e2);
  for (t2 = 0; t2 < o2 / 8; t2++) 0 == (3 & t2) && (n2 = e2[t2 / 4]), r2 += String.fromCharCode(n2 >>> 8 >>> 8 >>> 8), n2 <<= 8;
  return decodeURIComponent(escape(r2));
}, toBits: function(e2) {
  e2 = unescape(encodeURIComponent(e2));
  var t2, n2 = [], r2 = 0;
  for (t2 = 0; t2 < e2.length; t2++) r2 = r2 << 8 | e2.charCodeAt(t2), 3 == (3 & t2) && (n2.push(r2), r2 = 0);
  return 3 & t2 && n2.push(ae.bitArray.partial(8 * (3 & t2), r2)), n2;
} }, ae.codec.base64 = { _chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function(e2, t2, n2) {
  var r2, o2 = "", i2 = 0, c2 = ae.codec.base64._chars, a2 = 0, s2 = ae.bitArray.bitLength(e2);
  for (n2 && (c2 = c2.substr(0, 62) + "-_"), r2 = 0; 6 * o2.length < s2; ) o2 += c2.charAt((a2 ^ e2[r2] >>> i2) >>> 26), i2 < 6 ? (a2 = e2[r2] << 6 - i2, i2 += 26, r2++) : (a2 <<= 6, i2 -= 6);
  for (; 3 & o2.length && !t2; ) o2 += "=";
  return o2;
}, toBits: function(e2, t2) {
  e2 = e2.replace(/\s|=/g, "");
  var n2, r2, o2 = [], i2 = 0, c2 = ae.codec.base64._chars, a2 = 0;
  for (t2 && (c2 = c2.substr(0, 62) + "-_"), n2 = 0; n2 < e2.length; n2++) {
    if ((r2 = c2.indexOf(e2.charAt(n2))) < 0) throw new ae.exception.invalid("this isn't base64!");
    i2 > 26 ? (i2 -= 26, o2.push(a2 ^ r2 >>> i2), a2 = r2 << 32 - i2) : a2 ^= r2 << 32 - (i2 += 6);
  }
  return 56 & i2 && o2.push(ae.bitArray.partial(56 & i2, a2, 1)), o2;
} }, ae.codec.base64url = { fromBits: function(e2) {
  return ae.codec.base64.fromBits(e2, 1, 1);
}, toBits: function(e2) {
  return ae.codec.base64.toBits(e2, 1);
} }, ae.mode.gcm = { name: "gcm", encrypt: function(e2, t2, n2, r2, o2) {
  var i2, c2 = t2.slice(0), a2 = ae.bitArray;
  return o2 = o2 || 128, r2 = r2 || [], i2 = ae.mode.gcm._ctrMode(true, e2, c2, r2, n2, o2), a2.concat(i2.data, i2.tag);
}, decrypt: function(e2, t2, n2, r2, o2) {
  var i2, c2, a2 = t2.slice(0), s2 = ae.bitArray, u2 = s2.bitLength(a2);
  if (r2 = r2 || [], (o2 = o2 || 128) <= u2 ? (c2 = s2.bitSlice(a2, u2 - o2), a2 = s2.bitSlice(a2, 0, u2 - o2)) : (c2 = a2, a2 = []), i2 = ae.mode.gcm._ctrMode(false, e2, a2, r2, n2, o2), !s2.equal(i2.tag, c2)) throw new ae.exception.corrupt("gcm: tag doesn't match");
  return i2.data;
}, _galoisMultiply: function(e2, t2) {
  var n2, r2, o2, i2, c2, a2 = ae.bitArray._xor4;
  for (o2 = [0, 0, 0, 0], i2 = t2.slice(0), n2 = 0; n2 < 128; n2++) {
    for (0 != (e2[Math.floor(n2 / 32)] & 1 << 31 - n2 % 32) && (o2 = a2(o2, i2)), c2 = 0 != (1 & i2[3]), r2 = 3; r2 > 0; r2--) i2[r2] = i2[r2] >>> 1 | (1 & i2[r2 - 1]) << 31;
    i2[0] = i2[0] >>> 1, c2 && (i2[0] = i2[0] ^ 225 << 24);
  }
  return o2;
}, _ghash: function(e2, t2, n2) {
  var r2, o2, i2 = n2.length;
  for (r2 = t2.slice(0), o2 = 0; o2 < i2; o2 += 4) r2[0] ^= 4294967295 & n2[o2], r2[1] ^= 4294967295 & n2[o2 + 1], r2[2] ^= 4294967295 & n2[o2 + 2], r2[3] ^= 4294967295 & n2[o2 + 3], r2 = ae.mode.gcm._galoisMultiply(r2, e2);
  return r2;
}, _ctrMode: function(e2, t2, n2, r2, o2, i2) {
  var c2, a2, s2, u2, l2, f2, h2, d, p, g, y, m2, b = ae.bitArray;
  for (p = n2.length, g = b.bitLength(n2), y = b.bitLength(r2), m2 = b.bitLength(o2), c2 = t2.encrypt([0, 0, 0, 0]), 96 === m2 ? (a2 = o2.slice(0), a2 = b.concat(a2, [1])) : (a2 = ae.mode.gcm._ghash(c2, [0, 0, 0, 0], o2), a2 = ae.mode.gcm._ghash(c2, a2, [0, 0, Math.floor(m2 / 4294967296), 4294967295 & m2])), s2 = ae.mode.gcm._ghash(c2, [0, 0, 0, 0], r2), f2 = a2.slice(0), h2 = s2.slice(0), e2 || (h2 = ae.mode.gcm._ghash(c2, s2, n2)), l2 = 0; l2 < p; l2 += 4) f2[3]++, u2 = t2.encrypt(f2), n2[l2] ^= u2[0], n2[l2 + 1] ^= u2[1], n2[l2 + 2] ^= u2[2], n2[l2 + 3] ^= u2[3];
  return n2 = b.clamp(n2, g), e2 && (h2 = ae.mode.gcm._ghash(c2, s2, n2)), d = [Math.floor(y / 4294967296), 4294967295 & y, Math.floor(g / 4294967296), 4294967295 & g], h2 = ae.mode.gcm._ghash(c2, h2, d), u2 = t2.encrypt(a2), h2[0] ^= u2[0], h2[1] ^= u2[1], h2[2] ^= u2[2], h2[3] ^= u2[3], { tag: b.bitSlice(h2, 0, i2), data: n2 };
} }, function(e2) {
  e2[e2.EXCEPTION = 0] = "EXCEPTION";
  e2[e2.NO_ENCRYPTION = 1] = "NO_ENCRYPTION";
  e2[e2.NO_STORAGE = 2] = "NO_STORAGE";
}(W || (W = {}));
const initialStore = {
  selectedLocation: null,
  selectedProfessional: null,
  selectedService: null,
  bookingType: "waitlist",
  bookingDelay: "10",
  bookingDate: null,
  bookingTime: null,
  tipPercent: null,
  cardenFee: 150,
  totalBill: 0
};
const shopStore = H("shopStore", structuredClone(initialStore));
const setBookingDate = (date) => {
  shopStore.update((store) => {
    store.bookingDate = date;
    return store;
  });
};
export {
  setBookingDate as a,
  shopStore as s
};
