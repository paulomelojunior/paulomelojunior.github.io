import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import profile1x from '../../assets/imgs/profile-1x.webp';
import profile2x from '../../assets/imgs/profile-2x.webp';
import profile3x from '../../assets/imgs/profile-3x.webp';

@customElement('about-section')
export class AboutSection extends LitElement {
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
      <section class="bg-zinc-950 relative">
        <div id="who" class="absolute sm:-top-16 top-0"></div>
        <div id="about" class="container flex flex-col sm:flex-row overflow-hidden rounded-lg">
          <picture class="h-[100vw] aspect-square overflow-hidden sm:h-[50dvh] sm:w-[50dvh] bg-zinc-400">
            <img 
              alt="${i18next.t('about.picDescription')}"
              class="h-full object-cover mix-blend-multiply" 
              loading="lazy" 
              src="${profile3x}" 
              srcset="
                ${profile1x}  480w,
                ${profile2x}  720w,
                ${profile3x} 1440w
              " 
              sizes="(max-width: 480px) 480px, (max-width: 720px) 720px, 1440px" 
            />
          </picture>
          <div class="flex flex-col flex-1 justify-center gap-4 sm:gap-8 px-6 py-12 leading-loose font-normal sm:px-32 sm:text-2xl sm:bg-zinc-900">
            <p class="text-pretty">
              ${i18next.t('about.content.p1')} <mark class="bg-transparent text-brand-400 sm:text-zinc-200 inline-block">${i18next.t('about.content.h1')}</mark>, ${i18next.t('about.content.p2')} <mark class="bg-transparent text-brand-400 sm:text-zinc-200"><span class="inline-block">${i18next.t('about.content.h3.s1')}</span> <span class="inline-block">${i18next.t('about.content.h3.s2')}</span></mark> ${i18next.t('about.content.p3')}
            </p>
            <p class="text-pretty">
              <mark class="inline-block bg-transparent text-brand-400 sm:text-zinc-200">${i18next.t('about.content.h4')}</mark>, ${i18next.t('about.content.p4')} <mark class="inline-block bg-transparent text-brand-400 sm:text-zinc-200">${i18next.t('about.content.h5')}</mark>, ${i18next.t('about.content.p5')}
            </p>
          </div>
        </div>
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}