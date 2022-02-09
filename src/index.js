import { showStartButton } from './ui/hideStartScreen'
import { createStudio } from './entities/Studio'
import { createKeyBoard } from './utils/createKeyBoard'
import { createEventEmitter } from './utils/createEventEmitter'
import { createLoadManager } from './helpers/LoadManager'
//import { createPlayer } from './entities/Player'
import { createCamera } from './entities/Camera'
import { startFrameUpater } from './utils/createFrameUpater'
//import { createProjector } from './helpers/Projector'



const root = {}



/** INIT  ***********************************************************/


const initApp = () => {
  root.emitter = createEventEmitter()
  root.frameUpdater = startFrameUpater(root.emitter)
  root.keyBoard = new createKeyBoard(root.emitter)

  root.studio = createStudio(root.emitter)
  root.studio.initScene()

  //const player = createPlayer(emitter)
  //player.init()

  //studio.addToScene( player.getObj() )
  //studio.setCamera( player.getCamera() )


  root.camMovies = createCamera(root)
  root.studio.setCamera(root.camMovies.camera)

  root.loadManager = new createLoadManager(root.emitter)

  root.emitter.subscribe('loadingComplete', assets => {
    root.studio.createLevelFromAssets(assets)

    showStartButton()

    //const cone = createProjector(player.getCamera(), assets['scene'])
    //studio.addToScene(cone)
  })

  root.loadManager.startLoad()
}


window.addEventListener('load', initApp)

