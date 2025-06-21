import React, { useState } from "react";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Overlay from "ol/Overlay";
import "ol/ol.css";

const Location = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleLocationSubmit = () => {
    if (latitude && longitude) {
      const newMap = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([parseFloat(longitude), parseFloat(latitude)]),
          zoom: 10,
        }),
      });
      setMap(newMap);

      const markerElement = document.createElement("div");
      markerElement.className = "marker";
      setMarker(
        new Overlay({
          element: markerElement,
          position: fromLonLat([parseFloat(longitude), parseFloat(latitude)]),
          positioning: "center-center",
        })
      );
      newMap.addOverlay(marker);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col space-y-4 md:w-1/2">
        <label htmlFor="latitude">Latitude:</label>
        <input
          id="latitude"
          type="text"
          value={latitude}
          onChange={handleLatitudeChange}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <label htmlFor="longitude">Longitude:</label>
        <input
          id="longitude"
          type="text"
          value={longitude}
          onChange={handleLongitudeChange}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <button
          onClick={handleLocationSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Get Location
        </button>
      </div>
      <div
        id="map"
        className="flex-grow md:w-1/2"
        style={{ width: "100%", height: "400px" }}
      ></div>
    </div>
  );
};

export default Location;
