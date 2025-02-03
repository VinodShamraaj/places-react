import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
  DEFAULT_LOCATION_NAME,
} from "common/constants/coordinates";

const initialState = {
  places: [],
  selectedPlace: {
    name: DEFAULT_LOCATION_NAME,
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  searchHistory: [],
};

const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
    addSeachHistory: (state, action) => {
      state.searchHistory.push(action.payload);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    setSearchFavorite: (state, action) => {
      const { index, newData } = action.payload;

      // Set the favorite value for 1 search history item
      if (index >= 0 && index < state.searchHistory.length) {
        state.searchHistory[index] = {
          ...state.searchHistory[index],
          favorite: newData,
        };
      }
      console.log(index, newData);
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
  },
});

export const saveSearchHistory = (place) => async (dispatch) => {
  try {
    console.log("hi");
    let placeObject = { ...place };

    // Check if place is already favorited
    const query = await axios.get(
      `http://localhost:8080/favorite/${place.name}`
    );

    if (query.data.data) {
      placeObject.favorite = true;
    }
    await dispatch(addSeachHistory(placeObject));
  } catch (error) {
    console.error("Error saving favorite:", error);
  }
};

export const saveFavorite = (index, place) => async (dispatch) => {
  try {
    let placeObject = { ...place };
    delete placeObject.favorite;
    const response = await axios.post(
      "http://localhost:8080/favorite/new",
      placeObject
    );

    if (!response.error) {
      console.log("i here");
      dispatch(setSearchFavorite({ index, newData: true }));
    }
  } catch (error) {
    console.error("Error saving favorite:", error);
  }
};

export const {
  setSelectedPlace,
  addSeachHistory,
  clearSearchHistory,
  setSearchFavorite,
  setPlaces,
} = placeSlice.actions;

export default placeSlice.reducer;
