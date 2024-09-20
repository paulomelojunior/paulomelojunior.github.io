export function menu() {
    const navList = document.querySelector('#menu')
    const navItems = {
        nostr: {
            label: 'nostr',
            url: 'https://primal.net/p/npub1c7vp7kfh3lslrxwah4p4g2ty4v8wv4frtuxgq6565k8se4kj97ksqshw7m',
            extra: 'NIP-05 boss@hac.wtf'
        },
        github: {
            label: 'GitHub',
            url: 'https://www.github.com/paulomelojunior',
            extra: '/paulomelojunior',
        },
        instagram: {
            label: 'Instagram',
            url: 'https://www.instagram.com/paulomelojunior',
            extra: '/paulomelojunior',
        },
        x: {
            label: 'X / Twitter',
            url: 'https://www.x.com/hackyoto',
            extra: '/hackyoto',
        },
    }

    const navValues = Object.values(navItems)

    navValues.forEach((e) => {
        const navItem = `
            <li>
                <a target="_blank" class="group/item flex items-end text-gray-200 relative" rel="noopener noreferrer" href="${e.url}">
                    ${e.label}
                    ${e.extra ?
                        `<span class="text-sm grid w-full tracking-wider text-brand-300 duration-200 group-hover/item:translate-y-full absolute opacity-0 group-hover/item:opacity-100">
                            ${e.extra}
                         </span>` : ``} 
                </a>
            </li>`
        navList.insertAdjacentHTML('beforeend', navItem)
    })
}
