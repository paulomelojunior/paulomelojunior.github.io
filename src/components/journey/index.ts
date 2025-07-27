import i18next from '../../i18n'
import { LitElement, PropertyValues, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './styles.scss'
import { ThemeMixin } from '../../store/theme'

interface JourneyItem {
  hide: boolean
  start: string
  end: string
  title: string
  description: string
  custom?: string
  more?: string
}

@customElement('journey-section')
export class JourneySection extends ThemeMixin(LitElement) {
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
    this.updateJourneyContent()
  }

  private updateJourneyContent() {
    const journeyElement = document.querySelector('#job') as HTMLElement

    if (!journeyElement) {
      return
    }

    // Limpa o conteúdo existente
    journeyElement.innerHTML = ''

    // Recria o conteúdo com o novo idioma
    const journeyItems = this.getJourneyItems()
    const journeyValues = Object.values(journeyItems)

    journeyValues.forEach((item) => {
      const journeyItemHTML = this.createJourneyItemHTML(item)
      journeyElement.insertAdjacentHTML('beforeend', journeyItemHTML)
    })
  }

  private getJourneyItems(): Record<string, JourneyItem> {
    return {
      1: {
        hide: true,
        start: '2015',
        end: '2016',
        title: i18next.t('journey.t1'),
        description: i18next.t('journey.p1'),
        custom: undefined,
        more: undefined,
      },
      2: {
        hide: false,
        start: '2016',
        end: '2018',
        title: i18next.t('journey.t2'),
        description: i18next.t('journey.p2'),
        more: i18next.t('journey.m2'),
        custom: undefined,
      },
      3: {
        hide: false,
        start: '2018',
        end: '2019',
        title: i18next.t('journey.t3'),
        description: i18next.t('journey.p3'),
        more: i18next.t('journey.m3'),
        custom: undefined,
      },
      4: {
        hide: false,
        custom: 'text-brand-400',
        start: '2019',
        end: '2025',
        title: i18next.t('journey.t4'),
        description: i18next.t('journey.p4'),
        more: undefined,
      },
    }
  }

  private createJourneyItemHTML(item: JourneyItem): string {
    const hideClass = item.hide ? 'hidden xl:flex' : 'flex'
    const customClass = item.custom ? ` class="${item.custom}"` : ''

    return `
      <div class="${hideClass} job relative justify-between flex-col gap-6 px-10 xl:px-20 2xl:px-32 xl:rounded-[2rem]">
        <span class="font-mono text-sm text-zinc-500">
          ${item.start} &bull; <span${customClass}>${item.end}</span>
        </span>
        <h2 class="text-[1.5rem] 2xl:text-[2rem] xl:leading-none dark:text-zinc-200 text-stone-900">
          ${item.title}
        </h2>
        <p class="leading-loose text-pretty">
          ${item.description}
        </p>
      </div>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    const journeyElement = this.querySelector('#job') as HTMLElement
    const journeyItems = this.getJourneyItems()
    const journeyValues = Object.values(journeyItems)

    journeyValues.forEach((item) => {
      const journeyItemHTML = this.createJourneyItemHTML(item)
      journeyElement.insertAdjacentHTML('beforeend', journeyItemHTML)
    })
  }

  render() {
    return html`
      <section id="section-journey">
        <div
          class="bg-[linear-gradient(theme('colors.stone.100'),theme('colors.stone.200')_40%)] xl:py-24 2xl:py-32 dark:bg-[linear-gradient(theme('colors.black'),theme('colors.zinc.950')_100%)]"
        >
          <div
            id="job"
            class="container grid gap-y-16 overflow-hidden py-16 xl:grid-cols-2 xl:gap-y-32 xl:py-24 2xl:py-32"
          ></div>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
