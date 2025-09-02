// GSAP
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.defaults({
  duration: 1,
  ease: CustomEase.create('custom', '.75,0,.5,1'),
})

gsap.registerPlugin(
  CustomEase,
  DrawSVGPlugin,
  ScrollTrigger,
  ScrambleTextPlugin
)

function initGsap() {
  let mm = gsap.matchMedia()

  mm.add('(min-width: 1024px)', () => {
    gsap.from('#job > *', {
      scrollTrigger: {
        trigger: '.job',
        start: '0% 100%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: '10rem',
      stagger: 0.1,
    })

    gsap.from('.cases', {
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
  })

  gsap.from('#menu > *', {
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

window.addEventListener('mobile-loading:done', initGsap, { once: true })

if (!document.querySelector('mobile-loading')) {
  if (document.readyState === 'complete') initGsap()
  else window.addEventListener('load', initGsap, { once: true })
}
