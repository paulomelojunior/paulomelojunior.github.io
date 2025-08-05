import { gsap } from 'gsap'
import i18next from '../../i18n'
import { LitElement, PropertyValues, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import e1 from './imgs/e1.png'
import e2 from './imgs/e2.png'
import e3 from './imgs/e3.png'
import e4 from './imgs/e4.png'
import e5 from './imgs/e5.png'

@customElement('twyne-mobile')
export class TwyneMobile extends LitElement {
  @property({ type: String }) lang = i18next.language

  connectedCallback() {
    super.connectedCallback()
    i18next.on('languageChanged', this.handleLanguageChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    i18next.off('languageChanged', this.handleLanguageChange)
  }

  private handleLanguageChange = () => {
    this.lang = i18next.language
  }

  // private setupMobileAnimation(): void {
  //   const mobileImages = this.querySelectorAll('.mobile-screen')
  //   if (!mobileImages.length) return

  //   gsap.from(mobileImages, {
  //     scrollTrigger: {
  //       trigger: mobileImages,
  //       toggleActions: 'play none none reverse',
  //       start: 'top 80%',
  //       end: 'center 80%',
  //     },
  //     stagger: 0.05,
  //     x: '5rem',
  //   })
  // }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    document.querySelectorAll('[data-parallax-screens]').forEach((triggerElement) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#mobile-images',
          start: "0% 100%",
          end: "70% 100%",
          scrub: 2
        }
      });
      const layers = [
        { layer: "1", y: '10%', opacity: 0 },
        { layer: "2", y: '20%', opacity: .5, },
        { layer: "3", y: '30%', opacity: 1, },
      ];
      layers.forEach((layerObj, idx) => {
        tl.from(
          triggerElement.querySelectorAll(`[data-parallax-screens="${layerObj.layer}"]`),
          {
            y: layerObj.y,
            ease: "none",
            opacity: layerObj.opacity,
            filter: "blur(1rem)",
          },
          idx === 0 ? undefined : "<"
        );
      });
    });
  }

  render() {
    return html`
      <section id="mobile" class="mt-32 py-32">
        <h2
          class="mb-32 text-center text-[2.5rem] font-light leading-none tracking-[-.02em] 2xl:text-[3rem] dark:text-zinc-200"
        >
          ${unsafeHTML(i18next.t('twyne.mobile.t1'))}
        </h2>
        <div
          id="mobile-images"
          class="grid max-w-[1920px] mx-auto grid-cols-5 items-center justify-center gap-4 px-4"
          data-parallax-screens
        >
          <img src="${e2}" data-parallax-screens="1" class="mobile-screen" />
          <img src="${e1}" data-parallax-screens="2" class="mobile-screen" />
          <img src="${e3}" data-parallax-screens="3" class="mobile-screen" />
          <img src="${e4}" data-parallax-screens="2" class="mobile-screen" />
          <img src="${e5}" data-parallax-screens="1" class="mobile-screen" />
        </div>
      </section>
      <style>
        .mobile-screen {
          border-radius: 3rem;
        }
      </style>
    `
  }

  createRenderRoot() {
    return this
  }
}
