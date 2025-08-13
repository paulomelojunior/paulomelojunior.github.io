import gsap from 'gsap'
import i18next from '../../../i18n'
import { LitElement, PropertyValues, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import press0 from './assets/press-0.png'
import press2 from './assets/press-2.png'
import press4 from './assets/press-4.png'
import press5 from './assets/press-5.png'
import press6 from './assets/press-6.png'
import press7 from './assets/press-7.png'
import press8 from './assets/press-8.png'
import press9 from './assets/press-9.png'
import press10 from './assets/press-10.png'
import press11 from './assets/press-11.png'
import press12 from './assets/press-12.png'

@customElement('allu-press')
export class AlluPress extends LitElement {
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
            y: '2rem',
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
      <section class="relative">
        <div class="container">
          <div class="carrossel relative overflow-hidden rounded-b-[1rem]">
            <img
              src="${press0}"
              width="1728"
              height="976"
              class="relative rounded-[1rem]"
            />
            <img
              src="${press2}"
              width="1920"
              height="1080"
              class="invisible absolute left-0 top-0 rounded-[1rem]"
            />
            <img
              src="${press4}"
              width="1920"
              height="1080"
              class="invisible absolute left-0 top-0 rounded-[1rem]"
            />
            <img
              src="${press5}"
              width="1920"
              height="1080"
              class="invisible absolute left-0 top-0 rounded-[1rem]"
            />
            <img
              src="${press6}"
              width="1920"
              height="1080"
              class="invisible absolute left-0 top-0 rounded-[1rem]"
            />
            <img
              src="${press7}"
              width="1920"
              height="1080"
              class="invisible absolute left-0 top-0 rounded-[1rem]"
            />
            <img
              src="${press8}"
              width="1920"
              height="1080"
              class="invisible absolute left-0 top-0 rounded-[1rem]"
            />
            <img
              src="${press9}"
              width="1920"
              height="1080"
              class="invisible absolute left-0 top-0 rounded-[1rem]"
            />
            <img
              src="${press10}"
              width="1920"
              height="1080"
              class="invisible absolute left-0 top-0 rounded-[1rem]"
            />
            <img
              src="${press11}"
              width="1920"
              height="1080"
              class="invisible absolute left-0 top-0 rounded-[1rem]"
            />
            <img
              src="${press12}"
              width="1920"
              height="1080"
              class="invisible absolute left-0 top-0 rounded-[1rem]"
            />
          </div>
          <div class="absolute inset-0">
            <div
              class="sticky top-[calc(100dvh-4rem)] translate-y-full isolate flex h-[4rem] items-center justify-center after:absolute after:-inset-px after:z-10 after:rounded-b-[1rem] after:bg-black/50 after:backdrop-blur-md after:content-['']"
            >
              <div class="relative z-20 flex gap-px">
                <button
                  class="flex items-center gap-4 rounded-s-full bg-white/10 py-3 pe-4 ps-5 text-[.75rem] uppercase leading-none tracking-[.05em] text-zinc-200 transition-all hover:bg-zinc-200 hover:text-zinc-950"
                >
                  Prev
                </button>

                <span
                  class="flex items-center justify-center bg-white/5 px-4 font-mono text-[.75rem] font-medium uppercase leading-none tracking-[.05em] text-white/50"
                >
                  ${this.currentIndex + 1} / ${this.screens.length}
                </span>
                <button
                  class="flex items-center gap-4 rounded-e-full bg-white/10 py-3 pe-5 ps-4 text-[.75rem] uppercase leading-none tracking-[.05em] text-zinc-200 transition-all hover:bg-zinc-200 hover:text-zinc-950"
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
