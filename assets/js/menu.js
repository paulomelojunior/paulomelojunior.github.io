const button = document.querySelector('button');
const menu = document.querySelector('nav');
const main = document.querySelector('main');
const header = document.querySelector('header');

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

main.onscroll = function() {
    if (main.scrollTop == 0) {
        header.classList.remove('shrunken');            
    } else {
        header.classList.add('shrunken');            
    }
}