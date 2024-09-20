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

window.onload = function load() {
    document.querySelectorAll('.invisible').forEach((i) => {
        i.classList.remove('invisible')
    })

    gsap.from('#heroFooter', {
        height: 0
    })
    gsap.from('#heroFooter > *', {
        opacity: 0,
        translateY: '50%',
    })
    gsap.from('#heroTitle > span', {
        height: 0,
    })
    gsap.from('header', {
        translateY: '-50%',
        opacity: 0
    })

    gsap.to('#heroTitle', {
        scrollTrigger: {
            trigger: '#heroTitle',
            start: 'center center',
            end: 'center -25%',
            scrub: true
        },
        filter: "blur(.125rem)",
        yPercent: 50,
        opacity: 0,
        ease: 'none'
    })

    const split = document.querySelectorAll('.split-chars')

    split.forEach((chars) => {
        const txt = new SplitType(chars, {types: 'chars, words'})
        gsap.to(txt.chars, {
            scrollTrigger: {
                trigger: '#who',
                start: '50% bottom',
                toggleActions: 'play none none reverse',
                scrub: true,
            },
            color: '#fff',
            stagger: 0.01
        })
    });

    let mm = gsap.matchMedia();
    mm.add()

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