import * as THREE from 'three'
import { OrbitControls }  from 'three/examples/jsm/controls/OrbitControls'

export const createCamera = (root) => {
    const { studio, emitter } = root


    const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 10000 )
    camera.position.set(0, 300, 300)
    camera.lookAt(new THREE.Vector3())


    const controls = new OrbitControls( camera, studio.getRenderer().domElement );
    controls.target.set( 0, 0.5, 0 );
    controls.update();
    //controls.enablePan = false;
    controls.enableDamping = true;


    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
    }


    emitter.subscribe('frameUpdate', () => {
        controls.update();
    })

    return {
        camera,
    } 
}