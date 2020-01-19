const button = document.querySelector('button');
const menu = document.querySelector('nav');
const main = document.querySelector('main');
const header = document.querySelector('header');

function toggleMenu() {
    menu.classList.toggle('closed');
    menu.classList.toggle('opened');
    header.classList.toggle('inverted');
}

button.addEventListener('click', function (e) {
    toggleMenu();
    e.stopPropagation();
})

main.addEventListener('click', function (e) {
    if (menu.classList.contains('opened')) {
        toggleMenu();
    }
})

window.onscroll = function() {
    if (menu.classList.contains('opened')) {
        toggleMenu();
    }
}