export function tools() {
    const toolList = document.querySelector('#tools')
    const toolValues = ['HTML', 'CSS', 'JS', 'React', 'GSAP', 'Figma', 'Framer', 'Tailwind', 'Bitcoin']

    toolValues.forEach((element) => {
        const tool = `
            <div class="flex text-lg font-medium aspect-square items-center justify-center tool">
                ${element}
            </div>
            `
        toolList.insertAdjacentHTML('beforeend', tool)
    })
}