const BUTTONS = {
    'start': 'start',
    'end': 'end',
    'close': null,
}

export const createChoiseStartEnd = root => {

    const wr = document.createElement('div')
    wr.classList.add('choise-wrapper')
    wr.style.display = 'none'
    document.body.append(wr)

    let resolve = null

    for (let key in BUTTONS) {
        const b = document.createElement('button')
        b.innerText = key
        wr.appendChild(b)
        b.addEventListener('click', e => {
            e.stopPropagation()
            if (!resolve) {
                return;
            }
            wr.style.display = 'none'
            resolve(BUTTONS[key])
            resolve = null
        })
    }


    return {
        waitChoise: (x, y, key) => {
            wr.style.left = x + 'px'
            wr.style.top = y + 'px'
            wr.style.display = 'flex'

            return new Promise(res => {
                resolve = res
            })
        }
    }
} 