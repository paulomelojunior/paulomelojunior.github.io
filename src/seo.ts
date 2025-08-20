import i18n from './i18n'

type SeoData = {
	title: string
	description: string
	keywords: string
}

function ensureMeta(name: string): HTMLMetaElement {
	let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
	if (!el) {
		el = document.createElement('meta')
		el.setAttribute('name', name)
		document.head.appendChild(el)
	}
	return el
}

function ensureOg(property: string): HTMLMetaElement {
	let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
	if (!el) {
		el = document.createElement('meta')
		el.setAttribute('property', property)
		document.head.appendChild(el)
	}
	return el
}

function getPageKeyFromPath(pathname: string): 'home' | 'projects' | 'glyphs' | 'twyne' | '404' {
	const path = pathname.replace(/\/+$/, '') || '/'
	if (path === '/' || path.endsWith('/index.html')) return 'home'
	if (path.endsWith('/projects') || path.endsWith('/projects.html')) return 'projects'
	if (path.endsWith('/glyphs') || path.endsWith('/glyphs.html')) return 'glyphs'
	if (path.endsWith('/twyne') || path.endsWith('/twyne.html')) return 'twyne'
	if (path.endsWith('/404') || path.endsWith('/404.html')) return '404'
	return 'home'
}

function getSeoForPage(page: ReturnType<typeof getPageKeyFromPath>): SeoData {
	const t = i18n.t.bind(i18n)
	const description = t('seo.common.description') as string
	const commonKeywords = t('seo.common.keywords') as string

	switch (page) {
		case 'projects':
			return {
				title: t('seo.projects.title') as string,
				description,
				keywords: [commonKeywords, t('seo.projects.keywords') as string].filter(Boolean).join(', '),
			}
		case 'glyphs':
			return {
				title: t('seo.glyphs.title') as string,
				description,
				keywords: [commonKeywords, t('seo.glyphs.keywords') as string].filter(Boolean).join(', '),
			}
		case 'twyne':
			return {
				title: t('seo.twyne.title') as string,
				description,
				keywords: [commonKeywords, t('seo.twyne.keywords') as string].filter(Boolean).join(', '),
			}
		case '404':
			return {
				title: t('seo.404.title') as string,
				description,
				keywords: commonKeywords,
			}
		case 'home':
		default:
			return {
				title: t('seo.home.title') as string,
				description,
				keywords: commonKeywords,
			}
	}
}

function applySeo(seo: SeoData): void {
	document.title = seo.title
	ensureMeta('description').setAttribute('content', seo.description)
	ensureMeta('keywords').setAttribute('content', seo.keywords)
	// Social
	ensureOg('og:title').setAttribute('content', seo.title)
	ensureOg('og:description').setAttribute('content', seo.description)
	ensureMeta('twitter:title').setAttribute('content', seo.title)
	ensureMeta('twitter:description').setAttribute('content', seo.description)
}

export function initSEO(): void {
	const page = getPageKeyFromPath(window.location.pathname)
	applySeo(getSeoForPage(page))
	// Atualiza quando o idioma muda
	i18n.on('languageChanged', () => {
		applySeo(getSeoForPage(page))
	})
}

// Executa imediatamente quando importado
if (typeof window !== 'undefined' && document.readyState !== 'loading') {
	initSEO()
} else if (typeof window !== 'undefined') {
	document.addEventListener('DOMContentLoaded', () => initSEO(), { once: true })
}


