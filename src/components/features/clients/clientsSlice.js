import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  userName: "",
  email: "",
  clientToken: "",
};
const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setUserName: (state, { payload }) => {
      state.userName = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    resetUser: (state) => {
      state.userName = "";
      state.email = "";
      window.localStorage.removeItem("clientToken");
    },
    setClientToken: (state, { payload }) => {
      state.clientToken = payload;
    },
  },
});

export default clientSlice.reducer;
export const { setEmail, setUserName, resetUser, setClientToken } =
  clientSlice.actions;
