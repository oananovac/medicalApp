import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import AppointmentCard from "./AppointmentCard";

const Appointments = () => {
  const { user, completeAppointments, incompleteAppointments } =
    useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
      <div className="incomplete">
        <h1> Upcoming Appointments:</h1>
        {incompleteAppointments ? (
          <div className="incomplete_item">
            {incompleteAppointments.map((app) => (
              <AppointmentCard
                appointment={app}
                key={app._id}
              ></AppointmentCard>
            ))}
          </div>
        ) : (
          <div>fese</div>
        )}
      </div>
      <div className="complete">
        <h1> Past Appointments:</h1>
        {completeAppointments ? (
          <div className="complete_item">
            {completeAppointments.map((app) => (
              <AppointmentCard
                appointment={app}
                key={app._id}
              ></AppointmentCard>
            ))}
          </div>
        ) : (
          <div>{completeAppointments}</div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
