import { createMesh } from '../entities/Arrow'
import { LABELS_DATA } from '../constants/itemsData' 
import { CROSS_DATA } from '../constants/itemsData'
const Graph = require('node-dijkstra')

console.log(Graph)



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

        for (let keyLabel in LABELS_DATA) {
            const k = LABELS_DATA[keyLabel].pathLabel
            
            if (k !== key) {
                continue;
            } 
            
            nodesData[key].label = keyLabel 
        }
    }


    const route = new Graph()

    for (let keyGraph in CROSS_DATA) {
        const cross = {}
        for (let i = 0; i < CROSS_DATA[keyGraph].length; ++i) {
            cross[CROSS_DATA[keyGraph][i]] = 
                nodesData[keyGraph].pos.distanceToSquared(nodesData[CROSS_DATA[keyGraph][i]].pos)
        }
        route.addNode(keyGraph, cross)
    } 




    root.emitter.subscribe('changePath', ({ currentStart, currentEnd }) => {
        if (!currentStart || !currentEnd) {
            return;
        }

        if (currentStart === currentEnd) {
            return;
        }

        /** remove old arrow */
        if (mesh) {
            root.studio.removeFromScene(mesh)
            mesh.geometry.dispose()
            mesh.material.dispose()
            mesh = null
        }


        /** get start and end nodes by labels */
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

        /** create new arrow */
        const keysPath = route.path(nodeStartKey, nodeEndKey)
        const coords = getCoords(keysPath, nodesData)
        mesh = createMesh(coords)
        //mesh.renderOrder = 999
        //mesh.renderOrder = zindex || 999;
       // mesh.material.depthTest = false;
        //mesh.material.depthWrite = false;
        //mesh.onBeforeRender = function (renderer) { renderer.clearDepth(); };
        root.studio.addToScene(mesh)
    })

    return {}
}


const getCoords = (arrSteppedKeys, data) => {
    const points = []
    for (let i = 0; i < arrSteppedKeys.length; ++i) {
        points.push(...data[arrSteppedKeys[i]].pos.toArray())
    }

    return points
}



