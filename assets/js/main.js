import { menu } from './menu.js'
import { journey } from './journey.js'
import { tools } from './tools.js'
import './lenis.js'

function hiDev() {
    let msg = '%c Hi, dev. 💙'
    let styles = [
        'font-size: 12px',
        'color: #e4e4e7',
        'font-family: monospace',
        'background: #0a0a0a',
        'display: inline-block',
        'padding: 1rem',
        'border: 2px solid #e4e4e7',
        'border-radius: 8px;',
    ].join(';')
    console.log(msg, styles)
}

hiDev()
menu()
journey()
tools()
