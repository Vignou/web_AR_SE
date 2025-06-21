import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const MapPin = ({ text }) => <div className="pin">{text}</div>;

const CreateARDataUploadSection = () => {
  const [clickedLocation, setClickedLocation] = useState(null);

  const handleClick = ({ lat, lng }) => {
    setClickedLocation({ lat, lng });
    console.log(`Clicked location - Latitude: ${lat}, Longitude: ${lng}`);
  };

  return (
    <section className="map-section">
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
          defaultZoom={12}
          onClick={handleClick}
        >
          {clickedLocation && (
            <MapPin
              lat={clickedLocation.lat}
              lng={clickedLocation.lng}
              text="📍"
            />
          )}
        </GoogleMapReact>
      </div>
    </section>
  );
};

export default CreateARDataUploadSection;
