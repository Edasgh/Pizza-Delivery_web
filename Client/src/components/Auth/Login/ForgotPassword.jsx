import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../rootExports";
import { toast } from "react-toastify";
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
    let tId = toast.loading("Please wait...");
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/user/verify_email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
          }),
        }
      );

      if (response.status === 200) {
        toast.update(tId, {
          render: "Email verified!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeButton: true,
        });
        setEmailDisplay("none");
        setDisplay("initial");
      } else if (response.status === 401) {
        toast.update(tId, {
          render: "Error : No User found with this email!",
          type: "error",
          isLoading: false,
          autoClose: 1500,
          closeButton: true,
        });
      }
    } catch (error) {
      toast.update(tId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 1500,
        closeButton: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tId = toast.loading("Please wait....");
    try {
      if (credentials.password === credentials.confirmPassword) {
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
        if (response.status === 201) {
          toast.update(tId, {
            render: "Password changed successfully!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
            closeButton: true,
          });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      } else {
        toast.update(tId, {
          render: "Password and Confirm Password should match!",
          type: "error",
          isLoading: false,
          autoClose: 1500,
          closeButton: true,
        });
      }
    } catch (error) {
      toast.update(tId, {
        render: "Error : An unknown error occurred!",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        closeButton: true,
      });
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
