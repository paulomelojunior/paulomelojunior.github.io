import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import SplitType from 'split-type'

gsap.registerPlugin(CustomEase, DrawSVGPlugin, ScrollTrigger)

gsap.defaults({
    duration: 1,
    ease: CustomEase.create('custom', '.75,0,0.5,1'),
})

window.onload = function load() {
    document.querySelectorAll('.invisible').forEach((i) => {
        i.classList.remove('invisible')
    })

    const navItems = document.querySelectorAll('.menu-item')

    navItems.forEach((item) => {
        const target = item.firstElementChild
        gsap.set(target, {
            clipPath: 'inset(0% 0% 100% 0%)',
        })
    })

    navItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            const target = item.firstElementChild
            gsap.to(target, {
                duration: 0.25,
                clipPath: 'inset(0% 0% 0% 0%)',
            })
        })
        item.addEventListener('mouseleave', () => {
            const target = item.firstElementChild
            gsap.to(target, {
                duration: 0.25,
                clipPath: 'inset(100% 0 0 0)',
                onComplete: () => {
                    gsap.set(target, {
                        clipPath: 'inset(0% 0% 100%)',
                    })
                },
            })
        })
    })

    let mm = gsap.matchMedia()
    
    mm.add('(max-width: 1024px)', () => {

        const header = document.querySelector('header')
        const copyright = document.querySelector('#copy')

        gsap.set(copyright, {
            opacity: 0
        })

        ScrollTrigger.create({
            trigger: '#hero-marquee',
            start: 'top top',
            onLeave: () => {
                header.classList.add('fixed', 'bottom-[env(safe-area-inset-bottom)]')
                header.classList.remove('absolute')
                gsap.to(header, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.25,
                })
                gsap.to(copyright, {
                    opacity: 1
                })
            },
            onEnterBack: () => {
                gsap.to(header, {
                    yPercent: 50,
                    opacity: 0,
                    duration: 0.25,
                    onComplete: () => {
                        header.classList.remove('fixed', 'bottom-[env(safe-area-inset-bottom)]')
                        header.classList.add('absolute')
                        header.removeAttribute('style')
                    },
                })
                gsap.to(copyright, {
                    opacity: 0,
                    duration: 0.2
                })
            },
        })
        
        const headerHeight = document.querySelector('header').clientHeight
        const footerHeight = document.querySelector('footer nav').clientHeight
        gsap.to(header, {
            scrollTrigger: {
                trigger: 'footer nav',
                start: `${footerHeight - headerHeight} bottom`,
                end: `top top`,
                toggleActions: 'play none none reverse',
                scrub: 0,
            },
            ease: 'none',
            yPercent: -100,
        })

        const mark = document.querySelectorAll('mark')

        mark.forEach((char) => {
            const tex = new SplitType(char, { types: 'chars' })
            gsap.from(tex.chars, {
                scrollTrigger: {
                    trigger: char,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                color: window.getComputedStyle(document.body).color,
                stagger: 0.01,
                duration: 0.25,
            })
        })
    })

    mm.add('(min-width: 1024px)', () => {
        gsap.from('#job > *', {
            scrollTrigger: {
                trigger: '.job',
                start: 'top 100%',
                toggleActions: 'play none none reset',
            },
            opacity: 0,
            x: '10rem',
            stagger: 0.1,
        })

        gsap.from('.cases', {
            scrollTrigger: {
                trigger: '#cases',
                start: 'top bottom',
                end: '50% 100%',
                toggleActions: 'play none none reverse',
                scrub: 2,
            },
            ease: 'none',
            stagger: 0.25,
            x: '10rem',
        })

    })

    // const heroLetters = document.querySelectorAll('.hero-letters')

    // heroLetters.forEach((chars) => {
    //     const txt = new SplitType(chars, { types: 'chars' })
    //     gsap.from(txt.chars, {
    //         clipPath: 'inset(100% 100% 0 0)',
    //         xPercent: 100,
    //         stagger: 0.04,
    //     })
    // })

    const praxisPath = document.querySelectorAll('.praxis svg')
    praxisPath.forEach((i) => {
        const p = i.querySelectorAll('path')
        gsap.from(p, {
            scrollTrigger: {
                trigger: i,
                start: '0% 50%',
                toggleActions: 'play none none reverse',
            },
            stagger: 0.1,
            stroke: '#000',
            opacity: 0,
            fill: '#ff6464',
            drawSVG: false,
        })
    })
    
    const praxisItem = document.querySelectorAll('.praxis')
    praxisItem.forEach((i) => {
        gsap.from(i.children, {
            scrollTrigger: {
                trigger: i.children,
                start: '0% 50%',
                toggleActions: 'play none none reverse',
            },
            duration: .8,
            stagger: 0.1,
            x: '5rem',
            filter: 'blur(.5rem)',
            opacity: (i) => (i === 0 ? 1 : 0),
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
        stagger: .1,
        y: '5rem',
    })
}