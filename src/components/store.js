import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import formSlice from "./features/Form/formSlice";
import clientsSlice from "./features/clients/clientsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    form: formSlice,
    client: clientsSlice,
  },
});

export default store;
