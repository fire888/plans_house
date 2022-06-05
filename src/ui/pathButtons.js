
import { LABELS_DATA } from '../constants/itemsData'


const createButton = (dir, keyLabel, text, onClick) => {
    const butt = document.createElement('button')
    butt.innerText = text
    butt.addEventListener('click', () => onClick(dir, keyLabel))
    return butt
}



export const createButtons = (root) => {
    const { emitter } = root 

    const container = document.createElement('div')
    container.classList.add('path-cont')
    document.body.appendChild(container)

    const startCont = document.createElement('div')
    startCont.classList.add('cont-column')
    startCont.innerHTML = `<div>старт</div>`
    container.appendChild(startCont)

    const endCont = document.createElement('div')
    endCont.classList.add('cont-column')
    endCont.innerHTML = `<div>финиш</div>`
    container.appendChild(endCont)


    let currentStart = null
    let currentEnd = null


    const onClick = (dir, keyLabel) => {
        if (dir === 'start') {
            for (let k in startButtons) {
                startButtons[k].classList.remove('red')
            }
            startButtons[keyLabel].classList.add('red')
            currentStart = keyLabel
        }

        if (dir === 'end') {
            for (let k in endButtons) {
                endButtons[k].classList.remove('red')
            }
            endButtons[keyLabel].classList.add('red')
            currentEnd = keyLabel
        }

        root.actions.changePath({ currentStart, currentEnd })
    }


    const startButtons = {}


    for (let key in LABELS_DATA) {
        const b = createButton('start', key, LABELS_DATA[key].text, onClick)
        startCont.appendChild(b)
        startButtons[key] = b
    }


    const endButtons = {}

    for (let key in LABELS_DATA) {
        const b = createButton('end', key, LABELS_DATA[key].text, onClick)
        endCont.appendChild(b)
        endButtons[key] = b
    }


    return {
        click: data => {
            onClick(data.dir, data.label)
        },
    }
}


