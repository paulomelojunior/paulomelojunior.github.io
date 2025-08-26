import './i18n'
import './lenis'
import './gsap'
import './components/projects'
import './components/projects/fail'
import './components/blur'
import './components/cases'
import './components/footer'
import './components/hero'
import './components/journey'
import './components/marquee'
import './components/menu'
import './components/praxis'
import './components/twyne'
import './components/loading'
import './seo'
import { initLazyLoading, injectLazyLoadCSS } from './utils/lazyload'

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  // Inject lazy loading CSS
  injectLazyLoadCSS()
  
  // Initialize lazy loading
  initLazyLoading()
})

// Additional performance optimizations
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload next page resources during idle time
    const prefetchLinks = document.querySelectorAll('link[rel="prefetch"]')
    prefetchLinks.forEach(link => {
      const href = link.getAttribute('href')
      if (href) {
        fetch(href, { mode: 'no-cors' }).catch(() => {
          // Ignore fetch errors for prefetching
        })
      }
    })
  })
}
