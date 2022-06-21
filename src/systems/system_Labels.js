import * as THREE from "three"

import { LABELS_DATA, WHITE, BLACK, LABEL_OFFSET_Y } from '../constants/itemsData'



const createCanvas = (text, size, color, colorFont) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = size[0]
    canvas.height = size[1]

    ctx.lineWidth = 1;
    //ctx.strokeStyle = color === WHITE ? BLACK : WHITE;
    ctx.strokeStyle = BLACK;
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


const createSprite = (key, labelsLinesModel) => {
    if (!LABELS_DATA[key]) {
        console.log('!!!! no label ' + key + ' in config')
        return null;
    }

    const { text, size, color, colorFont = WHITE } = LABELS_DATA[key]
    const map = new THREE.CanvasTexture(createCanvas(text, size, color, colorFont));

    const material = new THREE.SpriteMaterial( { map: map, transparent: true, opacity: 0.9} );

    const sprite = new THREE.Sprite( material );
    const pos = [
        labelsLinesModel.geometry.attributes.position.array[3],
        labelsLinesModel.geometry.attributes.position.array[4] + LABEL_OFFSET_Y,
        labelsLinesModel.geometry.attributes.position.array[5],
    ]

    sprite.position.fromArray(pos)
    sprite.scale.x = size[0] / 200
    sprite.scale.y = size[1] / 200
    return sprite
}


export const createSystemLabels = (root, labelsLinesModels) => {
    const sprites = {}
    let bigScaled = []
    

    for (let key in labelsLinesModels) {
        const sprite = createSprite(key, labelsLinesModels[key])
        if (sprite) {
            root.studio.addToScene2(sprite)
            sprites[key] = {s: sprite, scale: [sprite.scale.x, sprite.scale.y]}
        }
    }

    return {
        setToBiggest: (key1, key2) => {
            for (let i = 0; i < bigScaled.length; ++i) {
                const { s, scale } = bigScaled[i]
                s.scale.x = scale[0]
                s.scale.y = scale[1]
            }
            bigScaled = []


            if (key1) {
                const { s, scale } = sprites[key1]
                s.scale.x = scale[0] * 3
                s.scale.y = scale[1] * 3
                bigScaled.push(sprites[key1])
            }
            if (key2) {
                const { s, scale } = sprites[key2]
                s.scale.x = scale[0] * 3
                s.scale.y = scale[1] * 3
                bigScaled.push(sprites[key2])
            }
        }, 

    }
}
