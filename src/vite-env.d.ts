/// <reference types="vite/client" />

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare global {
  interface Window {
    lenis: import('lenis').default
  }
}

export {}
