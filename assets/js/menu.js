export function menu() {
    const navList = document.querySelector('#menu')
    const navItems = {
        cosmos: {
            label: 'Cosmos',
            url: 'https://cosmos.so/hackyoto',
            extra: '✦ hackyoto',
        },
        nostr: {
            label: 'Nostr',
            url: 'https://primal.net/p/npub1c7vp7kfh3lslrxwah4p4g2ty4v8wv4frtuxgq6565k8se4kj97ksqshw7m',
            extra: '✦ NIP-05 boss@hac.wtf'
        },
        github: {
            label: 'GitHub',
            url: 'https://github.com/paulomelojunior',
            extra: '✦ paulomelojunior',
        },
        instagram: {
            label: 'Instagram',
            url: 'https://instagram.com/paulomelojunior',
            extra: '✦ paulomelojunior',
        },
        linkedin: {
            label: 'LinkedIn',
            url: 'https://linkedin.com/in/paulomelojunior/',
            extra: '✦ paulomelojunior',
        },

    }

    const navValues = Object.values(navItems)

    navValues.forEach((e) => {
        const navItem = `
            <li>
                <a target="_blank" class="group/item flex items-end text-gray-200 relative" rel="noopener noreferrer" href="${e.url}">
                    ${e.label}
                    ${e.extra ?
                        `<span class="text-[11px] uppercase font-medium grid w-full leading-none tracking-[2px] text-orange-500 duration-200 group-hover/item:translate-y-full absolute opacity-0 group-hover/item:opacity-100">
                            ${e.extra}
                         </span>` : ``} 
                </a>
            </li>`
        navList.insertAdjacentHTML('beforeend', navItem)
    })
}
