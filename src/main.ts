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

import './components/blur';
import './components/cases';
import './components/twyne/menu';
import './components/footer';
import './components/hero';
import './components/journey';
import './components/marquee';
import './components/menu';
import './components/praxis';
import './components/twyne/header';
import './components/twyne/about';
import './components/twyne/goal';
import './components/twyne/proposal';
import './components/twyne/impact';
import './components/twyne/mobile';
import './components/twyne/conclusion';
import { themeStore } from './store/theme';

themeStore.init();