import * as THREE from 'three'


const prepareArrPoints = arr => {
    const arrPoints = []

    for (let i = 0; i < arr.length; i+=3) {
        arrPoints.push([arr[i], arr[i+1], arr[i+2]])
    }
    return arrPoints
}

const W = .2
const W2 = .5

const prepareArrGeometryPoints = arr => {
    
    const arrGeom = []

    const v1 = new THREE.Vector2()
    const v2 = new THREE.Vector2()

    for (let i = 0; i < arr.length; ++i) {

        if (arr[i - 1] && arr[i + 1]) {
            v1.x = arr[i][0] - arr[i-1][0]
            v1.y = arr[i][2] - arr[i-1][2]
            
            const angle = -v1.angle()

            /** create poligons to previous points */
            arrGeom.push(
                arr[i-1][0] - (Math.sin(angle) * W),
                arr[i-1][1],
                arr[i-1][2] - (Math.cos(angle) * W),

                arr[i-1][0] + (Math.sin(angle) * W),
                arr[i-1][1],
                arr[i-1][2] + (Math.cos(angle) * W),

                arr[i][0] + (Math.sin(angle) * W),
                arr[i][1],
                arr[i][2] + (Math.cos(angle) * W),



                arr[i-1][0] - (Math.sin(angle) * W),
                arr[i-1][1],
                arr[i-1][2] - (Math.cos(angle) * W),

                arr[i][0] + (Math.sin(angle) * W),
                arr[i][1],
                arr[i][2] + (Math.cos(angle) * W),

                arr[i][0] - (Math.sin(angle) * W),
                arr[i][1],
                arr[i][2] - (Math.cos(angle) * W),
            )


            /** create connections to next start poligons */
            if (arr[i + 2]) {
                v2.x = arr[i+1][0] - arr[i][0]
                v2.y = arr[i+1][2] - arr[i][2]
                
                const angle2 = -v2.angle()

                arrGeom.push(
                    arr[i][0],
                    arr[i][1],
                    arr[i][2],

                    arr[i][0] - (Math.sin(angle2) * W),
                    arr[i][1],
                    arr[i][2] - (Math.cos(angle2) * W),

                    arr[i][0] - (Math.sin(angle) * W),
                    arr[i][1],
                    arr[i][2] - (Math.cos(angle) * W),


                    arr[i][0],
                    arr[i][1],
                    arr[i][2],

                    arr[i][0] + (Math.sin(angle) * W),
                    arr[i][1],
                    arr[i][2] + (Math.cos(angle) * W),

                    arr[i][0] + (Math.sin(angle2) * W),
                    arr[i][1],
                    arr[i][2] + (Math.cos(angle2) * W),
                )
            }
        }

        /** last arrow */
        if (!arr[i + 1]) {
            v1.x = arr[i][0] - arr[i-1][0]
            v1.y = arr[i][2] - arr[i-1][2]
            
            const angle = -v1.angle()

            arrGeom.push(
                arr[i-1][0] - (Math.sin(angle) * W2),
                arr[i-1][1],
                arr[i-1][2] - (Math.cos(angle) * W2),

                arr[i-1][0] + (Math.sin(angle) * W2),
                arr[i-1][1],
                arr[i-1][2] + (Math.cos(angle) * W2),

                arr[i][0],
                arr[i][1],
                arr[i][2],



                arr[i-1][0] - (Math.sin(angle) * W2),
                arr[i-1][1],
                arr[i-1][2] - (Math.cos(angle) * W2),

                arr[i][0],
                arr[i][1],
                arr[i][2],

                arr[i][0],
                arr[i][1],
                arr[i][2],
            )
        }
    }

    return arrGeom
}


export const createMesh = pointsArr => {
    const arrPoints = prepareArrPoints(pointsArr)
    const arrGeometryPoints = prepareArrGeometryPoints(arrPoints)

    const geom = new THREE.BufferGeometry()
    geom.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array(arrGeometryPoints), 3))
    const mesh = new THREE.Mesh(
        geom,
        new THREE.MeshBasicMaterial({ 
            color: 0xFFFFFF,
            side: THREE.DoubleSide,
            wireframe: false 
        })
    )
    return mesh
}