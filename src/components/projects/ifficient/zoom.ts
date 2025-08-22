import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import Lenis from 'lenis'
import p1 from './assets/homepage.webp'

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
      'fixed right-5 leading-none top-5 z-[60] flex transition-all ps-3 pe-1 xl:pe-1.5 gap-1 h-8 rounded-full items-center hover:bg-zinc-200 hover:text-zinc-950 hover:font-semibold text-zinc-200'
    return html`
      <button class="${escClasses}" @click=${this.close}>
        Esc
        <svg
          class="size-5 stroke-zinc-200"
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
        class="zoom-overlay fixed inset-0 z-50 overflow-auto overscroll-contain bg-white/10 backdrop-blur-sm"
      >
        <div class="zoom-content container max-w-[1280px] my-24">
          <img src="${p1}" class="h-auto rounded-[.75rem]" loading="lazy" />
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
