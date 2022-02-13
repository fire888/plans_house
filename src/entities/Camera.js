import * as THREE from 'three'
import { OrbitControls }  from 'three/examples/jsm/controls/OrbitControls'

export const createCamera = (root) => {
    const { studio, emitter } = root


    //const camera = new THREE.OrthographicCamera( window.innerWidth / - 35, window.innerWidth / 35, window.innerHeight / 35, window.innerHeight / -35, 0, 100000 );
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 )
    camera.position.set(-20, 20, 20)
    camera.lookAt(new THREE.Vector3())


    const controls = new OrbitControls( camera, studio.getRenderer().domElement );
    controls.maxPolarAngle = Math.PI / 2
    controls.target.set( 0, 0, -15);
    controls.update();
    controls.enablePan = true;
    controls.enableDamping = true;
    //controls.autoRotate = true
    //controls.autoRotateSpeed = 0.2


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