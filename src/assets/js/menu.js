export function menu() {
    const navList = document.querySelector('#menu')
    const navItems = {
        // cosmos: {
        //     label: 'Cosmos',
        //     url: 'https://cosmos.so/hackyoto',
        //     extra: '✦',
        // },
        nostr: {
            label: 'Nostr',
            url: 'https://primal.net/p/npub1c7vp7kfh3lslrxwah4p4g2ty4v8wv4frtuxgq6565k8se4kj97ksqshw7m',
            extra: 'boss@pmjr.cc'
        },
        github: {
            label: 'GitHub',
            url: 'https://github.com/paulomelojunior',
            extra: '/paulomelojunior',
        },
        instagram: {
            label: 'Instagram',
            url: 'https://instagram.com/paulomelojunior',
            extra: '/paulomelojunior',
        },
        linkedin: {
            label: 'LinkedIn',
            url: 'https://linkedin.com/in/paulomelojunior/',
            extra: '/paulomelojunior',
        },

    }

    const navValues = Object.values(navItems)

    navValues.forEach((e) => {
        const navItem = `
            <li>
                <a target="_blank" class="group/item flex flex-col text-zinc-200 relative" rel="noopener noreferrer" href="${e.url}">
                    ${e.label}
                    ${e.extra ?
                        `<span class="hidden text-[.75rem] absolute uppercase bottom-0 text-brand-400 duration-200 opacity-0 group-hover/item:translate-y-full group-hover/item:opacity-100">
                            ${e.extra}
                        </span>`
                    : ``}
                </a>
            </li>`
        navList.insertAdjacentHTML('beforeend', navItem)
    })
}
