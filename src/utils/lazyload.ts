/**
 * Optimized lazy loading utility with Intersection Observer
 */

interface LazyLoadOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
  enableRetina?: boolean;
}

class LazyLoader {
  private observer: IntersectionObserver;
  private options: LazyLoadOptions;

  constructor(options: LazyLoadOptions = {}) {
    this.options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      enableRetina: true,
      ...options,
    };

    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: this.options.root,
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold,
    });
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLImageElement;
        this.loadImage(element);
        this.observer.unobserve(element);
      }
    });
  }

  private async loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;
    
    if (!src) return;

    // Create a new image to preload
    const imageLoader = new Image();
    
    // Set up srcset for responsive images
    if (srcset) {
      imageLoader.srcset = srcset;
    }
    
    return new Promise<void>((resolve, reject) => {
      imageLoader.onload = () => {
        // Update the actual img element
        img.src = src;
        if (srcset) {
          img.srcset = srcset;
        }
        
        // Add loaded class for fade-in animation
        img.classList.add('loaded');
        img.classList.remove('loading');
        
        resolve();
      };
      
      imageLoader.onerror = reject;
      imageLoader.src = src;
    });
  }

  observe(element: Element) {
    // Add loading class for styling
    element.classList.add('loading');
    this.observer.observe(element);
  }

  unobserve(element: Element) {
    this.observer.unobserve(element);
  }

  disconnect() {
    this.observer.disconnect();
  }
}

// Global lazy loader instance
export const lazyLoader = new LazyLoader();

// Auto-initialize for data-src images
export function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach((img) => lazyLoader.observe(img));
}

// CSS for loading states
export function injectLazyLoadCSS() {
  const style = document.createElement('style');
  style.textContent = `
    img.loading {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    
    img.loaded {
      opacity: 1;
    }
    
    img[data-src] {
      background-color: #18181b;
      background-image: linear-gradient(90deg, #18181b 25%, #27272a 50%, #18181b 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  document.head.appendChild(style);
}
