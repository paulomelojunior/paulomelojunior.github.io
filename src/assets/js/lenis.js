import Lenis from 'lenis'

const lenis = new Lenis()

window.lenis = lenis

document.documentElement.style.overflow = 'hidden'
document.body.style.overflow = 'hidden'

lenis.stop()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

window.addEventListener('mobile-loading:done', () => {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  lenis.start()
})

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
