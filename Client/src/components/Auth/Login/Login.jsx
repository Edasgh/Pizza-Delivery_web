import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_BASE_URL } from "../../../rootExports";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tId = toast.loading("Logging you in...");
    try {
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

      const json = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", json.token);
        toast.update(tId, {
          render: "Logged in successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1800,
          closeButton: true,
        });
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1800);
      } else if (response.status === 400) {
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
      }
    } catch (error) {
      toast.update(tId, {
        render: "Error : Something Went Wrong!",
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

  const [isShown, setIsShown] = useState(false);

  // This function is called when the checkbox is checked or unchecked
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  const oauthLogin = async ({ provider, email }) => {
    if (provider === "google") {
      let tId = toast.loading("Logging you in....");
      try {
        const response = await fetch(
          `${BACKEND_BASE_URL}/api/user/login_via_google`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          }
        );
        console.log(response);
        const resp = await response.json();
        if (response.status === 200) {
          localStorage.setItem("token", resp.token);
          toast.update(tId, {
            render: "Logged in Successfully!",
            type: "success",
            isLoading: false,
            autoClose: 1000,
            closeButton: true,
          });
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (response.status === 401) {
          toast.error(resp.message, { autoClose: 950 });
          setTimeout(() => {
            navigate("/signup");
          }, 1500);
        } else {
          throw new Error("Something went wrong!");
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
    } else if (provider === "github") {
      const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
      const redirectUri = `${import.meta.env.VITE_CLIENT_BASE_URL}/login`; // Change to your actual redirect URI
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    }
  };

  useEffect(() => {
    console.log("Checking for OAuth code in URL...");
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const func = async () => {
        let tId = toast.loading("Logging you in....");
        try {
          const response = await fetch(
            `${BACKEND_BASE_URL}/api/user/getGhUser`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                code: code,
              }),
            }
          );
          const resp = await response.json();
          if (response.status === 200) {
            localStorage.setItem("token", resp.token);
            toast.update(tId, {
              render: "Logged In Successfully!",
              type: "success",
              isLoading: false,
              autoClose: 2000,
              closeButton: true,
            });
            navigate(`/`);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (response.status === 401) {
            toast.error("User doesn't exist!", { autoClose: 950 });
            setTimeout(() => {
              navigate(`/signup`);
            }, 1500);
          } else {
            throw new Error("Something went wrong!");
          }
        } catch (error) {
          toast.update(tId, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 2000,
            closeButton: true,
          });
        }
      };

      func();
    }
  }, []);

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

          <p
            style={{
              textAlign: "center",
            }}
          >
            Or Continue With
          </p>

          <div
            className="form-flex"
            style={{
              gap: "15px",
              justifyContent: "center",
            }}
          >
            <GoogleLogin
              type="icon"
              theme="filled_black"
              onSuccess={async (e) => {
                const email = jwtDecode(e.credential).email;
                await oauthLogin({ provider: "google", email: email });
              }}
              onError={(e) => console.log(e)}
            />
            <button
              type="button"
              onClick={async () => {
                await oauthLogin({ provider: "github", email: "" });
              }}
              style={{
                cursor: "pointer",
                padding: ".05rem .5rem",
                fontSize: "1.5rem",
                backgroundColor: "white",
                borderRadius: ".4rem",
                border: "1.8px solid black",
                color: "black",
              }}
            >
              <i className="fa-brands fa-github"></i>
            </button>
            <button
            type="button"
              style={{
                cursor: "pointer",
                padding: ".05rem .5rem",
                fontSize: "1.5rem",
                backgroundColor: "white",
                borderRadius: ".4rem",
                border: "1.8px solid black",
                color: "blue",
              }}
            >
              <i className="fa-brands fa-facebook"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
