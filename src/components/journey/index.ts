import { customElement, property } from 'lit/decorators.js'
import { html } from 'lit'
import { I18nElement } from '../../base/i18n-element'

@customElement('journey-section')
export class JourneySection extends I18nElement {
  @property({ type: Object }) items: Record<string, any> = {}

  constructor() {
    super()
    const journeyData = this.t('journey', { returnObjects: true })
    this.items = typeof journeyData === 'object' ? journeyData as Record<string, any> : {}
  }

  private renderJobItem(item: any) {
    return html`
      <div class="job ${item.custom || ''} flex flex-col gap-6 px-6 py-12 sm:px-0">
        <div class="flex flex-col gap-3">
          <span class="text-sm font-semibold md:text-sm">${item.end}</span>
          <h3 class="text-2xl font-medium text-zinc-200 whitespace-pre-line">${item.title}</h3>
        </div>
        <p class="text-pretty font-medium leading-loose">${item.description}</p>
      </div>
    `
  }

  render() {
    return html`
      <section class="relative flex items-center bg-zinc-950 sm:p-5 lg:p-10">
        <div id="job" class="absolute -top-20 sm:-top-28"></div>
        <div id="journey" class="container grid overflow-hidden sm:grid-cols-3 sm:gap-24">
          ${Object.values(this.items).map(this.renderJobItem)}
        </div>
      </section>
    `
  }
}
