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

import MapComponent from "./MapComponent";

const CreateARSection = () => {
  //Map
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
    // Old but work
    // map.on("click", (event) => {
    //   const { coordinate } = event;
    //   const lonLat = toLonLat(coordinate);
    //   setCoordinates(lonLat);
    //   vectorSource.clear();
    //   const iconFeature = new Feature({
    //     geometry: new Point(coordinate),
    //   });
    //   iconFeature.setStyle(pinStyle);
    //   vectorSource.addFeature(iconFeature);
    // });

    map.on("click", (event) => {
      const { coordinate } = event;
      const lonLat = toLonLat(coordinate);
      setCoordinates(lonLat);
      setLongitude(lonLat[0].toFixed(6));
      setLatitude(lonLat[1].toFixed(6));
      vectorSource.clear();
      const iconFeature = new Feature({
        geometry: new Point(coordinate),
      });
      iconFeature.setStyle(pinStyle);
      vectorSource.addFeature(iconFeature);
    });

    return () => map.setTarget(undefined);
  }, []);

  //FOr the form part
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  // Function to handle input changes
  // const handleLongitudeChange = (event) => {
  //   const value = event.target.value;
  //   setLongitude(value);

  //   // If the longitude value is valid, update the map coordinates
  //   if (!isNaN(value) && value !== "" && coordinates) {
  //     setCoordinates([parseFloat(value), coordinates[1]]);
  //   }
  // };

  // const handleLatitudeChange = (event) => {
  //   const value = event.target.value;
  //   setLatitude(value);

  //   // If the latitude value is valid, update the map coordinates
  //   if (!isNaN(value) && value !== "" && coordinates) {
  //     setCoordinates([coordinates[0], parseFloat(value)]);
  //   }
  // };

  return (
    <div>
      {/* <!-- source https://tailblocks.cc/ --> */}
      <section className="text-gray-600 body-font relative">
        {/* <div className="container px-5 py-24 mx-auto grid sm:grid-cols-1 gap-8">
          <div className="w-full h-96" ref={mapRef}>
            {coordinates && (
              <div>
                Longitude: {coordinates[0]} Latitude: {coordinates[1]}
              </div>
            )}
          </div> */}
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <div
              className="absolute inset-0"
              style={{
                width: "100%",
                height: "100%",
              }}
              ref={mapRef}
            >
              {coordinates && (
                <div>
                  Longitude: {coordinates[0]} Latitude: {coordinates[1]}
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col w-full py-8">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Location of your AR
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              Post-ironic portland shabby chic echo park, banjo fashion axe
            </p>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="longitude"
                className="leading-7 text-sm text-gray-600"
              >
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                value={longitude}
                onChange={() => {}} // Prevent user input
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="latitude"
                className="leading-7 text-sm text-gray-600"
              >
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={latitude}
                onChange={() => {}} // Prevent user input
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-600"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
              Button
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Chicharrones blog helvetica normcore iceland tousled brook viral
              artisan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateARSection;
