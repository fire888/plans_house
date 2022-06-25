export const createFlyButton = root => {
    const fb = document.createElement('button')
    fb.innerHTML = '<span>fly by path</span>'
    fb.classList.add('fly-button')
    document.body.appendChild(fb)


    let isStop = false

    fb.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        root.actions.startFly(isStop)
        isStop = !isStop
        fb.innerHTML = isStop
            ? '<span>stop fly</span>'
            :'<span>fly by path</span>'

    })

    return {
        reset: () => {
            isStop = false
            fb.innerHTML = '<span>fly by path</span>'
        },
        toggleView: is => {
            fb.style.display = is ? 'flex' : 'none'
        }
    }
}