const navList = document.querySelector('.nav__list')
const navItems = {
    a: {
        label: 'Peito e Ombros',
        url: 'a',
    },
    b: {
        label: 'Costas e Biceps',
        url: 'b',
    },
    c: {
        label: 'MMII e Triceps',
        url: 'c',
    },
}

const navValues = Object.values(navItems)

navValues.forEach(element => {
    const navItem = `
        <div class="nav__listItem">
            <a class="button" href="${element.url}">
                ${element.label}
            </a>
        </div>`
        
    navList.insertAdjacentHTML('beforeend', navItem)
})

function toggleNav() {
    navList.classList.toggle('nav__list--showing')
    document.querySelector('body').classList.toggle('overflow-hidden')
}