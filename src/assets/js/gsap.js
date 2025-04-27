import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { transform } from 'typescript'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase)

gsap.defaults({
    duration: 1,
    ease: CustomEase.create('custom', '.75,0,0.5,1'),
})

const noise = document.querySelector('#noise')
const header = document.querySelector('header')

window.onload = function load() {
    document.querySelectorAll('.invisible').forEach((i) => {
        i.classList.remove('invisible')
    })

    ScrollTrigger.create({
        trigger: '#logo',
        start: 'top top',
        end: 'bottom top',
        onEnter: () => {
            document.querySelector('#logo').classList.add('fixed')
        },
        onLeaveBack: () => {
            document.querySelector('#logo').classList.remove('fixed')
        },
    })

    function toggleHeaderState(addClasses, removeClasses, animationProps) {
        header.classList.add(...addClasses);
        header.classList.remove(...removeClasses);
        gsap.from(header, animationProps);
    }

    ScrollTrigger.create({
        trigger: '#logo',
        start: 'top top',
        onLeave: () => {
            toggleHeaderState(
                ['fixed', 'bottom-0'],
                ['absolute'],
                { yPercent: 50, opacity: 0, duration: 0.25 }
            );
        },
        onEnterBack: () => {
            gsap.to(header, {
                yPercent: 50,
                opacity: 0,
                duration: .25,
                onComplete: () => {
                    header.classList.remove('fixed', 'bottom-0');
                    header.classList.add('absolute');
                    header.removeAttribute('style');
                },
            });
        },
    })

    document.querySelectorAll('.menu-item').forEach((item) => {
        item.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            gsap.to(target, {
            });
        });
        item.addEventListener('mouseleave', (e) => {
            const target = e.currentTarget;
            gsap.to(target, {
            });
        });
    });

    noise.classList.remove('opacity-0')
    noise.classList.add('opacity-30')

    gsap.from('header', {
        translateY: '-50%',
        opacity: 0,
    })

    const heroLetters = document.querySelectorAll('.hero-letters')

    heroLetters.forEach((chars) => {
        const txt = new SplitType(chars, { types: 'chars' })
        gsap.from(txt.chars, {
            color: window.getComputedStyle(
                document.querySelector('.text-brand-400')
            ).color,
            clipPath: 'inset(100% 100% 0 0)',
            xPercent: 100,
            stagger: 0.04,
        })
    })

    gsap.from('#heroFooter .marquee__content li', {
        opacity: 0,
        yPercent: 200,
        delay: 0.5,
        stagger: 0.1,
    })

    gsap.from('#about > div', {
        opacity: 0,
        y: '10%',
    })

    gsap.from('#about > picture', {
        opacity: 0,
    })

    gsap.from('#about img', {
        opacity: 0,
        scale: 1.2,
        filter: 'blur(1rem)',
    })

    let mm = gsap.matchMedia()

    mm.add('(max-width: 1024px)', () => {
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
        gsap.from('.job', {
            scrollTrigger: {
                trigger: '.job',
                start: '-50% bottom',
                toggleActions: 'play none none reverse',
            },
            yPercent: 100,
            stagger: 0.1,
        })

        gsap.from('.tool', {
            scrollTrigger: {
                trigger: '.tool',
                start: '50% bottom',
                toggleActions: 'play none none reverse',
            },
            yPercent: -100,
            delay: 1,
            stagger: 0.1,
        })

        gsap.from('#menu > li', {
            scrollTrigger: {
                trigger: menu,
                start: 'top bottom',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
                scrub: true,
            },
            y: '-25lvh',
            opacity: 0,
            filter: 'blur(.125rem)',
            ease: 'none',
        })
    })
}
