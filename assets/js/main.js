import { menu } from './menu.js'

function hiDev() {
    let msg =
        '%c Hi, dev. 💙';
    let styles = [
        'font-size: 12px',
        'color: #e4e4e7',
        'font-family: monospace',
        'background: #020617',
        'display: inline-block',
        'padding: 1rem',
        'border: 2px solid #e4e4e7',
        'border-radius: 8px;'
    ].join(';');
    console.log(msg, styles);
};

hiDev()
menu()