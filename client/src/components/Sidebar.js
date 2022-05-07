import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar">
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link
            className="btn btn-toggle align-items-center rounded collapsed nav-link link-dark"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className="btn btn-toggle align-items-center rounded collapsed nav-link link-dark "
            to="/Appointments"
          >
            Appointments
          </Link>
        </li>
        <li>
          <Link
            className="btn btn-toggle align-items-center rounded collapsed nav-link link-dark "
            to="/Prescriptions"
          >
            Prescriptions
          </Link>
        </li>

        <li>
          <Link
            className="btn btn-toggle align-items-center rounded collapsed nav-link link-dark "
            to="/Profile"
          >
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
