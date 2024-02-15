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
        url: 'https://open.spotify.com/user/paulomelojunior',
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
            <a target="_blank" class="button" rel="noopener noreferrer" href="${element.url}">
                ${element.label}
            </a>
        </div>`
        
    navList.insertAdjacentHTML('beforeend', navItem)
})