export function journey() {
    const journey = document.querySelector('#journey')
    const journeyItems = {
        1: {
            start: '2019',
            end: '2024',
            title: 'Lead Designer / UI Dev',
            description: `Today responsible for redesigning the company's advanced lead management platform, using React components to improve performance and scalability.`,
        },
        2: {
            start: '2018',
            end: '2019',
            title: 'Visual / Product Designer',
            description:
                'Early 2018, I held the role of a generalist designer, tasked with developing and managing all aspects of design and creative outputs for their product project. Second half of the year, I collaborated with another company to design an open-source library of interface components.',
        },
        3: {
            start: '2016',
            end: '2018',
            title: 'Designer / Front-end Dev',
            description: `In multifaceted collaboration with managers and the development team, we successfully redesigned the interfaces and features of company's software. Also played a key role in co-creating a platform that facilitates connecting individuals facing legal issues with specialized professionals.`,
        },
        4: {
            start: '2015',
            end: '2016',
            title: 'Design Intern',
            description:
                'During my internship, I had the opportunity to refine and develop skills across various functions. HTML and CSS development, marketing initiatives, visual design, branding, and UX/UI design.',
        },
    }

    const journeyValues = Object.values(journeyItems)

    journeyValues.forEach((element) => {
        const journeyItem = `
            <div class="flex flex-col gap-8 md:gap-10 ">
                <span class="text-sm md:text-base animate-in-out [animation-timeline:view(block_10%_10%)]">
                    ${element.start} &rightarrow; ${element.end}
                </span>
                <h3 class="title-xs text-neutral-200 animate-in-out [animation-timeline:view(block_10%_10%)]">
                    ${element.title}
                </h3>
                <p class="md:leading-loose leading-loose text-sm md:text-base animate-in-out [animation-timeline:view(block_10%_10%)]">
                    ${element.description}
                </p>
            </div>
        `
        journey.insertAdjacentHTML('beforeend', journeyItem)
    })
}
