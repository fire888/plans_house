export const createFlyButton = root => {
    const fb = document.createElement('button')
    fb.innerHTML = '<span>fly by path</span>'
    fb.classList.add('fly-button')
    document.body.appendChild(fb)
    fb.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        root.actions.startFly()
    })
}