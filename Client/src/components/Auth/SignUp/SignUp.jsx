import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../rootExports";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tId = toast.loading("Signing you up...");
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          address: credentials.address,
        }),
      });

      if (response.status === 201) {
        toast.update(tId, {
          render: "Signed Up successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
          closeButton: true,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (response.status === 400) {
        toast.update(tId, {
          render: "Error : An unknown error occurred!",
          type: "error",
          isLoading: false,
          autoClose: 1500,
          closeButton: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast.update(tId, {
        render: "Error : An unknown error occurred!",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        closeButton: true,
      });
    } finally {
      setCredentials({ name: "", email: "", password: "", address: "" });
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
  return (
    <>
      <div className="main-div">
        <h1 className="section-title poppins-semibold">
          Sign Up into your account
        </h1>
        <form onSubmit={handleSubmit} className="login-signup-form">
          <input
            type="text"
            value={credentials.name}
            onChange={onChange}
            id="name"
            name="name"
            aria-describedby="name"
            placeholder="Enter your name"
            required
          />
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

          <textarea
            name="address"
            id="address"
            value={credentials.address}
            placeholder="Enter your address"
            onChange={onChange}
            required
          ></textarea>
          <hr />

          <p>
            Already have an account ? <Link to="/login">LogIn</Link>
          </p>

          <button type="submit" id="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
