
import Studio from './js/Studio'
import KeyBoard from './js/utils/keyBoard'
import { createEventEmitter } from './js/utils/Emitter'
import LoadManager from './js/LoadManager'
import Player from './js/Player'
import { startFrameUpater } from './js/utils/FrameUpater'
import Projector from './js/Projector'

let emitter, studio, loadManager, player,  projector

/** INIT  ***********************************************************/

const initApp = () => {
  emitter = createEventEmitter()
  startFrameUpater(emitter)
  new KeyBoard(emitter)

  studio = Studio(emitter)
  studio.initScene()

  player = Player( emitter )
  player.init()

  studio.addToScene( player.getObj() )
  studio.setCamera( player.getCamera() )

  loadManager = new LoadManager( emitter )

  emitter.subscribe('loadingComplete', assets => {
    studio.createLevelFromAssets(assets)


    initButtonsCamera()
    showStartButton()

    const cone = Projector(player.getCamera(), assets['scene'])
    studio.addToScene(cone)
  })

  loadManager.startLoad()
}




// CHANGE VIEWS /////////////////////////////////////////////////////////


const initButtonsCamera = () => {
  let butt1 = document.querySelector('.c1')
  butt1.addEventListener('mouseup', () => {
    setView('PhysCamera001')
  })
  let butt2 = document.querySelector('.c2')
  butt2.addEventListener('mouseup', () => {
    setView('PhysCamera002')
  })
  let butt3 = document.querySelector('.c3')
  butt3.addEventListener('mouseup', () => {
    setView('PhysCamera003')
  })
  let butt4 = document.querySelector('.c4')
  butt4.addEventListener('mouseup', () => {
    setView('PhysCamera004')
  })
}






// START UI //////////////////////////////////////////////////////////


/** ANIMATION LOADER */

const loader = document.querySelector('.progress')
let offsetLoader = -100
let isAnimateLoader = true

const loaderTimeOut = () => {
  if (!isAnimateLoader) {
    return
  }
  setTimeout(() => {
    offsetLoader ++;
    if (offsetLoader == 0 ) {
      offsetLoader = -100
    }
    loader.style.marginLeft = offsetLoader + '%'
    loaderTimeOut() 
  }, 100)
}

loaderTimeOut()

const startButton = document.querySelector('.start')
const progressWrapper = document.querySelector('.load-wrapper')
const showStartButton = () => {
  startButton.style.display = 'inline'
  startButton.addEventListener('click', hideStartScreen)
  progressWrapper.style.display = 'none'
}

const hideStartScreen = () => {
  isAnimateLoader = false
  let startScreen = document.querySelector('.start-screen')
  startScreen.style.display = 'none'
}


window.addEventListener('load', initApp)

