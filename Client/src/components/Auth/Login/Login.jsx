import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_BASE_URL } from "../../../rootExports";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tId = toast.loading("Logging you in...");
    const response = await fetch(`${BACKEND_BASE_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    if (response.status === 400) {
      toast.update(tId, {
        render: "Error : Invalid email or password!",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        closeButton: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.token);
        toast.update(tId, {
          render: "Logged in successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeButton: true,
        });
        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 1800);
      }
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [isShown, setIsShown] = useState(false);

  // This function is called when the checkbox is checked or unchecked
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };
  return (
    <>
      <div className="main-div">
        <h1 className="section-title poppins-semibold">Log In to continue</h1>
        <form onSubmit={handleSubmit} className="login-signup-form">
          <input
            type="email"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            required
          />

          <input
            type={isShown ? "text" : "password"}
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
            placeholder="Enter your password"
            minLength={8}
            required
          />

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="passcheck"
              checked={isShown}
              onChange={togglePassword}
            />
            &nbsp;
            <label className="form-check-label" htmlFor="passcheck">
              Show Password
            </label>
          </div>
          <hr />
          <div className="form-flex">
            <Link to="/forgot_password">Forgot Password?</Link>
            <p>
              Don't have an account ? <Link to="/signup"> Create here</Link>
            </p>
          </div>
          <button type="submit" id="login-btn">
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
