const navList = document.querySelector('.nav__list')
const navItems = {
    a: {
        label: 'Peito e Ombros',
        content: 'a',
        active: true
    },
    b: {
        label: 'Costas e Bíceps',
        content: 'b',
        active: false
    },
    c: {
        label: 'MMII e Tríceps',
        content: 'c',
        active: false
    },
}

const navValues = Object.values(navItems)

navValues.forEach(element => {
    const navItem = `
        <div class="nav__listItem">
            <div class="button ${element.active === true && 'active'}" id="${element.content}" data-bs-toggle="pill" data-bs-target="${"#content-" + element.content}">
                ${element.label}
            </div>
        </div>`
        
    navList.insertAdjacentHTML('beforeend', navItem)
})

function toggleNav() {
    navList.classList.toggle('nav__list--showing')
    navList.addEventListener('click', toggleNav)
    document.querySelector('body').classList.toggle('overflow-hidden')
}