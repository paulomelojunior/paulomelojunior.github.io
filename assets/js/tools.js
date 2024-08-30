export function tools() {
    const toolValues = ['Figma', 'HTML5', 'CSS3', 'JS', 'GSAP', 'Tailwind']
    const toolList = document.querySelector('#tools')

    toolValues.forEach((element) => {
        const tool = `
            <div class="title-sm flex aspect-square items-center justify-center tool">
                ${element}
            </div>
            `
        toolList.insertAdjacentHTML('beforeend', tool)
    })
}