import * as THREE from 'three'
//import { MapControls }  from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls }  from 'three/examples/jsm/controls/OrbitControls'

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


    emitter.subscribe('frameUpdate', () => {
        controls.update();
    })


    // document.addEventListener("click", () => {
    //     console.log(camera.position, controls.target)
    // })

    return {
        camera,
    } 
}