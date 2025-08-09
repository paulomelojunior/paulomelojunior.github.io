import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { gsap } from 'gsap'
import spin from './spin.svg?raw'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

@customElement('mobile-loading')
export class MobileLoading extends LitElement {
  @property({ type: Number, attribute: 'min-ms' }) minMs = 500

  private mountedAt = 0
  private finishTimeoutId: number | null = null
  private fallbackTimeoutId: number | null = null
  private isExiting = false

  private onWindowLoad = () => this.finishAfterMinTime()

  connectedCallback(): void {
    super.connectedCallback()
    this.setAttribute('aria-busy', 'true')
    this.setAttribute('aria-live', 'polite')
    this.mountedAt = performance.now()

    if (document.readyState === 'complete') {
      this.finishAfterMinTime()
    } else {
      window.addEventListener('load', this.onWindowLoad, { once: true })
      // Fallback caso 'load' demore muito
      this.fallbackTimeoutId = window.setTimeout(
        () => this.finishAfterMinTime(),
        8000
      )
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    window.removeEventListener('load', this.onWindowLoad)
    if (this.finishTimeoutId) {
      clearTimeout(this.finishTimeoutId)
      this.finishTimeoutId = null
    }
    if (this.fallbackTimeoutId) {
      clearTimeout(this.fallbackTimeoutId)
      this.fallbackTimeoutId = null
    }
  }

  private finishAfterMinTime(): void {
    const elapsed = performance.now() - this.mountedAt
    const remaining = Math.max(0, this.minMs - elapsed)
    this.finishTimeoutId = window.setTimeout(() => this.exit(), remaining)
  }

  public exit(): void {
    if (this.isExiting) return
    this.isExiting = true
    if (this.finishTimeoutId) {
      clearTimeout(this.finishTimeoutId)
      this.finishTimeoutId = null
    }
    if (this.fallbackTimeoutId) {
      clearTimeout(this.fallbackTimeoutId)
      this.fallbackTimeoutId = null
    }
    const overlay = (this.querySelector('#loading') as HTMLElement) || this
    const mainContent = document.querySelector('main') as HTMLElement
    gsap.set(mainContent, { y: '5rem', opacity: 0 })
    gsap.to(overlay, {
      opacity: 0,
      y: 20,
      duration: 0.25,
      force3D: true,
      onComplete: () => {
        this.dispatchEvent(
          new CustomEvent('mobile-loading:done', {
            bubbles: true,
            composed: true,
          })
        )
        gsap.to(mainContent, {
          y: 0,
          opacity: 1,
          duration: 1,
          onComplete: () => {
            mainContent.removeAttribute('style')
          }
        })
        this.remove()
      },
    })
  }

  render() {
    return html` <div
      id="loading"
      class="fixed top-0 z-[100] h-svh w-full bg-black"
    >
      <div
        class="container mx-5 mt-auto flex h-full items-end gap-4 pb-32 xl:mx-auto"
      >
        <span class="size-10 fill-brand-400"> ${unsafeHTML(`${spin}`)} </span>
        <span
          class="animate-pulse text-[.75rem] uppercase leading-10 tracking-[.05em] text-white"
        >
          ${this.lang === 'pt' ? html`Carregando...` : html`Loading...`}
        </span>
      </div>
    </div>`
  }

  createRenderRoot() {
    return this
  }
}
