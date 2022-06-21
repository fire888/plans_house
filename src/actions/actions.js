import { LABELS_DATA } from '../constants/itemsData'


export const createActions = (root) => {


    const changePath =(data) => {
        root.system_arrows && root.system_arrows.drawPath(data)
        root.system_labels.setToBiggest(data.currentStart, data.currentEnd)

        let key1 = null
        let key2 = null
        if (
            LABELS_DATA[data.currentStart] && 
            LABELS_DATA[data.currentStart].mesh
        ) {
            key1 = LABELS_DATA[data.currentStart].mesh
        }

        if (                
            LABELS_DATA[data.currentEnd] && 
            LABELS_DATA[data.currentEnd].mesh 
        ) {
            key2 = LABELS_DATA[data.currentEnd].mesh
        }

        root.system_assets.setCurrent(key1, key2)
    }


    root.projector.on((newItem, oldItem) => {
        if (oldItem) {
          root.system_assets.darkObject(oldItem)
        }
        if (newItem) {
            root.system_assets.lightObject(newItem)
        }
    })



    let isClickedStart = true
    let savedPrev = 'label000'

    root.projector.onClick(item => {
        console.log(item.name)

        let currentClick = null 
        for (let key in LABELS_DATA) {
            if (LABELS_DATA[key].mesh && LABELS_DATA[key].mesh === item.name) {
                currentClick =  key
            }
        }

        if (!currentClick) {
            return;
        }

        if (isClickedStart) {
            changePath({ currentStart: savedPrev, currentEnd: currentClick })
        }

        if (!isClickedStart) {
            changePath({ currentStart: currentClick, currentEnd: savedPrev })
        }

        savedPrev = currentClick
        isClickedStart = !isClickedStart 
    })

    return {
        toggleVisibleFloor: (keyFloor, is) => {
            root.system_assets &&
                root.system_assets.toggleVisibleFloor(keyFloor, is)
        },
        changePath,
    }
} 