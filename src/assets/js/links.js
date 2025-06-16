export function menu() {
    const navList = document.querySelector('#menu')
    const navItems = {
        cosmos: {
            label: 'Cosmos',
            url: 'https://cosmos.so/hackyoto',
        },
        github: {
            label: 'GitHub',
            url: 'https://github.com/paulomelojunior',
        },
        instagram: {
            label: 'Instagram',
            url: 'https://instagram.com/paulomelojunior',
        },
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
        const indexStr = (i + 1).toString().padStart(2, '0');
        const navItem = `
            <li class="border-b border-zinc-900 xl:border-0">
                <a target="_blank" class="menu-item h-20 xl:h-16 px-5 pb-1 flex justify-center xl:flex flex-col text-zinc-200 relative" rel="noopener noreferrer" href="${e.url}">
                    ${e.label}
                    <div class="absolute flex items-center pb-1 px-5 inset-0 xl:rounded-full text-zinc-800">
                    ${e.label}
                    </div>
                    <span class="xl:hidden absolute opacity-50 right-6 bottom-6 font-mono tracking-[1px] text-[.75rem]">
                        ${indexStr === '05' ? 'hello@pmjr.cc' : indexStr}
                    </span>
                </a>
            </li>`
        navList.insertAdjacentHTML('beforeend', navItem)
    })
}
