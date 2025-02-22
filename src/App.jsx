import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { Toaster } from "react-hot-toast";

const App = () => {

  return (
    <>
    <Header/>
    <Outlet/>
    <Toaster />
    </>
  );
};

export default App;
