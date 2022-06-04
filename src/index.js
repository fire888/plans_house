
import { showStartButton, hideStartScreen } from './ui/hideStartScreen'
import { createStudio } from './entities/Studio'
//import { createKeyBoard } from './utils/createKeyBoard'
import { createEventEmitter } from './utils/createEventEmitter'
import { createLoadManager } from './helpers/LoadManager'
//import { createPlayer } from './entities/Player'
import { createCamera } from './entities/Camera'
import { startFrameUpater } from './utils/createFrameUpater'
//import { createProjector } from './helpers/Projector'
import { ASSETS_TO_LOAD } from './constants/constants_assetsToLoad'
import { createSystemAllAssets } from './systems/system_AllAssets'
import { createSystemLabels } from './systems/system_Labels'
import { createSystemArrows } from './systems/system_Arrows'
import { createButtons } from './ui/pathButtons'
import { createFloorsButtons } from './ui/floorsButtons'
// import { createMapBox } from './systems/system_MapBox'
import { createActions } from './actions/actions'


const root = {}



/** INIT  ***********************************************************/


const initApp = () => {
  root.actions = createActions(root)
  root.emitter = createEventEmitter()
  root.frameUpdater = startFrameUpater(root.emitter)

  root.studio = createStudio(root.emitter)
  root.studio.initScene()


  root.camMovies = createCamera(root)
  root.studio.setCamera(root.camMovies.camera)

  root.loadManager = new createLoadManager()
  root.loadManager.startLoad(ASSETS_TO_LOAD).then(assets => {

    root.system_assets = createSystemAllAssets(root)
    root.system_assets.createLevel(assets)

    const labelsData = root.system_assets.getLabels()
    root.system_labels = createSystemLabels(root, labelsData, assets)

    const arrowData = root.system_assets.getArrows()
    root.system_arrows = createSystemArrows(root, arrowData)
    //root.system_mapbox = createMapBox(root)

    hideStartScreen()

    const buttons = createButtons(root)
    const floorsButtons = createFloorsButtons(root)
    //const cone = createProjector(player.getCamera(), assets['scene'])
    //studio.addToScene(cone)
  })
}


window.addEventListener('load', initApp)

