import Lenis from 'lenis'

const lenis = new Lenis()

// lenis.on('scroll', (e) => {
//     console.log(e)
// })

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
