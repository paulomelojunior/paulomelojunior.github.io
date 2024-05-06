export function tools() {
    const toolValues = ['HTML5', 'CSS3', 'JS', 'Figma', 'GSAP', 'Tailwind']
    const toolList = document.querySelector('#tools')

    toolValues.forEach((element) => {
        const toolItem = `
            <div class="title-sm flex aspect-square items-center justify-center">
                ${element}
            </div>
            `
        toolList.insertAdjacentHTML('beforeend', toolItem)
    })
}
