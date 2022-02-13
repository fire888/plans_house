import * as THREE from "three"

import { LABELS_DATA, WHITE, BLACK, LABEL_OFFSET_Y } from '../constants/itemsData'



const createCanvas = (text, size, color, colorFont) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = size[0]
    canvas.height = size[1]

    ctx.lineWidth = 16;
    ctx.strokeStyle = color === WHITE ? BLACK : WHITE;
    ctx.fillStyle = color

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);

    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "center"
    ctx.fillStyle = colorFont
    ctx.font = 'bold 90px Gill Sans'
    ctx.fillText(text, canvas.width / 2, canvas.height - 30);

    return canvas
}


const createSprite = (key, data) => {

    const { text, size, color, colorFont = WHITE } = LABELS_DATA[key]
    const map = new THREE.CanvasTexture(createCanvas(text, size, color, colorFont));

    const material = new THREE.SpriteMaterial( { map: map } );

    const sprite = new THREE.Sprite( material );
    const pos = [
        data.geometry.attributes.position.array[3],
        data.geometry.attributes.position.array[4] + LABEL_OFFSET_Y,
        data.geometry.attributes.position.array[5],
    ]

    sprite.position.fromArray(pos)
    sprite.scale.x = size[0] / 140
    sprite.scale.y = size[1] / 140
    return sprite
}


export const createSystemLabels = (root, labelsData) => {
    for (let key in labelsData) {
        const sprite = createSprite(key, labelsData[key])
        root.studio.addToScene(sprite );
    }

    return {}
}
