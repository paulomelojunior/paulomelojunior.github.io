import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import pic from '../../assets/imgs/pic-1x.webp';

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
      <section class="relative">
        <div id="who" class="absolute sm:-top-16 top-0"></div>
        <div id="about" class="container flex flex-col sm:grid sm:grid-cols-3 overflow-hidden rounded-[2rem] bg-zinc-800">
          <picture class="
            contrast-[1.05]
            invert-[0.05]
            saturate-[0.8]
            hue-rotate-[-10deg]
            overflow-hidden
            h-[100vw]
            aspect-square
            relative
            xl:h-auto
          ">
            
            <img 
              alt="${i18next.t('about.picDescription')}"
              class="h-full object-cover" 
              loading="eager"
              src="${pic}" 
            />
          </picture>
          <div class="flex flex-col col-span-2 gap-4 xl:gap-0 justify-between px-5 py-14 leading-loose font-normal xl:p-32 xl:text-xl xl:leading-loose text-zinc-400">
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