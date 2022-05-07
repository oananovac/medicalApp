import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const AppointmentCard = ({ appointment }) => {
  const [content, setContent] = React.useState(appointment.content);
  const [editing, setEditing] = React.useState(false);
  const input = React.useRef(null);
  const navigate = useNavigate();
  const { removeAppointment, completeAppointment } = useGlobalContext();

  const onEdit = (e) => {
    e.preventDefault();

    setEditing(true);
    input.current.focus();
  };

  const stopEditing = (e) => {
    if (e) {
      e.preventDefault();
    }

    setEditing(false);
    setContent(appointment.content);
  };

  const deleteAppointment = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`/api/appointments/${appointment._id}`)
        .then(() => removeAppointment(appointment));
    }
  };

  const markAsComplete = (e) => {
    e.preventDefault();
    axios
      .put(`/api/appointments/${appointment._id}/complete`)
      .then((res) => completeAppointment(res.data));
  };

  return (
    <div className="appointmentItem">
      <input
        className="appointmentContent"
        type="text"
        ref={input}
        value={content}
        readOnly={!editing}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="appButtons">
        {!editing ? (
          <>
            {!appointment.completed && (
              <>
                <button
                  className="control-buttons btn btn-success"
                  onClick={onEdit}
                >
                  Edit
                </button>
                <button
                  onClick={markAsComplete}
                  className="control-buttons btn btn-warning"
                >
                  Complete
                </button>
              </>
            )}

            <button
              onClick={deleteAppointment}
              className="control-buttons btn btn-danger"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={stopEditing}
              className="control-buttons btn btn-danger"
            >
              Cancel
            </button>
            <button className="control-buttons btn btn-success">Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
