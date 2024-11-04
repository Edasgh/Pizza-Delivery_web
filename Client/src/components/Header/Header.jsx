import React, { useEffect, useState } from 'react'
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {

  const headerBG =
    "https://images.pexels.com/photos/5175556/pexels-photo-5175556.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load";

  return (
    <>
      <div className="header-part">
        <div className="header_text">
          <div className='header_text-container'>
            <h1 className="heading poppins-bold">THE BEST PIZZA IN TOWN!</h1>
            <p className="header-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
              in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <button className='header-btn'>
            <Link to="/">
              Order Now
            </Link>
          </button>
        </div>
        <div className="container" style={{ position: "relative", zIndex: "-99" }}>
          <div style={{ backgroundImage: `url(${headerBG})` }}></div>

        </div>
      </div>
    </>
  )
}

export default Header;