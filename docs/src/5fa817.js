var Bh = Object.defineProperty
var Hh = (o, e, t) =>
  e in o
    ? Bh(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (o[e] = t)
var mn = (o, e, t) => Hh(o, typeof e != 'symbol' ? e + '' : e, t)
;(function () {
  const e = document.createElement('link').relList
  if (e && e.supports && e.supports('modulepreload')) return
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r)
  new MutationObserver((r) => {
    for (const i of r)
      if (i.type === 'childList')
        for (const s of i.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && n(s)
  }).observe(document, { childList: !0, subtree: !0 })
  function t(r) {
    const i = {}
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : r.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    )
  }
  function n(r) {
    if (r.ep) return
    r.ep = !0
    const i = t(r)
    fetch(r.href, i)
  }
})()
var No = function () {
  return (
    (No =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var i in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        return e
      }),
    No.apply(this, arguments)
  )
}
function Mu(o, e, t) {
  return Math.max(o, Math.min(e, t))
}
class Uh {
  advance(e) {
    var n
    if (!this.isRunning) return
    let t = !1
    if (this.lerp)
      (this.value = (function (i, s, a, l) {
        return (function (c, h, d) {
          return (1 - d) * c + d * h
        })(i, s, 1 - Math.exp(-a * l))
      })(this.value, this.to, 60 * this.lerp, e)),
        Math.round(this.value) === this.to && ((this.value = this.to), (t = !0))
    else {
      this.currentTime += e
      const r = Mu(0, this.currentTime / this.duration, 1)
      t = r >= 1
      const i = t ? 1 : this.easing(r)
      this.value = this.from + (this.to - this.from) * i
    }
    t && this.stop(), (n = this.onUpdate) == null || n.call(this, this.value, t)
  }
  stop() {
    this.isRunning = !1
  }
  fromTo(
    e,
    t,
    {
      lerp: n = 0.1,
      duration: r = 1,
      easing: i = (l) => l,
      onStart: s,
      onUpdate: a,
    }
  ) {
    ;(this.from = this.value = e),
      (this.to = t),
      (this.lerp = n),
      (this.duration = r),
      (this.easing = i),
      (this.currentTime = 0),
      (this.isRunning = !0),
      s == null || s(),
      (this.onUpdate = a)
  }
}
class Vh {
  constructor({
    wrapper: e,
    content: t,
    autoResize: n = !0,
    debounce: r = 250,
  } = {}) {
    mn(this, 'resize', () => {
      this.onWrapperResize(), this.onContentResize()
    })
    mn(this, 'onWrapperResize', () => {
      this.wrapper === window
        ? ((this.width = window.innerWidth), (this.height = window.innerHeight))
        : ((this.width = this.wrapper.clientWidth),
          (this.height = this.wrapper.clientHeight))
    })
    mn(this, 'onContentResize', () => {
      this.wrapper === window
        ? ((this.scrollHeight = this.content.scrollHeight),
          (this.scrollWidth = this.content.scrollWidth))
        : ((this.scrollHeight = this.wrapper.scrollHeight),
          (this.scrollWidth = this.wrapper.scrollWidth))
    })
    ;(this.wrapper = e),
      (this.content = t),
      n &&
        ((this.debouncedResize = (function (s, a) {
          let l
          return function () {
            let u = arguments,
              c = this
            clearTimeout(l),
              (l = setTimeout(function () {
                s.apply(c, u)
              }, a))
          }
        })(this.resize, r)),
        this.wrapper === window
          ? window.addEventListener('resize', this.debouncedResize, !1)
          : ((this.wrapperResizeObserver = new ResizeObserver(
              this.debouncedResize
            )),
            this.wrapperResizeObserver.observe(this.wrapper)),
        (this.contentResizeObserver = new ResizeObserver(this.debouncedResize)),
        this.contentResizeObserver.observe(this.content)),
      this.resize()
  }
  destroy() {
    var e, t
    ;(e = this.wrapperResizeObserver) == null || e.disconnect(),
      (t = this.contentResizeObserver) == null || t.disconnect(),
      window.removeEventListener('resize', this.debouncedResize, !1)
  }
  get limit() {
    return {
      x: this.scrollWidth - this.width,
      y: this.scrollHeight - this.height,
    }
  }
}
class Ru {
  constructor() {
    this.events = {}
  }
  emit(e, ...t) {
    let n = this.events[e] || []
    for (let r = 0, i = n.length; r < i; r++) n[r](...t)
  }
  on(e, t) {
    var n
    return (
      ((n = this.events[e]) != null && n.push(t)) || (this.events[e] = [t]),
      () => {
        var r
        this.events[e] =
          (r = this.events[e]) == null ? void 0 : r.filter((i) => t !== i)
      }
    )
  }
  off(e, t) {
    var n
    this.events[e] =
      (n = this.events[e]) == null ? void 0 : n.filter((r) => t !== r)
  }
  destroy() {
    this.events = {}
  }
}
const hl = 100 / 6
class qh {
  constructor(e, { wheelMultiplier: t = 1, touchMultiplier: n = 1 }) {
    mn(this, 'onTouchStart', (e) => {
      const { clientX: t, clientY: n } = e.targetTouches
        ? e.targetTouches[0]
        : e
      ;(this.touchStart.x = t),
        (this.touchStart.y = n),
        (this.lastDelta = { x: 0, y: 0 }),
        this.emitter.emit('scroll', { deltaX: 0, deltaY: 0, event: e })
    })
    mn(this, 'onTouchMove', (e) => {
      const { clientX: t, clientY: n } = e.targetTouches
          ? e.targetTouches[0]
          : e,
        r = -(t - this.touchStart.x) * this.touchMultiplier,
        i = -(n - this.touchStart.y) * this.touchMultiplier
      ;(this.touchStart.x = t),
        (this.touchStart.y = n),
        (this.lastDelta = { x: r, y: i }),
        this.emitter.emit('scroll', { deltaX: r, deltaY: i, event: e })
    })
    mn(this, 'onTouchEnd', (e) => {
      this.emitter.emit('scroll', {
        deltaX: this.lastDelta.x,
        deltaY: this.lastDelta.y,
        event: e,
      })
    })
    mn(this, 'onWheel', (e) => {
      let { deltaX: t, deltaY: n, deltaMode: r } = e
      ;(t *= r === 1 ? hl : r === 2 ? this.windowWidth : 1),
        (n *= r === 1 ? hl : r === 2 ? this.windowHeight : 1),
        (t *= this.wheelMultiplier),
        (n *= this.wheelMultiplier),
        this.emitter.emit('scroll', { deltaX: t, deltaY: n, event: e })
    })
    mn(this, 'onWindowResize', () => {
      ;(this.windowWidth = window.innerWidth),
        (this.windowHeight = window.innerHeight)
    })
    ;(this.element = e),
      (this.wheelMultiplier = t),
      (this.touchMultiplier = n),
      (this.touchStart = { x: null, y: null }),
      (this.emitter = new Ru()),
      window.addEventListener('resize', this.onWindowResize, !1),
      this.onWindowResize(),
      this.element.addEventListener('wheel', this.onWheel, { passive: !1 }),
      this.element.addEventListener('touchstart', this.onTouchStart, {
        passive: !1,
      }),
      this.element.addEventListener('touchmove', this.onTouchMove, {
        passive: !1,
      }),
      this.element.addEventListener('touchend', this.onTouchEnd, {
        passive: !1,
      })
  }
  on(e, t) {
    return this.emitter.on(e, t)
  }
  destroy() {
    this.emitter.destroy(),
      window.removeEventListener('resize', this.onWindowResize, !1),
      this.element.removeEventListener('wheel', this.onWheel, { passive: !1 }),
      this.element.removeEventListener('touchstart', this.onTouchStart, {
        passive: !1,
      }),
      this.element.removeEventListener('touchmove', this.onTouchMove, {
        passive: !1,
      }),
      this.element.removeEventListener('touchend', this.onTouchEnd, {
        passive: !1,
      })
  }
}
var Yh = (function () {
  function o(e) {
    var t = e === void 0 ? {} : e,
      n = t.wrapper,
      r = n === void 0 ? window : n,
      i = t.content,
      s = i === void 0 ? document.documentElement : i,
      a = t.wheelEventsTarget,
      l = a === void 0 ? r : a,
      u = t.eventsTarget,
      c = u === void 0 ? l : u,
      h = t.smoothWheel,
      d = h === void 0 || h,
      f = t.syncTouch,
      g = f !== void 0 && f,
      p = t.syncTouchLerp,
      m = p === void 0 ? 0.075 : p,
      _ = t.touchInertiaMultiplier,
      D = _ === void 0 ? 35 : _,
      C = t.duration,
      v = t.easing,
      w =
        v === void 0
          ? function (ae) {
              return Math.min(1, 1.001 - Math.pow(2, -10 * ae))
            }
          : v,
      E = t.lerp,
      x = E === void 0 ? !C && 0.1 : E,
      $ = t.infinite,
      T = $ !== void 0 && $,
      k = t.orientation,
      A = k === void 0 ? 'vertical' : k,
      P = t.gestureOrientation,
      j = P === void 0 ? 'vertical' : P,
      z = t.touchMultiplier,
      O = z === void 0 ? 1 : z,
      I = t.wheelMultiplier,
      R = I === void 0 ? 1 : I,
      N = t.autoResize,
      H = N === void 0 || N,
      y = t.__experimental__naiveDimensions,
      U = y !== void 0 && y,
      L = this
    ;(this.__isSmooth = !1),
      (this.__isScrolling = !1),
      (this.__isStopped = !1),
      (this.__isLocked = !1),
      (this.onVirtualScroll = function (ae) {
        var se = ae.deltaX,
          ce = ae.deltaY,
          de = ae.event
        if (!de.ctrlKey) {
          var he = de.type.includes('touch'),
            Oe = de.type.includes('wheel')
          if (
            L.options.syncTouch &&
            he &&
            de.type === 'touchstart' &&
            !L.isStopped &&
            !L.isLocked
          )
            L.reset()
          else {
            var Le = se === 0 && ce === 0,
              _e =
                (L.options.gestureOrientation === 'vertical' && ce === 0) ||
                (L.options.gestureOrientation === 'horizontal' && se === 0)
            if (!Le && !_e) {
              var Be = de.composedPath()
              if (
                !(Be = Be.slice(0, Be.indexOf(L.rootElement))).find(
                  function (xe) {
                    var Ke, S, Je, St, zt
                    return (
                      ((Ke = xe.hasAttribute) === null || Ke === void 0
                        ? void 0
                        : Ke.call(xe, 'data-lenis-prevent')) ||
                      (he &&
                        ((S = xe.hasAttribute) === null || S === void 0
                          ? void 0
                          : S.call(xe, 'data-lenis-prevent-touch'))) ||
                      (Oe &&
                        ((Je = xe.hasAttribute) === null || Je === void 0
                          ? void 0
                          : Je.call(xe, 'data-lenis-prevent-wheel'))) ||
                      (((St = xe.classList) === null || St === void 0
                        ? void 0
                        : St.contains('lenis')) &&
                        !(
                          !((zt = xe.classList) === null || zt === void 0) &&
                          zt.contains('lenis-stopped')
                        ))
                    )
                  }
                )
              )
                if (L.isStopped || L.isLocked) de.preventDefault()
                else {
                  if (
                    ((L.isSmooth =
                      (L.options.syncTouch && he) ||
                      (L.options.smoothWheel && Oe)),
                    !L.isSmooth)
                  )
                    return (L.isScrolling = !1), void L.animate.stop()
                  de.preventDefault()
                  var Me = ce
                  L.options.gestureOrientation === 'both'
                    ? (Me = Math.abs(ce) > Math.abs(se) ? ce : se)
                    : L.options.gestureOrientation === 'horizontal' && (Me = se)
                  var ee = he && L.options.syncTouch,
                    De = he && de.type === 'touchend' && Math.abs(Me) > 5
                  De && (Me = L.velocity * L.options.touchInertiaMultiplier),
                    L.scrollTo(
                      L.targetScroll + Me,
                      No(
                        { programmatic: !1 },
                        ee
                          ? { lerp: De ? L.options.syncTouchLerp : 1 }
                          : {
                              lerp: L.options.lerp,
                              duration: L.options.duration,
                              easing: L.options.easing,
                            }
                      )
                    )
                }
            }
          }
        }
      }),
      (this.onNativeScroll = function () {
        if (!L.__preventNextScrollEvent && !L.isScrolling) {
          var ae = L.animatedScroll
          ;(L.animatedScroll = L.targetScroll = L.actualScroll),
            (L.velocity = 0),
            (L.direction = Math.sign(L.animatedScroll - ae)),
            L.emit()
        }
      }),
      (window.lenisVersion = '1.0.45'),
      (r !== document.documentElement && r !== document.body) || (r = window),
      (this.options = {
        wrapper: r,
        content: s,
        wheelEventsTarget: l,
        eventsTarget: c,
        smoothWheel: d,
        syncTouch: g,
        syncTouchLerp: m,
        touchInertiaMultiplier: D,
        duration: C,
        easing: w,
        lerp: x,
        infinite: T,
        gestureOrientation: j,
        orientation: A,
        touchMultiplier: O,
        wheelMultiplier: R,
        autoResize: H,
        __experimental__naiveDimensions: U,
      }),
      (this.animate = new Uh()),
      (this.emitter = new Ru()),
      (this.dimensions = new Vh({ wrapper: r, content: s, autoResize: H })),
      this.toggleClassName('lenis', !0),
      (this.velocity = 0),
      (this.isLocked = !1),
      (this.isStopped = !1),
      (this.isSmooth = g || d),
      (this.isScrolling = !1),
      (this.targetScroll = this.animatedScroll = this.actualScroll),
      this.options.wrapper.addEventListener('scroll', this.onNativeScroll, !1),
      (this.virtualScroll = new qh(c, {
        touchMultiplier: O,
        wheelMultiplier: R,
      })),
      this.virtualScroll.on('scroll', this.onVirtualScroll)
  }
  return (
    (o.prototype.destroy = function () {
      this.emitter.destroy(),
        this.options.wrapper.removeEventListener(
          'scroll',
          this.onNativeScroll,
          !1
        ),
        this.virtualScroll.destroy(),
        this.dimensions.destroy(),
        this.toggleClassName('lenis', !1),
        this.toggleClassName('lenis-smooth', !1),
        this.toggleClassName('lenis-scrolling', !1),
        this.toggleClassName('lenis-stopped', !1),
        this.toggleClassName('lenis-locked', !1)
    }),
    (o.prototype.on = function (e, t) {
      return this.emitter.on(e, t)
    }),
    (o.prototype.off = function (e, t) {
      return this.emitter.off(e, t)
    }),
    (o.prototype.setScroll = function (e) {
      this.isHorizontal
        ? (this.rootElement.scrollLeft = e)
        : (this.rootElement.scrollTop = e)
    }),
    (o.prototype.resize = function () {
      this.dimensions.resize()
    }),
    (o.prototype.emit = function () {
      this.emitter.emit('scroll', this)
    }),
    (o.prototype.reset = function () {
      ;(this.isLocked = !1),
        (this.isScrolling = !1),
        (this.animatedScroll = this.targetScroll = this.actualScroll),
        (this.velocity = 0),
        this.animate.stop()
    }),
    (o.prototype.start = function () {
      this.isStopped && ((this.isStopped = !1), this.reset())
    }),
    (o.prototype.stop = function () {
      this.isStopped ||
        ((this.isStopped = !0), this.animate.stop(), this.reset())
    }),
    (o.prototype.raf = function (e) {
      var t = e - (this.time || e)
      ;(this.time = e), this.animate.advance(0.001 * t)
    }),
    (o.prototype.scrollTo = function (e, t) {
      var n = this,
        r = t === void 0 ? {} : t,
        i = r.offset,
        s = i === void 0 ? 0 : i,
        a = r.immediate,
        l = a !== void 0 && a,
        u = r.lock,
        c = u !== void 0 && u,
        h = r.duration,
        d = h === void 0 ? this.options.duration : h,
        f = r.easing,
        g = f === void 0 ? this.options.easing : f,
        p = r.lerp,
        m = p === void 0 ? !d && this.options.lerp : p,
        _ = r.onComplete,
        D = r.force,
        C = D !== void 0 && D,
        v = r.programmatic,
        w = v === void 0 || v
      if ((!this.isStopped && !this.isLocked) || C) {
        if (['top', 'left', 'start'].includes(e)) e = 0
        else if (['bottom', 'right', 'end'].includes(e)) e = this.limit
        else {
          var E = void 0
          if (
            (typeof e == 'string'
              ? (E = document.querySelector(e))
              : e != null && e.nodeType && (E = e),
            E)
          ) {
            if (this.options.wrapper !== window) {
              var x = this.options.wrapper.getBoundingClientRect()
              s -= this.isHorizontal ? x.left : x.top
            }
            var $ = E.getBoundingClientRect()
            e = (this.isHorizontal ? $.left : $.top) + this.animatedScroll
          }
        }
        if (typeof e == 'number') {
          if (
            ((e += s),
            (e = Math.round(e)),
            this.options.infinite
              ? w && (this.targetScroll = this.animatedScroll = this.scroll)
              : (e = Mu(0, e, this.limit)),
            l)
          )
            return (
              (this.animatedScroll = this.targetScroll = e),
              this.setScroll(this.scroll),
              this.reset(),
              void (_ == null || _(this))
            )
          if (!w) {
            if (e === this.targetScroll) return
            this.targetScroll = e
          }
          this.animate.fromTo(this.animatedScroll, e, {
            duration: d,
            easing: g,
            lerp: m,
            onStart: function () {
              c && (n.isLocked = !0), (n.isScrolling = !0)
            },
            onUpdate: function (T, k) {
              ;(n.isScrolling = !0),
                (n.velocity = T - n.animatedScroll),
                (n.direction = Math.sign(n.velocity)),
                (n.animatedScroll = T),
                n.setScroll(n.scroll),
                w && (n.targetScroll = T),
                k || n.emit(),
                k &&
                  (n.reset(),
                  n.emit(),
                  _ == null || _(n),
                  (n.__preventNextScrollEvent = !0),
                  requestAnimationFrame(function () {
                    delete n.__preventNextScrollEvent
                  }))
            },
          })
        }
      }
    }),
    Object.defineProperty(o.prototype, 'rootElement', {
      get: function () {
        return this.options.wrapper === window
          ? document.documentElement
          : this.options.wrapper
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(o.prototype, 'limit', {
      get: function () {
        return this.options.__experimental__naiveDimensions
          ? this.isHorizontal
            ? this.rootElement.scrollWidth - this.rootElement.clientWidth
            : this.rootElement.scrollHeight - this.rootElement.clientHeight
          : this.dimensions.limit[this.isHorizontal ? 'x' : 'y']
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(o.prototype, 'isHorizontal', {
      get: function () {
        return this.options.orientation === 'horizontal'
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(o.prototype, 'actualScroll', {
      get: function () {
        return this.isHorizontal
          ? this.rootElement.scrollLeft
          : this.rootElement.scrollTop
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(o.prototype, 'scroll', {
      get: function () {
        return this.options.infinite
          ? (function (t, n) {
              return ((t % n) + n) % n
            })(this.animatedScroll, this.limit)
          : this.animatedScroll
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(o.prototype, 'progress', {
      get: function () {
        return this.limit === 0 ? 1 : this.scroll / this.limit
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(o.prototype, 'isSmooth', {
      get: function () {
        return this.__isSmooth
      },
      set: function (e) {
        this.__isSmooth !== e &&
          ((this.__isSmooth = e), this.toggleClassName('lenis-smooth', e))
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(o.prototype, 'isScrolling', {
      get: function () {
        return this.__isScrolling
      },
      set: function (e) {
        this.__isScrolling !== e &&
          ((this.__isScrolling = e), this.toggleClassName('lenis-scrolling', e))
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(o.prototype, 'isStopped', {
      get: function () {
        return this.__isStopped
      },
      set: function (e) {
        this.__isStopped !== e &&
          ((this.__isStopped = e), this.toggleClassName('lenis-stopped', e))
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(o.prototype, 'isLocked', {
      get: function () {
        return this.__isLocked
      },
      set: function (e) {
        this.__isLocked !== e &&
          ((this.__isLocked = e), this.toggleClassName('lenis-locked', e))
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(o.prototype, 'className', {
      get: function () {
        var e = 'lenis'
        return (
          this.isStopped && (e += ' lenis-stopped'),
          this.isLocked && (e += ' lenis-locked'),
          this.isScrolling && (e += ' lenis-scrolling'),
          this.isSmooth && (e += ' lenis-smooth'),
          e
        )
      },
      enumerable: !1,
      configurable: !0,
    }),
    (o.prototype.toggleClassName = function (e, t) {
      this.rootElement.classList.toggle(e, t),
        this.emitter.emit('className change', this)
    }),
    o
  )
})()
const Ri = new Yh()
window.lenis = Ri
function jo(o) {
  Ri.raf(o), requestAnimationFrame(jo)
}
const Wh = !!document.querySelector('mobile-loading')
Wh
  ? (Ri.stop(),
    window.addEventListener(
      'mobile-loading:done',
      () => {
        Ri.start(), requestAnimationFrame(jo)
      },
      { once: !0 }
    ))
  : requestAnimationFrame(jo)
document.addEventListener('click', (o) => {
  const e = o.target.closest('a[href^="#"]')
  if (!e) return
  const t = e.getAttribute('href')
  if (!t) return
  const n = document.querySelector(t)
  n && (o.preventDefault(), Ri.scrollTo(n))
})
function _n(o) {
  if (o === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  return o
}
function zu(o, e) {
  ;(o.prototype = Object.create(e.prototype)),
    (o.prototype.constructor = o),
    (o.__proto__ = e)
}
var Lt = {
    autoSleep: 120,
    force3D: 'auto',
    nullTargetWarn: 1,
    units: { lineHeight: '' },
  },
  Vr = { duration: 0.5, overwrite: !1, delay: 0 },
  Fa,
  tt,
  ve,
  un = 1e8,
  ut = 1 / un,
  Bo = Math.PI * 2,
  Xh = Bo / 4,
  Gh = 0,
  Iu = Math.sqrt,
  Kh = Math.cos,
  Jh = Math.sin,
  Ge = function (e) {
    return typeof e == 'string'
  },
  Te = function (e) {
    return typeof e == 'function'
  },
  Cn = function (e) {
    return typeof e == 'number'
  },
  Aa = function (e) {
    return typeof e > 'u'
  },
  hn = function (e) {
    return typeof e == 'object'
  },
  vt = function (e) {
    return e !== !1
  },
  Oa = function () {
    return typeof window < 'u'
  },
  as = function (e) {
    return Te(e) || Ge(e)
  },
  Nu =
    (typeof ArrayBuffer == 'function' && ArrayBuffer.isView) || function () {},
  ct = Array.isArray,
  Ho = /(?:-?\.?\d|\.)+/gi,
  ju = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  Mr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  _o = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  Bu = /[+-]=-?[.\d]+/,
  Hu = /[^,'"\[\]\s]+/gi,
  Zh = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
  Ce,
  tn,
  Uo,
  La,
  Mt = {},
  Is = {},
  Uu,
  Vu = function (e) {
    return (Is = qr(e, Mt)) && wt
  },
  Ma = function (e, t) {},
  zi = function (e, t) {
    return !t && void 0
  },
  qu = function (e, t) {
    return (e && (Mt[e] = t) && Is && (Is[e] = t)) || Mt
  },
  Ii = function () {
    return 0
  },
  Qh = { suppressEvents: !0, isStart: !0, kill: !1 },
  Ss = { suppressEvents: !0, kill: !1 },
  ed = { suppressEvents: !0 },
  Ra = {},
  zn = [],
  Vo = {},
  Yu,
  $t = {},
  Do = {},
  dl = 30,
  Es = [],
  za = '',
  Ia = function (e) {
    var t = e[0],
      n,
      r
    if ((hn(t) || Te(t) || (e = [e]), !(n = (t._gsap || {}).harness))) {
      for (r = Es.length; r-- && !Es[r].targetTest(t); );
      n = Es[r]
    }
    for (r = e.length; r--; )
      (e[r] && (e[r]._gsap || (e[r]._gsap = new mc(e[r], n)))) || e.splice(r, 1)
    return e
  },
  ar = function (e) {
    return e._gsap || Ia(Ht(e))[0]._gsap
  },
  Wu = function (e, t, n) {
    return (n = e[t]) && Te(n)
      ? e[t]()
      : (Aa(n) && e.getAttribute && e.getAttribute(t)) || n
  },
  xt = function (e, t) {
    return (e = e.split(',')).forEach(t) || e
  },
  Pe = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0
  },
  Ne = function (e) {
    return Math.round(e * 1e7) / 1e7 || 0
  },
  Ir = function (e, t) {
    var n = t.charAt(0),
      r = parseFloat(t.substr(2))
    return (
      (e = parseFloat(e)),
      n === '+' ? e + r : n === '-' ? e - r : n === '*' ? e * r : e / r
    )
  },
  td = function (e, t) {
    for (var n = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < n; );
    return r < n
  },
  Ns = function () {
    var e = zn.length,
      t = zn.slice(0),
      n,
      r
    for (Vo = {}, zn.length = 0, n = 0; n < e; n++)
      (r = t[n]),
        r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0)
  },
  Na = function (e) {
    return !!(e._initted || e._startAt || e.add)
  },
  Xu = function (e, t, n, r) {
    zn.length && !tt && Ns(),
      e.render(t, n, !!(tt && t < 0 && Na(e))),
      zn.length && !tt && Ns()
  },
  Gu = function (e) {
    var t = parseFloat(e)
    return (t || t === 0) && (e + '').match(Hu).length < 2
      ? t
      : Ge(e)
        ? e.trim()
        : e
  },
  Ku = function (e) {
    return e
  },
  Rt = function (e, t) {
    for (var n in t) n in e || (e[n] = t[n])
    return e
  },
  nd = function (e) {
    return function (t, n) {
      for (var r in n)
        r in t || (r === 'duration' && e) || r === 'ease' || (t[r] = n[r])
    }
  },
  qr = function (e, t) {
    for (var n in t) e[n] = t[n]
    return e
  },
  fl = function o(e, t) {
    for (var n in t)
      n !== '__proto__' &&
        n !== 'constructor' &&
        n !== 'prototype' &&
        (e[n] = hn(t[n]) ? o(e[n] || (e[n] = {}), t[n]) : t[n])
    return e
  },
  js = function (e, t) {
    var n = {},
      r
    for (r in e) r in t || (n[r] = e[r])
    return n
  },
  vi = function (e) {
    var t = e.parent || Ce,
      n = e.keyframes ? nd(ct(e.keyframes)) : Rt
    if (vt(e.inherit))
      for (; t; ) n(e, t.vars.defaults), (t = t.parent || t._dp)
    return e
  },
  rd = function (e, t) {
    for (var n = e.length, r = n === t.length; r && n-- && e[n] === t[n]; );
    return n < 0
  },
  Ju = function (e, t, n, r, i) {
    var s = e[r],
      a
    if (i) for (a = t[i]; s && s[i] > a; ) s = s._prev
    return (
      s ? ((t._next = s._next), (s._next = t)) : ((t._next = e[n]), (e[n] = t)),
      t._next ? (t._next._prev = t) : (e[r] = t),
      (t._prev = s),
      (t.parent = t._dp = e),
      t
    )
  },
  so = function (e, t, n, r) {
    n === void 0 && (n = '_first'), r === void 0 && (r = '_last')
    var i = t._prev,
      s = t._next
    i ? (i._next = s) : e[n] === t && (e[n] = s),
      s ? (s._prev = i) : e[r] === t && (e[r] = i),
      (t._next = t._prev = t.parent = null)
  },
  Bn = function (e, t) {
    e.parent &&
      (!t || e.parent.autoRemoveChildren) &&
      e.parent.remove &&
      e.parent.remove(e),
      (e._act = 0)
  },
  lr = function (e, t) {
    if (e && (!t || t._end > e._dur || t._start < 0))
      for (var n = e; n; ) (n._dirty = 1), (n = n.parent)
    return e
  },
  id = function (e) {
    for (var t = e.parent; t && t.parent; )
      (t._dirty = 1), t.totalDuration(), (t = t.parent)
    return e
  },
  qo = function (e, t, n, r) {
    return (
      e._startAt &&
      (tt
        ? e._startAt.revert(Ss)
        : (e.vars.immediateRender && !e.vars.autoRevert) ||
          e._startAt.render(t, !0, r))
    )
  },
  sd = function o(e) {
    return !e || (e._ts && o(e.parent))
  },
  pl = function (e) {
    return e._repeat ? Yr(e._tTime, (e = e.duration() + e._rDelay)) * e : 0
  },
  Yr = function (e, t) {
    var n = Math.floor((e = Ne(e / t)))
    return e && n === e ? n - 1 : n
  },
  Bs = function (e, t) {
    return (
      (e - t._start) * t._ts +
      (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
    )
  },
  oo = function (e) {
    return (e._end = Ne(
      e._start + (e._tDur / Math.abs(e._ts || e._rts || ut) || 0)
    ))
  },
  ao = function (e, t) {
    var n = e._dp
    return (
      n &&
        n.smoothChildTiming &&
        e._ts &&
        ((e._start = Ne(
          n._time -
            (e._ts > 0
              ? t / e._ts
              : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
        )),
        oo(e),
        n._dirty || lr(n, e)),
      e
    )
  },
  Zu = function (e, t) {
    var n
    if (
      ((t._time ||
        (!t._dur && t._initted) ||
        (t._start < e._time && (t._dur || !t.add))) &&
        ((n = Bs(e.rawTime(), t)),
        (!t._dur || Qi(0, t.totalDuration(), n) - t._tTime > ut) &&
          t.render(n, !0)),
      lr(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
    ) {
      if (e._dur < e.duration())
        for (n = e; n._dp; )
          n.rawTime() >= 0 && n.totalTime(n._tTime), (n = n._dp)
      e._zTime = -1e-8
    }
  },
  rn = function (e, t, n, r) {
    return (
      t.parent && Bn(t),
      (t._start = Ne(
        (Cn(n) ? n : n || e !== Ce ? Nt(e, n, t) : e._time) + t._delay
      )),
      (t._end = Ne(
        t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
      )),
      Ju(e, t, '_first', '_last', e._sort ? '_start' : 0),
      Yo(t) || (e._recent = t),
      r || Zu(e, t),
      e._ts < 0 && ao(e, e._tTime),
      e
    )
  },
  Qu = function (e, t) {
    return (
      (Mt.ScrollTrigger || Ma('scrollTrigger', t)) &&
      Mt.ScrollTrigger.create(t, e)
    )
  },
  ec = function (e, t, n, r, i) {
    if ((Ba(e, t, i), !e._initted)) return 1
    if (
      !n &&
      e._pt &&
      !tt &&
      ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
      Yu !== Ft.frame
    )
      return zn.push(e), (e._lazy = [i, r]), 1
  },
  od = function o(e) {
    var t = e.parent
    return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || o(t))
  },
  Yo = function (e) {
    var t = e.data
    return t === 'isFromStart' || t === 'isStart'
  },
  ad = function (e, t, n, r) {
    var i = e.ratio,
      s =
        t < 0 ||
        (!t &&
          ((!e._start && od(e) && !(!e._initted && Yo(e))) ||
            ((e._ts < 0 || e._dp._ts < 0) && !Yo(e))))
          ? 0
          : 1,
      a = e._rDelay,
      l = 0,
      u,
      c,
      h
    if (
      (a &&
        e._repeat &&
        ((l = Qi(0, e._tDur, t)),
        (c = Yr(l, a)),
        e._yoyo && c & 1 && (s = 1 - s),
        c !== Yr(e._tTime, a) &&
          ((i = 1 - s), e.vars.repeatRefresh && e._initted && e.invalidate())),
      s !== i || tt || r || e._zTime === ut || (!t && e._zTime))
    ) {
      if (!e._initted && ec(e, t, r, n, l)) return
      for (
        h = e._zTime,
          e._zTime = t || (n ? ut : 0),
          n || (n = t && !h),
          e.ratio = s,
          e._from && (s = 1 - s),
          e._time = 0,
          e._tTime = l,
          u = e._pt;
        u;

      )
        u.r(s, u.d), (u = u._next)
      t < 0 && qo(e, t, n, !0),
        e._onUpdate && !n && Ot(e, 'onUpdate'),
        l && e._repeat && !n && e.parent && Ot(e, 'onRepeat'),
        (t >= e._tDur || t < 0) &&
          e.ratio === s &&
          (s && Bn(e, 1),
          !n &&
            !tt &&
            (Ot(e, s ? 'onComplete' : 'onReverseComplete', !0),
            e._prom && e._prom()))
    } else e._zTime || (e._zTime = t)
  },
  ld = function (e, t, n) {
    var r
    if (n > t)
      for (r = e._first; r && r._start <= n; ) {
        if (r.data === 'isPause' && r._start > t) return r
        r = r._next
      }
    else
      for (r = e._last; r && r._start >= n; ) {
        if (r.data === 'isPause' && r._start < t) return r
        r = r._prev
      }
  },
  Wr = function (e, t, n, r) {
    var i = e._repeat,
      s = Ne(t) || 0,
      a = e._tTime / e._tDur
    return (
      a && !r && (e._time *= s / e._dur),
      (e._dur = s),
      (e._tDur = i ? (i < 0 ? 1e10 : Ne(s * (i + 1) + e._rDelay * i)) : s),
      a > 0 && !r && ao(e, (e._tTime = e._tDur * a)),
      e.parent && oo(e),
      n || lr(e.parent, e),
      e
    )
  },
  gl = function (e) {
    return e instanceof mt ? lr(e) : Wr(e, e._dur)
  },
  ud = { _start: 0, endTime: Ii, totalDuration: Ii },
  Nt = function o(e, t, n) {
    var r = e.labels,
      i = e._recent || ud,
      s = e.duration() >= un ? i.endTime(!1) : e._dur,
      a,
      l,
      u
    return Ge(t) && (isNaN(t) || t in r)
      ? ((l = t.charAt(0)),
        (u = t.substr(-1) === '%'),
        (a = t.indexOf('=')),
        l === '<' || l === '>'
          ? (a >= 0 && (t = t.replace(/=/, '')),
            (l === '<' ? i._start : i.endTime(i._repeat >= 0)) +
              (parseFloat(t.substr(1)) || 0) *
                (u ? (a < 0 ? i : n).totalDuration() / 100 : 1))
          : a < 0
            ? (t in r || (r[t] = s), r[t])
            : ((l = parseFloat(t.charAt(a - 1) + t.substr(a + 1))),
              u && n && (l = (l / 100) * (ct(n) ? n[0] : n).totalDuration()),
              a > 1 ? o(e, t.substr(0, a - 1), n) + l : s + l))
      : t == null
        ? s
        : +t
  },
  xi = function (e, t, n) {
    var r = Cn(t[1]),
      i = (r ? 2 : 1) + (e < 2 ? 0 : 1),
      s = t[i],
      a,
      l
    if ((r && (s.duration = t[1]), (s.parent = n), e)) {
      for (a = s, l = n; l && !('immediateRender' in a); )
        (a = l.vars.defaults || {}), (l = vt(l.vars.inherit) && l.parent)
      ;(s.immediateRender = vt(a.immediateRender)),
        e < 2 ? (s.runBackwards = 1) : (s.startAt = t[i - 1])
    }
    return new Ie(t[0], s, t[i + 1])
  },
  Vn = function (e, t) {
    return e || e === 0 ? t(e) : t
  },
  Qi = function (e, t, n) {
    return n < e ? e : n > t ? t : n
  },
  at = function (e, t) {
    return !Ge(e) || !(t = Zh.exec(e)) ? '' : t[1]
  },
  cd = function (e, t, n) {
    return Vn(n, function (r) {
      return Qi(e, t, r)
    })
  },
  Wo = [].slice,
  tc = function (e, t) {
    return (
      e &&
      hn(e) &&
      'length' in e &&
      ((!t && !e.length) || (e.length - 1 in e && hn(e[0]))) &&
      !e.nodeType &&
      e !== tn
    )
  },
  hd = function (e, t, n) {
    return (
      n === void 0 && (n = []),
      e.forEach(function (r) {
        var i
        return (Ge(r) && !t) || tc(r, 1)
          ? (i = n).push.apply(i, Ht(r))
          : n.push(r)
      }) || n
    )
  },
  Ht = function (e, t, n) {
    return ve && !t && ve.selector
      ? ve.selector(e)
      : Ge(e) && !n && (Uo || !Xr())
        ? Wo.call((t || La).querySelectorAll(e), 0)
        : ct(e)
          ? hd(e, n)
          : tc(e)
            ? Wo.call(e, 0)
            : e
              ? [e]
              : []
  },
  Xo = function (e) {
    return (
      (e = Ht(e)[0] || zi('Invalid scope') || {}),
      function (t) {
        var n = e.current || e.nativeElement || e
        return Ht(
          t,
          n.querySelectorAll
            ? n
            : n === e
              ? zi('Invalid scope') || La.createElement('div')
              : e
        )
      }
    )
  },
  nc = function (e) {
    return e.sort(function () {
      return 0.5 - Math.random()
    })
  },
  rc = function (e) {
    if (Te(e)) return e
    var t = hn(e) ? e : { each: e },
      n = ur(t.ease),
      r = t.from || 0,
      i = parseFloat(t.base) || 0,
      s = {},
      a = r > 0 && r < 1,
      l = isNaN(r) || a,
      u = t.axis,
      c = r,
      h = r
    return (
      Ge(r)
        ? (c = h = { center: 0.5, edges: 0.5, end: 1 }[r] || 0)
        : !a && l && ((c = r[0]), (h = r[1])),
      function (d, f, g) {
        var p = (g || t).length,
          m = s[p],
          _,
          D,
          C,
          v,
          w,
          E,
          x,
          $,
          T
        if (!m) {
          if (((T = t.grid === 'auto' ? 0 : (t.grid || [1, un])[1]), !T)) {
            for (
              x = -1e8;
              x < (x = g[T++].getBoundingClientRect().left) && T < p;

            );
            T < p && T--
          }
          for (
            m = s[p] = [],
              _ = l ? Math.min(T, p) * c - 0.5 : r % T,
              D = T === un ? 0 : l ? (p * h) / T - 0.5 : (r / T) | 0,
              x = 0,
              $ = un,
              E = 0;
            E < p;
            E++
          )
            (C = (E % T) - _),
              (v = D - ((E / T) | 0)),
              (m[E] = w = u ? Math.abs(u === 'y' ? v : C) : Iu(C * C + v * v)),
              w > x && (x = w),
              w < $ && ($ = w)
          r === 'random' && nc(m),
            (m.max = x - $),
            (m.min = $),
            (m.v = p =
              (parseFloat(t.amount) ||
                parseFloat(t.each) *
                  (T > p
                    ? p - 1
                    : u
                      ? u === 'y'
                        ? p / T
                        : T
                      : Math.max(T, p / T)) ||
                0) * (r === 'edges' ? -1 : 1)),
            (m.b = p < 0 ? i - p : i),
            (m.u = at(t.amount || t.each) || 0),
            (n = n && p < 0 ? fc(n) : n)
        }
        return (
          (p = (m[d] - m.min) / m.max || 0),
          Ne(m.b + (n ? n(p) : p) * m.v) + m.u
        )
      }
    )
  },
  Go = function (e) {
    var t = Math.pow(10, ((e + '').split('.')[1] || '').length)
    return function (n) {
      var r = Ne(Math.round(parseFloat(n) / e) * e * t)
      return (r - (r % 1)) / t + (Cn(n) ? 0 : at(n))
    }
  },
  ic = function (e, t) {
    var n = ct(e),
      r,
      i
    return (
      !n &&
        hn(e) &&
        ((r = n = e.radius || un),
        e.values
          ? ((e = Ht(e.values)), (i = !Cn(e[0])) && (r *= r))
          : (e = Go(e.increment))),
      Vn(
        t,
        n
          ? Te(e)
            ? function (s) {
                return (i = e(s)), Math.abs(i - s) <= r ? i : s
              }
            : function (s) {
                for (
                  var a = parseFloat(i ? s.x : s),
                    l = parseFloat(i ? s.y : 0),
                    u = un,
                    c = 0,
                    h = e.length,
                    d,
                    f;
                  h--;

                )
                  i
                    ? ((d = e[h].x - a), (f = e[h].y - l), (d = d * d + f * f))
                    : (d = Math.abs(e[h] - a)),
                    d < u && ((u = d), (c = h))
                return (
                  (c = !r || u <= r ? e[c] : s),
                  i || c === s || Cn(s) ? c : c + at(s)
                )
              }
          : Go(e)
      )
    )
  },
  sc = function (e, t, n, r) {
    return Vn(ct(e) ? !t : n === !0 ? !!(n = 0) : !r, function () {
      return ct(e)
        ? e[~~(Math.random() * e.length)]
        : (n = n || 1e-5) &&
            (r = n < 1 ? Math.pow(10, (n + '').length - 2) : 1) &&
            Math.floor(
              Math.round((e - n / 2 + Math.random() * (t - e + n * 0.99)) / n) *
                n *
                r
            ) / r
    })
  },
  dd = function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
    return function (r) {
      return t.reduce(function (i, s) {
        return s(i)
      }, r)
    }
  },
  fd = function (e, t) {
    return function (n) {
      return e(parseFloat(n)) + (t || at(n))
    }
  },
  pd = function (e, t, n) {
    return ac(e, t, 0, 1, n)
  },
  oc = function (e, t, n) {
    return Vn(n, function (r) {
      return e[~~t(r)]
    })
  },
  gd = function o(e, t, n) {
    var r = t - e
    return ct(e)
      ? oc(e, o(0, e.length), t)
      : Vn(n, function (i) {
          return ((r + ((i - e) % r)) % r) + e
        })
  },
  md = function o(e, t, n) {
    var r = t - e,
      i = r * 2
    return ct(e)
      ? oc(e, o(0, e.length - 1), t)
      : Vn(n, function (s) {
          return (s = (i + ((s - e) % i)) % i || 0), e + (s > r ? i - s : s)
        })
  },
  Ni = function (e) {
    for (var t = 0, n = '', r, i, s, a; ~(r = e.indexOf('random(', t)); )
      (s = e.indexOf(')', r)),
        (a = e.charAt(r + 7) === '['),
        (i = e.substr(r + 7, s - r - 7).match(a ? Hu : Ho)),
        (n +=
          e.substr(t, r - t) + sc(a ? i : +i[0], a ? 0 : +i[1], +i[2] || 1e-5)),
        (t = s + 1)
    return n + e.substr(t, e.length - t)
  },
  ac = function (e, t, n, r, i) {
    var s = t - e,
      a = r - n
    return Vn(i, function (l) {
      return n + (((l - e) / s) * a || 0)
    })
  },
  _d = function o(e, t, n, r) {
    var i = isNaN(e + t)
      ? 0
      : function (f) {
          return (1 - f) * e + f * t
        }
    if (!i) {
      var s = Ge(e),
        a = {},
        l,
        u,
        c,
        h,
        d
      if ((n === !0 && (r = 1) && (n = null), s)) (e = { p: e }), (t = { p: t })
      else if (ct(e) && !ct(t)) {
        for (c = [], h = e.length, d = h - 2, u = 1; u < h; u++)
          c.push(o(e[u - 1], e[u]))
        h--,
          (i = function (g) {
            g *= h
            var p = Math.min(d, ~~g)
            return c[p](g - p)
          }),
          (n = t)
      } else r || (e = qr(ct(e) ? [] : {}, e))
      if (!c) {
        for (l in t) ja.call(a, e, l, 'get', t[l])
        i = function (g) {
          return Va(g, a) || (s ? e.p : e)
        }
      }
    }
    return Vn(n, i)
  },
  ml = function (e, t, n) {
    var r = e.labels,
      i = un,
      s,
      a,
      l
    for (s in r)
      (a = r[s] - t),
        a < 0 == !!n && a && i > (a = Math.abs(a)) && ((l = s), (i = a))
    return l
  },
  Ot = function (e, t, n) {
    var r = e.vars,
      i = r[t],
      s = ve,
      a = e._ctx,
      l,
      u,
      c
    if (i)
      return (
        (l = r[t + 'Params']),
        (u = r.callbackScope || e),
        n && zn.length && Ns(),
        a && (ve = a),
        (c = l ? i.apply(u, l) : i.call(u)),
        (ve = s),
        c
      )
  },
  fi = function (e) {
    return (
      Bn(e),
      e.scrollTrigger && e.scrollTrigger.kill(!!tt),
      e.progress() < 1 && Ot(e, 'onInterrupt'),
      e
    )
  },
  Rr,
  lc = [],
  uc = function (e) {
    if (e)
      if (((e = (!e.name && e.default) || e), Oa() || e.headless)) {
        var t = e.name,
          n = Te(e),
          r =
            t && !n && e.init
              ? function () {
                  this._props = []
                }
              : e,
          i = {
            init: Ii,
            render: Va,
            add: ja,
            kill: Od,
            modifier: Ad,
            rawVars: 0,
          },
          s = { targetTest: 0, get: 0, getSetter: Ua, aliases: {}, register: 0 }
        if ((Xr(), e !== r)) {
          if ($t[t]) return
          Rt(r, Rt(js(e, i), s)),
            qr(r.prototype, qr(i, js(e, s))),
            ($t[(r.prop = t)] = r),
            e.targetTest && (Es.push(r), (Ra[t] = 1)),
            (t =
              (t === 'css' ? 'CSS' : t.charAt(0).toUpperCase() + t.substr(1)) +
              'Plugin')
        }
        qu(t, r), e.register && e.register(wt, r, bt)
      } else lc.push(e)
  },
  pe = 255,
  pi = {
    aqua: [0, pe, pe],
    lime: [0, pe, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, pe],
    navy: [0, 0, 128],
    white: [pe, pe, pe],
    olive: [128, 128, 0],
    yellow: [pe, pe, 0],
    orange: [pe, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [pe, 0, 0],
    pink: [pe, 192, 203],
    cyan: [0, pe, pe],
    transparent: [pe, pe, pe, 0],
  },
  yo = function (e, t, n) {
    return (
      (e += e < 0 ? 1 : e > 1 ? -1 : 0),
      ((e * 6 < 1
        ? t + (n - t) * e * 6
        : e < 0.5
          ? n
          : e * 3 < 2
            ? t + (n - t) * (2 / 3 - e) * 6
            : t) *
        pe +
        0.5) |
        0
    )
  },
  cc = function (e, t, n) {
    var r = e ? (Cn(e) ? [e >> 16, (e >> 8) & pe, e & pe] : 0) : pi.black,
      i,
      s,
      a,
      l,
      u,
      c,
      h,
      d,
      f,
      g
    if (!r) {
      if ((e.substr(-1) === ',' && (e = e.substr(0, e.length - 1)), pi[e]))
        r = pi[e]
      else if (e.charAt(0) === '#') {
        if (
          (e.length < 6 &&
            ((i = e.charAt(1)),
            (s = e.charAt(2)),
            (a = e.charAt(3)),
            (e =
              '#' +
              i +
              i +
              s +
              s +
              a +
              a +
              (e.length === 5 ? e.charAt(4) + e.charAt(4) : ''))),
          e.length === 9)
        )
          return (
            (r = parseInt(e.substr(1, 6), 16)),
            [r >> 16, (r >> 8) & pe, r & pe, parseInt(e.substr(7), 16) / 255]
          )
        ;(e = parseInt(e.substr(1), 16)), (r = [e >> 16, (e >> 8) & pe, e & pe])
      } else if (e.substr(0, 3) === 'hsl') {
        if (((r = g = e.match(Ho)), !t))
          (l = (+r[0] % 360) / 360),
            (u = +r[1] / 100),
            (c = +r[2] / 100),
            (s = c <= 0.5 ? c * (u + 1) : c + u - c * u),
            (i = c * 2 - s),
            r.length > 3 && (r[3] *= 1),
            (r[0] = yo(l + 1 / 3, i, s)),
            (r[1] = yo(l, i, s)),
            (r[2] = yo(l - 1 / 3, i, s))
        else if (~e.indexOf('='))
          return (r = e.match(ju)), n && r.length < 4 && (r[3] = 1), r
      } else r = e.match(Ho) || pi.transparent
      r = r.map(Number)
    }
    return (
      t &&
        !g &&
        ((i = r[0] / pe),
        (s = r[1] / pe),
        (a = r[2] / pe),
        (h = Math.max(i, s, a)),
        (d = Math.min(i, s, a)),
        (c = (h + d) / 2),
        h === d
          ? (l = u = 0)
          : ((f = h - d),
            (u = c > 0.5 ? f / (2 - h - d) : f / (h + d)),
            (l =
              h === i
                ? (s - a) / f + (s < a ? 6 : 0)
                : h === s
                  ? (a - i) / f + 2
                  : (i - s) / f + 4),
            (l *= 60)),
        (r[0] = ~~(l + 0.5)),
        (r[1] = ~~(u * 100 + 0.5)),
        (r[2] = ~~(c * 100 + 0.5))),
      n && r.length < 4 && (r[3] = 1),
      r
    )
  },
  hc = function (e) {
    var t = [],
      n = [],
      r = -1
    return (
      e.split(In).forEach(function (i) {
        var s = i.match(Mr) || []
        t.push.apply(t, s), n.push((r += s.length + 1))
      }),
      (t.c = n),
      t
    )
  },
  _l = function (e, t, n) {
    var r = '',
      i = (e + r).match(In),
      s = t ? 'hsla(' : 'rgba(',
      a = 0,
      l,
      u,
      c,
      h
    if (!i) return e
    if (
      ((i = i.map(function (d) {
        return (
          (d = cc(d, t, 1)) &&
          s +
            (t ? d[0] + ',' + d[1] + '%,' + d[2] + '%,' + d[3] : d.join(',')) +
            ')'
        )
      })),
      n && ((c = hc(e)), (l = n.c), l.join(r) !== c.c.join(r)))
    )
      for (u = e.replace(In, '1').split(Mr), h = u.length - 1; a < h; a++)
        r +=
          u[a] +
          (~l.indexOf(a)
            ? i.shift() || s + '0,0,0,0)'
            : (c.length ? c : i.length ? i : n).shift())
    if (!u) for (u = e.split(In), h = u.length - 1; a < h; a++) r += u[a] + i[a]
    return r + u[h]
  },
  In = (function () {
    var o =
        '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b',
      e
    for (e in pi) o += '|' + e + '\\b'
    return new RegExp(o + ')', 'gi')
  })(),
  Dd = /hsl[a]?\(/,
  dc = function (e) {
    var t = e.join(' '),
      n
    if (((In.lastIndex = 0), In.test(t)))
      return (
        (n = Dd.test(t)),
        (e[1] = _l(e[1], n)),
        (e[0] = _l(e[0], n, hc(e[1]))),
        !0
      )
  },
  ji,
  Ft = (function () {
    var o = Date.now,
      e = 500,
      t = 33,
      n = o(),
      r = n,
      i = 1e3 / 240,
      s = i,
      a = [],
      l,
      u,
      c,
      h,
      d,
      f,
      g = function p(m) {
        var _ = o() - r,
          D = m === !0,
          C,
          v,
          w,
          E
        if (
          ((_ > e || _ < 0) && (n += _ - t),
          (r += _),
          (w = r - n),
          (C = w - s),
          (C > 0 || D) &&
            ((E = ++h.frame),
            (d = w - h.time * 1e3),
            (h.time = w = w / 1e3),
            (s += C + (C >= i ? 4 : i - C)),
            (v = 1)),
          D || (l = u(p)),
          v)
        )
          for (f = 0; f < a.length; f++) a[f](w, d, E, m)
      }
    return (
      (h = {
        time: 0,
        frame: 0,
        tick: function () {
          g(!0)
        },
        deltaRatio: function (m) {
          return d / (1e3 / (m || 60))
        },
        wake: function () {
          Uu &&
            (!Uo &&
              Oa() &&
              ((tn = Uo = window),
              (La = tn.document || {}),
              (Mt.gsap = wt),
              (tn.gsapVersions || (tn.gsapVersions = [])).push(wt.version),
              Vu(Is || tn.GreenSockGlobals || (!tn.gsap && tn) || {}),
              lc.forEach(uc)),
            (c = typeof requestAnimationFrame < 'u' && requestAnimationFrame),
            l && h.sleep(),
            (u =
              c ||
              function (m) {
                return setTimeout(m, (s - h.time * 1e3 + 1) | 0)
              }),
            (ji = 1),
            g(2))
        },
        sleep: function () {
          ;(c ? cancelAnimationFrame : clearTimeout)(l), (ji = 0), (u = Ii)
        },
        lagSmoothing: function (m, _) {
          ;(e = m || 1 / 0), (t = Math.min(_ || 33, e))
        },
        fps: function (m) {
          ;(i = 1e3 / (m || 240)), (s = h.time * 1e3 + i)
        },
        add: function (m, _, D) {
          var C = _
            ? function (v, w, E, x) {
                m(v, w, E, x), h.remove(C)
              }
            : m
          return h.remove(m), a[D ? 'unshift' : 'push'](C), Xr(), C
        },
        remove: function (m, _) {
          ~(_ = a.indexOf(m)) && a.splice(_, 1) && f >= _ && f--
        },
        _listeners: a,
      }),
      h
    )
  })(),
  Xr = function () {
    return !ji && Ft.wake()
  },
  ne = {},
  yd = /^[\d.\-M][\d.\-,\s]/,
  vd = /["']/g,
  xd = function (e) {
    for (
      var t = {},
        n = e.substr(1, e.length - 3).split(':'),
        r = n[0],
        i = 1,
        s = n.length,
        a,
        l,
        u;
      i < s;
      i++
    )
      (l = n[i]),
        (a = i !== s - 1 ? l.lastIndexOf(',') : l.length),
        (u = l.substr(0, a)),
        (t[r] = isNaN(u) ? u.replace(vd, '').trim() : +u),
        (r = l.substr(a + 1).trim())
    return t
  },
  bd = function (e) {
    var t = e.indexOf('(') + 1,
      n = e.indexOf(')'),
      r = e.indexOf('(', t)
    return e.substring(t, ~r && r < n ? e.indexOf(')', n + 1) : n)
  },
  Cd = function (e) {
    var t = (e + '').split('('),
      n = ne[t[0]]
    return n && t.length > 1 && n.config
      ? n.config.apply(
          null,
          ~e.indexOf('{') ? [xd(t[1])] : bd(e).split(',').map(Gu)
        )
      : ne._CE && yd.test(e)
        ? ne._CE('', e)
        : n
  },
  fc = function (e) {
    return function (t) {
      return 1 - e(1 - t)
    }
  },
  pc = function o(e, t) {
    for (var n = e._first, r; n; )
      n instanceof mt
        ? o(n, t)
        : n.vars.yoyoEase &&
          (!n._yoyo || !n._repeat) &&
          n._yoyo !== t &&
          (n.timeline
            ? o(n.timeline, t)
            : ((r = n._ease),
              (n._ease = n._yEase),
              (n._yEase = r),
              (n._yoyo = t))),
        (n = n._next)
  },
  ur = function (e, t) {
    return (e && (Te(e) ? e : ne[e] || Cd(e))) || t
  },
  xr = function (e, t, n, r) {
    n === void 0 &&
      (n = function (l) {
        return 1 - t(1 - l)
      }),
      r === void 0 &&
        (r = function (l) {
          return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2
        })
    var i = { easeIn: t, easeOut: n, easeInOut: r },
      s
    return (
      xt(e, function (a) {
        ;(ne[a] = Mt[a] = i), (ne[(s = a.toLowerCase())] = n)
        for (var l in i)
          ne[
            s + (l === 'easeIn' ? '.in' : l === 'easeOut' ? '.out' : '.inOut')
          ] = ne[a + '.' + l] = i[l]
      }),
      i
    )
  },
  gc = function (e) {
    return function (t) {
      return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2
    }
  },
  vo = function o(e, t, n) {
    var r = t >= 1 ? t : 1,
      i = (n || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1),
      s = (i / Bo) * (Math.asin(1 / r) || 0),
      a = function (c) {
        return c === 1 ? 1 : r * Math.pow(2, -10 * c) * Jh((c - s) * i) + 1
      },
      l =
        e === 'out'
          ? a
          : e === 'in'
            ? function (u) {
                return 1 - a(1 - u)
              }
            : gc(a)
    return (
      (i = Bo / i),
      (l.config = function (u, c) {
        return o(e, u, c)
      }),
      l
    )
  },
  xo = function o(e, t) {
    t === void 0 && (t = 1.70158)
    var n = function (s) {
        return s ? --s * s * ((t + 1) * s + t) + 1 : 0
      },
      r =
        e === 'out'
          ? n
          : e === 'in'
            ? function (i) {
                return 1 - n(1 - i)
              }
            : gc(n)
    return (
      (r.config = function (i) {
        return o(e, i)
      }),
      r
    )
  }
xt('Linear,Quad,Cubic,Quart,Quint,Strong', function (o, e) {
  var t = e < 5 ? e + 1 : e
  xr(
    o + ',Power' + (t - 1),
    e
      ? function (n) {
          return Math.pow(n, t)
        }
      : function (n) {
          return n
        },
    function (n) {
      return 1 - Math.pow(1 - n, t)
    },
    function (n) {
      return n < 0.5 ? Math.pow(n * 2, t) / 2 : 1 - Math.pow((1 - n) * 2, t) / 2
    }
  )
})
ne.Linear.easeNone = ne.none = ne.Linear.easeIn
xr('Elastic', vo('in'), vo('out'), vo())
;(function (o, e) {
  var t = 1 / e,
    n = 2 * t,
    r = 2.5 * t,
    i = function (a) {
      return a < t
        ? o * a * a
        : a < n
          ? o * Math.pow(a - 1.5 / e, 2) + 0.75
          : a < r
            ? o * (a -= 2.25 / e) * a + 0.9375
            : o * Math.pow(a - 2.625 / e, 2) + 0.984375
    }
  xr(
    'Bounce',
    function (s) {
      return 1 - i(1 - s)
    },
    i
  )
})(7.5625, 2.75)
xr('Expo', function (o) {
  return Math.pow(2, 10 * (o - 1)) * o + o * o * o * o * o * o * (1 - o)
})
xr('Circ', function (o) {
  return -(Iu(1 - o * o) - 1)
})
xr('Sine', function (o) {
  return o === 1 ? 1 : -Kh(o * Xh) + 1
})
xr('Back', xo('in'), xo('out'), xo())
ne.SteppedEase =
  ne.steps =
  Mt.SteppedEase =
    {
      config: function (e, t) {
        e === void 0 && (e = 1)
        var n = 1 / e,
          r = e + (t ? 0 : 1),
          i = t ? 1 : 0,
          s = 1 - ut
        return function (a) {
          return (((r * Qi(0, s, a)) | 0) + i) * n
        }
      },
    }
Vr.ease = ne['quad.out']
xt(
  'onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt',
  function (o) {
    return (za += o + ',' + o + 'Params,')
  }
)
var mc = function (e, t) {
    ;(this.id = Gh++),
      (e._gsap = this),
      (this.target = e),
      (this.harness = t),
      (this.get = t ? t.get : Wu),
      (this.set = t ? t.getSetter : Ua)
  },
  Bi = (function () {
    function o(t) {
      ;(this.vars = t),
        (this._delay = +t.delay || 0),
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
          ((this._rDelay = t.repeatDelay || 0),
          (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
        (this._ts = 1),
        Wr(this, +t.duration, 1, 1),
        (this.data = t.data),
        ve && ((this._ctx = ve), ve.data.push(this)),
        ji || Ft.wake()
    }
    var e = o.prototype
    return (
      (e.delay = function (n) {
        return n || n === 0
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + n - this._delay),
            (this._delay = n),
            this)
          : this._delay
      }),
      (e.duration = function (n) {
        return arguments.length
          ? this.totalDuration(
              this._repeat > 0 ? n + (n + this._rDelay) * this._repeat : n
            )
          : this.totalDuration() && this._dur
      }),
      (e.totalDuration = function (n) {
        return arguments.length
          ? ((this._dirty = 0),
            Wr(
              this,
              this._repeat < 0
                ? n
                : (n - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur
      }),
      (e.totalTime = function (n, r) {
        if ((Xr(), !arguments.length)) return this._tTime
        var i = this._dp
        if (i && i.smoothChildTiming && this._ts) {
          for (ao(this, n), !i._dp || i.parent || Zu(i, this); i && i.parent; )
            i.parent._time !==
              i._start +
                (i._ts >= 0
                  ? i._tTime / i._ts
                  : (i.totalDuration() - i._tTime) / -i._ts) &&
              i.totalTime(i._tTime, !0),
              (i = i.parent)
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((this._ts > 0 && n < this._tDur) ||
              (this._ts < 0 && n > 0) ||
              (!this._tDur && !n)) &&
            rn(this._dp, this, this._start - this._delay)
        }
        return (
          (this._tTime !== n ||
            (!this._dur && !r) ||
            (this._initted && Math.abs(this._zTime) === ut) ||
            (!n && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = n), Xu(this, n, r)),
          this
        )
      }),
      (e.time = function (n, r) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), n + pl(this)) %
                (this._dur + this._rDelay) || (n ? this._dur : 0),
              r
            )
          : this._time
      }),
      (e.totalProgress = function (n, r) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * n, r)
          : this.totalDuration()
            ? Math.min(1, this._tTime / this._tDur)
            : this.rawTime() >= 0 && this._initted
              ? 1
              : 0
      }),
      (e.progress = function (n, r) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (this._yoyo && !(this.iteration() & 1) ? 1 - n : n) +
                pl(this),
              r
            )
          : this.duration()
            ? Math.min(1, this._time / this._dur)
            : this.rawTime() > 0
              ? 1
              : 0
      }),
      (e.iteration = function (n, r) {
        var i = this.duration() + this._rDelay
        return arguments.length
          ? this.totalTime(this._time + (n - 1) * i, r)
          : this._repeat
            ? Yr(this._tTime, i) + 1
            : 1
      }),
      (e.timeScale = function (n, r) {
        if (!arguments.length) return this._rts === -1e-8 ? 0 : this._rts
        if (this._rts === n) return this
        var i =
          this.parent && this._ts ? Bs(this.parent._time, this) : this._tTime
        return (
          (this._rts = +n || 0),
          (this._ts = this._ps || n === -1e-8 ? 0 : this._rts),
          this.totalTime(
            Qi(-Math.abs(this._delay), this.totalDuration(), i),
            r !== !1
          ),
          oo(this),
          id(this)
        )
      }),
      (e.paused = function (n) {
        return arguments.length
          ? (this._ps !== n &&
              ((this._ps = n),
              n
                ? ((this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (Xr(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    this.progress() === 1 &&
                      Math.abs(this._zTime) !== ut &&
                      (this._tTime -= ut)
                  ))),
            this)
          : this._ps
      }),
      (e.startTime = function (n) {
        if (arguments.length) {
          this._start = n
          var r = this.parent || this._dp
          return (
            r && (r._sort || !this.parent) && rn(r, this, n - this._delay), this
          )
        }
        return this._start
      }),
      (e.endTime = function (n) {
        return (
          this._start +
          (vt(n) ? this.totalDuration() : this.duration()) /
            Math.abs(this._ts || 1)
        )
      }),
      (e.rawTime = function (n) {
        var r = this.parent || this._dp
        return r
          ? n &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
              ? Bs(r.rawTime(n), this)
              : this._tTime
          : this._tTime
      }),
      (e.revert = function (n) {
        n === void 0 && (n = ed)
        var r = tt
        return (
          (tt = n),
          Na(this) &&
            (this.timeline && this.timeline.revert(n),
            this.totalTime(-0.01, n.suppressEvents)),
          this.data !== 'nested' && n.kill !== !1 && this.kill(),
          (tt = r),
          this
        )
      }),
      (e.globalTime = function (n) {
        for (var r = this, i = arguments.length ? n : r.rawTime(); r; )
          (i = r._start + i / (Math.abs(r._ts) || 1)), (r = r._dp)
        return !this.parent && this._sat ? this._sat.globalTime(n) : i
      }),
      (e.repeat = function (n) {
        return arguments.length
          ? ((this._repeat = n === 1 / 0 ? -2 : n), gl(this))
          : this._repeat === -2
            ? 1 / 0
            : this._repeat
      }),
      (e.repeatDelay = function (n) {
        if (arguments.length) {
          var r = this._time
          return (this._rDelay = n), gl(this), r ? this.time(r) : this
        }
        return this._rDelay
      }),
      (e.yoyo = function (n) {
        return arguments.length ? ((this._yoyo = n), this) : this._yoyo
      }),
      (e.seek = function (n, r) {
        return this.totalTime(Nt(this, n), vt(r))
      }),
      (e.restart = function (n, r) {
        return (
          this.play().totalTime(n ? -this._delay : 0, vt(r)),
          this._dur || (this._zTime = -1e-8),
          this
        )
      }),
      (e.play = function (n, r) {
        return n != null && this.seek(n, r), this.reversed(!1).paused(!1)
      }),
      (e.reverse = function (n, r) {
        return (
          n != null && this.seek(n || this.totalDuration(), r),
          this.reversed(!0).paused(!1)
        )
      }),
      (e.pause = function (n, r) {
        return n != null && this.seek(n, r), this.paused(!0)
      }),
      (e.resume = function () {
        return this.paused(!1)
      }),
      (e.reversed = function (n) {
        return arguments.length
          ? (!!n !== this.reversed() &&
              this.timeScale(-this._rts || (n ? -1e-8 : 0)),
            this)
          : this._rts < 0
      }),
      (e.invalidate = function () {
        return (this._initted = this._act = 0), (this._zTime = -1e-8), this
      }),
      (e.isActive = function () {
        var n = this.parent || this._dp,
          r = this._start,
          i
        return !!(
          !n ||
          (this._ts &&
            this._initted &&
            n.isActive() &&
            (i = n.rawTime(!0)) >= r &&
            i < this.endTime(!0) - ut)
        )
      }),
      (e.eventCallback = function (n, r, i) {
        var s = this.vars
        return arguments.length > 1
          ? (r
              ? ((s[n] = r),
                i && (s[n + 'Params'] = i),
                n === 'onUpdate' && (this._onUpdate = r))
              : delete s[n],
            this)
          : s[n]
      }),
      (e.then = function (n) {
        var r = this
        return new Promise(function (i) {
          var s = Te(n) ? n : Ku,
            a = function () {
              var u = r.then
              ;(r.then = null),
                Te(s) && (s = s(r)) && (s.then || s === r) && (r.then = u),
                i(s),
                (r.then = u)
            }
          ;(r._initted && r.totalProgress() === 1 && r._ts >= 0) ||
          (!r._tTime && r._ts < 0)
            ? a()
            : (r._prom = a)
        })
      }),
      (e.kill = function () {
        fi(this)
      }),
      o
    )
  })()
Rt(Bi.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -1e-8,
  _prom: 0,
  _ps: !1,
  _rts: 1,
})
var mt = (function (o) {
  zu(e, o)
  function e(n, r) {
    var i
    return (
      n === void 0 && (n = {}),
      (i = o.call(this, n) || this),
      (i.labels = {}),
      (i.smoothChildTiming = !!n.smoothChildTiming),
      (i.autoRemoveChildren = !!n.autoRemoveChildren),
      (i._sort = vt(n.sortChildren)),
      Ce && rn(n.parent || Ce, _n(i), r),
      n.reversed && i.reverse(),
      n.paused && i.paused(!0),
      n.scrollTrigger && Qu(_n(i), n.scrollTrigger),
      i
    )
  }
  var t = e.prototype
  return (
    (t.to = function (r, i, s) {
      return xi(0, arguments, this), this
    }),
    (t.from = function (r, i, s) {
      return xi(1, arguments, this), this
    }),
    (t.fromTo = function (r, i, s, a) {
      return xi(2, arguments, this), this
    }),
    (t.set = function (r, i, s) {
      return (
        (i.duration = 0),
        (i.parent = this),
        vi(i).repeatDelay || (i.repeat = 0),
        (i.immediateRender = !!i.immediateRender),
        new Ie(r, i, Nt(this, s), 1),
        this
      )
    }),
    (t.call = function (r, i, s) {
      return rn(this, Ie.delayedCall(0, r, i), s)
    }),
    (t.staggerTo = function (r, i, s, a, l, u, c) {
      return (
        (s.duration = i),
        (s.stagger = s.stagger || a),
        (s.onComplete = u),
        (s.onCompleteParams = c),
        (s.parent = this),
        new Ie(r, s, Nt(this, l)),
        this
      )
    }),
    (t.staggerFrom = function (r, i, s, a, l, u, c) {
      return (
        (s.runBackwards = 1),
        (vi(s).immediateRender = vt(s.immediateRender)),
        this.staggerTo(r, i, s, a, l, u, c)
      )
    }),
    (t.staggerFromTo = function (r, i, s, a, l, u, c, h) {
      return (
        (a.startAt = s),
        (vi(a).immediateRender = vt(a.immediateRender)),
        this.staggerTo(r, i, a, l, u, c, h)
      )
    }),
    (t.render = function (r, i, s) {
      var a = this._time,
        l = this._dirty ? this.totalDuration() : this._tDur,
        u = this._dur,
        c = r <= 0 ? 0 : Ne(r),
        h = this._zTime < 0 != r < 0 && (this._initted || !u),
        d,
        f,
        g,
        p,
        m,
        _,
        D,
        C,
        v,
        w,
        E,
        x
      if (
        (this !== Ce && c > l && r >= 0 && (c = l), c !== this._tTime || s || h)
      ) {
        if (
          (a !== this._time &&
            u &&
            ((c += this._time - a), (r += this._time - a)),
          (d = c),
          (v = this._start),
          (C = this._ts),
          (_ = !C),
          h && (u || (a = this._zTime), (r || !i) && (this._zTime = r)),
          this._repeat)
        ) {
          if (
            ((E = this._yoyo),
            (m = u + this._rDelay),
            this._repeat < -1 && r < 0)
          )
            return this.totalTime(m * 100 + r, i, s)
          if (
            ((d = Ne(c % m)),
            c === l
              ? ((p = this._repeat), (d = u))
              : ((w = Ne(c / m)),
                (p = ~~w),
                p && p === w && ((d = u), p--),
                d > u && (d = u)),
            (w = Yr(this._tTime, m)),
            !a &&
              this._tTime &&
              w !== p &&
              this._tTime - w * m - this._dur <= 0 &&
              (w = p),
            E && p & 1 && ((d = u - d), (x = 1)),
            p !== w && !this._lock)
          ) {
            var $ = E && w & 1,
              T = $ === (E && p & 1)
            if (
              (p < w && ($ = !$),
              (a = $ ? 0 : c % u ? u : c),
              (this._lock = 1),
              (this.render(a || (x ? 0 : Ne(p * m)), i, !u)._lock = 0),
              (this._tTime = c),
              !i && this.parent && Ot(this, 'onRepeat'),
              this.vars.repeatRefresh && !x && (this.invalidate()._lock = 1),
              (a && a !== this._time) ||
                _ !== !this._ts ||
                (this.vars.onRepeat && !this.parent && !this._act))
            )
              return this
            if (
              ((u = this._dur),
              (l = this._tDur),
              T &&
                ((this._lock = 2),
                (a = $ ? u : -1e-4),
                this.render(a, !0),
                this.vars.repeatRefresh && !x && this.invalidate()),
              (this._lock = 0),
              !this._ts && !_)
            )
              return this
            pc(this, x)
          }
        }
        if (
          (this._hasPause &&
            !this._forcing &&
            this._lock < 2 &&
            ((D = ld(this, Ne(a), Ne(d))), D && (c -= d - (d = D._start))),
          (this._tTime = c),
          (this._time = d),
          (this._act = !C),
          this._initted ||
            ((this._onUpdate = this.vars.onUpdate),
            (this._initted = 1),
            (this._zTime = r),
            (a = 0)),
          !a && c && !i && !w && (Ot(this, 'onStart'), this._tTime !== c))
        )
          return this
        if (d >= a && r >= 0)
          for (f = this._first; f; ) {
            if (
              ((g = f._next), (f._act || d >= f._start) && f._ts && D !== f)
            ) {
              if (f.parent !== this) return this.render(r, i, s)
              if (
                (f.render(
                  f._ts > 0
                    ? (d - f._start) * f._ts
                    : (f._dirty ? f.totalDuration() : f._tDur) +
                        (d - f._start) * f._ts,
                  i,
                  s
                ),
                d !== this._time || (!this._ts && !_))
              ) {
                ;(D = 0), g && (c += this._zTime = -1e-8)
                break
              }
            }
            f = g
          }
        else {
          f = this._last
          for (var k = r < 0 ? r : d; f; ) {
            if (((g = f._prev), (f._act || k <= f._end) && f._ts && D !== f)) {
              if (f.parent !== this) return this.render(r, i, s)
              if (
                (f.render(
                  f._ts > 0
                    ? (k - f._start) * f._ts
                    : (f._dirty ? f.totalDuration() : f._tDur) +
                        (k - f._start) * f._ts,
                  i,
                  s || (tt && Na(f))
                ),
                d !== this._time || (!this._ts && !_))
              ) {
                ;(D = 0), g && (c += this._zTime = k ? -1e-8 : ut)
                break
              }
            }
            f = g
          }
        }
        if (
          D &&
          !i &&
          (this.pause(),
          (D.render(d >= a ? 0 : -1e-8)._zTime = d >= a ? 1 : -1),
          this._ts)
        )
          return (this._start = v), oo(this), this.render(r, i, s)
        this._onUpdate && !i && Ot(this, 'onUpdate', !0),
          ((c === l && this._tTime >= this.totalDuration()) || (!c && a)) &&
            (v === this._start || Math.abs(C) !== Math.abs(this._ts)) &&
            (this._lock ||
              ((r || !u) &&
                ((c === l && this._ts > 0) || (!c && this._ts < 0)) &&
                Bn(this, 1),
              !i &&
                !(r < 0 && !a) &&
                (c || a || !l) &&
                (Ot(
                  this,
                  c === l && r >= 0 ? 'onComplete' : 'onReverseComplete',
                  !0
                ),
                this._prom &&
                  !(c < l && this.timeScale() > 0) &&
                  this._prom())))
      }
      return this
    }),
    (t.add = function (r, i) {
      var s = this
      if ((Cn(i) || (i = Nt(this, i, r)), !(r instanceof Bi))) {
        if (ct(r))
          return (
            r.forEach(function (a) {
              return s.add(a, i)
            }),
            this
          )
        if (Ge(r)) return this.addLabel(r, i)
        if (Te(r)) r = Ie.delayedCall(0, r)
        else return this
      }
      return this !== r ? rn(this, r, i) : this
    }),
    (t.getChildren = function (r, i, s, a) {
      r === void 0 && (r = !0),
        i === void 0 && (i = !0),
        s === void 0 && (s = !0),
        a === void 0 && (a = -1e8)
      for (var l = [], u = this._first; u; )
        u._start >= a &&
          (u instanceof Ie
            ? i && l.push(u)
            : (s && l.push(u), r && l.push.apply(l, u.getChildren(!0, i, s)))),
          (u = u._next)
      return l
    }),
    (t.getById = function (r) {
      for (var i = this.getChildren(1, 1, 1), s = i.length; s--; )
        if (i[s].vars.id === r) return i[s]
    }),
    (t.remove = function (r) {
      return Ge(r)
        ? this.removeLabel(r)
        : Te(r)
          ? this.killTweensOf(r)
          : (r.parent === this && so(this, r),
            r === this._recent && (this._recent = this._last),
            lr(this))
    }),
    (t.totalTime = function (r, i) {
      return arguments.length
        ? ((this._forcing = 1),
          !this._dp &&
            this._ts &&
            (this._start = Ne(
              Ft.time -
                (this._ts > 0
                  ? r / this._ts
                  : (this.totalDuration() - r) / -this._ts)
            )),
          o.prototype.totalTime.call(this, r, i),
          (this._forcing = 0),
          this)
        : this._tTime
    }),
    (t.addLabel = function (r, i) {
      return (this.labels[r] = Nt(this, i)), this
    }),
    (t.removeLabel = function (r) {
      return delete this.labels[r], this
    }),
    (t.addPause = function (r, i, s) {
      var a = Ie.delayedCall(0, i || Ii, s)
      return (
        (a.data = 'isPause'), (this._hasPause = 1), rn(this, a, Nt(this, r))
      )
    }),
    (t.removePause = function (r) {
      var i = this._first
      for (r = Nt(this, r); i; )
        i._start === r && i.data === 'isPause' && Bn(i), (i = i._next)
    }),
    (t.killTweensOf = function (r, i, s) {
      for (var a = this.getTweensOf(r, s), l = a.length; l--; )
        An !== a[l] && a[l].kill(r, i)
      return this
    }),
    (t.getTweensOf = function (r, i) {
      for (var s = [], a = Ht(r), l = this._first, u = Cn(i), c; l; )
        l instanceof Ie
          ? td(l._targets, a) &&
            (u
              ? (!An || (l._initted && l._ts)) &&
                l.globalTime(0) <= i &&
                l.globalTime(l.totalDuration()) > i
              : !i || l.isActive()) &&
            s.push(l)
          : (c = l.getTweensOf(a, i)).length && s.push.apply(s, c),
          (l = l._next)
      return s
    }),
    (t.tweenTo = function (r, i) {
      i = i || {}
      var s = this,
        a = Nt(s, r),
        l = i,
        u = l.startAt,
        c = l.onStart,
        h = l.onStartParams,
        d = l.immediateRender,
        f,
        g = Ie.to(
          s,
          Rt(
            {
              ease: i.ease || 'none',
              lazy: !1,
              immediateRender: !1,
              time: a,
              overwrite: 'auto',
              duration:
                i.duration ||
                Math.abs(
                  (a - (u && 'time' in u ? u.time : s._time)) / s.timeScale()
                ) ||
                ut,
              onStart: function () {
                if ((s.pause(), !f)) {
                  var m =
                    i.duration ||
                    Math.abs(
                      (a - (u && 'time' in u ? u.time : s._time)) /
                        s.timeScale()
                    )
                  g._dur !== m && Wr(g, m, 0, 1).render(g._time, !0, !0),
                    (f = 1)
                }
                c && c.apply(g, h || [])
              },
            },
            i
          )
        )
      return d ? g.render(0) : g
    }),
    (t.tweenFromTo = function (r, i, s) {
      return this.tweenTo(i, Rt({ startAt: { time: Nt(this, r) } }, s))
    }),
    (t.recent = function () {
      return this._recent
    }),
    (t.nextLabel = function (r) {
      return r === void 0 && (r = this._time), ml(this, Nt(this, r))
    }),
    (t.previousLabel = function (r) {
      return r === void 0 && (r = this._time), ml(this, Nt(this, r), 1)
    }),
    (t.currentLabel = function (r) {
      return arguments.length
        ? this.seek(r, !0)
        : this.previousLabel(this._time + ut)
    }),
    (t.shiftChildren = function (r, i, s) {
      s === void 0 && (s = 0)
      for (var a = this._first, l = this.labels, u; a; )
        a._start >= s && ((a._start += r), (a._end += r)), (a = a._next)
      if (i) for (u in l) l[u] >= s && (l[u] += r)
      return lr(this)
    }),
    (t.invalidate = function (r) {
      var i = this._first
      for (this._lock = 0; i; ) i.invalidate(r), (i = i._next)
      return o.prototype.invalidate.call(this, r)
    }),
    (t.clear = function (r) {
      r === void 0 && (r = !0)
      for (var i = this._first, s; i; ) (s = i._next), this.remove(i), (i = s)
      return (
        this._dp && (this._time = this._tTime = this._pTime = 0),
        r && (this.labels = {}),
        lr(this)
      )
    }),
    (t.totalDuration = function (r) {
      var i = 0,
        s = this,
        a = s._last,
        l = un,
        u,
        c,
        h
      if (arguments.length)
        return s.timeScale(
          (s._repeat < 0 ? s.duration() : s.totalDuration()) /
            (s.reversed() ? -r : r)
        )
      if (s._dirty) {
        for (h = s.parent; a; )
          (u = a._prev),
            a._dirty && a.totalDuration(),
            (c = a._start),
            c > l && s._sort && a._ts && !s._lock
              ? ((s._lock = 1), (rn(s, a, c - a._delay, 1)._lock = 0))
              : (l = c),
            c < 0 &&
              a._ts &&
              ((i -= c),
              ((!h && !s._dp) || (h && h.smoothChildTiming)) &&
                ((s._start += c / s._ts), (s._time -= c), (s._tTime -= c)),
              s.shiftChildren(-c, !1, -1 / 0),
              (l = 0)),
            a._end > i && a._ts && (i = a._end),
            (a = u)
        Wr(s, s === Ce && s._time > i ? s._time : i, 1, 1), (s._dirty = 0)
      }
      return s._tDur
    }),
    (e.updateRoot = function (r) {
      if ((Ce._ts && (Xu(Ce, Bs(r, Ce)), (Yu = Ft.frame)), Ft.frame >= dl)) {
        dl += Lt.autoSleep || 120
        var i = Ce._first
        if ((!i || !i._ts) && Lt.autoSleep && Ft._listeners.length < 2) {
          for (; i && !i._ts; ) i = i._next
          i || Ft.sleep()
        }
      }
    }),
    e
  )
})(Bi)
Rt(mt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 })
var wd = function (e, t, n, r, i, s, a) {
    var l = new bt(this._pt, e, t, 0, 1, bc, null, i),
      u = 0,
      c = 0,
      h,
      d,
      f,
      g,
      p,
      m,
      _,
      D
    for (
      l.b = n,
        l.e = r,
        n += '',
        r += '',
        (_ = ~r.indexOf('random(')) && (r = Ni(r)),
        s && ((D = [n, r]), s(D, e, t), (n = D[0]), (r = D[1])),
        d = n.match(_o) || [];
      (h = _o.exec(r));

    )
      (g = h[0]),
        (p = r.substring(u, h.index)),
        f ? (f = (f + 1) % 5) : p.substr(-5) === 'rgba(' && (f = 1),
        g !== d[c++] &&
          ((m = parseFloat(d[c - 1]) || 0),
          (l._pt = {
            _next: l._pt,
            p: p || c === 1 ? p : ',',
            s: m,
            c: g.charAt(1) === '=' ? Ir(m, g) - m : parseFloat(g) - m,
            m: f && f < 4 ? Math.round : 0,
          }),
          (u = _o.lastIndex))
    return (
      (l.c = u < r.length ? r.substring(u, r.length) : ''),
      (l.fp = a),
      (Bu.test(r) || _) && (l.e = 0),
      (this._pt = l),
      l
    )
  },
  ja = function (e, t, n, r, i, s, a, l, u, c) {
    Te(r) && (r = r(i || 0, e, s))
    var h = e[t],
      d =
        n !== 'get'
          ? n
          : Te(h)
            ? u
              ? e[
                  t.indexOf('set') || !Te(e['get' + t.substr(3)])
                    ? t
                    : 'get' + t.substr(3)
                ](u)
              : e[t]()
            : h,
      f = Te(h) ? (u ? $d : vc) : Ha,
      g
    if (
      (Ge(r) &&
        (~r.indexOf('random(') && (r = Ni(r)),
        r.charAt(1) === '=' &&
          ((g = Ir(d, r) + (at(d) || 0)), (g || g === 0) && (r = g))),
      !c || d !== r || Ko)
    )
      return !isNaN(d * r) && r !== ''
        ? ((g = new bt(
            this._pt,
            e,
            t,
            +d || 0,
            r - (d || 0),
            typeof h == 'boolean' ? Fd : xc,
            0,
            f
          )),
          u && (g.fp = u),
          a && g.modifier(a, this, e),
          (this._pt = g))
        : (!h && !(t in e) && Ma(t, r),
          wd.call(this, e, t, d, r, f, l || Lt.stringFilter, u))
  },
  Sd = function (e, t, n, r, i) {
    if (
      (Te(e) && (e = bi(e, i, t, n, r)),
      !hn(e) || (e.style && e.nodeType) || ct(e) || Nu(e))
    )
      return Ge(e) ? bi(e, i, t, n, r) : e
    var s = {},
      a
    for (a in e) s[a] = bi(e[a], i, t, n, r)
    return s
  },
  _c = function (e, t, n, r, i, s) {
    var a, l, u, c
    if (
      $t[e] &&
      (a = new $t[e]()).init(
        i,
        a.rawVars ? t[e] : Sd(t[e], r, i, s, n),
        n,
        r,
        s
      ) !== !1 &&
      ((n._pt = l = new bt(n._pt, i, e, 0, 1, a.render, a, 0, a.priority)),
      n !== Rr)
    )
      for (u = n._ptLookup[n._targets.indexOf(i)], c = a._props.length; c--; )
        u[a._props[c]] = l
    return a
  },
  An,
  Ko,
  Ba = function o(e, t, n) {
    var r = e.vars,
      i = r.ease,
      s = r.startAt,
      a = r.immediateRender,
      l = r.lazy,
      u = r.onUpdate,
      c = r.runBackwards,
      h = r.yoyoEase,
      d = r.keyframes,
      f = r.autoRevert,
      g = e._dur,
      p = e._startAt,
      m = e._targets,
      _ = e.parent,
      D = _ && _.data === 'nested' ? _.vars.targets : m,
      C = e._overwrite === 'auto' && !Fa,
      v = e.timeline,
      w,
      E,
      x,
      $,
      T,
      k,
      A,
      P,
      j,
      z,
      O,
      I,
      R
    if (
      (v && (!d || !i) && (i = 'none'),
      (e._ease = ur(i, Vr.ease)),
      (e._yEase = h ? fc(ur(h === !0 ? i : h, Vr.ease)) : 0),
      h &&
        e._yoyo &&
        !e._repeat &&
        ((h = e._yEase), (e._yEase = e._ease), (e._ease = h)),
      (e._from = !v && !!r.runBackwards),
      !v || (d && !r.stagger))
    ) {
      if (
        ((P = m[0] ? ar(m[0]).harness : 0),
        (I = P && r[P.prop]),
        (w = js(r, Ra)),
        p &&
          (p._zTime < 0 && p.progress(1),
          t < 0 && c && a && !f ? p.render(-1, !0) : p.revert(c && g ? Ss : Qh),
          (p._lazy = 0)),
        s)
      ) {
        if (
          (Bn(
            (e._startAt = Ie.set(
              m,
              Rt(
                {
                  data: 'isStart',
                  overwrite: !1,
                  parent: _,
                  immediateRender: !0,
                  lazy: !p && vt(l),
                  startAt: null,
                  delay: 0,
                  onUpdate:
                    u &&
                    function () {
                      return Ot(e, 'onUpdate')
                    },
                  stagger: 0,
                },
                s
              )
            ))
          ),
          (e._startAt._dp = 0),
          (e._startAt._sat = e),
          t < 0 && (tt || (!a && !f)) && e._startAt.revert(Ss),
          a && g && t <= 0 && n <= 0)
        ) {
          t && (e._zTime = t)
          return
        }
      } else if (c && g && !p) {
        if (
          (t && (a = !1),
          (x = Rt(
            {
              overwrite: !1,
              data: 'isFromStart',
              lazy: a && !p && vt(l),
              immediateRender: a,
              stagger: 0,
              parent: _,
            },
            w
          )),
          I && (x[P.prop] = I),
          Bn((e._startAt = Ie.set(m, x))),
          (e._startAt._dp = 0),
          (e._startAt._sat = e),
          t < 0 && (tt ? e._startAt.revert(Ss) : e._startAt.render(-1, !0)),
          (e._zTime = t),
          !a)
        )
          o(e._startAt, ut, ut)
        else if (!t) return
      }
      for (
        e._pt = e._ptCache = 0, l = (g && vt(l)) || (l && !g), E = 0;
        E < m.length;
        E++
      ) {
        if (
          ((T = m[E]),
          (A = T._gsap || Ia(m)[E]._gsap),
          (e._ptLookup[E] = z = {}),
          Vo[A.id] && zn.length && Ns(),
          (O = D === m ? E : D.indexOf(T)),
          P &&
            (j = new P()).init(T, I || w, e, O, D) !== !1 &&
            ((e._pt = $ =
              new bt(e._pt, T, j.name, 0, 1, j.render, j, 0, j.priority)),
            j._props.forEach(function (N) {
              z[N] = $
            }),
            j.priority && (k = 1)),
          !P || I)
        )
          for (x in w)
            $t[x] && (j = _c(x, w, e, O, T, D))
              ? j.priority && (k = 1)
              : (z[x] = $ =
                  ja.call(e, T, x, 'get', w[x], O, D, 0, r.stringFilter))
        e._op && e._op[E] && e.kill(T, e._op[E]),
          C &&
            e._pt &&
            ((An = e),
            Ce.killTweensOf(T, z, e.globalTime(t)),
            (R = !e.parent),
            (An = 0)),
          e._pt && l && (Vo[A.id] = 1)
      }
      k && Cc(e), e._onInit && e._onInit(e)
    }
    ;(e._onUpdate = u),
      (e._initted = (!e._op || e._pt) && !R),
      d && t <= 0 && v.render(un, !0, !0)
  },
  Ed = function (e, t, n, r, i, s, a, l) {
    var u = ((e._pt && e._ptCache) || (e._ptCache = {}))[t],
      c,
      h,
      d,
      f
    if (!u)
      for (
        u = e._ptCache[t] = [], d = e._ptLookup, f = e._targets.length;
        f--;

      ) {
        if (((c = d[f][t]), c && c.d && c.d._pt))
          for (c = c.d._pt; c && c.p !== t && c.fp !== t; ) c = c._next
        if (!c)
          return (
            (Ko = 1),
            (e.vars[t] = '+=0'),
            Ba(e, a),
            (Ko = 0),
            l ? zi(t + ' not eligible for reset') : 1
          )
        u.push(c)
      }
    for (f = u.length; f--; )
      (h = u[f]),
        (c = h._pt || h),
        (c.s = (r || r === 0) && !i ? r : c.s + (r || 0) + s * c.c),
        (c.c = n - c.s),
        h.e && (h.e = Pe(n) + at(h.e)),
        h.b && (h.b = c.s + at(h.b))
  },
  Td = function (e, t) {
    var n = e[0] ? ar(e[0]).harness : 0,
      r = n && n.aliases,
      i,
      s,
      a,
      l
    if (!r) return t
    i = qr({}, t)
    for (s in r)
      if (s in i) for (l = r[s].split(','), a = l.length; a--; ) i[l[a]] = i[s]
    return i
  },
  kd = function (e, t, n, r) {
    var i = t.ease || r || 'power1.inOut',
      s,
      a
    if (ct(t))
      (a = n[e] || (n[e] = [])),
        t.forEach(function (l, u) {
          return a.push({ t: (u / (t.length - 1)) * 100, v: l, e: i })
        })
    else
      for (s in t)
        (a = n[s] || (n[s] = [])),
          s === 'ease' || a.push({ t: parseFloat(e), v: t[s], e: i })
  },
  bi = function (e, t, n, r, i) {
    return Te(e)
      ? e.call(t, n, r, i)
      : Ge(e) && ~e.indexOf('random(')
        ? Ni(e)
        : e
  },
  Dc = za + 'repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert',
  yc = {}
xt(Dc + ',id,stagger,delay,duration,paused,scrollTrigger', function (o) {
  return (yc[o] = 1)
})
var Ie = (function (o) {
  zu(e, o)
  function e(n, r, i, s) {
    var a
    typeof r == 'number' && ((i.duration = r), (r = i), (i = null)),
      (a = o.call(this, s ? r : vi(r)) || this)
    var l = a.vars,
      u = l.duration,
      c = l.delay,
      h = l.immediateRender,
      d = l.stagger,
      f = l.overwrite,
      g = l.keyframes,
      p = l.defaults,
      m = l.scrollTrigger,
      _ = l.yoyoEase,
      D = r.parent || Ce,
      C = (ct(n) || Nu(n) ? Cn(n[0]) : 'length' in r) ? [n] : Ht(n),
      v,
      w,
      E,
      x,
      $,
      T,
      k,
      A
    if (
      ((a._targets = C.length
        ? Ia(C)
        : zi(
            'GSAP target ' + n + ' not found. https://gsap.com',
            !Lt.nullTargetWarn
          ) || []),
      (a._ptLookup = []),
      (a._overwrite = f),
      g || d || as(u) || as(c))
    ) {
      if (
        ((r = a.vars),
        (v = a.timeline =
          new mt({
            data: 'nested',
            defaults: p || {},
            targets: D && D.data === 'nested' ? D.vars.targets : C,
          })),
        v.kill(),
        (v.parent = v._dp = _n(a)),
        (v._start = 0),
        d || as(u) || as(c))
      ) {
        if (((x = C.length), (k = d && rc(d)), hn(d)))
          for ($ in d) ~Dc.indexOf($) && (A || (A = {}), (A[$] = d[$]))
        for (w = 0; w < x; w++)
          (E = js(r, yc)),
            (E.stagger = 0),
            _ && (E.yoyoEase = _),
            A && qr(E, A),
            (T = C[w]),
            (E.duration = +bi(u, _n(a), w, T, C)),
            (E.delay = (+bi(c, _n(a), w, T, C) || 0) - a._delay),
            !d &&
              x === 1 &&
              E.delay &&
              ((a._delay = c = E.delay), (a._start += c), (E.delay = 0)),
            v.to(T, E, k ? k(w, T, C) : 0),
            (v._ease = ne.none)
        v.duration() ? (u = c = 0) : (a.timeline = 0)
      } else if (g) {
        vi(Rt(v.vars.defaults, { ease: 'none' })),
          (v._ease = ur(g.ease || r.ease || 'none'))
        var P = 0,
          j,
          z,
          O
        if (ct(g))
          g.forEach(function (I) {
            return v.to(C, I, '>')
          }),
            v.duration()
        else {
          E = {}
          for ($ in g)
            $ === 'ease' || $ === 'easeEach' || kd($, g[$], E, g.easeEach)
          for ($ in E)
            for (
              j = E[$].sort(function (I, R) {
                return I.t - R.t
              }),
                P = 0,
                w = 0;
              w < j.length;
              w++
            )
              (z = j[w]),
                (O = {
                  ease: z.e,
                  duration: ((z.t - (w ? j[w - 1].t : 0)) / 100) * u,
                }),
                (O[$] = z.v),
                v.to(C, O, P),
                (P += O.duration)
          v.duration() < u && v.to({}, { duration: u - v.duration() })
        }
      }
      u || a.duration((u = v.duration()))
    } else a.timeline = 0
    return (
      f === !0 && !Fa && ((An = _n(a)), Ce.killTweensOf(C), (An = 0)),
      rn(D, _n(a), i),
      r.reversed && a.reverse(),
      r.paused && a.paused(!0),
      (h ||
        (!u &&
          !g &&
          a._start === Ne(D._time) &&
          vt(h) &&
          sd(_n(a)) &&
          D.data !== 'nested')) &&
        ((a._tTime = -1e-8), a.render(Math.max(0, -c) || 0)),
      m && Qu(_n(a), m),
      a
    )
  }
  var t = e.prototype
  return (
    (t.render = function (r, i, s) {
      var a = this._time,
        l = this._tDur,
        u = this._dur,
        c = r < 0,
        h = r > l - ut && !c ? l : r < ut ? 0 : r,
        d,
        f,
        g,
        p,
        m,
        _,
        D,
        C,
        v
      if (!u) ad(this, r, i, s)
      else if (
        h !== this._tTime ||
        !r ||
        s ||
        (!this._initted && this._tTime) ||
        (this._startAt && this._zTime < 0 !== c) ||
        this._lazy
      ) {
        if (((d = h), (C = this.timeline), this._repeat)) {
          if (((p = u + this._rDelay), this._repeat < -1 && c))
            return this.totalTime(p * 100 + r, i, s)
          if (
            ((d = Ne(h % p)),
            h === l
              ? ((g = this._repeat), (d = u))
              : ((m = Ne(h / p)),
                (g = ~~m),
                g && g === m ? ((d = u), g--) : d > u && (d = u)),
            (_ = this._yoyo && g & 1),
            _ && ((v = this._yEase), (d = u - d)),
            (m = Yr(this._tTime, p)),
            d === a && !s && this._initted && g === m)
          )
            return (this._tTime = h), this
          g !== m &&
            (C && this._yEase && pc(C, _),
            this.vars.repeatRefresh &&
              !_ &&
              !this._lock &&
              d !== p &&
              this._initted &&
              ((this._lock = s = 1),
              (this.render(Ne(p * g), !0).invalidate()._lock = 0)))
        }
        if (!this._initted) {
          if (ec(this, c ? r : d, s, i, h)) return (this._tTime = 0), this
          if (a !== this._time && !(s && this.vars.repeatRefresh && g !== m))
            return this
          if (u !== this._dur) return this.render(r, i, s)
        }
        if (
          ((this._tTime = h),
          (this._time = d),
          !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
          (this.ratio = D = (v || this._ease)(d / u)),
          this._from && (this.ratio = D = 1 - D),
          !a && h && !i && !m && (Ot(this, 'onStart'), this._tTime !== h))
        )
          return this
        for (f = this._pt; f; ) f.r(D, f.d), (f = f._next)
        ;(C && C.render(r < 0 ? r : C._dur * C._ease(d / this._dur), i, s)) ||
          (this._startAt && (this._zTime = r)),
          this._onUpdate &&
            !i &&
            (c && qo(this, r, i, s), Ot(this, 'onUpdate')),
          this._repeat &&
            g !== m &&
            this.vars.onRepeat &&
            !i &&
            this.parent &&
            Ot(this, 'onRepeat'),
          (h === this._tDur || !h) &&
            this._tTime === h &&
            (c && !this._onUpdate && qo(this, r, !0, !0),
            (r || !u) &&
              ((h === this._tDur && this._ts > 0) || (!h && this._ts < 0)) &&
              Bn(this, 1),
            !i &&
              !(c && !a) &&
              (h || a || _) &&
              (Ot(this, h === l ? 'onComplete' : 'onReverseComplete', !0),
              this._prom && !(h < l && this.timeScale() > 0) && this._prom()))
      }
      return this
    }),
    (t.targets = function () {
      return this._targets
    }),
    (t.invalidate = function (r) {
      return (
        (!r || !this.vars.runBackwards) && (this._startAt = 0),
        (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
        (this._ptLookup = []),
        this.timeline && this.timeline.invalidate(r),
        o.prototype.invalidate.call(this, r)
      )
    }),
    (t.resetTo = function (r, i, s, a, l) {
      ji || Ft.wake(), this._ts || this.play()
      var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        c
      return (
        this._initted || Ba(this, u),
        (c = this._ease(u / this._dur)),
        Ed(this, r, i, s, a, c, u, l)
          ? this.resetTo(r, i, s, a, 1)
          : (ao(this, 0),
            this.parent ||
              Ju(
                this._dp,
                this,
                '_first',
                '_last',
                this._dp._sort ? '_start' : 0
              ),
            this.render(0))
      )
    }),
    (t.kill = function (r, i) {
      if ((i === void 0 && (i = 'all'), !r && (!i || i === 'all')))
        return (
          (this._lazy = this._pt = 0),
          this.parent
            ? fi(this)
            : this.scrollTrigger && this.scrollTrigger.kill(!!tt),
          this
        )
      if (this.timeline) {
        var s = this.timeline.totalDuration()
        return (
          this.timeline.killTweensOf(r, i, An && An.vars.overwrite !== !0)
            ._first || fi(this),
          this.parent &&
            s !== this.timeline.totalDuration() &&
            Wr(this, (this._dur * this.timeline._tDur) / s, 0, 1),
          this
        )
      }
      var a = this._targets,
        l = r ? Ht(r) : a,
        u = this._ptLookup,
        c = this._pt,
        h,
        d,
        f,
        g,
        p,
        m,
        _
      if ((!i || i === 'all') && rd(a, l))
        return i === 'all' && (this._pt = 0), fi(this)
      for (
        h = this._op = this._op || [],
          i !== 'all' &&
            (Ge(i) &&
              ((p = {}),
              xt(i, function (D) {
                return (p[D] = 1)
              }),
              (i = p)),
            (i = Td(a, i))),
          _ = a.length;
        _--;

      )
        if (~l.indexOf(a[_])) {
          ;(d = u[_]),
            i === 'all'
              ? ((h[_] = i), (g = d), (f = {}))
              : ((f = h[_] = h[_] || {}), (g = i))
          for (p in g)
            (m = d && d[p]),
              m &&
                ((!('kill' in m.d) || m.d.kill(p) === !0) && so(this, m, '_pt'),
                delete d[p]),
              f !== 'all' && (f[p] = 1)
        }
      return this._initted && !this._pt && c && fi(this), this
    }),
    (e.to = function (r, i) {
      return new e(r, i, arguments[2])
    }),
    (e.from = function (r, i) {
      return xi(1, arguments)
    }),
    (e.delayedCall = function (r, i, s, a) {
      return new e(i, 0, {
        immediateRender: !1,
        lazy: !1,
        overwrite: !1,
        delay: r,
        onComplete: i,
        onReverseComplete: i,
        onCompleteParams: s,
        onReverseCompleteParams: s,
        callbackScope: a,
      })
    }),
    (e.fromTo = function (r, i, s) {
      return xi(2, arguments)
    }),
    (e.set = function (r, i) {
      return (i.duration = 0), i.repeatDelay || (i.repeat = 0), new e(r, i)
    }),
    (e.killTweensOf = function (r, i, s) {
      return Ce.killTweensOf(r, i, s)
    }),
    e
  )
})(Bi)
Rt(Ie.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 })
xt('staggerTo,staggerFrom,staggerFromTo', function (o) {
  Ie[o] = function () {
    var e = new mt(),
      t = Wo.call(arguments, 0)
    return t.splice(o === 'staggerFromTo' ? 5 : 4, 0, 0), e[o].apply(e, t)
  }
})
var Ha = function (e, t, n) {
    return (e[t] = n)
  },
  vc = function (e, t, n) {
    return e[t](n)
  },
  $d = function (e, t, n, r) {
    return e[t](r.fp, n)
  },
  Pd = function (e, t, n) {
    return e.setAttribute(t, n)
  },
  Ua = function (e, t) {
    return Te(e[t]) ? vc : Aa(e[t]) && e.setAttribute ? Pd : Ha
  },
  xc = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t)
  },
  Fd = function (e, t) {
    return t.set(t.t, t.p, !!(t.s + t.c * e), t)
  },
  bc = function (e, t) {
    var n = t._pt,
      r = ''
    if (!e && t.b) r = t.b
    else if (e === 1 && t.e) r = t.e
    else {
      for (; n; )
        (r =
          n.p +
          (n.m ? n.m(n.s + n.c * e) : Math.round((n.s + n.c * e) * 1e4) / 1e4) +
          r),
          (n = n._next)
      r += t.c
    }
    t.set(t.t, t.p, r, t)
  },
  Va = function (e, t) {
    for (var n = t._pt; n; ) n.r(e, n.d), (n = n._next)
  },
  Ad = function (e, t, n, r) {
    for (var i = this._pt, s; i; )
      (s = i._next), i.p === r && i.modifier(e, t, n), (i = s)
  },
  Od = function (e) {
    for (var t = this._pt, n, r; t; )
      (r = t._next),
        (t.p === e && !t.op) || t.op === e
          ? so(this, t, '_pt')
          : t.dep || (n = 1),
        (t = r)
    return !n
  },
  Ld = function (e, t, n, r) {
    r.mSet(e, t, r.m.call(r.tween, n, r.mt), r)
  },
  Cc = function (e) {
    for (var t = e._pt, n, r, i, s; t; ) {
      for (n = t._next, r = i; r && r.pr > t.pr; ) r = r._next
      ;(t._prev = r ? r._prev : s) ? (t._prev._next = t) : (i = t),
        (t._next = r) ? (r._prev = t) : (s = t),
        (t = n)
    }
    e._pt = i
  },
  bt = (function () {
    function o(t, n, r, i, s, a, l, u, c) {
      ;(this.t = n),
        (this.s = i),
        (this.c = s),
        (this.p = r),
        (this.r = a || xc),
        (this.d = l || this),
        (this.set = u || Ha),
        (this.pr = c || 0),
        (this._next = t),
        t && (t._prev = this)
    }
    var e = o.prototype
    return (
      (e.modifier = function (n, r, i) {
        ;(this.mSet = this.mSet || this.set),
          (this.set = Ld),
          (this.m = n),
          (this.mt = i),
          (this.tween = r)
      }),
      o
    )
  })()
xt(
  za +
    'parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger',
  function (o) {
    return (Ra[o] = 1)
  }
)
Mt.TweenMax = Mt.TweenLite = Ie
Mt.TimelineLite = Mt.TimelineMax = mt
Ce = new mt({
  sortChildren: !1,
  defaults: Vr,
  autoRemoveChildren: !0,
  id: 'root',
  smoothChildTiming: !0,
})
Lt.stringFilter = dc
var cr = [],
  Ts = {},
  Md = [],
  Dl = 0,
  Rd = 0,
  bo = function (e) {
    return (Ts[e] || Md).map(function (t) {
      return t()
    })
  },
  Jo = function () {
    var e = Date.now(),
      t = []
    e - Dl > 2 &&
      (bo('matchMediaInit'),
      cr.forEach(function (n) {
        var r = n.queries,
          i = n.conditions,
          s,
          a,
          l,
          u
        for (a in r)
          (s = tn.matchMedia(r[a]).matches),
            s && (l = 1),
            s !== i[a] && ((i[a] = s), (u = 1))
        u && (n.revert(), l && t.push(n))
      }),
      bo('matchMediaRevert'),
      t.forEach(function (n) {
        return n.onMatch(n, function (r) {
          return n.add(null, r)
        })
      }),
      (Dl = e),
      bo('matchMedia'))
  },
  wc = (function () {
    function o(t, n) {
      ;(this.selector = n && Xo(n)),
        (this.data = []),
        (this._r = []),
        (this.isReverted = !1),
        (this.id = Rd++),
        t && this.add(t)
    }
    var e = o.prototype
    return (
      (e.add = function (n, r, i) {
        Te(n) && ((i = r), (r = n), (n = Te))
        var s = this,
          a = function () {
            var u = ve,
              c = s.selector,
              h
            return (
              u && u !== s && u.data.push(s),
              i && (s.selector = Xo(i)),
              (ve = s),
              (h = r.apply(s, arguments)),
              Te(h) && s._r.push(h),
              (ve = u),
              (s.selector = c),
              (s.isReverted = !1),
              h
            )
          }
        return (
          (s.last = a),
          n === Te
            ? a(s, function (l) {
                return s.add(null, l)
              })
            : n
              ? (s[n] = a)
              : a
        )
      }),
      (e.ignore = function (n) {
        var r = ve
        ;(ve = null), n(this), (ve = r)
      }),
      (e.getTweens = function () {
        var n = []
        return (
          this.data.forEach(function (r) {
            return r instanceof o
              ? n.push.apply(n, r.getTweens())
              : r instanceof Ie &&
                  !(r.parent && r.parent.data === 'nested') &&
                  n.push(r)
          }),
          n
        )
      }),
      (e.clear = function () {
        this._r.length = this.data.length = 0
      }),
      (e.kill = function (n, r) {
        var i = this
        if (
          (n
            ? (function () {
                for (var a = i.getTweens(), l = i.data.length, u; l--; )
                  (u = i.data[l]),
                    u.data === 'isFlip' &&
                      (u.revert(),
                      u.getChildren(!0, !0, !1).forEach(function (c) {
                        return a.splice(a.indexOf(c), 1)
                      }))
                for (
                  a
                    .map(function (c) {
                      return {
                        g:
                          c._dur ||
                          c._delay ||
                          (c._sat && !c._sat.vars.immediateRender)
                            ? c.globalTime(0)
                            : -1 / 0,
                        t: c,
                      }
                    })
                    .sort(function (c, h) {
                      return h.g - c.g || -1 / 0
                    })
                    .forEach(function (c) {
                      return c.t.revert(n)
                    }),
                    l = i.data.length;
                  l--;

                )
                  (u = i.data[l]),
                    u instanceof mt
                      ? u.data !== 'nested' &&
                        (u.scrollTrigger && u.scrollTrigger.revert(), u.kill())
                      : !(u instanceof Ie) && u.revert && u.revert(n)
                i._r.forEach(function (c) {
                  return c(n, i)
                }),
                  (i.isReverted = !0)
              })()
            : this.data.forEach(function (a) {
                return a.kill && a.kill()
              }),
          this.clear(),
          r)
        )
          for (var s = cr.length; s--; ) cr[s].id === this.id && cr.splice(s, 1)
      }),
      (e.revert = function (n) {
        this.kill(n || {})
      }),
      o
    )
  })(),
  zd = (function () {
    function o(t) {
      ;(this.contexts = []), (this.scope = t), ve && ve.data.push(this)
    }
    var e = o.prototype
    return (
      (e.add = function (n, r, i) {
        hn(n) || (n = { matches: n })
        var s = new wc(0, i || this.scope),
          a = (s.conditions = {}),
          l,
          u,
          c
        ve && !s.selector && (s.selector = ve.selector),
          this.contexts.push(s),
          (r = s.add('onMatch', r)),
          (s.queries = n)
        for (u in n)
          u === 'all'
            ? (c = 1)
            : ((l = tn.matchMedia(n[u])),
              l &&
                (cr.indexOf(s) < 0 && cr.push(s),
                (a[u] = l.matches) && (c = 1),
                l.addListener
                  ? l.addListener(Jo)
                  : l.addEventListener('change', Jo)))
        return (
          c &&
            r(s, function (h) {
              return s.add(null, h)
            }),
          this
        )
      }),
      (e.revert = function (n) {
        this.kill(n || {})
      }),
      (e.kill = function (n) {
        this.contexts.forEach(function (r) {
          return r.kill(n, !0)
        })
      }),
      o
    )
  })(),
  Hs = {
    registerPlugin: function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n]
      t.forEach(function (r) {
        return uc(r)
      })
    },
    timeline: function (e) {
      return new mt(e)
    },
    getTweensOf: function (e, t) {
      return Ce.getTweensOf(e, t)
    },
    getProperty: function (e, t, n, r) {
      Ge(e) && (e = Ht(e)[0])
      var i = ar(e || {}).get,
        s = n ? Ku : Gu
      return (
        n === 'native' && (n = ''),
        e &&
          (t
            ? s((($t[t] && $t[t].get) || i)(e, t, n, r))
            : function (a, l, u) {
                return s((($t[a] && $t[a].get) || i)(e, a, l, u))
              })
      )
    },
    quickSetter: function (e, t, n) {
      if (((e = Ht(e)), e.length > 1)) {
        var r = e.map(function (c) {
            return wt.quickSetter(c, t, n)
          }),
          i = r.length
        return function (c) {
          for (var h = i; h--; ) r[h](c)
        }
      }
      e = e[0] || {}
      var s = $t[t],
        a = ar(e),
        l = (a.harness && (a.harness.aliases || {})[t]) || t,
        u = s
          ? function (c) {
              var h = new s()
              ;(Rr._pt = 0),
                h.init(e, n ? c + n : c, Rr, 0, [e]),
                h.render(1, h),
                Rr._pt && Va(1, Rr)
            }
          : a.set(e, l)
      return s
        ? u
        : function (c) {
            return u(e, l, n ? c + n : c, a, 1)
          }
    },
    quickTo: function (e, t, n) {
      var r,
        i = wt.to(
          e,
          Rt(
            ((r = {}), (r[t] = '+=0.1'), (r.paused = !0), (r.stagger = 0), r),
            n || {}
          )
        ),
        s = function (l, u, c) {
          return i.resetTo(t, l, u, c)
        }
      return (s.tween = i), s
    },
    isTweening: function (e) {
      return Ce.getTweensOf(e, !0).length > 0
    },
    defaults: function (e) {
      return e && e.ease && (e.ease = ur(e.ease, Vr.ease)), fl(Vr, e || {})
    },
    config: function (e) {
      return fl(Lt, e || {})
    },
    registerEffect: function (e) {
      var t = e.name,
        n = e.effect,
        r = e.plugins,
        i = e.defaults,
        s = e.extendTimeline
      ;(r || '').split(',').forEach(function (a) {
        return (
          a && !$t[a] && !Mt[a] && zi(t + ' effect requires ' + a + ' plugin.')
        )
      }),
        (Do[t] = function (a, l, u) {
          return n(Ht(a), Rt(l || {}, i), u)
        }),
        s &&
          (mt.prototype[t] = function (a, l, u) {
            return this.add(Do[t](a, hn(l) ? l : (u = l) && {}, this), u)
          })
    },
    registerEase: function (e, t) {
      ne[e] = ur(t)
    },
    parseEase: function (e, t) {
      return arguments.length ? ur(e, t) : ne
    },
    getById: function (e) {
      return Ce.getById(e)
    },
    exportRoot: function (e, t) {
      e === void 0 && (e = {})
      var n = new mt(e),
        r,
        i
      for (
        n.smoothChildTiming = vt(e.smoothChildTiming),
          Ce.remove(n),
          n._dp = 0,
          n._time = n._tTime = Ce._time,
          r = Ce._first;
        r;

      )
        (i = r._next),
          (t ||
            !(
              !r._dur &&
              r instanceof Ie &&
              r.vars.onComplete === r._targets[0]
            )) &&
            rn(n, r, r._start - r._delay),
          (r = i)
      return rn(Ce, n, 0), n
    },
    context: function (e, t) {
      return e ? new wc(e, t) : ve
    },
    matchMedia: function (e) {
      return new zd(e)
    },
    matchMediaRefresh: function () {
      return (
        cr.forEach(function (e) {
          var t = e.conditions,
            n,
            r
          for (r in t) t[r] && ((t[r] = !1), (n = 1))
          n && e.revert()
        }) || Jo()
      )
    },
    addEventListener: function (e, t) {
      var n = Ts[e] || (Ts[e] = [])
      ~n.indexOf(t) || n.push(t)
    },
    removeEventListener: function (e, t) {
      var n = Ts[e],
        r = n && n.indexOf(t)
      r >= 0 && n.splice(r, 1)
    },
    utils: {
      wrap: gd,
      wrapYoyo: md,
      distribute: rc,
      random: sc,
      snap: ic,
      normalize: pd,
      getUnit: at,
      clamp: cd,
      splitColor: cc,
      toArray: Ht,
      selector: Xo,
      mapRange: ac,
      pipe: dd,
      unitize: fd,
      interpolate: _d,
      shuffle: nc,
    },
    install: Vu,
    effects: Do,
    ticker: Ft,
    updateRoot: mt.updateRoot,
    plugins: $t,
    globalTimeline: Ce,
    core: {
      PropTween: bt,
      globals: qu,
      Tween: Ie,
      Timeline: mt,
      Animation: Bi,
      getCache: ar,
      _removeLinkedListItem: so,
      reverting: function () {
        return tt
      },
      context: function (e) {
        return e && ve && (ve.data.push(e), (e._ctx = ve)), ve
      },
      suppressOverwrites: function (e) {
        return (Fa = e)
      },
    },
  }
xt('to,from,fromTo,delayedCall,set,killTweensOf', function (o) {
  return (Hs[o] = Ie[o])
})
Ft.add(mt.updateRoot)
Rr = Hs.to({}, { duration: 0 })
var Id = function (e, t) {
    for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t; )
      n = n._next
    return n
  },
  Nd = function (e, t) {
    var n = e._targets,
      r,
      i,
      s
    for (r in t)
      for (i = n.length; i--; )
        (s = e._ptLookup[i][r]),
          s &&
            (s = s.d) &&
            (s._pt && (s = Id(s, r)),
            s && s.modifier && s.modifier(t[r], e, n[i], r))
  },
  Co = function (e, t) {
    return {
      name: e,
      headless: 1,
      rawVars: 1,
      init: function (r, i, s) {
        s._onInit = function (a) {
          var l, u
          if (
            (Ge(i) &&
              ((l = {}),
              xt(i, function (c) {
                return (l[c] = 1)
              }),
              (i = l)),
            t)
          ) {
            l = {}
            for (u in i) l[u] = t(i[u])
            i = l
          }
          Nd(a, i)
        }
      },
    }
  },
  wt =
    Hs.registerPlugin(
      {
        name: 'attr',
        init: function (e, t, n, r, i) {
          var s, a, l
          this.tween = n
          for (s in t)
            (l = e.getAttribute(s) || ''),
              (a = this.add(
                e,
                'setAttribute',
                (l || 0) + '',
                t[s],
                r,
                i,
                0,
                0,
                s
              )),
              (a.op = s),
              (a.b = l),
              this._props.push(s)
        },
        render: function (e, t) {
          for (var n = t._pt; n; )
            tt ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), (n = n._next)
        },
      },
      {
        name: 'endArray',
        headless: 1,
        init: function (e, t) {
          for (var n = t.length; n--; )
            this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1)
        },
      },
      Co('roundProps', Go),
      Co('modifiers'),
      Co('snap', ic)
    ) || Hs
Ie.version = mt.version = wt.version = '3.13.0'
Uu = 1
Oa() && Xr()
ne.Power0
ne.Power1
ne.Power2
ne.Power3
ne.Power4
ne.Linear
ne.Quad
ne.Cubic
ne.Quart
ne.Quint
ne.Strong
ne.Elastic
ne.Back
ne.SteppedEase
ne.Bounce
ne.Sine
ne.Expo
ne.Circ
var yl,
  On,
  Nr,
  qa,
  rr,
  vl,
  Ya,
  jd = function () {
    return typeof window < 'u'
  },
  wn = {},
  Qn = 180 / Math.PI,
  jr = Math.PI / 180,
  Sr = Math.atan2,
  xl = 1e8,
  Wa = /([A-Z])/g,
  Bd = /(left|right|width|margin|padding|x)/i,
  Hd = /[\s,\(]\S/,
  sn = {
    autoAlpha: 'opacity,visibility',
    scale: 'scaleX,scaleY',
    alpha: 'opacity',
  },
  Zo = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
  },
  Ud = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u,
      t
    )
  },
  Vd = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b,
      t
    )
  },
  qd = function (e, t) {
    var n = t.s + t.c * e
    t.set(t.t, t.p, ~~(n + (n < 0 ? -0.5 : 0.5)) + t.u, t)
  },
  Sc = function (e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t)
  },
  Ec = function (e, t) {
    return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t)
  },
  Yd = function (e, t, n) {
    return (e.style[t] = n)
  },
  Wd = function (e, t, n) {
    return e.style.setProperty(t, n)
  },
  Xd = function (e, t, n) {
    return (e._gsap[t] = n)
  },
  Gd = function (e, t, n) {
    return (e._gsap.scaleX = e._gsap.scaleY = n)
  },
  Kd = function (e, t, n, r, i) {
    var s = e._gsap
    ;(s.scaleX = s.scaleY = n), s.renderTransform(i, s)
  },
  Jd = function (e, t, n, r, i) {
    var s = e._gsap
    ;(s[t] = n), s.renderTransform(i, s)
  },
  we = 'transform',
  Ct = we + 'Origin',
  Zd = function o(e, t) {
    var n = this,
      r = this.target,
      i = r.style,
      s = r._gsap
    if (e in wn && i) {
      if (((this.tfm = this.tfm || {}), e !== 'transform'))
        (e = sn[e] || e),
          ~e.indexOf(',')
            ? e.split(',').forEach(function (a) {
                return (n.tfm[a] = Dn(r, a))
              })
            : (this.tfm[e] = s.x ? s[e] : Dn(r, e)),
          e === Ct && (this.tfm.zOrigin = s.zOrigin)
      else
        return sn.transform.split(',').forEach(function (a) {
          return o.call(n, a, t)
        })
      if (this.props.indexOf(we) >= 0) return
      s.svg &&
        ((this.svgo = r.getAttribute('data-svg-origin')),
        this.props.push(Ct, t, '')),
        (e = we)
    }
    ;(i || t) && this.props.push(e, t, i[e])
  },
  Tc = function (e) {
    e.translate &&
      (e.removeProperty('translate'),
      e.removeProperty('scale'),
      e.removeProperty('rotate'))
  },
  Qd = function () {
    var e = this.props,
      t = this.target,
      n = t.style,
      r = t._gsap,
      i,
      s
    for (i = 0; i < e.length; i += 3)
      e[i + 1]
        ? e[i + 1] === 2
          ? t[e[i]](e[i + 2])
          : (t[e[i]] = e[i + 2])
        : e[i + 2]
          ? (n[e[i]] = e[i + 2])
          : n.removeProperty(
              e[i].substr(0, 2) === '--'
                ? e[i]
                : e[i].replace(Wa, '-$1').toLowerCase()
            )
    if (this.tfm) {
      for (s in this.tfm) r[s] = this.tfm[s]
      r.svg &&
        (r.renderTransform(),
        t.setAttribute('data-svg-origin', this.svgo || '')),
        (i = Ya()),
        (!i || !i.isStart) &&
          !n[we] &&
          (Tc(n),
          r.zOrigin &&
            n[Ct] &&
            ((n[Ct] += ' ' + r.zOrigin + 'px'),
            (r.zOrigin = 0),
            r.renderTransform()),
          (r.uncache = 1))
    }
  },
  kc = function (e, t) {
    var n = { target: e, props: [], revert: Qd, save: Zd }
    return (
      e._gsap || wt.core.getCache(e),
      t &&
        e.style &&
        e.nodeType &&
        t.split(',').forEach(function (r) {
          return n.save(r)
        }),
      n
    )
  },
  $c,
  Qo = function (e, t) {
    var n = On.createElementNS
      ? On.createElementNS(
          (t || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'),
          e
        )
      : On.createElement(e)
    return n && n.style ? n : On.createElement(e)
  },
  Ut = function o(e, t, n) {
    var r = getComputedStyle(e)
    return (
      r[t] ||
      r.getPropertyValue(t.replace(Wa, '-$1').toLowerCase()) ||
      r.getPropertyValue(t) ||
      (!n && o(e, Gr(t) || t, 1)) ||
      ''
    )
  },
  bl = 'O,Moz,ms,Ms,Webkit'.split(','),
  Gr = function (e, t, n) {
    var r = t || rr,
      i = r.style,
      s = 5
    if (e in i && !n) return e
    for (
      e = e.charAt(0).toUpperCase() + e.substr(1);
      s-- && !(bl[s] + e in i);

    );
    return s < 0 ? null : (s === 3 ? 'ms' : s >= 0 ? bl[s] : '') + e
  },
  ea = function () {
    jd() &&
      window.document &&
      ((yl = window),
      (On = yl.document),
      (Nr = On.documentElement),
      (rr = Qo('div') || { style: {} }),
      Qo('div'),
      (we = Gr(we)),
      (Ct = we + 'Origin'),
      (rr.style.cssText =
        'border-width:0;line-height:0;position:absolute;padding:0'),
      ($c = !!Gr('perspective')),
      (Ya = wt.core.reverting),
      (qa = 1))
  },
  Cl = function (e) {
    var t = e.ownerSVGElement,
      n = Qo(
        'svg',
        (t && t.getAttribute('xmlns')) || 'http://www.w3.org/2000/svg'
      ),
      r = e.cloneNode(!0),
      i
    ;(r.style.display = 'block'), n.appendChild(r), Nr.appendChild(n)
    try {
      i = r.getBBox()
    } catch {}
    return n.removeChild(r), Nr.removeChild(n), i
  },
  wl = function (e, t) {
    for (var n = t.length; n--; )
      if (e.hasAttribute(t[n])) return e.getAttribute(t[n])
  },
  Pc = function (e) {
    var t, n
    try {
      t = e.getBBox()
    } catch {
      ;(t = Cl(e)), (n = 1)
    }
    return (
      (t && (t.width || t.height)) || n || (t = Cl(e)),
      t && !t.width && !t.x && !t.y
        ? {
            x: +wl(e, ['x', 'cx', 'x1']) || 0,
            y: +wl(e, ['y', 'cy', 'y1']) || 0,
            width: 0,
            height: 0,
          }
        : t
    )
  },
  Fc = function (e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Pc(e))
  },
  pr = function (e, t) {
    if (t) {
      var n = e.style,
        r
      t in wn && t !== Ct && (t = we),
        n.removeProperty
          ? ((r = t.substr(0, 2)),
            (r === 'ms' || t.substr(0, 6) === 'webkit') && (t = '-' + t),
            n.removeProperty(
              r === '--' ? t : t.replace(Wa, '-$1').toLowerCase()
            ))
          : n.removeAttribute(t)
    }
  },
  Ln = function (e, t, n, r, i, s) {
    var a = new bt(e._pt, t, n, 0, 1, s ? Ec : Sc)
    return (e._pt = a), (a.b = r), (a.e = i), e._props.push(n), a
  },
  Sl = { deg: 1, rad: 1, turn: 1 },
  ef = { grid: 1, flex: 1 },
  Hn = function o(e, t, n, r) {
    var i = parseFloat(n) || 0,
      s = (n + '').trim().substr((i + '').length) || 'px',
      a = rr.style,
      l = Bd.test(t),
      u = e.tagName.toLowerCase() === 'svg',
      c = (u ? 'client' : 'offset') + (l ? 'Width' : 'Height'),
      h = 100,
      d = r === 'px',
      f = r === '%',
      g,
      p,
      m,
      _
    if (r === s || !i || Sl[r] || Sl[s]) return i
    if (
      (s !== 'px' && !d && (i = o(e, t, n, 'px')),
      (_ = e.getCTM && Fc(e)),
      (f || s === '%') && (wn[t] || ~t.indexOf('adius')))
    )
      return (
        (g = _ ? e.getBBox()[l ? 'width' : 'height'] : e[c]),
        Pe(f ? (i / g) * h : (i / 100) * g)
      )
    if (
      ((a[l ? 'width' : 'height'] = h + (d ? s : r)),
      (p =
        (r !== 'rem' && ~t.indexOf('adius')) ||
        (r === 'em' && e.appendChild && !u)
          ? e
          : e.parentNode),
      _ && (p = (e.ownerSVGElement || {}).parentNode),
      (!p || p === On || !p.appendChild) && (p = On.body),
      (m = p._gsap),
      m && f && m.width && l && m.time === Ft.time && !m.uncache)
    )
      return Pe((i / m.width) * h)
    if (f && (t === 'height' || t === 'width')) {
      var D = e.style[t]
      ;(e.style[t] = h + r), (g = e[c]), D ? (e.style[t] = D) : pr(e, t)
    } else
      (f || s === '%') &&
        !ef[Ut(p, 'display')] &&
        (a.position = Ut(e, 'position')),
        p === e && (a.position = 'static'),
        p.appendChild(rr),
        (g = rr[c]),
        p.removeChild(rr),
        (a.position = 'absolute')
    return (
      l && f && ((m = ar(p)), (m.time = Ft.time), (m.width = p[c])),
      Pe(d ? (g * i) / h : g && i ? (h / g) * i : 0)
    )
  },
  Dn = function (e, t, n, r) {
    var i
    return (
      qa || ea(),
      t in sn &&
        t !== 'transform' &&
        ((t = sn[t]), ~t.indexOf(',') && (t = t.split(',')[0])),
      wn[t] && t !== 'transform'
        ? ((i = Ui(e, r)),
          (i =
            t !== 'transformOrigin'
              ? i[t]
              : i.svg
                ? i.origin
                : Vs(Ut(e, Ct)) + ' ' + i.zOrigin + 'px'))
        : ((i = e.style[t]),
          (!i || i === 'auto' || r || ~(i + '').indexOf('calc(')) &&
            (i =
              (Us[t] && Us[t](e, t, n)) ||
              Ut(e, t) ||
              Wu(e, t) ||
              (t === 'opacity' ? 1 : 0))),
      n && !~(i + '').trim().indexOf(' ') ? Hn(e, t, i, n) + n : i
    )
  },
  tf = function (e, t, n, r) {
    if (!n || n === 'none') {
      var i = Gr(t, e, 1),
        s = i && Ut(e, i, 1)
      s && s !== n
        ? ((t = i), (n = s))
        : t === 'borderColor' && (n = Ut(e, 'borderTopColor'))
    }
    var a = new bt(this._pt, e.style, t, 0, 1, bc),
      l = 0,
      u = 0,
      c,
      h,
      d,
      f,
      g,
      p,
      m,
      _,
      D,
      C,
      v,
      w
    if (
      ((a.b = n),
      (a.e = r),
      (n += ''),
      (r += ''),
      r.substring(0, 6) === 'var(--' &&
        (r = Ut(e, r.substring(4, r.indexOf(')')))),
      r === 'auto' &&
        ((p = e.style[t]),
        (e.style[t] = r),
        (r = Ut(e, t) || r),
        p ? (e.style[t] = p) : pr(e, t)),
      (c = [n, r]),
      dc(c),
      (n = c[0]),
      (r = c[1]),
      (d = n.match(Mr) || []),
      (w = r.match(Mr) || []),
      w.length)
    ) {
      for (; (h = Mr.exec(r)); )
        (m = h[0]),
          (D = r.substring(l, h.index)),
          g
            ? (g = (g + 1) % 5)
            : (D.substr(-5) === 'rgba(' || D.substr(-5) === 'hsla(') && (g = 1),
          m !== (p = d[u++] || '') &&
            ((f = parseFloat(p) || 0),
            (v = p.substr((f + '').length)),
            m.charAt(1) === '=' && (m = Ir(f, m) + v),
            (_ = parseFloat(m)),
            (C = m.substr((_ + '').length)),
            (l = Mr.lastIndex - C.length),
            C ||
              ((C = C || Lt.units[t] || v),
              l === r.length && ((r += C), (a.e += C))),
            v !== C && (f = Hn(e, t, p, C) || 0),
            (a._pt = {
              _next: a._pt,
              p: D || u === 1 ? D : ',',
              s: f,
              c: _ - f,
              m: (g && g < 4) || t === 'zIndex' ? Math.round : 0,
            }))
      a.c = l < r.length ? r.substring(l, r.length) : ''
    } else a.r = t === 'display' && r === 'none' ? Ec : Sc
    return Bu.test(r) && (a.e = 0), (this._pt = a), a
  },
  El = { top: '0%', bottom: '100%', left: '0%', right: '100%', center: '50%' },
  nf = function (e) {
    var t = e.split(' '),
      n = t[0],
      r = t[1] || '50%'
    return (
      (n === 'top' || n === 'bottom' || r === 'left' || r === 'right') &&
        ((e = n), (n = r), (r = e)),
      (t[0] = El[n] || n),
      (t[1] = El[r] || r),
      t.join(' ')
    )
  },
  rf = function (e, t) {
    if (t.tween && t.tween._time === t.tween._dur) {
      var n = t.t,
        r = n.style,
        i = t.u,
        s = n._gsap,
        a,
        l,
        u
      if (i === 'all' || i === !0) (r.cssText = ''), (l = 1)
      else
        for (i = i.split(','), u = i.length; --u > -1; )
          (a = i[u]),
            wn[a] && ((l = 1), (a = a === 'transformOrigin' ? Ct : we)),
            pr(n, a)
      l &&
        (pr(n, we),
        s &&
          (s.svg && n.removeAttribute('transform'),
          (r.scale = r.rotate = r.translate = 'none'),
          Ui(n, 1),
          (s.uncache = 1),
          Tc(r)))
    }
  },
  Us = {
    clearProps: function (e, t, n, r, i) {
      if (i.data !== 'isFromStart') {
        var s = (e._pt = new bt(e._pt, t, n, 0, 0, rf))
        return (s.u = r), (s.pr = -10), (s.tween = i), e._props.push(n), 1
      }
    },
  },
  Hi = [1, 0, 0, 1, 0, 0],
  Ac = {},
  Oc = function (e) {
    return e === 'matrix(1, 0, 0, 1, 0, 0)' || e === 'none' || !e
  },
  Tl = function (e) {
    var t = Ut(e, we)
    return Oc(t) ? Hi : t.substr(7).match(ju).map(Pe)
  },
  Xa = function (e, t) {
    var n = e._gsap || ar(e),
      r = e.style,
      i = Tl(e),
      s,
      a,
      l,
      u
    return n.svg && e.getAttribute('transform')
      ? ((l = e.transform.baseVal.consolidate().matrix),
        (i = [l.a, l.b, l.c, l.d, l.e, l.f]),
        i.join(',') === '1,0,0,1,0,0' ? Hi : i)
      : (i === Hi &&
          !e.offsetParent &&
          e !== Nr &&
          !n.svg &&
          ((l = r.display),
          (r.display = 'block'),
          (s = e.parentNode),
          (!s || (!e.offsetParent && !e.getBoundingClientRect().width)) &&
            ((u = 1), (a = e.nextElementSibling), Nr.appendChild(e)),
          (i = Tl(e)),
          l ? (r.display = l) : pr(e, 'display'),
          u &&
            (a
              ? s.insertBefore(e, a)
              : s
                ? s.appendChild(e)
                : Nr.removeChild(e))),
        t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i)
  },
  ta = function (e, t, n, r, i, s) {
    var a = e._gsap,
      l = i || Xa(e, !0),
      u = a.xOrigin || 0,
      c = a.yOrigin || 0,
      h = a.xOffset || 0,
      d = a.yOffset || 0,
      f = l[0],
      g = l[1],
      p = l[2],
      m = l[3],
      _ = l[4],
      D = l[5],
      C = t.split(' '),
      v = parseFloat(C[0]) || 0,
      w = parseFloat(C[1]) || 0,
      E,
      x,
      $,
      T
    n
      ? l !== Hi &&
        (x = f * m - g * p) &&
        (($ = v * (m / x) + w * (-p / x) + (p * D - m * _) / x),
        (T = v * (-g / x) + w * (f / x) - (f * D - g * _) / x),
        (v = $),
        (w = T))
      : ((E = Pc(e)),
        (v = E.x + (~C[0].indexOf('%') ? (v / 100) * E.width : v)),
        (w = E.y + (~(C[1] || C[0]).indexOf('%') ? (w / 100) * E.height : w))),
      r || (r !== !1 && a.smooth)
        ? ((_ = v - u),
          (D = w - c),
          (a.xOffset = h + (_ * f + D * p) - _),
          (a.yOffset = d + (_ * g + D * m) - D))
        : (a.xOffset = a.yOffset = 0),
      (a.xOrigin = v),
      (a.yOrigin = w),
      (a.smooth = !!r),
      (a.origin = t),
      (a.originIsAbsolute = !!n),
      (e.style[Ct] = '0px 0px'),
      s &&
        (Ln(s, a, 'xOrigin', u, v),
        Ln(s, a, 'yOrigin', c, w),
        Ln(s, a, 'xOffset', h, a.xOffset),
        Ln(s, a, 'yOffset', d, a.yOffset)),
      e.setAttribute('data-svg-origin', v + ' ' + w)
  },
  Ui = function (e, t) {
    var n = e._gsap || new mc(e)
    if ('x' in n && !t && !n.uncache) return n
    var r = e.style,
      i = n.scaleX < 0,
      s = 'px',
      a = 'deg',
      l = getComputedStyle(e),
      u = Ut(e, Ct) || '0',
      c,
      h,
      d,
      f,
      g,
      p,
      m,
      _,
      D,
      C,
      v,
      w,
      E,
      x,
      $,
      T,
      k,
      A,
      P,
      j,
      z,
      O,
      I,
      R,
      N,
      H,
      y,
      U,
      L,
      ae,
      se,
      ce
    return (
      (c = h = d = p = m = _ = D = C = v = 0),
      (f = g = 1),
      (n.svg = !!(e.getCTM && Fc(e))),
      l.translate &&
        ((l.translate !== 'none' ||
          l.scale !== 'none' ||
          l.rotate !== 'none') &&
          (r[we] =
            (l.translate !== 'none'
              ? 'translate3d(' +
                (l.translate + ' 0 0').split(' ').slice(0, 3).join(', ') +
                ') '
              : '') +
            (l.rotate !== 'none' ? 'rotate(' + l.rotate + ') ' : '') +
            (l.scale !== 'none'
              ? 'scale(' + l.scale.split(' ').join(',') + ') '
              : '') +
            (l[we] !== 'none' ? l[we] : '')),
        (r.scale = r.rotate = r.translate = 'none')),
      (x = Xa(e, n.svg)),
      n.svg &&
        (n.uncache
          ? ((N = e.getBBox()),
            (u = n.xOrigin - N.x + 'px ' + (n.yOrigin - N.y) + 'px'),
            (R = ''))
          : (R = !t && e.getAttribute('data-svg-origin')),
        ta(e, R || u, !!R || n.originIsAbsolute, n.smooth !== !1, x)),
      (w = n.xOrigin || 0),
      (E = n.yOrigin || 0),
      x !== Hi &&
        ((A = x[0]),
        (P = x[1]),
        (j = x[2]),
        (z = x[3]),
        (c = O = x[4]),
        (h = I = x[5]),
        x.length === 6
          ? ((f = Math.sqrt(A * A + P * P)),
            (g = Math.sqrt(z * z + j * j)),
            (p = A || P ? Sr(P, A) * Qn : 0),
            (D = j || z ? Sr(j, z) * Qn + p : 0),
            D && (g *= Math.abs(Math.cos(D * jr))),
            n.svg && ((c -= w - (w * A + E * j)), (h -= E - (w * P + E * z))))
          : ((ce = x[6]),
            (ae = x[7]),
            (y = x[8]),
            (U = x[9]),
            (L = x[10]),
            (se = x[11]),
            (c = x[12]),
            (h = x[13]),
            (d = x[14]),
            ($ = Sr(ce, L)),
            (m = $ * Qn),
            $ &&
              ((T = Math.cos(-$)),
              (k = Math.sin(-$)),
              (R = O * T + y * k),
              (N = I * T + U * k),
              (H = ce * T + L * k),
              (y = O * -k + y * T),
              (U = I * -k + U * T),
              (L = ce * -k + L * T),
              (se = ae * -k + se * T),
              (O = R),
              (I = N),
              (ce = H)),
            ($ = Sr(-j, L)),
            (_ = $ * Qn),
            $ &&
              ((T = Math.cos(-$)),
              (k = Math.sin(-$)),
              (R = A * T - y * k),
              (N = P * T - U * k),
              (H = j * T - L * k),
              (se = z * k + se * T),
              (A = R),
              (P = N),
              (j = H)),
            ($ = Sr(P, A)),
            (p = $ * Qn),
            $ &&
              ((T = Math.cos($)),
              (k = Math.sin($)),
              (R = A * T + P * k),
              (N = O * T + I * k),
              (P = P * T - A * k),
              (I = I * T - O * k),
              (A = R),
              (O = N)),
            m &&
              Math.abs(m) + Math.abs(p) > 359.9 &&
              ((m = p = 0), (_ = 180 - _)),
            (f = Pe(Math.sqrt(A * A + P * P + j * j))),
            (g = Pe(Math.sqrt(I * I + ce * ce))),
            ($ = Sr(O, I)),
            (D = Math.abs($) > 2e-4 ? $ * Qn : 0),
            (v = se ? 1 / (se < 0 ? -se : se) : 0)),
        n.svg &&
          ((R = e.getAttribute('transform')),
          (n.forceCSS = e.setAttribute('transform', '') || !Oc(Ut(e, we))),
          R && e.setAttribute('transform', R))),
      Math.abs(D) > 90 &&
        Math.abs(D) < 270 &&
        (i
          ? ((f *= -1), (D += p <= 0 ? 180 : -180), (p += p <= 0 ? 180 : -180))
          : ((g *= -1), (D += D <= 0 ? 180 : -180))),
      (t = t || n.uncache),
      (n.x =
        c -
        ((n.xPercent =
          c &&
          ((!t && n.xPercent) ||
            (Math.round(e.offsetWidth / 2) === Math.round(-c) ? -50 : 0)))
          ? (e.offsetWidth * n.xPercent) / 100
          : 0) +
        s),
      (n.y =
        h -
        ((n.yPercent =
          h &&
          ((!t && n.yPercent) ||
            (Math.round(e.offsetHeight / 2) === Math.round(-h) ? -50 : 0)))
          ? (e.offsetHeight * n.yPercent) / 100
          : 0) +
        s),
      (n.z = d + s),
      (n.scaleX = Pe(f)),
      (n.scaleY = Pe(g)),
      (n.rotation = Pe(p) + a),
      (n.rotationX = Pe(m) + a),
      (n.rotationY = Pe(_) + a),
      (n.skewX = D + a),
      (n.skewY = C + a),
      (n.transformPerspective = v + s),
      (n.zOrigin = parseFloat(u.split(' ')[2]) || (!t && n.zOrigin) || 0) &&
        (r[Ct] = Vs(u)),
      (n.xOffset = n.yOffset = 0),
      (n.force3D = Lt.force3D),
      (n.renderTransform = n.svg ? of : $c ? Lc : sf),
      (n.uncache = 0),
      n
    )
  },
  Vs = function (e) {
    return (e = e.split(' '))[0] + ' ' + e[1]
  },
  wo = function (e, t, n) {
    var r = at(t)
    return Pe(parseFloat(t) + parseFloat(Hn(e, 'x', n + 'px', r))) + r
  },
  sf = function (e, t) {
    ;(t.z = '0px'),
      (t.rotationY = t.rotationX = '0deg'),
      (t.force3D = 0),
      Lc(e, t)
  },
  Kn = '0deg',
  oi = '0px',
  Jn = ') ',
  Lc = function (e, t) {
    var n = t || this,
      r = n.xPercent,
      i = n.yPercent,
      s = n.x,
      a = n.y,
      l = n.z,
      u = n.rotation,
      c = n.rotationY,
      h = n.rotationX,
      d = n.skewX,
      f = n.skewY,
      g = n.scaleX,
      p = n.scaleY,
      m = n.transformPerspective,
      _ = n.force3D,
      D = n.target,
      C = n.zOrigin,
      v = '',
      w = (_ === 'auto' && e && e !== 1) || _ === !0
    if (C && (h !== Kn || c !== Kn)) {
      var E = parseFloat(c) * jr,
        x = Math.sin(E),
        $ = Math.cos(E),
        T
      ;(E = parseFloat(h) * jr),
        (T = Math.cos(E)),
        (s = wo(D, s, x * T * -C)),
        (a = wo(D, a, -Math.sin(E) * -C)),
        (l = wo(D, l, $ * T * -C + C))
    }
    m !== oi && (v += 'perspective(' + m + Jn),
      (r || i) && (v += 'translate(' + r + '%, ' + i + '%) '),
      (w || s !== oi || a !== oi || l !== oi) &&
        (v +=
          l !== oi || w
            ? 'translate3d(' + s + ', ' + a + ', ' + l + ') '
            : 'translate(' + s + ', ' + a + Jn),
      u !== Kn && (v += 'rotate(' + u + Jn),
      c !== Kn && (v += 'rotateY(' + c + Jn),
      h !== Kn && (v += 'rotateX(' + h + Jn),
      (d !== Kn || f !== Kn) && (v += 'skew(' + d + ', ' + f + Jn),
      (g !== 1 || p !== 1) && (v += 'scale(' + g + ', ' + p + Jn),
      (D.style[we] = v || 'translate(0, 0)')
  },
  of = function (e, t) {
    var n = t || this,
      r = n.xPercent,
      i = n.yPercent,
      s = n.x,
      a = n.y,
      l = n.rotation,
      u = n.skewX,
      c = n.skewY,
      h = n.scaleX,
      d = n.scaleY,
      f = n.target,
      g = n.xOrigin,
      p = n.yOrigin,
      m = n.xOffset,
      _ = n.yOffset,
      D = n.forceCSS,
      C = parseFloat(s),
      v = parseFloat(a),
      w,
      E,
      x,
      $,
      T
    ;(l = parseFloat(l)),
      (u = parseFloat(u)),
      (c = parseFloat(c)),
      c && ((c = parseFloat(c)), (u += c), (l += c)),
      l || u
        ? ((l *= jr),
          (u *= jr),
          (w = Math.cos(l) * h),
          (E = Math.sin(l) * h),
          (x = Math.sin(l - u) * -d),
          ($ = Math.cos(l - u) * d),
          u &&
            ((c *= jr),
            (T = Math.tan(u - c)),
            (T = Math.sqrt(1 + T * T)),
            (x *= T),
            ($ *= T),
            c &&
              ((T = Math.tan(c)),
              (T = Math.sqrt(1 + T * T)),
              (w *= T),
              (E *= T))),
          (w = Pe(w)),
          (E = Pe(E)),
          (x = Pe(x)),
          ($ = Pe($)))
        : ((w = h), ($ = d), (E = x = 0)),
      ((C && !~(s + '').indexOf('px')) || (v && !~(a + '').indexOf('px'))) &&
        ((C = Hn(f, 'x', s, 'px')), (v = Hn(f, 'y', a, 'px'))),
      (g || p || m || _) &&
        ((C = Pe(C + g - (g * w + p * x) + m)),
        (v = Pe(v + p - (g * E + p * $) + _))),
      (r || i) &&
        ((T = f.getBBox()),
        (C = Pe(C + (r / 100) * T.width)),
        (v = Pe(v + (i / 100) * T.height))),
      (T =
        'matrix(' + w + ',' + E + ',' + x + ',' + $ + ',' + C + ',' + v + ')'),
      f.setAttribute('transform', T),
      D && (f.style[we] = T)
  },
  af = function (e, t, n, r, i) {
    var s = 360,
      a = Ge(i),
      l = parseFloat(i) * (a && ~i.indexOf('rad') ? Qn : 1),
      u = l - r,
      c = r + u + 'deg',
      h,
      d
    return (
      a &&
        ((h = i.split('_')[1]),
        h === 'short' &&
          ((u %= s), u !== u % (s / 2) && (u += u < 0 ? s : -360)),
        h === 'cw' && u < 0
          ? (u = ((u + s * xl) % s) - ~~(u / s) * s)
          : h === 'ccw' && u > 0 && (u = ((u - s * xl) % s) - ~~(u / s) * s)),
      (e._pt = d = new bt(e._pt, t, n, r, u, Ud)),
      (d.e = c),
      (d.u = 'deg'),
      e._props.push(n),
      d
    )
  },
  kl = function (e, t) {
    for (var n in t) e[n] = t[n]
    return e
  },
  lf = function (e, t, n) {
    var r = kl({}, n._gsap),
      i = 'perspective,force3D,transformOrigin,svgOrigin',
      s = n.style,
      a,
      l,
      u,
      c,
      h,
      d,
      f,
      g
    r.svg
      ? ((u = n.getAttribute('transform')),
        n.setAttribute('transform', ''),
        (s[we] = t),
        (a = Ui(n, 1)),
        pr(n, we),
        n.setAttribute('transform', u))
      : ((u = getComputedStyle(n)[we]),
        (s[we] = t),
        (a = Ui(n, 1)),
        (s[we] = u))
    for (l in wn)
      (u = r[l]),
        (c = a[l]),
        u !== c &&
          i.indexOf(l) < 0 &&
          ((f = at(u)),
          (g = at(c)),
          (h = f !== g ? Hn(n, l, u, g) : parseFloat(u)),
          (d = parseFloat(c)),
          (e._pt = new bt(e._pt, a, l, h, d - h, Zo)),
          (e._pt.u = g || 0),
          e._props.push(l))
    kl(a, r)
  }
xt('padding,margin,Width,Radius', function (o, e) {
  var t = 'Top',
    n = 'Right',
    r = 'Bottom',
    i = 'Left',
    s = (e < 3 ? [t, n, r, i] : [t + i, t + n, r + n, r + i]).map(function (a) {
      return e < 2 ? o + a : 'border' + a + o
    })
  Us[e > 1 ? 'border' + o : o] = function (a, l, u, c, h) {
    var d, f
    if (arguments.length < 4)
      return (
        (d = s.map(function (g) {
          return Dn(a, g, u)
        })),
        (f = d.join(' ')),
        f.split(d[0]).length === 5 ? d[0] : f
      )
    ;(d = (c + '').split(' ')),
      (f = {}),
      s.forEach(function (g, p) {
        return (f[g] = d[p] = d[p] || d[((p - 1) / 2) | 0])
      }),
      a.init(l, f, h)
  }
})
var Mc = {
  name: 'css',
  register: ea,
  targetTest: function (e) {
    return e.style && e.nodeType
  },
  init: function (e, t, n, r, i) {
    var s = this._props,
      a = e.style,
      l = n.vars.startAt,
      u,
      c,
      h,
      d,
      f,
      g,
      p,
      m,
      _,
      D,
      C,
      v,
      w,
      E,
      x,
      $
    qa || ea(),
      (this.styles = this.styles || kc(e)),
      ($ = this.styles.props),
      (this.tween = n)
    for (p in t)
      if (p !== 'autoRound' && ((c = t[p]), !($t[p] && _c(p, t, n, r, e, i)))) {
        if (
          ((f = typeof c),
          (g = Us[p]),
          f === 'function' && ((c = c.call(n, r, e, i)), (f = typeof c)),
          f === 'string' && ~c.indexOf('random(') && (c = Ni(c)),
          g)
        )
          g(this, e, p, c, n) && (x = 1)
        else if (p.substr(0, 2) === '--')
          (u = (getComputedStyle(e).getPropertyValue(p) + '').trim()),
            (c += ''),
            (In.lastIndex = 0),
            In.test(u) || ((m = at(u)), (_ = at(c))),
            _ ? m !== _ && (u = Hn(e, p, u, _) + _) : m && (c += m),
            this.add(a, 'setProperty', u, c, r, i, 0, 0, p),
            s.push(p),
            $.push(p, 0, a[p])
        else if (f !== 'undefined') {
          if (
            (l && p in l
              ? ((u = typeof l[p] == 'function' ? l[p].call(n, r, e, i) : l[p]),
                Ge(u) && ~u.indexOf('random(') && (u = Ni(u)),
                at(u + '') ||
                  u === 'auto' ||
                  (u += Lt.units[p] || at(Dn(e, p)) || ''),
                (u + '').charAt(1) === '=' && (u = Dn(e, p)))
              : (u = Dn(e, p)),
            (d = parseFloat(u)),
            (D = f === 'string' && c.charAt(1) === '=' && c.substr(0, 2)),
            D && (c = c.substr(2)),
            (h = parseFloat(c)),
            p in sn &&
              (p === 'autoAlpha' &&
                (d === 1 && Dn(e, 'visibility') === 'hidden' && h && (d = 0),
                $.push('visibility', 0, a.visibility),
                Ln(
                  this,
                  a,
                  'visibility',
                  d ? 'inherit' : 'hidden',
                  h ? 'inherit' : 'hidden',
                  !h
                )),
              p !== 'scale' &&
                p !== 'transform' &&
                ((p = sn[p]), ~p.indexOf(',') && (p = p.split(',')[0]))),
            (C = p in wn),
            C)
          ) {
            if (
              (this.styles.save(p),
              f === 'string' &&
                c.substring(0, 6) === 'var(--' &&
                ((c = Ut(e, c.substring(4, c.indexOf(')')))),
                (h = parseFloat(c))),
              v ||
                ((w = e._gsap),
                (w.renderTransform && !t.parseTransform) ||
                  Ui(e, t.parseTransform),
                (E = t.smoothOrigin !== !1 && w.smooth),
                (v = this._pt =
                  new bt(this._pt, a, we, 0, 1, w.renderTransform, w, 0, -1)),
                (v.dep = 1)),
              p === 'scale')
            )
              (this._pt = new bt(
                this._pt,
                w,
                'scaleY',
                w.scaleY,
                (D ? Ir(w.scaleY, D + h) : h) - w.scaleY || 0,
                Zo
              )),
                (this._pt.u = 0),
                s.push('scaleY', p),
                (p += 'X')
            else if (p === 'transformOrigin') {
              $.push(Ct, 0, a[Ct]),
                (c = nf(c)),
                w.svg
                  ? ta(e, c, 0, E, 0, this)
                  : ((_ = parseFloat(c.split(' ')[2]) || 0),
                    _ !== w.zOrigin && Ln(this, w, 'zOrigin', w.zOrigin, _),
                    Ln(this, a, p, Vs(u), Vs(c)))
              continue
            } else if (p === 'svgOrigin') {
              ta(e, c, 1, E, 0, this)
              continue
            } else if (p in Ac) {
              af(this, w, p, d, D ? Ir(d, D + c) : c)
              continue
            } else if (p === 'smoothOrigin') {
              Ln(this, w, 'smooth', w.smooth, c)
              continue
            } else if (p === 'force3D') {
              w[p] = c
              continue
            } else if (p === 'transform') {
              lf(this, c, e)
              continue
            }
          } else p in a || (p = Gr(p) || p)
          if (C || ((h || h === 0) && (d || d === 0) && !Hd.test(c) && p in a))
            (m = (u + '').substr((d + '').length)),
              h || (h = 0),
              (_ = at(c) || (p in Lt.units ? Lt.units[p] : m)),
              m !== _ && (d = Hn(e, p, u, _)),
              (this._pt = new bt(
                this._pt,
                C ? w : a,
                p,
                d,
                (D ? Ir(d, D + h) : h) - d,
                !C && (_ === 'px' || p === 'zIndex') && t.autoRound !== !1
                  ? qd
                  : Zo
              )),
              (this._pt.u = _ || 0),
              m !== _ && _ !== '%' && ((this._pt.b = u), (this._pt.r = Vd))
          else if (p in a) tf.call(this, e, p, u, D ? D + c : c)
          else if (p in e) this.add(e, p, u || e[p], D ? D + c : c, r, i)
          else if (p !== 'parseTransform') {
            Ma(p, c)
            continue
          }
          C ||
            (p in a
              ? $.push(p, 0, a[p])
              : typeof e[p] == 'function'
                ? $.push(p, 2, e[p]())
                : $.push(p, 1, u || e[p])),
            s.push(p)
        }
      }
    x && Cc(this)
  },
  render: function (e, t) {
    if (t.tween._time || !Ya())
      for (var n = t._pt; n; ) n.r(e, n.d), (n = n._next)
    else t.styles.revert()
  },
  get: Dn,
  aliases: sn,
  getSetter: function (e, t, n) {
    var r = sn[t]
    return (
      r && r.indexOf(',') < 0 && (t = r),
      t in wn && t !== Ct && (e._gsap.x || Dn(e, 'x'))
        ? n && vl === n
          ? t === 'scale'
            ? Gd
            : Xd
          : (vl = n || {}) && (t === 'scale' ? Kd : Jd)
        : e.style && !Aa(e.style[t])
          ? Yd
          : ~t.indexOf('-')
            ? Wd
            : Ua(e, t)
    )
  },
  core: { _removeProperty: pr, _getMatrix: Xa },
}
wt.utils.checkPrefix = Gr
wt.core.getStyleSaver = kc
;(function (o, e, t, n) {
  var r = xt(o + ',' + e + ',' + t, function (i) {
    wn[i] = 1
  })
  xt(e, function (i) {
    ;(Lt.units[i] = 'deg'), (Ac[i] = 1)
  }),
    (sn[r[13]] = o + ',' + e),
    xt(n, function (i) {
      var s = i.split(':')
      sn[s[1]] = r[s[0]]
    })
})(
  'x,y,z,scale,scaleX,scaleY,xPercent,yPercent',
  'rotation,rotationX,rotationY,skewX,skewY',
  'transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective',
  '0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY'
)
xt(
  'x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective',
  function (o) {
    Lt.units[o] = 'px'
  }
)
wt.registerPlugin(Mc)
var oe = wt.registerPlugin(Mc) || wt
oe.core.Tween
var uf = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
  cf = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
  hf = Math.PI / 180,
  ls = Math.sin,
  us = Math.cos,
  Ci = Math.abs,
  ai = Math.sqrt,
  df = function (e) {
    return typeof e == 'number'
  },
  $l = 1e5,
  $n = function (e) {
    return Math.round(e * $l) / $l || 0
  }
function ff(o, e, t, n, r, i, s) {
  for (var a = o.length, l, u, c, h, d; --a > -1; )
    for (l = o[a], u = l.length, c = 0; c < u; c += 2)
      (h = l[c]),
        (d = l[c + 1]),
        (l[c] = h * e + d * n + i),
        (l[c + 1] = h * t + d * r + s)
  return (o._dirty = 1), o
}
function pf(o, e, t, n, r, i, s, a, l) {
  if (!(o === a && e === l)) {
    ;(t = Ci(t)), (n = Ci(n))
    var u = (r % 360) * hf,
      c = us(u),
      h = ls(u),
      d = Math.PI,
      f = d * 2,
      g = (o - a) / 2,
      p = (e - l) / 2,
      m = c * g + h * p,
      _ = -h * g + c * p,
      D = m * m,
      C = _ * _,
      v = D / (t * t) + C / (n * n)
    v > 1 && ((t = ai(v) * t), (n = ai(v) * n))
    var w = t * t,
      E = n * n,
      x = (w * E - w * C - E * D) / (w * C + E * D)
    x < 0 && (x = 0)
    var $ = (i === s ? -1 : 1) * ai(x),
      T = $ * ((t * _) / n),
      k = $ * -((n * m) / t),
      A = (o + a) / 2,
      P = (e + l) / 2,
      j = A + (c * T - h * k),
      z = P + (h * T + c * k),
      O = (m - T) / t,
      I = (_ - k) / n,
      R = (-m - T) / t,
      N = (-_ - k) / n,
      H = O * O + I * I,
      y = (I < 0 ? -1 : 1) * Math.acos(O / ai(H)),
      U =
        (O * N - I * R < 0 ? -1 : 1) *
        Math.acos((O * R + I * N) / ai(H * (R * R + N * N)))
    isNaN(U) && (U = d),
      !s && U > 0 ? (U -= f) : s && U < 0 && (U += f),
      (y %= f),
      (U %= f)
    var L = Math.ceil(Ci(U) / (f / 4)),
      ae = [],
      se = U / L,
      ce = ((4 / 3) * ls(se / 2)) / (1 + us(se / 2)),
      de = c * t,
      he = h * t,
      Oe = h * -n,
      Le = c * n,
      _e
    for (_e = 0; _e < L; _e++)
      (r = y + _e * se),
        (m = us(r)),
        (_ = ls(r)),
        (O = us((r += se))),
        (I = ls(r)),
        ae.push(m - ce * _, _ + ce * m, O + ce * I, I - ce * O, O, I)
    for (_e = 0; _e < ae.length; _e += 2)
      (m = ae[_e]),
        (_ = ae[_e + 1]),
        (ae[_e] = m * de + _ * Oe + j),
        (ae[_e + 1] = m * he + _ * Le + z)
    return (ae[_e - 2] = a), (ae[_e - 1] = l), ae
  }
}
function gf(o) {
  var e =
      (o + '')
        .replace(cf, function (T) {
          var k = +T
          return k < 1e-4 && k > -1e-4 ? 0 : k
        })
        .match(uf) || [],
    t = [],
    n = 0,
    r = 0,
    i = 2 / 3,
    s = e.length,
    a = 0,
    l = 'ERROR: malformed path: ' + o,
    u,
    c,
    h,
    d,
    f,
    g,
    p,
    m,
    _,
    D,
    C,
    v,
    w,
    E,
    x,
    $ = function (k, A, P, j) {
      ;(D = (P - k) / 3),
        (C = (j - A) / 3),
        p.push(k + D, A + C, P - D, j - C, P, j)
    }
  if (!o || !isNaN(e[0]) || isNaN(e[1])) return t
  for (u = 0; u < s; u++)
    if (
      ((w = f),
      isNaN(e[u]) ? ((f = e[u].toUpperCase()), (g = f !== e[u])) : u--,
      (h = +e[u + 1]),
      (d = +e[u + 2]),
      g && ((h += n), (d += r)),
      u || ((m = h), (_ = d)),
      f === 'M')
    )
      p && (p.length < 8 ? (t.length -= 1) : (a += p.length)),
        (n = m = h),
        (r = _ = d),
        (p = [h, d]),
        t.push(p),
        (u += 2),
        (f = 'L')
    else if (f === 'C')
      p || (p = [0, 0]),
        g || (n = r = 0),
        p.push(
          h,
          d,
          n + e[u + 3] * 1,
          r + e[u + 4] * 1,
          (n += e[u + 5] * 1),
          (r += e[u + 6] * 1)
        ),
        (u += 6)
    else if (f === 'S')
      (D = n),
        (C = r),
        (w === 'C' || w === 'S') &&
          ((D += n - p[p.length - 4]), (C += r - p[p.length - 3])),
        g || (n = r = 0),
        p.push(D, C, h, d, (n += e[u + 3] * 1), (r += e[u + 4] * 1)),
        (u += 4)
    else if (f === 'Q')
      (D = n + (h - n) * i),
        (C = r + (d - r) * i),
        g || (n = r = 0),
        (n += e[u + 3] * 1),
        (r += e[u + 4] * 1),
        p.push(D, C, n + (h - n) * i, r + (d - r) * i, n, r),
        (u += 4)
    else if (f === 'T')
      (D = n - p[p.length - 4]),
        (C = r - p[p.length - 3]),
        p.push(
          n + D,
          r + C,
          h + (n + D * 1.5 - h) * i,
          d + (r + C * 1.5 - d) * i,
          (n = h),
          (r = d)
        ),
        (u += 2)
    else if (f === 'H') $(n, r, (n = h), r), (u += 1)
    else if (f === 'V') $(n, r, n, (r = h + (g ? r - n : 0))), (u += 1)
    else if (f === 'L' || f === 'Z')
      f === 'Z' && ((h = m), (d = _), (p.closed = !0)),
        (f === 'L' || Ci(n - h) > 0.5 || Ci(r - d) > 0.5) &&
          ($(n, r, h, d), f === 'L' && (u += 2)),
        (n = h),
        (r = d)
    else if (f === 'A') {
      if (
        ((E = e[u + 4]),
        (x = e[u + 5]),
        (D = e[u + 6]),
        (C = e[u + 7]),
        (c = 7),
        E.length > 1 &&
          (E.length < 3
            ? ((C = D), (D = x), c--)
            : ((C = x), (D = E.substr(2)), (c -= 2)),
          (x = E.charAt(1)),
          (E = E.charAt(0))),
        (v = pf(
          n,
          r,
          +e[u + 1],
          +e[u + 2],
          +e[u + 3],
          +E,
          +x,
          (g ? n : 0) + D * 1,
          (g ? r : 0) + C * 1
        )),
        (u += c),
        v)
      )
        for (c = 0; c < v.length; c++) p.push(v[c])
      ;(n = p[p.length - 2]), (r = p[p.length - 1])
    }
  return (
    (u = p.length),
    u < 6
      ? (t.pop(), (u = 0))
      : p[0] === p[u - 2] && p[1] === p[u - 1] && (p.closed = !0),
    (t.totalPoints = a + u),
    t
  )
}
function mf(o) {
  df(o[0]) && (o = [o])
  var e = '',
    t = o.length,
    n,
    r,
    i,
    s
  for (r = 0; r < t; r++) {
    for (
      s = o[r],
        e += 'M' + $n(s[0]) + ',' + $n(s[1]) + ' C',
        n = s.length,
        i = 2;
      i < n;
      i++
    )
      e +=
        $n(s[i++]) +
        ',' +
        $n(s[i++]) +
        ' ' +
        $n(s[i++]) +
        ',' +
        $n(s[i++]) +
        ' ' +
        $n(s[i++]) +
        ',' +
        $n(s[i]) +
        ' '
    s.closed && (e += 'z')
  }
  return e
}
var yt,
  Rc,
  zc = function () {
    return (
      yt ||
      (typeof window < 'u' && (yt = window.gsap) && yt.registerPlugin && yt)
    )
  },
  Pl = function () {
    ;(yt = zc()), yt && (yt.registerEase('_CE', ti.create), (Rc = 1))
  },
  _f = 1e20,
  cs = function (e) {
    return ~~(e * 1e3 + (e < 0 ? -0.5 : 0.5)) / 1e3
  },
  Df = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi,
  yf = /[cLlsSaAhHvVtTqQ]/g,
  vf = function (e) {
    var t = e.length,
      n = _f,
      r
    for (r = 1; r < t; r += 6) +e[r] < n && (n = +e[r])
    return n
  },
  xf = function (e, t, n) {
    !n && n !== 0 && (n = Math.max(+e[e.length - 1], +e[1]))
    var r = +e[0] * -1,
      i = -n,
      s = e.length,
      a = 1 / (+e[s - 2] + r),
      l =
        -t ||
        (Math.abs(+e[s - 1] - +e[1]) < 0.01 * (+e[s - 2] - +e[0])
          ? vf(e) + i
          : +e[s - 1] + i),
      u
    for (l ? (l = 1 / l) : (l = -a), u = 0; u < s; u += 2)
      (e[u] = (+e[u] + r) * a), (e[u + 1] = (+e[u + 1] + i) * l)
  },
  bf = function o(e, t, n, r, i, s, a, l, u, c, h) {
    var d = (e + n) / 2,
      f = (t + r) / 2,
      g = (n + i) / 2,
      p = (r + s) / 2,
      m = (i + a) / 2,
      _ = (s + l) / 2,
      D = (d + g) / 2,
      C = (f + p) / 2,
      v = (g + m) / 2,
      w = (p + _) / 2,
      E = (D + v) / 2,
      x = (C + w) / 2,
      $ = a - e,
      T = l - t,
      k = Math.abs((n - a) * T - (r - l) * $),
      A = Math.abs((i - a) * T - (s - l) * $),
      P
    return (
      c ||
        ((c = [
          { x: e, y: t },
          { x: a, y: l },
        ]),
        (h = 1)),
      c.splice(h || c.length - 1, 0, { x: E, y: x }),
      (k + A) * (k + A) > u * ($ * $ + T * T) &&
        ((P = c.length),
        o(e, t, d, f, D, C, E, x, u, c, h),
        o(E, x, v, w, m, _, a, l, u, c, h + 1 + (c.length - P))),
      c
    )
  },
  ti = (function () {
    function o(t, n, r) {
      Rc || Pl(), (this.id = t), this.setData(n, r)
    }
    var e = o.prototype
    return (
      (e.setData = function (n, r) {
        ;(r = r || {}), (n = n || '0,0,1,1')
        var i = n.match(Df),
          s = 1,
          a = [],
          l = [],
          u = r.precision || 1,
          c = u <= 1,
          h,
          d,
          f,
          g,
          p,
          m,
          _,
          D,
          C
        if (
          ((this.data = n),
          (yf.test(n) || (~n.indexOf('M') && n.indexOf('C') < 0)) &&
            (i = gf(n)[0]),
          (h = i.length),
          h === 4)
        )
          i.unshift(0, 0), i.push(1, 1), (h = 8)
        else if ((h - 2) % 6) throw 'Invalid CustomEase'
        for (
          (+i[0] != 0 || +i[h - 2] != 1) && xf(i, r.height, r.originY),
            this.segment = i,
            g = 2;
          g < h;
          g += 6
        )
          (d = { x: +i[g - 2], y: +i[g - 1] }),
            (f = { x: +i[g + 4], y: +i[g + 5] }),
            a.push(d, f),
            bf(
              d.x,
              d.y,
              +i[g],
              +i[g + 1],
              +i[g + 2],
              +i[g + 3],
              f.x,
              f.y,
              1 / (u * 2e5),
              a,
              a.length - 1
            )
        for (h = a.length, g = 0; g < h; g++)
          (_ = a[g]),
            (D = a[g - 1] || _),
            (_.x > D.x || (D.y !== _.y && D.x === _.x) || _ === D) && _.x <= 1
              ? ((D.cx = _.x - D.x),
                (D.cy = _.y - D.y),
                (D.n = _),
                (D.nx = _.x),
                c &&
                  g > 1 &&
                  Math.abs(D.cy / D.cx - a[g - 2].cy / a[g - 2].cx) > 2 &&
                  (c = 0),
                D.cx < s &&
                  (D.cx
                    ? (s = D.cx)
                    : ((D.cx = 0.001),
                      g === h - 1 &&
                        ((D.x -= 0.001), (s = Math.min(s, 0.001)), (c = 0)))))
              : (a.splice(g--, 1), h--)
        if (((h = (1 / s + 1) | 0), (p = 1 / h), (m = 0), (_ = a[0]), c)) {
          for (g = 0; g < h; g++)
            (C = g * p),
              _.nx < C && (_ = a[++m]),
              (d = _.y + ((C - _.x) / _.cx) * _.cy),
              (l[g] = { x: C, cx: p, y: d, cy: 0, nx: 9 }),
              g && (l[g - 1].cy = d - l[g - 1].y)
          ;(m = a[a.length - 1]),
            (l[h - 1].cy = m.y - d),
            (l[h - 1].cx = m.x - l[l.length - 1].x)
        } else {
          for (g = 0; g < h; g++) _.nx < g * p && (_ = a[++m]), (l[g] = _)
          m < a.length - 1 && (l[g - 1] = a[a.length - 2])
        }
        return (
          (this.ease = function (v) {
            var w = l[(v * h) | 0] || l[h - 1]
            return w.nx < v && (w = w.n), w.y + ((v - w.x) / w.cx) * w.cy
          }),
          (this.ease.custom = this),
          this.id && yt && yt.registerEase(this.id, this.ease),
          this
        )
      }),
      (e.getSVGData = function (n) {
        return o.getSVGData(this, n)
      }),
      (o.create = function (n, r, i) {
        return new o(n, r, i).ease
      }),
      (o.register = function (n) {
        ;(yt = n), Pl()
      }),
      (o.get = function (n) {
        return yt.parseEase(n)
      }),
      (o.getSVGData = function (n, r) {
        r = r || {}
        var i = r.width || 100,
          s = r.height || 100,
          a = r.x || 0,
          l = (r.y || 0) + s,
          u = yt.utils.toArray(r.path)[0],
          c,
          h,
          d,
          f,
          g,
          p,
          m,
          _,
          D,
          C
        if (
          (r.invert && ((s = -s), (l = 0)),
          typeof n == 'string' && (n = yt.parseEase(n)),
          n.custom && (n = n.custom),
          n instanceof o)
        )
          c = mf(ff([n.segment], i, 0, 0, -s, a, l))
        else {
          for (
            c = [a, l],
              m = Math.max(5, (r.precision || 1) * 200),
              f = 1 / m,
              m += 2,
              _ = 5 / m,
              D = cs(a + f * i),
              C = cs(l + n(f) * -s),
              h = (C - l) / (D - a),
              d = 2;
            d < m;
            d++
          )
            (g = cs(a + d * f * i)),
              (p = cs(l + n(d * f) * -s)),
              (Math.abs((p - C) / (g - D) - h) > _ || d === m - 1) &&
                (c.push(D, C), (h = (p - C) / (g - D))),
              (D = g),
              (C = p)
          c = 'M' + c.join(',')
        }
        return u && u.setAttribute('d', c), c
      }),
      o
    )
  })()
ti.version = '3.13.0'
ti.headless = !0
zc() && yt.registerPlugin(ti)
function Cf(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(o, n.key, n)
  }
}
function wf(o, e, t) {
  return e && Cf(o.prototype, e), o
}
var et,
  ks,
  At,
  Mn,
  Rn,
  Br,
  Ic,
  er,
  wi,
  Nc,
  vn,
  Kt,
  jc,
  Bc = function () {
    return (
      et ||
      (typeof window < 'u' && (et = window.gsap) && et.registerPlugin && et)
    )
  },
  Hc = 1,
  zr = [],
  Z = [],
  cn = [],
  Si = Date.now,
  na = function (e, t) {
    return t
  },
  Sf = function () {
    var e = wi.core,
      t = e.bridge || {},
      n = e._scrollers,
      r = e._proxies
    n.push.apply(n, Z),
      r.push.apply(r, cn),
      (Z = n),
      (cn = r),
      (na = function (s, a) {
        return t[s](a)
      })
  },
  Nn = function (e, t) {
    return ~cn.indexOf(e) && cn[cn.indexOf(e) + 1][t]
  },
  Ei = function (e) {
    return !!~Nc.indexOf(e)
  },
  dt = function (e, t, n, r, i) {
    return e.addEventListener(t, n, { passive: r !== !1, capture: !!i })
  },
  ht = function (e, t, n, r) {
    return e.removeEventListener(t, n, !!r)
  },
  hs = 'scrollLeft',
  ds = 'scrollTop',
  ra = function () {
    return (vn && vn.isPressed) || Z.cache++
  },
  qs = function (e, t) {
    var n = function r(i) {
      if (i || i === 0) {
        Hc && (At.history.scrollRestoration = 'manual')
        var s = vn && vn.isPressed
        ;(i = r.v = Math.round(i) || (vn && vn.iOS ? 1 : 0)),
          e(i),
          (r.cacheID = Z.cache),
          s && na('ss', i)
      } else
        (t || Z.cache !== r.cacheID || na('ref')) &&
          ((r.cacheID = Z.cache), (r.v = e()))
      return r.v + r.offset
    }
    return (n.offset = 0), e && n
  },
  _t = {
    s: hs,
    p: 'left',
    p2: 'Left',
    os: 'right',
    os2: 'Right',
    d: 'width',
    d2: 'Width',
    a: 'x',
    sc: qs(function (o) {
      return arguments.length
        ? At.scrollTo(o, Ve.sc())
        : At.pageXOffset || Mn[hs] || Rn[hs] || Br[hs] || 0
    }),
  },
  Ve = {
    s: ds,
    p: 'top',
    p2: 'Top',
    os: 'bottom',
    os2: 'Bottom',
    d: 'height',
    d2: 'Height',
    a: 'y',
    op: _t,
    sc: qs(function (o) {
      return arguments.length
        ? At.scrollTo(_t.sc(), o)
        : At.pageYOffset || Mn[ds] || Rn[ds] || Br[ds] || 0
    }),
  },
  Dt = function (e, t) {
    return (
      ((t && t._ctx && t._ctx.selector) || et.utils.toArray)(e)[0] ||
      (typeof e == 'string' && et.config().nullTargetWarn !== !1
        ? void 0
        : null)
    )
  },
  Ef = function (e, t) {
    for (var n = t.length; n--; ) if (t[n] === e || t[n].contains(e)) return !0
    return !1
  },
  Un = function (e, t) {
    var n = t.s,
      r = t.sc
    Ei(e) && (e = Mn.scrollingElement || Rn)
    var i = Z.indexOf(e),
      s = r === Ve.sc ? 1 : 2
    !~i && (i = Z.push(e) - 1), Z[i + s] || dt(e, 'scroll', ra)
    var a = Z[i + s],
      l =
        a ||
        (Z[i + s] =
          qs(Nn(e, n), !0) ||
          (Ei(e)
            ? r
            : qs(function (u) {
                return arguments.length ? (e[n] = u) : e[n]
              })))
    return (
      (l.target = e),
      a || (l.smooth = et.getProperty(e, 'scrollBehavior') === 'smooth'),
      l
    )
  },
  ia = function (e, t, n) {
    var r = e,
      i = e,
      s = Si(),
      a = s,
      l = t || 50,
      u = Math.max(500, l * 3),
      c = function (g, p) {
        var m = Si()
        p || m - s > l
          ? ((i = r), (r = g), (a = s), (s = m))
          : n
            ? (r += g)
            : (r = i + ((g - i) / (m - a)) * (s - a))
      },
      h = function () {
        ;(i = r = n ? 0 : r), (a = s = 0)
      },
      d = function (g) {
        var p = a,
          m = i,
          _ = Si()
        return (
          (g || g === 0) && g !== r && c(g),
          s === a || _ - a > u
            ? 0
            : ((r + (n ? m : -m)) / ((n ? _ : s) - p)) * 1e3
        )
      }
    return { update: c, reset: h, getVelocity: d }
  },
  li = function (e, t) {
    return (
      t && !e._gsapAllow && e.preventDefault(),
      e.changedTouches ? e.changedTouches[0] : e
    )
  },
  Fl = function (e) {
    var t = Math.max.apply(Math, e),
      n = Math.min.apply(Math, e)
    return Math.abs(t) >= Math.abs(n) ? t : n
  },
  Uc = function () {
    ;(wi = et.core.globals().ScrollTrigger), wi && wi.core && Sf()
  },
  Vc = function (e) {
    return (
      (et = e || Bc()),
      !ks &&
        et &&
        typeof document < 'u' &&
        document.body &&
        ((At = window),
        (Mn = document),
        (Rn = Mn.documentElement),
        (Br = Mn.body),
        (Nc = [At, Mn, Rn, Br]),
        et.utils.clamp,
        (jc = et.core.context || function () {}),
        (er = 'onpointerenter' in Br ? 'pointer' : 'mouse'),
        (Ic = Fe.isTouch =
          At.matchMedia &&
          At.matchMedia('(hover: none), (pointer: coarse)').matches
            ? 1
            : 'ontouchstart' in At ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0
              ? 2
              : 0),
        (Kt = Fe.eventTypes =
          (
            'ontouchstart' in Rn
              ? 'touchstart,touchmove,touchcancel,touchend'
              : 'onpointerdown' in Rn
                ? 'pointerdown,pointermove,pointercancel,pointerup'
                : 'mousedown,mousemove,mouseup,mouseup'
          ).split(',')),
        setTimeout(function () {
          return (Hc = 0)
        }, 500),
        Uc(),
        (ks = 1)),
      ks
    )
  }
_t.op = Ve
Z.cache = 0
var Fe = (function () {
  function o(t) {
    this.init(t)
  }
  var e = o.prototype
  return (
    (e.init = function (n) {
      ks || Vc(et), wi || Uc()
      var r = n.tolerance,
        i = n.dragMinimum,
        s = n.type,
        a = n.target,
        l = n.lineHeight,
        u = n.debounce,
        c = n.preventDefault,
        h = n.onStop,
        d = n.onStopDelay,
        f = n.ignore,
        g = n.wheelSpeed,
        p = n.event,
        m = n.onDragStart,
        _ = n.onDragEnd,
        D = n.onDrag,
        C = n.onPress,
        v = n.onRelease,
        w = n.onRight,
        E = n.onLeft,
        x = n.onUp,
        $ = n.onDown,
        T = n.onChangeX,
        k = n.onChangeY,
        A = n.onChange,
        P = n.onToggleX,
        j = n.onToggleY,
        z = n.onHover,
        O = n.onHoverEnd,
        I = n.onMove,
        R = n.ignoreCheck,
        N = n.isNormalizer,
        H = n.onGestureStart,
        y = n.onGestureEnd,
        U = n.onWheel,
        L = n.onEnable,
        ae = n.onDisable,
        se = n.onClick,
        ce = n.scrollSpeed,
        de = n.capture,
        he = n.allowClicks,
        Oe = n.lockAxis,
        Le = n.onLockAxis
      ;(this.target = a = Dt(a) || Rn),
        (this.vars = n),
        f && (f = et.utils.toArray(f)),
        (r = r || 1e-9),
        (i = i || 0),
        (g = g || 1),
        (ce = ce || 1),
        (s = s || 'wheel,touch,pointer'),
        (u = u !== !1),
        l || (l = parseFloat(At.getComputedStyle(Br).lineHeight) || 22)
      var _e,
        Be,
        Me,
        ee,
        De,
        xe,
        Ke,
        S = this,
        Je = 0,
        St = 0,
        zt = n.passive || (!c && n.passive !== !1),
        Se = Un(a, _t),
        dn = Un(a, Ve),
        Sn = Se(),
        qn = dn(),
        qe =
          ~s.indexOf('touch') &&
          !~s.indexOf('pointer') &&
          Kt[0] === 'pointerdown',
        En = Ei(a),
        ke = a.ownerDocument || Mn,
        qt = [0, 0, 0],
        It = [0, 0, 0],
        fn = 0,
        ni = function () {
          return (fn = Si())
        },
        Re = function (V, le) {
          return (
            ((S.event = V) && f && Ef(V.target, f)) ||
            (le && qe && V.pointerType !== 'touch') ||
            (R && R(V, le))
          )
        },
        is = function () {
          S._vx.reset(), S._vy.reset(), Be.pause(), h && h(S)
        },
        pn = function () {
          var V = (S.deltaX = Fl(qt)),
            le = (S.deltaY = Fl(It)),
            F = Math.abs(V) >= r,
            Y = Math.abs(le) >= r
          A && (F || Y) && A(S, V, le, qt, It),
            F &&
              (w && S.deltaX > 0 && w(S),
              E && S.deltaX < 0 && E(S),
              T && T(S),
              P && S.deltaX < 0 != Je < 0 && P(S),
              (Je = S.deltaX),
              (qt[0] = qt[1] = qt[2] = 0)),
            Y &&
              ($ && S.deltaY > 0 && $(S),
              x && S.deltaY < 0 && x(S),
              k && k(S),
              j && S.deltaY < 0 != St < 0 && j(S),
              (St = S.deltaY),
              (It[0] = It[1] = It[2] = 0)),
            (ee || Me) &&
              (I && I(S),
              Me && (m && Me === 1 && m(S), D && D(S), (Me = 0)),
              (ee = !1)),
            xe && !(xe = !1) && Le && Le(S),
            De && (U(S), (De = !1)),
            (_e = 0)
        },
        br = function (V, le, F) {
          ;(qt[F] += V),
            (It[F] += le),
            S._vx.update(V),
            S._vy.update(le),
            u ? _e || (_e = requestAnimationFrame(pn)) : pn()
        },
        Cr = function (V, le) {
          Oe &&
            !Ke &&
            ((S.axis = Ke = Math.abs(V) > Math.abs(le) ? 'x' : 'y'), (xe = !0)),
            Ke !== 'y' && ((qt[2] += V), S._vx.update(V, !0)),
            Ke !== 'x' && ((It[2] += le), S._vy.update(le, !0)),
            u ? _e || (_e = requestAnimationFrame(pn)) : pn()
        },
        Tn = function (V) {
          if (!Re(V, 1)) {
            V = li(V, c)
            var le = V.clientX,
              F = V.clientY,
              Y = le - S.x,
              B = F - S.y,
              W = S.isDragging
            ;(S.x = le),
              (S.y = F),
              (W ||
                ((Y || B) &&
                  (Math.abs(S.startX - le) >= i ||
                    Math.abs(S.startY - F) >= i))) &&
                ((Me = W ? 2 : 1), W || (S.isDragging = !0), Cr(Y, B))
          }
        },
        Yn = (S.onPress = function (X) {
          Re(X, 1) ||
            (X && X.button) ||
            ((S.axis = Ke = null),
            Be.pause(),
            (S.isPressed = !0),
            (X = li(X)),
            (Je = St = 0),
            (S.startX = S.x = X.clientX),
            (S.startY = S.y = X.clientY),
            S._vx.reset(),
            S._vy.reset(),
            dt(N ? a : ke, Kt[1], Tn, zt, !0),
            (S.deltaX = S.deltaY = 0),
            C && C(S))
        }),
        Q = (S.onRelease = function (X) {
          if (!Re(X, 1)) {
            ht(N ? a : ke, Kt[1], Tn, !0)
            var V = !isNaN(S.y - S.startY),
              le = S.isDragging,
              F =
                le &&
                (Math.abs(S.x - S.startX) > 3 || Math.abs(S.y - S.startY) > 3),
              Y = li(X)
            !F &&
              V &&
              (S._vx.reset(),
              S._vy.reset(),
              c &&
                he &&
                et.delayedCall(0.08, function () {
                  if (Si() - fn > 300 && !X.defaultPrevented) {
                    if (X.target.click) X.target.click()
                    else if (ke.createEvent) {
                      var B = ke.createEvent('MouseEvents')
                      B.initMouseEvent(
                        'click',
                        !0,
                        !0,
                        At,
                        1,
                        Y.screenX,
                        Y.screenY,
                        Y.clientX,
                        Y.clientY,
                        !1,
                        !1,
                        !1,
                        !1,
                        0,
                        null
                      ),
                        X.target.dispatchEvent(B)
                    }
                  }
                })),
              (S.isDragging = S.isGesturing = S.isPressed = !1),
              h && le && !N && Be.restart(!0),
              Me && pn(),
              _ && le && _(S),
              v && v(S, F)
          }
        }),
        Wn = function (V) {
          return (
            V.touches &&
            V.touches.length > 1 &&
            (S.isGesturing = !0) &&
            H(V, S.isDragging)
          )
        },
        Yt = function () {
          return (S.isGesturing = !1) || y(S)
        },
        Wt = function (V) {
          if (!Re(V)) {
            var le = Se(),
              F = dn()
            br((le - Sn) * ce, (F - qn) * ce, 1),
              (Sn = le),
              (qn = F),
              h && Be.restart(!0)
          }
        },
        Xt = function (V) {
          if (!Re(V)) {
            ;(V = li(V, c)), U && (De = !0)
            var le =
              (V.deltaMode === 1 ? l : V.deltaMode === 2 ? At.innerHeight : 1) *
              g
            br(V.deltaX * le, V.deltaY * le, 0), h && !N && Be.restart(!0)
          }
        },
        Xn = function (V) {
          if (!Re(V)) {
            var le = V.clientX,
              F = V.clientY,
              Y = le - S.x,
              B = F - S.y
            ;(S.x = le),
              (S.y = F),
              (ee = !0),
              h && Be.restart(!0),
              (Y || B) && Cr(Y, B)
          }
        },
        wr = function (V) {
          ;(S.event = V), z(S)
        },
        gn = function (V) {
          ;(S.event = V), O(S)
        },
        ri = function (V) {
          return Re(V) || (li(V, c) && se(S))
        }
      ;(Be = S._dc = et.delayedCall(d || 0.25, is).pause()),
        (S.deltaX = S.deltaY = 0),
        (S._vx = ia(0, 50, !0)),
        (S._vy = ia(0, 50, !0)),
        (S.scrollX = Se),
        (S.scrollY = dn),
        (S.isDragging = S.isGesturing = S.isPressed = !1),
        jc(this),
        (S.enable = function (X) {
          return (
            S.isEnabled ||
              (dt(En ? ke : a, 'scroll', ra),
              s.indexOf('scroll') >= 0 && dt(En ? ke : a, 'scroll', Wt, zt, de),
              s.indexOf('wheel') >= 0 && dt(a, 'wheel', Xt, zt, de),
              ((s.indexOf('touch') >= 0 && Ic) || s.indexOf('pointer') >= 0) &&
                (dt(a, Kt[0], Yn, zt, de),
                dt(ke, Kt[2], Q),
                dt(ke, Kt[3], Q),
                he && dt(a, 'click', ni, !0, !0),
                se && dt(a, 'click', ri),
                H && dt(ke, 'gesturestart', Wn),
                y && dt(ke, 'gestureend', Yt),
                z && dt(a, er + 'enter', wr),
                O && dt(a, er + 'leave', gn),
                I && dt(a, er + 'move', Xn)),
              (S.isEnabled = !0),
              (S.isDragging = S.isGesturing = S.isPressed = ee = Me = !1),
              S._vx.reset(),
              S._vy.reset(),
              (Sn = Se()),
              (qn = dn()),
              X && X.type && Yn(X),
              L && L(S)),
            S
          )
        }),
        (S.disable = function () {
          S.isEnabled &&
            (zr.filter(function (X) {
              return X !== S && Ei(X.target)
            }).length || ht(En ? ke : a, 'scroll', ra),
            S.isPressed &&
              (S._vx.reset(), S._vy.reset(), ht(N ? a : ke, Kt[1], Tn, !0)),
            ht(En ? ke : a, 'scroll', Wt, de),
            ht(a, 'wheel', Xt, de),
            ht(a, Kt[0], Yn, de),
            ht(ke, Kt[2], Q),
            ht(ke, Kt[3], Q),
            ht(a, 'click', ni, !0),
            ht(a, 'click', ri),
            ht(ke, 'gesturestart', Wn),
            ht(ke, 'gestureend', Yt),
            ht(a, er + 'enter', wr),
            ht(a, er + 'leave', gn),
            ht(a, er + 'move', Xn),
            (S.isEnabled = S.isPressed = S.isDragging = !1),
            ae && ae(S))
        }),
        (S.kill = S.revert =
          function () {
            S.disable()
            var X = zr.indexOf(S)
            X >= 0 && zr.splice(X, 1), vn === S && (vn = 0)
          }),
        zr.push(S),
        N && Ei(a) && (vn = S),
        S.enable(p)
    }),
    wf(o, [
      {
        key: 'velocityX',
        get: function () {
          return this._vx.getVelocity()
        },
      },
      {
        key: 'velocityY',
        get: function () {
          return this._vy.getVelocity()
        },
      },
    ]),
    o
  )
})()
Fe.version = '3.13.0'
Fe.create = function (o) {
  return new Fe(o)
}
Fe.register = Vc
Fe.getAll = function () {
  return zr.slice()
}
Fe.getById = function (o) {
  return zr.filter(function (e) {
    return e.vars.id === o
  })[0]
}
Bc() && et.registerPlugin(Fe)
var M,
  Ar,
  J,
  ge,
  Pt,
  ue,
  Ga,
  Ys,
  Vi,
  Ti,
  gi,
  fs,
  st,
  lo,
  sa,
  pt,
  Al,
  Ol,
  Or,
  qc,
  So,
  Yc,
  ft,
  oa,
  Wc,
  Xc,
  Pn,
  aa,
  Ka,
  Hr,
  Ja,
  Ws,
  la,
  Eo,
  ps = 1,
  ot = Date.now,
  To = ot(),
  Vt = 0,
  mi = 0,
  Ll = function (e, t, n) {
    var r = kt(e) && (e.substr(0, 6) === 'clamp(' || e.indexOf('max') > -1)
    return (n['_' + t + 'Clamp'] = r), r ? e.substr(6, e.length - 7) : e
  },
  Ml = function (e, t) {
    return t && (!kt(e) || e.substr(0, 6) !== 'clamp(') ? 'clamp(' + e + ')' : e
  },
  Tf = function o() {
    return mi && requestAnimationFrame(o)
  },
  Rl = function () {
    return (lo = 1)
  },
  zl = function () {
    return (lo = 0)
  },
  nn = function (e) {
    return e
  },
  _i = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0
  },
  Gc = function () {
    return typeof window < 'u'
  },
  Kc = function () {
    return M || (Gc() && (M = window.gsap) && M.registerPlugin && M)
  },
  gr = function (e) {
    return !!~Ga.indexOf(e)
  },
  Jc = function (e) {
    return (
      (e === 'Height' ? Ja : J['inner' + e]) ||
      Pt['client' + e] ||
      ue['client' + e]
    )
  },
  Zc = function (e) {
    return (
      Nn(e, 'getBoundingClientRect') ||
      (gr(e)
        ? function () {
            return (Os.width = J.innerWidth), (Os.height = Ja), Os
          }
        : function () {
            return yn(e)
          })
    )
  },
  kf = function (e, t, n) {
    var r = n.d,
      i = n.d2,
      s = n.a
    return (s = Nn(e, 'getBoundingClientRect'))
      ? function () {
          return s()[r]
        }
      : function () {
          return (t ? Jc(i) : e['client' + i]) || 0
        }
  },
  $f = function (e, t) {
    return !t || ~cn.indexOf(e)
      ? Zc(e)
      : function () {
          return Os
        }
  },
  on = function (e, t) {
    var n = t.s,
      r = t.d2,
      i = t.d,
      s = t.a
    return Math.max(
      0,
      (n = 'scroll' + r) && (s = Nn(e, n))
        ? s() - Zc(e)()[i]
        : gr(e)
          ? (Pt[n] || ue[n]) - Jc(r)
          : e[n] - e['offset' + r]
    )
  },
  gs = function (e, t) {
    for (var n = 0; n < Or.length; n += 3)
      (!t || ~t.indexOf(Or[n + 1])) && e(Or[n], Or[n + 1], Or[n + 2])
  },
  kt = function (e) {
    return typeof e == 'string'
  },
  lt = function (e) {
    return typeof e == 'function'
  },
  Di = function (e) {
    return typeof e == 'number'
  },
  tr = function (e) {
    return typeof e == 'object'
  },
  ui = function (e, t, n) {
    return e && e.progress(t ? 0 : 1) && n && e.pause()
  },
  ko = function (e, t) {
    if (e.enabled) {
      var n = e._ctx
        ? e._ctx.add(function () {
            return t(e)
          })
        : t(e)
      n && n.totalTime && (e.callbackAnimation = n)
    }
  },
  Er = Math.abs,
  Qc = 'left',
  eh = 'top',
  Za = 'right',
  Qa = 'bottom',
  hr = 'width',
  dr = 'height',
  ki = 'Right',
  $i = 'Left',
  Pi = 'Top',
  Fi = 'Bottom',
  ze = 'padding',
  jt = 'margin',
  Kr = 'Width',
  el = 'Height',
  Ue = 'px',
  Bt = function (e) {
    return J.getComputedStyle(e)
  },
  Pf = function (e) {
    var t = Bt(e).position
    e.style.position = t === 'absolute' || t === 'fixed' ? t : 'relative'
  },
  Il = function (e, t) {
    for (var n in t) n in e || (e[n] = t[n])
    return e
  },
  yn = function (e, t) {
    var n =
        t &&
        Bt(e)[sa] !== 'matrix(1, 0, 0, 1, 0, 0)' &&
        M.to(e, {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
        }).progress(1),
      r = e.getBoundingClientRect()
    return n && n.progress(0).kill(), r
  },
  Xs = function (e, t) {
    var n = t.d2
    return e['offset' + n] || e['client' + n] || 0
  },
  th = function (e) {
    var t = [],
      n = e.labels,
      r = e.duration(),
      i
    for (i in n) t.push(n[i] / r)
    return t
  },
  Ff = function (e) {
    return function (t) {
      return M.utils.snap(th(e), t)
    }
  },
  tl = function (e) {
    var t = M.utils.snap(e),
      n =
        Array.isArray(e) &&
        e.slice(0).sort(function (r, i) {
          return r - i
        })
    return n
      ? function (r, i, s) {
          s === void 0 && (s = 0.001)
          var a
          if (!i) return t(r)
          if (i > 0) {
            for (r -= s, a = 0; a < n.length; a++) if (n[a] >= r) return n[a]
            return n[a - 1]
          } else for (a = n.length, r += s; a--; ) if (n[a] <= r) return n[a]
          return n[0]
        }
      : function (r, i, s) {
          s === void 0 && (s = 0.001)
          var a = t(r)
          return !i || Math.abs(a - r) < s || a - r < 0 == i < 0
            ? a
            : t(i < 0 ? r - e : r + e)
        }
  },
  Af = function (e) {
    return function (t, n) {
      return tl(th(e))(t, n.direction)
    }
  },
  ms = function (e, t, n, r) {
    return n.split(',').forEach(function (i) {
      return e(t, i, r)
    })
  },
  Xe = function (e, t, n, r, i) {
    return e.addEventListener(t, n, { passive: !r, capture: !!i })
  },
  We = function (e, t, n, r) {
    return e.removeEventListener(t, n, !!r)
  },
  _s = function (e, t, n) {
    ;(n = n && n.wheelHandler), n && (e(t, 'wheel', n), e(t, 'touchmove', n))
  },
  Nl = {
    startColor: 'green',
    endColor: 'red',
    indent: 0,
    fontSize: '16px',
    fontWeight: 'normal',
  },
  Ds = { toggleActions: 'play', anticipatePin: 0 },
  Gs = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
  $s = function (e, t) {
    if (kt(e)) {
      var n = e.indexOf('='),
        r = ~n ? +(e.charAt(n - 1) + 1) * parseFloat(e.substr(n + 1)) : 0
      ~n && (e.indexOf('%') > n && (r *= t / 100), (e = e.substr(0, n - 1))),
        (e =
          r +
          (e in Gs
            ? Gs[e] * t
            : ~e.indexOf('%')
              ? (parseFloat(e) * t) / 100
              : parseFloat(e) || 0))
    }
    return e
  },
  ys = function (e, t, n, r, i, s, a, l) {
    var u = i.startColor,
      c = i.endColor,
      h = i.fontSize,
      d = i.indent,
      f = i.fontWeight,
      g = ge.createElement('div'),
      p = gr(n) || Nn(n, 'pinType') === 'fixed',
      m = e.indexOf('scroller') !== -1,
      _ = p ? ue : n,
      D = e.indexOf('start') !== -1,
      C = D ? u : c,
      v =
        'border-color:' +
        C +
        ';font-size:' +
        h +
        ';color:' +
        C +
        ';font-weight:' +
        f +
        ';pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;'
    return (
      (v += 'position:' + ((m || l) && p ? 'fixed;' : 'absolute;')),
      (m || l || !p) &&
        (v += (r === Ve ? Za : Qa) + ':' + (s + parseFloat(d)) + 'px;'),
      a &&
        (v +=
          'box-sizing:border-box;text-align:left;width:' +
          a.offsetWidth +
          'px;'),
      (g._isStart = D),
      g.setAttribute('class', 'gsap-marker-' + e + (t ? ' marker-' + t : '')),
      (g.style.cssText = v),
      (g.innerText = t || t === 0 ? e + '-' + t : e),
      _.children[0] ? _.insertBefore(g, _.children[0]) : _.appendChild(g),
      (g._offset = g['offset' + r.op.d2]),
      Ps(g, 0, r, D),
      g
    )
  },
  Ps = function (e, t, n, r) {
    var i = { display: 'block' },
      s = n[r ? 'os2' : 'p2'],
      a = n[r ? 'p2' : 'os2']
    ;(e._isFlipped = r),
      (i[n.a + 'Percent'] = r ? -100 : 0),
      (i[n.a] = r ? '1px' : 0),
      (i['border' + s + Kr] = 1),
      (i['border' + a + Kr] = 0),
      (i[n.p] = t + 'px'),
      M.set(e, i)
  },
  K = [],
  ua = {},
  qi,
  jl = function () {
    return ot() - Vt > 34 && (qi || (qi = requestAnimationFrame(bn)))
  },
  Tr = function () {
    ;(!ft || !ft.isPressed || ft.startX > ue.clientWidth) &&
      (Z.cache++,
      ft ? qi || (qi = requestAnimationFrame(bn)) : bn(),
      Vt || _r('scrollStart'),
      (Vt = ot()))
  },
  $o = function () {
    ;(Xc = J.innerWidth), (Wc = J.innerHeight)
  },
  yi = function (e) {
    Z.cache++,
      (e === !0 ||
        (!st &&
          !Yc &&
          !ge.fullscreenElement &&
          !ge.webkitFullscreenElement &&
          (!oa ||
            Xc !== J.innerWidth ||
            Math.abs(J.innerHeight - Wc) > J.innerHeight * 0.25))) &&
        Ys.restart(!0)
  },
  mr = {},
  Of = [],
  nh = function o() {
    return We(G, 'scrollEnd', o) || ir(!0)
  },
  _r = function (e) {
    return (
      (mr[e] &&
        mr[e].map(function (t) {
          return t()
        })) ||
      Of
    )
  },
  Tt = [],
  rh = function (e) {
    for (var t = 0; t < Tt.length; t += 5)
      (!e || (Tt[t + 4] && Tt[t + 4].query === e)) &&
        ((Tt[t].style.cssText = Tt[t + 1]),
        Tt[t].getBBox && Tt[t].setAttribute('transform', Tt[t + 2] || ''),
        (Tt[t + 3].uncache = 1))
  },
  nl = function (e, t) {
    var n
    for (pt = 0; pt < K.length; pt++)
      (n = K[pt]),
        n && (!t || n._ctx === t) && (e ? n.kill(1) : n.revert(!0, !0))
    ;(Ws = !0), t && rh(t), t || _r('revert')
  },
  ih = function (e, t) {
    Z.cache++,
      (t || !gt) &&
        Z.forEach(function (n) {
          return lt(n) && n.cacheID++ && (n.rec = 0)
        }),
      kt(e) && (J.history.scrollRestoration = Ka = e)
  },
  gt,
  fr = 0,
  Bl,
  Lf = function () {
    if (Bl !== fr) {
      var e = (Bl = fr)
      requestAnimationFrame(function () {
        return e === fr && ir(!0)
      })
    }
  },
  sh = function () {
    ue.appendChild(Hr),
      (Ja = (!ft && Hr.offsetHeight) || J.innerHeight),
      ue.removeChild(Hr)
  },
  Hl = function (e) {
    return Vi(
      '.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end'
    ).forEach(function (t) {
      return (t.style.display = e ? 'none' : 'block')
    })
  },
  ir = function (e, t) {
    if (
      ((Pt = ge.documentElement),
      (ue = ge.body),
      (Ga = [J, ge, Pt, ue]),
      Vt && !e && !Ws)
    ) {
      Xe(G, 'scrollEnd', nh)
      return
    }
    sh(),
      (gt = G.isRefreshing = !0),
      Z.forEach(function (r) {
        return lt(r) && ++r.cacheID && (r.rec = r())
      })
    var n = _r('refreshInit')
    qc && G.sort(),
      t || nl(),
      Z.forEach(function (r) {
        lt(r) && (r.smooth && (r.target.style.scrollBehavior = 'auto'), r(0))
      }),
      K.slice(0).forEach(function (r) {
        return r.refresh()
      }),
      (Ws = !1),
      K.forEach(function (r) {
        if (r._subPinOffset && r.pin) {
          var i = r.vars.horizontal ? 'offsetWidth' : 'offsetHeight',
            s = r.pin[i]
          r.revert(!0, 1), r.adjustPinSpacing(r.pin[i] - s), r.refresh()
        }
      }),
      (la = 1),
      Hl(!0),
      K.forEach(function (r) {
        var i = on(r.scroller, r._dir),
          s = r.vars.end === 'max' || (r._endClamp && r.end > i),
          a = r._startClamp && r.start >= i
        ;(s || a) &&
          r.setPositions(
            a ? i - 1 : r.start,
            s ? Math.max(a ? i : r.start + 1, i) : r.end,
            !0
          )
      }),
      Hl(!1),
      (la = 0),
      n.forEach(function (r) {
        return r && r.render && r.render(-1)
      }),
      Z.forEach(function (r) {
        lt(r) &&
          (r.smooth &&
            requestAnimationFrame(function () {
              return (r.target.style.scrollBehavior = 'smooth')
            }),
          r.rec && r(r.rec))
      }),
      ih(Ka, 1),
      Ys.pause(),
      fr++,
      (gt = 2),
      bn(2),
      K.forEach(function (r) {
        return lt(r.vars.onRefresh) && r.vars.onRefresh(r)
      }),
      (gt = G.isRefreshing = !1),
      _r('refresh')
  },
  ca = 0,
  Fs = 1,
  Ai,
  bn = function (e) {
    if (e === 2 || (!gt && !Ws)) {
      ;(G.isUpdating = !0), Ai && Ai.update(0)
      var t = K.length,
        n = ot(),
        r = n - To >= 50,
        i = t && K[0].scroll()
      if (
        ((Fs = ca > i ? -1 : 1),
        gt || (ca = i),
        r &&
          (Vt && !lo && n - Vt > 200 && ((Vt = 0), _r('scrollEnd')),
          (gi = To),
          (To = n)),
        Fs < 0)
      ) {
        for (pt = t; pt-- > 0; ) K[pt] && K[pt].update(0, r)
        Fs = 1
      } else for (pt = 0; pt < t; pt++) K[pt] && K[pt].update(0, r)
      G.isUpdating = !1
    }
    qi = 0
  },
  ha = [
    Qc,
    eh,
    Qa,
    Za,
    jt + Fi,
    jt + ki,
    jt + Pi,
    jt + $i,
    'display',
    'flexShrink',
    'float',
    'zIndex',
    'gridColumnStart',
    'gridColumnEnd',
    'gridRowStart',
    'gridRowEnd',
    'gridArea',
    'justifySelf',
    'alignSelf',
    'placeSelf',
    'order',
  ],
  As = ha.concat([
    hr,
    dr,
    'boxSizing',
    'max' + Kr,
    'max' + el,
    'position',
    jt,
    ze,
    ze + Pi,
    ze + ki,
    ze + Fi,
    ze + $i,
  ]),
  Mf = function (e, t, n) {
    Ur(n)
    var r = e._gsap
    if (r.spacerIsNative) Ur(r.spacerState)
    else if (e._gsap.swappedIn) {
      var i = t.parentNode
      i && (i.insertBefore(e, t), i.removeChild(t))
    }
    e._gsap.swappedIn = !1
  },
  Po = function (e, t, n, r) {
    if (!e._gsap.swappedIn) {
      for (var i = ha.length, s = t.style, a = e.style, l; i--; )
        (l = ha[i]), (s[l] = n[l])
      ;(s.position = n.position === 'absolute' ? 'absolute' : 'relative'),
        n.display === 'inline' && (s.display = 'inline-block'),
        (a[Qa] = a[Za] = 'auto'),
        (s.flexBasis = n.flexBasis || 'auto'),
        (s.overflow = 'visible'),
        (s.boxSizing = 'border-box'),
        (s[hr] = Xs(e, _t) + Ue),
        (s[dr] = Xs(e, Ve) + Ue),
        (s[ze] = a[jt] = a[eh] = a[Qc] = '0'),
        Ur(r),
        (a[hr] = a['max' + Kr] = n[hr]),
        (a[dr] = a['max' + el] = n[dr]),
        (a[ze] = n[ze]),
        e.parentNode !== t &&
          (e.parentNode.insertBefore(t, e), t.appendChild(e)),
        (e._gsap.swappedIn = !0)
    }
  },
  Rf = /([A-Z])/g,
  Ur = function (e) {
    if (e) {
      var t = e.t.style,
        n = e.length,
        r = 0,
        i,
        s
      for ((e.t._gsap || M.core.getCache(e.t)).uncache = 1; r < n; r += 2)
        (s = e[r + 1]),
          (i = e[r]),
          s
            ? (t[i] = s)
            : t[i] && t.removeProperty(i.replace(Rf, '-$1').toLowerCase())
    }
  },
  vs = function (e) {
    for (var t = As.length, n = e.style, r = [], i = 0; i < t; i++)
      r.push(As[i], n[As[i]])
    return (r.t = e), r
  },
  zf = function (e, t, n) {
    for (var r = [], i = e.length, s = n ? 8 : 0, a; s < i; s += 2)
      (a = e[s]), r.push(a, a in t ? t[a] : e[s + 1])
    return (r.t = e.t), r
  },
  Os = { left: 0, top: 0 },
  Ul = function (e, t, n, r, i, s, a, l, u, c, h, d, f, g) {
    lt(e) && (e = e(l)),
      kt(e) &&
        e.substr(0, 3) === 'max' &&
        (e = d + (e.charAt(4) === '=' ? $s('0' + e.substr(3), n) : 0))
    var p = f ? f.time() : 0,
      m,
      _,
      D
    if ((f && f.seek(0), isNaN(e) || (e = +e), Di(e)))
      f &&
        (e = M.utils.mapRange(
          f.scrollTrigger.start,
          f.scrollTrigger.end,
          0,
          d,
          e
        )),
        a && Ps(a, n, r, !0)
    else {
      lt(t) && (t = t(l))
      var C = (e || '0').split(' '),
        v,
        w,
        E,
        x
      ;(D = Dt(t, l) || ue),
        (v = yn(D) || {}),
        (!v || (!v.left && !v.top)) &&
          Bt(D).display === 'none' &&
          ((x = D.style.display),
          (D.style.display = 'block'),
          (v = yn(D)),
          x ? (D.style.display = x) : D.style.removeProperty('display')),
        (w = $s(C[0], v[r.d])),
        (E = $s(C[1] || '0', n)),
        (e = v[r.p] - u[r.p] - c + w + i - E),
        a && Ps(a, E, r, n - E < 20 || (a._isStart && E > 20)),
        (n -= n - E)
    }
    if ((g && ((l[g] = e || -0.001), e < 0 && (e = 0)), s)) {
      var $ = e + n,
        T = s._isStart
      ;(m = 'scroll' + r.d2),
        Ps(
          s,
          $,
          r,
          (T && $ > 20) ||
            (!T && (h ? Math.max(ue[m], Pt[m]) : s.parentNode[m]) <= $ + 1)
        ),
        h &&
          ((u = yn(a)),
          h && (s.style[r.op.p] = u[r.op.p] - r.op.m - s._offset + Ue))
    }
    return (
      f &&
        D &&
        ((m = yn(D)),
        f.seek(d),
        (_ = yn(D)),
        (f._caScrollDist = m[r.p] - _[r.p]),
        (e = (e / f._caScrollDist) * d)),
      f && f.seek(p),
      f ? e : Math.round(e)
    )
  },
  If = /(webkit|moz|length|cssText|inset)/i,
  Vl = function (e, t, n, r) {
    if (e.parentNode !== t) {
      var i = e.style,
        s,
        a
      if (t === ue) {
        ;(e._stOrig = i.cssText), (a = Bt(e))
        for (s in a)
          !+s &&
            !If.test(s) &&
            a[s] &&
            typeof i[s] == 'string' &&
            s !== '0' &&
            (i[s] = a[s])
        ;(i.top = n), (i.left = r)
      } else i.cssText = e._stOrig
      ;(M.core.getCache(e).uncache = 1), t.appendChild(e)
    }
  },
  oh = function (e, t, n) {
    var r = t,
      i = r
    return function (s) {
      var a = Math.round(e())
      return (
        a !== r &&
          a !== i &&
          Math.abs(a - r) > 3 &&
          Math.abs(a - i) > 3 &&
          ((s = a), n && n()),
        (i = r),
        (r = Math.round(s)),
        r
      )
    }
  },
  xs = function (e, t, n) {
    var r = {}
    ;(r[t.p] = '+=' + n), M.set(e, r)
  },
  ql = function (e, t) {
    var n = Un(e, t),
      r = '_scroll' + t.p2,
      i = function s(a, l, u, c, h) {
        var d = s.tween,
          f = l.onComplete,
          g = {}
        u = u || n()
        var p = oh(n, u, function () {
          d.kill(), (s.tween = 0)
        })
        return (
          (h = (c && h) || 0),
          (c = c || a - u),
          d && d.kill(),
          (l[r] = a),
          (l.inherit = !1),
          (l.modifiers = g),
          (g[r] = function () {
            return p(u + c * d.ratio + h * d.ratio * d.ratio)
          }),
          (l.onUpdate = function () {
            Z.cache++, s.tween && bn()
          }),
          (l.onComplete = function () {
            ;(s.tween = 0), f && f.call(d)
          }),
          (d = s.tween = M.to(e, l)),
          d
        )
      }
    return (
      (e[r] = n),
      (n.wheelHandler = function () {
        return i.tween && i.tween.kill() && (i.tween = 0)
      }),
      Xe(e, 'wheel', n.wheelHandler),
      G.isTouch && Xe(e, 'touchmove', n.wheelHandler),
      i
    )
  },
  G = (function () {
    function o(t, n) {
      Ar || o.register(M), aa(this), this.init(t, n)
    }
    var e = o.prototype
    return (
      (e.init = function (n, r) {
        if (
          ((this.progress = this.start = 0),
          this.vars && this.kill(!0, !0),
          !mi)
        ) {
          this.update = this.refresh = this.kill = nn
          return
        }
        n = Il(kt(n) || Di(n) || n.nodeType ? { trigger: n } : n, Ds)
        var i = n,
          s = i.onUpdate,
          a = i.toggleClass,
          l = i.id,
          u = i.onToggle,
          c = i.onRefresh,
          h = i.scrub,
          d = i.trigger,
          f = i.pin,
          g = i.pinSpacing,
          p = i.invalidateOnRefresh,
          m = i.anticipatePin,
          _ = i.onScrubComplete,
          D = i.onSnapComplete,
          C = i.once,
          v = i.snap,
          w = i.pinReparent,
          E = i.pinSpacer,
          x = i.containerAnimation,
          $ = i.fastScrollEnd,
          T = i.preventOverlaps,
          k =
            n.horizontal || (n.containerAnimation && n.horizontal !== !1)
              ? _t
              : Ve,
          A = !h && h !== 0,
          P = Dt(n.scroller || J),
          j = M.core.getCache(P),
          z = gr(P),
          O =
            ('pinType' in n
              ? n.pinType
              : Nn(P, 'pinType') || (z && 'fixed')) === 'fixed',
          I = [n.onEnter, n.onLeave, n.onEnterBack, n.onLeaveBack],
          R = A && n.toggleActions.split(' '),
          N = 'markers' in n ? n.markers : Ds.markers,
          H = z ? 0 : parseFloat(Bt(P)['border' + k.p2 + Kr]) || 0,
          y = this,
          U =
            n.onRefreshInit &&
            function () {
              return n.onRefreshInit(y)
            },
          L = kf(P, z, k),
          ae = $f(P, z),
          se = 0,
          ce = 0,
          de = 0,
          he = Un(P, k),
          Oe,
          Le,
          _e,
          Be,
          Me,
          ee,
          De,
          xe,
          Ke,
          S,
          Je,
          St,
          zt,
          Se,
          dn,
          Sn,
          qn,
          qe,
          En,
          ke,
          qt,
          It,
          fn,
          ni,
          Re,
          is,
          pn,
          br,
          Cr,
          Tn,
          Yn,
          Q,
          Wn,
          Yt,
          Wt,
          Xt,
          Xn,
          wr,
          gn
        if (
          ((y._startClamp = y._endClamp = !1),
          (y._dir = k),
          (m *= 45),
          (y.scroller = P),
          (y.scroll = x ? x.time.bind(x) : he),
          (Be = he()),
          (y.vars = n),
          (r = r || n.animation),
          'refreshPriority' in n &&
            ((qc = 1), n.refreshPriority === -9999 && (Ai = y)),
          (j.tweenScroll = j.tweenScroll || {
            top: ql(P, Ve),
            left: ql(P, _t),
          }),
          (y.tweenTo = Oe = j.tweenScroll[k.p]),
          (y.scrubDuration = function (F) {
            ;(Wn = Di(F) && F),
              Wn
                ? Q
                  ? Q.duration(F)
                  : (Q = M.to(r, {
                      ease: 'expo',
                      totalProgress: '+=0',
                      inherit: !1,
                      duration: Wn,
                      paused: !0,
                      onComplete: function () {
                        return _ && _(y)
                      },
                    }))
                : (Q && Q.progress(1).kill(), (Q = 0))
          }),
          r &&
            ((r.vars.lazy = !1),
            (r._initted && !y.isReverted) ||
              (r.vars.immediateRender !== !1 &&
                n.immediateRender !== !1 &&
                r.duration() &&
                r.render(0, !0, !0)),
            (y.animation = r.pause()),
            (r.scrollTrigger = y),
            y.scrubDuration(h),
            (Tn = 0),
            l || (l = r.vars.id)),
          v &&
            ((!tr(v) || v.push) && (v = { snapTo: v }),
            'scrollBehavior' in ue.style &&
              M.set(z ? [ue, Pt] : P, { scrollBehavior: 'auto' }),
            Z.forEach(function (F) {
              return (
                lt(F) &&
                F.target === (z ? ge.scrollingElement || Pt : P) &&
                (F.smooth = !1)
              )
            }),
            (_e = lt(v.snapTo)
              ? v.snapTo
              : v.snapTo === 'labels'
                ? Ff(r)
                : v.snapTo === 'labelsDirectional'
                  ? Af(r)
                  : v.directional !== !1
                    ? function (F, Y) {
                        return tl(v.snapTo)(
                          F,
                          ot() - ce < 500 ? 0 : Y.direction
                        )
                      }
                    : M.utils.snap(v.snapTo)),
            (Yt = v.duration || { min: 0.1, max: 2 }),
            (Yt = tr(Yt) ? Ti(Yt.min, Yt.max) : Ti(Yt, Yt)),
            (Wt = M.delayedCall(v.delay || Wn / 2 || 0.1, function () {
              var F = he(),
                Y = ot() - ce < 500,
                B = Oe.tween
              if (
                (Y || Math.abs(y.getVelocity()) < 10) &&
                !B &&
                !lo &&
                se !== F
              ) {
                var W = (F - ee) / Se,
                  Ye = r && !A ? r.totalProgress() : W,
                  te = Y ? 0 : ((Ye - Yn) / (ot() - gi)) * 1e3 || 0,
                  $e = M.utils.clamp(-W, 1 - W, (Er(te / 2) * te) / 0.185),
                  nt = W + (v.inertia === !1 ? 0 : $e),
                  Ee,
                  ye,
                  fe = v,
                  Gt = fe.onStart,
                  be = fe.onInterrupt,
                  Et = fe.onComplete
                if (
                  ((Ee = _e(nt, y)),
                  Di(Ee) || (Ee = nt),
                  (ye = Math.max(0, Math.round(ee + Ee * Se))),
                  F <= De && F >= ee && ye !== F)
                ) {
                  if (B && !B._initted && B.data <= Er(ye - F)) return
                  v.inertia === !1 && ($e = Ee - W),
                    Oe(
                      ye,
                      {
                        duration: Yt(
                          Er(
                            (Math.max(Er(nt - Ye), Er(Ee - Ye)) * 0.185) /
                              te /
                              0.05 || 0
                          )
                        ),
                        ease: v.ease || 'power3',
                        data: Er(ye - F),
                        onInterrupt: function () {
                          return Wt.restart(!0) && be && be(y)
                        },
                        onComplete: function () {
                          y.update(),
                            (se = he()),
                            r &&
                              !A &&
                              (Q
                                ? Q.resetTo(
                                    'totalProgress',
                                    Ee,
                                    r._tTime / r._tDur
                                  )
                                : r.progress(Ee)),
                            (Tn = Yn =
                              r && !A ? r.totalProgress() : y.progress),
                            D && D(y),
                            Et && Et(y)
                        },
                      },
                      F,
                      $e * Se,
                      ye - F - $e * Se
                    ),
                    Gt && Gt(y, Oe.tween)
                }
              } else y.isActive && se !== F && Wt.restart(!0)
            }).pause())),
          l && (ua[l] = y),
          (d = y.trigger = Dt(d || (f !== !0 && f))),
          (gn = d && d._gsap && d._gsap.stRevert),
          gn && (gn = gn(y)),
          (f = f === !0 ? d : Dt(f)),
          kt(a) && (a = { targets: d, className: a }),
          f &&
            (g === !1 ||
              g === jt ||
              (g =
                !g &&
                f.parentNode &&
                f.parentNode.style &&
                Bt(f.parentNode).display === 'flex'
                  ? !1
                  : ze),
            (y.pin = f),
            (Le = M.core.getCache(f)),
            Le.spacer
              ? (dn = Le.pinState)
              : (E &&
                  ((E = Dt(E)),
                  E && !E.nodeType && (E = E.current || E.nativeElement),
                  (Le.spacerIsNative = !!E),
                  E && (Le.spacerState = vs(E))),
                (Le.spacer = qe = E || ge.createElement('div')),
                qe.classList.add('pin-spacer'),
                l && qe.classList.add('pin-spacer-' + l),
                (Le.pinState = dn = vs(f))),
            n.force3D !== !1 && M.set(f, { force3D: !0 }),
            (y.spacer = qe = Le.spacer),
            (Cr = Bt(f)),
            (ni = Cr[g + k.os2]),
            (ke = M.getProperty(f)),
            (qt = M.quickSetter(f, k.a, Ue)),
            Po(f, qe, Cr),
            (qn = vs(f))),
          N)
        ) {
          ;(St = tr(N) ? Il(N, Nl) : Nl),
            (S = ys('scroller-start', l, P, k, St, 0)),
            (Je = ys('scroller-end', l, P, k, St, 0, S)),
            (En = S['offset' + k.op.d2])
          var ri = Dt(Nn(P, 'content') || P)
          ;(xe = this.markerStart = ys('start', l, ri, k, St, En, 0, x)),
            (Ke = this.markerEnd = ys('end', l, ri, k, St, En, 0, x)),
            x && (wr = M.quickSetter([xe, Ke], k.a, Ue)),
            !O &&
              !(cn.length && Nn(P, 'fixedMarkers') === !0) &&
              (Pf(z ? ue : P),
              M.set([S, Je], { force3D: !0 }),
              (is = M.quickSetter(S, k.a, Ue)),
              (br = M.quickSetter(Je, k.a, Ue)))
        }
        if (x) {
          var X = x.vars.onUpdate,
            V = x.vars.onUpdateParams
          x.eventCallback('onUpdate', function () {
            y.update(0, 0, 1), X && X.apply(x, V || [])
          })
        }
        if (
          ((y.previous = function () {
            return K[K.indexOf(y) - 1]
          }),
          (y.next = function () {
            return K[K.indexOf(y) + 1]
          }),
          (y.revert = function (F, Y) {
            if (!Y) return y.kill(!0)
            var B = F !== !1 || !y.enabled,
              W = st
            B !== y.isReverted &&
              (B &&
                ((Xt = Math.max(he(), y.scroll.rec || 0)),
                (de = y.progress),
                (Xn = r && r.progress())),
              xe &&
                [xe, Ke, S, Je].forEach(function (Ye) {
                  return (Ye.style.display = B ? 'none' : 'block')
                }),
              B && ((st = y), y.update(B)),
              f &&
                (!w || !y.isActive) &&
                (B ? Mf(f, qe, dn) : Po(f, qe, Bt(f), Re)),
              B || y.update(B),
              (st = W),
              (y.isReverted = B))
          }),
          (y.refresh = function (F, Y, B, W) {
            if (!((st || !y.enabled) && !Y)) {
              if (f && F && Vt) {
                Xe(o, 'scrollEnd', nh)
                return
              }
              !gt && U && U(y),
                (st = y),
                Oe.tween && !B && (Oe.tween.kill(), (Oe.tween = 0)),
                Q && Q.pause(),
                p &&
                  r &&
                  (r.revert({ kill: !1 }).invalidate(),
                  r.getChildren &&
                    r.getChildren(!0, !0, !1).forEach(function (kn) {
                      return kn.vars.immediateRender && kn.render(0, !0, !0)
                    })),
                y.isReverted || y.revert(!0, !0),
                (y._subPinOffset = !1)
              var Ye = L(),
                te = ae(),
                $e = x ? x.duration() : on(P, k),
                nt = Se <= 0.01 || !Se,
                Ee = 0,
                ye = W || 0,
                fe = tr(B) ? B.end : n.end,
                Gt = n.endTrigger || d,
                be = tr(B)
                  ? B.start
                  : n.start || (n.start === 0 || !d ? 0 : f ? '0 0' : '0 100%'),
                Et = (y.pinnedContainer =
                  n.pinnedContainer && Dt(n.pinnedContainer, y)),
                Jt = (d && Math.max(0, K.indexOf(y))) || 0,
                Ze = Jt,
                Qe,
                rt,
                Gn,
                ss,
                it,
                He,
                Zt,
                mo,
                cl,
                ii,
                Qt,
                si,
                os
              for (
                N &&
                tr(B) &&
                ((si = M.getProperty(S, k.p)), (os = M.getProperty(Je, k.p)));
                Ze-- > 0;

              )
                (He = K[Ze]),
                  He.end || He.refresh(0, 1) || (st = y),
                  (Zt = He.pin),
                  Zt &&
                    (Zt === d || Zt === f || Zt === Et) &&
                    !He.isReverted &&
                    (ii || (ii = []), ii.unshift(He), He.revert(!0, !0)),
                  He !== K[Ze] && (Jt--, Ze--)
              for (
                lt(be) && (be = be(y)),
                  be = Ll(be, 'start', y),
                  ee =
                    Ul(
                      be,
                      d,
                      Ye,
                      k,
                      he(),
                      xe,
                      S,
                      y,
                      te,
                      H,
                      O,
                      $e,
                      x,
                      y._startClamp && '_startClamp'
                    ) || (f ? -0.001 : 0),
                  lt(fe) && (fe = fe(y)),
                  kt(fe) &&
                    !fe.indexOf('+=') &&
                    (~fe.indexOf(' ')
                      ? (fe = (kt(be) ? be.split(' ')[0] : '') + fe)
                      : ((Ee = $s(fe.substr(2), Ye)),
                        (fe = kt(be)
                          ? be
                          : (x
                              ? M.utils.mapRange(
                                  0,
                                  x.duration(),
                                  x.scrollTrigger.start,
                                  x.scrollTrigger.end,
                                  ee
                                )
                              : ee) + Ee),
                        (Gt = d))),
                  fe = Ll(fe, 'end', y),
                  De =
                    Math.max(
                      ee,
                      Ul(
                        fe || (Gt ? '100% 0' : $e),
                        Gt,
                        Ye,
                        k,
                        he() + Ee,
                        Ke,
                        Je,
                        y,
                        te,
                        H,
                        O,
                        $e,
                        x,
                        y._endClamp && '_endClamp'
                      )
                    ) || -0.001,
                  Ee = 0,
                  Ze = Jt;
                Ze--;

              )
                (He = K[Ze]),
                  (Zt = He.pin),
                  Zt &&
                    He.start - He._pinPush <= ee &&
                    !x &&
                    He.end > 0 &&
                    ((Qe =
                      He.end -
                      (y._startClamp ? Math.max(0, He.start) : He.start)),
                    ((Zt === d && He.start - He._pinPush < ee) || Zt === Et) &&
                      isNaN(be) &&
                      (Ee += Qe * (1 - He.progress)),
                    Zt === f && (ye += Qe))
              if (
                ((ee += Ee),
                (De += Ee),
                y._startClamp && (y._startClamp += Ee),
                y._endClamp &&
                  !gt &&
                  ((y._endClamp = De || -0.001), (De = Math.min(De, on(P, k)))),
                (Se = De - ee || ((ee -= 0.01) && 0.001)),
                nt && (de = M.utils.clamp(0, 1, M.utils.normalize(ee, De, Xt))),
                (y._pinPush = ye),
                xe &&
                  Ee &&
                  ((Qe = {}),
                  (Qe[k.a] = '+=' + Ee),
                  Et && (Qe[k.p] = '-=' + he()),
                  M.set([xe, Ke], Qe)),
                f && !(la && y.end >= on(P, k)))
              )
                (Qe = Bt(f)),
                  (ss = k === Ve),
                  (Gn = he()),
                  (It = parseFloat(ke(k.a)) + ye),
                  !$e &&
                    De > 1 &&
                    ((Qt = (z ? ge.scrollingElement || Pt : P).style),
                    (Qt = {
                      style: Qt,
                      value: Qt['overflow' + k.a.toUpperCase()],
                    }),
                    z &&
                      Bt(ue)['overflow' + k.a.toUpperCase()] !== 'scroll' &&
                      (Qt.style['overflow' + k.a.toUpperCase()] = 'scroll')),
                  Po(f, qe, Qe),
                  (qn = vs(f)),
                  (rt = yn(f, !0)),
                  (mo = O && Un(P, ss ? _t : Ve)()),
                  g
                    ? ((Re = [g + k.os2, Se + ye + Ue]),
                      (Re.t = qe),
                      (Ze = g === ze ? Xs(f, k) + Se + ye : 0),
                      Ze &&
                        (Re.push(k.d, Ze + Ue),
                        qe.style.flexBasis !== 'auto' &&
                          (qe.style.flexBasis = Ze + Ue)),
                      Ur(Re),
                      Et &&
                        K.forEach(function (kn) {
                          kn.pin === Et &&
                            kn.vars.pinSpacing !== !1 &&
                            (kn._subPinOffset = !0)
                        }),
                      O && he(Xt))
                    : ((Ze = Xs(f, k)),
                      Ze &&
                        qe.style.flexBasis !== 'auto' &&
                        (qe.style.flexBasis = Ze + Ue)),
                  O &&
                    ((it = {
                      top: rt.top + (ss ? Gn - ee : mo) + Ue,
                      left: rt.left + (ss ? mo : Gn - ee) + Ue,
                      boxSizing: 'border-box',
                      position: 'fixed',
                    }),
                    (it[hr] = it['max' + Kr] = Math.ceil(rt.width) + Ue),
                    (it[dr] = it['max' + el] = Math.ceil(rt.height) + Ue),
                    (it[jt] =
                      it[jt + Pi] =
                      it[jt + ki] =
                      it[jt + Fi] =
                      it[jt + $i] =
                        '0'),
                    (it[ze] = Qe[ze]),
                    (it[ze + Pi] = Qe[ze + Pi]),
                    (it[ze + ki] = Qe[ze + ki]),
                    (it[ze + Fi] = Qe[ze + Fi]),
                    (it[ze + $i] = Qe[ze + $i]),
                    (Sn = zf(dn, it, w)),
                    gt && he(0)),
                  r
                    ? ((cl = r._initted),
                      So(1),
                      r.render(r.duration(), !0, !0),
                      (fn = ke(k.a) - It + Se + ye),
                      (pn = Math.abs(Se - fn) > 1),
                      O && pn && Sn.splice(Sn.length - 2, 2),
                      r.render(0, !0, !0),
                      cl || r.invalidate(!0),
                      r.parent || r.totalTime(r.totalTime()),
                      So(0))
                    : (fn = Se),
                  Qt &&
                    (Qt.value
                      ? (Qt.style['overflow' + k.a.toUpperCase()] = Qt.value)
                      : Qt.style.removeProperty('overflow-' + k.a))
              else if (d && he() && !x)
                for (rt = d.parentNode; rt && rt !== ue; )
                  rt._pinOffset &&
                    ((ee -= rt._pinOffset), (De -= rt._pinOffset)),
                    (rt = rt.parentNode)
              ii &&
                ii.forEach(function (kn) {
                  return kn.revert(!1, !0)
                }),
                (y.start = ee),
                (y.end = De),
                (Be = Me = gt ? Xt : he()),
                !x && !gt && (Be < Xt && he(Xt), (y.scroll.rec = 0)),
                y.revert(!1, !0),
                (ce = ot()),
                Wt && ((se = -1), Wt.restart(!0)),
                (st = 0),
                r &&
                  A &&
                  (r._initted || Xn) &&
                  r.progress() !== Xn &&
                  r.progress(Xn || 0, !0).render(r.time(), !0, !0),
                (nt || de !== y.progress || x || p || (r && !r._initted)) &&
                  (r &&
                    !A &&
                    (r._initted || de || r.vars.immediateRender !== !1) &&
                    r.totalProgress(
                      x && ee < -0.001 && !de
                        ? M.utils.normalize(ee, De, 0)
                        : de,
                      !0
                    ),
                  (y.progress = nt || (Be - ee) / Se === de ? 0 : de)),
                f && g && (qe._pinOffset = Math.round(y.progress * fn)),
                Q && Q.invalidate(),
                isNaN(si) ||
                  ((si -= M.getProperty(S, k.p)),
                  (os -= M.getProperty(Je, k.p)),
                  xs(S, k, si),
                  xs(xe, k, si - (W || 0)),
                  xs(Je, k, os),
                  xs(Ke, k, os - (W || 0))),
                nt && !gt && y.update(),
                c && !gt && !zt && ((zt = !0), c(y), (zt = !1))
            }
          }),
          (y.getVelocity = function () {
            return ((he() - Me) / (ot() - gi)) * 1e3 || 0
          }),
          (y.endAnimation = function () {
            ui(y.callbackAnimation),
              r &&
                (Q
                  ? Q.progress(1)
                  : r.paused()
                    ? A || ui(r, y.direction < 0, 1)
                    : ui(r, r.reversed()))
          }),
          (y.labelToScroll = function (F) {
            return (
              (r &&
                r.labels &&
                (ee || y.refresh() || ee) +
                  (r.labels[F] / r.duration()) * Se) ||
              0
            )
          }),
          (y.getTrailing = function (F) {
            var Y = K.indexOf(y),
              B = y.direction > 0 ? K.slice(0, Y).reverse() : K.slice(Y + 1)
            return (
              kt(F)
                ? B.filter(function (W) {
                    return W.vars.preventOverlaps === F
                  })
                : B
            ).filter(function (W) {
              return y.direction > 0 ? W.end <= ee : W.start >= De
            })
          }),
          (y.update = function (F, Y, B) {
            if (!(x && !B && !F)) {
              var W = gt === !0 ? Xt : y.scroll(),
                Ye = F ? 0 : (W - ee) / Se,
                te = Ye < 0 ? 0 : Ye > 1 ? 1 : Ye || 0,
                $e = y.progress,
                nt,
                Ee,
                ye,
                fe,
                Gt,
                be,
                Et,
                Jt
              if (
                (Y &&
                  ((Me = Be),
                  (Be = x ? he() : W),
                  v && ((Yn = Tn), (Tn = r && !A ? r.totalProgress() : te))),
                m &&
                  f &&
                  !st &&
                  !ps &&
                  Vt &&
                  (!te && ee < W + ((W - Me) / (ot() - gi)) * m
                    ? (te = 1e-4)
                    : te === 1 &&
                      De > W + ((W - Me) / (ot() - gi)) * m &&
                      (te = 0.9999)),
                te !== $e && y.enabled)
              ) {
                if (
                  ((nt = y.isActive = !!te && te < 1),
                  (Ee = !!$e && $e < 1),
                  (be = nt !== Ee),
                  (Gt = be || !!te != !!$e),
                  (y.direction = te > $e ? 1 : -1),
                  (y.progress = te),
                  Gt &&
                    !st &&
                    ((ye = te && !$e ? 0 : te === 1 ? 1 : $e === 1 ? 2 : 3),
                    A &&
                      ((fe =
                        (!be && R[ye + 1] !== 'none' && R[ye + 1]) || R[ye]),
                      (Jt =
                        r &&
                        (fe === 'complete' || fe === 'reset' || fe in r)))),
                  T &&
                    (be || Jt) &&
                    (Jt || h || !r) &&
                    (lt(T)
                      ? T(y)
                      : y.getTrailing(T).forEach(function (Gn) {
                          return Gn.endAnimation()
                        })),
                  A ||
                    (Q && !st && !ps
                      ? (Q._dp._time - Q._start !== Q._time &&
                          Q.render(Q._dp._time - Q._start),
                        Q.resetTo
                          ? Q.resetTo('totalProgress', te, r._tTime / r._tDur)
                          : ((Q.vars.totalProgress = te),
                            Q.invalidate().restart()))
                      : r && r.totalProgress(te, !!(st && (ce || F)))),
                  f)
                ) {
                  if ((F && g && (qe.style[g + k.os2] = ni), !O))
                    qt(_i(It + fn * te))
                  else if (Gt) {
                    if (
                      ((Et = !F && te > $e && De + 1 > W && W + 1 >= on(P, k)),
                      w)
                    )
                      if (!F && (nt || Et)) {
                        var Ze = yn(f, !0),
                          Qe = W - ee
                        Vl(
                          f,
                          ue,
                          Ze.top + (k === Ve ? Qe : 0) + Ue,
                          Ze.left + (k === Ve ? 0 : Qe) + Ue
                        )
                      } else Vl(f, qe)
                    Ur(nt || Et ? Sn : qn),
                      (pn && te < 1 && nt) ||
                        qt(It + (te === 1 && !Et ? fn : 0))
                  }
                }
                v && !Oe.tween && !st && !ps && Wt.restart(!0),
                  a &&
                    (be || (C && te && (te < 1 || !Eo))) &&
                    Vi(a.targets).forEach(function (Gn) {
                      return Gn.classList[nt || C ? 'add' : 'remove'](
                        a.className
                      )
                    }),
                  s && !A && !F && s(y),
                  Gt && !st
                    ? (A &&
                        (Jt &&
                          (fe === 'complete'
                            ? r.pause().totalProgress(1)
                            : fe === 'reset'
                              ? r.restart(!0).pause()
                              : fe === 'restart'
                                ? r.restart(!0)
                                : r[fe]()),
                        s && s(y)),
                      (be || !Eo) &&
                        (u && be && ko(y, u),
                        I[ye] && ko(y, I[ye]),
                        C && (te === 1 ? y.kill(!1, 1) : (I[ye] = 0)),
                        be || ((ye = te === 1 ? 1 : 3), I[ye] && ko(y, I[ye]))),
                      $ &&
                        !nt &&
                        Math.abs(y.getVelocity()) > (Di($) ? $ : 2500) &&
                        (ui(y.callbackAnimation),
                        Q
                          ? Q.progress(1)
                          : ui(r, fe === 'reverse' ? 1 : !te, 1)))
                    : A && s && !st && s(y)
              }
              if (br) {
                var rt = x ? (W / x.duration()) * (x._caScrollDist || 0) : W
                is(rt + (S._isFlipped ? 1 : 0)), br(rt)
              }
              wr && wr((-W / x.duration()) * (x._caScrollDist || 0))
            }
          }),
          (y.enable = function (F, Y) {
            y.enabled ||
              ((y.enabled = !0),
              Xe(P, 'resize', yi),
              z || Xe(P, 'scroll', Tr),
              U && Xe(o, 'refreshInit', U),
              F !== !1 && ((y.progress = de = 0), (Be = Me = se = he())),
              Y !== !1 && y.refresh())
          }),
          (y.getTween = function (F) {
            return F && Oe ? Oe.tween : Q
          }),
          (y.setPositions = function (F, Y, B, W) {
            if (x) {
              var Ye = x.scrollTrigger,
                te = x.duration(),
                $e = Ye.end - Ye.start
              ;(F = Ye.start + ($e * F) / te), (Y = Ye.start + ($e * Y) / te)
            }
            y.refresh(
              !1,
              !1,
              {
                start: Ml(F, B && !!y._startClamp),
                end: Ml(Y, B && !!y._endClamp),
              },
              W
            ),
              y.update()
          }),
          (y.adjustPinSpacing = function (F) {
            if (Re && F) {
              var Y = Re.indexOf(k.d) + 1
              ;(Re[Y] = parseFloat(Re[Y]) + F + Ue),
                (Re[1] = parseFloat(Re[1]) + F + Ue),
                Ur(Re)
            }
          }),
          (y.disable = function (F, Y) {
            if (
              y.enabled &&
              (F !== !1 && y.revert(!0, !0),
              (y.enabled = y.isActive = !1),
              Y || (Q && Q.pause()),
              (Xt = 0),
              Le && (Le.uncache = 1),
              U && We(o, 'refreshInit', U),
              Wt && (Wt.pause(), Oe.tween && Oe.tween.kill() && (Oe.tween = 0)),
              !z)
            ) {
              for (var B = K.length; B--; )
                if (K[B].scroller === P && K[B] !== y) return
              We(P, 'resize', yi), z || We(P, 'scroll', Tr)
            }
          }),
          (y.kill = function (F, Y) {
            y.disable(F, Y), Q && !Y && Q.kill(), l && delete ua[l]
            var B = K.indexOf(y)
            B >= 0 && K.splice(B, 1),
              B === pt && Fs > 0 && pt--,
              (B = 0),
              K.forEach(function (W) {
                return W.scroller === y.scroller && (B = 1)
              }),
              B || gt || (y.scroll.rec = 0),
              r &&
                ((r.scrollTrigger = null),
                F && r.revert({ kill: !1 }),
                Y || r.kill()),
              xe &&
                [xe, Ke, S, Je].forEach(function (W) {
                  return W.parentNode && W.parentNode.removeChild(W)
                }),
              Ai === y && (Ai = 0),
              f &&
                (Le && (Le.uncache = 1),
                (B = 0),
                K.forEach(function (W) {
                  return W.pin === f && B++
                }),
                B || (Le.spacer = 0)),
              n.onKill && n.onKill(y)
          }),
          K.push(y),
          y.enable(!1, !1),
          gn && gn(y),
          r && r.add && !Se)
        ) {
          var le = y.update
          ;(y.update = function () {
            ;(y.update = le), Z.cache++, ee || De || y.refresh()
          }),
            M.delayedCall(0.01, y.update),
            (Se = 0.01),
            (ee = De = 0)
        } else y.refresh()
        f && Lf()
      }),
      (o.register = function (n) {
        return (
          Ar ||
            ((M = n || Kc()), Gc() && window.document && o.enable(), (Ar = mi)),
          Ar
        )
      }),
      (o.defaults = function (n) {
        if (n) for (var r in n) Ds[r] = n[r]
        return Ds
      }),
      (o.disable = function (n, r) {
        ;(mi = 0),
          K.forEach(function (s) {
            return s[r ? 'kill' : 'disable'](n)
          }),
          We(J, 'wheel', Tr),
          We(ge, 'scroll', Tr),
          clearInterval(fs),
          We(ge, 'touchcancel', nn),
          We(ue, 'touchstart', nn),
          ms(We, ge, 'pointerdown,touchstart,mousedown', Rl),
          ms(We, ge, 'pointerup,touchend,mouseup', zl),
          Ys.kill(),
          gs(We)
        for (var i = 0; i < Z.length; i += 3)
          _s(We, Z[i], Z[i + 1]), _s(We, Z[i], Z[i + 2])
      }),
      (o.enable = function () {
        if (
          ((J = window),
          (ge = document),
          (Pt = ge.documentElement),
          (ue = ge.body),
          M &&
            ((Vi = M.utils.toArray),
            (Ti = M.utils.clamp),
            (aa = M.core.context || nn),
            (So = M.core.suppressOverwrites || nn),
            (Ka = J.history.scrollRestoration || 'auto'),
            (ca = J.pageYOffset || 0),
            M.core.globals('ScrollTrigger', o),
            ue))
        ) {
          ;(mi = 1),
            (Hr = document.createElement('div')),
            (Hr.style.height = '100vh'),
            (Hr.style.position = 'absolute'),
            sh(),
            Tf(),
            Fe.register(M),
            (o.isTouch = Fe.isTouch),
            (Pn =
              Fe.isTouch &&
              /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
            (oa = Fe.isTouch === 1),
            Xe(J, 'wheel', Tr),
            (Ga = [J, ge, Pt, ue]),
            M.matchMedia &&
              ((o.matchMedia = function (u) {
                var c = M.matchMedia(),
                  h
                for (h in u) c.add(h, u[h])
                return c
              }),
              M.addEventListener('matchMediaInit', function () {
                return nl()
              }),
              M.addEventListener('matchMediaRevert', function () {
                return rh()
              }),
              M.addEventListener('matchMedia', function () {
                ir(0, 1), _r('matchMedia')
              }),
              M.matchMedia().add('(orientation: portrait)', function () {
                return $o(), $o
              })),
            $o(),
            Xe(ge, 'scroll', Tr)
          var n = ue.hasAttribute('style'),
            r = ue.style,
            i = r.borderTopStyle,
            s = M.core.Animation.prototype,
            a,
            l
          for (
            s.revert ||
              Object.defineProperty(s, 'revert', {
                value: function () {
                  return this.time(-0.01, !0)
                },
              }),
              r.borderTopStyle = 'solid',
              a = yn(ue),
              Ve.m = Math.round(a.top + Ve.sc()) || 0,
              _t.m = Math.round(a.left + _t.sc()) || 0,
              i ? (r.borderTopStyle = i) : r.removeProperty('border-top-style'),
              n || (ue.setAttribute('style', ''), ue.removeAttribute('style')),
              fs = setInterval(jl, 250),
              M.delayedCall(0.5, function () {
                return (ps = 0)
              }),
              Xe(ge, 'touchcancel', nn),
              Xe(ue, 'touchstart', nn),
              ms(Xe, ge, 'pointerdown,touchstart,mousedown', Rl),
              ms(Xe, ge, 'pointerup,touchend,mouseup', zl),
              sa = M.utils.checkPrefix('transform'),
              As.push(sa),
              Ar = ot(),
              Ys = M.delayedCall(0.2, ir).pause(),
              Or = [
                ge,
                'visibilitychange',
                function () {
                  var u = J.innerWidth,
                    c = J.innerHeight
                  ge.hidden
                    ? ((Al = u), (Ol = c))
                    : (Al !== u || Ol !== c) && yi()
                },
                ge,
                'DOMContentLoaded',
                ir,
                J,
                'load',
                ir,
                J,
                'resize',
                yi,
              ],
              gs(Xe),
              K.forEach(function (u) {
                return u.enable(0, 1)
              }),
              l = 0;
            l < Z.length;
            l += 3
          )
            _s(We, Z[l], Z[l + 1]), _s(We, Z[l], Z[l + 2])
        }
      }),
      (o.config = function (n) {
        'limitCallbacks' in n && (Eo = !!n.limitCallbacks)
        var r = n.syncInterval
        ;(r && clearInterval(fs)) || ((fs = r) && setInterval(jl, r)),
          'ignoreMobileResize' in n &&
            (oa = o.isTouch === 1 && n.ignoreMobileResize),
          'autoRefreshEvents' in n &&
            (gs(We) || gs(Xe, n.autoRefreshEvents || 'none'),
            (Yc = (n.autoRefreshEvents + '').indexOf('resize') === -1))
      }),
      (o.scrollerProxy = function (n, r) {
        var i = Dt(n),
          s = Z.indexOf(i),
          a = gr(i)
        ~s && Z.splice(s, a ? 6 : 2),
          r && (a ? cn.unshift(J, r, ue, r, Pt, r) : cn.unshift(i, r))
      }),
      (o.clearMatchMedia = function (n) {
        K.forEach(function (r) {
          return r._ctx && r._ctx.query === n && r._ctx.kill(!0, !0)
        })
      }),
      (o.isInViewport = function (n, r, i) {
        var s = (kt(n) ? Dt(n) : n).getBoundingClientRect(),
          a = s[i ? hr : dr] * r || 0
        return i
          ? s.right - a > 0 && s.left + a < J.innerWidth
          : s.bottom - a > 0 && s.top + a < J.innerHeight
      }),
      (o.positionInViewport = function (n, r, i) {
        kt(n) && (n = Dt(n))
        var s = n.getBoundingClientRect(),
          a = s[i ? hr : dr],
          l =
            r == null
              ? a / 2
              : r in Gs
                ? Gs[r] * a
                : ~r.indexOf('%')
                  ? (parseFloat(r) * a) / 100
                  : parseFloat(r) || 0
        return i ? (s.left + l) / J.innerWidth : (s.top + l) / J.innerHeight
      }),
      (o.killAll = function (n) {
        if (
          (K.slice(0).forEach(function (i) {
            return i.vars.id !== 'ScrollSmoother' && i.kill()
          }),
          n !== !0)
        ) {
          var r = mr.killAll || []
          ;(mr = {}),
            r.forEach(function (i) {
              return i()
            })
        }
      }),
      o
    )
  })()
G.version = '3.13.0'
G.saveStyles = function (o) {
  return o
    ? Vi(o).forEach(function (e) {
        if (e && e.style) {
          var t = Tt.indexOf(e)
          t >= 0 && Tt.splice(t, 5),
            Tt.push(
              e,
              e.style.cssText,
              e.getBBox && e.getAttribute('transform'),
              M.core.getCache(e),
              aa()
            )
        }
      })
    : Tt
}
G.revert = function (o, e) {
  return nl(!o, e)
}
G.create = function (o, e) {
  return new G(o, e)
}
G.refresh = function (o) {
  return o ? yi(!0) : (Ar || G.register()) && ir(!0)
}
G.update = function (o) {
  return ++Z.cache && bn(o === !0 ? 2 : 0)
}
G.clearScrollMemory = ih
G.maxScroll = function (o, e) {
  return on(o, e ? _t : Ve)
}
G.getScrollFunc = function (o, e) {
  return Un(Dt(o), e ? _t : Ve)
}
G.getById = function (o) {
  return ua[o]
}
G.getAll = function () {
  return K.filter(function (o) {
    return o.vars.id !== 'ScrollSmoother'
  })
}
G.isScrolling = function () {
  return !!Vt
}
G.snapDirectional = tl
G.addEventListener = function (o, e) {
  var t = mr[o] || (mr[o] = [])
  ~t.indexOf(e) || t.push(e)
}
G.removeEventListener = function (o, e) {
  var t = mr[o],
    n = t && t.indexOf(e)
  n >= 0 && t.splice(n, 1)
}
G.batch = function (o, e) {
  var t = [],
    n = {},
    r = e.interval || 0.016,
    i = e.batchMax || 1e9,
    s = function (u, c) {
      var h = [],
        d = [],
        f = M.delayedCall(r, function () {
          c(h, d), (h = []), (d = [])
        }).pause()
      return function (g) {
        h.length || f.restart(!0),
          h.push(g.trigger),
          d.push(g),
          i <= h.length && f.progress(1)
      }
    },
    a
  for (a in e)
    n[a] =
      a.substr(0, 2) === 'on' && lt(e[a]) && a !== 'onRefreshInit'
        ? s(a, e[a])
        : e[a]
  return (
    lt(i) &&
      ((i = i()),
      Xe(G, 'refresh', function () {
        return (i = e.batchMax())
      })),
    Vi(o).forEach(function (l) {
      var u = {}
      for (a in n) u[a] = n[a]
      ;(u.trigger = l), t.push(G.create(u))
    }),
    t
  )
}
var Yl = function (e, t, n, r) {
    return (
      t > r ? e(r) : t < 0 && e(0),
      n > r ? (r - t) / (n - t) : n < 0 ? t / (t - n) : 1
    )
  },
  Fo = function o(e, t) {
    t === !0
      ? e.style.removeProperty('touch-action')
      : (e.style.touchAction =
          t === !0
            ? 'auto'
            : t
              ? 'pan-' + t + (Fe.isTouch ? ' pinch-zoom' : '')
              : 'none'),
      e === Pt && o(ue, t)
  },
  bs = { auto: 1, scroll: 1 },
  Nf = function (e) {
    var t = e.event,
      n = e.target,
      r = e.axis,
      i = (t.changedTouches ? t.changedTouches[0] : t).target,
      s = i._gsap || M.core.getCache(i),
      a = ot(),
      l
    if (!s._isScrollT || a - s._isScrollT > 2e3) {
      for (
        ;
        i &&
        i !== ue &&
        ((i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth) ||
          !(bs[(l = Bt(i)).overflowY] || bs[l.overflowX]));

      )
        i = i.parentNode
      ;(s._isScroll =
        i &&
        i !== n &&
        !gr(i) &&
        (bs[(l = Bt(i)).overflowY] || bs[l.overflowX])),
        (s._isScrollT = a)
    }
    ;(s._isScroll || r === 'x') && (t.stopPropagation(), (t._gsapAllow = !0))
  },
  ah = function (e, t, n, r) {
    return Fe.create({
      target: e,
      capture: !0,
      debounce: !1,
      lockAxis: !0,
      type: t,
      onWheel: (r = r && Nf),
      onPress: r,
      onDrag: r,
      onScroll: r,
      onEnable: function () {
        return n && Xe(ge, Fe.eventTypes[0], Xl, !1, !0)
      },
      onDisable: function () {
        return We(ge, Fe.eventTypes[0], Xl, !0)
      },
    })
  },
  jf = /(input|label|select|textarea)/i,
  Wl,
  Xl = function (e) {
    var t = jf.test(e.target.tagName)
    ;(t || Wl) && ((e._gsapAllow = !0), (Wl = t))
  },
  Bf = function (e) {
    tr(e) || (e = {}),
      (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
      e.type || (e.type = 'wheel,touch'),
      (e.debounce = !!e.debounce),
      (e.id = e.id || 'normalizer')
    var t = e,
      n = t.normalizeScrollX,
      r = t.momentum,
      i = t.allowNestedScroll,
      s = t.onRelease,
      a,
      l,
      u = Dt(e.target) || Pt,
      c = M.core.globals().ScrollSmoother,
      h = c && c.get(),
      d =
        Pn &&
        ((e.content && Dt(e.content)) ||
          (h && e.content !== !1 && !h.smooth() && h.content())),
      f = Un(u, Ve),
      g = Un(u, _t),
      p = 1,
      m =
        (Fe.isTouch && J.visualViewport
          ? J.visualViewport.scale * J.visualViewport.width
          : J.outerWidth) / J.innerWidth,
      _ = 0,
      D = lt(r)
        ? function () {
            return r(a)
          }
        : function () {
            return r || 2.8
          },
      C,
      v,
      w = ah(u, e.type, !0, i),
      E = function () {
        return (v = !1)
      },
      x = nn,
      $ = nn,
      T = function () {
        ;(l = on(u, Ve)),
          ($ = Ti(Pn ? 1 : 0, l)),
          n && (x = Ti(0, on(u, _t))),
          (C = fr)
      },
      k = function () {
        ;(d._gsap.y = _i(parseFloat(d._gsap.y) + f.offset) + 'px'),
          (d.style.transform =
            'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' +
            parseFloat(d._gsap.y) +
            ', 0, 1)'),
          (f.offset = f.cacheID = 0)
      },
      A = function () {
        if (v) {
          requestAnimationFrame(E)
          var N = _i(a.deltaY / 2),
            H = $(f.v - N)
          if (d && H !== f.v + f.offset) {
            f.offset = H - f.v
            var y = _i((parseFloat(d && d._gsap.y) || 0) - f.offset)
            ;(d.style.transform =
              'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' +
              y +
              ', 0, 1)'),
              (d._gsap.y = y + 'px'),
              (f.cacheID = Z.cache),
              bn()
          }
          return !0
        }
        f.offset && k(), (v = !0)
      },
      P,
      j,
      z,
      O,
      I = function () {
        T(),
          P.isActive() &&
            P.vars.scrollY > l &&
            (f() > l ? P.progress(1) && f(l) : P.resetTo('scrollY', l))
      }
    return (
      d && M.set(d, { y: '+=0' }),
      (e.ignoreCheck = function (R) {
        return (
          (Pn && R.type === 'touchmove' && A()) ||
          (p > 1.05 && R.type !== 'touchstart') ||
          a.isGesturing ||
          (R.touches && R.touches.length > 1)
        )
      }),
      (e.onPress = function () {
        v = !1
        var R = p
        ;(p = _i(((J.visualViewport && J.visualViewport.scale) || 1) / m)),
          P.pause(),
          R !== p && Fo(u, p > 1.01 ? !0 : n ? !1 : 'x'),
          (j = g()),
          (z = f()),
          T(),
          (C = fr)
      }),
      (e.onRelease = e.onGestureStart =
        function (R, N) {
          if ((f.offset && k(), !N)) O.restart(!0)
          else {
            Z.cache++
            var H = D(),
              y,
              U
            n &&
              ((y = g()),
              (U = y + (H * 0.05 * -R.velocityX) / 0.227),
              (H *= Yl(g, y, U, on(u, _t))),
              (P.vars.scrollX = x(U))),
              (y = f()),
              (U = y + (H * 0.05 * -R.velocityY) / 0.227),
              (H *= Yl(f, y, U, on(u, Ve))),
              (P.vars.scrollY = $(U)),
              P.invalidate().duration(H).play(0.01),
              ((Pn && P.vars.scrollY >= l) || y >= l - 1) &&
                M.to({}, { onUpdate: I, duration: H })
          }
          s && s(R)
        }),
      (e.onWheel = function () {
        P._ts && P.pause(), ot() - _ > 1e3 && ((C = 0), (_ = ot()))
      }),
      (e.onChange = function (R, N, H, y, U) {
        if (
          (fr !== C && T(),
          N && n && g(x(y[2] === N ? j + (R.startX - R.x) : g() + N - y[1])),
          H)
        ) {
          f.offset && k()
          var L = U[2] === H,
            ae = L ? z + R.startY - R.y : f() + H - U[1],
            se = $(ae)
          L && ae !== se && (z += se - ae), f(se)
        }
        ;(H || N) && bn()
      }),
      (e.onEnable = function () {
        Fo(u, n ? !1 : 'x'),
          G.addEventListener('refresh', I),
          Xe(J, 'resize', I),
          f.smooth &&
            ((f.target.style.scrollBehavior = 'auto'),
            (f.smooth = g.smooth = !1)),
          w.enable()
      }),
      (e.onDisable = function () {
        Fo(u, !0),
          We(J, 'resize', I),
          G.removeEventListener('refresh', I),
          w.kill()
      }),
      (e.lockAxis = e.lockAxis !== !1),
      (a = new Fe(e)),
      (a.iOS = Pn),
      Pn && !f() && f(1),
      Pn && M.ticker.add(nn),
      (O = a._dc),
      (P = M.to(a, {
        ease: 'power4',
        paused: !0,
        inherit: !1,
        scrollX: n ? '+=0.1' : '+=0',
        scrollY: '+=0.1',
        modifiers: {
          scrollY: oh(f, f(), function () {
            return P.pause()
          }),
        },
        onUpdate: bn,
        onComplete: O.vars.onComplete,
      })),
      a
    )
  }
G.sort = function (o) {
  if (lt(o)) return K.sort(o)
  var e = J.pageYOffset || 0
  return (
    G.getAll().forEach(function (t) {
      return (t._sortY = t.trigger
        ? e + t.trigger.getBoundingClientRect().top
        : t.start + J.innerHeight)
    }),
    K.sort(
      o ||
        function (t, n) {
          return (
            (t.vars.refreshPriority || 0) * -1e6 +
            (t.vars.containerAnimation ? 1e6 : t._sortY) -
            ((n.vars.containerAnimation ? 1e6 : n._sortY) +
              (n.vars.refreshPriority || 0) * -1e6)
          )
        }
    )
  )
}
G.observe = function (o) {
  return new Fe(o)
}
G.normalizeScroll = function (o) {
  if (typeof o > 'u') return ft
  if (o === !0 && ft) return ft.enable()
  if (o === !1) {
    ft && ft.kill(), (ft = o)
    return
  }
  var e = o instanceof Fe ? o : Bf(o)
  return ft && ft.target === e.target && ft.kill(), gr(e.target) && (ft = e), e
}
G.core = {
  _getVelocityProp: ia,
  _inputObserver: ah,
  _scrollers: Z,
  _proxies: cn,
  bridge: {
    ss: function () {
      Vt || _r('scrollStart'), (Vt = ot())
    },
    ref: function () {
      return st
    },
  },
}
Kc() && M.registerPlugin(G)
var an,
  rl,
  Ks,
  lh,
  uh,
  Gl,
  da,
  ch,
  hh = function () {
    return typeof window < 'u'
  },
  dh = function () {
    return an || (hh() && (an = window.gsap) && an.registerPlugin && an)
  },
  Hf = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
  Ao = {
    rect: ['width', 'height'],
    circle: ['r', 'r'],
    ellipse: ['rx', 'ry'],
    line: ['x2', 'y2'],
  },
  nr = function (e) {
    return Math.round(e * 1e4) / 1e4
  },
  xn = function (e) {
    return parseFloat(e) || 0
  },
  Kl = function (e, t) {
    var n = xn(e)
    return ~e.indexOf('%') ? (n / 100) * t : n
  },
  Cs = function (e, t) {
    return xn(e.getAttribute(t))
  },
  Ls = Math.sqrt,
  Jl = function (e, t, n, r, i, s) {
    return Ls(
      Math.pow((xn(n) - xn(e)) * i, 2) + Math.pow((xn(r) - xn(t)) * s, 2)
    )
  },
  Zl = function (e) {},
  fh = function (e) {
    return e.getAttribute('vector-effect') === 'non-scaling-stroke'
  },
  Uf = 1,
  Vf = function (e, t, n) {
    var r = e.indexOf(' '),
      i,
      s
    return (
      r < 0
        ? ((i = n !== void 0 ? n + '' : e), (s = e))
        : ((i = e.substr(0, r)), (s = e.substr(r + 1))),
      (i = Kl(i, t)),
      (s = Kl(s, t)),
      i > s ? [s, i] : [i, s]
    )
  },
  Ms = function (e) {
    if (((e = rl(e)[0]), !e)) return 0
    var t = e.tagName.toLowerCase(),
      n = e.style,
      r = 1,
      i = 1,
      s,
      a,
      l,
      u,
      c,
      h,
      d
    fh(e) &&
      ((i = e.getScreenCTM()),
      (r = Ls(i.a * i.a + i.b * i.b)),
      (i = Ls(i.d * i.d + i.c * i.c)))
    try {
      a = e.getBBox()
    } catch {
      Zl(
        "Some browsers won't measure invisible elements (like display:none or masks inside defs)."
      )
    }
    var f = a || { x: 0, y: 0, width: 0, height: 0 },
      g = f.x,
      p = f.y,
      m = f.width,
      _ = f.height
    if (
      ((!a || (!m && !_)) &&
        Ao[t] &&
        ((m = Cs(e, Ao[t][0])),
        (_ = Cs(e, Ao[t][1])),
        t !== 'rect' && t !== 'line' && ((m *= 2), (_ *= 2)),
        t === 'line' &&
          ((g = Cs(e, 'x1')),
          (p = Cs(e, 'y1')),
          (m = Math.abs(m - g)),
          (_ = Math.abs(_ - p)))),
      t === 'path')
    )
      (u = n.strokeDasharray),
        (n.strokeDasharray = 'none'),
        (s = e.getTotalLength() || 0),
        nr(r) !== nr(i) &&
          !Gl &&
          (Gl = 1) &&
          Zl(
            "Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."
          ),
        (s *= (r + i) / 2),
        (n.strokeDasharray = u)
    else if (t === 'rect') s = m * 2 * r + _ * 2 * i
    else if (t === 'line') s = Jl(g, p, g + m, p + _, r, i)
    else if (t === 'polyline' || t === 'polygon')
      for (
        l = e.getAttribute('points').match(Hf) || [],
          t === 'polygon' && l.push(l[0], l[1]),
          s = 0,
          c = 2;
        c < l.length;
        c += 2
      )
        s += Jl(l[c - 2], l[c - 1], l[c], l[c + 1], r, i) || 0
    else
      (t === 'circle' || t === 'ellipse') &&
        ((h = (m / 2) * r),
        (d = (_ / 2) * i),
        (s = Math.PI * (3 * (h + d) - Ls((3 * h + d) * (h + 3 * d)))))
    return s || 0
  },
  Ql = function (e, t) {
    if (((e = rl(e)[0]), !e)) return [0, 0]
    t || (t = Ms(e) + 1)
    var n = Ks.getComputedStyle(e),
      r = n.strokeDasharray || '',
      i = xn(n.strokeDashoffset),
      s = r.indexOf(',')
    return (
      s < 0 && (s = r.indexOf(' ')),
      (r = s < 0 ? t : xn(r.substr(0, s))),
      r > t && (r = t),
      [-i || 0, r - i || 0]
    )
  },
  eu = function () {
    hh() &&
      ((Ks = window),
      (uh = an = dh()),
      (rl = an.utils.toArray),
      (da = an.core.getStyleSaver),
      (ch = an.core.reverting || function () {}),
      (lh = ((Ks.navigator || {}).userAgent || '').indexOf('Edge') !== -1))
  },
  ph = {
    version: '3.13.0',
    name: 'drawSVG',
    register: function (e) {
      ;(an = e), eu()
    },
    init: function (e, t, n, r, i) {
      if (!e.getBBox) return !1
      uh || eu()
      var s = Ms(e),
        a,
        l,
        u
      return (
        (this.styles =
          da && da(e, 'strokeDashoffset,strokeDasharray,strokeMiterlimit')),
        (this.tween = n),
        (this._style = e.style),
        (this._target = e),
        t + '' == 'true'
          ? (t = '0 100%')
          : t
            ? (t + '').indexOf(' ') === -1 && (t = '0 ' + t)
            : (t = '0 0'),
        (a = Ql(e, s)),
        (l = Vf(t, s, a[0])),
        (this._length = nr(s)),
        (this._dash = nr(a[1] - a[0])),
        (this._offset = nr(-a[0])),
        (this._dashPT = this.add(
          this,
          '_dash',
          this._dash,
          nr(l[1] - l[0]),
          0,
          0,
          0,
          0,
          0,
          1
        )),
        (this._offsetPT = this.add(
          this,
          '_offset',
          this._offset,
          nr(-l[0]),
          0,
          0,
          0,
          0,
          0,
          1
        )),
        lh &&
          ((u = Ks.getComputedStyle(e)),
          u.strokeLinecap !== u.strokeLinejoin &&
            ((l = xn(u.strokeMiterlimit)),
            this.add(e.style, 'strokeMiterlimit', l, l + 0.01))),
        (this._live = fh(e) || ~(t + '').indexOf('live')),
        (this._nowrap = ~(t + '').indexOf('nowrap')),
        this._props.push('drawSVG'),
        Uf
      )
    },
    render: function (e, t) {
      if (t.tween._time || !ch()) {
        var n = t._pt,
          r = t._style,
          i,
          s,
          a,
          l
        if (n) {
          for (
            t._live &&
            ((i = Ms(t._target)),
            i !== t._length &&
              ((s = i / t._length),
              (t._length = i),
              t._offsetPT && ((t._offsetPT.s *= s), (t._offsetPT.c *= s)),
              t._dashPT
                ? ((t._dashPT.s *= s), (t._dashPT.c *= s))
                : (t._dash *= s)));
            n;

          )
            n.r(e, n.d), (n = n._next)
          ;(a = t._dash || (e && e !== 1 && 1e-4) || 0),
            (i = t._length - a + 0.1),
            (l = t._offset),
            a &&
              l &&
              a + Math.abs(l % t._length) > t._length - 0.05 &&
              (l += l < 0 ? 0.005 : -0.005) &&
              (i += 0.005),
            (r.strokeDashoffset = a ? l : l + 0.001),
            (r.strokeDasharray =
              i < 0.1
                ? 'none'
                : a
                  ? a + 'px,' + (t._nowrap ? 999999 : i) + 'px'
                  : '0px, 999999px')
        }
      } else t.styles.revert()
    },
    getLength: Ms,
    getPosition: Ql,
  }
dh() && an.registerPlugin(ph)
var qf = /(?:^\s+|\s+$)/g,
  Yf =
    /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2642\u2640]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDD27\uDCBC\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCC\uDFCB]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/
function il(o) {
  var e = o.nodeType,
    t = ''
  if (e === 1 || e === 9 || e === 11) {
    if (typeof o.textContent == 'string') return o.textContent
    for (o = o.firstChild; o; o = o.nextSibling) t += il(o)
  } else if (e === 3 || e === 4) return o.nodeValue
  return t
}
function en(o, e, t, n, r) {
  if (
    ((o += ''), t && (o = o.trim ? o.trim() : o.replace(qf, '')), e && e !== '')
  )
    return o.replace(/>/g, '&gt;').replace(/</g, '&lt;').split(e)
  for (var i = [], s = o.length, a = 0, l, u; a < s; a++)
    (u = o.charAt(a)),
      ((u.charCodeAt(0) >= 55296 && u.charCodeAt(0) <= 56319) ||
        (o.charCodeAt(a + 1) >= 65024 && o.charCodeAt(a + 1) <= 65039)) &&
        ((l = ((o.substr(a, 12).split(Yf) || [])[1] || '').length || 2),
        (u = o.substr(a, l)),
        (i.emoji = 1),
        (a += l - 1)),
      i.push(
        r
          ? u
          : u === '>'
            ? '&gt;'
            : u === '<'
              ? '&lt;'
              : n &&
                  u === ' ' &&
                  (o.charAt(a - 1) === ' ' || o.charAt(a + 1) === ' ')
                ? '&nbsp;'
                : u
      )
  return i
}
var Rs = (function () {
    function o(t) {
      ;(this.chars = en(t)), (this.sets = []), (this.length = 50)
      for (var n = 0; n < 20; n++) this.sets[n] = nu(80, this.chars)
    }
    var e = o.prototype
    return (
      (e.grow = function (n) {
        for (var r = 0; r < 20; r++)
          this.sets[r] += nu(n - this.length, this.chars)
        this.length = n
      }),
      o
    )
  })(),
  sr,
  gh,
  mh = function () {
    return (
      sr ||
      (typeof window < 'u' && (sr = window.gsap) && sr.registerPlugin && sr)
    )
  },
  Wf = 1,
  tu = /\s+/g,
  nu = function (e, t) {
    for (var n = t.length, r = ''; --e > -1; ) r += t[~~(Math.random() * n)]
    return r
  },
  fa = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ru = fa.toLowerCase(),
  Xf = {
    upperCase: new Rs(fa),
    lowerCase: new Rs(ru),
    upperAndLowerCase: new Rs(fa + ru),
  },
  iu = function () {
    gh = sr = mh()
  },
  uo = {
    version: '3.13.0',
    name: 'scrambleText',
    register: function (e, t, n) {
      ;(sr = e), iu()
    },
    init: function (e, t, n, r, i) {
      if (
        (gh || iu(),
        (this.prop =
          'innerHTML' in e
            ? 'innerHTML'
            : 'textContent' in e
              ? 'textContent'
              : 0),
        !!this.prop)
      ) {
        ;(this.target = e), typeof t != 'object' && (t = { text: t })
        var s = t.text || t.value || '',
          a = t.trim !== !1,
          l = this,
          u,
          c,
          h,
          d
        return (
          (l.delimiter = u = t.delimiter || ''),
          (l.original = en(
            il(e).replace(tu, ' ').split('&nbsp;').join(''),
            u,
            a
          )),
          (s === '{original}' || s === !0 || s == null) &&
            (s = l.original.join(u)),
          (l.text = en((s || '').replace(tu, ' '), u, a)),
          (l.hasClass = !!(t.newClass || t.oldClass)),
          (l.newClass = t.newClass),
          (l.oldClass = t.oldClass),
          (d = u === ''),
          (l.textHasEmoji = d && !!l.text.emoji),
          (l.charsHaveEmoji = !!t.chars && !!en(t.chars).emoji),
          (l.length = d ? l.original.length : l.original.join(u).length),
          (l.lengthDif =
            (d ? l.text.length : l.text.join(u).length) - l.length),
          (l.fillChar =
            t.fillChar || (t.chars && ~t.chars.indexOf(' ')) ? '&nbsp;' : ''),
          (l.charSet = h = Xf[t.chars || 'upperCase'] || new Rs(t.chars)),
          (l.speed = 0.05 / (t.speed || 1)),
          (l.prevScrambleTime = 0),
          (l.setIndex = (Math.random() * 20) | 0),
          (c = l.length + Math.max(l.lengthDif, 0)),
          c > h.length && h.grow(c),
          (l.chars = h.sets[l.setIndex]),
          (l.revealDelay = t.revealDelay || 0),
          (l.tweenLength = t.tweenLength !== !1),
          (l.tween = n),
          (l.rightToLeft = !!t.rightToLeft),
          l._props.push('scrambleText', 'text'),
          Wf
        )
      }
    },
    render: function (e, t) {
      var n = t.target,
        r = t.prop,
        i = t.text,
        s = t.delimiter,
        a = t.tween,
        l = t.prevScrambleTime,
        u = t.revealDelay,
        c = t.setIndex,
        h = t.chars,
        d = t.charSet,
        f = t.length,
        g = t.textHasEmoji,
        p = t.charsHaveEmoji,
        m = t.lengthDif,
        _ = t.tweenLength,
        D = t.oldClass,
        C = t.newClass,
        v = t.rightToLeft,
        w = t.fillChar,
        E = t.speed,
        x = t.original,
        $ = t.hasClass,
        T = i.length,
        k = a._time,
        A = k - l,
        P,
        j,
        z,
        O,
        I,
        R,
        N,
        H,
        y,
        U,
        L
      u &&
        (a._from && (k = a._dur - k),
        (e =
          k === 0
            ? 0
            : k < u
              ? 1e-6
              : k === a._dur
                ? 1
                : a._ease((k - u) / (a._dur - u)))),
        e < 0 ? (e = 0) : e > 1 && (e = 1),
        v && (e = 1 - e),
        (P = ~~(e * T + 0.5)),
        e
          ? ((A > E || A < -E) &&
              ((t.setIndex = c = (c + ((Math.random() * 19) | 0)) % 20),
              (t.chars = d.sets[c]),
              (t.prevScrambleTime += A)),
            (O = h))
          : (O = x.join(s)),
        (L = a._from ? e : 1 - e),
        (U = f + (_ ? (a._from ? L * L * L : 1 - L * L * L) : 1) * m),
        v
          ? e === 1 && (a._from || a.data === 'isFromStart')
            ? ((z = ''), (O = x.join(s)))
            : ((N = i.slice(P).join(s)),
              p
                ? (z = en(O)
                    .slice(0, (U - (g ? en(N) : N).length + 0.5) | 0)
                    .join(''))
                : (z = O.substr(0, (U - (g ? en(N) : N).length + 0.5) | 0)),
              (O = N))
          : ((z = i.slice(0, P).join(s)),
            (j = (g ? en(z) : z).length),
            p
              ? (O = en(O)
                  .slice(j, (U + 0.5) | 0)
                  .join(''))
              : (O = O.substr(j, (U - j + 0.5) | 0))),
        $
          ? ((H = v ? D : C),
            (y = v ? C : D),
            (I = H && P !== 0),
            (R = y && P !== T),
            (N =
              (I ? "<span class='" + H + "'>" : '') +
              z +
              (I ? '</span>' : '') +
              (R ? "<span class='" + y + "'>" : '') +
              s +
              O +
              (R ? '</span>' : '')))
          : (N = z + s + O),
        (n[r] =
          w === '&nbsp;' && ~N.indexOf('  ')
            ? N.split('  ').join('&nbsp;&nbsp;')
            : N)
    },
  }
uo.emojiSafeSplit = en
uo.getText = il
mh() && sr.registerPlugin(uo)
oe.defaults({ duration: 1, ease: ti.create('custom', '.75,0,.5,1') })
oe.registerPlugin(ti, ph, G, uo)
function pa() {
  let o = oe.matchMedia()
  o.add('(max-width: 1024px)', () => {
    const e = document.querySelector('header'),
      t = document.querySelector('#copy'),
      n = document.querySelector('#footerLinks')
    if (!e || !t || !n) return
    oe.set(t, { opacity: 0 }),
      G.create({
        trigger: t,
        onLeave: () => {
          e.classList.add(
            'fixed',
            'bottom-[env(safe-area-inset-bottom)]',
            'bg-black'
          ),
            e.classList.remove('absolute'),
            oe.to(e, { yPercent: 0, opacity: 1, duration: 0.25 }),
            oe.to(t, { opacity: 1 })
        },
        onEnterBack: () => {
          oe.to(e, {
            yPercent: 50,
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
              e.classList.remove(
                'fixed',
                'bottom-[env(safe-area-inset-bottom)]',
                'bg-black'
              ),
                e.classList.add('absolute'),
                e.removeAttribute('style')
            },
          }),
            oe.to(t, { opacity: 0, duration: 0.1 })
        },
      })
    const r = e.clientHeight,
      i = n.clientHeight
    oe.to(e, {
      scrollTrigger: {
        trigger: '#footerLinks',
        start: `${i - r} bottom`,
        end: 'top top',
        toggleActions: 'play none none reverse',
        scrub: !0,
      },
      ease: 'none',
      yPercent: -100,
    })
  }),
    o.add('(min-width: 1024px)', () => {
      oe.from('#job > *', {
        scrollTrigger: {
          trigger: '.job',
          start: '0% 100%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: '10rem',
        stagger: 0.1,
      }),
        oe.from('.cases', {
          scrollTrigger: {
            trigger: '#cases',
            start: 'top 100%',
            end: 'bottom 80%',
            toggleActions: 'play none none reverse',
            scrub: 2,
          },
          stagger: -0.1,
          y: '10rem',
        })
    }),
    oe.from('#menu > *', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 50%',
        end: 'top 0%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      stagger: 0.1,
      y: '5rem',
    })
}
window.addEventListener('mobile-loading:done', pa, { once: !0 })
document.querySelector('mobile-loading') ||
  (document.readyState === 'complete'
    ? pa()
    : window.addEventListener('load', pa, { once: !0 }))
const zs = globalThis,
  sl =
    zs.ShadowRoot &&
    (zs.ShadyCSS === void 0 || zs.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  _h = Symbol(),
  su = new WeakMap()
let Gf = class {
  constructor(e, t, n) {
    if (((this._$cssResult$ = !0), n !== _h))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      )
    ;(this.cssText = e), (this.t = t)
  }
  get styleSheet() {
    let e = this.o
    const t = this.t
    if (sl && e === void 0) {
      const n = t !== void 0 && t.length === 1
      n && (e = su.get(t)),
        e === void 0 &&
          ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText),
          n && su.set(t, e))
    }
    return e
  }
  toString() {
    return this.cssText
  }
}
const Kf = (o) => new Gf(typeof o == 'string' ? o : o + '', void 0, _h),
  Jf = (o, e) => {
    if (sl)
      o.adoptedStyleSheets = e.map((t) =>
        t instanceof CSSStyleSheet ? t : t.styleSheet
      )
    else
      for (const t of e) {
        const n = document.createElement('style'),
          r = zs.litNonce
        r !== void 0 && n.setAttribute('nonce', r),
          (n.textContent = t.cssText),
          o.appendChild(n)
      }
  },
  ou = sl
    ? (o) => o
    : (o) =>
        o instanceof CSSStyleSheet
          ? ((e) => {
              let t = ''
              for (const n of e.cssRules) t += n.cssText
              return Kf(t)
            })(o)
          : o
const {
    is: Zf,
    defineProperty: Qf,
    getOwnPropertyDescriptor: ep,
    getOwnPropertyNames: tp,
    getOwnPropertySymbols: np,
    getPrototypeOf: rp,
  } = Object,
  jn = globalThis,
  au = jn.trustedTypes,
  ip = au ? au.emptyScript : '',
  Oo = jn.reactiveElementPolyfillSupport,
  Oi = (o, e) => o,
  Js = {
    toAttribute(o, e) {
      switch (e) {
        case Boolean:
          o = o ? ip : null
          break
        case Object:
        case Array:
          o = o == null ? o : JSON.stringify(o)
      }
      return o
    },
    fromAttribute(o, e) {
      let t = o
      switch (e) {
        case Boolean:
          t = o !== null
          break
        case Number:
          t = o === null ? null : Number(o)
          break
        case Object:
        case Array:
          try {
            t = JSON.parse(o)
          } catch {
            t = null
          }
      }
      return t
    },
  },
  ol = (o, e) => !Zf(o, e),
  lu = {
    attribute: !0,
    type: String,
    converter: Js,
    reflect: !1,
    hasChanged: ol,
  }
Symbol.metadata ?? (Symbol.metadata = Symbol('metadata')),
  jn.litPropertyMetadata ?? (jn.litPropertyMetadata = new WeakMap())
class Lr extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e)
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()]
  }
  static createProperty(e, t = lu) {
    if (
      (t.state && (t.attribute = !1),
      this._$Ei(),
      this.elementProperties.set(e, t),
      !t.noAccessor)
    ) {
      const n = Symbol(),
        r = this.getPropertyDescriptor(e, n, t)
      r !== void 0 && Qf(this.prototype, e, r)
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: r, set: i } = ep(this.prototype, e) ?? {
      get() {
        return this[t]
      },
      set(s) {
        this[t] = s
      },
    }
    return {
      get() {
        return r == null ? void 0 : r.call(this)
      },
      set(s) {
        const a = r == null ? void 0 : r.call(this)
        i.call(this, s), this.requestUpdate(e, a, n)
      },
      configurable: !0,
      enumerable: !0,
    }
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? lu
  }
  static _$Ei() {
    if (this.hasOwnProperty(Oi('elementProperties'))) return
    const e = rp(this)
    e.finalize(),
      e.l !== void 0 && (this.l = [...e.l]),
      (this.elementProperties = new Map(e.elementProperties))
  }
  static finalize() {
    if (this.hasOwnProperty(Oi('finalized'))) return
    if (
      ((this.finalized = !0),
      this._$Ei(),
      this.hasOwnProperty(Oi('properties')))
    ) {
      const t = this.properties,
        n = [...tp(t), ...np(t)]
      for (const r of n) this.createProperty(r, t[r])
    }
    const e = this[Symbol.metadata]
    if (e !== null) {
      const t = litPropertyMetadata.get(e)
      if (t !== void 0) for (const [n, r] of t) this.elementProperties.set(n, r)
    }
    this._$Eh = new Map()
    for (const [t, n] of this.elementProperties) {
      const r = this._$Eu(t, n)
      r !== void 0 && this._$Eh.set(r, t)
    }
    this.elementStyles = this.finalizeStyles(this.styles)
  }
  static finalizeStyles(e) {
    const t = []
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse())
      for (const r of n) t.unshift(ou(r))
    } else e !== void 0 && t.push(ou(e))
    return t
  }
  static _$Eu(e, t) {
    const n = t.attribute
    return n === !1
      ? void 0
      : typeof n == 'string'
        ? n
        : typeof e == 'string'
          ? e.toLowerCase()
          : void 0
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev()
  }
  _$Ev() {
    var e
    ;(this._$ES = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$E_(),
      this.requestUpdate(),
      (e = this.constructor.l) == null || e.forEach((t) => t(this))
  }
  addController(e) {
    var t
    ;(this._$EO ?? (this._$EO = new Set())).add(e),
      this.renderRoot !== void 0 &&
        this.isConnected &&
        ((t = e.hostConnected) == null || t.call(e))
  }
  removeController(e) {
    var t
    ;(t = this._$EO) == null || t.delete(e)
  }
  _$E_() {
    const e = new Map(),
      t = this.constructor.elementProperties
    for (const n of t.keys())
      this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n])
    e.size > 0 && (this._$Ep = e)
  }
  createRenderRoot() {
    const e =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions)
    return Jf(e, this.constructor.elementStyles), e
  }
  connectedCallback() {
    var e
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (e = this._$EO) == null ||
        e.forEach((t) => {
          var n
          return (n = t.hostConnected) == null ? void 0 : n.call(t)
        })
  }
  enableUpdating(e) {}
  disconnectedCallback() {
    var e
    ;(e = this._$EO) == null ||
      e.forEach((t) => {
        var n
        return (n = t.hostDisconnected) == null ? void 0 : n.call(t)
      })
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n)
  }
  _$EC(e, t) {
    var i
    const n = this.constructor.elementProperties.get(e),
      r = this.constructor._$Eu(e, n)
    if (r !== void 0 && n.reflect === !0) {
      const s = (
        ((i = n.converter) == null ? void 0 : i.toAttribute) !== void 0
          ? n.converter
          : Js
      ).toAttribute(t, n.type)
      ;(this._$Em = e),
        s == null ? this.removeAttribute(r) : this.setAttribute(r, s),
        (this._$Em = null)
    }
  }
  _$AK(e, t) {
    var i
    const n = this.constructor,
      r = n._$Eh.get(e)
    if (r !== void 0 && this._$Em !== r) {
      const s = n.getPropertyOptions(r),
        a =
          typeof s.converter == 'function'
            ? { fromAttribute: s.converter }
            : ((i = s.converter) == null ? void 0 : i.fromAttribute) !== void 0
              ? s.converter
              : Js
      ;(this._$Em = r),
        (this[r] = a.fromAttribute(t, s.type)),
        (this._$Em = null)
    }
  }
  requestUpdate(e, t, n) {
    if (e !== void 0) {
      if (
        (n ?? (n = this.constructor.getPropertyOptions(e)),
        !(n.hasChanged ?? ol)(this[e], t))
      )
        return
      this.P(e, t, n)
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET())
  }
  P(e, t, n) {
    this._$AL.has(e) || this._$AL.set(e, t),
      n.reflect === !0 &&
        this._$Em !== e &&
        (this._$Ej ?? (this._$Ej = new Set())).add(e)
  }
  async _$ET() {
    this.isUpdatePending = !0
    try {
      await this._$ES
    } catch (t) {
      Promise.reject(t)
    }
    const e = this.scheduleUpdate()
    return e != null && (await e), !this.isUpdatePending
  }
  scheduleUpdate() {
    return this.performUpdate()
  }
  performUpdate() {
    var n
    if (!this.isUpdatePending) return
    if (!this.hasUpdated) {
      if (
        (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
        this._$Ep)
      ) {
        for (const [i, s] of this._$Ep) this[i] = s
        this._$Ep = void 0
      }
      const r = this.constructor.elementProperties
      if (r.size > 0)
        for (const [i, s] of r)
          s.wrapped !== !0 ||
            this._$AL.has(i) ||
            this[i] === void 0 ||
            this.P(i, this[i], s)
    }
    let e = !1
    const t = this._$AL
    try {
      ;(e = this.shouldUpdate(t)),
        e
          ? (this.willUpdate(t),
            (n = this._$EO) == null ||
              n.forEach((r) => {
                var i
                return (i = r.hostUpdate) == null ? void 0 : i.call(r)
              }),
            this.update(t))
          : this._$EU()
    } catch (r) {
      throw ((e = !1), this._$EU(), r)
    }
    e && this._$AE(t)
  }
  willUpdate(e) {}
  _$AE(e) {
    var t
    ;(t = this._$EO) == null ||
      t.forEach((n) => {
        var r
        return (r = n.hostUpdated) == null ? void 0 : r.call(n)
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
      this.updated(e)
  }
  _$EU() {
    ;(this._$AL = new Map()), (this.isUpdatePending = !1)
  }
  get updateComplete() {
    return this.getUpdateComplete()
  }
  getUpdateComplete() {
    return this._$ES
  }
  shouldUpdate(e) {
    return !0
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t) => this._$EC(t, this[t]))),
      this._$EU()
  }
  updated(e) {}
  firstUpdated(e) {}
}
;(Lr.elementStyles = []),
  (Lr.shadowRootOptions = { mode: 'open' }),
  (Lr[Oi('elementProperties')] = new Map()),
  (Lr[Oi('finalized')] = new Map()),
  Oo == null || Oo({ ReactiveElement: Lr }),
  (jn.reactiveElementVersions ?? (jn.reactiveElementVersions = [])).push(
    '2.0.4'
  )
const Li = globalThis,
  Zs = Li.trustedTypes,
  uu = Zs ? Zs.createPolicy('lit-html', { createHTML: (o) => o }) : void 0,
  Dh = '$lit$',
  Fn = `lit$${Math.random().toFixed(9).slice(2)}$`,
  yh = '?' + Fn,
  sp = `<${yh}>`,
  Dr = document,
  Yi = () => Dr.createComment(''),
  Wi = (o) => o === null || (typeof o != 'object' && typeof o != 'function'),
  al = Array.isArray,
  op = (o) =>
    al(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == 'function',
  Lo = `[ 	
\f\r]`,
  ci = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  cu = /-->/g,
  hu = />/g,
  Zn = RegExp(
    `>|${Lo}(?:([^\\s"'>=/]+)(${Lo}*=${Lo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
    'g'
  ),
  du = /'/g,
  fu = /"/g,
  vh = /^(?:script|style|textarea|title)$/i,
  ap =
    (o) =>
    (e, ...t) => ({ _$litType$: o, strings: e, values: t }),
  ie = ap(1),
  yr = Symbol.for('lit-noChange'),
  je = Symbol.for('lit-nothing'),
  pu = new WeakMap(),
  or = Dr.createTreeWalker(Dr, 129)
function xh(o, e) {
  if (!al(o) || !o.hasOwnProperty('raw'))
    throw Error('invalid template strings array')
  return uu !== void 0 ? uu.createHTML(e) : e
}
const lp = (o, e) => {
  const t = o.length - 1,
    n = []
  let r,
    i = e === 2 ? '<svg>' : e === 3 ? '<math>' : '',
    s = ci
  for (let a = 0; a < t; a++) {
    const l = o[a]
    let u,
      c,
      h = -1,
      d = 0
    for (; d < l.length && ((s.lastIndex = d), (c = s.exec(l)), c !== null); )
      (d = s.lastIndex),
        s === ci
          ? c[1] === '!--'
            ? (s = cu)
            : c[1] !== void 0
              ? (s = hu)
              : c[2] !== void 0
                ? (vh.test(c[2]) && (r = RegExp('</' + c[2], 'g')), (s = Zn))
                : c[3] !== void 0 && (s = Zn)
          : s === Zn
            ? c[0] === '>'
              ? ((s = r ?? ci), (h = -1))
              : c[1] === void 0
                ? (h = -2)
                : ((h = s.lastIndex - c[2].length),
                  (u = c[1]),
                  (s = c[3] === void 0 ? Zn : c[3] === '"' ? fu : du))
            : s === fu || s === du
              ? (s = Zn)
              : s === cu || s === hu
                ? (s = ci)
                : ((s = Zn), (r = void 0))
    const f = s === Zn && o[a + 1].startsWith('/>') ? ' ' : ''
    i +=
      s === ci
        ? l + sp
        : h >= 0
          ? (n.push(u), l.slice(0, h) + Dh + l.slice(h) + Fn + f)
          : l + Fn + (h === -2 ? a : f)
  }
  return [
    xh(
      o,
      i + (o[t] || '<?>') + (e === 2 ? '</svg>' : e === 3 ? '</math>' : '')
    ),
    n,
  ]
}
class Xi {
  constructor({ strings: e, _$litType$: t }, n) {
    let r
    this.parts = []
    let i = 0,
      s = 0
    const a = e.length - 1,
      l = this.parts,
      [u, c] = lp(e, t)
    if (
      ((this.el = Xi.createElement(u, n)),
      (or.currentNode = this.el.content),
      t === 2 || t === 3)
    ) {
      const h = this.el.content.firstChild
      h.replaceWith(...h.childNodes)
    }
    for (; (r = or.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes())
          for (const h of r.getAttributeNames())
            if (h.endsWith(Dh)) {
              const d = c[s++],
                f = r.getAttribute(h).split(Fn),
                g = /([.?@])?(.*)/.exec(d)
              l.push({
                type: 1,
                index: i,
                name: g[2],
                strings: f,
                ctor:
                  g[1] === '.'
                    ? cp
                    : g[1] === '?'
                      ? hp
                      : g[1] === '@'
                        ? dp
                        : co,
              }),
                r.removeAttribute(h)
            } else
              h.startsWith(Fn) &&
                (l.push({ type: 6, index: i }), r.removeAttribute(h))
        if (vh.test(r.tagName)) {
          const h = r.textContent.split(Fn),
            d = h.length - 1
          if (d > 0) {
            r.textContent = Zs ? Zs.emptyScript : ''
            for (let f = 0; f < d; f++)
              r.append(h[f], Yi()),
                or.nextNode(),
                l.push({ type: 2, index: ++i })
            r.append(h[d], Yi())
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === yh) l.push({ type: 2, index: i })
        else {
          let h = -1
          for (; (h = r.data.indexOf(Fn, h + 1)) !== -1; )
            l.push({ type: 7, index: i }), (h += Fn.length - 1)
        }
      i++
    }
  }
  static createElement(e, t) {
    const n = Dr.createElement('template')
    return (n.innerHTML = e), n
  }
}
function Jr(o, e, t = o, n) {
  var s, a
  if (e === yr) return e
  let r = n !== void 0 ? ((s = t._$Co) == null ? void 0 : s[n]) : t._$Cl
  const i = Wi(e) ? void 0 : e._$litDirective$
  return (
    (r == null ? void 0 : r.constructor) !== i &&
      ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1),
      i === void 0 ? (r = void 0) : ((r = new i(o)), r._$AT(o, t, n)),
      n !== void 0 ? ((t._$Co ?? (t._$Co = []))[n] = r) : (t._$Cl = r)),
    r !== void 0 && (e = Jr(o, r._$AS(o, e.values), r, n)),
    e
  )
}
class up {
  constructor(e, t) {
    ;(this._$AV = []), (this._$AN = void 0), (this._$AD = e), (this._$AM = t)
  }
  get parentNode() {
    return this._$AM.parentNode
  }
  get _$AU() {
    return this._$AM._$AU
  }
  u(e) {
    const {
        el: { content: t },
        parts: n,
      } = this._$AD,
      r = ((e == null ? void 0 : e.creationScope) ?? Dr).importNode(t, !0)
    or.currentNode = r
    let i = or.nextNode(),
      s = 0,
      a = 0,
      l = n[0]
    for (; l !== void 0; ) {
      if (s === l.index) {
        let u
        l.type === 2
          ? (u = new es(i, i.nextSibling, this, e))
          : l.type === 1
            ? (u = new l.ctor(i, l.name, l.strings, this, e))
            : l.type === 6 && (u = new fp(i, this, e)),
          this._$AV.push(u),
          (l = n[++a])
      }
      s !== (l == null ? void 0 : l.index) && ((i = or.nextNode()), s++)
    }
    return (or.currentNode = Dr), r
  }
  p(e) {
    let t = 0
    for (const n of this._$AV)
      n !== void 0 &&
        (n.strings !== void 0
          ? (n._$AI(e, n, t), (t += n.strings.length - 2))
          : n._$AI(e[t])),
        t++
  }
}
class es {
  get _$AU() {
    var e
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv
  }
  constructor(e, t, n, r) {
    ;(this.type = 2),
      (this._$AH = je),
      (this._$AN = void 0),
      (this._$AA = e),
      (this._$AB = t),
      (this._$AM = n),
      (this.options = r),
      (this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0)
  }
  get parentNode() {
    let e = this._$AA.parentNode
    const t = this._$AM
    return (
      t !== void 0 &&
        (e == null ? void 0 : e.nodeType) === 11 &&
        (e = t.parentNode),
      e
    )
  }
  get startNode() {
    return this._$AA
  }
  get endNode() {
    return this._$AB
  }
  _$AI(e, t = this) {
    ;(e = Jr(this, e, t)),
      Wi(e)
        ? e === je || e == null || e === ''
          ? (this._$AH !== je && this._$AR(), (this._$AH = je))
          : e !== this._$AH && e !== yr && this._(e)
        : e._$litType$ !== void 0
          ? this.$(e)
          : e.nodeType !== void 0
            ? this.T(e)
            : op(e)
              ? this.k(e)
              : this._(e)
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB)
  }
  T(e) {
    this._$AH !== e && (this._$AR(), (this._$AH = this.O(e)))
  }
  _(e) {
    this._$AH !== je && Wi(this._$AH)
      ? (this._$AA.nextSibling.data = e)
      : this.T(Dr.createTextNode(e)),
      (this._$AH = e)
  }
  $(e) {
    var i
    const { values: t, _$litType$: n } = e,
      r =
        typeof n == 'number'
          ? this._$AC(e)
          : (n.el === void 0 &&
              (n.el = Xi.createElement(xh(n.h, n.h[0]), this.options)),
            n)
    if (((i = this._$AH) == null ? void 0 : i._$AD) === r) this._$AH.p(t)
    else {
      const s = new up(r, this),
        a = s.u(this.options)
      s.p(t), this.T(a), (this._$AH = s)
    }
  }
  _$AC(e) {
    let t = pu.get(e.strings)
    return t === void 0 && pu.set(e.strings, (t = new Xi(e))), t
  }
  k(e) {
    al(this._$AH) || ((this._$AH = []), this._$AR())
    const t = this._$AH
    let n,
      r = 0
    for (const i of e)
      r === t.length
        ? t.push((n = new es(this.O(Yi()), this.O(Yi()), this, this.options)))
        : (n = t[r]),
        n._$AI(i),
        r++
    r < t.length && (this._$AR(n && n._$AB.nextSibling, r), (t.length = r))
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var n
    for (
      (n = this._$AP) == null ? void 0 : n.call(this, !1, !0, t);
      e && e !== this._$AB;

    ) {
      const r = e.nextSibling
      e.remove(), (e = r)
    }
  }
  setConnected(e) {
    var t
    this._$AM === void 0 &&
      ((this._$Cv = e), (t = this._$AP) == null || t.call(this, e))
  }
}
class co {
  get tagName() {
    return this.element.tagName
  }
  get _$AU() {
    return this._$AM._$AU
  }
  constructor(e, t, n, r, i) {
    ;(this.type = 1),
      (this._$AH = je),
      (this._$AN = void 0),
      (this.element = e),
      (this.name = t),
      (this._$AM = r),
      (this.options = i),
      n.length > 2 || n[0] !== '' || n[1] !== ''
        ? ((this._$AH = Array(n.length - 1).fill(new String())),
          (this.strings = n))
        : (this._$AH = je)
  }
  _$AI(e, t = this, n, r) {
    const i = this.strings
    let s = !1
    if (i === void 0)
      (e = Jr(this, e, t, 0)),
        (s = !Wi(e) || (e !== this._$AH && e !== yr)),
        s && (this._$AH = e)
    else {
      const a = e
      let l, u
      for (e = i[0], l = 0; l < i.length - 1; l++)
        (u = Jr(this, a[n + l], t, l)),
          u === yr && (u = this._$AH[l]),
          s || (s = !Wi(u) || u !== this._$AH[l]),
          u === je ? (e = je) : e !== je && (e += (u ?? '') + i[l + 1]),
          (this._$AH[l] = u)
    }
    s && !r && this.j(e)
  }
  j(e) {
    e === je
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, e ?? '')
  }
}
class cp extends co {
  constructor() {
    super(...arguments), (this.type = 3)
  }
  j(e) {
    this.element[this.name] = e === je ? void 0 : e
  }
}
class hp extends co {
  constructor() {
    super(...arguments), (this.type = 4)
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== je)
  }
}
class dp extends co {
  constructor(e, t, n, r, i) {
    super(e, t, n, r, i), (this.type = 5)
  }
  _$AI(e, t = this) {
    if ((e = Jr(this, e, t, 0) ?? je) === yr) return
    const n = this._$AH,
      r =
        (e === je && n !== je) ||
        e.capture !== n.capture ||
        e.once !== n.once ||
        e.passive !== n.passive,
      i = e !== je && (n === je || r)
    r && this.element.removeEventListener(this.name, this, n),
      i && this.element.addEventListener(this.name, this, e),
      (this._$AH = e)
  }
  handleEvent(e) {
    var t
    typeof this._$AH == 'function'
      ? this._$AH.call(
          ((t = this.options) == null ? void 0 : t.host) ?? this.element,
          e
        )
      : this._$AH.handleEvent(e)
  }
}
class fp {
  constructor(e, t, n) {
    ;(this.element = e),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = t),
      (this.options = n)
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(e) {
    Jr(this, e)
  }
}
const Mo = Li.litHtmlPolyfillSupport
Mo == null || Mo(Xi, es),
  (Li.litHtmlVersions ?? (Li.litHtmlVersions = [])).push('3.2.1')
const pp = (o, e, t) => {
  const n = (t == null ? void 0 : t.renderBefore) ?? e
  let r = n._$litPart$
  if (r === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null
    n._$litPart$ = r = new es(e.insertBefore(Yi(), i), i, void 0, t ?? {})
  }
  return r._$AI(o), r
}
let me = class extends Lr {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0)
  }
  createRenderRoot() {
    var t
    const e = super.createRenderRoot()
    return (
      (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild),
      e
    )
  }
  update(e) {
    const t = this.render()
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(e),
      (this._$Do = pp(t, this.renderRoot, this.renderOptions))
  }
  connectedCallback() {
    var e
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0)
  }
  disconnectedCallback() {
    var e
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1)
  }
  render() {
    return yr
  }
}
var Lu
;(me._$litElement$ = !0),
  (me.finalized = !0),
  (Lu = globalThis.litElementHydrateSupport) == null ||
    Lu.call(globalThis, { LitElement: me })
const Ro = globalThis.litElementPolyfillSupport
Ro == null || Ro({ LitElement: me })
;(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push(
  '4.1.1'
)
const Ae = (o) => (e, t) => {
  t !== void 0
    ? t.addInitializer(() => {
        customElements.define(o, e)
      })
    : customElements.define(o, e)
}
const gp = {
    attribute: !0,
    type: String,
    converter: Js,
    reflect: !1,
    hasChanged: ol,
  },
  mp = (o = gp, e, t) => {
    const { kind: n, metadata: r } = t
    let i = globalThis.litPropertyMetadata.get(r)
    if (
      (i === void 0 && globalThis.litPropertyMetadata.set(r, (i = new Map())),
      i.set(t.name, o),
      n === 'accessor')
    ) {
      const { name: s } = t
      return {
        set(a) {
          const l = e.get.call(this)
          e.set.call(this, a), this.requestUpdate(s, l, o)
        },
        init(a) {
          return a !== void 0 && this.P(s, void 0, o), a
        },
      }
    }
    if (n === 'setter') {
      const { name: s } = t
      return function (a) {
        const l = this[s]
        e.call(this, a), this.requestUpdate(s, l, o)
      }
    }
    throw Error('Unsupported decorator location: ' + n)
  }
function re(o) {
  return (e, t) =>
    typeof t == 'object'
      ? mp(o, e, t)
      : ((n, r, i) => {
          const s = r.hasOwnProperty(i)
          return (
            r.constructor.createProperty(i, s ? { ...n, wrapped: !0 } : n),
            s ? Object.getOwnPropertyDescriptor(r, i) : void 0
          )
        })(o, e, t)
}
function _p(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, 'default')
    ? o.default
    : o
}
var zo = { exports: {} }
var gu
function Dp() {
  return (
    gu ||
      ((gu = 1),
      (function (o) {
        ;(function () {
          var e = {}.hasOwnProperty
          function t() {
            for (var i = '', s = 0; s < arguments.length; s++) {
              var a = arguments[s]
              a && (i = r(i, n(a)))
            }
            return i
          }
          function n(i) {
            if (typeof i == 'string' || typeof i == 'number') return i
            if (typeof i != 'object') return ''
            if (Array.isArray(i)) return t.apply(null, i)
            if (
              i.toString !== Object.prototype.toString &&
              !i.toString.toString().includes('[native code]')
            )
              return i.toString()
            var s = ''
            for (var a in i) e.call(i, a) && i[a] && (s = r(s, a))
            return s
          }
          function r(i, s) {
            return s ? (i ? i + ' ' + s : i + s) : i
          }
          o.exports
            ? ((t.default = t), (o.exports = t))
            : (window.classNames = t)
        })()
      })(zo)),
    zo.exports
  )
}
var yp = Dp()
const Zr = _p(yp)
var vp = Object.defineProperty,
  xp = Object.getOwnPropertyDescriptor,
  bh = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? xp(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && vp(e, t, r), r
  }
let ga = class extends me {
  constructor() {
    super(...arguments), (this.classNames = '')
  }
  render() {
    const e = Zr('progressive-blur', this.classNames)
    return ie`
      <div class=${e}>
        ${Array.from({ length: 6 }, () => ie`<div></div>`)}
      </div>
    `
  }
  createRenderRoot() {
    return this
  }
}
bh([re({ type: String })], ga.prototype, 'classNames', 2)
ga = bh([Ae('progressive-blur')], ga)
const q = (o) => typeof o == 'string',
  hi = () => {
    let o, e
    const t = new Promise((n, r) => {
      ;(o = n), (e = r)
    })
    return (t.resolve = o), (t.reject = e), t
  },
  mu = (o) => (o == null ? '' : '' + o),
  bp = (o, e, t) => {
    o.forEach((n) => {
      e[n] && (t[n] = e[n])
    })
  },
  Cp = /###/g,
  _u = (o) => (o && o.indexOf('###') > -1 ? o.replace(Cp, '.') : o),
  Du = (o) => !o || q(o),
  Mi = (o, e, t) => {
    const n = q(e) ? e.split('.') : e
    let r = 0
    for (; r < n.length - 1; ) {
      if (Du(o)) return {}
      const i = _u(n[r])
      !o[i] && t && (o[i] = new t()),
        Object.prototype.hasOwnProperty.call(o, i) ? (o = o[i]) : (o = {}),
        ++r
    }
    return Du(o) ? {} : { obj: o, k: _u(n[r]) }
  },
  yu = (o, e, t) => {
    const { obj: n, k: r } = Mi(o, e, Object)
    if (n !== void 0 || e.length === 1) {
      n[r] = t
      return
    }
    let i = e[e.length - 1],
      s = e.slice(0, e.length - 1),
      a = Mi(o, s, Object)
    for (; a.obj === void 0 && s.length; )
      (i = `${s[s.length - 1]}.${i}`),
        (s = s.slice(0, s.length - 1)),
        (a = Mi(o, s, Object)),
        a != null &&
          a.obj &&
          typeof a.obj[`${a.k}.${i}`] < 'u' &&
          (a.obj = void 0)
    a.obj[`${a.k}.${i}`] = t
  },
  wp = (o, e, t, n) => {
    const { obj: r, k: i } = Mi(o, e, Object)
    ;(r[i] = r[i] || []), r[i].push(t)
  },
  Qs = (o, e) => {
    const { obj: t, k: n } = Mi(o, e)
    if (t && Object.prototype.hasOwnProperty.call(t, n)) return t[n]
  },
  Sp = (o, e, t) => {
    const n = Qs(o, t)
    return n !== void 0 ? n : Qs(e, t)
  },
  Ch = (o, e, t) => {
    for (const n in e)
      n !== '__proto__' &&
        n !== 'constructor' &&
        (n in o
          ? q(o[n]) ||
            o[n] instanceof String ||
            q(e[n]) ||
            e[n] instanceof String
            ? t && (o[n] = e[n])
            : Ch(o[n], e[n], t)
          : (o[n] = e[n]))
    return o
  },
  kr = (o) => o.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
var Ep = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
}
const Tp = (o) => (q(o) ? o.replace(/[&<>"'\/]/g, (e) => Ep[e]) : o)
class kp {
  constructor(e) {
    ;(this.capacity = e), (this.regExpMap = new Map()), (this.regExpQueue = [])
  }
  getRegExp(e) {
    const t = this.regExpMap.get(e)
    if (t !== void 0) return t
    const n = new RegExp(e)
    return (
      this.regExpQueue.length === this.capacity &&
        this.regExpMap.delete(this.regExpQueue.shift()),
      this.regExpMap.set(e, n),
      this.regExpQueue.push(e),
      n
    )
  }
}
const $p = [' ', ',', '?', '!', ';'],
  Pp = new kp(20),
  Fp = (o, e, t) => {
    ;(e = e || ''), (t = t || '')
    const n = $p.filter((s) => e.indexOf(s) < 0 && t.indexOf(s) < 0)
    if (n.length === 0) return !0
    const r = Pp.getRegExp(
      `(${n.map((s) => (s === '?' ? '\\?' : s)).join('|')})`
    )
    let i = !r.test(o)
    if (!i) {
      const s = o.indexOf(t)
      s > 0 && !r.test(o.substring(0, s)) && (i = !0)
    }
    return i
  },
  ma = function (o, e) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : '.'
    if (!o) return
    if (o[e]) return Object.prototype.hasOwnProperty.call(o, e) ? o[e] : void 0
    const n = e.split(t)
    let r = o
    for (let i = 0; i < n.length; ) {
      if (!r || typeof r != 'object') return
      let s,
        a = ''
      for (let l = i; l < n.length; ++l)
        if ((l !== i && (a += t), (a += n[l]), (s = r[a]), s !== void 0)) {
          if (
            ['string', 'number', 'boolean'].indexOf(typeof s) > -1 &&
            l < n.length - 1
          )
            continue
          i += l - i + 1
          break
        }
      r = s
    }
    return r
  },
  eo = (o) => (o == null ? void 0 : o.replace('_', '-')),
  Ap = {
    type: 'logger',
    log(o) {
      this.output('log', o)
    },
    warn(o) {
      this.output('warn', o)
    },
    error(o) {
      this.output('error', o)
    },
    output(o, e) {
      var t, n
      ;(n =
        (t = console == null ? void 0 : console[o]) == null
          ? void 0
          : t.apply) == null || n.call(t, console, e)
    },
  }
class to {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    this.init(e, t)
  }
  init(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    ;(this.prefix = t.prefix || 'i18next:'),
      (this.logger = e || Ap),
      (this.options = t),
      (this.debug = t.debug)
  }
  log() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
    return this.forward(t, 'log', '', !0)
  }
  warn() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
    return this.forward(t, 'warn', '', !0)
  }
  error() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
    return this.forward(t, 'error', '')
  }
  deprecate() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
    return this.forward(t, 'warn', 'WARNING DEPRECATED: ', !0)
  }
  forward(e, t, n, r) {
    return r && !this.debug
      ? null
      : (q(e[0]) && (e[0] = `${n}${this.prefix} ${e[0]}`), this.logger[t](e))
  }
  create(e) {
    return new to(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options,
    })
  }
  clone(e) {
    return (
      (e = e || this.options),
      (e.prefix = e.prefix || this.prefix),
      new to(this.logger, e)
    )
  }
}
var ln = new to()
class ho {
  constructor() {
    this.observers = {}
  }
  on(e, t) {
    return (
      e.split(' ').forEach((n) => {
        this.observers[n] || (this.observers[n] = new Map())
        const r = this.observers[n].get(t) || 0
        this.observers[n].set(t, r + 1)
      }),
      this
    )
  }
  off(e, t) {
    if (this.observers[e]) {
      if (!t) {
        delete this.observers[e]
        return
      }
      this.observers[e].delete(t)
    }
  }
  emit(e) {
    for (
      var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
      r < t;
      r++
    )
      n[r - 1] = arguments[r]
    this.observers[e] &&
      Array.from(this.observers[e].entries()).forEach((s) => {
        let [a, l] = s
        for (let u = 0; u < l; u++) a(...n)
      }),
      this.observers['*'] &&
        Array.from(this.observers['*'].entries()).forEach((s) => {
          let [a, l] = s
          for (let u = 0; u < l; u++) a.apply(a, [e, ...n])
        })
  }
}
class vu extends ho {
  constructor(e) {
    let t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { ns: ['translation'], defaultNS: 'translation' }
    super(),
      (this.data = e || {}),
      (this.options = t),
      this.options.keySeparator === void 0 && (this.options.keySeparator = '.'),
      this.options.ignoreJSONStructure === void 0 &&
        (this.options.ignoreJSONStructure = !0)
  }
  addNamespaces(e) {
    this.options.ns.indexOf(e) < 0 && this.options.ns.push(e)
  }
  removeNamespaces(e) {
    const t = this.options.ns.indexOf(e)
    t > -1 && this.options.ns.splice(t, 1)
  }
  getResource(e, t, n) {
    var u, c
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}
    const i =
        r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator,
      s =
        r.ignoreJSONStructure !== void 0
          ? r.ignoreJSONStructure
          : this.options.ignoreJSONStructure
    let a
    e.indexOf('.') > -1
      ? (a = e.split('.'))
      : ((a = [e, t]),
        n &&
          (Array.isArray(n)
            ? a.push(...n)
            : q(n) && i
              ? a.push(...n.split(i))
              : a.push(n)))
    const l = Qs(this.data, a)
    return (
      !l &&
        !t &&
        !n &&
        e.indexOf('.') > -1 &&
        ((e = a[0]), (t = a[1]), (n = a.slice(2).join('.'))),
      l || !s || !q(n)
        ? l
        : ma(
            (c = (u = this.data) == null ? void 0 : u[e]) == null
              ? void 0
              : c[t],
            n,
            i
          )
    )
  }
  addResource(e, t, n, r) {
    let i =
      arguments.length > 4 && arguments[4] !== void 0
        ? arguments[4]
        : { silent: !1 }
    const s =
      i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator
    let a = [e, t]
    n && (a = a.concat(s ? n.split(s) : n)),
      e.indexOf('.') > -1 && ((a = e.split('.')), (r = t), (t = a[1])),
      this.addNamespaces(t),
      yu(this.data, a, r),
      i.silent || this.emit('added', e, t, n, r)
  }
  addResources(e, t, n) {
    let r =
      arguments.length > 3 && arguments[3] !== void 0
        ? arguments[3]
        : { silent: !1 }
    for (const i in n)
      (q(n[i]) || Array.isArray(n[i])) &&
        this.addResource(e, t, i, n[i], { silent: !0 })
    r.silent || this.emit('added', e, t, n)
  }
  addResourceBundle(e, t, n, r, i) {
    let s =
        arguments.length > 5 && arguments[5] !== void 0
          ? arguments[5]
          : { silent: !1, skipCopy: !1 },
      a = [e, t]
    e.indexOf('.') > -1 && ((a = e.split('.')), (r = n), (n = t), (t = a[1])),
      this.addNamespaces(t)
    let l = Qs(this.data, a) || {}
    s.skipCopy || (n = JSON.parse(JSON.stringify(n))),
      r ? Ch(l, n, i) : (l = { ...l, ...n }),
      yu(this.data, a, l),
      s.silent || this.emit('added', e, t, n)
  }
  removeResourceBundle(e, t) {
    this.hasResourceBundle(e, t) && delete this.data[e][t],
      this.removeNamespaces(t),
      this.emit('removed', e, t)
  }
  hasResourceBundle(e, t) {
    return this.getResource(e, t) !== void 0
  }
  getResourceBundle(e, t) {
    return t || (t = this.options.defaultNS), this.getResource(e, t)
  }
  getDataByLanguage(e) {
    return this.data[e]
  }
  hasLanguageSomeTranslations(e) {
    const t = this.getDataByLanguage(e)
    return !!((t && Object.keys(t)) || []).find(
      (r) => t[r] && Object.keys(t[r]).length > 0
    )
  }
  toJSON() {
    return this.data
  }
}
var wh = {
  processors: {},
  addPostProcessor(o) {
    this.processors[o.name] = o
  },
  handle(o, e, t, n, r) {
    return (
      o.forEach((i) => {
        var s
        e =
          ((s = this.processors[i]) == null ? void 0 : s.process(e, t, n, r)) ??
          e
      }),
      e
    )
  },
}
const xu = {},
  bu = (o) => !q(o) && typeof o != 'boolean' && typeof o != 'number'
class no extends ho {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(),
      bp(
        [
          'resourceStore',
          'languageUtils',
          'pluralResolver',
          'interpolator',
          'backendConnector',
          'i18nFormat',
          'utils',
        ],
        e,
        this
      ),
      (this.options = t),
      this.options.keySeparator === void 0 && (this.options.keySeparator = '.'),
      (this.logger = ln.create('translator'))
  }
  changeLanguage(e) {
    e && (this.language = e)
  }
  exists(e) {
    let t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { interpolation: {} }
    if (e == null) return !1
    const n = this.resolve(e, t)
    return (n == null ? void 0 : n.res) !== void 0
  }
  extractFromKey(e, t) {
    let n = t.nsSeparator !== void 0 ? t.nsSeparator : this.options.nsSeparator
    n === void 0 && (n = ':')
    const r =
      t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator
    let i = t.ns || this.options.defaultNS || []
    const s = n && e.indexOf(n) > -1,
      a =
        !this.options.userDefinedKeySeparator &&
        !t.keySeparator &&
        !this.options.userDefinedNsSeparator &&
        !t.nsSeparator &&
        !Fp(e, n, r)
    if (s && !a) {
      const l = e.match(this.interpolator.nestingRegexp)
      if (l && l.length > 0) return { key: e, namespaces: q(i) ? [i] : i }
      const u = e.split(n)
      ;(n !== r || (n === r && this.options.ns.indexOf(u[0]) > -1)) &&
        (i = u.shift()),
        (e = u.join(r))
    }
    return { key: e, namespaces: q(i) ? [i] : i }
  }
  translate(e, t, n) {
    if (
      (typeof t != 'object' &&
        this.options.overloadTranslationOptionHandler &&
        (t = this.options.overloadTranslationOptionHandler(arguments)),
      typeof t == 'object' && (t = { ...t }),
      t || (t = {}),
      e == null)
    )
      return ''
    Array.isArray(e) || (e = [String(e)])
    const r =
        t.returnDetails !== void 0
          ? t.returnDetails
          : this.options.returnDetails,
      i =
        t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator,
      { key: s, namespaces: a } = this.extractFromKey(e[e.length - 1], t),
      l = a[a.length - 1],
      u = t.lng || this.language,
      c = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode
    if ((u == null ? void 0 : u.toLowerCase()) === 'cimode') {
      if (c) {
        const A = t.nsSeparator || this.options.nsSeparator
        return r
          ? {
              res: `${l}${A}${s}`,
              usedKey: s,
              exactUsedKey: s,
              usedLng: u,
              usedNS: l,
              usedParams: this.getUsedParamsDetails(t),
            }
          : `${l}${A}${s}`
      }
      return r
        ? {
            res: s,
            usedKey: s,
            exactUsedKey: s,
            usedLng: u,
            usedNS: l,
            usedParams: this.getUsedParamsDetails(t),
          }
        : s
    }
    const h = this.resolve(e, t)
    let d = h == null ? void 0 : h.res
    const f = (h == null ? void 0 : h.usedKey) || s,
      g = (h == null ? void 0 : h.exactUsedKey) || s,
      p = ['[object Number]', '[object Function]', '[object RegExp]'],
      m = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays,
      _ = !this.i18nFormat || this.i18nFormat.handleAsObject,
      D = t.count !== void 0 && !q(t.count),
      C = no.hasDefaultValue(t),
      v = D ? this.pluralResolver.getSuffix(u, t.count, t) : '',
      w =
        t.ordinal && D
          ? this.pluralResolver.getSuffix(u, t.count, { ordinal: !1 })
          : '',
      E = D && !t.ordinal && t.count === 0,
      x =
        (E && t[`defaultValue${this.options.pluralSeparator}zero`]) ||
        t[`defaultValue${v}`] ||
        t[`defaultValue${w}`] ||
        t.defaultValue
    let $ = d
    _ && !d && C && ($ = x)
    const T = bu($),
      k = Object.prototype.toString.apply($)
    if (_ && $ && T && p.indexOf(k) < 0 && !(q(m) && Array.isArray($))) {
      if (!t.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler ||
          this.logger.warn(
            'accessing an object - but returnObjects options is not enabled!'
          )
        const A = this.options.returnedObjectHandler
          ? this.options.returnedObjectHandler(f, $, { ...t, ns: a })
          : `key '${s} (${this.language})' returned an object instead of string.`
        return r
          ? ((h.res = A), (h.usedParams = this.getUsedParamsDetails(t)), h)
          : A
      }
      if (i) {
        const A = Array.isArray($),
          P = A ? [] : {},
          j = A ? g : f
        for (const z in $)
          if (Object.prototype.hasOwnProperty.call($, z)) {
            const O = `${j}${i}${z}`
            C && !d
              ? (P[z] = this.translate(O, {
                  ...t,
                  defaultValue: bu(x) ? x[z] : void 0,
                  joinArrays: !1,
                  ns: a,
                }))
              : (P[z] = this.translate(O, { ...t, joinArrays: !1, ns: a })),
              P[z] === O && (P[z] = $[z])
          }
        d = P
      }
    } else if (_ && q(m) && Array.isArray(d))
      (d = d.join(m)), d && (d = this.extendTranslation(d, e, t, n))
    else {
      let A = !1,
        P = !1
      !this.isValidLookup(d) && C && ((A = !0), (d = x)),
        this.isValidLookup(d) || ((P = !0), (d = s))
      const z =
          (t.missingKeyNoValueFallbackToKey ||
            this.options.missingKeyNoValueFallbackToKey) &&
          P
            ? void 0
            : d,
        O = C && x !== d && this.options.updateMissing
      if (P || A || O) {
        if (
          (this.logger.log(O ? 'updateKey' : 'missingKey', u, l, s, O ? x : d),
          i)
        ) {
          const H = this.resolve(s, { ...t, keySeparator: !1 })
          H &&
            H.res &&
            this.logger.warn(
              'Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.'
            )
        }
        let I = []
        const R = this.languageUtils.getFallbackCodes(
          this.options.fallbackLng,
          t.lng || this.language
        )
        if (this.options.saveMissingTo === 'fallback' && R && R[0])
          for (let H = 0; H < R.length; H++) I.push(R[H])
        else
          this.options.saveMissingTo === 'all'
            ? (I = this.languageUtils.toResolveHierarchy(
                t.lng || this.language
              ))
            : I.push(t.lng || this.language)
        const N = (H, y, U) => {
          var ae
          const L = C && U !== d ? U : z
          this.options.missingKeyHandler
            ? this.options.missingKeyHandler(H, l, y, L, O, t)
            : (ae = this.backendConnector) != null &&
              ae.saveMissing &&
              this.backendConnector.saveMissing(H, l, y, L, O, t),
            this.emit('missingKey', H, l, y, d)
        }
        this.options.saveMissing &&
          (this.options.saveMissingPlurals && D
            ? I.forEach((H) => {
                const y = this.pluralResolver.getSuffixes(H, t)
                E &&
                  t[`defaultValue${this.options.pluralSeparator}zero`] &&
                  y.indexOf(`${this.options.pluralSeparator}zero`) < 0 &&
                  y.push(`${this.options.pluralSeparator}zero`),
                  y.forEach((U) => {
                    N([H], s + U, t[`defaultValue${U}`] || x)
                  })
              })
            : N(I, s, x))
      }
      ;(d = this.extendTranslation(d, e, t, h, n)),
        P &&
          d === s &&
          this.options.appendNamespaceToMissingKey &&
          (d = `${l}:${s}`),
        (P || A) &&
          this.options.parseMissingKeyHandler &&
          (d = this.options.parseMissingKeyHandler(
            this.options.appendNamespaceToMissingKey ? `${l}:${s}` : s,
            A ? d : void 0
          ))
    }
    return r
      ? ((h.res = d), (h.usedParams = this.getUsedParamsDetails(t)), h)
      : d
  }
  extendTranslation(e, t, n, r, i) {
    var u, c
    var s = this
    if ((u = this.i18nFormat) != null && u.parse)
      e = this.i18nFormat.parse(
        e,
        { ...this.options.interpolation.defaultVariables, ...n },
        n.lng || this.language || r.usedLng,
        r.usedNS,
        r.usedKey,
        { resolved: r }
      )
    else if (!n.skipInterpolation) {
      n.interpolation &&
        this.interpolator.init({
          ...n,
          interpolation: { ...this.options.interpolation, ...n.interpolation },
        })
      const h =
        q(e) &&
        (((c = n == null ? void 0 : n.interpolation) == null
          ? void 0
          : c.skipOnVariables) !== void 0
          ? n.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables)
      let d
      if (h) {
        const g = e.match(this.interpolator.nestingRegexp)
        d = g && g.length
      }
      let f = n.replace && !q(n.replace) ? n.replace : n
      if (
        (this.options.interpolation.defaultVariables &&
          (f = { ...this.options.interpolation.defaultVariables, ...f }),
        (e = this.interpolator.interpolate(
          e,
          f,
          n.lng || this.language || r.usedLng,
          n
        )),
        h)
      ) {
        const g = e.match(this.interpolator.nestingRegexp),
          p = g && g.length
        d < p && (n.nest = !1)
      }
      !n.lng && r && r.res && (n.lng = this.language || r.usedLng),
        n.nest !== !1 &&
          (e = this.interpolator.nest(
            e,
            function () {
              for (
                var g = arguments.length, p = new Array(g), m = 0;
                m < g;
                m++
              )
                p[m] = arguments[m]
              return (i == null ? void 0 : i[0]) === p[0] && !n.context
                ? (s.logger.warn(
                    `It seems you are nesting recursively key: ${p[0]} in key: ${t[0]}`
                  ),
                  null)
                : s.translate(...p, t)
            },
            n
          )),
        n.interpolation && this.interpolator.reset()
    }
    const a = n.postProcess || this.options.postProcess,
      l = q(a) ? [a] : a
    return (
      e != null &&
        l != null &&
        l.length &&
        n.applyPostProcessor !== !1 &&
        (e = wh.handle(
          l,
          e,
          t,
          this.options && this.options.postProcessPassResolved
            ? {
                i18nResolved: {
                  ...r,
                  usedParams: this.getUsedParamsDetails(n),
                },
                ...n,
              }
            : n,
          this
        )),
      e
    )
  }
  resolve(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n,
      r,
      i,
      s,
      a
    return (
      q(e) && (e = [e]),
      e.forEach((l) => {
        if (this.isValidLookup(n)) return
        const u = this.extractFromKey(l, t),
          c = u.key
        r = c
        let h = u.namespaces
        this.options.fallbackNS && (h = h.concat(this.options.fallbackNS))
        const d = t.count !== void 0 && !q(t.count),
          f = d && !t.ordinal && t.count === 0,
          g =
            t.context !== void 0 &&
            (q(t.context) || typeof t.context == 'number') &&
            t.context !== '',
          p = t.lngs
            ? t.lngs
            : this.languageUtils.toResolveHierarchy(
                t.lng || this.language,
                t.fallbackLng
              )
        h.forEach((m) => {
          var _, D
          this.isValidLookup(n) ||
            ((a = m),
            !xu[`${p[0]}-${m}`] &&
              (_ = this.utils) != null &&
              _.hasLoadedNamespace &&
              !((D = this.utils) != null && D.hasLoadedNamespace(a)) &&
              ((xu[`${p[0]}-${m}`] = !0),
              this.logger.warn(
                `key "${r}" for languages "${p.join(', ')}" won't get resolved as namespace "${a}" was not yet loaded`,
                'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!'
              )),
            p.forEach((C) => {
              var E
              if (this.isValidLookup(n)) return
              s = C
              const v = [c]
              if ((E = this.i18nFormat) != null && E.addLookupKeys)
                this.i18nFormat.addLookupKeys(v, c, C, m, t)
              else {
                let x
                d && (x = this.pluralResolver.getSuffix(C, t.count, t))
                const $ = `${this.options.pluralSeparator}zero`,
                  T = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`
                if (
                  (d &&
                    (v.push(c + x),
                    t.ordinal &&
                      x.indexOf(T) === 0 &&
                      v.push(c + x.replace(T, this.options.pluralSeparator)),
                    f && v.push(c + $)),
                  g)
                ) {
                  const k = `${c}${this.options.contextSeparator}${t.context}`
                  v.push(k),
                    d &&
                      (v.push(k + x),
                      t.ordinal &&
                        x.indexOf(T) === 0 &&
                        v.push(k + x.replace(T, this.options.pluralSeparator)),
                      f && v.push(k + $))
                }
              }
              let w
              for (; (w = v.pop()); )
                this.isValidLookup(n) ||
                  ((i = w), (n = this.getResource(C, m, w, t)))
            }))
        })
      }),
      { res: n, usedKey: r, exactUsedKey: i, usedLng: s, usedNS: a }
    )
  }
  isValidLookup(e) {
    return (
      e !== void 0 &&
      !(!this.options.returnNull && e === null) &&
      !(!this.options.returnEmptyString && e === '')
    )
  }
  getResource(e, t, n) {
    var i
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}
    return (i = this.i18nFormat) != null && i.getResource
      ? this.i18nFormat.getResource(e, t, n, r)
      : this.resourceStore.getResource(e, t, n, r)
  }
  getUsedParamsDetails() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    const t = [
        'defaultValue',
        'ordinal',
        'context',
        'replace',
        'lng',
        'lngs',
        'fallbackLng',
        'ns',
        'keySeparator',
        'nsSeparator',
        'returnObjects',
        'returnDetails',
        'joinArrays',
        'postProcess',
        'interpolation',
      ],
      n = e.replace && !q(e.replace)
    let r = n ? e.replace : e
    if (
      (n && typeof e.count < 'u' && (r.count = e.count),
      this.options.interpolation.defaultVariables &&
        (r = { ...this.options.interpolation.defaultVariables, ...r }),
      !n)
    ) {
      r = { ...r }
      for (const i of t) delete r[i]
    }
    return r
  }
  static hasDefaultValue(e) {
    const t = 'defaultValue'
    for (const n in e)
      if (
        Object.prototype.hasOwnProperty.call(e, n) &&
        t === n.substring(0, t.length) &&
        e[n] !== void 0
      )
        return !0
    return !1
  }
}
class Cu {
  constructor(e) {
    ;(this.options = e),
      (this.supportedLngs = this.options.supportedLngs || !1),
      (this.logger = ln.create('languageUtils'))
  }
  getScriptPartFromCode(e) {
    if (((e = eo(e)), !e || e.indexOf('-') < 0)) return null
    const t = e.split('-')
    return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === 'x')
      ? null
      : this.formatLanguageCode(t.join('-'))
  }
  getLanguagePartFromCode(e) {
    if (((e = eo(e)), !e || e.indexOf('-') < 0)) return e
    const t = e.split('-')
    return this.formatLanguageCode(t[0])
  }
  formatLanguageCode(e) {
    if (q(e) && e.indexOf('-') > -1) {
      let t
      try {
        t = Intl.getCanonicalLocales(e)[0]
      } catch {}
      return (
        t && this.options.lowerCaseLng && (t = t.toLowerCase()),
        t || (this.options.lowerCaseLng ? e.toLowerCase() : e)
      )
    }
    return this.options.cleanCode || this.options.lowerCaseLng
      ? e.toLowerCase()
      : e
  }
  isSupportedCode(e) {
    return (
      (this.options.load === 'languageOnly' ||
        this.options.nonExplicitSupportedLngs) &&
        (e = this.getLanguagePartFromCode(e)),
      !this.supportedLngs ||
        !this.supportedLngs.length ||
        this.supportedLngs.indexOf(e) > -1
    )
  }
  getBestMatchFromCodes(e) {
    if (!e) return null
    let t
    return (
      e.forEach((n) => {
        if (t) return
        const r = this.formatLanguageCode(n)
        ;(!this.options.supportedLngs || this.isSupportedCode(r)) && (t = r)
      }),
      !t &&
        this.options.supportedLngs &&
        e.forEach((n) => {
          if (t) return
          const r = this.getLanguagePartFromCode(n)
          if (this.isSupportedCode(r)) return (t = r)
          t = this.options.supportedLngs.find((i) => {
            if (i === r) return i
            if (
              !(i.indexOf('-') < 0 && r.indexOf('-') < 0) &&
              ((i.indexOf('-') > 0 &&
                r.indexOf('-') < 0 &&
                i.substring(0, i.indexOf('-')) === r) ||
                (i.indexOf(r) === 0 && r.length > 1))
            )
              return i
          })
        }),
      t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]),
      t
    )
  }
  getFallbackCodes(e, t) {
    if (!e) return []
    if (
      (typeof e == 'function' && (e = e(t)),
      q(e) && (e = [e]),
      Array.isArray(e))
    )
      return e
    if (!t) return e.default || []
    let n = e[t]
    return (
      n || (n = e[this.getScriptPartFromCode(t)]),
      n || (n = e[this.formatLanguageCode(t)]),
      n || (n = e[this.getLanguagePartFromCode(t)]),
      n || (n = e.default),
      n || []
    )
  }
  toResolveHierarchy(e, t) {
    const n = this.getFallbackCodes(t || this.options.fallbackLng || [], e),
      r = [],
      i = (s) => {
        s &&
          (this.isSupportedCode(s)
            ? r.push(s)
            : this.logger.warn(
                `rejecting language code not found in supportedLngs: ${s}`
              ))
      }
    return (
      q(e) && (e.indexOf('-') > -1 || e.indexOf('_') > -1)
        ? (this.options.load !== 'languageOnly' &&
            i(this.formatLanguageCode(e)),
          this.options.load !== 'languageOnly' &&
            this.options.load !== 'currentOnly' &&
            i(this.getScriptPartFromCode(e)),
          this.options.load !== 'currentOnly' &&
            i(this.getLanguagePartFromCode(e)))
        : q(e) && i(this.formatLanguageCode(e)),
      n.forEach((s) => {
        r.indexOf(s) < 0 && i(this.formatLanguageCode(s))
      }),
      r
    )
  }
}
const wu = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 },
  Su = {
    select: (o) => (o === 1 ? 'one' : 'other'),
    resolvedOptions: () => ({ pluralCategories: ['one', 'other'] }),
  }
class Op {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    ;(this.languageUtils = e),
      (this.options = t),
      (this.logger = ln.create('pluralResolver')),
      (this.pluralRulesCache = {})
  }
  addRule(e, t) {
    this.rules[e] = t
  }
  clearCache() {
    this.pluralRulesCache = {}
  }
  getRule(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const n = eo(e === 'dev' ? 'en' : e),
      r = t.ordinal ? 'ordinal' : 'cardinal',
      i = JSON.stringify({ cleanedCode: n, type: r })
    if (i in this.pluralRulesCache) return this.pluralRulesCache[i]
    let s
    try {
      s = new Intl.PluralRules(n, { type: r })
    } catch {
      if (!Intl)
        return (
          this.logger.error('No Intl support, please use an Intl polyfill!'), Su
        )
      if (!e.match(/-|_/)) return Su
      const l = this.languageUtils.getLanguagePartFromCode(e)
      s = this.getRule(l, t)
    }
    return (this.pluralRulesCache[i] = s), s
  }
  needsPlural(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = this.getRule(e, t)
    return (
      n || (n = this.getRule('dev', t)),
      (n == null ? void 0 : n.resolvedOptions().pluralCategories.length) > 1
    )
  }
  getPluralFormsOfKey(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    return this.getSuffixes(e, n).map((r) => `${t}${r}`)
  }
  getSuffixes(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = this.getRule(e, t)
    return (
      n || (n = this.getRule('dev', t)),
      n
        ? n
            .resolvedOptions()
            .pluralCategories.sort((r, i) => wu[r] - wu[i])
            .map(
              (r) =>
                `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ''}${r}`
            )
        : []
    )
  }
  getSuffix(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    const r = this.getRule(e, n)
    return r
      ? `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ''}${r.select(t)}`
      : (this.logger.warn(`no plural rule found for: ${e}`),
        this.getSuffix('dev', t, n))
  }
}
const Eu = function (o, e, t) {
    let n =
        arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : '.',
      r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0,
      i = Sp(o, e, t)
    return (
      !i && r && q(t) && ((i = ma(o, t, n)), i === void 0 && (i = ma(e, t, n))),
      i
    )
  },
  Io = (o) => o.replace(/\$/g, '$$$$')
class Lp {
  constructor() {
    var t
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    ;(this.logger = ln.create('interpolator')),
      (this.options = e),
      (this.format =
        ((t = e == null ? void 0 : e.interpolation) == null
          ? void 0
          : t.format) || ((n) => n)),
      this.init(e)
  }
  init() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    e.interpolation || (e.interpolation = { escapeValue: !0 })
    const {
      escape: t,
      escapeValue: n,
      useRawValueToEscape: r,
      prefix: i,
      prefixEscaped: s,
      suffix: a,
      suffixEscaped: l,
      formatSeparator: u,
      unescapeSuffix: c,
      unescapePrefix: h,
      nestingPrefix: d,
      nestingPrefixEscaped: f,
      nestingSuffix: g,
      nestingSuffixEscaped: p,
      nestingOptionsSeparator: m,
      maxReplaces: _,
      alwaysFormat: D,
    } = e.interpolation
    ;(this.escape = t !== void 0 ? t : Tp),
      (this.escapeValue = n !== void 0 ? n : !0),
      (this.useRawValueToEscape = r !== void 0 ? r : !1),
      (this.prefix = i ? kr(i) : s || '{{'),
      (this.suffix = a ? kr(a) : l || '}}'),
      (this.formatSeparator = u || ','),
      (this.unescapePrefix = c ? '' : h || '-'),
      (this.unescapeSuffix = this.unescapePrefix ? '' : c || ''),
      (this.nestingPrefix = d ? kr(d) : f || kr('$t(')),
      (this.nestingSuffix = g ? kr(g) : p || kr(')')),
      (this.nestingOptionsSeparator = m || ','),
      (this.maxReplaces = _ || 1e3),
      (this.alwaysFormat = D !== void 0 ? D : !1),
      this.resetRegExp()
  }
  reset() {
    this.options && this.init(this.options)
  }
  resetRegExp() {
    const e = (t, n) =>
      (t == null ? void 0 : t.source) === n
        ? ((t.lastIndex = 0), t)
        : new RegExp(n, 'g')
    ;(this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`)),
      (this.regexpUnescape = e(
        this.regexpUnescape,
        `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`
      )),
      (this.nestingRegexp = e(
        this.nestingRegexp,
        `${this.nestingPrefix}(.+?)${this.nestingSuffix}`
      ))
  }
  interpolate(e, t, n, r) {
    var f
    let i, s, a
    const l =
        (this.options &&
          this.options.interpolation &&
          this.options.interpolation.defaultVariables) ||
        {},
      u = (g) => {
        if (g.indexOf(this.formatSeparator) < 0) {
          const D = Eu(
            t,
            l,
            g,
            this.options.keySeparator,
            this.options.ignoreJSONStructure
          )
          return this.alwaysFormat
            ? this.format(D, void 0, n, { ...r, ...t, interpolationkey: g })
            : D
        }
        const p = g.split(this.formatSeparator),
          m = p.shift().trim(),
          _ = p.join(this.formatSeparator).trim()
        return this.format(
          Eu(
            t,
            l,
            m,
            this.options.keySeparator,
            this.options.ignoreJSONStructure
          ),
          _,
          n,
          { ...r, ...t, interpolationkey: m }
        )
      }
    this.resetRegExp()
    const c =
        (r == null ? void 0 : r.missingInterpolationHandler) ||
        this.options.missingInterpolationHandler,
      h =
        ((f = r == null ? void 0 : r.interpolation) == null
          ? void 0
          : f.skipOnVariables) !== void 0
          ? r.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables
    return (
      [
        { regex: this.regexpUnescape, safeValue: (g) => Io(g) },
        {
          regex: this.regexp,
          safeValue: (g) => (this.escapeValue ? Io(this.escape(g)) : Io(g)),
        },
      ].forEach((g) => {
        for (a = 0; (i = g.regex.exec(e)); ) {
          const p = i[1].trim()
          if (((s = u(p)), s === void 0))
            if (typeof c == 'function') {
              const _ = c(e, i, r)
              s = q(_) ? _ : ''
            } else if (r && Object.prototype.hasOwnProperty.call(r, p)) s = ''
            else if (h) {
              s = i[0]
              continue
            } else
              this.logger.warn(
                `missed to pass in variable ${p} for interpolating ${e}`
              ),
                (s = '')
          else !q(s) && !this.useRawValueToEscape && (s = mu(s))
          const m = g.safeValue(s)
          if (
            ((e = e.replace(i[0], m)),
            h
              ? ((g.regex.lastIndex += s.length),
                (g.regex.lastIndex -= i[0].length))
              : (g.regex.lastIndex = 0),
            a++,
            a >= this.maxReplaces)
          )
            break
        }
      }),
      e
    )
  }
  nest(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      r,
      i,
      s
    const a = (l, u) => {
      const c = this.nestingOptionsSeparator
      if (l.indexOf(c) < 0) return l
      const h = l.split(new RegExp(`${c}[ ]*{`))
      let d = `{${h[1]}`
      ;(l = h[0]), (d = this.interpolate(d, s))
      const f = d.match(/'/g),
        g = d.match(/"/g)
      ;((((f == null ? void 0 : f.length) ?? 0) % 2 === 0 && !g) ||
        g.length % 2 !== 0) &&
        (d = d.replace(/'/g, '"'))
      try {
        ;(s = JSON.parse(d)), u && (s = { ...u, ...s })
      } catch (p) {
        return (
          this.logger.warn(
            `failed parsing options string in nesting for key ${l}`,
            p
          ),
          `${l}${c}${d}`
        )
      }
      return (
        s.defaultValue &&
          s.defaultValue.indexOf(this.prefix) > -1 &&
          delete s.defaultValue,
        l
      )
    }
    for (; (r = this.nestingRegexp.exec(e)); ) {
      let l = []
      ;(s = { ...n }),
        (s = s.replace && !q(s.replace) ? s.replace : s),
        (s.applyPostProcessor = !1),
        delete s.defaultValue
      let u = !1
      if (r[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(r[1])) {
        const c = r[1].split(this.formatSeparator).map((h) => h.trim())
        ;(r[1] = c.shift()), (l = c), (u = !0)
      }
      if (((i = t(a.call(this, r[1].trim(), s), s)), i && r[0] === e && !q(i)))
        return i
      q(i) || (i = mu(i)),
        i ||
          (this.logger.warn(`missed to resolve ${r[1]} for nesting ${e}`),
          (i = '')),
        u &&
          (i = l.reduce(
            (c, h) =>
              this.format(c, h, n.lng, { ...n, interpolationkey: r[1].trim() }),
            i.trim()
          )),
        (e = e.replace(r[0], i)),
        (this.regexp.lastIndex = 0)
    }
    return e
  }
}
const Mp = (o) => {
    let e = o.toLowerCase().trim()
    const t = {}
    if (o.indexOf('(') > -1) {
      const n = o.split('(')
      e = n[0].toLowerCase().trim()
      const r = n[1].substring(0, n[1].length - 1)
      e === 'currency' && r.indexOf(':') < 0
        ? t.currency || (t.currency = r.trim())
        : e === 'relativetime' && r.indexOf(':') < 0
          ? t.range || (t.range = r.trim())
          : r.split(';').forEach((s) => {
              if (s) {
                const [a, ...l] = s.split(':'),
                  u = l
                    .join(':')
                    .trim()
                    .replace(/^'+|'+$/g, ''),
                  c = a.trim()
                t[c] || (t[c] = u),
                  u === 'false' && (t[c] = !1),
                  u === 'true' && (t[c] = !0),
                  isNaN(u) || (t[c] = parseInt(u, 10))
              }
            })
    }
    return { formatName: e, formatOptions: t }
  },
  $r = (o) => {
    const e = {}
    return (t, n, r) => {
      let i = r
      r &&
        r.interpolationkey &&
        r.formatParams &&
        r.formatParams[r.interpolationkey] &&
        r[r.interpolationkey] &&
        (i = { ...i, [r.interpolationkey]: void 0 })
      const s = n + JSON.stringify(i)
      let a = e[s]
      return a || ((a = o(eo(n), r)), (e[s] = a)), a(t)
    }
  }
class Rp {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    ;(this.logger = ln.create('formatter')),
      (this.options = e),
      (this.formats = {
        number: $r((t, n) => {
          const r = new Intl.NumberFormat(t, { ...n })
          return (i) => r.format(i)
        }),
        currency: $r((t, n) => {
          const r = new Intl.NumberFormat(t, { ...n, style: 'currency' })
          return (i) => r.format(i)
        }),
        datetime: $r((t, n) => {
          const r = new Intl.DateTimeFormat(t, { ...n })
          return (i) => r.format(i)
        }),
        relativetime: $r((t, n) => {
          const r = new Intl.RelativeTimeFormat(t, { ...n })
          return (i) => r.format(i, n.range || 'day')
        }),
        list: $r((t, n) => {
          const r = new Intl.ListFormat(t, { ...n })
          return (i) => r.format(i)
        }),
      }),
      this.init(e)
  }
  init(e) {
    let t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { interpolation: {} }
    this.formatSeparator = t.interpolation.formatSeparator || ','
  }
  add(e, t) {
    this.formats[e.toLowerCase().trim()] = t
  }
  addCached(e, t) {
    this.formats[e.toLowerCase().trim()] = $r(t)
  }
  format(e, t, n) {
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}
    const i = t.split(this.formatSeparator)
    if (
      i.length > 1 &&
      i[0].indexOf('(') > 1 &&
      i[0].indexOf(')') < 0 &&
      i.find((a) => a.indexOf(')') > -1)
    ) {
      const a = i.findIndex((l) => l.indexOf(')') > -1)
      i[0] = [i[0], ...i.splice(1, a)].join(this.formatSeparator)
    }
    return i.reduce((a, l) => {
      var h
      const { formatName: u, formatOptions: c } = Mp(l)
      if (this.formats[u]) {
        let d = a
        try {
          const f =
              ((h = r == null ? void 0 : r.formatParams) == null
                ? void 0
                : h[r.interpolationkey]) || {},
            g = f.locale || f.lng || r.locale || r.lng || n
          d = this.formats[u](a, g, { ...c, ...r, ...f })
        } catch (f) {
          this.logger.warn(f)
        }
        return d
      } else this.logger.warn(`there was no format function for ${u}`)
      return a
    }, e)
  }
}
const zp = (o, e) => {
  o.pending[e] !== void 0 && (delete o.pending[e], o.pendingCount--)
}
class Ip extends ho {
  constructor(e, t, n) {
    var i, s
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}
    super(),
      (this.backend = e),
      (this.store = t),
      (this.services = n),
      (this.languageUtils = n.languageUtils),
      (this.options = r),
      (this.logger = ln.create('backendConnector')),
      (this.waitingReads = []),
      (this.maxParallelReads = r.maxParallelReads || 10),
      (this.readingCalls = 0),
      (this.maxRetries = r.maxRetries >= 0 ? r.maxRetries : 5),
      (this.retryTimeout = r.retryTimeout >= 1 ? r.retryTimeout : 350),
      (this.state = {}),
      (this.queue = []),
      (s = (i = this.backend) == null ? void 0 : i.init) == null ||
        s.call(i, n, r.backend, r)
  }
  queueLoad(e, t, n, r) {
    const i = {},
      s = {},
      a = {},
      l = {}
    return (
      e.forEach((u) => {
        let c = !0
        t.forEach((h) => {
          const d = `${u}|${h}`
          !n.reload && this.store.hasResourceBundle(u, h)
            ? (this.state[d] = 2)
            : this.state[d] < 0 ||
              (this.state[d] === 1
                ? s[d] === void 0 && (s[d] = !0)
                : ((this.state[d] = 1),
                  (c = !1),
                  s[d] === void 0 && (s[d] = !0),
                  i[d] === void 0 && (i[d] = !0),
                  l[h] === void 0 && (l[h] = !0)))
        }),
          c || (a[u] = !0)
      }),
      (Object.keys(i).length || Object.keys(s).length) &&
        this.queue.push({
          pending: s,
          pendingCount: Object.keys(s).length,
          loaded: {},
          errors: [],
          callback: r,
        }),
      {
        toLoad: Object.keys(i),
        pending: Object.keys(s),
        toLoadLanguages: Object.keys(a),
        toLoadNamespaces: Object.keys(l),
      }
    )
  }
  loaded(e, t, n) {
    const r = e.split('|'),
      i = r[0],
      s = r[1]
    t && this.emit('failedLoading', i, s, t),
      !t &&
        n &&
        this.store.addResourceBundle(i, s, n, void 0, void 0, { skipCopy: !0 }),
      (this.state[e] = t ? -1 : 2),
      t && n && (this.state[e] = 0)
    const a = {}
    this.queue.forEach((l) => {
      wp(l.loaded, [i], s),
        zp(l, e),
        t && l.errors.push(t),
        l.pendingCount === 0 &&
          !l.done &&
          (Object.keys(l.loaded).forEach((u) => {
            a[u] || (a[u] = {})
            const c = l.loaded[u]
            c.length &&
              c.forEach((h) => {
                a[u][h] === void 0 && (a[u][h] = !0)
              })
          }),
          (l.done = !0),
          l.errors.length ? l.callback(l.errors) : l.callback())
    }),
      this.emit('loaded', a),
      (this.queue = this.queue.filter((l) => !l.done))
  }
  read(e, t, n) {
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0,
      i =
        arguments.length > 4 && arguments[4] !== void 0
          ? arguments[4]
          : this.retryTimeout,
      s = arguments.length > 5 ? arguments[5] : void 0
    if (!e.length) return s(null, {})
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: t,
        fcName: n,
        tried: r,
        wait: i,
        callback: s,
      })
      return
    }
    this.readingCalls++
    const a = (u, c) => {
        if ((this.readingCalls--, this.waitingReads.length > 0)) {
          const h = this.waitingReads.shift()
          this.read(h.lng, h.ns, h.fcName, h.tried, h.wait, h.callback)
        }
        if (u && c && r < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, e, t, n, r + 1, i * 2, s)
          }, i)
          return
        }
        s(u, c)
      },
      l = this.backend[n].bind(this.backend)
    if (l.length === 2) {
      try {
        const u = l(e, t)
        u && typeof u.then == 'function'
          ? u.then((c) => a(null, c)).catch(a)
          : a(null, u)
      } catch (u) {
        a(u)
      }
      return
    }
    return l(e, t, a)
  }
  prepareLoading(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      r = arguments.length > 3 ? arguments[3] : void 0
    if (!this.backend)
      return (
        this.logger.warn(
          'No backend was added via i18next.use. Will not load resources.'
        ),
        r && r()
      )
    q(e) && (e = this.languageUtils.toResolveHierarchy(e)), q(t) && (t = [t])
    const i = this.queueLoad(e, t, n, r)
    if (!i.toLoad.length) return i.pending.length || r(), null
    i.toLoad.forEach((s) => {
      this.loadOne(s)
    })
  }
  load(e, t, n) {
    this.prepareLoading(e, t, {}, n)
  }
  reload(e, t, n) {
    this.prepareLoading(e, t, { reload: !0 }, n)
  }
  loadOne(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
    const n = e.split('|'),
      r = n[0],
      i = n[1]
    this.read(r, i, 'read', void 0, void 0, (s, a) => {
      s &&
        this.logger.warn(
          `${t}loading namespace ${i} for language ${r} failed`,
          s
        ),
        !s &&
          a &&
          this.logger.log(`${t}loaded namespace ${i} for language ${r}`, a),
        this.loaded(e, s, a)
    })
  }
  saveMissing(e, t, n, r, i) {
    var l, u, c, h, d
    let s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {},
      a =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : () => {}
    if (
      (u = (l = this.services) == null ? void 0 : l.utils) != null &&
      u.hasLoadedNamespace &&
      !(
        (h = (c = this.services) == null ? void 0 : c.utils) != null &&
        h.hasLoadedNamespace(t)
      )
    ) {
      this.logger.warn(
        `did not save key "${n}" as the namespace "${t}" was not yet loaded`,
        'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!'
      )
      return
    }
    if (!(n == null || n === '')) {
      if ((d = this.backend) != null && d.create) {
        const f = { ...s, isUpdate: i },
          g = this.backend.create.bind(this.backend)
        if (g.length < 6)
          try {
            let p
            g.length === 5 ? (p = g(e, t, n, r, f)) : (p = g(e, t, n, r)),
              p && typeof p.then == 'function'
                ? p.then((m) => a(null, m)).catch(a)
                : a(null, p)
          } catch (p) {
            a(p)
          }
        else g(e, t, n, r, a, f)
      }
      !e || !e[0] || this.store.addResource(e[0], t, n, r)
    }
  }
}
const Tu = () => ({
    debug: !1,
    initAsync: !0,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: 'all',
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: 'fallback',
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: (o) => {
      let e = {}
      if (
        (typeof o[1] == 'object' && (e = o[1]),
        q(o[1]) && (e.defaultValue = o[1]),
        q(o[2]) && (e.tDescription = o[2]),
        typeof o[2] == 'object' || typeof o[3] == 'object')
      ) {
        const t = o[3] || o[2]
        Object.keys(t).forEach((n) => {
          e[n] = t[n]
        })
      }
      return e
    },
    interpolation: {
      escapeValue: !0,
      format: (o) => o,
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1e3,
      skipOnVariables: !0,
    },
  }),
  ku = (o) => {
    var e, t
    return (
      q(o.ns) && (o.ns = [o.ns]),
      q(o.fallbackLng) && (o.fallbackLng = [o.fallbackLng]),
      q(o.fallbackNS) && (o.fallbackNS = [o.fallbackNS]),
      ((t = (e = o.supportedLngs) == null ? void 0 : e.indexOf) == null
        ? void 0
        : t.call(e, 'cimode')) < 0 &&
        (o.supportedLngs = o.supportedLngs.concat(['cimode'])),
      typeof o.initImmediate == 'boolean' && (o.initAsync = o.initImmediate),
      o
    )
  },
  ws = () => {},
  Np = (o) => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(o)).forEach((t) => {
      typeof o[t] == 'function' && (o[t] = o[t].bind(o))
    })
  }
class Gi extends ho {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 ? arguments[1] : void 0
    if (
      (super(),
      (this.options = ku(e)),
      (this.services = {}),
      (this.logger = ln),
      (this.modules = { external: [] }),
      Np(this),
      t && !this.isInitialized && !e.isClone)
    ) {
      if (!this.options.initAsync) return this.init(e, t), this
      setTimeout(() => {
        this.init(e, t)
      }, 0)
    }
  }
  init() {
    var e = this
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      n = arguments.length > 1 ? arguments[1] : void 0
    ;(this.isInitializing = !0),
      typeof t == 'function' && ((n = t), (t = {})),
      t.defaultNS == null &&
        t.ns &&
        (q(t.ns)
          ? (t.defaultNS = t.ns)
          : t.ns.indexOf('translation') < 0 && (t.defaultNS = t.ns[0]))
    const r = Tu()
    ;(this.options = { ...r, ...this.options, ...ku(t) }),
      (this.options.interpolation = {
        ...r.interpolation,
        ...this.options.interpolation,
      }),
      t.keySeparator !== void 0 &&
        (this.options.userDefinedKeySeparator = t.keySeparator),
      t.nsSeparator !== void 0 &&
        (this.options.userDefinedNsSeparator = t.nsSeparator)
    const i = (c) => (c ? (typeof c == 'function' ? new c() : c) : null)
    if (!this.options.isClone) {
      this.modules.logger
        ? ln.init(i(this.modules.logger), this.options)
        : ln.init(null, this.options)
      let c
      this.modules.formatter ? (c = this.modules.formatter) : (c = Rp)
      const h = new Cu(this.options)
      this.store = new vu(this.options.resources, this.options)
      const d = this.services
      ;(d.logger = ln),
        (d.resourceStore = this.store),
        (d.languageUtils = h),
        (d.pluralResolver = new Op(h, {
          prepend: this.options.pluralSeparator,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix,
        })),
        c &&
          (!this.options.interpolation.format ||
            this.options.interpolation.format === r.interpolation.format) &&
          ((d.formatter = i(c)),
          d.formatter.init(d, this.options),
          (this.options.interpolation.format = d.formatter.format.bind(
            d.formatter
          ))),
        (d.interpolator = new Lp(this.options)),
        (d.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
        (d.backendConnector = new Ip(
          i(this.modules.backend),
          d.resourceStore,
          d,
          this.options
        )),
        d.backendConnector.on('*', function (f) {
          for (
            var g = arguments.length, p = new Array(g > 1 ? g - 1 : 0), m = 1;
            m < g;
            m++
          )
            p[m - 1] = arguments[m]
          e.emit(f, ...p)
        }),
        this.modules.languageDetector &&
          ((d.languageDetector = i(this.modules.languageDetector)),
          d.languageDetector.init &&
            d.languageDetector.init(d, this.options.detection, this.options)),
        this.modules.i18nFormat &&
          ((d.i18nFormat = i(this.modules.i18nFormat)),
          d.i18nFormat.init && d.i18nFormat.init(this)),
        (this.translator = new no(this.services, this.options)),
        this.translator.on('*', function (f) {
          for (
            var g = arguments.length, p = new Array(g > 1 ? g - 1 : 0), m = 1;
            m < g;
            m++
          )
            p[m - 1] = arguments[m]
          e.emit(f, ...p)
        }),
        this.modules.external.forEach((f) => {
          f.init && f.init(this)
        })
    }
    if (
      ((this.format = this.options.interpolation.format),
      n || (n = ws),
      this.options.fallbackLng &&
        !this.services.languageDetector &&
        !this.options.lng)
    ) {
      const c = this.services.languageUtils.getFallbackCodes(
        this.options.fallbackLng
      )
      c.length > 0 && c[0] !== 'dev' && (this.options.lng = c[0])
    }
    !this.services.languageDetector &&
      !this.options.lng &&
      this.logger.warn(
        'init: no languageDetector is used and no lng is defined'
      ),
      [
        'getResource',
        'hasResourceBundle',
        'getResourceBundle',
        'getDataByLanguage',
      ].forEach((c) => {
        this[c] = function () {
          return e.store[c](...arguments)
        }
      }),
      [
        'addResource',
        'addResources',
        'addResourceBundle',
        'removeResourceBundle',
      ].forEach((c) => {
        this[c] = function () {
          return e.store[c](...arguments), e
        }
      })
    const l = hi(),
      u = () => {
        const c = (h, d) => {
          ;(this.isInitializing = !1),
            this.isInitialized &&
              !this.initializedStoreOnce &&
              this.logger.warn(
                'init: i18next is already initialized. You should call init just once!'
              ),
            (this.isInitialized = !0),
            this.options.isClone ||
              this.logger.log('initialized', this.options),
            this.emit('initialized', this.options),
            l.resolve(d),
            n(h, d)
        }
        if (this.languages && !this.isInitialized)
          return c(null, this.t.bind(this))
        this.changeLanguage(this.options.lng, c)
      }
    return (
      this.options.resources || !this.options.initAsync
        ? u()
        : setTimeout(u, 0),
      l
    )
  }
  loadResources(e) {
    var i, s
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ws
    const r = q(e) ? e : this.language
    if (
      (typeof e == 'function' && (n = e),
      !this.options.resources || this.options.partialBundledLanguages)
    ) {
      if (
        (r == null ? void 0 : r.toLowerCase()) === 'cimode' &&
        (!this.options.preload || this.options.preload.length === 0)
      )
        return n()
      const a = [],
        l = (u) => {
          if (!u || u === 'cimode') return
          this.services.languageUtils.toResolveHierarchy(u).forEach((h) => {
            h !== 'cimode' && a.indexOf(h) < 0 && a.push(h)
          })
        }
      r
        ? l(r)
        : this.services.languageUtils
            .getFallbackCodes(this.options.fallbackLng)
            .forEach((c) => l(c)),
        (s = (i = this.options.preload) == null ? void 0 : i.forEach) == null ||
          s.call(i, (u) => l(u)),
        this.services.backendConnector.load(a, this.options.ns, (u) => {
          !u &&
            !this.resolvedLanguage &&
            this.language &&
            this.setResolvedLanguage(this.language),
            n(u)
        })
    } else n(null)
  }
  reloadResources(e, t, n) {
    const r = hi()
    return (
      typeof e == 'function' && ((n = e), (e = void 0)),
      typeof t == 'function' && ((n = t), (t = void 0)),
      e || (e = this.languages),
      t || (t = this.options.ns),
      n || (n = ws),
      this.services.backendConnector.reload(e, t, (i) => {
        r.resolve(), n(i)
      }),
      r
    )
  }
  use(e) {
    if (!e)
      throw new Error(
        'You are passing an undefined module! Please check the object you are passing to i18next.use()'
      )
    if (!e.type)
      throw new Error(
        'You are passing a wrong module! Please check the object you are passing to i18next.use()'
      )
    return (
      e.type === 'backend' && (this.modules.backend = e),
      (e.type === 'logger' || (e.log && e.warn && e.error)) &&
        (this.modules.logger = e),
      e.type === 'languageDetector' && (this.modules.languageDetector = e),
      e.type === 'i18nFormat' && (this.modules.i18nFormat = e),
      e.type === 'postProcessor' && wh.addPostProcessor(e),
      e.type === 'formatter' && (this.modules.formatter = e),
      e.type === '3rdParty' && this.modules.external.push(e),
      this
    )
  }
  setResolvedLanguage(e) {
    if (!(!e || !this.languages) && !(['cimode', 'dev'].indexOf(e) > -1))
      for (let t = 0; t < this.languages.length; t++) {
        const n = this.languages[t]
        if (
          !(['cimode', 'dev'].indexOf(n) > -1) &&
          this.store.hasLanguageSomeTranslations(n)
        ) {
          this.resolvedLanguage = n
          break
        }
      }
  }
  changeLanguage(e, t) {
    var n = this
    this.isLanguageChangingTo = e
    const r = hi()
    this.emit('languageChanging', e)
    const i = (l) => {
        ;(this.language = l),
          (this.languages = this.services.languageUtils.toResolveHierarchy(l)),
          (this.resolvedLanguage = void 0),
          this.setResolvedLanguage(l)
      },
      s = (l, u) => {
        u
          ? (i(u),
            this.translator.changeLanguage(u),
            (this.isLanguageChangingTo = void 0),
            this.emit('languageChanged', u),
            this.logger.log('languageChanged', u))
          : (this.isLanguageChangingTo = void 0),
          r.resolve(function () {
            return n.t(...arguments)
          }),
          t &&
            t(l, function () {
              return n.t(...arguments)
            })
      },
      a = (l) => {
        var c, h
        !e && !l && this.services.languageDetector && (l = [])
        const u = q(l)
          ? l
          : this.services.languageUtils.getBestMatchFromCodes(l)
        u &&
          (this.language || i(u),
          this.translator.language || this.translator.changeLanguage(u),
          (h =
            (c = this.services.languageDetector) == null
              ? void 0
              : c.cacheUserLanguage) == null || h.call(c, u)),
          this.loadResources(u, (d) => {
            s(d, u)
          })
      }
    return (
      !e &&
      this.services.languageDetector &&
      !this.services.languageDetector.async
        ? a(this.services.languageDetector.detect())
        : !e &&
            this.services.languageDetector &&
            this.services.languageDetector.async
          ? this.services.languageDetector.detect.length === 0
            ? this.services.languageDetector.detect().then(a)
            : this.services.languageDetector.detect(a)
          : a(e),
      r
    )
  }
  getFixedT(e, t, n) {
    var r = this
    const i = function (s, a) {
      let l
      if (typeof a != 'object') {
        for (
          var u = arguments.length, c = new Array(u > 2 ? u - 2 : 0), h = 2;
          h < u;
          h++
        )
          c[h - 2] = arguments[h]
        l = r.options.overloadTranslationOptionHandler([s, a].concat(c))
      } else l = { ...a }
      ;(l.lng = l.lng || i.lng),
        (l.lngs = l.lngs || i.lngs),
        (l.ns = l.ns || i.ns),
        l.keyPrefix !== '' && (l.keyPrefix = l.keyPrefix || n || i.keyPrefix)
      const d = r.options.keySeparator || '.'
      let f
      return (
        l.keyPrefix && Array.isArray(s)
          ? (f = s.map((g) => `${l.keyPrefix}${d}${g}`))
          : (f = l.keyPrefix ? `${l.keyPrefix}${d}${s}` : s),
        r.t(f, l)
      )
    }
    return q(e) ? (i.lng = e) : (i.lngs = e), (i.ns = t), (i.keyPrefix = n), i
  }
  t() {
    var r
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
    return (r = this.translator) == null ? void 0 : r.translate(...t)
  }
  exists() {
    var r
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
    return (r = this.translator) == null ? void 0 : r.exists(...t)
  }
  setDefaultNamespace(e) {
    this.options.defaultNS = e
  }
  hasLoadedNamespace(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    if (!this.isInitialized)
      return (
        this.logger.warn(
          'hasLoadedNamespace: i18next was not initialized',
          this.languages
        ),
        !1
      )
    if (!this.languages || !this.languages.length)
      return (
        this.logger.warn(
          'hasLoadedNamespace: i18n.languages were undefined or empty',
          this.languages
        ),
        !1
      )
    const n = t.lng || this.resolvedLanguage || this.languages[0],
      r = this.options ? this.options.fallbackLng : !1,
      i = this.languages[this.languages.length - 1]
    if (n.toLowerCase() === 'cimode') return !0
    const s = (a, l) => {
      const u = this.services.backendConnector.state[`${a}|${l}`]
      return u === -1 || u === 0 || u === 2
    }
    if (t.precheck) {
      const a = t.precheck(this, s)
      if (a !== void 0) return a
    }
    return !!(
      this.hasResourceBundle(n, e) ||
      !this.services.backendConnector.backend ||
      (this.options.resources && !this.options.partialBundledLanguages) ||
      (s(n, e) && (!r || s(i, e)))
    )
  }
  loadNamespaces(e, t) {
    const n = hi()
    return this.options.ns
      ? (q(e) && (e = [e]),
        e.forEach((r) => {
          this.options.ns.indexOf(r) < 0 && this.options.ns.push(r)
        }),
        this.loadResources((r) => {
          n.resolve(), t && t(r)
        }),
        n)
      : (t && t(), Promise.resolve())
  }
  loadLanguages(e, t) {
    const n = hi()
    q(e) && (e = [e])
    const r = this.options.preload || [],
      i = e.filter(
        (s) =>
          r.indexOf(s) < 0 && this.services.languageUtils.isSupportedCode(s)
      )
    return i.length
      ? ((this.options.preload = r.concat(i)),
        this.loadResources((s) => {
          n.resolve(), t && t(s)
        }),
        n)
      : (t && t(), Promise.resolve())
  }
  dir(e) {
    var r, i
    if (
      (e ||
        (e =
          this.resolvedLanguage ||
          (((r = this.languages) == null ? void 0 : r.length) > 0
            ? this.languages[0]
            : this.language)),
      !e)
    )
      return 'rtl'
    const t = [
        'ar',
        'shu',
        'sqr',
        'ssh',
        'xaa',
        'yhd',
        'yud',
        'aao',
        'abh',
        'abv',
        'acm',
        'acq',
        'acw',
        'acx',
        'acy',
        'adf',
        'ads',
        'aeb',
        'aec',
        'afb',
        'ajp',
        'apc',
        'apd',
        'arb',
        'arq',
        'ars',
        'ary',
        'arz',
        'auz',
        'avl',
        'ayh',
        'ayl',
        'ayn',
        'ayp',
        'bbz',
        'pga',
        'he',
        'iw',
        'ps',
        'pbt',
        'pbu',
        'pst',
        'prp',
        'prd',
        'ug',
        'ur',
        'ydd',
        'yds',
        'yih',
        'ji',
        'yi',
        'hbo',
        'men',
        'xmn',
        'fa',
        'jpr',
        'peo',
        'pes',
        'prs',
        'dv',
        'sam',
        'ckb',
      ],
      n =
        ((i = this.services) == null ? void 0 : i.languageUtils) || new Cu(Tu())
    return t.indexOf(n.getLanguagePartFromCode(e)) > -1 ||
      e.toLowerCase().indexOf('-arab') > 1
      ? 'rtl'
      : 'ltr'
  }
  static createInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 ? arguments[1] : void 0
    return new Gi(e, t)
  }
  cloneInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ws
    const n = e.forkResourceStore
    n && delete e.forkResourceStore
    const r = { ...this.options, ...e, isClone: !0 },
      i = new Gi(r)
    if (
      ((e.debug !== void 0 || e.prefix !== void 0) &&
        (i.logger = i.logger.clone(e)),
      ['store', 'services', 'language'].forEach((a) => {
        i[a] = this[a]
      }),
      (i.services = { ...this.services }),
      (i.services.utils = { hasLoadedNamespace: i.hasLoadedNamespace.bind(i) }),
      n)
    ) {
      const a = Object.keys(this.store.data).reduce(
        (l, u) => (
          (l[u] = { ...this.store.data[u] }),
          Object.keys(l[u]).reduce((c, h) => ((c[h] = { ...l[u][h] }), c), {})
        ),
        {}
      )
      ;(i.store = new vu(a, r)), (i.services.resourceStore = i.store)
    }
    return (
      (i.translator = new no(i.services, r)),
      i.translator.on('*', function (a) {
        for (
          var l = arguments.length, u = new Array(l > 1 ? l - 1 : 0), c = 1;
          c < l;
          c++
        )
          u[c - 1] = arguments[c]
        i.emit(a, ...u)
      }),
      i.init(r, t),
      (i.translator.options = r),
      (i.translator.backendConnector.services.utils = {
        hasLoadedNamespace: i.hasLoadedNamespace.bind(i),
      }),
      i
    )
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage,
    }
  }
}
const b = Gi.createInstance()
b.createInstance = Gi.createInstance
b.createInstance
b.dir
b.init
b.loadResources
b.reloadResources
b.use
b.changeLanguage
b.getFixedT
b.t
b.exists
b.setDefaultNamespace
b.hasLoadedNamespace
b.loadNamespaces
b.loadLanguages
const { slice: jp, forEach: Bp } = []
function Hp(o) {
  return (
    Bp.call(jp.call(arguments, 1), (e) => {
      if (e) for (const t in e) o[t] === void 0 && (o[t] = e[t])
    }),
    o
  )
}
function Up(o) {
  return typeof o != 'string'
    ? !1
    : [
        /<\s*script.*?>/i,
        /<\s*\/\s*script\s*>/i,
        /<\s*img.*?on\w+\s*=/i,
        /<\s*\w+\s*on\w+\s*=.*?>/i,
        /javascript\s*:/i,
        /vbscript\s*:/i,
        /expression\s*\(/i,
        /eval\s*\(/i,
        /alert\s*\(/i,
        /document\.cookie/i,
        /document\.write\s*\(/i,
        /window\.location/i,
        /innerHTML/i,
      ].some((t) => t.test(o))
}
const $u = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
  Vp = function (o, e) {
    const n =
        arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : { path: '/' },
      r = encodeURIComponent(e)
    let i = `${o}=${r}`
    if (n.maxAge > 0) {
      const s = n.maxAge - 0
      if (Number.isNaN(s)) throw new Error('maxAge should be a Number')
      i += `; Max-Age=${Math.floor(s)}`
    }
    if (n.domain) {
      if (!$u.test(n.domain)) throw new TypeError('option domain is invalid')
      i += `; Domain=${n.domain}`
    }
    if (n.path) {
      if (!$u.test(n.path)) throw new TypeError('option path is invalid')
      i += `; Path=${n.path}`
    }
    if (n.expires) {
      if (typeof n.expires.toUTCString != 'function')
        throw new TypeError('option expires is invalid')
      i += `; Expires=${n.expires.toUTCString()}`
    }
    if (
      (n.httpOnly && (i += '; HttpOnly'),
      n.secure && (i += '; Secure'),
      n.sameSite)
    )
      switch (
        typeof n.sameSite == 'string' ? n.sameSite.toLowerCase() : n.sameSite
      ) {
        case !0:
          i += '; SameSite=Strict'
          break
        case 'lax':
          i += '; SameSite=Lax'
          break
        case 'strict':
          i += '; SameSite=Strict'
          break
        case 'none':
          i += '; SameSite=None'
          break
        default:
          throw new TypeError('option sameSite is invalid')
      }
    return n.partitioned && (i += '; Partitioned'), i
  },
  Pu = {
    create(o, e, t, n) {
      let r =
        arguments.length > 4 && arguments[4] !== void 0
          ? arguments[4]
          : { path: '/', sameSite: 'strict' }
      t &&
        ((r.expires = new Date()),
        r.expires.setTime(r.expires.getTime() + t * 60 * 1e3)),
        n && (r.domain = n),
        (document.cookie = Vp(o, e, r))
    },
    read(o) {
      const e = `${o}=`,
        t = document.cookie.split(';')
      for (let n = 0; n < t.length; n++) {
        let r = t[n]
        for (; r.charAt(0) === ' '; ) r = r.substring(1, r.length)
        if (r.indexOf(e) === 0) return r.substring(e.length, r.length)
      }
      return null
    },
    remove(o, e) {
      this.create(o, '', -1, e)
    },
  }
var qp = {
    name: 'cookie',
    lookup(o) {
      let { lookupCookie: e } = o
      if (e && typeof document < 'u') return Pu.read(e) || void 0
    },
    cacheUserLanguage(o, e) {
      let {
        lookupCookie: t,
        cookieMinutes: n,
        cookieDomain: r,
        cookieOptions: i,
      } = e
      t && typeof document < 'u' && Pu.create(t, o, n, r, i)
    },
  },
  Yp = {
    name: 'querystring',
    lookup(o) {
      var n
      let { lookupQuerystring: e } = o,
        t
      if (typeof window < 'u') {
        let { search: r } = window.location
        !window.location.search &&
          ((n = window.location.hash) == null ? void 0 : n.indexOf('?')) > -1 &&
          (r = window.location.hash.substring(
            window.location.hash.indexOf('?')
          ))
        const s = r.substring(1).split('&')
        for (let a = 0; a < s.length; a++) {
          const l = s[a].indexOf('=')
          l > 0 && s[a].substring(0, l) === e && (t = s[a].substring(l + 1))
        }
      }
      return t
    },
  },
  Wp = {
    name: 'hash',
    lookup(o) {
      var r
      let { lookupHash: e, lookupFromHashIndex: t } = o,
        n
      if (typeof window < 'u') {
        const { hash: i } = window.location
        if (i && i.length > 2) {
          const s = i.substring(1)
          if (e) {
            const a = s.split('&')
            for (let l = 0; l < a.length; l++) {
              const u = a[l].indexOf('=')
              u > 0 && a[l].substring(0, u) === e && (n = a[l].substring(u + 1))
            }
          }
          if (n) return n
          if (!n && t > -1) {
            const a = i.match(/\/([a-zA-Z-]*)/g)
            return Array.isArray(a)
              ? (r = a[typeof t == 'number' ? t : 0]) == null
                ? void 0
                : r.replace('/', '')
              : void 0
          }
        }
      }
      return n
    },
  }
let Pr = null
const Fu = () => {
  if (Pr !== null) return Pr
  try {
    if (((Pr = typeof window < 'u' && window.localStorage !== null), !Pr))
      return !1
    const o = 'i18next.translate.boo'
    window.localStorage.setItem(o, 'foo'), window.localStorage.removeItem(o)
  } catch {
    Pr = !1
  }
  return Pr
}
var Xp = {
  name: 'localStorage',
  lookup(o) {
    let { lookupLocalStorage: e } = o
    if (e && Fu()) return window.localStorage.getItem(e) || void 0
  },
  cacheUserLanguage(o, e) {
    let { lookupLocalStorage: t } = e
    t && Fu() && window.localStorage.setItem(t, o)
  },
}
let Fr = null
const Au = () => {
  if (Fr !== null) return Fr
  try {
    if (((Fr = typeof window < 'u' && window.sessionStorage !== null), !Fr))
      return !1
    const o = 'i18next.translate.boo'
    window.sessionStorage.setItem(o, 'foo'), window.sessionStorage.removeItem(o)
  } catch {
    Fr = !1
  }
  return Fr
}
var Gp = {
    name: 'sessionStorage',
    lookup(o) {
      let { lookupSessionStorage: e } = o
      if (e && Au()) return window.sessionStorage.getItem(e) || void 0
    },
    cacheUserLanguage(o, e) {
      let { lookupSessionStorage: t } = e
      t && Au() && window.sessionStorage.setItem(t, o)
    },
  },
  Kp = {
    name: 'navigator',
    lookup(o) {
      const e = []
      if (typeof navigator < 'u') {
        const { languages: t, userLanguage: n, language: r } = navigator
        if (t) for (let i = 0; i < t.length; i++) e.push(t[i])
        n && e.push(n), r && e.push(r)
      }
      return e.length > 0 ? e : void 0
    },
  },
  Jp = {
    name: 'htmlTag',
    lookup(o) {
      let { htmlTag: e } = o,
        t
      const n = e || (typeof document < 'u' ? document.documentElement : null)
      return (
        n &&
          typeof n.getAttribute == 'function' &&
          (t = n.getAttribute('lang')),
        t
      )
    },
  },
  Zp = {
    name: 'path',
    lookup(o) {
      var r
      let { lookupFromPathIndex: e } = o
      if (typeof window > 'u') return
      const t = window.location.pathname.match(/\/([a-zA-Z-]*)/g)
      return Array.isArray(t)
        ? (r = t[typeof e == 'number' ? e : 0]) == null
          ? void 0
          : r.replace('/', '')
        : void 0
    },
  },
  Qp = {
    name: 'subdomain',
    lookup(o) {
      var r, i
      let { lookupFromSubdomainIndex: e } = o
      const t = typeof e == 'number' ? e + 1 : 1,
        n =
          typeof window < 'u' &&
          ((i = (r = window.location) == null ? void 0 : r.hostname) == null
            ? void 0
            : i.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i))
      if (n) return n[t]
    },
  }
let Sh = !1
try {
  document.cookie, (Sh = !0)
} catch {}
const Eh = [
  'querystring',
  'cookie',
  'localStorage',
  'sessionStorage',
  'navigator',
  'htmlTag',
]
Sh || Eh.splice(1, 1)
const eg = () => ({
  order: Eh,
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
  convertDetectedLanguage: (o) => o,
})
class Th {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    ;(this.type = 'languageDetector'), (this.detectors = {}), this.init(e, t)
  }
  init() {
    let e =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : { languageUtils: {} },
      t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    ;(this.services = e),
      (this.options = Hp(t, this.options || {}, eg())),
      typeof this.options.convertDetectedLanguage == 'string' &&
        this.options.convertDetectedLanguage.indexOf('15897') > -1 &&
        (this.options.convertDetectedLanguage = (r) => r.replace('-', '_')),
      this.options.lookupFromUrlIndex &&
        (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
      (this.i18nOptions = n),
      this.addDetector(qp),
      this.addDetector(Yp),
      this.addDetector(Xp),
      this.addDetector(Gp),
      this.addDetector(Kp),
      this.addDetector(Jp),
      this.addDetector(Zp),
      this.addDetector(Qp),
      this.addDetector(Wp)
  }
  addDetector(e) {
    return (this.detectors[e.name] = e), this
  }
  detect() {
    let e =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : this.options.order,
      t = []
    return (
      e.forEach((n) => {
        if (this.detectors[n]) {
          let r = this.detectors[n].lookup(this.options)
          r && typeof r == 'string' && (r = [r]), r && (t = t.concat(r))
        }
      }),
      (t = t
        .filter((n) => n != null && !Up(n))
        .map((n) => this.options.convertDetectedLanguage(n))),
      this.services &&
      this.services.languageUtils &&
      this.services.languageUtils.getBestMatchFromCodes
        ? t
        : t.length > 0
          ? t[0]
          : null
    )
  }
  cacheUserLanguage(e) {
    let t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : this.options.caches
    t &&
      ((this.options.excludeCacheFor &&
        this.options.excludeCacheFor.indexOf(e) > -1) ||
        t.forEach((n) => {
          this.detectors[n] &&
            this.detectors[n].cacheUserLanguage(e, this.options)
        }))
  }
}
Th.type = 'languageDetector'
const tg = {
    about: 'About',
    journey: 'Journey',
    praxis: 'Praxis',
    connect: 'Connect',
    languages: { en: 'EN', pt: 'PT' },
  },
  ng = {
    status: 'Available for hiring',
    picDescription:
      'An image of Paul M., a bearded man with short, dark hair. He is looking to the right with a thoughtful expression. He is wearing a plain t-shirt.',
    content: {
      m1: 'Product designer',
      m2: 'and creative coder',
      d1: 'Designer and coder crafting',
      d2: 'future-ready digital interactions.',
      h1: 'Enthusiast of decentralized technologies',
      p1: ', driven by the open-source movement and other geeky stuff. Previously part of an interactive marketing company focused on lead generation from Denver, CO.',
      h2: 'Devoted to quality',
      p2: ', I commit to continuous learning and professional development, staying abreast of emerging design trends technological advancements, and industry best practices to deliver cutting-edge solutions.',
    },
  },
  rg = {
    t1: 'Design in thinking.',
    p1: 'From insight to interface, I design with people in mind. Merging aesthetics, purpose, and cutting-edge tech through Design Thinking and Human-Centered Design.',
    t2: 'Technology to deliver.',
    p2: 'Learning from tech experts early on made algorithms a core part of my toolkit, bridging design and engineering to craft seamless, refined digital experiences.',
  },
  ig = {
    t0: 'Journey',
    t1: "Design <br class='block xl:hidden'> intern",
    p1: 'During my internship, I had the opportunity to refine and develop skills across various functions. HTML and CSS development, marketing initiatives, visual design, branding, and UX/UI design.',
    t2: "Designer, <br class='block xl:hidden'> front-end coder",
    p2: "In multifaceted collaboration with managers and the development team, we successfully redesigned the interfaces and features of company's software.",
    m2: 'Also played a key role in co-creating a platform that facilitates connecting individuals facing legal issues with specialized professionals.',
    t3: "Visual and <br class='block xl:hidden'> product designer",
    p3: 'Early 2018, I held the role of a generalist designer, tasked with developing and managing all aspects of design and creative outputs for their product project.',
    m3: 'Second half of the year, I collaborated with another company to design an open-source library of interface components.',
    t4: "Lead designer, <br class='block xl:hidden'> UI engineer",
    p4: "Today responsible for redesigning the company's advanced lead management platform, using React components to improve performance and scalability.",
  },
  sg = {
    title: 'Recent project',
    description:
      'A robust software for lead management, optimization, and distribution.',
    cta: 'See details',
    project: 'twyne.io',
  },
  og = { title: 'Reach out' },
  ag = {
    menu: {
      about: 'About',
      goal: 'Goal',
      proposal: 'Proposal',
      impact: 'Impact',
      mobile: 'Mobile',
      conclusion: 'Conclusion',
    },
    t1: 'Case study / 01',
    t2: 'Twyne',
    about: {
      t1: 'about',
      p1: "Developed by Ifficient, <span class='dark:text-zinc-200'>Twyne is a robust software for lead management, optimization, and distribution, focused on monetization and real-time analytics.</span>",
      p2: 'Targeted at the B2B market, it serves a few clients in volume, but with high ticket value and demanding customization.',
      details: {
        company: 'Company',
        companyValue: 'Ifficient',
        industry: 'Industry',
        industryValue: 'AdTech',
        product: 'Product',
        productValue: 'Software as a Service',
        contributions: 'Contributions',
        contribution1: 'Product Design',
        contribution2: 'Design System',
        contribution3: 'UI Engineering',
      },
    },
    goal: {
      t1: 'Goal',
      p1: "Tackling one of the biggest challenges in digital design: creating a <span class='text-zinc-200'>modular</span>, <span class='text-zinc-200'>scalable</span>, and <span class='text-zinc-200'>adaptable</span> interface for highly complex software, with constant growth in features and requirements.",
      p2: 'The visual approach needed to balance performance, readability, and continuous evolution, without requiring a restart for every new feature. Delivering clarity and control even in dense flows.',
    },
    proposal: {
      t1: 'Proposal',
      l1: [
        'A robust, strategic, and flexible UI kit.',
        'Simplified UI that puts information up front.',
        'Built to last, scale, and ease development.',
      ],
      p1: 'Each component carries decisions guided by performance, readability, and functional clarity, with special attention to business logic and the journey of corporate users.',
    },
    impact: {
      t1: 'Impact',
      l1: [
        'Reduced rework for the engineering team.',
        'Faster onboarding for new users.',
        'Foundation that supports new modules with minimal friction.',
        'Strengthened product identity with a modern UI.',
      ],
    },
    numbers: {
      t1: '+ 400k',
      p1: 'Registrations acquired per day',
      t2: '+ 2 million',
      p2: 'User clicks on campaigns',
      t3: '+ 7 million',
      p3: 'Leads negotiated daily',
    },
    mobile: {
      t1: "<span class='block mb-4'>Built on solid principles.</span> Ready for any platform.",
    },
    conclusion: {
      t1: 'Final thoughts',
      p1: 'The modularity of the component library enables smart reuse, reducing complexity and increasing development speed.',
      p2: 'Decisions on layout, typography, contrast, and spacing were calibrated to support dense data environments without compromising readability.',
      p3: 'The result is an interface that adapts to the usage context without losing visual coherence or functional integrity.',
    },
  },
  lg = {
    menu: tg,
    about: ng,
    praxis: rg,
    journey: ig,
    cases: sg,
    connect: og,
    twyne: ag,
  },
  ug = {
    about: 'Sobre',
    journey: 'Jornada',
    praxis: 'Praxis',
    connect: 'Contato',
    languages: { en: 'EN', pt: 'PT' },
  },
  cg = {
    status: 'Disponível para contratação',
    picDescription:
      'Uma foto de Paulo, um homem barbado com cabelos curtos e escuros. Ele está olhando para a direita com uma expressão pensativa. Ele usa uma camisa simples.',
    content: {
      m1: 'Product designer',
      m2: 'e front-end coder',
      d1: 'Construindo experiências',
      d2: 'digitais prontas para o futuro.',
      h1: 'Entusiasta de tecnologias descentralizadas',
      p1: ' e valorizando soluções open-source. Recentemente atuei em uma empresa de marketing interativo especializada em geração de leads, com base em Denver, CO.',
      h2: 'Comprometido com a qualidade',
      p2: ' e o aprendizado contínuo, mantenho-me atualizado sobre tendências de design, avanços tecnológicos e as melhores práticas do setor para entregar soluções modernas e eficazes.',
    },
  },
  hg = {
    t1: 'Design no pensar.',
    p1: 'Do insight à interface, projeto com foco nas pessoas. Unindo estética, propósito e tecnologia de ponta por meio do Design Thinking e Human-Centered Design.',
    t2: 'Tecnologia para realizar.',
    p2: 'Aprender com experts em tecnologia desde cedo tornou algoritmos parte do meu repertório, unindo design e engenharia para criar experiências refinadas.',
  },
  dg = {
    t0: 'Jornada',
    t1: "Estagiário de <br class='block xl:hidden'> design",
    p1: 'Durante meu estágio, tive a oportunidade de refinar e desenvolver habilidades em várias funções. Desenvolvimento HTML e CSS, iniciativas de marketing, design visual, branding e design UX/UI.',
    m1: '',
    t2: "Designer, <br class='block xl:hidden'> front-end coder",
    p2: 'Em colaboração multifacetada com gerentes e a equipe de desenvolvimento, redesenhamos com sucesso as interfaces e funcionalidades do software da empresa.',
    m2: 'Também desempenhei um papel fundamental na co-criação de uma plataforma que facilita a conexão de pessoas enfrentando questões legais com profissionais especializados.',
    t3: 'Designer de produto',
    p3: 'No início de 2018, exerci o papel de designer generalista, responsável por desenvolver e gerenciar todos os aspectos do design e saídas criativas para o projeto de produto.',
    m3: 'Na segunda metade do ano, colaborei com outra empresa para projetar uma biblioteca open-source de componentes de interface.',
    t4: "Lead designer, <br class='block xl:hidden'> UI engineer",
    p4: 'Hoje responsável por redesenhar a plataforma avançada de gerenciamento de leads da empresa, usando componentes React para melhorar performance e escalabilidade.',
  },
  fg = {
    title: 'Projeto recente',
    description:
      'Um software robusto para gestão, otimização e distribuição de leads.',
    cta: 'Ver detalhes',
    project: 'twyne.io',
  },
  pg = { title: 'Social' },
  gg = {
    menu: {
      about: 'Sobre',
      goal: 'Objetivo',
      proposal: 'Proposta',
      impact: 'Impacto',
      mobile: 'Mobile',
      conclusion: 'Conclusão',
    },
    t1: 'Estudo de caso / 01',
    t2: 'Twyne',
    about: {
      t1: 'O que é',
      p1: "Desenvolvida pela Ifficient, <span class='dark:text-zinc-200'>o Twyne é um software robusto de gestão, otimização e distribuição de leads, com foco em monetização e análise em tempo real.</span>",
      p2: 'Voltada para o mercado B2B, atende poucos clientes em volume, mas com alto ticket médio e exigências elevadas de personalização.',
    },
    projectInfo: {
      company: 'Empresa',
      companyValue: 'Ifficient',
      industry: 'Setor',
      industryValue: 'AdTech',
      product: 'Produto',
      productValue: 'Software as a Service',
      contributions: 'Contribuições',
      contribution1: 'Design de Produto',
      contribution2: 'Design System',
      contribution3: 'UI Engineering',
    },
    goal: {
      t1: 'Objetivo',
      p1: "Resolver um dos grandes desafios do design digital: criar uma <span class='text-zinc-200'>interface modular</span>, <span class='text-zinc-200'>escalável</span> e <span class='text-zinc-200'>adaptável</span> para um software de alta complexidade técnica, com crescimento constante de features e demandas.",
      p2: 'A proposta visual precisava equilibrar performance, legibilidade e evolução contínua, sem exigir recomeços a cada nova funcionalidade. Oferecendo clareza e controle mesmo em fluxos densos.',
    },
    proposal: {
      t1: 'Proposta',
      l1: [
        'Biblioteca de componentes robusta, estratégica e flexível.',
        'UI simplificada e informações em primeiro plano.',
        'Pensado para durar, escalar e facilitar o desenvolvimento.',
      ],
      p1: 'Cada componente carrega decisões orientadas por performance, legibilidade e clareza funcional, com atenção especial à jornada dos usuários corporativos.',
    },
    impact: {
      t1: 'Impactos',
      l1: [
        'Redução de retrabalho no time de engenharia.',
        'Aumento na velocidade de onboarding de novos usuários.',
        'Base que suportou a adição de novos módulos sem atrito.',
        'Fortalecimento da identidade do produto com uma UI moderna.',
      ],
    },
    numbers: {
      t1: '+ 400 mil',
      p1: 'Registros adiquiridos por dia',
      t2: '+ 2 milhões',
      p2: 'Clicks de usuários em campanhas',
      t3: '+ 7 milhões',
      p3: 'Leads negociados diariamente',
    },
    mobile: {
      t1: "<span class='block mb-4'>Construído com solidez.</span> Pronto para qualquer plataforma.",
    },
    conclusion: {
      t1: 'Considerações finais',
      p1: 'A modularidade do UI kit permite reuso inteligente, reduzindo complexidade e aumentando a velocidade de desenvolvimento.',
      p2: 'As decisões de layout, tipografia, contraste e espaçamento foram calibradas para sustentar ambientes densos de dados sem comprometer a legibilidade.',
      p3: 'O resultado é uma interface que se adapta ao contexto de uso sem perder coerência visual nem integridade funcional.',
    },
  },
  mg = {
    menu: ug,
    about: cg,
    praxis: hg,
    journey: dg,
    cases: fg,
    connect: pg,
    twyne: gg,
  }
b.use(Th).init({
  fallbackLng: 'en',
  detection: { order: ['navigator', 'htmlTag'], caches: ['localStorage'] },
  resources: { en: { translation: lg }, pt: { translation: mg } },
})
b.on('languageChanged', (o) => {
  document.documentElement.lang = o
})
const _g = '/src/9625ae.webp',
  Dg = '/src/2a0e5c.webp'
var yg = Object.defineProperty,
  vg = Object.getOwnPropertyDescriptor,
  kh = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? vg(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && yg(e, t, r), r
  }
let _a = class extends me {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  renderTitle(o) {
    const e = o.split("<br class='block xl:hidden'>")
    return e.length > 1
      ? ie`
        ${e[0]}
        <br class="block xl:hidden" />
        ${e[1]}
      `
      : o
  }
  render() {
    return ie`
      <section id="cases" class="hidden xl:block">
        <div class="container">
          <div
            class="hidden h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
          <div
            class="relative flex rounded-[2rem] from-zinc-950 to-zinc-black xl:bg-gradient-to-r 2xl:h-[512px]"
          >
            <div class="hidden w-2/3 justify-center xl:flex">
              <span
                class="absolute bottom-0 left-0 flex gap-2 p-8 font-mono text-[.75rem] font-medium uppercase leading-none tracking-[.05em] text-zinc-700"
              >
                2025 ${b.t('cases.project')}
              </span>
              <div class="absolute bottom-0 overflow-hidden">
                <img
                  loading="lazy"
                  class="cases absolute max-w-none w-[calc(1264px*0.8)] 2xl:w-auto drop-shadow-[0_5rem_5rem_black]"
                  src="${_g}"
                  width="1264"
                  height="720"
                  alt="Dark mode mobile dashboard showing analytics overview with graphs, lead count, and campaign metrics on a tilted iPhone screen."
                />
                <img
                  loading="lazy"
                  class="cases max-w-none w-[calc(1264px*0.8)] 2xl:w-auto drop-shadow-[0_5rem_5rem_black]"
                  src="${Dg}"
                  width="1264"
                  height="720"
                  alt="Mobile screen in dark mode showcasing an organized campaign list view, with project names, dates, and quick actions."
                />
              </div>
            </div>
            <div
              class="mob-cases-content xl:cases-content relative flex flex-1 flex-col p-20 2xl:p-24 text-center xl:aspect-square xl:rounded-r-[2rem] xl:backdrop-blur-sm"
            >
              <h2
                class="text-[2.5rem] leading-none tracking-[-0.04em] text-zinc-200 2xl:text-[3rem]"
              >
                ${this.renderTitle(b.t('cases.title'))}
              </h2>
              <p class="text-sm/loose xl:text-base/loose text-pretty mb-auto mt-8">
                ${b.t('cases.description')}
              </p>
              <a
                href="/twyne"
                class="cta-button flex items-center gap-4 self-center rounded-full py-3 pe-4 ps-6 text-[1rem] font-medium leading-none text-black"
              >
                ${b.t('cases.cta')}
                <svg
                  width="14"
                  height="14"
                  class="rotate-180"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 13L2 6.99999M2 6.99999L8 1M2 6.99999L14 6.99999"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div
            class="hidden h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
        </div>
      </section>
    `
  }
  createRenderRoot() {
    return this
  }
}
kh([re({ type: String })], _a.prototype, 'lang', 2)
_a = kh([Ae('cases-section')], _a)
const xg = { CHILD: 2 },
  bg =
    (o) =>
    (...e) => ({ _$litDirective$: o, values: e })
class Cg {
  constructor(e) {}
  get _$AU() {
    return this._$AM._$AU
  }
  _$AT(e, t, n) {
    ;(this._$Ct = e), (this._$AM = t), (this._$Ci = n)
  }
  _$AS(e, t) {
    return this.update(e, t)
  }
  update(e, t) {
    return this.render(...t)
  }
}
class Da extends Cg {
  constructor(e) {
    if ((super(e), (this.it = je), e.type !== xg.CHILD))
      throw Error(
        this.constructor.directiveName + '() can only be used in child bindings'
      )
  }
  render(e) {
    if (e === je || e == null) return (this._t = void 0), (this.it = e)
    if (e === yr) return e
    if (typeof e != 'string')
      throw Error(
        this.constructor.directiveName + '() called with a non-string value'
      )
    if (e === this.it) return this._t
    this.it = e
    const t = [e]
    return (
      (t.raw = t),
      (this._t = {
        _$litType$: this.constructor.resultType,
        strings: t,
        values: [],
      })
    )
  }
}
;(Da.directiveName = 'unsafeHTML'), (Da.resultType = 1)
const vr = bg(Da),
  wg = `<svg width="46" height="24" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg">\r
<path d="M12 23H34M12 23C5.92487 23 1 18.0751 1 12M12 23H23M1 12C1 5.92487 5.92487 1 12 1M1 12H12M45 12C45 18.0751 40.0751 23 34 23M45 12C45 5.92487 40.0751 1 34 1M45 12H34M34 23H23M34 1H12M34 1H23M12 1H23M23 23C16.9249 23 12 18.0751 12 12M23 23C29.0751 23 34 18.0751 34 12M23 23C23 21.5555 23.2845 20.1251 23.8373 18.7905C24.3901 17.4559 25.2004 16.2433 26.2218 15.2218C27.2433 14.2004 28.4559 13.3901 29.7905 12.8373C31.1251 12.2845 32.5555 12 34 12M23 23C23 21.5555 22.7155 20.1251 22.1627 18.7905C21.6099 17.4559 20.7996 16.2433 19.7782 15.2218C18.7567 14.2004 17.5441 13.3901 16.2095 12.8373C14.8749 12.2845 13.4445 12 12 12M12 12C12 5.92487 16.9249 1 23 1M12 12C14.9174 12 17.7153 10.8411 19.7782 8.77818C21.8411 6.71528 23 3.91738 23 1M34 12C34 5.92487 29.0751 1 23 1M34 12C32.5555 12 31.1251 11.7155 29.7905 11.1627C28.4559 10.6099 27.2433 9.79962 26.2218 8.77817C25.2004 7.75673 24.3901 6.5441 23.8373 5.20952C23.2845 3.87494 23 2.44454 23 1" stroke-width="2"/>\r
</svg>\r
`
var Sg = Object.defineProperty,
  Eg = Object.getOwnPropertyDescriptor,
  $h = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Eg(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Sg(e, t, r), r
  }
let ya = class extends me {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  initScrambleText() {
    const o = this.querySelector('#copyright'),
      e = this.querySelector('.copyright span')
    o &&
      e &&
      (o.addEventListener('mouseenter', () => {
        oe.to(e, {
          duration: 1,
          scrambleText: {
            text: 'Made by human',
            chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            speed: 0.1,
          },
        })
      }),
      o.addEventListener('mouseleave', () => {
        oe.to(e, {
          duration: 0.5,
          scrambleText: {
            text: 'Copyright',
            chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            speed: 0.1,
          },
        })
      }))
  }
  firstUpdated(o) {
    const e = document.querySelector('#menu')
    if (!e) return
    Object.values({
      cosmos: { label: 'Cosmos', url: 'https://cosmos.so/hackyoto' },
      github: { label: 'GitHub', url: 'https://github.com/paulomelojunior' },
      linkedin: {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/paulomelojunior/',
      },
      email: { label: 'Email', url: 'mailto:hello@pmjr.cc' },
    }).forEach((r, i) => {
      const s = (i + 1).toString().padStart(2, '0'),
        a = `
				<div class="border-b border-stone-300 dark:border-zinc-900 xl:border-0">
					<a target="_blank" class="menu-item h-20 xl:h-16 px-5 pt-1 flex items-center text-stone-900 dark:text-zinc-200 relative" rel="noopener noreferrer" href="${r.url}">
						${r.label}
						<div class="absolute flex items-center px-5 pt-1 inset-0 xl:rounded-full text-stone-200 dark:text-zinc-950">
							${r.label}
						</div>
						<span class="xl:hidden absolute opacity-50 right-6 bottom-6 font-mono text-[.75rem] tracking-[0.05em]">
							${r.label === 'Email' ? 'hello@pmjr.cc' : s}
						</span>
					</a>
				</div>`
      e.insertAdjacentHTML('beforeend', a)
    }),
      this.initScrambleText()
  }
  render() {
    return ie`
      <footer
        id="section-connect"
        class="xl:footer relative z-10 h-lvh overflow-hidden rounded-t-[2rem]"
      >
        <div
          id="footerLinks"
          class="relative z-10 flex h-full flex-1 items-center pb-24 xl:pb-0"
        >
          <div
            id="menu"
            class="flex flex-1 flex-col flex-wrap gap-0 text-[2rem] tracking-[-0.04em] xl:flex-row xl:items-baseline xl:justify-center xl:gap-4 2xl:text-[2.5rem]"
          >
            <span
              class="flex h-20 items-center px-5 text-stone-600 xl:p-0 dark:text-zinc-600"
            >
              ${b.t('connect.title')}
            </span>
            <span
              class="absolute right-5 ml-5 flex h-20 items-center stroke-brand-400 xl:relative xl:right-auto xl:h-auto xl:px-2"
            >
              ${vr(`${wg}`)}
            </span>
          </div>
        </div>
        <div
          id="copyright"
          class="absolute inset-x-0 bottom-0 hidden bg-black text-zinc-600 duration-300 hover:text-brand-400 xl:z-50 xl:block"
        >
          <div
            class="container flex h-12 items-center justify-center px-5 font-mono text-[.75rem] font-semibold uppercase leading-none"
          >
            <a
              href="https://github.com/paulomelojunior/pmjr.cc"
              target="_blank"
              rel="noopener noreferrer"
              class="copyright"
            >
              MIT License [<span>Copyright</span>] 2025, pmjr.cc
            </a>
          </div>
        </div>
      </footer>
    `
  }
  createRenderRoot() {
    return this
  }
}
$h([re({ type: String })], ya.prototype, 'lang', 2)
ya = $h([Ae('footer-section')], ya)
const Ou = '/src/c2501f.webp',
  Tg = '/src/6c7165.webp',
  kg = '/src/b1426f.webp'
class $g {
  constructor() {
    ;(this._dark = !0), (this.listeners = new Set())
  }
  get dark() {
    return this._dark
  }
  set dark(e) {
    ;(this._dark = e),
      document.documentElement.classList.toggle('dark', e),
      localStorage.setItem('theme', e ? 'dark' : 'light'),
      this.notifyListeners()
  }
  toggle() {
    this.dark = !this.dark
  }
  subscribe(e) {
    this.listeners.add(e)
  }
  unsubscribe(e) {
    this.listeners.delete(e)
  }
  notifyListeners() {
    this.listeners.forEach((e) => {
      e.requestUpdate()
    })
  }
  init() {
    const e = localStorage.getItem('theme')
    e && (this._dark = e === 'dark'),
      document.documentElement.classList.toggle('dark', this._dark)
  }
}
const di = new $g(),
  ts = (o) =>
    class extends o {
      connectedCallback() {
        super.connectedCallback(), di.subscribe(this)
      }
      disconnectedCallback() {
        super.disconnectedCallback(), di.unsubscribe(this)
      }
      get dark() {
        return di.dark
      }
      set dark(e) {
        di.dark = e
      }
      toggleTheme() {
        di.toggle()
      }
    }
var Pg = Object.defineProperty,
  Fg = Object.getOwnPropertyDescriptor,
  Ph = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Fg(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Pg(e, t, r), r
  }
let va = class extends ts(me) {
  constructor() {
    super(...arguments), (this.lang = b.language)
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', () => {
        this.lang = b.language
      })
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', () => {
        this.lang = b.language
      })
  }
  firstUpdated() {
    document.querySelectorAll('[data-parallax-layers]').forEach((o) => {
      let e = oe.timeline({
        scrollTrigger: { trigger: o, start: '0% 0%', end: '100% 0%', scrub: 0 },
      })
      ;[{ layer: '1', y: '5rem', opacity: 0 }].forEach((n, r) => {
        e.to(
          o.querySelectorAll(`[data-parallax-layer="${n.layer}"]`),
          { y: n.y, ease: 'none', opacity: n.opacity },
          r === 0 ? void 0 : '<'
        )
      })
    })
  }
  render() {
    return ie`
      <section class="hero" data-parallax-layers>
        <div
          class="container flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-10 pt-12 xl:justify-end xl:gap-0 xl:pt-0"
        >
          <div
            class="flex flex-col items-start justify-end gap-8 px-5 xl:py-24 2xl:py-32"
            data-parallax-layer="1"
          >
            <div class="flex items-center gap-4">
              <img
                src="${Ou}"
                srcset="
                  ${Ou} 64w, 
                  ${Tg} 96w,
                  ${kg} 128w
                "
                sizes="64px"
                height="64"
                width="64"
                fetchpriority="high"
                decoding="async"
                loading="eager"
                alt="${b.t('about.picDescription')}"
                class="h-16 rounded-full bg-zinc-900"
              />
              <div class="grid gap-2 leading-none">
                <span class="text-[1.25rem] text-white"> Paulo Melo Jr. </span>
                <span class="flex items-center gap-2 text-[1rem]">
                  <span class="relative flex size-3">
                    <span
                      class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400"
                    ></span>
                    <span
                      class="relative m-0.5 inline-flex size-2 rounded-full bg-green-300"
                    ></span>
                  </span>
                  ${b.t('about.status')}
                </span>
              </div>
            </div>
            <h1
              class="text-pretty bg-gradient-to-r from-zinc-400 to-white bg-clip-text text-[2.5rem] leading-none tracking-[-0.04em] text-transparent xl:text-[3rem] 2xl:text-[4rem]"
            >
              <span class="block xl:hidden">
                ${b.t('about.content.m1')}
              </span>
              <span class="block xl:hidden">
                ${b.t('about.content.m2')}
              </span>
              <span class="hidden xl:block">
                ${b.t('about.content.d1')}
              </span>
              <span class="hidden xl:block">
                ${b.t('about.content.d2')}
              </span>
            </h1>
          </div>
          <div
            class="relative mx-5 hidden h-px bg-gradient-to-r from-black via-zinc-800 to-black xl:block"
            data-parallax-layer="1"
          ></div>
          <div
            class="grid px-5 xl:grid-cols-2 xl:gap-24"
            data-parallax-layer="1"
          >
            <div class="xl:py-24 2xl:py-32">
              <p class="text-default text-pretty">
                <mark
                  class="inline-block bg-transparent text-stone-950 dark:text-white"
                  >${b.t('about.content.h1')}</mark
                >${b.t('about.content.p1')}
              </p>
            </div>
            <div class="hidden xl:block xl:py-24 2xl:py-32">
              <p class="text-default text-pretty">
                <mark
                  class="inline-block bg-transparent text-stone-950 dark:text-white"
                  >${b.t('about.content.h2')}</mark
                >${b.t('about.content.p2')}
              </p>
            </div>
          </div>
        </div>
      </section>
    `
  }
  createRenderRoot() {
    return this
  }
}
Ph([re({ type: String })], va.prototype, 'lang', 2)
va = Ph([Ae('hero-section')], va)
var Ag = Object.defineProperty,
  Og = Object.getOwnPropertyDescriptor,
  Fh = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Og(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Ag(e, t, r), r
  }
let xa = class extends ts(me) {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        ;(this.lang = b.language), this.updateJourneyContent()
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  updateJourneyContent() {
    const o = document.querySelector('#job')
    if (!o) return
    o.innerHTML = ''
    const e = this.getJourneyItems(),
      t = Object.values(e),
      n = this.createJourneyHeader()
    o.insertAdjacentHTML('beforeend', n),
      t.forEach((r) => {
        const i = this.createJourneyItemHTML(r)
        o.insertAdjacentHTML('beforeend', i)
      })
  }
  getJourneyItems() {
    return {
      1: {
        hide: !1,
        custom: 'text-brand-400',
        start: '2019',
        end: '2025',
        title: b.t('journey.t4'),
        description: b.t('journey.p4'),
        more: void 0,
      },
      2: {
        hide: !1,
        start: '2018',
        end: '2019',
        title: b.t('journey.t3'),
        description: b.t('journey.p3'),
        more: b.t('journey.m3'),
        custom: void 0,
      },
      3: {
        hide: !1,
        start: '2016',
        end: '2018',
        title: b.t('journey.t2'),
        description: b.t('journey.p2'),
        more: b.t('journey.m2'),
        custom: void 0,
      },
      4: {
        hide: !0,
        start: '2015',
        end: '2016',
        title: b.t('journey.t1'),
        description: b.t('journey.p1'),
        custom: void 0,
        more: void 0,
      },
    }
  }
  createJourneyHeader() {
    return `
      <h2
        class="text-pretty text-[2.5rem] leading-none tracking-[-0.04em] text-stone-950 xl:text-[3rem] 2xl:text-[4rem] dark:text-zinc-200 px-5 xl:px-20 2xl:px-32"
      >
        ${b.t('journey.t0')}
      </h2>
      <div class="flex items-center justify-end order-1 xl:order-none px-5 xl:px-20 2xl:px-32">
        <a
          href="/Paulo Melo Jr. - Currículo.pdf"
          target="_blank"
          class="cta-button flex items-center gap-4 rounded-full py-3 pe-4 ps-6 text-[1rem] font-medium leading-none text-black"
        >
          Download CV
          <svg
            width="20px"
            height="20px"
            stroke-width="2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 13V22M12 22L15.5 18.5M12 22L8.5 18.5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </a>
      </div>
    `
  }
  createJourneyItemHTML(o) {
    const e = o.hide ? 'hidden xl:flex' : 'flex',
      t = o.custom ? ` class="${o.custom}"` : ''
    return `
      <div class="${e} job relative justify-between flex-col gap-4 px-5 xl:px-20 2xl:px-32">
        <span class="font-mono text-[.75rem] leading-none font-medium tracking-[.05em] text-zinc-500 mb-2">
          ${o.start} &bull; <span${t}>${o.end}</span>
        </span>
        <h2 class="text-[1.5rem] 2xl:text-[2rem] xl:leading-none dark:text-zinc-200 text-stone-900">
          ${o.title}
        </h2>
        <p class="text-sm/loose 2xl:text-base/loose text-pretty">
          ${o.description}
        </p>
      </div>
    `
  }
  firstUpdated(o) {
    const e = this.querySelector('#job'),
      t = this.getJourneyItems(),
      n = Object.values(t),
      r = this.createJourneyHeader()
    e.insertAdjacentHTML('beforeend', r),
      n.forEach((i) => {
        const s = this.createJourneyItemHTML(i)
        e.insertAdjacentHTML('beforeend', s)
      })
  }
  render() {
    return ie`
      <section id="section-journey">
        <div
          class="bg-[linear-gradient(theme('colors.stone.100'),theme('colors.stone.200')_40%)] xl:py-24 2xl:py-32 dark:bg-[linear-gradient(theme('colors.black'),theme('colors.black')_100%)]"
        >
          <div
            id="job"
            class="container grid gap-y-16 overflow-hidden py-16 xl:grid-cols-2 xl:gap-y-32"
          ></div>
        </div>
      </section>
    `
  }
  createRenderRoot() {
    return this
  }
}
Fh([re({ type: String })], xa.prototype, 'lang', 2)
xa = Fh([Ae('journey-section')], xa)
var Lg = Object.defineProperty,
  Mg = Object.getOwnPropertyDescriptor,
  fo = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Mg(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Lg(e, t, r), r
  }
let Ki = class extends me {
  constructor() {
    super(...arguments),
      (this.star = ''),
      (this.items = ''),
      (this.reverse = !1)
  }
  render() {
    const e = this.items
        .split(',')
        .map((r) => r.trim())
        .map(
          (r) => ie`<li>${r}</li>
          <li>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              class="${this.star} size-2 xl:size-3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9385 8.60896C13.9091 8.20693 14.9494 8 16 8C14.9494 8 13.9091 7.79307 12.9385 7.39104C11.9679 6.989 11.086 6.39972 10.3431 5.65685C9.60028 4.91399 9.011 4.03207 8.60896 3.06147C8.20693 2.09086 8 1.05057 8 0C8 2.12173 7.15714 4.15657 5.65685 5.65686C4.15656 7.15715 2.12173 8 0 8C1.05057 8 2.09086 8.20693 3.06147 8.60896C4.03207 9.011 4.91399 9.60028 5.65686 10.3431C6.39972 11.086 6.989 11.9679 7.39104 12.9385C7.79307 13.9091 8 14.9494 8 16C8 14.9494 8.20693 13.9091 8.60896 12.9385C9.011 11.9679 9.60028 11.086 10.3431 10.3431C11.086 9.60028 11.9679 9.011 12.9385 8.60896Z"
              />
            </svg>
          </li>`
        ),
      t = this.reverse,
      n = Zr('marquee', { reverse: t })
    return ie`
      <div class=${n}>
        <ul class="marquee__content">
          ${e}
        </ul>
        <ul class="marquee__content">
          ${e}
        </ul>
      </div>
    `
  }
  createRenderRoot() {
    return this
  }
}
fo([re({ type: String })], Ki.prototype, 'star', 2)
fo([re({ type: String })], Ki.prototype, 'items', 2)
fo([re({ type: Boolean })], Ki.prototype, 'reverse', 2)
Ki = fo([Ae('marquee-element')], Ki)
var Rg = Object.defineProperty,
  zg = Object.getOwnPropertyDescriptor,
  po = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? zg(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Rg(e, t, r), r
  }
let Ji = class extends me {
  constructor() {
    super(...arguments),
      (this.classNames = ''),
      (this.href = ''),
      (this.label = '')
  }
  firstUpdated() {
    const o = document.querySelectorAll('.menu-item')
    o.forEach((n) => {
      const r = n.firstElementChild
      oe.set(r, { clipPath: 'inset(0% 0% 100% 0%)' })
    })
    function e() {
      const n = this.firstElementChild
      oe.to(n, { duration: 0.2, clipPath: 'inset(0% 0% 0% 0%)' })
    }
    function t() {
      if (this.classList.contains('active')) return
      const n = this.firstElementChild
      n &&
        oe.to(n, {
          duration: 0.2,
          clipPath: 'inset(100% 0 0 0)',
          onComplete: () => {
            oe.set(n, { clipPath: 'inset(0% 0% 100%)' })
          },
        })
    }
    o.forEach((n) => {
      n.addEventListener('mouseenter', e), n.addEventListener('mouseleave', t)
    })
  }
  render() {
    const o = Zr(
        'menu-item relative tracking-[0.05em] flex justify-center h-12 xl:h-12 px-4 text-stone-950 dark:text-zinc-50 text-[.75rem] uppercase xl:items-center leading-[3.125rem]'
      ),
      e = Zr(
        'absolute flex items-center justify-center inset-0 text-zinc-950 font-medium'
      )
    return ie`<a
      class="${o} ${this.classNames}"
      href="${this.href}"
      data-label="${this.label}"
    >
      <div aria-hidden="true" class="${e}">${this.label}</div>
      ${this.label}
    </a>`
  }
  createRenderRoot() {
    return this
  }
}
po([re({ type: String })], Ji.prototype, 'classNames', 2)
po([re({ type: String })], Ji.prototype, 'href', 2)
po([re({ type: String })], Ji.prototype, 'label', 2)
Ji = po([Ae('menu-item')], Ji)
var Ig = Object.defineProperty,
  Ng = Object.getOwnPropertyDescriptor,
  ll = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Ng(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Ig(e, t, r), r
  }
let ro = class extends ts(me) {
  constructor() {
    super(),
      (this.more = !1),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
    const o = localStorage.getItem('lang')
    o && ((this.lang = o), b.changeLanguage(o))
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  changeLang() {
    const e = b.language === 'en' ? 'pt' : 'en'
    b.changeLanguage(e), localStorage.setItem('lang', e), (this.lang = e)
  }
  copyEmail() {
    navigator.clipboard
      .writeText('hello@pmjr.cc')
      .then(() => {
        this.updateText(
          this.lang === 'en' ? 'Email copied!' : 'Email copiado!',
          0
        )
      })
      .catch((e) => {
        alert(`Failed to copy email: ${e}`)
      })
  }
  copyEmailReset() {
    this.updateText(this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail', 300)
  }
  updateText(o, e) {
    const t = document.querySelector('mail-button span')
    t &&
      setTimeout(() => {
        t.textContent = o
      }, e)
  }
  render() {
    return ie`
      <header
        class="absolute inset-x-0 z-40 w-full translate-y-[1px] bg-black/80 bg-gradient-to-b backdrop-blur backdrop-saturate-200 xl:fixed"
      >
        <div
          class="pointer-events-none fixed inset-x-0 bottom-12 h-40 bg-gradient-to-t from-black"
        ></div>
        <div class="container grid items-center xl:grid-cols-2">
          <mail-button
            @click=${() => this.copyEmail()}
            @mouseleave=${() => this.copyEmailReset()}
            label="hello@pmjr.cc"
            hover="${this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail'}"
          ></mail-button>
          <nav>
            <ul id="anchors" class="flex justify-end">
              <li class="flex-1 xl:flex-none">
                <menu-item
                  href="#section-praxis"
                  label="${b.t('menu.praxis')}"
                ></menu-item>
              </li>
              <li class="flex-1 xl:flex-none">
                <menu-item
                  href="#section-journey"
                  label="${b.t('menu.journey')}"
                ></menu-item>
              </li>
              <li class="flex-1 xl:flex-none">
                <menu-item
                  href="#section-connect"
                  label="${b.t('menu.connect')}"
                ></menu-item>
              </li>
              <li class="flex h-12 items-center justify-center px-1 xl:h-12">
                <lang-button
                  @click=${() => this.changeLang()}
                  label=${this.lang === 'pt' ? 'PT · BR' : 'EN · US'}
                  title="${this.lang === 'en' ? 'Mudar para português' : 'Change to english'}"
                ></lang-button>
              </li>
            </ul>
            <div
              id="copy"
              class="absolute flex h-12 w-full items-center justify-center bg-stone-300 px-5 font-mono text-[.625rem] font-semibold uppercase xl:hidden dark:bg-zinc-950"
            >
              <span> Copyright 2025 Paulo Melo Jr. </span>
            </div>
          </nav>
        </div>
      </header>
    `
  }
  createRenderRoot() {
    return this
  }
}
ll([re({ type: Boolean })], ro.prototype, 'more', 2)
ll([re({ type: String })], ro.prototype, 'lang', 2)
ro = ll([Ae('menu-container')], ro)
var jg = Object.defineProperty,
  Bg = Object.getOwnPropertyDescriptor,
  ns = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Bg(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && jg(e, t, r), r
  }
let Qr = class extends me {
  constructor() {
    super(...arguments),
      (this.classNames = ''),
      (this.icon = ''),
      (this.label = ''),
      (this.title = '')
  }
  render() {
    const e = Zr(
      'relative text-[.75rem] tracking-[0.05em] flex transition-all ps-3 pe-1 xl:pe-1.5 gap-2 h-8 xl:h-6 hover:h-8 rounded-full leading-[2.125rem] xl:items-center hover:bg-stone-950 dark:hover:bg-zinc-200 hover:text-stone-950 dark:hover:text-zinc-950 hover:font-semibold text-zinc-200',
      this.classNames
    )
    return ie`
      <button class="${e}" title="${this.title}">
        ${this.label}
        <svg
          width="20px"
          height="20px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          class="h-8 stroke-zinc-200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M13 2.04932C13 2.04932 16 5.99994 16 11.9999C16 17.9999 13 21.9506 13 21.9506"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M11 21.9506C11 21.9506 8 17.9999 8 11.9999C8 5.99994 11 2.04932 11 2.04932"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M2.62964 15.5H21.3704"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M2.62964 8.5H21.3704"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    `
  }
  createRenderRoot() {
    return this
  }
}
ns([re({ type: String })], Qr.prototype, 'classNames', 2)
ns([re({ type: String })], Qr.prototype, 'icon', 2)
ns([re({ type: String })], Qr.prototype, 'label', 2)
ns([re({ type: String })], Qr.prototype, 'title', 2)
Qr = ns([Ae('lang-button')], Qr)
var Hg = Object.defineProperty,
  Ug = Object.getOwnPropertyDescriptor,
  go = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Ug(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Hg(e, t, r), r
  }
let Zi = class extends me {
  constructor() {
    super(...arguments), (this.href = ''), (this.label = ''), (this.hover = '')
  }
  render() {
    const o = Zr(
      'hidden xl:flex px-4 gap-2 dark:text-zinc-50 tracking-[0.02em] text-[.75rem] uppercase items-center h-8 leading-none rounded-full whitespace-nowrap'
    )
    return ie`<button class="menu-item group/item ${o} relative">
      <div
        class="${o} pointer-events-none absolute -inset-px justify-center"
        aria-hidden="true"
      >
        <span class="font-semibold text-zinc-950">
          ${this.hover ? this.hover : this.label}
        </span>
      </div>
      ${this.label}
    </button>`
  }
  createRenderRoot() {
    return this
  }
}
go([re({ type: String })], Zi.prototype, 'href', 2)
go([re({ type: String })], Zi.prototype, 'label', 2)
go([re({ type: String })], Zi.prototype, 'hover', 2)
Zi = go([Ae('mail-button')], Zi)
var Vg = Object.defineProperty,
  qg = Object.getOwnPropertyDescriptor,
  Ah = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? qg(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Vg(e, t, r), r
  }
let ba = class extends ts(me) {
  constructor() {
    super(...arguments), (this.lang = b.language)
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', () => {
        this.lang = b.language
      })
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', () => {
        this.lang = b.language
      })
  }
  firstUpdated() {
    this.renderRoot.querySelectorAll('.praxis svg').forEach((t) => {
      const n = t.querySelectorAll('path')
      oe.from(n, {
        scrollTrigger: {
          trigger: t,
          start: '0% 75%',
          toggleActions: 'play none none reverse',
        },
        stagger: 0.12,
        opacity: 0,
        fill: (this.dark, '#4d88ff'),
        drawSVG: !1,
      })
    }),
      this.renderRoot.querySelectorAll('.praxis').forEach((t) => {
        oe.from(t.children, {
          scrollTrigger: {
            trigger: t.children,
            start: '0% 75%',
            toggleActions: 'play none none reverse',
          },
          duration: 0.8,
          stagger: 0.1,
          x: '5rem',
          filter: 'blur(.5rem)',
          opacity: (n) => (n === 0 ? 1 : 0),
        })
      })
  }
  render() {
    return ie`
      <section id="section-praxis" class="bg-zinc-950">
        <div
          class="relative mx-5 h-px bg-gradient-to-r from-black via-zinc-800 to-black"
        ></div>
        <div class="container">
          <marquee-element
            star="fill-brand-500"
            items="Design Engineering, Product Design, UX & UI"
          ></marquee-element>
          <div
            class="grid gap-16 overflow-x-hidden px-5 py-16 *:flex *:flex-col *:items-start *:justify-center *:gap-8 xl:grid-cols-2 xl:gap-24 xl:py-0 xl:*:flex-row *:xl:gap-12 *:xl:py-24 *:2xl:py-32"
          >
            <div class="praxis">
              <svg
                class="size-16 flex-shrink-0 xl:size-24"
                width="82"
                height="81"
                viewBox="0 0 82 81"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 23C31.1503 23 41 13.1503 41 1C28.8497 1 19 10.8497 19 23Z"
                />
                <path
                  d="M41 1C53.1503 1 63 10.8497 63 23C50.8497 23 41 13.1503 41 1Z"
                />
                <path
                  d="M19 23C31.1503 23 41 32.8497 41 45C28.8497 45 19 35.1503 19 23Z"
                />
                <path
                  d="M41 45C53.1503 45 63 35.1503 63 23C50.8497 23 41 32.8497 41 45Z"
                />
                <path
                  d="M41 79.0966C44.5746 79.0966 48.1492 78.4978 51.5712 77.3001L81 67V57C81 50.3726 75.6274 45 69 45H41"
                />
                <path
                  d="M41 79.0966C37.4254 79.0966 33.8508 78.4978 30.4288 77.3001L1 67V57C1 50.3726 6.37258 45 13 45H41"
                />
              </svg>
              <div class="grid gap-2 xl:gap-0">
                <h2
                  class="text-[1.5rem] text-zinc-200 xl:text-[2rem] xl:leading-[6rem] 2xl:text-[2.5rem]"
                >
                  ${b.t('praxis.t1')}
                </h2>
                <p class="text-default text-pretty">
                  ${b.t('praxis.p1')}
                </p>
              </div>
            </div>
            <div class="praxis">
              <svg
                class="size-16 flex-shrink-0 xl:size-24"
                width="82"
                height="66"
                viewBox="0 0 82 66"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 23C31.1503 23 41 13.1503 41 1H1V23H19Z" />
                <path d="M63 23C50.8497 23 41 13.1503 41 1H81V23H63Z" />
                <path d="M19 23C31.1503 23 41 32.8497 41 45H1V23H19Z" />
                <path d="M63 23C50.8497 23 41 32.8497 41 45H81V23H63Z" />
                <path d="M41 65H11V57H29C33.4183 57 37 53.4183 37 49V45H41" />
                <path d="M41 65H71V57H53C48.5817 57 45 53.4183 45 49V45H41" />
              </svg>
              <div class="grid gap-2 xl:gap-0">
                <h2
                  class="text-[1.5rem] text-zinc-200 xl:text-[2rem] xl:leading-[6rem] 2xl:text-[2.5rem]"
                >
                  ${b.t('praxis.t2')}
                </h2>
                <p class="text-default text-pretty">
                  ${b.t('praxis.p2')}
                </p>
              </div>
            </div>
          </div>
          <marquee-element
            reverse
            star="fill-brand-500"
            items="Design Engineering, Product Design, UX & UI"
          ></marquee-element>
          <div
            class="relative mx-5 h-px bg-gradient-to-r from-black via-zinc-800 to-black"
          ></div>
        </div>
      </section>
    `
  }
  createRenderRoot() {
    return this
  }
}
Ah([re({ type: String })], ba.prototype, 'lang', 2)
ba = Ah([Ae('praxis-section')], ba)
const Yg = '/src/4f3f0c.png'
var Wg = Object.defineProperty,
  Xg = Object.getOwnPropertyDescriptor,
  Oh = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Xg(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Wg(e, t, r), r
  }
let Ca = class extends me {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  firstUpdated() {
    const o = document.querySelector('#cover-image')
    o &&
      oe.to(o, {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 20%',
          end: 'bottom 20%',
          scrub: 2,
        },
        y: '-5rem',
        ease: 'none',
      })
  }
  render() {
    return ie` <div
      id="about"
      class="grid translate-y-[4px] grid-cols-2 overflow-hidden rounded-[2rem] bg-gradient-to-b from-zinc-950"
    >
      <div
        class="absolute h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
      ></div>
      <div class="flex flex-col xl:p-16">
        <p class="text-default mb-4 text-balance">
          ${vr(b.t('twyne.about.p2'))}
        </p>
        <p class="text-default text-pretty">
          ${vr(b.t('twyne.about.p1'))}
        </p>
        <ul class="mt-auto text-[.75rem] leading-none *:py-6 2xl:text-[1rem]">
          <li class="flex justify-between align-baseline">
            <span> ${b.t('twyne.about.details.company')} </span>
            <span class="text-right text-zinc-200">
              ${b.t('twyne.about.details.companyValue')}
            </span>
          </li>
          <li class="flex justify-between align-baseline">
            <span> ${b.t('twyne.about.details.industry')} </span>
            <span class="text-right text-zinc-200">
              ${b.t('twyne.about.details.industryValue')}
            </span>
          </li>
          <li class="flex justify-between align-baseline">
            <span> ${b.t('twyne.about.details.product')} </span>
            <span class="text-right text-zinc-200">
              ${b.t('twyne.about.details.productValue')}
            </span>
          </li>
          <li class="flex justify-between align-baseline">
            <span class="text-brand-400">
              ${b.t('twyne.about.details.contributions')}
            </span>
            <span class="flex gap-2 text-right text-zinc-200">
              ${b.t('twyne.about.details.contribution1')}
              <span class="text-zinc-500">/</span>
              ${b.t('twyne.about.details.contribution2')}
              <span class="text-zinc-500">/</span>
              ${b.t('twyne.about.details.contribution3')}
            </span>
          </li>
        </ul>
      </div>
      <div class="relative flex aspect-square overflow-hidden">
        <img
          src="${Yg}"
          id="cover-image"
          class="absolute left-16 top-16 max-w-none flex-none rounded-ss-lg border-t border-zinc-800 shadow-[0px_24px_24px_0px_black]"
        />
        <progressive-blur
          class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"
        ></progressive-blur>
      </div>
    </div>`
  }
  createRenderRoot() {
    return this
  }
}
Oh([re({ type: String })], Ca.prototype, 'lang', 2)
Ca = Oh([Ae('twyne-about')], Ca)
var Gg = Object.defineProperty,
  Kg = Object.getOwnPropertyDescriptor,
  Lh = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Kg(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Gg(e, t, r), r
  }
oe.registerPlugin(G)
let wa = class extends me {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange),
      this.cleanupAnimation()
  }
  setupSignatureAnimation() {
    if (!this.signElement) return
    const o = this.signElement.querySelectorAll('path')
    this.animation = oe.from(o, {
      scrollTrigger: {
        trigger: this.signElement,
        start: '100% 100%',
        toggleActions: 'play none none reverse',
      },
      duration: 0.75,
      stagger: 0.75,
      drawSVG: !1,
    })
  }
  cleanupAnimation() {
    this.animation && (this.animation.kill(), (this.animation = void 0))
  }
  firstUpdated(o) {
    ;(this.signElement = this.querySelector('#sign')),
      this.setupSignatureAnimation()
  }
  renderSignature() {
    return ie`
      <svg
        id="sign"
        class="absolute bottom-2 rotate-[21deg] stroke-zinc-600"
        width="44"
        height="67"
        viewBox="0 0 44 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.622 26.2432C21.3514 21.7806 26.8467 14.2637 26.8467 14.2637L24.3142 20.9771C22.2556 25.7528 20.6914 30.708 18.6864 35.4888C16.8732 39.8121 13.9681 45.3093 12.0938 48.2719C10.2195 51.2345 5.20238 56.9493 4.7375 53.4575C4.51176 51.7619 5.98672 46.8824 8.83354 42.6494C11.6804 38.4164 18.3776 29.4011 24.7806 25.0562C32.0957 20.0925 40.026 12.6061 40.6384 8.03106C42.2438 -3.96201 21.0414 0.396133 1.82617 23.5558"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.0068 65.5502C25.5655 61.1839 21.8028 42.839 27.25 23.3022C28.2281 19.7942 29.5032 16.2477 31.2288 12.7368C30.2319 15.3528 27.6369 24.4559 30.9257 27.8938C34.2144 31.3317 40.2681 27.7068 42.8838 25.4646"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `
  }
  renderContent() {
    return ie`
      <h2
        class="mb-4 font-semibold uppercase leading-none tracking-[0.05em] xl:text-[0.75rem] dark:text-zinc-500"
      >
        ${b.t('twyne.conclusion.t1')}
      </h2>
      <p class="text-default">${b.t('twyne.conclusion.p1')}</p>
      <p class="text-default">${b.t('twyne.conclusion.p2')}</p>
      <p class="text-default">${b.t('twyne.conclusion.p3')}</p>
    `
  }
  render() {
    return ie`
      <section>
        <div class="container grid grid-cols-4 py-32">
          <div
            class="relative col-span-2 col-start-2 flex aspect-square flex-col items-center justify-center gap-8 text-balance text-center text-[1.25rem] leading-loose text-zinc-300 2xl:text-[1.5rem]"
          >
            ${this.renderContent()} ${this.renderSignature()}
          </div>
        </div>
      </section>
    `
  }
  createRenderRoot() {
    return this
  }
}
Lh([re({ type: String })], wa.prototype, 'lang', 2)
wa = Lh([Ae('twyne-conclusion')], wa)
var Jg = Object.defineProperty,
  Zg = Object.getOwnPropertyDescriptor,
  Mh = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Zg(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && Jg(e, t, r), r
  }
let Sa = class extends me {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  render() {
    return ie`
      <section id="goal" class="container p-24 2xl:p-32">
        <div class="grid grid-cols-4 justify-center">
          <div
            class="col-span-2 col-start-2 flex aspect-square flex-col justify-center"
          >
            <h2
              class="mb-10 text-[2.5rem] leading-none tracking-[-.02em] 2xl:text-[3rem] dark:text-zinc-200"
            >
              ${b.t('twyne.goal.t1')}
            </h2>
            <p
              class="mb-8 text-pretty text-[1rem] leading-loose 2xl:text-[1.25rem]"
            >
              ${vr(b.t('twyne.goal.p1'))}
            </p>
            <p class="text-pretty text-[1rem] leading-loose 2xl:text-[1.25rem]">
              ${b.t('twyne.goal.p2')}
            </p>
          </div>
        </div>
      </section>
    `
  }
  createRenderRoot() {
    return this
  }
}
Mh([re({ type: String })], Sa.prototype, 'lang', 2)
Sa = Mh([Ae('twyne-goal')], Sa)
const Qg = '/src/3d9806.svg'
var e0 = Object.defineProperty,
  t0 = Object.getOwnPropertyDescriptor,
  Rh = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? t0(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && e0(e, t, r), r
  }
let Ea = class extends me {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  render() {
    return ie`
      <div class="flex flex-col items-start gap-2 px-14 py-16">
        <span
          class="hidden rounded-full text-[.75rem] font-medium uppercase leading-none tracking-[0.05em] dark:text-zinc-500"
        >
          ${b.t('twyne.t1')}
        </span>
        <div class="flex items-center gap-6">
          <img src="${Qg}" class="h-14 border-r border-zinc-900 pr-6" />
          <h1
            class="text-[2.5rem] h-14 leading-none tracking-[-0.04em] text-stone-950 xl:text-[3rem] 2xl:text-[4rem] dark:text-zinc-200"
          >
            ${b.t('twyne.t2')}
          </h1>
        </div>
      </div>
    `
  }
  createRenderRoot() {
    return this
  }
}
Rh([re({ type: String })], Ea.prototype, 'lang', 2)
Ea = Rh([Ae('twyne-header')], Ea)
var n0 = Object.defineProperty,
  r0 = Object.getOwnPropertyDescriptor,
  zh = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? r0(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && n0(e, t, r), r
  }
let Ta = class extends me {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  render() {
    const o = b.t('twyne.impact.l1', { returnObjects: !0 })
    return ie`
      <div id="impact" class="container grid gap-16 px-24 pt-32 2xl:px-32">
        <h2
          class="text-[2.5rem] leading-none tracking-[-.02em] 2xl:text-[3rem] dark:text-zinc-200"
        >
          ${vr(b.t('twyne.impact.t1'))}
        </h2>

        <div class="grid grid-cols-3">
          <div class="grid gap-2 border-s border-zinc-800 ps-8">
            <h3 class="text-[2rem] leading-none dark:text-zinc-200">
              ${b.t('twyne.numbers.t1')}
            </h3>
            <p class="text-base/none text-pretty">
              ${b.t('twyne.numbers.p1')}
            </p>
          </div>
          <div class="grid gap-2 border-s border-zinc-800 ps-8">
            <h3 class="text-[2rem] leading-none dark:text-zinc-200">
              ${b.t('twyne.numbers.t2')}
            </h3>
            <p class="text-base/none text-pretty">
              ${b.t('twyne.numbers.p2')}
            </p>
          </div>
          <div class="grid gap-2 border-s border-zinc-800 ps-8">
            <h3 class="text-[2rem] leading-none dark:text-zinc-200">
              ${b.t('twyne.numbers.t3')}
            </h3>
            <p class="text-base/none text-pretty">
              ${b.t('twyne.numbers.p3')}
            </p>
          </div>
        </div>
        <ul class="grid grid-cols-2 text-[1rem] leading-[2.25] 2xl:text-[1.25rem]">
          ${o.map(
            (e) => ie`<li
                class="flex items-center gap-4 before:text-[1rem] before:text-zinc-800 before:content-['✦']"
              >
                ${e}
              </li>`
          )}
        </ul>
      </div>
    `
  }
  createRenderRoot() {
    return this
  }
}
zh([re({ type: String })], Ta.prototype, 'lang', 2)
Ta = zh([Ae('twyne-impact')], Ta)
const i0 =
  "data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8%2013L2%206.99999M2%206.99999L8%201M2%206.99999L14%206.99999'%20stroke='white'%20stroke-width='2'/%3e%3c/svg%3e"
var s0 = Object.defineProperty,
  o0 = Object.getOwnPropertyDescriptor,
  ul = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? o0(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && s0(e, t, r), r
  }
let io = class extends ts(me) {
  constructor() {
    super(),
      (this.more = !1),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
    const o = localStorage.getItem('lang')
    o && ((this.lang = o), b.changeLanguage(o))
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  changeLang() {
    const e = b.language === 'en' ? 'pt' : 'en'
    b.changeLanguage(e), localStorage.setItem('lang', e), (this.lang = e)
  }
  changeTheme() {
    this.toggleTheme()
  }
  copyEmail() {
    navigator.clipboard
      .writeText('hello@pmjr.cc')
      .then(() => {
        this.updateText(this.lang === 'en' ? 'Copied!' : 'Copiado!', 0)
      })
      .catch((e) => {
        alert(`Failed to copy email: ${e}`)
      })
  }
  copyEmailReset() {
    this.updateText(this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail', 300)
  }
  updateText(o, e) {
    const t = document.querySelector('mail-button span')
    t &&
      setTimeout(() => {
        t.textContent = o
      }, e)
  }
  render() {
    return ie`
      <header
        class="absolute inset-x-0 z-40 hidden w-full bg-gradient-to-b backdrop-blur backdrop-saturate-200 xl:fixed xl:block bg-black/80"
      >
        <div class="container grid items-center xl:grid-cols-3">
          <div class="flex items-center">
            <a
              href="/"
              class="flex size-12 cursor-pointer items-center justify-center *:opacity-50 *:hover:opacity-100"
              title="Go back homepage"
            >
              <img
                src="${i0}"
                class="transition-all duration-500"
                title="Back to homepage"
              />
            </a>
            <mail-button
              @click=${() => this.copyEmail()}
              @mouseleave=${() => this.copyEmailReset()}
              label="hello@pmjr.cc"
              hover="${this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail'}"
            ></mail-button>
          </div>
          <nav>
            <ul id="anchors" class="flex justify-evenly">
              <li class="flex-1">
                <menu-item
                  href="#goal"
                  label="${b.t('twyne.menu.goal')}"
                ></menu-item>
              </li>
              <li class="flex-1">
                <menu-item
                  href="#proposal"
                  label="${b.t('twyne.menu.proposal')}"
                ></menu-item>
              </li>
              <li class="flex-1">
                <menu-item
                  href="#impact"
                  label="${b.t('twyne.menu.impact')}"
                ></menu-item>
              </li>
              <li class="flex-1">
                <menu-item
                  href="#mobile"
                  label="${b.t('twyne.menu.mobile')}"
                ></menu-item>
              </li>
            </ul>
            <div
              id="copy"
              class="absolute flex h-12 w-full items-center justify-center bg-stone-300 px-5 font-mono text-[.625rem] font-semibold uppercase xl:hidden dark:bg-zinc-900"
            >
              <span> Copyright 2025 Paulo Melo Jr. </span>
            </div>
          </nav>
          <div class="flex justify-end">
            <div class="flex items-center justify-center">
              <div class="flex h-12 items-center justify-center px-1">
                <lang-button
                  @click=${() => this.changeLang()}
                  label=${this.lang === 'pt' ? 'PT · BR' : 'EN · US'}
                  title="${this.lang === 'en' ? 'Mudar para português' : 'Change to english'}"
                ></lang-button>
              </div>
            </div>
          </div>
        </div>
      </header>
    `
  }
  createRenderRoot() {
    return this
  }
}
ul([re({ type: Boolean })], io.prototype, 'more', 2)
ul([re({ type: String })], io.prototype, 'lang', 2)
io = ul([Ae('cases-menu')], io)
const a0 = '/src/cef3d9.png',
  l0 = '/src/6f2cb8.png',
  u0 = '/src/6b0ed1.png',
  c0 = '/src/b2e798.png',
  h0 = '/src/9bbc2e.png'
var d0 = Object.defineProperty,
  f0 = Object.getOwnPropertyDescriptor,
  Ih = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? f0(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && d0(e, t, r), r
  }
let ka = class extends me {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  firstUpdated(o) {
    document.querySelectorAll('[data-parallax-screens]').forEach((e) => {
      let t = oe.timeline({
        scrollTrigger: {
          trigger: '#mobile-images',
          start: '0% 100%',
          end: '50% 100%',
          scrub: 2,
        },
      })
      ;[
        { layer: '1', y: '10%', opacity: 0 },
        { layer: '2', y: '20%', opacity: 0.5 },
        { layer: '3', y: '30%', opacity: 1 },
      ].forEach((r, i) => {
        t.from(
          e.querySelectorAll(`[data-parallax-screens="${r.layer}"]`),
          { y: r.y, ease: 'none', opacity: r.opacity, filter: 'blur(1rem)' },
          i === 0 ? void 0 : '<'
        )
      })
    })
  }
  render() {
    return ie`
      <section id="mobile" class="mt-32 py-32">
        <h2
          class="mb-32 text-center text-[2.5rem] font-light leading-none tracking-[-.02em] 2xl:text-[3rem] dark:text-zinc-200"
        >
          ${vr(b.t('twyne.mobile.t1'))}
        </h2>
        <div
          id="mobile-images"
          class="mx-auto grid max-w-[1920px] grid-cols-5 items-center justify-center gap-4 px-4"
          data-parallax-screens
        >
          <img src="${l0}" data-parallax-screens="1" class="mobile-screen" />
          <img src="${a0}" data-parallax-screens="2" class="mobile-screen" />
          <img src="${u0}" data-parallax-screens="3" class="mobile-screen" />
          <img src="${c0}" data-parallax-screens="2" class="mobile-screen" />
          <img src="${h0}" data-parallax-screens="1" class="mobile-screen" />
        </div>
      </section>
      <style>
        .mobile-screen {
          border-radius: 3rem;
        }
      </style>
    `
  }
  createRenderRoot() {
    return this
  }
}
Ih([re({ type: String })], ka.prototype, 'lang', 2)
ka = Ih([Ae('twyne-mobile')], ka)
const p0 = '/src/6ab55e.png',
  g0 = '/src/b0e17e.png',
  m0 = '/src/96ef6f.png',
  _0 = '/src/2bf8a7.png',
  D0 = '/src/2eab02.png',
  y0 = '/src/a54df0.png',
  v0 = '/src/b3d826.png',
  x0 = '/src/adef9e.png',
  b0 = '/src/120066.png',
  C0 = '/src/908f2c.png',
  w0 = '/src/20a18e.png'
var S0 = Object.defineProperty,
  E0 = Object.getOwnPropertyDescriptor,
  Nh = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? E0(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && S0(e, t, r), r
  }
oe.registerPlugin(G)
let $a = class extends me {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.componentAnimations = []),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange),
      this.cleanupAnimations()
  }
  setupComponentAnimations() {
    this.renderRoot.querySelectorAll('img').forEach((e) => {
      const t = oe.from(e, {
        scrollTrigger: {
          trigger: e,
          start: '0% 100%',
          end: '0% 50%',
          toggleActions: 'play none none reverse',
        },
        scale: 1,
        opacity: 0,
        filter: 'blur(1rem)',
        duration: 1,
        y: '20%',
      })
      this.componentAnimations.push(t)
    })
  }
  cleanupAnimations() {
    this.componentAnimations.forEach((o) => {
      o && o.kill()
    }),
      (this.componentAnimations = [])
  }
  firstUpdated() {
    this.setupComponentAnimations()
  }
  renderProposalList() {
    const o = b.t('twyne.proposal.l1', { returnObjects: !0 })
    return ie`
      <ul
        class="text-[1rem] leading-loose 2xl:text-[1.25rem] dark:text-zinc-200"
      >
        ${o.map(
          (e) => ie`
            <li
              class="flex items-center gap-4 before:text-[1rem] before:text-brand-400 before:content-['✦']"
            >
              ${e}
            </li>
          `
        )}
      </ul>
    `
  }
  renderComponentGrid() {
    return ie`
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <div class="flex flex-col gap-4">
            <img
              src="${D0}"
              height="425"
              width="216"
              loading="lazy"
              alt="Component B1"
            />
            <img
              src="${v0}"
              height="216"
              width="216"
              loading="lazy"
              alt="Component B3"
            />
          </div>
          <img
            src="${y0}"
            height="660"
            width="560"
            loading="lazy"
            alt="Component B2"
          />
        </div>
        <div class="flex gap-4">
          <img
            src="${w0}"
            height="218"
            width="280"
            loading="lazy"
            alt="Component B7"
          />
          <img
            src="${b0}"
            height="218"
            width="240"
            loading="lazy"
            alt="Component B5"
          />
          <img
            src="${C0}"
            height="218"
            width="240"
            loading="lazy"
            alt="Component B6"
          />
        </div>
        <img
          src="${x0}"
          height="448"
          width="792"
          loading="lazy"
          alt="Component B4"
        />
      </div>
    `
  }
  renderComponentColumn() {
    return ie`
      <div class="grid gap-4">
        <img
          src="${p0}"
          height="264"
          width="480"
          loading="lazy"
          alt="Component A1"
        />
        <img
          src="${g0}"
          height="248"
          width="480"
          loading="lazy"
          alt="Component A2"
        />
        <img
          src="${m0}"
          height="492"
          width="480"
          loading="lazy"
          alt="Component A3"
        />
        <img
          src="${_0}"
          height="296"
          width="480"
          loading="lazy"
          alt="Component A4"
        />
      </div>
    `
  }
  renderComponentsSection() {
    return ie`
      <div
        id="components"
        class="relative flex min-h-[1348px] items-start justify-center gap-4"
      >
        <style>
          #components img {
            border-radius: 0.25rem;
          }
        </style>
        <div class="container absolute inset-y-0 -z-10 bg-gradient-to-t"></div>
        ${this.renderComponentGrid()} ${this.renderComponentColumn()}
      </div>
    `
  }
  render() {
    return ie`
      <section id="proposal">
        <div
          class="container hidden h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
        ></div>
        <div class="container rounded-t-[2rem] p-24 2xl:p-32">
          <h2
            class="mb-10 text-[2.5rem] leading-none tracking-[-.02em] 2xl:text-[3rem] dark:text-zinc-200"
          >
            ${b.t('twyne.proposal.t1')}
          </h2>
          <div class="grid grid-cols-2 gap-24">
            ${this.renderProposalList()}
            <p class="text-default text-pretty">
              ${b.t('twyne.proposal.p1')}
            </p>
          </div>
        </div>
        ${this.renderComponentsSection()}
        <twyne-impact></twyne-impact>
      </section>
    `
  }
  createRenderRoot() {
    return this
  }
}
Nh([re({ type: String })], $a.prototype, 'lang', 2)
$a = Nh([Ae('twyne-proposal')], $a)
const T0 = '/src/2f4591.png',
  k0 = '/src/367502.png',
  $0 = '/src/14eeca.png'
var P0 = Object.defineProperty,
  F0 = Object.getOwnPropertyDescriptor,
  rs = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? F0(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && P0(e, t, r), r
  }
let ei = class extends me {
  constructor() {
    super(...arguments),
      (this.lang = b.language),
      (this.currentIndex = 0),
      (this.screens = []),
      (this.updateScreens = () => {}),
      (this.handleLanguageChange = () => {
        this.lang = b.language
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      b.on('languageChanged', this.handleLanguageChange)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      b.off('languageChanged', this.handleLanguageChange)
  }
  firstUpdated(o) {
    const e = document.querySelectorAll('.carrossel img')
    ;(this.currentIndex = 0),
      (this.screens = e),
      (this.updateScreens = () => {
        this.screens.forEach((r, i) => {
          i === this.currentIndex
            ? oe.to(r, {
                opacity: 1,
                duration: 0.4,
                y: 0,
                delay: 0.2,
                onStart: () => r.classList.remove('invisible'),
              })
            : oe.to(r, {
                opacity: 0,
                duration: 0.4,
                y: 100,
                onComplete: () => r.classList.add('invisible'),
              })
        })
      }),
      this.updateScreens()
    const t = this.renderRoot.querySelector('button:first-of-type'),
      n = this.renderRoot.querySelector('button:last-of-type')
    t &&
      n &&
      (t.addEventListener('click', () => {
        ;(this.currentIndex =
          (this.currentIndex - 1 + this.screens.length) % this.screens.length),
          this.updateScreens()
      }),
      n.addEventListener('click', () => {
        ;(this.currentIndex = (this.currentIndex + 1) % this.screens.length),
          this.updateScreens()
      }))
  }
  render() {
    return ie`
      <section class="relative mt-32">
        <div class="container">
          <div class="carrossel relative overflow-hidden">
            <img
              src="${T0}"
              width="1728"
              height="976"
              class="relative rounded-[.5rem]"
            />
            <img
              src="${k0}"
              width="1728"
              height="976"
              class="invisible absolute left-0 top-0 rounded-[.5rem]"
            />
            <img
              src="${$0}"
              width="1728"
              height="976"
              class="invisible absolute left-0 top-0 rounded-[.5rem]"
            />
          </div>
          <div class="absolute inset-0">
            <div
              class="sticky -inset-x-4 top-[calc(100dvh-12rem)] isolate flex h-[12rem] items-end justify-center after:absolute after:inset-0 after:z-10 after:bg-gradient-to-t after:from-black after:content-['']"
            >
              <progressive-blur></progressive-blur>
              <div class="relative z-20 flex gap-px pb-2">
                <button
                  class="flex items-center gap-4 rounded-s-full bg-zinc-200/10 py-3 pe-4 ps-5 text-[.75rem] uppercase leading-none tracking-[.05em] text-zinc-200 transition-all hover:bg-zinc-200 hover:text-zinc-950"
                >
                  Prev
                </button>

                <span
                  class="flex items-center justify-center bg-white/5 px-4 font-mono text-[.75rem] font-medium uppercase leading-none tracking-[.05em]"
                >
                  ${this.currentIndex + 1} / ${this.screens.length}
                </span>
                <button
                  class="flex items-center gap-4 rounded-e-full bg-zinc-200/10 py-3 pe-5 ps-4 text-[.75rem] uppercase leading-none tracking-[.05em] text-zinc-200 transition-all hover:bg-zinc-200 hover:text-zinc-950"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }
  createRenderRoot() {
    return this
  }
}
rs([re({ type: String })], ei.prototype, 'lang', 2)
rs([re({ type: Number })], ei.prototype, 'currentIndex', 2)
rs([re({ type: Array })], ei.prototype, 'screens', 2)
rs([re({ type: Function })], ei.prototype, 'updateScreens', 2)
ei = rs([Ae('twyne-screens')], ei)
const A0 = `<?xml version="1.0" encoding="utf-8"?><!--Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)-->\r
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\r
<svg version="1.1" id="cog4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\r
    x="0px" y="0px" viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">\r
    <style>\r
        .spinning {\r
            animation: spinning 2s infinite ease;\r
            transform-origin: 50% 50%;\r
            vector-effect: non-scaling-stroke;\r
        }\r
\r
        @keyframes spinning {\r
            0% {\r
                transform: rotate(0deg);\r
            }\r
\r
            100% {\r
                transform: rotate(360deg);\r
            }\r
        }\r
    </style>\r
    <path class="spinning" d="M87.311,48c0-0.983-0.076-1.947-0.147-2.912c3.839-1.227,6.879-2.397,8.837-3.441l-0.704-3.963\r
    c-2.198-0.316-5.456-0.385-9.481-0.236c-0.535-1.89-1.203-3.719-2.007-5.48c3.179-2.452,5.629-4.58,7.106-6.225l-2.027-3.484\r
    c-2.176,0.449-5.263,1.491-8.997,2.998c-1.148-1.582-2.397-3.084-3.766-4.476c2.14-3.381,3.707-6.211,4.529-8.257l-3.106-2.586\r
    c-1.886,1.157-4.419,3.175-7.399,5.849c-1.614-1.095-3.332-2.041-5.107-2.891c0.848-3.912,1.346-7.108,1.413-9.313l-3.811-1.375\r
    c-1.377,1.731-3.066,4.499-4.952,8.036c-1.884-0.475-3.805-0.854-5.785-1.047C51.354,5.249,50.723,2.088,50.027,0h-4.055\r
    c-0.695,2.088-1.327,5.249-1.878,9.196c-1.98,0.194-3.902,0.573-5.785,1.047c-1.886-3.537-3.575-6.305-4.952-8.036l-3.811,1.375\r
    c0.066,2.205,0.565,5.401,1.413,9.313c-1.775,0.85-3.493,1.796-5.108,2.891c-2.979-2.674-5.513-4.692-7.398-5.849l-3.106,2.586\r
    c0.821,2.045,2.39,4.875,4.529,8.257c-1.368,1.392-2.617,2.894-3.766,4.476c-3.734-1.507-6.821-2.549-8.997-2.998l-2.028,3.484\r
    c1.479,1.645,3.928,3.772,7.106,6.225c-0.803,1.762-1.471,3.591-2.006,5.48c-4.026-0.148-7.283-0.08-9.481,0.236L0,41.646\r
    c1.958,1.044,4.998,2.215,8.837,3.441C8.765,46.053,8.688,47.017,8.688,48c0,0.982,0.076,1.947,0.148,2.912\r
    C4.998,52.139,1.958,53.309,0,54.354l0.704,3.963c2.198,0.316,5.455,0.385,9.481,0.236c0.535,1.89,1.203,3.719,2.006,5.48\r
    c-3.179,2.452-5.628,4.58-7.106,6.225l2.028,3.484c2.176-0.448,5.263-1.49,8.997-2.998c1.148,1.582,2.397,3.085,3.766,4.477\r
    c-2.141,3.381-3.708,6.211-4.529,8.257l3.106,2.585c1.886-1.156,4.419-3.176,7.398-5.849c1.615,1.095,3.333,2.04,5.108,2.891\r
    c-0.848,3.911-1.347,7.108-1.413,9.312l3.811,1.376c1.377-1.731,3.066-4.499,4.952-8.037c1.883,0.475,3.805,0.854,5.785,1.049\r
    c0.551,3.946,1.183,7.107,1.878,9.195h4.055c0.695-2.088,1.327-5.249,1.878-9.195c1.98-0.194,3.901-0.574,5.785-1.049\r
    c1.885,3.538,3.575,6.306,4.952,8.037l3.811-1.376c-0.067-2.204-0.565-5.401-1.413-9.312c1.775-0.851,3.493-1.796,5.108-2.891\r
    c2.979,2.673,5.513,4.692,7.398,5.849l3.106-2.585c-0.822-2.046-2.39-4.876-4.529-8.257c1.368-1.392,2.617-2.895,3.766-4.477\r
    c3.734,1.508,6.821,2.55,8.997,2.998l2.027-3.484c-1.478-1.645-3.928-3.772-7.106-6.225c0.804-1.762,1.472-3.591,2.007-5.48\r
    c4.025,0.148,7.283,0.08,9.481-0.236L96,54.354c-1.958-1.045-4.998-2.215-8.837-3.441C87.234,49.947,87.311,48.982,87.311,48z\r
    M51,18.244c0-1.694,1.556-2.959,3.22-2.641c7.429,1.418,13.966,5.33,18.723,10.829c1.105,1.278,0.778,3.255-0.686,4.1l-0.65,0.375\r
    c-1.096,0.633-2.449,0.339-3.28-0.615c-3.85-4.417-9.098-7.577-15.06-8.763C51.973,21.27,51,20.203,51,18.882V18.244z\r
    M23.057,26.432c4.758-5.5,11.295-9.41,18.724-10.829C43.443,15.285,45,16.55,45,18.244v0.639c0,1.321-0.973,2.388-2.268,2.646\r
    c-5.961,1.186-11.21,4.347-15.059,8.764c-0.831,0.954-2.185,1.247-3.28,0.614l-0.651-0.375\r
    C22.279,29.687,21.952,27.71,23.057,26.432z M21.203,60.008l-0.464,0.268c-1.46,0.842-3.331,0.146-3.89-1.444\r
    C15.66,55.439,15,51.799,15,48c0-3.8,0.66-7.438,1.85-10.831c0.559-1.591,2.43-2.287,3.89-1.444l0.464,0.268\r
    c1.122,0.648,1.701,2,1.276,3.225C21.525,41.972,21,44.924,21,48s0.525,6.028,1.479,8.783\r
    C22.904,58.008,22.325,59.359,21.203,60.008z M45,77.756c0,1.693-1.557,2.959-3.22,2.642c-7.429-1.419-13.966-5.33-18.724-10.829\r
    c-1.104-1.278-0.777-3.255,0.686-4.1l0.651-0.376c1.096-0.632,2.449-0.339,3.28,0.615c3.849,4.417,9.098,7.578,15.059,8.765\r
    C44.027,74.73,45,75.797,45,77.117V77.756z M48,65.094c-9.44,0-17.094-7.653-17.094-17.094S38.56,30.906,48,30.906\r
    S65.094,38.56,65.094,48S57.44,65.094,48,65.094z M72.942,69.568c-4.757,5.499-11.294,9.41-18.723,10.829\r
    C52.556,80.715,51,79.449,51,77.756v-0.639c0-1.32,0.973-2.387,2.267-2.645c5.962-1.187,11.21-4.348,15.06-8.765\r
    c0.831-0.954,2.185-1.247,3.28-0.614l0.651,0.375C73.721,66.313,74.048,68.29,72.942,69.568z M79.149,58.831\r
    c-0.558,1.591-2.429,2.286-3.889,1.444l-0.464-0.268c-1.122-0.648-1.701-2-1.277-3.225C74.475,54.028,75,51.076,75,48\r
    s-0.525-6.028-1.48-8.783c-0.424-1.225,0.155-2.576,1.277-3.225l0.464-0.268c1.46-0.843,3.331-0.146,3.889,1.444\r
    C80.34,40.562,81,44.2,81,48C81,51.799,80.34,55.439,79.149,58.831z"/>\r
</svg>`
var O0 = Object.defineProperty,
  L0 = Object.getOwnPropertyDescriptor,
  jh = (o, e, t, n) => {
    for (
      var r = n > 1 ? void 0 : n ? L0(e, t) : e, i = o.length - 1, s;
      i >= 0;
      i--
    )
      (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r)
    return n && r && O0(e, t, r), r
  }
let Pa = class extends me {
  constructor() {
    super(...arguments),
      (this.minMs = 500),
      (this.mountedAt = 0),
      (this.finishTimeoutId = null),
      (this.fallbackTimeoutId = null),
      (this.isExiting = !1),
      (this.onDomContentLoaded = () => this.finishAfterMinTime()),
      (this.onWindowLoad = () => this.finishAfterMinTime())
  }
  connectedCallback() {
    super.connectedCallback(),
      this.setAttribute('aria-busy', 'true'),
      this.setAttribute('aria-live', 'polite'),
      (this.mountedAt = performance.now()),
      document.readyState === 'complete' ||
      document.readyState === 'interactive'
        ? this.finishAfterMinTime()
        : (document.addEventListener(
            'DOMContentLoaded',
            this.onDomContentLoaded,
            { once: !0 }
          ),
          window.addEventListener('load', this.onWindowLoad, { once: !0 }),
          (this.fallbackTimeoutId = window.setTimeout(
            () => this.finishAfterMinTime(),
            8e3
          )))
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      document.removeEventListener('DOMContentLoaded', this.onDomContentLoaded),
      window.removeEventListener('load', this.onWindowLoad),
      this.finishTimeoutId &&
        (clearTimeout(this.finishTimeoutId), (this.finishTimeoutId = null)),
      this.fallbackTimeoutId &&
        (clearTimeout(this.fallbackTimeoutId), (this.fallbackTimeoutId = null))
  }
  finishAfterMinTime() {
    const o = performance.now() - this.mountedAt,
      e = Math.max(0, this.minMs - o)
    this.finishTimeoutId = window.setTimeout(() => this.exit(), e)
  }
  exit() {
    if (this.isExiting) return
    ;(this.isExiting = !0),
      this.finishTimeoutId &&
        (clearTimeout(this.finishTimeoutId), (this.finishTimeoutId = null)),
      this.fallbackTimeoutId &&
        (clearTimeout(this.fallbackTimeoutId), (this.fallbackTimeoutId = null))
    const o = this.querySelector('#loading') || this,
      e = document.querySelector('main')
    oe.set(e, { y: '5rem', opacity: 0 }),
      oe.to(o, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        force3D: !0,
        onComplete: () => {
          this.dispatchEvent(
            new CustomEvent('mobile-loading:done', {
              bubbles: !0,
              composed: !0,
            })
          ),
            oe.to(e, {
              y: 0,
              opacity: 1,
              duration: 1,
              onComplete: () => {
                e.removeAttribute('style')
              },
            }),
            this.remove()
        },
      })
  }
  render() {
    return ie` <div
      id="loading"
      class="fixed top-0 z-[100] h-svh w-full bg-black"
    >
      <div
        class="container mx-5 mt-auto flex h-full items-end gap-4 pb-32 xl:mx-auto"
      >
        <span class="size-10 fill-brand-400"> ${vr(`${A0}`)} </span>
        <span
          class="animate-pulse text-[.75rem] uppercase leading-10 tracking-[.05em] text-white"
        >
          ${this.lang === 'pt' ? ie`Carregando...` : ie`Loading...`}
        </span>
      </div>
    </div>`
  }
  createRenderRoot() {
    return this
  }
}
jh([re({ type: Number, attribute: 'min-ms' })], Pa.prototype, 'minMs', 2)
Pa = jh([Ae('mobile-loading')], Pa)
