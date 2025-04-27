export function journey() {
    const journey = document.querySelector('#journey')
    const journeyItems = {
        3: {
            start: '2016',
            end: '2018',
            title: 'Designer, <br> Front-end Dev',
            description: `In multifaceted collaboration with managers and the development team, we successfully redesigned the interfaces and features of company's software.`,
            more: `Also played a key role in co-creating a platform that facilitates connecting individuals facing legal issues with specialized professionals.`
        },
        2: {
            start: '2018',
            end: '2019',
            title: 'Visual and <br> Product Designer',
            description: 'Early 2018, I held the role of a generalist designer, tasked with developing and managing all aspects of design and creative outputs for their product project.',
            more: 'Second half of the year, I collaborated with another company to design an open-source library of interface components.'
        },
        1: {
            start: '2019',
            end: '2025',
            title: 'Lead Designer, <br> UI Developer',
            description: `Today responsible for redesigning the company's advanced lead management platform, using React components to improve performance and scalability.`,
        },
        4: {
            custom: 'hidden',
            start: '2015',
            end: '2016',
            title: 'Design Intern',
            description:
                'During my internship, I had the opportunity to refine and develop skills across various functions. HTML and CSS development, marketing initiatives, visual design, branding, and UX/UI design.',
        },
    }

    const journeyValues = Object.values(journeyItems)

    journeyValues.forEach((element, i) => {
        const journeyItem = `
            <div class="job flex flex-col gap-6 px-6 sm:px-0 py-12 ${element.custom ? element.custom : ''}">
                <div class="flex flex-col gap-3">
                    <span class="text-sm font-semibold md:text-sm">
                        ${element.end}
                    </span>
                    <h3 class="font-medium text-2xl text-zinc-800">
                        ${element.title}
                    </h3>
                </div>
                <p class="leading-loose font-medium text-pretty">
                    ${element.description}
                </p>
            </div>
        `
        journey.insertAdjacentHTML('beforeend', journeyItem)
    })
}
