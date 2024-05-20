export function menu() {
    const navList = document.querySelector('#menu')
    const navItems = {
        github: {
            label: 'GitHub',
            url: 'https://www.github.com/paulomelojunior',
        },
        instagram: {
            label: 'Instagram',
            url: 'https://www.instagram.com/hackyoto',
        },
        x: {
            label: 'X / Twitter',
            url: 'https://www.x.com/hackyoto',
        },
    }

    const navValues = Object.values(navItems)

    navValues.forEach((element) => {
        const navItem = `
            <li>
                <a target="_blank" class="hover:text-white" rel="noopener noreferrer" href="${element.url}">
                    ${element.label}
                </a>
            </li>`
        navList.insertAdjacentHTML('beforeend', navItem)
    })
}
