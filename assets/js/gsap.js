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
    let mm = gsap.matchMedia();
    mm.add()
    document.querySelectorAll('body > *').forEach((i) => {i.classList.remove('invisible')});
    gsap.set('#heroFooter', { yPercent: 200, y: '2.5rem' })
    gsap.set('.hero h1', { y: '100%', opacity: 0 })
    gsap.to('#heroFooter', { yPercent: 0,   y: 0 })
    gsap.to('.hero h1', { y: '0%', opacity: 1 })
    

    mm.add("(min-width: 1024px)", () => {
        gsap.from('.job', {
            scrollTrigger: {
                trigger: '.job',
                start: '-50% bottom',
                toggleActions: 'play none none reverse'
            },
            yPercent: 100,
            stagger: .1
        });
    
        gsap.from('.tool', {
            scrollTrigger: {
                trigger: '.tool',
                start: '50% bottom',
                toggleActions: 'play none none reverse'
            },
            yPercent: -100,
            stagger: .1
        })
    
        gsap.from('#menu li', {
            scrollTrigger: {
                trigger: '#menu',
                start: '50% bottom',
                toggleActions: 'play none none reverse',
            },
            yPercent: -100,
            opacity: 0,
            stagger: .1
        })
    })


    const split = document.querySelectorAll('#who .split-chars')
    
    split.forEach((chars, i) => {
        const txt = new SplitType(chars, {types: 'chars, words'})
    
        gsap.to(txt.chars, {
            scrollTrigger: {
                trigger: '#who',
                start: '50% bottom',
                toggleActions: 'play none none reverse'
            },
            scrub: true,
            color: '#fff',
            stagger: 0.01
        })
    });
}

