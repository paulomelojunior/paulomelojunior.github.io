export function menu() {
    const navList = document.querySelector('#menu')
    const navItems = {
        cosmos: {
            label: 'Cosmos',
            url: 'https://cosmos.so/hackyoto',
            extra: '✦',
        },
        nostr: {
            label: 'Nostr',
            url: 'https://primal.net/p/npub1c7vp7kfh3lslrxwah4p4g2ty4v8wv4frtuxgq6565k8se4kj97ksqshw7m',
            extra: '✦'
        },
        github: {
            label: 'GitHub',
            url: 'https://github.com/paulomelojunior',
            extra: '✦',
        },
        instagram: {
            label: 'Instagram',
            url: 'https://instagram.com/paulomelojunior',
            extra: '✦',
        },
        linkedin: {
            label: 'LinkedIn',
            url: 'https://linkedin.com/in/paulomelojunior/',
            extra: '✦',
        },

    }

    const navValues = Object.values(navItems)

    navValues.forEach((e) => {
        const navItem = `
            <li>
                <a target="_blank" class="group/item flex items-center text-gray-200 relative" rel="noopener noreferrer" href="${e.url}">
                    ${e.extra ?
                        `<span class="text-lg font-medium tracking-[2px] absolute text-brand-400 duration-200 -translate-x-[2rem] group-hover/item:-translate-x-[1.125rem] opacity-0 group-hover/item:opacity-100">
                            ${e.extra}
                        </span>` : ``} 
                    ${e.label}
                </a>
            </li>`
        navList.insertAdjacentHTML('beforeend', navItem)
    })
}
