import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import logo from './logo.svg'

// Registra o plugin ScrambleTextPlugin
gsap.registerPlugin(ScrambleTextPlugin)

@customElement('footer-section')
export class FooterSection extends LitElement {
  @property({ type: String }) lang = i18next.language

  connectedCallback() {
    super.connectedCallback()
    i18next.on('languageChanged', this.handleLanguageChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    i18next.off('languageChanged', this.handleLanguageChange)
  }

  private handleLanguageChange = () => {
    this.lang = i18next.language
  }

  firstUpdated() {
    const navList = document.querySelector('#menu')

    if (!navList) return

    const navItems = {
      cosmos: {
        label: 'Cosmos',
        url: 'https://cosmos.so/hackyoto',
      },
      github: {
        label: 'GitHub',
        url: 'https://github.com/paulomelojunior',
      },
      // instagram: {
      //   label: 'Instagram',
      //   url: 'https://instagram.com/paulomelojunior',
      // },
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
      const indexStr = (i + 1).toString().padStart(2, '0')
      const navItem = `
				<div class="border-b border-stone-300 dark:border-zinc-900 xl:border-0">
					<a target="_blank" class="menu-item h-20 xl:h-16 px-5 pt-1 flex items-center text-stone-900 dark:text-zinc-200 relative" rel="noopener noreferrer" href="${e.url}">
						${e.label}
						<div class="absolute flex items-center px-5 pt-1 inset-0 xl:rounded-full text-stone-200 dark:text-zinc-950">
							${e.label}
						</div>
						<span class="xl:hidden absolute opacity-50 right-6 bottom-6 font-mono text-[.75rem] tracking-[0.05em]">
							${e.label === 'Email' ? 'hello@pmjr.cc' : indexStr}
						</span>
					</a>
				</div>`
      navList.insertAdjacentHTML('beforeend', navItem)
    })

    // Inicializa o efeito de scramble text
    this.initScrambleText()
  }

  private initScrambleText() {
    const copyrightElement = this.querySelector('#copyright')
    const copyrightSpan = this.querySelector('.copyright span')

    if (copyrightElement && copyrightSpan) {
      // Configura o estado inicial - texto vazio
      gsap.set(copyrightSpan, { text: 'Copyright' })

      // Event listeners para hover
      copyrightElement.addEventListener('mouseenter', () => {
        gsap.to(copyrightSpan, {
          duration: 1,
          scrambleText: {
            text: 'Free to copy',
            chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            speed: 0.1,
          },
        })
      })

      copyrightElement.addEventListener('mouseleave', () => {
        gsap.to(copyrightSpan, {
          duration: 0.5,
          scrambleText: {
            text: 'Copyright',
            chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            speed: 0.1,
          },
        })
      })
    }
  }

  render() {
    return html`
      <footer
        id="hey"
        class="xl:footer relative z-10 h-lvh overflow-hidden rounded-t-[2rem]"
      >
        <div
          id="footerLinks"
          class="relative z-10 flex h-full flex-1 items-center pb-20 xl:pb-0"
        >
          <div
            id="menu"
            class="flex flex-1 flex-col flex-wrap gap-0 text-[2rem] tracking-[-0.04em] xl:flex-row xl:items-baseline xl:justify-center xl:gap-4 2xl:text-[2.5rem]"
          >
            <span
              class="flex h-20 items-center px-5 text-stone-600 xl:p-0 dark:text-zinc-600"
            >
              ${i18next.t('connect.title')}
            </span>
            <span
              class="absolute right-5 ml-5 flex h-20 items-center xl:relative xl:right-auto xl:h-auto"
            >
              <img src="${logo}" alt="Logo" class="h-6" />
            </span>
          </div>
        </div>
        <div
          id="copyright"
          class="absolute inset-x-0 bottom-0 hidden bg-zinc-950 text-zinc-600 duration-300 hover:text-brand-400 xl:z-50 xl:block"
        >
          <div
            class="container flex h-12 items-center justify-center px-5 font-mono text-[.75rem] font-semibold uppercase leading-none"
          >
            <a
              href="https://github.com/paulomelojunior/pmjr.cc"
              target="_blank"
              rel="noopener noreferrer"
              class="copyright"
            >
              MIT License [<span>Copyright</span>] 2025, pmjr.cc
            </a>
          </div>
        </div>
      </footer>
    `
  }

  createRenderRoot() {
    return this
  }
}
