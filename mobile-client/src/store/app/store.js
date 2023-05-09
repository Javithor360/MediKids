import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import starterReducer from "../slices/starterSlice";
import responsibleReducer from "../slices/responsibleSlice";

const store = configureStore({
  //! Parts of the store (reducers)
  reducer: {
    starter: starterReducer,
    responsible: responsibleReducer,
  },
  //* CONFIGURATING MIDDLEWARE TO ENABLE CONNECTION WITH REACT NAVIGATION.
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;