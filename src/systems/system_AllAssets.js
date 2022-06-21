import * as THREE from "three";
import { RED_GROUP, BLUE_GROUP, GREEN_GROUP } from '../constants/itemsData'



const createMaterials = () => {
    return {
        // 'floor': new THREE.MeshPhongMaterial({
        //     color: 0x333333,
        //     specular: 0x111111,
        //     emissive: 0x000000,
        //     shininess: 0,
        //     transparent: true,
        //     opacity: 0.50,
        // }),
        'floor': new THREE.MeshPhongMaterial({
            color: 0x0000ff,
            //color: 0x9faeae,
            specular: 0xffffff,
            emissive: 0x000000,
            shininess: 10,
            transparent: true,
            opacity: .2,
            depthWrite: false,
        }),
        'wall': new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            //color: 0x9faeae,
            specular: 0xffffff,
            emissive: 0x000000,
            shininess: 10,
            transparent: true,
            opacity: .1,
            depthWrite: false,
            side: THREE.DoubleSide,
        }),
        'lab': new THREE.MeshBasicMaterial({
            color: 0x886600,
            specular: 0x111111,
            transparent: true,
            opacity: 0.5,
        }),
        'labBlue': new THREE.MeshBasicMaterial({
            color: 0x223388,
            specular: 0x111111,
            transparent: true,
            opacity: .3,
            depthWrite: false,
        }),
        'labBlueLight': new THREE.MeshBasicMaterial({
            color: 0x223388,
            specular: 0x111111,
            transparent: true,
            opacity: 1,
            depthWrite: false,
        }),
        'labGreen': new THREE.MeshBasicMaterial({
            color: 0x228822,
            specular: 0x111111,
            transparent: true,
            opacity: 0.3,
            depthWrite: false,
        }),
        'labGreenLight': new THREE.MeshBasicMaterial({
            color: 0x228822,
            specular: 0x111111,
            transparent: true,
            opacity: 1,
            depthWrite: false,
        }),
        'labRed': new THREE.MeshBasicMaterial({
            color: 0x883322,
            specular: 0x111111,
            transparent: true,
            opacity: 0.3,
            depthWrite: false,
        }),
        'labRedLight': new THREE.MeshBasicMaterial({
            color: 0x883322,
            specular: 0x111111,
            transparent: true,
            opacity: 1,
            depthWrite: false,
        }),
        'man': new THREE.MeshPhongMaterial({
            color: 0x888800,
            specular: 0xffffff,
            emissive: 0x000000,
            shininess: 30,
        }),
        'black': new THREE.MeshBasicMaterial({
            color: 0x990000,
        }),
        // 'wireframe': new THREE.MeshBasicMaterial({
        //     color: 0xffffff,
        //     wireframe: true,
        // }),
        'lineMat': new THREE.LineBasicMaterial( {
            color: 0x00ffff,
            linewidth: 1,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round', //ignored by WebGLRenderer
            transparent: true,
            opacity: .5,
        }),
        'lineMatDark': new THREE.LineBasicMaterial( {
            color: 0x111111,
            linewidth: 1,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round', //ignored by WebGLRenderer
        }),
        'lineMatBlack': new THREE.LineBasicMaterial( {
            color: 0x00ffff,
            linewidth: 1,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round', //ignored by WebGLRenderer
            transparent: true,
            opacity: .5,
        }),
        'lineMatWhite': new THREE.LineBasicMaterial( {
            color: 0x00ffff,
            linewidth: 1,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round', //ignored by WebGLRenderer
            transparent: true,
            opacity: .5,
        }),
    }
}




export const createSystemAllAssets = (root) => {
    const { studio } = root
    const materials = createMaterials()
    const items = {}
    const labels = {}
    const arrows = {}
    const pathPoints = {}
    const floorsGroups = {
        'floor01': [],
        'floor02': [],
        'floor03': [],
        'floor04': [],
    }
    const labs = []
    const labsData = {}


    const createLevel = (assets) => {

        // assets['floor01'].scene.traverse(child => {
        //     if (child.material) {
        //         items[child.name] = child
        //     }
        // })


        assets['floor01'].traverse(child => {
            if (child.material) {
                items[child.name] = child
            }
        })

        for (let key in items) {
            for (let keyFloor in floorsGroups) {
                if (key.includes(keyFloor)) {
                    floorsGroups[keyFloor].push(items[key])
                }
            }

            if (key.includes('path')) {
                pathPoints[key] = items[key]
                continue;
            }


            if (key.includes('floor')) {
                items[key].material = materials.wall
            }
            if (key.includes('wall')) {
                items[key].material = materials.wall
            }
            if (
                key.includes('stairs') ||
                key.includes('lift') ||
                key.includes('cloackroom')
            ) {
                items[key].material = materials.wall
            }




            if (key.includes('Line')) {
                items[key].material = materials.lineMat
            }
            if (key.includes('land')) {
                items[key].material = materials.lineMatBlack
            }
            if (key.includes('clowd')) {
                items[key].material = materials.lineMatWhite
            }


            if (key.includes('label')) {
                labels[key] = items[key]
                items[key].material = materials.lineMatDark
            }


            if (key.includes('arrow')) {
               arrows[key] = items[key]
               continue;
            }
            if (key.includes('direction')) {
                items[key].material = materials.matRed
                continue;
            }



            if (key.includes('man')) {
                items[key].material = materials.man
            }
            if (key.includes('black')) {
                items[key].material = materials.black
            }
            if (key.includes('item') || key.includes('hidden') || key === 'floor01_cloackroom00') {
                items[key].material = materials.wall
                labs.push(items[key])
            }

            if (key === 'floor01_cloackroom00') {
                labsData[key] = {
                    mesh: items[key],
                    lightMat: materials.labRedLight,
                    normal: materials.wall,
                    current: materials.man,
                }
            }
            for (let i = 0; i < RED_GROUP.length; ++i) {
                if (RED_GROUP[i] === key) {
                    labsData[key] = {
                        mesh: items[key],
                        lightMat: materials.labRedLight,
                        normal: materials.labRed,
                        current: materials.man,
                    }
                    items[key].material = materials.labRed
                }
            }
            for (let i = 0; i < BLUE_GROUP.length; ++i) {
                if (BLUE_GROUP[i] === key) {
                    labsData[key] = {
                        mesh: items[key],
                        lightMat: materials.labBlueLight,
                        normal: materials.labBlue, 
                        current: materials.man,
                    }
                    items[key].material = materials.labBlue
                }
            }
            for (let i = 0; i < GREEN_GROUP.length; ++i) {
                if (GREEN_GROUP[i] === key) {
                    labsData[key] = {
                        mesh: items[key],
                        lightMat: materials.labGreenLight,
                        normal: materials.labGreen, 
                        current: materials.man,
                    }
                    items[key].material = materials.labGreen
                }
            }

            if (key.includes('hidden')) {
                labsData[key] = {
                    mesh: items[key],
                    lightMat: materials.labGreenLight,
                    normal: materials.labGreen,
                    current: materials.man,
                }
                continue;
            }

            if (
                key.includes('stairs') ||
                key.includes('lift') // ||
                //key.includes('cloackroom')
            ) {
                studio.addToScene2(items[key])
            } else {
                studio.addToScene(items[key])
            }
        }
    }

    let currentItems = []


    return {
        createLevel,
        getLabels: () => {
            return labels
        },
        getArrows: () => {
            return arrows
        },
        getPathPoints: () => {
            return pathPoints
        },
        toggleVisibleFloor: (keyFloor, is) => {
            for (let i = 0; i < floorsGroups[keyFloor].length; ++i) {
                floorsGroups[keyFloor][i].visible = is
            }
        },
        getLabs: () => labs,
        lightObject: object => {
            if (labsData[object.name]) {
                for (let i = 0; i < currentItems.length; ++i) {
                    if (currentItems[i].mesh.name === object.name) {
                        return;
                    }
                }
                object.material = labsData[object.name].lightMat
            }
        },
        darkObject: object => {
            if (labsData[object.name]) {
                for (let i = 0; i < currentItems.length; ++i) {
                    if (currentItems[i].mesh.name === object.name) {
                        return;
                    }
                }
                object.material = labsData[object.name].normal
            }
        },
        setCurrent: (key1, key2) => {
            for (let i = 0; i < currentItems.length; ++i) {
                currentItems[i].mesh.material = currentItems[i].normal
            }
            currentItems = []
            if (key1) {
                labsData[key1].mesh.material = labsData[key1].current 
                currentItems.push(labsData[key1]) 
            }
            if (key2) {
                labsData[key2].mesh.material = labsData[key2].current 
                currentItems.push(labsData[key2]) 
            }
        },
    }
}
