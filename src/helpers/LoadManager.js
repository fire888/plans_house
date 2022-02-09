import * as THREE from 'three'
// import 'three/examples/js/loaders/OBJLoader'
// import 'three/examples/js/loaders/GLTFLoader'
import 'three/examples/js/loaders/FBXLoader'

const Zlib = require("three/examples/js/libs/inflate.min"); // util for FBX loader
window.Zlib = Zlib.Zlib;


export function createLoadManager (eventEmitter) {

    const assets = {}

    const emitter = eventEmitter
    let objLoader, textureLoader, gltfLoader, fbxLoader

    let index = 0;


    const loadAsset = function (data) {
        if (data.type === 'obj') {
            objLoader.load(data.filename, model => {
                assets[data.key] = model
                checkComplete()        
            })
        }
        if (data.type === 'glb' || data.type === 'gltf') {
            gltfLoader.load(data.filename, model => {
                assets[data.key] = model
                checkComplete()        
            })
        }   
        if (data.type === 'fbx') {
            fbxLoader.load(data.filename, model => {
                assets[data.key] = model 
                checkComplete()      
            })
        }        
        if (data.type === 'img') {
            textureLoader.load(data.filename, model => {
                assets[data.key] = model
                checkComplete()        
            })
        }
    }


    const checkComplete = () => {
        index ++;
        if ( index < assetsToLoad.length ) {
            loadAsset(assetsToLoad[index])
        } else {
            console.log(assets)
            emitter.emit('loadingComplete', assets);
        }
    }


    this.startLoad = function () {
        //objLoader = new THREE.OBJLoader();
        //gltfLoader = new THREE.GLTFLoader();
        textureLoader = new THREE.TextureLoader();
        fbxLoader = new THREE.FBXLoader();
        loadAsset(assetsToLoad[index]);
    } 
}