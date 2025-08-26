import './allugator'
import './damus'
import './header'
import './ifficient'
import './item'
import './menu'
import './multiplayer'
import './screens'
import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ThemeMixin } from '../../store/theme'

@customElement('projects-index')
export class ProjectsIndex extends ThemeMixin(LitElement) {
  render() {
    return html`
      <section class="container pt-12">
        <projects-header></projects-header>
        <div class="px-3">
          <projects-ifficient></projects-ifficient>
          <div
            class="my-16 h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
          <projects-damus></projects-damus>
          <div
            class="my-16 h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
          <projects-allugator></projects-allugator>
          <div
            class="my-16 h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
          <projects-multiplayer></projects-multiplayer>
          <div
            class="mt-16 mb-32 h-px w-full bg-linear-to-r bg-transparent"
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
