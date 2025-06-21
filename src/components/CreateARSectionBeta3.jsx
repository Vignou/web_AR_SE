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

//firebase
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

import { v4 as uuidv4 } from "uuid";

import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import MapComponent from "./MapComponent";

const CreateARSectionBeta3 = () => {
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

  //COMMAND FOR NOW!!
  // const [longitude, setLongitude] = useState("");
  // const [latitude, setLatitude] = useState("");

  //

  //upload data
  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore();

  const [name, setName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [file, setFile] = useState(null);

  //for not filling and alert
  const [nameError, setNameError] = useState("");
  const [longitudeError, setLongitudeError] = useState("");
  const [latitudeError, setLatitudeError] = useState("");
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated");
      return;
    }

    // if (!name || !longitude || !latitude || !file) {
    //   alert("Please fill in all fields");
    //   return;
    // }

    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!longitude) {
      setLongitudeError("Longitude is required");
      isValid = false;
    } else {
      setLongitudeError("");
    }

    if (!latitude) {
      setLatitudeError("Latitude is required");
      isValid = false;
    } else {
      setLatitudeError("");
    }

    if (!file) {
      setFileError("File is required");
      isValid = false;
    } else {
      setFileError("");
    }

    if (!isValid) {
      return;
    }

    // Generate a UUID for the file
    const uniqueId = uuidv4();

    const storageRef = ref(storage, `arObjects/${uniqueId}_${file.name}`);
    try {
      // Upload file to Firebase Storage
      const uploadResult = await uploadBytes(storageRef, file);
      //alert("File uploaded to Firebase Storage");

      // Get the download URL for the uploaded file
      const fileUrl = await getDownloadURL(uploadResult.ref);

      // Save a new document in Firestore with the file URL and UUID
      await addDoc(collection(db, "arObjects"), {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        name: name,
        longitude: longitude,
        latitude: latitude,
        fileUrl: fileUrl, // Save the file URL for later download
        uniqueId: uniqueId, // Save the UUID
        uploadTime: new Date(), // Add the current time
      });
      console.log("Document added to Firestore");
      alert("Document added to Firestore with file URL");

      // Reset the form fields after successful submission
      setName("");
      setLongitude("");
      setLatitude("");
      setFile(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(`Error adding document: ${error.message}`);
    }
  };

  //First Division of codex
  // const auth = getAuth();
  // const storage = getStorage();
  // const db = getFirestore();

  // const [name, setName] = useState("");
  // const [longitude, setLongitude] = useState("");
  // const [latitude, setLatitude] = useState("");
  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const user = auth.currentUser;
  //   if (!user) {
  //     console.error("User not authenticated");
  //     return;
  //   }

  //   const storageRef = ref(storage, `arObjects/${file.name}`);
  //   try {
  //     //upload file
  //     //await uploadBytes(storageRef, file);
  //     //const fileUrl = await getDownloadURL(storageRef); // Use getDownloadURL to get the file URL

  //     await addDoc(collection(db, "arObjects"), {
  //       userId: user.uid,
  //       userName: user.displayName,
  //       userEmail: user.email,
  //       name: name,
  //       longitude: longitude,
  //       latitude: latitude,
  //       //fileUrl: fileUrl,
  //     });
  //     console.log("Document added to Firestore");
  //     // Reset the form fields after successful submission
  //     setName("");
  //     setLongitude("");
  //     setLatitude("");
  //     setFile(null);
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }
  // };

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

  // 3D model preview:

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
            <form className="add-obj" onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {nameError && (
                  <p className="text-red-500 text-xs mt-1">{nameError}</p>
                )}
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="longitude"
                  className="leading-7 text-sm text-gray-600"
                >
                  Longitude
                </label>
                <p
                  id="longitude"
                  className={`w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none py-1 px-3 leading-8 ${
                    longitude ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {longitude || "Longitude's Coordinates"}
                </p>
                {longitudeError && (
                  <p className="text-red-500 text-xs mt-1">{longitudeError}</p>
                )}
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="latitude"
                  className="leading-7 text-sm text-gray-600"
                >
                  Latitude
                </label>
                <p
                  id="latitude"
                  className={`w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none py-1 px-3 leading-8 ${
                    latitude ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {latitude || "Latitude's Coordinates"}
                </p>
                {latitudeError && (
                  <p className="text-red-500 text-xs mt-1">{latitudeError}</p>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="file-upload"
                  className="leading-7 text-sm text-gray-600"
                >
                  Upload File
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full bg-white rounded focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out"
                />
                {fileError && (
                  <p className="text-red-500 text-xs mt-1">{fileError}</p>
                )}
              </div>

              <button className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                Submit
              </button>
            </form>

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

export default CreateARSectionBeta3;
