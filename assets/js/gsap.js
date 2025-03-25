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

const btn = document.querySelectorAll('.button')
const pic = document.querySelector('picture')
const noise = document.querySelector('#noise')
window.onload = function load() {
    
    document.querySelectorAll('.invisible').forEach((i) => {
        i.classList.remove('invisible')
    })
    
    noise.classList.remove('opacity-0')
    noise.classList.add('opacity-20')

    gsap.from('header', {
        translateY: '-50%',
        opacity: 0
    })

    btn.forEach((x) => {
        gsap.to(x, {
            scrollTrigger: {
                trigger: pic,
                start: `-${x.getBoundingClientRect().top} 0%`,
                end: `${pic.getBoundingClientRect().bottom - x.getBoundingClientRect().top} ${pic.getBoundingClientRect().top}`,
                toggleActions: 'play reverse play reverse',
            },
            y: '0',
            color: `black`,
            duration: 0.125
        })
    });

    const heroLetters = document.querySelectorAll('.hero-letters')

    heroLetters.forEach((chars) => {
        const txt = new SplitType(chars, {types: 'chars'})    
        gsap.from(txt.chars, {
            y: '200%',
            opacity: 0,
            delay: .5,
            stagger: 0.02
        })
    })


    gsap.from('#heroFooter', {
        height: 0,
        delay: 1
    })

    gsap.from('#heroFooter > *', {
        opacity: 0,
        translateY: '100%',
        delay: 1.5
    })

    gsap.from('picture', {
        opacity: 0,
        yPercent: 20,
        filter: "blur(.25rem)",
        delay: 1
    })

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

    let mm = gsap.matchMedia();
    mm.add()

    mm.add("(min-width: 1024px)", () => {
    
        gsap.to('#heroTitle', {
            scrollTrigger: {
                trigger: '#heroTitle',
                start: 'center center',
                end: 'center -25%',
                scrub: true
            },
            filter: "blur(.125rem)",
            yPercent: 100,
            opacity: 0,
            ease: 'none'
        })    

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
            stagger: .1
        })
    })

    gsap.from('#menu', {
        scrollTrigger: {
            trigger: '#menu',
            start: 'top bottom',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
            scrub: true
        },
        y: '-10dvh',
        opacity: 0,
        filter: "blur(.125rem)",
        ease: 'none'
    })
}