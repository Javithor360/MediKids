import { createSlice } from "@reduxjs/toolkit";

//! Configurate the initial state of the Slice
const initialState = {
  //? Otorrino values
  OtorrinoState: null,
  Otorrino_Appmt_id: null,
  Otorrino_Doctor_id: null,
  Otorrino_Week: null,
  Otorrino_Description: null,
  Otorrino_Date: null,
  Otorrino_Hour: null,

  //? Neumo Values
  NeumoState: null,
  Neumo_Appmt_id: null,
  Neumo_Doctor_id: null,
  Neumo_Week: null,
  Neumo_Description: null,
  Neumo_Date: null,
  Neumo_Hour: null,

  //? Gastro Values
  GastroState: null,
  Gastro_Appmt_id: null,
  Gastro_Doctor_id: null,
  Gastro_Week: null,
  Gastro_Description: null,
  Gastro_Date: null,
  Gastro_Hour: null,
}

//! Configure actions of the Slice.
const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    ChangeOtorrinoState: (state, action) => {
      state.OtorrinoState = action.payload;
    },
    ChangeOtorrinoValues: (state, action) => {
      const {Otorrino_Appmt_id, Otorrino_Doctor_id, Otorrino_Week, Otorrino_Description, Otorrino_Date, Otorrino_Hour} = action.payload;
      state.Otorrino_Appmt_id = Otorrino_Appmt_id;
      state.Otorrino_Doctor_id = Otorrino_Doctor_id;
      state.Otorrino_Week = Otorrino_Week;
      state.Otorrino_Description = Otorrino_Description;
      state.Otorrino_Date = Otorrino_Date;
      state.Otorrino_Hour = Otorrino_Hour;
    },
    ChangeNeumoState: (state, action) => {
      state.NeumoState = action.payload;
    },
    ChangeNeumoValues: (state, action) => {
      const {Neumo_Appmt_id, Neumo_Doctor_id, Neumo_Week, Neumo_Description, Neumo_Date, Neumo_Hour} = action.payload;
      state.Neumo_Appmt_id = Neumo_Appmt_id;
      state.Neumo_Doctor_id = Neumo_Doctor_id;
      state.Neumo_Week = Neumo_Week;
      state.Neumo_Description = Neumo_Description;
      state.Neumo_Date = Neumo_Date;
      state.Neumo_Hour = Neumo_Hour;
    },
    ChangeGastroState: (state, action) => {
      state.GastroState = action.payload;
    },
    ChangeGastroValues: (state, action) => {
      const {Gastro_Appmt_id, Gastro_Doctor_id, Gastro_Week, Gastro_Description, Gastro_Date, Gastro_Hour} = action.payload;
      state.Gastro_Appmt_id = Gastro_Appmt_id;
      state.Gastro_Doctor_id = Gastro_Doctor_id;
      state.Gastro_Week = Gastro_Week;
      state.Gastro_Description = Gastro_Description;
      state.Gastro_Date = Gastro_Date;
      state.Gastro_Hour = Gastro_Hour;
    },
    ResetAppmtState: (state, action) => {
      //* Otorrino values
      state.OtorrinoState = null;
      state.Otorrino_Appmt_id = null;
      state.Otorrino_Doctor_id = null;
      state.Otorrino_Week = null;
      state.Otorrino_Description = null;
      state.Otorrino_Date = null;
      state.Otorrino_Hour = null;

      //* Neumo Values
      state.NeumoState = null;
      state.Neumo_Appmt_id = null;
      state.Neumo_Doctor_id = null;
      state.Neumo_Week = null;
      state.Neumo_Description = null;
      state.Neumo_Date = null;
      state.Neumo_Hour = null;

      //* Gastro Values
      state.GastroState = null;
      state.Gastro_Appmt_id = null;
      state.Gastro_Doctor_id = null;
      state.Gastro_Week = null;
      state.Gastro_Description = null;
      state.Gastro_Date = null;
      state.Gastro_Hour = null;
    }
  }
});

//! Exporting Actions
export const { ChangeOtorrinoState, ChangeOtorrinoValues, ChangeNeumoState, ChangeNeumoValues, ChangeGastroState, ChangeGastroValues, ResetAppmtState } = appointmentsSlice.actions;
//! Exporting reducer
export default appointmentsSlice.reducer;