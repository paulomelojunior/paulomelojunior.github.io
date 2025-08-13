import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import p1 from './assets/1.png'
import s0 from './assets/social-0.png'
import s1 from './assets/social-1.png'
import s2 from './assets/social-2.png'
import s3 from './assets/social-3.png'
import s4 from './assets/social-4.png'
import s5 from './assets/social-5.gif'
import s6 from './assets/social-6.png'
import s7 from './assets/social-7.png'
import s8 from './assets/social-8.gif'
import s9 from './assets/social-9.png'

@customElement('arch-multiplayer')
export class ArchMultiplayer extends LitElement {
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

  render() {
    return html`
      <div id="multiplayer" class="grid grid-cols-3 gap-16 py-16">
        <item-header
          title="Orquestra Multiplayer"
          tags="Voluntário, Produção, Visual Design"
          year="2017"
        >
          <p class="text-[.875rem]">
            Criada por ex-alunos da Escola de Música da UFMG, a Multiplayer
            explorava trilhas sonoras de séries, filmes e jogos em seu repertório,
            ligando música erudita à cultura pop.
          </p>
          <p class="mb-3 text-[.875rem]">
            Fui convidado a integrar o projeto como designer, cuidando da
            comunicação visual e prestando suporte na produção dos eventos.
          </p>
          <div class="my-3 grid gap-3 border-s border-zinc-800 ps-4">
            <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
              + 1600 pessoas em 2 apresentações
            </h3>
            <p class="text-[.875rem] leading-none">Luzes, Câmera, Multiplayer!  @ Cine Theatro Brasil</p>
          </div>
          <div class="my-3 grid gap-3 border-s border-zinc-800 ps-4">
            <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
              4,7 mil seguidores
            </h3>
            <p class="text-[.875rem] leading-none">Facebook</p>
          </div>
          <div class="my-3 grid gap-3 border-s border-zinc-800 ps-4">
            <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
              2,1 mil inscritos
            </h3>
            <p class="text-[.875rem] leading-none">YouTube</p>
          </div>
        </item-header>
        <div class="col-span-2 grid grid-cols-2 gap-4 *:rounded-[.5rem]">
          <img src="${s0}"/>
          <img src="${s1}"/>
          <img src="${s4}"/>
          <img src="${s3}"/>
          <img src="${s8}"/>
          <img src="${s2}"/>
          <img src="${s9}"/>
          <img src="${s7}"/>
          <img src="${s6}"/>
          <img src="${s5}"/>
          <img class="col-span-2" src="${p1}" />
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
