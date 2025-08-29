import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import Lenis from 'lenis'
import p0 from './assets/homepage-0.webp'
import p1 from './assets/homepage-1.webp'
import p2 from './assets/homepage-2.webp'
import p3 from './assets/homepage-3.webp'
import p4 from './assets/homepage-4.webp'
import p5 from './assets/homepage-5.webp'
import p6 from './assets/homepage-6.webp'
import p7 from './assets/homepage-7.webp'
import p8 from './assets/homepage-8.webp'

@customElement('img-zoom')
export class ImgZoom extends LitElement {
  @property({ type: String }) src = ''

  private overlayLenis?: Lenis
  private overlayRafId = 0

  connectedCallback(): void {
    super.connectedCallback()
    // Pausa o lenis global enquanto o overlay está ativo
    window.lenis?.stop()
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', this.onKeydown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    if (this.overlayRafId) cancelAnimationFrame(this.overlayRafId)
    this.overlayRafId = 0
    this.overlayLenis?.destroy?.()
    this.overlayLenis = undefined
    window.lenis?.start()
    document.body.style.overflow = ''
    document.removeEventListener('keydown', this.onKeydown)
  }

  private onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.close()
  }

  private onBackdropClick = (e: MouseEvent) => {
    if (e.target === this.querySelector('.zoom-overlay')) this.close()
  }

  private close = () => {
    this.remove()
  }

  firstUpdated(): void {
    const wrapper = this.querySelector<HTMLElement>('.zoom-overlay')
    const content = this.querySelector<HTMLElement>('.zoom-content')
    if (!wrapper || !content) return

    this.overlayLenis = new Lenis({ wrapper, content })

    const raf = (time: number) => {
      this.overlayLenis?.raf(time)
      this.overlayRafId = requestAnimationFrame(raf)
    }
    this.overlayRafId = requestAnimationFrame(raf)

    wrapper.addEventListener('click', this.onBackdropClick)
  }

  render() {
    const escClasses =
      'fixed right-5 leading-none top-5 z-60 flex transition-all ps-3 pe-1 xl:pe-1.5 gap-1 h-8 rounded-full items-center hover:bg-zinc-100 hover:text-zinc-950 hover:font-semibold text-zinc-100'
    return html`
      <button class="${escClasses}" @click=${this.close}>
        Esc
        <svg
          class="size-5 stroke-zinc-100"
          stroke-width="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
      <div
        class="zoom-overlay fixed inset-0 z-50 overflow-auto overscroll-contain bg-zinc-50/20 backdrop-blur backdrop-brightness-50"
      >
        <div class="zoom-content container max-w-[1280px] my-24">
          <picture>
            <img src="${p0}" width="1920" height="1136" type="image/webp" class="rounded-t-[.5rem]" />
            <img src="${p1}" width="1920" height="800" loading="lazy" type="image/webp" />
            <img src="${p2}" width="1920" height="800" loading="lazy" type="image/webp" />
            <img src="${p3}" width="1920" height="800" loading="lazy" type="image/webp" />
            <img src="${p4}" width="1920" height="800" loading="lazy" type="image/webp" />
            <img src="${p5}" width="1920" height="800" loading="lazy" type="image/webp" />
            <img src="${p6}" width="1920" height="800" loading="lazy" type="image/webp" />
            <img src="${p7}" width="1920" height="800" loading="lazy" type="image/webp" />
            <img src="${p8}" width="1920" height="236" loading="lazy" type="image/webp" class="rounded-b-[.5rem]" />
          </picture>
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
