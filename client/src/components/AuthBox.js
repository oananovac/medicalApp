import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";

const AuthBox = ({ register }) => {
  const { getCurrentUser, user } = useGlobalContext();
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (user && navigate) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {};

    if (register) {
      data = { email, name, password, confirmPassword };
    } else {
      data = { email, password };
    }

    axios
      .post(register ? "/api/auth/register" : "/api/auth/login", data)
      .then(() => {
        getCurrentUser();
      })
      .catch((err) => {
        setLoading(false);

        if (err?.response?.data) {
          setErrors(err.response.data);
        }
      });
  };
  return (
    <div class="auth row">
      <div class="col-md-6 col-lg-4 col">
        <div class="card">
          <div class="card-body">
            <h1 className="loginTitle">{register ? "Register" : "Login"}</h1>

            <form onSubmit={onSubmit}>
              {register && (
                <div class="form-group">
                  <label className="mt-2" for="name">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="form-control"
                    name="name"
                  />

                  {errors.name && <p class="auth_error">{errors.name}</p>}
                </div>
              )}

              <div class="form-group">
                <label className="mt-2" for="email">
                  Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p class="auth_error">{errors.email}</p>}
              </div>
              <div class="form-group">
                <label className="mt-2" for="password">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="form-control"
                  name="password"
                />
                {errors.password && <p class="auth_error">{errors.password}</p>}
              </div>
              {register && (
                <div class="form-group">
                  <label className="mt-2" for="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    class="form-control"
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && (
                    <p class="auth_error">{errors.confirmPassword}</p>
                  )}
                </div>
              )}
              <div class="authFooter">
                {Object.keys(errors).length > 0 && (
                  <p className="auth_err">
                    {register
                      ? "You have some validation errors"
                      : errors.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  class="submitBtn btn btn-primary w-100"
                >
                  {register ? "Register" : "Login"}
                </button>
                {!register ? (
                  <p className="auth_msg">
                    Not a member? <Link to="/register">Register now</Link>
                  </p>
                ) : (
                  <p className="auth_msg">
                    Not a member? <Link to="/">Log in</Link>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBox;
