import { createMesh } from '../entities/Arrow'
import { LABELS_DATA } from '../constants/itemsData' 
import { CROSS_DATA } from '../constants/itemsData'




export const createSystemArrows = (root, data) => {

    let mesh = null

    // if (data['arrow01']) {
    //     const arrPoints = data['arrow01'].geometry.attributes.position.array
    //     mesh = createMesh(arrPoints)
    //     root.studio.addToScene(mesh)
    // }


    const pathPoints = root.system_assets.getPathPoints()
    
    const nodesData = {}

    for (let key in pathPoints) {
        nodesData[key] = {
            pos: new THREE.Vector3(
                pathPoints[key].geometry.attributes.position.array[0],
                pathPoints[key].geometry.attributes.position.array[1],
                pathPoints[key].geometry.attributes.position.array[2],
            ),
            keyNode: key,
            crossData: null,
            label: null,
        }


        for (let keyCross in CROSS_DATA) {
            if (keyCross === key) {
                nodesData[key].crossData = CROSS_DATA[keyCross]
            }
        }


        for (let keyLabel in LABELS_DATA) {
            const k = LABELS_DATA[keyLabel].pathLabel
            
            if (k !== key) {
                continue;
            } 
            
            nodesData[key].label = keyLabel 
        }
    }






    console.log(nodesData)

    root.emitter.subscribe('changePath', ({ currentStart, currentEnd }) => {
        if (!currentStart || !currentEnd) {
            return;
        }

        if (currentStart === currentEnd) {
            return;
        }

        if (mesh) {
            root.studio.removeFromScene(mesh)
            mesh.geometry.dispose()
            mesh.material.dispose()
            mesh = null
        }


        let nodeStartKey = null
        let nodeEndKey = null

        for (let key in nodesData) {
            if (nodesData[key].label === currentStart) {
                nodeStartKey = key
            }
            if (nodesData[key].label === currentEnd) {
                nodeEndKey = key
            }
        }


        if (!nodeStartKey || !nodeEndKey) {
            return;
        }

        const arrCoords = pretparePath(nodeStartKey, nodeEndKey, nodesData)
        mesh = createMesh(arrCoords)
        root.studio.addToScene(mesh)
    })

    return {}
}



const pretparePath = (startKey, endKey, data) => {
    const minPath = createMinimalPath(startKey, endKey, data)
    
    return minPath
}




const createMinimalPath = (startKey, endKey, data) => {    
    const arrSteppedKeys = [startKey]

    const iterate = () => {
        const nearestKey = getNear(arrSteppedKeys[arrSteppedKeys.length - 1], data, arrSteppedKeys, endKey)

        arrSteppedKeys.push(nearestKey)
        if (nearestKey !== endKey) {
            iterate()
        }
    }
    iterate()
 

    const points = []
    for (let i = 0; i < arrSteppedKeys.length; ++i) {
        points.push(...data[arrSteppedKeys[i]].pos.toArray())
    }


    return points
}


const getNear = (keyCurrent, data, steppedKeys, endKey) => {
    let dist = 100000
    let keyNearest = null
    
    for (let key in data) {
        if (keyCurrent === key) {
            continue;
        }

        /** continue if already key exists in path */
        let isContinue = false
        for (let i = 0; i < steppedKeys.length; ++i) {
            if (steppedKeys[i] === key) {
                isContinue = true
            }
        }
        if (isContinue) {
            continue;
        }

        /** continue if key exist label and not as endKey */
        if (data[key].label !== null && data[key].label !== data[endKey].label) {
            continue;
        }

        const d = data[keyCurrent].pos.distanceTo(data[key].pos)
        if (d < dist) {
            keyNearest = key
            dist = d

        }
    }

    return keyNearest
}
