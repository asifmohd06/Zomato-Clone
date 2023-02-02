import {
  Home,
  RestaurantCreateForm,
  CreateMenu,
  RegisterForm,
} from "./components";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addrestaurant" element={<RestaurantCreateForm />} />
      <Route path="/createmenu" element={<CreateMenu />} />
      <Route path="/clients/register" element={<RegisterForm />} />
    </Routes>
  );
};

export default App;
