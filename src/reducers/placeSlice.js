import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  places: [],
  searchResults: [],
  favorites: [],
};

const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
  },
});



// Fetch places from Google API
export const fetchPlaces = (query) => async (dispatch) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
      params: {
        input: query,
        key: process.env.GOOGLE_API_KEY,
      },
    });
    dispatch(setSearchResults(response?.data?.predictions));
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};


// TODO: Implement this with backend
// export const saveFavorite = (place) => async (dispatch) => {
//   try {
//     const response = await axios.post('http://localhost:8080/api/favorites', place);
//     dispatch(addFavorite(response.data));
//   } catch (error) {
//     console.error('Error saving favorite:', error);
//   }
// };

export const { setSearchResults, addFavorite, setPlaces } = placeSlice.actions;

export default placeSlice.reducer;