import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { I18nElement } from '../../base/i18n-element'
import './styles.scss'

@customElement('hero-section')
export class HeroSection extends I18nElement {
  render() {
    return html`
      <section
        id="hero"
        class="
					bg-none
					container
					flex
					flex-col
					font-medium
					h-[calc(100lvh-100vw)]
					justify-end
					p-6
					relative
					sm:bg-[length:auto]
					sm:bg-[url('/src/assets/imgs/dots.svg'),_url('/src/assets/imgs/grid.svg')]
					sm:bg-bottom
					sm:h-[calc(50dvh-4rem)]
					sm:p-0"
      >
        <h1
          id="heroTitle"
          class="mb-[4rem] text-[2.125rem] leading-none tracking-[-0.02em] text-neutral-200 sm:text-7xl"
        >
          <div class="flex flex-col">
            <span class="hero-letters block">${this.t('hero.roles.designer')}</span>
            <span class="hero-letters block">${this.t('hero.roles.engineer')}</span>
          </div>
        </h1>
      </section>
    `
  }
}
