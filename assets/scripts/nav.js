const navList = document.querySelector('.nav__list')
const navItems = {
    github: {
        label: 'GitHub',
        url: 'https://www.github.com/paulomelojunior',
    },
    instagram: {
        label: 'Instagram',
        url: 'https://www.instagram.com/paulomelojunior',
    },
    nostr: {
        label: 'Nostr',
        url: 'https://iris.to/boss',
    },
    spotify: {
        label: 'Spotify',
        url: 'https://www.spotify.com/paulomelojunior',
    },
    twitch: {
        label: 'Twitch',
        url: 'https://www.twitch.tv/hackyoto',
    },
    xCorp: {
        label: 'X Corp.',
        url: 'https://www.x.com/hackyoto',
    },
}

const navValues = Object.values(navItems)

navValues.forEach(element => {
    const navItem = `
        <div class="nav__listItem">
            <a target="_blank" class="button" href="${element.url}">
                ${element.label}
            </a>
        </div>`
        
    navList.insertAdjacentHTML('beforeend', navItem)
});


const workouts = {
    a: {
        1: {
            l: 'Bench Press',
            s: [2, 3],
            r: ['20', '8 a 12'],
            c: [15, 25]
        }
    }
}