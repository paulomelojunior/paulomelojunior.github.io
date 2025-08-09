import Lenis from 'lenis'

const lenis = new Lenis()
window.lenis = lenis

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

const hasLoader = !!document.querySelector('mobile-loading')

if (hasLoader) {
  lenis.stop()
  window.addEventListener(
    'mobile-loading:done',
    () => {
      lenis.start()
      requestAnimationFrame(raf)
    },
    { once: true }
  )
} else {
  requestAnimationFrame(raf)
}

document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]')
  if (!anchor) return
  const href = anchor.getAttribute('href')
  if (!href) return
  const target = document.querySelector(href)
  if (!target) return
  e.preventDefault()
  lenis.scrollTo(target)
})
