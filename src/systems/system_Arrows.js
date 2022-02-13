import { createMesh } from '../entities/Arrow' 


export const createSystemArrows = (root, data) => {
    const arrPoints = data['arrow01'].geometry.attributes.position.array
    const mesh = createMesh(arrPoints)

    root.studio.addToScene(mesh)

    return {}
}