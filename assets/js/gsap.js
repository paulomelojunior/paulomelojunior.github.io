import { gsap } from "gsap"    
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase)

gsap.defaults({
    duration: 1,
    ease: CustomEase.create('custom', '.75,0,0.5,1'),
})

const noise = document.querySelector('#noise')

window.onload = function load() {
    
    document.querySelectorAll('.invisible').forEach((i) => {
        i.classList.remove('invisible')
    })
    
    noise.classList.remove('opacity-0')
    noise.classList.add('opacity-15')

    gsap.from('header', {
        translateY: '-50%',
        opacity: 0
    })

    const heroLetters = document.querySelectorAll('.hero-letters')

    heroLetters.forEach((chars) => {
        const txt = new SplitType(chars, {types: 'chars'})    
        gsap.from(txt.chars, {
            color: window.getComputedStyle(document.querySelector('.text-brand-400\\/80')).color,
            delay: 0,
            opacity: 0,
            yPercent: -200,
            stagger: 0.02
        })
    })
    
    gsap.from('#heroFooter .marquee__content li', {
        opacity: 0,
        yPercent: 200,
        delay: .5,
        stagger: 0.1
    })

    gsap.from('#about > div', {
        delay: .5,
        opacity: 0,
        y: '10%',
    })

    gsap.from('#about > picture', {
        delay: .5,
        opacity: 0,
    })
    
    gsap.from('#about img', {
        delay: .5,
        opacity: 0,
        scale: 1.2,
        filter: 'blur(1rem)',
    })
    
    let mm = gsap.matchMedia();
    
    mm.add("(max-width: 1024px)", () => {

        const mark = document.querySelectorAll('mark')
        
        mark.forEach((char) => {
            const tex = new SplitType(char, {types: 'chars'})
            gsap.from(tex.chars, {
                    scrollTrigger: {
                    trigger: char,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                color: window.getComputedStyle(document.body).color,
                stagger: 0.01,
                duration: .25
            })
        });

        // const btn = document.querySelectorAll('.menu-item')
        // const pic = document.querySelector('picture')
        
        // btn.forEach((x) => {
        //     gsap.to(x, {
        //         scrollTrigger: {
        //             trigger: pic,
        //             start: `-${x.getBoundingClientRect().top} 0%`,
        //             end: `${pic.getBoundingClientRect().bottom - x.getBoundingClientRect().top} ${pic.getBoundingClientRect().top}`,
        //             toggleActions: 'play reverse play reverse',
        //         },
        //         y: '0',
        //         color: `black`,
        //         duration: 0.125
        //     })
        // });
    })

    mm.add("(min-width: 1024px)", () => {
        gsap.from('.job', {
            scrollTrigger: {
                trigger: '.job',
                start: '-50% bottom',
                toggleActions: 'play none none reverse'
            },
            yPercent: 100,
            stagger: .1
        })
    
        gsap.from('.tool', {
            scrollTrigger: {
                trigger: '.tool',
                start: '50% bottom',
                toggleActions: 'play none none reverse'
            },
            yPercent: -100,
            delay: 1,
            stagger: 0.1
        })
        
        gsap.from('#menu > li', {
            scrollTrigger: {
                trigger: menu,
                start: 'top bottom',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
                scrub: true            },
            y: '-25lvh',
            opacity: 0,
            filter: "blur(.125rem)",
            ease: 'none'
        })
    })

}