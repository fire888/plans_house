import * as THREE from "three"

const BLUE = 0x0000FF
const SIZE = [500, 120]

const LABELS_DATA = {
    'label012': { text: 'лаб. 101', size: SIZE, color: BLUE },
    'label013': { text: 'лаб. 102', size: SIZE, color: BLUE },
    'label014': { text: 'лаб. 103', size: SIZE, color: BLUE },
    'label015': { text: 'лаб. 104', size: SIZE, color: BLUE },
    'label016': { text: 'лаб. 105', size: SIZE, color: BLUE },
    'label017': { text: 'гардероб', size: SIZE, color: BLUE },
    'label018': { text: 'лаб. 106', size: SIZE, color: BLUE },
    'label019': { text: 'лаб. 107', size: SIZE, color: BLUE },
    'label020': { text: 'лаб. 108', size: SIZE, color: BLUE },
    'label021': { text: 'лаб. 109', size: SIZE, color: BLUE },
    'label022': { text: 'лаб. 110', size: SIZE, color: BLUE },
    'label023': { text: 'лаб. 111', size: SIZE, color: BLUE },
    'label024': { text: 'лестница', size: SIZE, color: BLUE },
    'label025': { text: 'лифт', size: SIZE, color: BLUE },
    'label026': { text: 'лаб. 112', size: SIZE, color: BLUE },
    'label027': { text: 'ВХОД 2', size: SIZE, color: BLUE },
}



const createCanvas = (text, size, color) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = size[0]
    canvas.height = size[1]

    ctx.lineWidth = 16;
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = "#333333";

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);

    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "center"
    ctx.fillStyle = "#ffffff";
    ctx.font = 'bold 90px Gill Sans'
    ctx.fillText(text, canvas.width / 2, canvas.height - 30);

    return canvas
}


const createSprite = (key, data) => {

    const { text, size, color } =  LABELS_DATA[key]
    const map = new THREE.CanvasTexture(createCanvas(text, size, color));

    const material = new THREE.SpriteMaterial( { map: map } );

    const sprite = new THREE.Sprite( material );
    const pos = [
        data.geometry.attributes.position.array[3],
        data.geometry.attributes.position.array[4]+.2,
        data.geometry.attributes.position.array[5],
    ]

    sprite.position.fromArray(pos)
    sprite.scale.x = size[0] / 140
    sprite.scale.y = size[1] / 140
    return sprite
}


export const createSystemLabels= (root, labelsData, assets) => {
        for (let key in labelsData) {
            const sprite = createSprite(key, labelsData[key], assets['view1'])
            root.studio.addToScene(sprite );
        }

        return {
        }
}
