import { createSlice } from "@reduxjs/toolkit";

//! Configurate the initial state of the Slice
const initialState = {
  FirstNames: null,
  LastNames: null,
  Email: null,
  Phone: null,
  DUI: null,
  Age: null,
  ProfilePhotoUrl: null,
  Birthdate: null,
  jwtToken: null,
}

//! Configure actions of the Slice.
const responsibleSlice = createSlice({
  name: 'responsible',
  initialState,
  reducers: {
    setLogginValues: (state, action) => {
      const {FirstNames, LastNames, Email, Phone, DUI, Age, ProfilePhotoUrl, Birthdate, jwtToken } = action.payload;
      state.FirstNames = FirstNames; 
      state.LastNames = LastNames;
      state.Email = Email;
      state.Phone = Phone;
      state.DUI = DUI;
      state.Age = Age;
      state.ProfilePhotoUrl = ProfilePhotoUrl;
      state.Birthdate = Birthdate;
      state.jwtToken = jwtToken;
    },
    changePerfilPhoto: (state, action) => {
      state.ProfilePhotoUrl = action.payload;
    }
  }
});

//! Exporting Actions
export const { setLogginValues, changePerfilPhoto } = responsibleSlice.actions;
//! Exporting reducer
export default responsibleSlice.reducer;