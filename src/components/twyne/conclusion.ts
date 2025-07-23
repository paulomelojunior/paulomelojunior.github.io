import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import i18next from '../../i18n'
import { LitElement, PropertyValues, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

gsap.registerPlugin(ScrollTrigger)

@customElement('twyne-conclusion')
export class TwyneConclusion extends LitElement {
  @property({ type: String }) lang = i18next.language

  private signElement?: SVGElement
  private animation?: gsap.core.Tween

  connectedCallback() {
    super.connectedCallback()
    i18next.on('languageChanged', this.handleLanguageChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    i18next.off('languageChanged', this.handleLanguageChange)
    this.cleanupAnimation()
  }

  private handleLanguageChange = () => {
    this.lang = i18next.language
  }

  private setupSignatureAnimation(): void {
    if (!this.signElement) return

    const signPaths = this.signElement.querySelectorAll('path')

    this.animation = gsap.from(signPaths, {
      scrollTrigger: {
        trigger: this.signElement,
        start: '100% 100%',
        toggleActions: 'play none none reverse',
      },
      duration: 1,
      stagger: 0.75,
      delay: 0.5,
      drawSVG: false,
    })
  }

  private cleanupAnimation(): void {
    if (this.animation) {
      this.animation.kill()
      this.animation = undefined
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.signElement = this.querySelector('#sign') as SVGElement
    this.setupSignatureAnimation()
  }

  private renderSignature(): unknown {
    return html`
      <svg
        id="sign"
        class="absolute bottom-2 rotate-[21deg] stroke-brand-400"
        width="44"
        height="67"
        viewBox="0 0 44 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.622 26.2432C21.3514 21.7806 26.8467 14.2637 26.8467 14.2637L24.3142 20.9771C22.2556 25.7528 20.6914 30.708 18.6864 35.4888C16.8732 39.8121 13.9681 45.3093 12.0938 48.2719C10.2195 51.2345 5.20238 56.9493 4.7375 53.4575C4.51176 51.7619 5.98672 46.8824 8.83354 42.6494C11.6804 38.4164 18.3776 29.4011 24.7806 25.0562C32.0957 20.0925 40.026 12.6061 40.6384 8.03106C42.2438 -3.96201 21.0414 0.396133 1.82617 23.5558"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.0068 65.5502C25.5655 61.1839 21.8028 42.839 27.25 23.3022C28.2281 19.7942 29.5032 16.2477 31.2288 12.7368C30.2319 15.3528 27.6369 24.4559 30.9257 27.8938C34.2144 31.3317 40.2681 27.7068 42.8838 25.4646"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `
  }

  private renderContent(): unknown {
    return html`
      <h2
        class="mb-4 font-semibold uppercase leading-none tracking-[0.05em] xl:text-[0.75rem] dark:text-zinc-500"
      >
        ${i18next.t('twyne.conclusion.t1')}
      </h2>
      <p>${i18next.t('twyne.conclusion.p1')}</p>
      <p>${i18next.t('twyne.conclusion.p2')}</p>
      <p>${i18next.t('twyne.conclusion.p3')}</p>
    `
  }

  render() {
    return html`
      <section>
        <div class="container grid grid-cols-4 py-32">
          <div
            class="relative col-span-2 col-start-2 flex aspect-square flex-col items-center justify-center gap-8 text-balance text-center text-[1.25rem] leading-loose text-zinc-300 2xl:text-[1.5rem]"
          >
            ${this.renderContent()} ${this.renderSignature()}
          </div>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
