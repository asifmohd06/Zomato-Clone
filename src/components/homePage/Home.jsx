import React from "react";
import { Header, Hero, Getapp, Options, Footer } from ".";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Getapp />
      <Options />
      <Footer />
      <ToastContainer
        autoClose={2000}
        closeButton={false}
        hideProgressBar={true}
        pauseOnHover={false}
        style={{}}
      />
    </div>
  );
};

export default Home;
