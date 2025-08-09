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

  mm.add('(max-width: 1024px)', () => {
    const header = document.querySelector('header')
    const copyright = document.querySelector('#copy')
    const footerLinks = document.querySelector('#footerLinks')

    gsap.set(copyright, {
      opacity: 0,
    })

    ScrollTrigger.create({
      trigger: copyright,
      onLeave: () => {
        header.classList.add(
          'fixed',
          'bottom-[env(safe-area-inset-bottom)]',
          'bg-black'
        )
        header.classList.remove('absolute')
        gsap.to(header, {
          yPercent: 0,
          opacity: 1,
          duration: 0.25,
        })
        gsap.to(copyright, {
          opacity: 1,
        })
      },
      onEnterBack: () => {
        gsap.to(header, {
          yPercent: 50,
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            header.classList.remove(
              'fixed',
              'bottom-[env(safe-area-inset-bottom)]',
              'bg-black'
            )
            header.classList.add('absolute')
            header.removeAttribute('style')
          },
        })
        gsap.to(copyright, {
          opacity: 0,
          duration: 0.1,
        })
      },
    })

    const headerHeight = header.clientHeight
    const footerHeight = footerLinks.clientHeight
    gsap.to(header, {
      scrollTrigger: {
        trigger: '#footerLinks',
        start: `${footerHeight - headerHeight} bottom`,
        end: `top top`,
        toggleActions: 'play none none reverse',
        scrub: true,
      },
      ease: 'none',
      yPercent: -100,
    })
  })

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

import './components/blur'
import './components/cases'
import './components/footer'
import './components/hero'
import './components/journey'
import './components/marquee'
import './components/menu'
import './components/praxis'
import './components/twyne/about'
import './components/twyne/conclusion'
import './components/twyne/goal'
import './components/twyne/header'
import './components/twyne/impact'
import './components/twyne/menu'
import './components/twyne/mobile'
import './components/twyne/proposal'
import './components/twyne/screens'
import './components/loading'
