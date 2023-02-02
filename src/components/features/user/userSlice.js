import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  city: "kollam",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCity: (state, { payload }) => {
      state.city = payload;
    },
  },
});
export const { setCity } = userSlice.actions;
export default userSlice.reducer;
