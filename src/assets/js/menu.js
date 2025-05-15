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

    }

    const navValues = Object.values(navItems)

    navValues.forEach((e) => {
        const navItem = `
            <li>
                <a target="_blank" class="menu-item h-20 px-5 pb-1 flex justify-center xl:flex flex-col text-zinc-200 relative" rel="noopener noreferrer" href="${e.url}">
                    ${e.label}
                    <div class="absolute flex items-center pb-1 px-5 inset-0 xl:rounded-full text-zinc-800">
                        ${e.label}
                    </div>
                </a>
            </li>`
        navList.insertAdjacentHTML('beforeend', navItem)
    })
}
