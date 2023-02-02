import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchbarOpen: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleSearchbar: (state) => {
      state.isSearchbarOpen = !state.isSearchbarOpen;
    },
  },
});
export const { toggleSearchbar } = headerSlice.actions;
export default headerSlice.reducer;
