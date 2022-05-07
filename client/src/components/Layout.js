import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import AuthBox from "./AuthBox";
import Dashboard from "./Dashboard";
import { useGlobalContext } from "../context/GlobalContext";

const Layout = () => {
  const { fetchingUser } = useGlobalContext();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<AuthBox />} />
        <Route path="/register" element={<AuthBox register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myAppointments" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
