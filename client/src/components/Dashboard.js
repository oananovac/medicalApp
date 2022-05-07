import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import PatientDashboard from "./PatientDashboard";

const Dashboard = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      {user !== null ? (
        <div>
          {user.roles.includes("admin") ? (
            <div>Dashboard 1</div>
          ) : (
            <div>
              <PatientDashboard />
            </div>
          )}
        </div>
      ) : (
        <div>Dashboard 3</div>
      )}
    </div>
  );
};

export default Dashboard;
