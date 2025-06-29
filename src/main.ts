// GSAP
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

gsap.defaults({
    duration: 1,
    ease: CustomEase.create('custom', '.75,0,0.5,1'),
})

// Components
import './components/blur';
import './components/cases';
import './components/hero';
import './components/marquee';
import './components/menu';
import './components/praxis';
import { themeStore } from './store/theme';


// Inicializar o store de tema
themeStore.init();