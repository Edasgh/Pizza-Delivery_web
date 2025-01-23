import React from "react";
import "./NavLoading.css";

const NavLoading = () => {
  return (
    <div className="skeleton-navbar">
      <div className="skeleton-header"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
    </div>
  );
};

export default NavLoading;
