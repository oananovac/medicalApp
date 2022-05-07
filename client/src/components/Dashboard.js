import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import PatientDashboard from "./PatientDashboard";
import Sidebar from "./Sidebar";
import Appointments from "./Appointments";

const Dashboard = (props) => {
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
            <div className="row">
              <div class="col-sm-3" style={{ padding: "0px" }}>
                <Sidebar />
              </div>
              <div class="col-9" style={{ padding: "10px" }}>
                {props.route === "dashboard" && <PatientDashboard />}
                {props.route === "appointments" && <Appointments />}
              </div>
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
