import Lenis from 'lenis'

const lenis = new Lenis()

window.lenis = lenis

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]')
  if (anchor) {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      lenis.scrollTo(target)
    }
  }
})
