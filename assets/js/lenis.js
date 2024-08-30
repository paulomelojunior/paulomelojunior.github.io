import Lenis from 'lenis'

const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

function lenisAnchor(target) {
    return lenis.scrollTo(target)
}

function handleAnchor() {
    const anchors = document.querySelectorAll('#anchors a')

    anchors.forEach((a) => {
        const ref = a.getAttribute('href')
        a.addEventListener('click', () => {
            lenisAnchor(ref)
        })
    })
}

handleAnchor()
