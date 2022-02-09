import '../assets/progress-img.png'
import '../assets/icon-map.png'

import sceneSrc from '../assets/interier/scene.FBX'
import view1Src from '../assets/interier/001.jpg'
import view2Src from '../assets/interier/002.jpg'
import view3Src from '../assets/interier/003.jpg'
import view4Src from '../assets/interier/004.jpg'



export const ASSETS_TO_LOAD = [
    {
        type: 'fbx',
        filename: sceneSrc,
        key: 'scene'
    },
    {
        type: 'img',
        filename: view1Src,
        key: 'view1'
    },
    {
        type: 'img',
        filename: view2Src,
        key: 'view2'
    },
    {
        type: 'img',
        filename: view3Src,
        key: 'view3'
    },
    {
        type: 'img',
        filename: view4Src,
        key: 'view4'
    },

]