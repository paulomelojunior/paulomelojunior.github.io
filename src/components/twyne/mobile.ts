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
import mask from './imgs/mask.png'

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

  private setupMobileAnimation(): void {
    const mobileImages = this.querySelectorAll('.mobile-screen')
    if (!mobileImages.length) return

    gsap.from(mobileImages, {
      scrollTrigger: {
        trigger: mobileImages,
        toggleActions: 'play none none reverse',
        start: 'top 80%',
        end: 'center 80%',
      },
      stagger: 0.05,
      x: '5rem',
    })
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.setupMobileAnimation()
  }

  render() {
    return html`
      <section id="mobile" class="mt-32 py-32">
        <h2
          class="mb-32 text-center text-[2.5rem] leading-none tracking-[-.04em] 2xl:text-[3rem] dark:text-zinc-200"
        >
          ${unsafeHTML(i18next.t('twyne.mobile.t1'))}
        </h2>
        <div
          id="mobile-images"
          class="flex items-center justify-center gap-4 overflow-hidden"
        >
          <img src="${e2}" class="mobile-screen" />
          <img src="${e1}" class="mobile-screen" />
          <img src="${e3}" class="mobile-screen" />
          <img src="${e4}" class="mobile-screen" />
          <img src="${e5}" class="mobile-screen" />
        </div>
      </section>
      <style>
        .mobile-screen {
          mask-image: url('${mask}');
          mask-mode: luminance;
        }
      </style>
    `
  }

  createRenderRoot() {
    return this
  }
}
