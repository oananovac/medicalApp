import React from "react";
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({ appointment }) => {
  const [content, setContent] = React.useState(appointment.content);
  const [editing, setEditing] = React.useState(false);
  const input = React.useRef(null);
  const navigate = useNavigate();

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

  return (
    <div className="appointmentItem">
      <input type="checkbox" />
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
              <button
                className="control-buttons btn btn-success"
                onClick={onEdit}
              >
                Edit
              </button>
            )}

            <button className="control-buttons btn btn-danger">Cancel</button>
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
