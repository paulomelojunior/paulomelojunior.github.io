import gsap from 'gsap'
import i18next from '../../i18n'
import { LitElement, PropertyValues, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import d0 from '../twyne/imgs/d0.png'
import d2 from '../twyne/imgs/d2.png'
import d3 from '../twyne/imgs/d3.png'

@customElement('twyne-screens')
export class TwyneScreens extends LitElement {
  @property({ type: String }) lang = i18next.language
  @property({ type: Number }) currentIndex: number = 0
  @property({ type: Array }) screens: NodeListOf<HTMLImageElement> =
    [] as unknown as NodeListOf<HTMLImageElement>
  @property({ type: Function }) updateScreens: () => void = () => {}

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

  protected firstUpdated(_changedProperties: PropertyValues): void {
    const screens = document.querySelectorAll('.carrossel img')
    // Definindo o índice atual da imagem
    this.currentIndex = 0
    // Faz o cast do NodeList para NodeListOf<HTMLImageElement> de forma segura
    this.screens = screens as NodeListOf<HTMLImageElement>

    // Função para atualizar a exibição das imagens
    this.updateScreens = () => {
      this.screens.forEach((img, idx) => {
        if (idx === this.currentIndex) {
          gsap.to(img, {
            opacity: 1,
            duration: 0.4,
            y: 0,
            delay: 0.2,
            onStart: () => img.classList.remove('invisible'),
          })
        } else {
          gsap.to(img, {
            opacity: 0,
            duration: 0.4,
            y: 100,
            onComplete: () => img.classList.add('invisible'),
          })
        }
      })
    }

    // Inicializa a exibição correta
    this.updateScreens()

    // Seleciona os botões Prev e Next
    const prevBtn = this.renderRoot.querySelector('button:first-of-type')
    const nextBtn = this.renderRoot.querySelector('button:last-of-type')

    // Adiciona os listeners para navegação infinita
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        this.currentIndex =
          (this.currentIndex - 1 + this.screens.length) % this.screens.length
        this.updateScreens()
      })

      nextBtn.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex + 1) % this.screens.length
        this.updateScreens()
      })
    }
  }

  render() {
    return html`
      <section class="relative mt-32">
        <div class="container">
          <div class="carrossel relative overflow-hidden">
            <img
              src="${d0}"
              width="1728"
              height="976"
              class="relative rounded-[.5rem]"
            />
            <img
              src="${d2}"
              width="1728"
              height="976"
              class="invisible absolute left-0 top-0 rounded-[.5rem]"
            />
            <img
              src="${d3}"
              width="1728"
              height="976"
              class="invisible absolute left-0 top-0 rounded-[.5rem]"
            />
          </div>
          <div class="absolute inset-0">
            <div
              class="sticky -inset-x-4 top-[calc(100dvh-10rem)] isolate flex h-[10rem] items-end justify-center after:absolute after:inset-0 after:z-10 after:bg-gradient-to-t after:from-black after:content-['']"
            >
              <progressive-blur></progressive-blur>
              <div class="relative z-20 flex gap-px pb-2">
                <button
                  class="flex items-center gap-4 rounded-s-full bg-zinc-200/10 py-3 pe-4 ps-5 text-[.75rem] uppercase leading-none tracking-[.05em] text-zinc-200 transition-all hover:bg-zinc-200 hover:text-zinc-950"
                >
                  Prev
                </button>

                <span
                  class="flex items-center justify-center bg-white/5 px-4 font-mono text-[.75rem] font-medium uppercase leading-none tracking-[.05em]"
                >
                  ${this.currentIndex + 1} / ${this.screens.length}
                </span>
                <button
                  class="flex items-center gap-4 rounded-e-full bg-zinc-200/10 py-3 pe-5 ps-4 text-[.75rem] uppercase leading-none tracking-[.05em] text-zinc-200 transition-all hover:bg-zinc-200 hover:text-zinc-950"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
