import { createSlice } from "@reduxjs/toolkit";

//\\ LANGUAJE SETTINGS:
//? True = Spanish
//? False = English

//! Configurate the initial state of the Slice
const initialState = {
  Email: null,
  State: null,
  StatusBarColor: '#fff',
  Language: true,
}

//! Configure actions of the Slice.
const starterSlice = createSlice({
  name: 'stater',
  initialState,
  reducers: {
    setStatement: (state, action) => {
      const {Email, State} = action.payload;
      state.Email = Email;
      state.State = State;
    },
    ChangeSBColor: (state, action) => {
      state.StatusBarColor = action.payload;
    },
    ChangeStarterEmail: (state, action) => {
      state.Email = action.payload;
    },
    ChangeLanguages: (state, action) => {
      state.Language = action.payload;
    }
  }
});

//! Exporting Actions
export const { setStatement, ChangeSBColor, ChangeStarterEmail, ChangeLanguages } = starterSlice.actions;
//! Exporting reducer
export default starterSlice.reducer;