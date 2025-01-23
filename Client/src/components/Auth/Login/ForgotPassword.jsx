import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../rootExports";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token");

const ForgotPassword = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  let navigate = useNavigate();

  const [display, setDisplay] = useState("none");
  const [emailDisplay, setEmailDisplay] = useState("initial");

  const verifyEmail = async () => {
    const response = await fetch(`${BACKEND_BASE_URL}/api/user/verify_email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
      }),
    });
    const json = await response.json();
    if (json.success == true) {
      toast.success("Email verified!");
      setEmailDisplay("none");
      setDisplay("initial");
    } else {
      toast.error("Error : No User found with this email!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password == credentials.confirmPassword) {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/user/forgot_password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();
      if (response.status == 201) {
        toast.success("Password changed successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error("Error : An unknown error occurred!");
      }
    } else {
      toast.error("Password and Confirm Password should match!");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [isShown, setIsSHown] = useState(false);

  // This function is called when the checkbox is checked or unchecked
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-center" theme="light" />
      <div className="main-div" style={{ width: "68vw", margin: "auto" }}>
        <h1 className="section-title poppins-semibold form-title">
          Change Your Password
        </h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            style={{ display: emailDisplay }}
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            required
          />

          <button
            type="button"
            id="verify-email-btn"
            onClick={verifyEmail}
            style={{ display: emailDisplay }}
          >
            Verify Email
          </button>

          <input
            type={isShown ? "text" : "password"}
            style={{ display: display }}
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
            placeholder="Enter new Password"
            minLength={8}
            required
          />

          <input
            type={isShown ? "text" : "password"}
            className="form-control"
            style={{ display: display }}
            value={credentials.confirmPassword}
            onChange={onChange}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm new Password"
            minLength={8}
            required
          />

          <div className="form-check">
            <input
              type="checkbox"
              style={{ display: display }}
              className="form-check-input"
              id="passcheck"
              checked={isShown}
              onChange={togglePassword}
            />
            &nbsp;
            <label
              className="form-check-label"
              htmlFor="passcheck"
              style={{ display: display }}
            >
              Show Password
            </label>
          </div>
          <hr />

          <button
            type="submit"
            id="edit-details-btn"
            style={{ display: display }}
          >
            Change Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
