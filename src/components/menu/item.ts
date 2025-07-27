import gsap from 'gsap'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './styles.scss'
import classNames from 'classnames'

@customElement('menu-item')
export class MenuItem extends LitElement {
  @property({ type: String }) classNames = ''
  @property({ type: String }) href: string = ''
  @property({ type: String }) label: string = ''

  firstUpdated() {
    const navItems = document.querySelectorAll('.menu-item')

    navItems.forEach((item) => {
      const target = item.firstElementChild
      gsap.set(target, {
        clipPath: 'inset(0% 0% 100% 0%)',
      })
    })

    function handleEnter(this: HTMLElement) {
      const target = this.firstElementChild
      gsap.to(target, {
        duration: 0.25,
        clipPath: 'inset(0% 0% 0% 0%)',
      })
    }
    
    function handleLeave(this: HTMLElement) {
      if (this.classList.contains('active')) return

      const target = this.firstElementChild
      if (!target) return

      gsap.to(target, {
        duration: 0.25,
        clipPath: 'inset(100% 0 0 0)',
        onComplete: () => {
          gsap.set(target, {
            clipPath: 'inset(0% 0% 100%)',
          })
        },
      })
    }

    navItems.forEach((item) => {
      item.addEventListener('mouseenter', handleEnter)
      item.addEventListener('mouseleave', handleLeave)
    })
  }

  render() {
    const baseClasses = classNames(
      `menu-item relative tracking-[0.05em] flex items-center justify-center h-10 xl:h-12 px-4 text-stone-950 dark:text-zinc-50 text-[.75rem] uppercase`
    )

    const fxClasses = classNames(
      'absolute flex items-center justify-center inset-0 text-zinc-950 font-medium'
    )

    return html`<a
      class="${baseClasses} ${this.classNames}"
      href="${this.href}"
      data-label="${this.label}"
    >
      <span aria-hidden="true" class="${fxClasses}"> ${this.label} </span>
      ${this.label}
    </a>`
  }

  createRenderRoot() {
    return this
  }
}
