import './allugator'
import './header'
import './ifficient'
import './item'
import './menu'
import './multiplayer'
import './screens'

import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ThemeMixin } from '../../store/theme'

@customElement('archive-index')
export class ArchiveTimeline extends ThemeMixin(LitElement) {
  render() {
    return html`
      <section class="container pt-12">
        <archive-header></archive-header>
        <div class="px-5">
          <arch-ifficient></arch-ifficient>
          <div
            class="my-16 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
          <arch-allugator></arch-allugator>
          <div
            class="my-16 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
          <arch-multiplayer></arch-multiplayer>
          <div
            class="mt-16 mb-32 h-px w-full bg-gradient-to-r bg-transparent"
          ></div>
          <cases-section></cases-section>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
