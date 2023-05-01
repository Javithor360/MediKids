import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import starterReducer from "../slices/starterSlice";

const store = configureStore({
  //! Parts of the store (reducers)
  reducer: {
    starter: starterReducer
  },
  //* CONFIGURATING MIDDLEWARE TO ENABLE CONNECTION WITH REACT NAVIGATION.
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;