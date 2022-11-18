const body = document.querySelector('body')

function loadBody() {

    window.addEventListener('load', () => {
        body.removeAttribute('class');
    })

}

loadBody()