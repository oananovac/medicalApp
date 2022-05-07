import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const PatientDashboard = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate]);

  return <div>Helloooo </div>;
};

export default PatientDashboard;
