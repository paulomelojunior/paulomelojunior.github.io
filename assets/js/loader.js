window.addEventListener('load', function () {
    setTimeout(() => {
        document.querySelector('body').classList.remove('loading');
    }, 1000);
});