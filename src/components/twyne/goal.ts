import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('twyne-goal')
export class TwyneGoal extends LitElement {
  @property({ type: String }) lang = i18next.language;

  connectedCallback() {
    super.connectedCallback();
    i18next.on('languageChanged', this.handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    i18next.off('languageChanged', this.handleLanguageChange);
  }

  private handleLanguageChange = () => {
    this.lang = i18next.language;
  };

  render() {
    return html`
    <section id="goal" class="container p-24 2xl:p-32">
				<div class="grid grid-cols-4 justify-center">
					<div class="flex flex-col justify-center aspect-square col-span-2 col-start-2">
						<h2 class="text-[2.5rem] 2xl:text-[3rem] tracking-[-.04em] dark:text-zinc-200 leading-none mb-10">
              ${i18next.t('twyne.goal.t1')}
						</h2>
						<p class="text-[1rem] 2xl:text-[1.25rem] leading-loose mb-8">
              ${unsafeHTML(i18next.t('twyne.goal.p1'))}
            </p>
						<p class="text-[1rem] 2xl:text-[1.25rem] leading-loose">
              ${i18next.t('twyne.goal.p2')}
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