let langSelector = document.querySelector('#langSelector')
let langSelectorModal = document.querySelector('#langSelectorModal')

langSelector.addEventListener('click', () => {
    langSelectorModal.showModal()
})

langSelectorModal.addEventListener('click', function (event) {

    let rect = langSelectorModal.getBoundingClientRect()

    let isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
    )

    if (!isInDialog) {
        langSelectorModal.close()
    }

})

let language

function getLang() {
    $.ajax({
        url: '/language/' + localStorage.getItem('language') + '.json',
        dataType: 'json',
        async: false,
        dataType: 'json',
        success: function (lang) { language = lang }
    })
}

getLang()

function setLang(lang) {
    localStorage.setItem('language', lang)
    window.location.reload()
}


const form = document.querySelector('#form')
const labels = form.querySelectorAll('label[for]')
const texts = form.querySelectorAll('#pnl, #tpt, #disclaimer')

labels.forEach(label => {
    const key = label.getAttribute('for')
    label.innerHTML = language[key]
})

texts.forEach(text => {
    text.innerHTML = language[text.id]
})

langSelector.firstChild.textContent = language.lang