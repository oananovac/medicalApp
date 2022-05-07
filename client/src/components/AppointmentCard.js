import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const AppointmentCard = ({ appointment }) => {
  const [content, setContent] = React.useState(appointment.content);
  const [service, setService] = React.useState(appointment.service);
  const [date, setDate] = React.useState(appointment.date);

  const [editing, setEditing] = React.useState(false);
  const input = React.useRef(null);
  const navigate = useNavigate();
  const { removeAppointment, completeAppointment, updateAppointment } =
    useGlobalContext();

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

  const editAppointment = (e) => {
    e.preventDefault();

    axios
      .put(`/api/appointments/${appointment._id}`, {
        content: content,
        service: service,
        date: date,
      })
      .then((res) => {
        updateAppointment(res.data);
        setEditing(false);
      })
      .catch(() => {
        stopEditing();
      });
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
      <select
        class="form-control"
        value={service}
        onChange={(e) => setService(e.target.value)}
        required
        disabled={!editing}
      >
        <option>Cardiology</option>
        <option>Dermatology</option>
        <option>Oftalmology</option>
        <option>Gynaecology</option>
        <option>Neurology</option>
      </select>

      <input
        class="form-control"
        value={date}
        disabled={!editing}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        required
      ></input>
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
            <button
              onClick={editAppointment}
              className="control-buttons btn btn-success"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
