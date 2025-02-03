import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveSearchHistory, setSelectedPlace } from "reducers/placeSlice";

import styles from "./SearchBar.module.css";
import { debounce } from "lodash";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Google Places API once the script has loaded
    if (window.google) {
      const input = document.getElementById("place-search");
      const autocomplete = new window.google.maps.places.Autocomplete(input);

      autocomplete.addListener("place_changed", () =>
        handlePlaceChange(autocomplete, dispatch)
      );
    }
  }, []);

  const handlePlaceChange = debounce((autocomplete, dispatch) => {
    const place = autocomplete.getPlace();

    if (place.geometry) {
      const placeObject = {
        name: place.name,
        address: place.formatted_address,
        lat: place.geometry.location?.lat(),
        lng: place.geometry.location?.lng(),
        favorite: false,
      };

      dispatch(setSelectedPlace(placeObject));
      dispatch(saveSearchHistory(placeObject));
    } else {
      console.log("Place details not available");
    }
  }, 250);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <TextField
        id="place-search"
        label="Search for a place"
        variant="outlined"
        value={searchInput}
        onChange={handleInputChange}
        fullWidth
      />
    </div>
  );
};

export default SearchBar;
