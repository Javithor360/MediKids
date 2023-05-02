import { createSlice } from "@reduxjs/toolkit";

//! Configurate the initial state of the Slice
const initialState = {
  Email: null,
  State: 0,
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
    }
  }
});

//! Exporting Actions
export const { setStatement } = starterSlice.actions;
//! Exporting reducer
export default starterSlice.reducer;