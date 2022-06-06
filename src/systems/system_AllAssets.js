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
            color: 0xffffff,
            //color: 0x9faeae,
            specular: 0xffffff,
            emissive: 0x000000,
            shininess: 0,
            transparent: true,
            opacity: .2,
        }),
        'wall': new THREE.MeshPhongMaterial({
            color: 0xffffff,
            //color: 0x9faeae,
            specular: 0xffffff,
            emissive: 0x000000,
            shininess: 0,
            transparent: true,
            opacity: .2,
        }),
        'stairsAndLift': new THREE.MeshPhongMaterial({
            color: 0xffff99,
            specular: 0x111111,
            emissive: 0x000000,
            shininess: 0,
            // transparent: true,
            // opacity: 0.80,
        }),
        // 'stairsAndLift': new THREE.MeshBasicMaterial({
        //     color: 0xffff00,
        //     //transparent: true,
        //     //opacity: 0.80,
        // }),
        // 'lab': new THREE.MeshPhongMaterial({
        //     color: 0x996622,
        //     specular: 0x111111,
        //     emissive: 0x000000,
        //     shininess: 0,
        //     transparent: true,
        //     opacity: 0.80,
        // }),
        'lab': new THREE.MeshBasicMaterial({
            color: 0x886600,
            specular: 0x111111,
            transparent: true,
            opacity: 0.5,
        }),
        // 'labRed': new THREE.MeshPhongMaterial({
        //     color: 0xFF5533,
        //     specular: 0x111111,
        //     emissive: 0x000000,
        //     shininess: 0,
        //     transparent: true,
        //     opacity: 0.90,
        // }),
        // 'labBlue': new THREE.MeshPhongMaterial({
        //     color: 0x223388,
        //     specular: 0x111111,
        //     emissive: 0x000000,
        //     shininess: 0,
        //     transparent: true,
        //     opacity: 0.5,
        // }),
        'labBlue': new THREE.MeshBasicMaterial({
            color: 0x223388,
            specular: 0x111111,
            transparent: true,
            opacity: 0.5,
        }),
        // 'labGreen': new THREE.MeshPhongMaterial({
        //     color: 0x228822,
        //     specular: 0x111111,
        //     emissive: 0x000000,
        //     shininess: 0,
        //     transparent: true,
        //     opacity: 0.90,
        // }),
        'labGreen': new THREE.MeshBasicMaterial({
            color: 0x228822,
            specular: 0x111111,
            transparent: true,
            opacity: 0.50,
        }),
        'matRed': new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            specular: 0x111111,
            emissive: 0x000000,
            shininess: 0,
            transparent: true,
            opacity: 0.90,
            side: THREE.DoubleSide,
        }),
        'labRed': new THREE.MeshBasicMaterial({
            color: 0x883322,
            specular: 0x111111,
            transparent: true,
            opacity: 0.50,
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
        'wireframe': new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        }),
        'lineMat': new THREE.LineBasicMaterial( {
            color: 0xffffff,
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
            linejoin:  'round' //ignored by WebGLRenderer
        }),
        'lineMatBlack': new THREE.LineBasicMaterial( {
            color: 0x229944,
            linewidth: 1,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round' //ignored by WebGLRenderer
        }),
        'lineMatWhite': new THREE.LineBasicMaterial( {
            color: 0xffffff,
            linewidth: 1,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round' //ignored by WebGLRenderer
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
                items[key].material = materials.floor
            }
            if (key.includes('wall')) {
                items[key].material = materials.wall
            }
            if (
                key.includes('stairs') ||
                key.includes('lift') ||
                key.includes('cloackroom')
            ) {
                items[key].material = materials.stairsAndLift
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
            if (key.includes('item')) {
                items[key].material = materials.lab
            }
            for (let i = 0; i < RED_GROUP.length; ++i) {
                if (RED_GROUP[i] === key) {
                    items[key].material = materials.labRed
                }
            }
            for (let i = 0; i < BLUE_GROUP.length; ++i) {
                if (BLUE_GROUP[i] === key) {
                    items[key].material = materials.labBlue
                }
            }
            for (let i = 0; i < GREEN_GROUP.length; ++i) {
                if (GREEN_GROUP[i] === key) {
                    items[key].material = materials.labGreen
                }
            }

            if (
                key.includes('stairs') ||
                key.includes('lift') ||
                key.includes('cloackroom')
            ) {
                studio.addToScene2(items[key])
            } else {
                studio.addToScene(items[key])
            }
        }
    }

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
        }
    }
}
