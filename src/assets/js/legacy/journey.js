export function journey() {
    const journey = document.querySelector('#job')
    const journeyItems = {
        1: {
            hide: true,
            start: '2015',
            end: '2016',
            title: '',
            description: '',
        },
        2: {
            start: '2016',
            end: '2018',
            title: '',
            description: ``,
            more: ``
        },
        3: {
            start: '2018',
            end: '2019',
            title: '',
            description: '',
            more: ''
        },
        4: {
            custom: 'text-brand-400',
            start: '2019',
            end: '2025',
            title: '',
            description: ``,
        },
    }

    const journeyValues = Object.values(journeyItems)
    journeyValues.forEach((element) => {
        const journeyItem = `
            <div class="${element.hide ? 'hidden xl:flex' : 'flex'} job relative justify-between flex-col gap-6 px-10 xl:p-20 2xl:px-32 2xl:py-16 xl:rounded-[2rem]">
                <span class="font-mono text-sm text-zinc-500">
                    ${element.start} &bull; <span${element.custom ? ` class="${element.custom}"` : ''}>${element.end}</span>
                </span>
                <h2 class="text-[1.5rem] 2xl:text-[2rem] xl:leading-none dark:text-zinc-200 text-stone-900">
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
