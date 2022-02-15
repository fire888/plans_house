import { createMesh } from '../entities/Arrow' 


export const createSystemArrows = (root, data) => {
    if (data['arrow01']) {
        const arrPoints = data['arrow01'].geometry.attributes.position.array
        const mesh = createMesh(arrPoints)
        root.studio.addToScene(mesh)
    }


    root.emitter.subscribe('changePath', ({ currentStart, currentEnd }) => {
        console.log( currentStart, currentEnd  )
    })

    return {}
}