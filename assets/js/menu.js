const button = document.querySelector('button');
const menu = document.querySelector('nav');
const body = document.querySelector('body');
const main = document.querySelector('main');

function toggleMenu() {
    menu.classList.toggle('closed');
    menu.classList.toggle('opened');
    button.classList.toggle('inverted');
}

button.addEventListener('click', function (e) {
    toggleMenu();
    e.stopPropagation();
})

main.addEventListener('click', function (e) {
    if (menu.classList.contains('opened')) {
        toggleMenu()
    }
})