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

// Firebase
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

const CreateARSectionBeta4 = () => {
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

  const auth = getAuth();
  const db = getFirestore();

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [altitude, setAltitude] = useState(0);
  const [objectName, setObjectName] = useState("");
  const [objectCode, setObjectCode] = useState("");
  const [objectDescription, setObjectDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated");
      return;
    }

    if (!longitude || !latitude) {
      alert("Please select a location on the map.");
      return;
    }

    if (!objectName.trim()) {
      alert("Please enter a name for your object.");
      return;
    }

    setIsLoading(true);

    try {
      // Changed from balloonId to geoiteId
      const geoiteId = uuidv4();
      const timestamp = Date.now();

      const data = {
        altitude: altitude || 0,
        // Changed from balloon_id to geoite_id
        geoite_id: geoiteId,
        //balloon_string_length: 1.0,
        geoite_string_length: 1.0,
        color: color,
        created: timestamp,
        geohash: null,
        last_user_pop: null,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        num_popped: 0,
        object_name: objectName.trim(),
        object_code: objectCode.trim(),
        object_description: objectDescription.trim(),
        popped_until: 0,
        tile_z12_xy_hash: "3241#1915",
        tile_z13_xy_hash: "6482#3831",
        tile_z14_xy_hash: "12965#7662",
        tile_z15_xy_hash: "25931#15325",
        tile_z16_xy_hash: "51863#30650",
        user_id: user.uid || "",
      };

      // Changed collection name from "balloons" to "geoites"
      await addDoc(collection(db, "geoites"), data);

      alert("AR data uploaded successfully!");
      console.log("Data uploaded");

      // Reset form fields
      setLongitude("");
      setLatitude("");
      setColor("#ffffff");
      setAltitude(0);
      setObjectName("");
      setObjectCode("");
      setObjectDescription("");
    } catch (error) {
      console.error("Error uploading data: ", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="w-full lg:w-2/3 h-80 sm:h-auto lg:h-120 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative ">
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
              Location of your AR Object
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="object-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Object Name
                </label>
                <input
                  type="text"
                  id="object-name"
                  value={objectName}
                  onChange={(e) => setObjectName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 py-1 px-3"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="object-code"
                  className="leading-7 text-sm text-gray-600"
                >
                  Object Code
                </label>
                <input
                  type="text"
                  id="object-code"
                  value={objectCode}
                  onChange={(e) => setObjectCode(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 py-1 px-3"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="object-description"
                  className="leading-7 text-sm text-gray-600"
                >
                  Object Description
                </label>
                <textarea
                  id="object-description"
                  value={objectDescription}
                  onChange={(e) => setObjectDescription(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 py-1 px-3"
                  rows="3"
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
                  type="number"
                  step="any"
                  id="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Input here for Longitude"
                  className="w-full bg-white rounded border border-gray-300 py-1 px-3"
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
                  type="number"
                  step="any"
                  id="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Input here for Latitude"
                  className="w-full bg-white rounded border border-gray-300 py-1 px-3"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="altitude"
                  className="leading-7 text-sm text-gray-600"
                >
                  Altitude
                </label>
                <input
                  type="number"
                  id="altitude"
                  value={altitude}
                  onChange={(e) => setAltitude(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 py-1 px-3"
                />
              </div>
              {/* <div className="relative mb-4">
                <label
                  htmlFor="color"
                  className="leading-7 text-sm text-gray-600"
                >
                  Color
                </label>
                <input
                  type="color"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full"
                />
              </div> */}
              <button
                type="submit"
                className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                disabled={isLoading}
              >
                Submit
              </button>
              {isLoading && <p>Loading...</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateARSectionBeta4;
