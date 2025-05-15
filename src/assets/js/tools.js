export function tools() {
    const toolList = document.querySelector('#tools')
    const toolValues = [
        'Figma',
        'Framer',
        'HTML',
        'CSS',
        'JS',
        'Tailwind',
        'React',
        'GSAP',
        'Bitcoin'
    ]

    toolValues.forEach((element) => {
        const tool = `
            <div class="flex items-center justify-center">
                ${element}
            </div>
            `
        toolList.insertAdjacentHTML('beforeend', tool)
    })
}