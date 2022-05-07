import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Header = () => {
  const { user, logout } = useGlobalContext();
  const { pathname } = useLocation();
  return (
    <div className="main-header">
      {/* <div className="main-header__inner">
        <div className="main-header__right">
          <Link className="appointmentsLink" to="/">
            Appointments
          </Link>
        </div>
        <div className="main-header__left">
          <button className="btn btn-outline-info">Logout</button>
        </div>
      </div> */}
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand nav-brand" href="/dashboard">
          <img
            src="../images/medical-symbol.png"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          MedicalApp
        </a>
        {pathname !== "/" && pathname !== "/register" ? (
          <div className="links-info ms-auto">
            <Link className="appointmentsLink m-2" to="/about">
              About us
            </Link>
            <Link className="appointmentsLink m-2" to="/services">
              Our Services
            </Link>
            <Link className="appointmentsLink m-2" to="/team">
              Team
            </Link>
            <Link className="appointmentsLink m-2" to="/contact">
              Contact
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        {user ? (
          <button className="btn btn-outline-primary" onClick={logout}>
            Logout
          </button>
        ) : pathname === "/" ? (
          <Link to="/register" className="btn btn-outline-primary">
            Register
          </Link>
        ) : (
          <Link to="/" className="btn btn-outline-primary">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};
export default Header;
