import * as THREE from 'three'


const prepareArrPoints = arr => {
    const arrPoints = []

    for (let i = 0; i < arr.length; i+=3) {
        arrPoints.push([arr[i], arr[i+1], arr[i+2]])
    }
    return arrPoints
}

const W = 3

const prepareArrGeometryPoints = arr => {
    const arrGeom = []

    const v1 = new THREE.Vector2()
    const v2 = new THREE.Vector2()

    console.log(arr)
    for (let i = 0; i < arr.length; ++i) {
        if (!arr[i - 1]) {
            arrGeom.push([
                arr[i][0] - W,
                arr[i][1],
                arr[i][2],

                arr[i][0] + W,
                arr[i][1],
                arr[i][2],
            ])
        } else if (arr[i + 1]) {
            console.log(arr[i-1], arr[i], arr[i+1])
            v1.x = arr[i][0] - arr[i-1][0]
            v1.y = arr[i][1] - arr[i-1][1]
            v1.normalize()
            const angle1 = v1.angle()

            v2.x = arr[i+1][0] - arr[i-1][0]
            v2.y = arr[i+1][1] - arr[i-1][1]
            v2.normalize()
            const angle2 = v2.angle()

            //const an = v1.angle



            console.log('v1', v1.x, v1.y)
            console.log('v2', v2.x, v2.y)
            console.log('ang1', angle1, 'ang2', angle2)
            console.log('---------------------------------------')
            //const diff1 = arr[i][0] - arr[i-1][0]
            //const diff2 = arr[i + 1][0] - arr[i-1][0]
            //const angle = ()



        }
    }

    return arr
}


export const createSystemArrows = (root, data) => {
    //console.log(root)
    //console.log(data['arrow01'])

    //const arrPoints = prepareArrPoints(data['arrow01'].geometry.attributes.position.array)
    //const arrGeometryPoints = prepareArrGeometryPoints(arrPoints)

    //console.log(arrPoints)




    return {}
}