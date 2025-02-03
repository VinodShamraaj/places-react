import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { DEFAULT_ZOOM } from "common/constants/coordinates";
import styles from "./MapViewer.module.css";

const MapViewer = () => {
  const mapRef = useRef(null);
  const selectedPlace = useSelector((state) => state.places.selectedPlace);

  const lat = selectedPlace.lat;
  const lng = selectedPlace.lng;
  const locationName = selectedPlace.name;

  useEffect(() => {
    if (window.google && lat && lng) {
      // Initialize the map
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: DEFAULT_ZOOM, // Adjust zoom level as needed
      });

      // Create a marker at the given lat/lng
      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: locationName, // You can change the title if needed
      });
    }
  }, [lat, lng]); // Re-run when lat or lng change

  return (
    <div className={styles.wrapper}>
      <div className={styles.map} ref={mapRef} />
    </div>
  );
};

export default MapViewer;
