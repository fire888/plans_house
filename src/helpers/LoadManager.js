import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

'three/examples/js/loaders/GLTFLoader'


export function createLoadManager () {

    const assets = {}

    let objLoader, textureLoader, gltfLoader, fbxLoader
    let index = 0
    let onLoad = () => {}
    let ASSETS_TO_LOAD = []


    const checkComplete = () => {
        index ++
        if ( index < ASSETS_TO_LOAD.length ) {
            loadAsset(ASSETS_TO_LOAD[index])
        } else {
            onLoad(assets)
        }
    }

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



    this.startLoad = (ASSETS_DATA) => {
        return new Promise(res => {
            
            ASSETS_TO_LOAD = ASSETS_DATA
            onLoad = res
            index = 0


            objLoader = new OBJLoader();
            gltfLoader = new GLTFLoader();
            textureLoader = new THREE.TextureLoader();
            fbxLoader = new FBXLoader()

            loadAsset(ASSETS_TO_LOAD[index]);
        })
    } 
}