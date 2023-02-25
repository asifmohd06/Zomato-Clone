import React from "react";
import { Home, RestaurantCreateForm, CreateMenu, RegisterForm } from "./";
import ClientLoginForm from "./ClientLoginForm";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";

const Main = () => {
  const { clientToken } = useSelector((store) => store.client);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/addrestaurant"
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Main;
