import * as THREE from 'three'
//import { MapControls }  from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls }  from 'three/examples/jsm/controls/OrbitControls'
import { createLinear } from '../helpers/tween'

export const createCamera = (root) => {
    const { studio, emitter } = root

    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 )
    camera.position.set(-29.816084694518594, 37.56959911831361, 68.69331442722498)
    camera.lookAt(new THREE.Vector3())


    //const controls = new MapControls(camera, studio.getRenderer().domElement)
    const controls = new OrbitControls(camera, studio.getRenderer().domElement)
    controls.target.set( 5.255829852135569,  4.056251097977843, -17.17613067124444)

    controls.minDistance = 10
    controls.maxDistance = 150
    controls.maxPolarAngle = Math.PI / 2


    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
    }

    let tween = null

    emitter.subscribe('frameUpdate', () => {
        if (tween) {
            tween()
        }
        controls.enabled && controls.update();
    })




    const flyByPath = (points, callback) => {
        for (let i = 0; i < points.length; ++i) {
            points[i][1] += 1.5
        }

        controls.enabled = false

        const rotateTo = (p, callback) => {
            const currentQ = new THREE.Quaternion();
            currentQ.copy(camera.quaternion)
            camera.lookAt(...p)
            const targetQ = new THREE.Quaternion()
            targetQ.copy(camera.quaternion)
            camera.quaternion.copy(currentQ)

            if (targetQ.equals(currentQ)) {
                return void callback()
            }

            tween = createLinear(500, val => {
                 camera.quaternion.slerpQuaternions(currentQ, targetQ, val)
                 if (val === 1) {
                     tween = null
                     callback()
                 }
            })
        }

        const moveTo = (p, callback) => {
            const vCamStart = new THREE.Vector3().copy(camera.position)
            const vCamEnd = new THREE.Vector3().fromArray(p)

            tween = createLinear(500, val => {
                camera.position.lerpVectors(vCamStart, vCamEnd, val)
                if (val === 1) {
                    tween = null
                    callback()
                }
            })
        }

        const iterate = ind => {
            if (!points[ind + 1]) {
                controls.target.set(...points[ind])
                controls.enabled = true
                callback()
                return;
            }

            const copyP = [...points[ind + 1]]
            copyP.y += 3

            rotateTo(copyP, () => {
                if (points[ind + 2]) {
                    moveTo(copyP, () => {
                        iterate(++ind)
                    })
                } else {
                    iterate(++ind)
                }
            })
        }

        iterate(0)
    }

    return {
        camera,
        flyByPath,
    } 
}


// /** camera movie ****************************/
// const vCamStart = new THREE.Vector3()
// const vCamEnd = new THREE.Vector3()
//
// const vTargetStart = new THREE.Vector3()
// const vTargetEnd = new THREE.Vector3()
//
// const createTween = (camPos, targetPos, time) => {
//     vCamStart.copy(camera.position)
//     vCamEnd.fromArray(camPos)
//
//     vTargetStart.copy(vTarget)
//     vTargetEnd.fromArray(targetPos)
//
//     tween = createLinear(time)
// }
// const updateTween = () => {
//     tween(val => {
//         camera.position.lerpVectors(vCamStart, vCamEnd, val)
//         vTarget.lerpVectors(vTargetStart, vTargetEnd, val)
//         camera.lookAt(vTarget)
//         if (val === 1) {
//             tween = null
//             currentPosKey = targetPosKey
//             onCompleteTween && onCompleteTween()
//         }
//     })
// }