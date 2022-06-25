
import { FLOORS } from '../constants/floors.js'


const createButton = (keyLabel, onClick) => {
    const butt = document.createElement('button')
    butt.innerText = keyLabel
    butt.addEventListener('click', () => onClick(keyLabel))
    return butt
}



export const createFloorsButtons = (root) => {
    const container = document.createElement('div')
    container.classList.add('floors-cont')
    document.body.appendChild(container)

    const startCont = document.createElement('div')
    startCont.classList.add('cont-column')
    container.appendChild(startCont)


    const onClick = (keyLabel) => {
        floorsButtons[keyLabel].isDown = !floorsButtons[keyLabel].isDown
        floorsButtons[keyLabel].isDown 
            ? floorsButtons[keyLabel].elem.classList.add('red')
            : floorsButtons[keyLabel].elem.classList.remove('red')

        root.actions.toggleVisibleFloor(keyLabel, !floorsButtons[keyLabel].isDown)
    }


    const floorsButtons = {}

    for (let i = 0; i < FLOORS.length; ++i) {
        const b = createButton(FLOORS[i], onClick)
        startCont.appendChild(b)
        floorsButtons[FLOORS[i]] = { isDown: false, elem: b, }
    }

    return {}
}
