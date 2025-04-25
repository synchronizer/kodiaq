

Array.from(document.querySelectorAll('.header')).forEach(header => {
    document.addEventListener('scroll', () => {
        if (header.getBoundingClientRect().top <= -24) {
            header.classList.add('header_sticked')
        } else {
            header.classList.remove('header_sticked')
        }
    })
})