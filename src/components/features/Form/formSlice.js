import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cityId: "",
  cityName: "",
  restaurantId: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveCityId: (state, { payload }) => {
      state.cityId = payload;
    },
    saveCityName: (state, { payload }) => {
      state.cityName = payload.name;
    },
    saveRestaurantId: (state, { payload }) => {
      console.log(payload);
      state.restaurantId = payload._id;
    },
  },
});
export const { saveCityId, saveCityName, saveRestaurantId } = formSlice.actions;
export default formSlice.reducer;
