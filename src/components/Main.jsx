import React from "react";
import { Home } from "./homePage";
import {
  RestaurantCreateForm,
  CreateMenu,
  RegisterForm,
  ClientLoginForm,
} from "./forms";
import NotFound from "./NotFound";
import { useSelector } from "react-redux";
import LocationSearchResultPage from "../components/pages/searchResultPage/LocationSearchResultPage";
import ClientsHome from "./clients/ClientsHome";
import { Routes, Route } from "react-router-dom";

const Main = () => {
  const { clientToken } = useSelector((store) => store.client);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/location/:id" element={<LocationSearchResultPage />} />
      <Route
        path="/addrestaurant"
        element={clientToken ? <RestaurantCreateForm /> : <ClientLoginForm />}
      />
      <Route
        path="/editrestaurant/:id"
        element={clientToken ? <RestaurantCreateForm /> : <ClientLoginForm />}
      />
      <Route
        path="/createmenu"
        element={clientToken ? <CreateMenu /> : <ClientLoginForm />}
      />
      <Route
        path="/clients/register"
        element={clientToken ? <Home /> : <RegisterForm />}
      />
      <Route
        path="/clients/login"
        element={clientToken ? <Home /> : <ClientLoginForm />}
      />
      <Route
        path="/clients/home"
        element={clientToken ? <ClientsHome /> : <ClientLoginForm />}
      />
      <Route
        path="/clients/restaurants/:id/menu/:menuId/edit"
        element={clientToken ? <CreateMenu /> : <ClientLoginForm />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Main;
