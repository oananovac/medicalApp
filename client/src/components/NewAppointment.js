import axios from "axios";
import React from "react";
import { useGlobalContext } from "../context/GlobalContext";

const NewAppointment = () => {
  const { addAppointment } = useGlobalContext();
  const [content, setContent] = React.useState("");
  const [service, setService] = React.useState("");
  const [datePick, setDatePick] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/appointments/new", {
        content: content,
        service: "service",
        datePick: datePick,
      })
      .then((res) => {
        console.log(res.data);
        setContent("");
        setService("");
        setDatePick("");

        // Add Appointment
        addAppointment(res.data);
      });
  };

  return (
    <div className="card-body justify-content-center">
      <form className="new-appointment-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            required
          />
        </div>

        <div className="form-group mt-2">
          <label for="exampleFormControlSelect1">Example select</label>
          <select
            class="form-control"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option>Cardiology</option>
            <option>Dermatology</option>
            <option>Oftalmology</option>
            <option>Gynaecology</option>
            <option>Neurology</option>
          </select>
        </div>
        <div class="form-group mt-3">
          <label>Select date</label>

          <input
            class="form-control"
            onChange={(e) => setDatePick(e.target.value)}
            type="date"
            required
          ></input>
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Submit
        </button>
      </form>

      <p>Selector: {typeof datePick}</p>
    </div>
  );
};

export default NewAppointment;
