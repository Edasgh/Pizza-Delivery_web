import React from "react";
import errorImg from "../assets/error-pic.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={errorImg} alt="404-Error" style={{ width: "500px" }} />
      <p style={{ color: "var(--text-colora)", fontSize: "1.5rem" }}>
        Page Not Found!
      </p>
      <button
        style={{
          fontWeight: "500",
          fontSize: "1.15rem",
          lineHeight: "20px",
          background: " #FF4820",
          border: "2px solid #FF4820",
          padding: " 1rem 2rem",
          color: "var(--text-colorb)",
          cursor: "pointer",
          outline: "none",
          borderRadius: " .5rem",
        }}
      >
        <Link to="/" style={{
          display:"flex",
          gap:"10px",
          justifyContent:"center",
          alignItems:"center"
        }}>
          <i className="fa-solid fa-pizza-slice" style={{fontSize:"2rem"}} ></i> Go Back
        </Link>
      </button>
    </div>
  );
};

export default ErrorPage;
