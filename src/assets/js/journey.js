export function journey() {
    const journey = document.querySelector('#job')
    const journeyItems = {
        1: {
            hide: true,
            start: '2015',
            end: '2016',
            title: 'Design <br> Intern',
            description:
                'During my internship, I had the opportunity to refine and develop skills across various functions. HTML and CSS development, marketing initiatives, visual design, branding, and UX/UI design.',
        },
        2: {
            start: '2016',
            end: '2018',
            title: 'Designer, <br> Front-end Dev',
            description: `In multifaceted collaboration with managers and the development team, we successfully redesigned the interfaces and features of company's software.`,
            more: `Also played a key role in co-creating a platform that facilitates connecting individuals facing legal issues with specialized professionals.`
        },
        3: {
            start: '2018',
            end: '2019',
            title: 'Visual and <br> Product Designer',
            description: 'Early 2018, I held the role of a generalist designer, tasked with developing and managing all aspects of design and creative outputs for their product project.',
            more: 'Second half of the year, I collaborated with another company to design an open-source library of interface components.'
        },
        4: {
            custom: 'text-brand-400',
            start: '2019',
            end: '2025',
            title: 'Lead Designer, <br> UI Developer',
            description: `Today responsible for redesigning the company's advanced lead management platform, using React components to improve performance and scalability.`,
        },
    }

    const journeyValues = Object.values(journeyItems)
    journeyValues.forEach((element) => {
        const journeyItem = `
            <div class="${element.hide ? 'hidden xl:flex' : 'flex'} job relative justify-between flex-col gap-6 px-10 xl:p-20 2xl:p-24 xl:rounded-[2rem] xl:bg-black">
                <span class="font-mono top-0 right-0 xl:grid xl:left-0 xl:p-8 xl:absolute text-sm text-zinc-500">
                    ${element.start} <span class="xl:hidden">&bull;</span> <span${element.custom ? ` class="${element.custom}"` : ''}>${element.end}</span>
                </span>
                <h2 class="text-[1.5rem] 2xl:text-[2rem] xl:leading-none dark:text-zinc-200 text-zinc-800">
                    ${element.title}
                </h2>
                <p class="leading-loose text-pretty">
                    ${element.description}
                </p>
            </div>
        `
        journey.insertAdjacentHTML('beforeend', journeyItem)
    })

    const toolBox = `<div id="tools" class="hidden font-mono xl:grid grid-cols-3 gap-px *:uppercase *:bg-zinc-900 rounded-[2rem] aspect-square overflow-hidden"></div>`
    journey.insertAdjacentHTML('beforeend', toolBox)
}
