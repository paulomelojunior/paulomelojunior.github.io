import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import p1 from './assets/1.webp'
import s0 from './assets/social-0.webp'
import s1 from './assets/social-1.webp'
import s2 from './assets/social-2.webp'
import s3 from './assets/social-3.webp'
import s4 from './assets/social-4.webp'
import s5 from './assets/social-5.gif'
import s6 from './assets/social-6.webp'
import s7 from './assets/social-7.webp'
import s8 from './assets/social-8.gif'
import s9 from './assets/social-5.webp'

@customElement('projects-multiplayer')
export class ProjectsMultiplayer extends LitElement {
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
    const contentHtml = `
      <p class="text-[.875rem]">
        ${i18next.t('multiplayer.description1')}
      </p>
      <p class="mb-3 text-[.875rem]">
        ${i18next.t('multiplayer.description2')}
      </p>
      <div class="my-3 grid gap-3 border-s border-zinc-800 ps-4">
        <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
          ${i18next.t('multiplayer.metrics.audience.title')}
        </h3>
        <p class="text-[.875rem] leading-none">${i18next.t('multiplayer.metrics.audience.subtitle')}</p>
      </div>
      <div class="my-3 grid gap-3 border-s border-zinc-800 ps-4">
        <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
          ${i18next.t('multiplayer.metrics.facebook.title')}
        </h3>
        <p class="text-[.875rem] leading-none">${i18next.t('multiplayer.metrics.facebook.subtitle')}</p>
      </div>
      <div class="my-3 grid gap-3 border-s border-zinc-800 ps-4">
        <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
          ${i18next.t('multiplayer.metrics.youtube.title')}
        </h3>
        <p class="text-[.875rem] leading-none">${i18next.t('multiplayer.metrics.youtube.subtitle')}</p>
      </div>
    `

    return html`
      <div id="multiplayer" class="grid grid-cols-3 gap-16 py-16">
        <item-header
          title="${i18next.t('multiplayer.title')}"
          tags="${i18next.t('multiplayer.tags')}"
          year="${i18next.t('multiplayer.year')}"
          .contentHtml=${contentHtml}
        ></item-header>
        <div class="col-span-2 grid grid-cols-2 gap-4 *:rounded-[.5rem]">
          <img src="${s0}" loading="lazy" />
          <img src="${s1}" loading="lazy" />
          <img src="${s3}" loading="lazy"/>
          <img src="${s4}" loading="lazy"/>
          <img src="${s8}" loading="lazy"/>
          <img src="${s2}" loading="lazy"/>
          <img src="${s7}" loading="lazy"/>
          <img src="${s9}" loading="lazy"/>
          <img src="${s6}" loading="lazy"/>
          <img src="${s5}" loading="lazy"/>
          <img class="col-span-2" src="${p1}" loading="lazy" />
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
