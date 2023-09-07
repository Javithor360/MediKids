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
  Profile_Photo_Name: null,
  Birthdate: null,
  jwtToken: null,
  Email_Verify_code: null,
}

//! Configure actions of the Slice.
const responsibleSlice = createSlice({
  name: 'responsible',
  initialState,
  reducers: {
    setLogginValues: (state, action) => {
      const {FirstNames, LastNames, Email, Phone, DUI, Age, ProfilePhotoUrl, Birthdate, jwtToken, Email_Verify_code } = action.payload;
      state.FirstNames = FirstNames; 
      state.LastNames = LastNames;
      state.Email = Email;
      state.Phone = Phone;
      state.DUI = DUI;
      state.Age = Age;
      state.ProfilePhotoUrl = ProfilePhotoUrl;
      state.Birthdate = Birthdate;
      state.jwtToken = jwtToken;
      state.Email_Verify_code = Email_Verify_code;
    },
    changePerfilPhoto: (state, action) => {
      const {ProfilePhotoUrl, Profile_Photo_Name} = action.payload;
      state.ProfilePhotoUrl = ProfilePhotoUrl;
      state.Profile_Photo_Name = Profile_Photo_Name;
    }
  }
});

//! Exporting Actions
export const { setLogginValues, changePerfilPhoto } = responsibleSlice.actions;
//! Exporting reducer
export default responsibleSlice.reducer;