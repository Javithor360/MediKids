import { createSlice } from "@reduxjs/toolkit";

//! Configurate the initial state of the Slice
const initialState = {
  Patient_id: null,
  FirstNames: null,
  LastNames: null,
  Birth_Date: null,
  Age: null,
  Gender: null,
  Blood_Type: null,
  Weight: null,
  Height: null,
  Patient_Code: null,
  Profile_Photo_Url: null,
  Profile_Photo_Name: null,
}

//! Configure actions of the Slice.
const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setInitialValues: (state, action) => {
      const {Patient_id, FirstNames, LastNames, Birth_Date, Age, Gender, Blood_Type, Weight, Height, Patient_Code, Profile_Photo_Url, Profile_Photo_Name} = action.payload;
      state.id = Patient_id;
      state.FirstNames = FirstNames;
      state.LastNames = LastNames;
      state.Birth_Date = Birth_Date;
      state.Age = Age;
      state.Gender = Gender;
      state.Blood_Type = Blood_Type;
      state.Weight = Weight;
      state.Height = Height;
      state.Patient_Code = Patient_Code;
      state.Profile_Photo_Url = Profile_Photo_Url;
      state.Profile_Photo_Name = Profile_Photo_Name;
    },
    changePFPatient: (state, action) => {
      const { Profile_Photo_Url, Profile_Photo_Name} = action.payload;
      state.Profile_Photo_Url = Profile_Photo_Url;
      state.Profile_Photo_Name = Profile_Photo_Name;
    }
  }
})

//! export actions
export const { setInitialValues, changePFPatient } = patientSlice.actions;
//! export reducer
export default patientSlice.reducer;
