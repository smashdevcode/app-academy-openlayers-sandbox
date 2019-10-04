import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Circle from 'ol/geom/Circle';
// import Point from 'ol/geom/Point';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSMSource from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import getBenches from './data';

(async () => {
  const astoria = [-73.921306, 40.761751];

  const baseMapLayer = new TileLayer({
    source: new OSMSource(),
  });

  const map = new Map({
    target: 'map',
    layers: [baseMapLayer],
    view: new View({
      center: fromLonLat(astoria),
      zoom: 12,
    }),
  });

  const benches = await getBenches();

  const markers = benches.map(({ id, latitude, longitude }) => {
    // Adding a marker on the map.
    const marker = new Feature({
      geometry: new Circle(
        fromLonLat([longitude, latitude]),
        200,
      ),
    });

    // Set the marker's ID to the bench ID.
    marker.setId(id);

    return marker;
  });

  const vectorSource = new VectorSource({
    features: markers,
  });

  const markerVectorLayer = new VectorLayer({
    source: vectorSource,
  });

  map.addLayer(markerVectorLayer);

  map.on('click', (event) => {
    const coord = event.coordinate;

    if (map.hasFeatureAtPixel(event.pixel) === true) {
      const features = map.getFeaturesAtPixel(event.pixel);
      const id = features[0].getId();
      const benchDetailsUrl = `/Benches/Details/${id}`;
      console.log(benchDetailsUrl);
      // location.href = benchDetailsUrl;
      return;
    }

    const [lon, lat] = toLonLat(coord);
    const benchCreateUrl = `/Benches/Create?longitude=${lon}&latitude=${lat}`;
    console.log(benchCreateUrl);
    // location.href = benchCreateUrl;
  });
})();
