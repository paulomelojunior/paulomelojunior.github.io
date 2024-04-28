export function menu() {
    const navList = document.querySelector('.menu')
    const navItems = {
        github: {
            label: 'GitHub',
            url: 'https://www.github.com/paulomelojunior',
        },
        instagram: {
            label: 'Instagram',
            url: 'https://www.instagram.com/paulomelojunior',
        },
        twitter: {
            label: 'Twitter',
            url: 'https://www.x.com/hackyoto',
        },
    }

    const navValues = Object.values(navItems)

    navValues.forEach(element => {
        const navItem = `
            <li class="menu_item">
                <a target="_blank" class="menu_link" rel="noopener noreferrer" href="${element.url}">
                    ${element.label}
                </a>
            </div>`      
        navList.insertAdjacentHTML('beforeend', navItem)
    })
}

