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

    if (LABELS_DATA[key]) {
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
    return null
}


export const createSystemLabels = (root, labelsData) => {
    
    const sprites = {}

    let oldSpStart = null
    let oldSpEnd = null

    for (let key in labelsData) {
        const sprite = createSprite(key, labelsData[key])
        sprite && root.studio.addToScene(sprite)
        sprites[key] = { s: sprite, scale: [sprite.scale.x, sprite.scale.y] }
    }

    root.emitter.subscribe('changePath', ({ currentStart, currentEnd }) => {
        if (currentStart) {
            if (oldSpStart) {
                const { s, scale } = sprites[oldSpStart] 
                s.scale.x = scale[0]
                s.scale.y = scale[1]
            }

            const { s, scale } = sprites[currentStart]
            s.scale.x = scale[0] * 1.3
            s.scale.y = scale[1] * 1.3
            oldSpStart = currentStart
        }
        if (currentEnd) {
            if (oldSpEnd) {
                const { s, scale } = sprites[oldSpEnd] 
                s.scale.x = scale[0]
                s.scale.y = scale[1]
            }

            const { s, scale } = sprites[currentEnd]
            s.scale.x = scale[0] * 1.3
            s.scale.y = scale[1] * 1.3
            oldSpEnd = currentEnd
        }
    })

    return {}
}
