import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(CustomEase, ScrollTrigger)

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
            trigger: '.hero h1',
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
        const footerHeight = document.querySelector('#footerLinks').clientHeight
        gsap.to(header, {
            scrollTrigger: {
                trigger: '#footerLinks',
                start: `${footerHeight - headerHeight} bottom`,
                end: `top top`,
                toggleActions: 'play none none reverse',
                scrub: 0,
            },
            ease: 'none',
            yPercent: -100,
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

    const sign = document.querySelectorAll('#sign');
    
    sign.forEach((i) => {

        const signPath = i.querySelectorAll('path');
        
        gsap.from(signPath, {

        scrollTrigger: {
            trigger: sign,
            start: '100% 100%',
            toggleActions: 'play none none reverse',
            markers: true
        },
        duration: 1,
        stagger: .8,
        opacity: .5,
        drawSVG: false,
        });
    });
}