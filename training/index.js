const navList = document.querySelector('.nav__list')
const navItems = {
    a: {
        label: 'Peito e Ombros',
        content: 'a',
    },
    b: {
        label: 'Costas e Biceps',
        content: 'b',
    },
    // c: {
    //     label: 'MMII e Triceps',
    //     content: 'c',
    // },
}

const navValues = Object.values(navItems)

navValues.forEach(element => {
    const navItem = `
        <div class="nav__listItem">
            <div class="button" id="${element.content}" data-bs-toggle="pill" data-bs-target="${"#content-" + element.content}">
                ${element.label}
            </div>
        </div>`
        
    navList.insertAdjacentHTML('beforeend', navItem)
})

function toggleNav() {
    navList.classList.toggle('nav__list--showing')
    document.querySelector('body').classList.toggle('overflow-hidden')
    navList.addEventListener('click', toggleNav)
}