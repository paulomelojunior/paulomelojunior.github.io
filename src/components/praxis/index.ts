import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './styles.scss';

@customElement('praxis-section')
export class PraxisSection extends LitElement {
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
      <div id="how" class="grid xl:grid-cols-2 overflow-hidden gap-16 xl:gap-0 *:2xl:p-32 *:flex *:flex-col *:items-start *:justify-center *:gap-8 py-32">
        <div class="praxis xl:aspect-square px-10">
          <svg class="size-20 xl:size-24" width="82" height="81" viewBox="0 0 82 81" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 23C31.1503 23 41 13.1503 41 1C28.8497 1 19 10.8497 19 23Z" stroke="#ff6666"/>
            <path d="M41 1C53.1503 1 63 10.8497 63 23C50.8497 23 41 13.1503 41 1Z" stroke="#ff6666"/>
            <path d="M19 23C31.1503 23 41 32.8497 41 45C28.8497 45 19 35.1503 19 23Z" stroke="#ff6666"/>
            <path d="M41 45C53.1503 45 63 35.1503 63 23C50.8497 23 41 32.8497 41 45Z" stroke="#ff6666"/>
            <path d="M41 79.0966C44.5746 79.0966 48.1492 78.4978 51.5712 77.3001L81 67V57C81 50.3726 75.6274 45 69 45H41" stroke="#ff6666"/>
            <path d="M41 79.0966C37.4254 79.0966 33.8508 78.4978 30.4288 77.3001L1 67V57C1 50.3726 6.37258 45 13 45H41" stroke="#ff6666"/>
          </svg>
          <h2 class="text-[1.5rem] xl:text-[2.5rem] leading-none dark:text-zinc-200 text-zinc-800">
            Design to thinking.
          </h2>
          <p class="xl:text-xl leading-loose xl:leading-10 text-pretty">
            From insight to interface, I design with people in mind. Merging aesthetics, purpose, and cutting-edge tech through Design Thinking and Human-Centered Design.
          </p>
        </div>
        <div class="praxis xl:aspect-square px-10">
          <svg class="size-20 xl:size-24" width="82" height="66" viewBox="0 0 82 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 23C31.1503 23 41 13.1503 41 1H1V23H19Z" stroke="#ff6666"/>
            <path d="M63 23C50.8497 23 41 13.1503 41 1H81V23H63Z" stroke="#ff6666"/>
            <path d="M19 23C31.1503 23 41 32.8497 41 45H1V23H19Z" stroke="#ff6666"/>
            <path d="M63 23C50.8497 23 41 32.8497 41 45H81V23H63Z" stroke="#ff6666"/>
            <path d="M41 65H11V57H29C33.4183 57 37 53.4183 37 49V45H41" stroke="#ff6666"/>
            <path d="M41 65H71V57H53C48.5817 57 45 53.4183 45 49V45H41" stroke="#ff6666"/>
          </svg>
          <h2 class="text-[1.5rem] xl:text-[2.5rem] leading-none dark:text-zinc-200 text-zinc-800">
            Tech to delivery.
          </h2>
          <p class="xl:text-xl leading-loose xl:leading-10 text-pretty">
            Learning from tech experts early on made algorithms a core part of my toolkit, bridging design and engineering to craft seamless, refined digital experiences.
          </p>
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}