import React, { useRef, useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat, toLonLat } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";

const MapComponent = () => {
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    const pinStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: "https://cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png",
      }),
    });

    map.on("click", (event) => {
      const { coordinate } = event;
      const lonLat = toLonLat(coordinate);
      setCoordinates(lonLat);
      vectorSource.clear();
      const iconFeature = new Feature({
        geometry: new Point(coordinate),
      });
      iconFeature.setStyle(pinStyle);
      vectorSource.addFeature(iconFeature);
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div className="w-full h-96" ref={mapRef}>
      {coordinates && (
        <div>
          Longitude: {coordinates[0]} Latitude: {coordinates[1]}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
