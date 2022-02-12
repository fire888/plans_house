import * as THREE from "three";


const redMat = [
    'floor01_item08',
    'floor01_item09',
    'floor01_item10',
    'floor01_item11',
    'floor01_item12',
    'floor01_item13',
]
const blueMat = [
    'floor01_item103',
    'floor01_item03',
    'floor01_item07',
    'floor01_item06',
    'floor01_item05',
]
const greenMat = [
    'floor01_item15',
    'floor01_item16',
    'floor01_item17',
    'floor01_item18',
    'floor01_item19',
    'floor01_item20',
    'floor01_item21',
    'floor01_item22',
    'floor01_item23',
    'floor01_item24',
    'floor01_item25',
    'floor01_item26',
]


const createMaterials = () => {
    return {
        'floor': new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x111111,
            emissive: 0x000000,
            shininess: 0,
            transparent: true,
            opacity: 0.80,
        }),
        'wall': new THREE.MeshPhongMaterial({
            color: 0x4f7171,
            //color: 0x9faeae,
            specular: 0x111111,
            emissive: 0x000000,
            shininess: 0,
            transparent: true,
            opacity: .9,
        }),
        'stairsAndLift': new THREE.MeshPhongMaterial({
            color: 0x999900,
            specular: 0x111111,
            emissive: 0x000000,
            shininess: 0,
            transparent: true,
            opacity: 0.80,
        }),
        'lab': new THREE.MeshPhongMaterial({
            color: 0x996622,
            specular: 0x111111,
            emissive: 0x000000,
            shininess: 0,
            transparent: true,
            opacity: 0.80,
        }),
        'labRed': new THREE.MeshPhongMaterial({
            color: 0xFF5533,
            specular: 0x111111,
            emissive: 0x000000,
            shininess: 0,
            transparent: true,
            opacity: 0.90,
        }),
        'labBlue': new THREE.MeshPhongMaterial({
            color: 0x3355FF,
            specular: 0x111111,
            emissive: 0x000000,
            shininess: 0,
            transparent: true,
            opacity: 0.90,
        }),
        'labGreen': new THREE.MeshPhongMaterial({
            color: 0x33FF33,
            specular: 0x111111,
            emissive: 0x000000,
            shininess: 0,
            transparent: true,
            opacity: 0.90,
        }),
        'wireframe': new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true,
        }),
        'lineMat': new THREE.LineBasicMaterial( {
            color: 0x777777,
            linewidth: 1,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round' //ignored by WebGLRenderer
        }),
    }
}




export const createSystemLevel = (root) => {
    const { studio } = root
    const materials = createMaterials()
    const items = {}
    //const arrN = []
    const labels = {}

    const createLevel = (assets) => {


        assets['floor01'].traverse(child => {
            if (child.material) {
                items[child.name] = child
            }

        })

        for (let key in items) {
            //arrN.push(key)

            if (key.includes('floor')) {
                items[key].material = materials.floor
            }
            if (key.includes('wall')) {
                items[key].material = materials.wall
            }
            if (
                key.includes('stairs') ||
                key.includes('lift')
            ) {
                items[key].material = materials.stairsAndLift
            }
            if (key.includes('Line')) {
                items[key].material = materials.lineMat
            }

            if (key.includes('label')) {
                labels[key] = items[key]
            }


            if (key.includes('item')) {
                items[key].material = materials.lab
            }
            for (let i = 0; i < redMat.length; ++i) {
                if (redMat[i] === key) {
                    items[key].material = materials.labRed
                }
            }
            for (let i = 0; i < blueMat.length; ++i) {
                if (blueMat[i] === key) {
                    items[key].material = materials.labBlue
                }
            }
            for (let i = 0; i < greenMat.length; ++i) {
                if (greenMat[i] === key) {
                    items[key].material = materials.labGreen
                }
            }

            studio.addToScene(items[key])
        }
    }

    return {
        createLevel,
        getLabels: () => {
            return labels
        },
    }
}
