//import '../stylesheet/mapboxStyle.css';
//import '../stylesheet/style.css';


import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { coordsWorldToModel } from '../helpers/transformCoords'

export const createMapBox = root => {
   mapboxgl.accessToken = 'pk.eyJ1IjoicG9yb2toIiwiYSI6ImNrenR6bmcyaDE4bXMybm9oazRqbzRtZ3QifQ.EeCsGe4nGvXW0Qw7OmVAOg';
   const map = new mapboxgl.Map({
        container: 'mapbox-wrapper',
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [37.760494, 55.683285, ],
        zoom: 18,
        
    })

    map.on('mousemove',  e => {
        const c = map.getCenter() 
        //console.log(c)
        const modelCoolds = coordsWorldToModel(c.lng, c.lat)
        root.emitter.emit('changeModelCamToCoord', modelCoolds) 
        //console.log()
    })

    return {}
}
