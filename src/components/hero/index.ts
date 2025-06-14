import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './styles.scss';

@customElement('hero-section')
export class HeroSection extends LitElement {
  @property({ type: String }) lang = i18next.language;

  connectedCallback() {
    super.connectedCallback();
    i18next.on('languageChanged', () => {
      this.lang = i18next.language;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    i18next.off('languageChanged', () => {
      this.lang = i18next.language;
    });
  }
  
  render() {
    return html`
      <section class="hero">
        <div class="container">
          <div class="p-32 pt-48">
            <h1 class="text-[4.5rem] leading-none tracking-[-0.02em] text-zinc-200">
              Digital product designer<br>
              and creative coder.
            </h1>
          </div>
          <div class="mx-32 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
          <div class="grid grid-cols-2">
            <div class="p-32">
              <p class="text-[1.25rem] leading-loose">
                <mark class="bg-transparent text-zinc-100 inline-block">${i18next.t('about.content.h1')}</mark>,
                ${i18next.t('about.content.p1')}
              </p>
            </div>
            <div class="p-32">
              <p class="text-[1.25rem] leading-loose">
                <mark class="bg-transparent text-zinc-100 inline-block">${i18next.t('about.content.h2')}</mark>,
                ${i18next.t('about.content.p2')}
              </p>
            </div>
          </div>
          <div class="bg-zinc-900 rounded-t-[2rem]">
            <marquee-element items="Design Engineering, Product Design, UX and UI"></marquee-element>
          </div>
        </div>
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}