export function menu() {
    const navList = document.querySelector('#menu')
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
            <li>
                <a target="_blank" class="menu_link" rel="noopener noreferrer" href="${element.url}">
                ${element.label}
                </a>
                </li>`      
                navList.insertAdjacentHTML('beforeend', navItem)
            })
        }

// <img class="md:hidden size-6" src="assets/imgs/${element.label}.svg" alt="${element.label}">
// <span class="hidden md:flex">
// </span>