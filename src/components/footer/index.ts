import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import logo from './logo.svg';

// Registra o plugin ScrambleTextPlugin
gsap.registerPlugin(ScrambleTextPlugin);

@customElement('footer-section')
export class FooterSection extends LitElement {
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

	firstUpdated() {
		const navList = document.querySelector('#menu')

		if (!navList) return;

		const navItems = {
			cosmos: {
				label: 'Cosmos',
				url: 'https://cosmos.so/hackyoto',
			},
			github: {
				label: 'GitHub',
				url: 'https://github.com/paulomelojunior',
			},
			instagram: {
				label: 'Instagram',
				url: 'https://instagram.com/paulomelojunior',
			},
			linkedin: {
				label: 'LinkedIn',
				url: 'https://linkedin.com/in/paulomelojunior/',
			},
			email: {
				label: 'Email',
				url: 'mailto:hello@pmjr.cc',
			},

		}

		const navValues = Object.values(navItems)

		navValues.forEach((e, i) => {
			const indexStr = (i + 1).toString().padStart(2, '0');
			const navItem = `
				<div class="border-b border-stone-300 dark:border-zinc-900 xl:border-0">
					<a target="_blank" class="menu-item h-20 xl:h-16 px-5 pb-1 flex justify-center xl:flex flex-col text-stone-900 dark:text-zinc-200 relative" rel="noopener noreferrer" href="${e.url}">
						${e.label}
						<div class="absolute flex items-center pb-1 px-5 inset-0 xl:rounded-full text-stone-200 dark:text-zinc-950">
							${e.label}
						</div>
						<span class="xl:hidden absolute opacity-50 right-6 bottom-6 font-mono tracking-[1px] text-[.75rem]">
							${indexStr === '05' ? 'hello@pmjr.cc' : indexStr}
						</span>
					</a>
				</div>`
			navList.insertAdjacentHTML('beforeend', navItem)
		})

		// Inicializa o efeito de scramble text
		this.initScrambleText();
	}

	private initScrambleText() {
		const copyrightElement = this.querySelector('#copyright');
		const copyrightSpan = this.querySelector('.copyright span');
		
		if (copyrightElement && copyrightSpan) {
			// Configura o estado inicial - texto vazio
			gsap.set(copyrightSpan, { text: 'Copyright' });
			
			// Event listeners para hover
			copyrightElement.addEventListener('mouseenter', () => {
				gsap.to(copyrightSpan, {
					duration: 1,
					scrambleText: {
						text: 'Free to copy',
						chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
						speed: 0.1
					}
				});
			});
			
			copyrightElement.addEventListener('mouseleave', () => {
				gsap.to(copyrightSpan, {
					duration: .5,
					scrambleText: {
						text: 'Copyright',
						chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
						speed: 0.1
					}
				});
			});
		}
	}

	render() {
		return html`
			<footer id="hey" class="xl:footer relative h-lvh z-10 rounded-t-[2rem] overflow-hidden">
				<div id="footerLinks" class="relative flex h-full flex-1 items-center pb-24 xl:pb-0 z-10">
					<div id="menu" class="flex flex-1 flex-col tracking-[-0.02em] flex-wrap gap-0 text-[2rem] xl:items-baseline xl:flex-row xl:gap-4 xl:justify-center 2xl:text-[2.5rem]">
						<span class="px-5 h-20 flex items-center xl:p-0 text-stone-600 dark:text-zinc-600">
							${i18next.t('connect.title')}
						</span>
						<span class="absolute xl:relative h-20 xl:h-auto flex items-center right-5 xl:right-auto ml-5">
							<img src="${logo}" alt="Logo" class="h-6" />
						</span>
					</div>
				</div>
				<div id="copyright" class="absolute xl:z-50 inset-x-0 bottom-0 hidden xl:block bg-zinc-950 text-zinc-600 hover:text-brand-400 duration-300">
					<div class="container px-5 font-semibold tracking-[0.05em] uppercase h-12 flex font-mono items-center justify-center text-[.75rem] leading-none">
						<a href="https://github.com/paulomelojunior/pmjr.cc" target="_blank" rel="noopener noreferrer" class="copyright">
							MIT License [<span>Copyright</span>] 2025, pmjr.cc
						</a>
					</div>
				</div>
			</footer>
		`;
	}

	createRenderRoot() {
		return this;
	}
} 