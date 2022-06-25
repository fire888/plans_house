
import { showStartButton, hideStartScreen } from './ui/hideStartScreen'
import { createStudio } from './entities/Studio'
//import { createKeyBoard } from './utils/createKeyBoard'
import { createEventEmitter } from './utils/createEventEmitter'
import { createLoadManager } from './helpers/LoadManager'
//import { createPlayer } from './entities/Player'
import { createCamera } from './entities/Camera'
import { startFrameUpater } from './utils/createFrameUpater'
import { createProjector } from './helpers/Projector'
import { START_CLICKS_TO_PATH} from './constants/itemsData'
import { ASSETS_TO_LOAD } from './constants/constants_assetsToLoad'
import { createSystemAllAssets } from './systems/system_AllAssets'
import { createSystemLabels } from './systems/system_Labels'
import { createSystemArrows } from './systems/system_Arrows'
import { createButtons } from './ui/pathButtons'
import { createFloorsButtons } from './ui/floorsButtons'
import { createChoiseStartEnd } from './ui/floatChoiseStartEnd'
import { createFlyButton } from './ui/flyButton'
// import { createMapBox } from './systems/system_MapBox'
import { createActions } from './actions/actions'


const root = {}



/** INIT  ***********************************************************/


const initApp = () => {
  root.emitter = createEventEmitter()
  root.frameUpdater = startFrameUpater(root.emitter)

  root.studio = createStudio(root.emitter)
  root.studio.initScene()


  root.camMovies = createCamera(root)
  root.studio.setCamera(root.camMovies.camera)

  root.projector = createProjector()
  root.projector.setCamera(root.camMovies.camera)

  root.loadManager = new createLoadManager()
  root.actions = createActions(root)
  root.loadManager.startLoad(ASSETS_TO_LOAD).then(assets => {

    root.system_assets = createSystemAllAssets(root)
    root.system_assets.createLevel(assets)

    root.projector.setTargets(root.system_assets.getLabs())

    const labelsData = root.system_assets.getLabels()
    root.system_labels = createSystemLabels(root, labelsData, assets)

    const arrowData = root.system_assets.getArrows()
    root.system_arrows = createSystemArrows(root, arrowData)

    //root.system_mapbox = createMapBox(root)

    root.buttons = createButtons(root)
    root.buttons.click(START_CLICKS_TO_PATH[0])
    root.buttons.click(START_CLICKS_TO_PATH[1])
    //root.floorsButtons = createFloorsButtons(root)
    root.choiseStartEnd = createChoiseStartEnd(root)
    root.flyButton = createFlyButton(root)

    hideStartScreen()
  })
}


window.addEventListener('load', initApp)

