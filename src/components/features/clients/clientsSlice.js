import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientId: "",
  city: "",
  userName: "",
  email: "",
};
const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClientId: (state, { payload }) => {
      state.clientId = payload;
    },
    setUserName: (state, { payload }) => {
      state.userName = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    resetUser: (state) => {
      console.log("reseted");
      state.clientId = "";
      state.city = "";
      state.userName = "";
      state.email = "";
    },
  },
});

export default clientSlice.reducer;
export const { setClientId, setEmail, setUserName, resetUser } =
  clientSlice.actions;
