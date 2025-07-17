import { gsap } from 'gsap'
import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './styles.scss';
import { ThemeMixin } from '../../store/theme';

@customElement('praxis-section')
export class PraxisSection extends ThemeMixin(LitElement) {
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


  firstUpdated() {
    const praxisPath = this.renderRoot.querySelectorAll('.praxis svg');
    praxisPath.forEach((i) => {
      const p = i.querySelectorAll('path');
      gsap.from(p, {
        scrollTrigger: {
          trigger: i,
          start: '0% 75%',
          toggleActions: 'play none none reverse',
        },
        stagger: 0.12,
        opacity: 0,
        fill: this.dark ? '#f4f425' : '#DE6868',
        drawSVG: false,
      });
    });

    const praxisItem = this.renderRoot.querySelectorAll('.praxis');
    praxisItem.forEach((i) => {
      gsap.from(i.children, {
        scrollTrigger: {
          trigger: i.children,
          start: '0% 75%',
          toggleActions: 'play none none reverse',
        },
        duration: 0.8,
        stagger: 0.1,
        x: '5rem',
        filter: 'blur(.5rem)',
        opacity: (i) => (i === 0 ? 1 : 0),
      });
    });
  }
  
  render() {
    return html`
      <section>
        <div class="container">
          <div id="how" class="grid xl:grid-cols-2 overflow-hidden gap-16 xl:gap-0 *:2xl:p-32 *:xl:p-24 *:flex *:flex-col *:items-start *:justify-center *:gap-8 py-16 xl:py-24 2xl:py-32">
            <div class="praxis 2xl:aspect-square px-10">
              <svg class="size-16 xl:size-24" width="82" height="81" viewBox="0 0 82 81" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 23C31.1503 23 41 13.1503 41 1C28.8497 1 19 10.8497 19 23Z" stroke="#000"/>
                <path d="M41 1C53.1503 1 63 10.8497 63 23C50.8497 23 41 13.1503 41 1Z" stroke="#000"/>
                <path d="M19 23C31.1503 23 41 32.8497 41 45C28.8497 45 19 35.1503 19 23Z" stroke="#000"/>
                <path d="M41 45C53.1503 45 63 35.1503 63 23C50.8497 23 41 32.8497 41 45Z" stroke="#000"/>
                <path d="M41 79.0966C44.5746 79.0966 48.1492 78.4978 51.5712 77.3001L81 67V57C81 50.3726 75.6274 45 69 45H41" stroke="#000"/>
                <path d="M41 79.0966C37.4254 79.0966 33.8508 78.4978 30.4288 77.3001L1 67V57C1 50.3726 6.37258 45 13 45H41" stroke="#000"/>
              </svg>
              <h2 class="text-[1.5rem] xl:text-[2rem] 2xl:text-[2.5rem] leading-none dark:text-zinc-200 text-stone-950">
                ${i18next.t('praxis.t1')}
              </h2>
              <p class="2xl:text-xl leading-loose 2xl:leading-10 text-pretty">
                ${i18next.t('praxis.p1')}
              </p>
            </div>
            <div class="praxis xl:aspect-square px-10">
              <svg class="size-16 xl:size-24" width="82" height="66" viewBox="0 0 82 66" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 23C31.1503 23 41 13.1503 41 1H1V23H19Z" stroke="#000"/>
                <path d="M63 23C50.8497 23 41 13.1503 41 1H81V23H63Z" stroke="#000"/>
                <path d="M19 23C31.1503 23 41 32.8497 41 45H1V23H19Z" stroke="#000"/>
                <path d="M63 23C50.8497 23 41 32.8497 41 45H81V23H63Z" stroke="#000"/>
                <path d="M41 65H11V57H29C33.4183 57 37 53.4183 37 49V45H41" stroke="#000"/>
                <path d="M41 65H71V57H53C48.5817 57 45 53.4183 45 49V45H41" stroke="#000"/>
              </svg>
              <h2 class="text-[1.5rem] xl:text-[2rem] 2xl:text-[2.5rem] leading-none dark:text-zinc-200 text-stone-950">
                ${i18next.t('praxis.t2')}
              </h2>
              <p class="2xl:text-xl leading-loose 2xl:leading-10 text-pretty">
                ${i18next.t('praxis.p2')}
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}