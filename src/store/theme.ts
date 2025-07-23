import { LitElement } from 'lit'

// Interface para componentes com tema
export interface ThemeComponent {
  dark: boolean
  toggleTheme(): void
}

// Store global para o tema
class ThemeStore {
  private _dark = true
  private listeners: Set<LitElement> = new Set()

  get dark(): boolean {
    return this._dark
  }

  set dark(value: boolean) {
    this._dark = value
    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem('theme', value ? 'dark' : 'light')
    this.notifyListeners()
  }

  toggle(): void {
    this.dark = !this.dark
  }

  subscribe(component: LitElement): void {
    this.listeners.add(component)
  }

  unsubscribe(component: LitElement): void {
    this.listeners.delete(component)
  }

  private notifyListeners(): void {
    this.listeners.forEach((component) => {
      component.requestUpdate()
    })
  }

  init(): void {
    // Carregar tema do localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this._dark = savedTheme === 'dark'
    }
    document.documentElement.classList.toggle('dark', this._dark)
  }
}

// Instância global do store
export const themeStore = new ThemeStore()

// Mixin para componentes que precisam do tema
export const ThemeMixin = <T extends new (...args: any[]) => LitElement>(
  superClass: T
) => {
  return class extends superClass implements ThemeComponent {
    connectedCallback() {
      super.connectedCallback()
      themeStore.subscribe(this)
    }

    disconnectedCallback() {
      super.disconnectedCallback()
      themeStore.unsubscribe(this)
    }

    get dark(): boolean {
      return themeStore.dark
    }

    set dark(value: boolean) {
      themeStore.dark = value
    }

    toggleTheme(): void {
      themeStore.toggle()
    }
  } as T & { new (...args: any[]): InstanceType<T> & ThemeComponent }
}
