import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('about-section')
export class AboutSection extends LitElement {
  render() {
    return html`
      <section class="bg-neutral-950 relative">
        <div id="who" class="absolute sm:-top-16 top-0"></div>
        <div id="about" class="container flex flex-col sm:flex-row overflow-hidden rounded-lg">
          <picture class="h-[100vw] aspect-square overflow-hidden sm:h-[50dvh] sm:w-[50dvh]">
            <img 
              alt="${i18next.t('about.picDescription')}"
              class="h-full object-cover" 
              loading="lazy" 
              src="assets/imgs/profile-3x.webp" 
              srcset="
                assets/imgs/profile-1x.webp  480w,
                assets/imgs/profile-2x.webp  720w,
                assets/imgs/profile-3x.webp 1440w
              " 
              sizes="(max-width: 480px) 480px, (max-width: 720px) 720px, 1440px" 
            />
          </picture>
          <div class="flex flex-col flex-1 justify-center gap-4 sm:gap-8 px-6 py-12 leading-loose font-normal sm:px-32 sm:text-2xl sm:bg-neutral-900">
            <p class="text-pretty">
              ${i18next.t('about.content.p1')} <mark class="bg-transparent text-brand-400 sm:text-neutral-200 inline-block">${i18next.t('about.content.h1')}</mark>, ${i18next.t('about.content.p2')} <mark class="bg-transparent text-brand-400 sm:text-neutral-200"><span class="inline-block">${i18next.t('about.content.h3.s1')}</span> <span class="inline-block">${i18next.t('about.content.h3.s2')}</span></mark> ${i18next.t('about.content.p3')}
            </p>
            <p class="text-pretty">
              <mark class="inline-block bg-transparent text-brand-400 sm:text-neutral-200">${i18next.t('about.content.h4')}</mark>, ${i18next.t('about.content.p4')} <mark class="inline-block bg-transparent text-brand-400 sm:text-neutral-200">${i18next.t('about.content.h5')}</mark>, ${i18next.t('about.content.p5')}
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