export function journey() {
    const journey = document.querySelector('#job')
    const journeyItems = {
        1: {
            hide: true,
            start: '2015',
            end: '2016',
            title: 'Design <br class="block xl:hidden"> Intern',
            description:
                'During my internship, I had the opportunity to refine and develop skills across various functions. HTML and CSS development, marketing initiatives, visual design, branding, and UX/UI design.',
        },
        2: {
            start: '2016',
            end: '2018',
            title: 'Designer, <br class="block xl:hidden"> Front-end Dev',
            description: `In multifaceted collaboration with managers and the development team, we successfully redesigned the interfaces and features of company's software.`,
            more: `Also played a key role in co-creating a platform that facilitates connecting individuals facing legal issues with specialized professionals.`
        },
        3: {
            start: '2018',
            end: '2019',
            title: 'Visual and <br class="block xl:hidden"> Product Designer',
            description: 'Early 2018, I held the role of a generalist designer, tasked with developing and managing all aspects of design and creative outputs for their product project.',
            more: 'Second half of the year, I collaborated with another company to design an open-source library of interface components.'
        },
        4: {
            custom: 'text-brand-400',
            start: '2019',
            end: '2025',
            title: 'Lead Designer, <br class="block xl:hidden"> UI Developer',
            description: `Today responsible for redesigning the company's advanced lead management platform, using React components to improve performance and scalability.`,
        },
    }

    const journeyValues = Object.values(journeyItems)
    journeyValues.forEach((element) => {
        const journeyItem = `
            <div class="${element.hide ? 'hidden xl:flex' : 'flex'} job relative justify-between flex-col gap-6 px-10 xl:p-20 2xl:px-32 2xl:py-16 xl:rounded-[2rem]">
                <span class="font-mono text-sm text-zinc-500">
                    ${element.start} &bull; <span${element.custom ? ` class="${element.custom}"` : ''}>${element.end}</span>
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
}
