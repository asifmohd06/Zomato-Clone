import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./features/header/headerSlice";
import userSlice from "./features/user/userSlice";
import formSlice from "./features/Form/formSlice";
import clientsSlice from "./features/clients/clientsSlice";

const store = configureStore({
  reducer: {
    header: headerSlice,
    user: userSlice,
    form: formSlice,
    client: clientsSlice,
  },
});

export default store;
