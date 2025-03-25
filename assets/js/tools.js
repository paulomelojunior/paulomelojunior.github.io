export function tools() {
    const toolValues = ['Figma', 'Framer', 'HTML', 'CSS', 'JS', 'GSAP', 'Tailwind', 'Bootstrap']
    const toolList = document.querySelector('#tools')

    toolValues.forEach((element) => {
        const tool = `
            <div class="flex text-xl font-medium aspect-square items-center justify-center tool">
                ${element}
            </div>
            `
        toolList.insertAdjacentHTML('beforeend', tool)
    })
}