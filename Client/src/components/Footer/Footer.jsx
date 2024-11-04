import React from 'react';
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate=useNavigate()
  return (
    <>
      <div className="footer">
        <div className='footer-links'>
          <div className='footer-links_main'>
            <p className='footer-logo logo poppins-bold' style={{cursor:"pointer"}}  onClick={()=>{navigate("/")}}>
              <i className="fa-solid fa-pizza-slice footer-pizza-icon"></i> PizzaLand
            </p>
            <p>Crechterwoord K12 182 DK Alknjkcb <br /> <br />
              <Link
                to="tel: 1800 XXX XXXX" style={{ cursor: "pointer" }}><i className="fa-solid fa-phone-volume" style={{ fontSize: "1.4rem" }}></i> 1800 XXX XXXX</Link></p>
            <ul type="none" style={{ display: "flex", gap: "1.1rem", fontSize: "1.88rem", color: "#fff" }}>
              <Link to="#">
                <i className="fa-brands fa-square-facebook"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-square-x-twitter"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-square-instagram"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-youtube"></i>
              </Link>
            </ul>
          </div>
          <div className="footer-links_div">
            <h4>Menu</h4>
            <p><Link to="#veg_pizzas">Veg Pizzas</Link></p>
            <p><Link to="#chicken_pizzas">Chicken Pizzas</Link></p>
            <p><Link to="#pizza_crusts">Pizza Crusts</Link></p>
            <p><Link to="#pizza_toppings">Pizza Toppings</Link></p>
            <p><Link to="/custom_pizza">Customize a Pizza</Link></p>


          </div>
          <div className="footer-links_div">
            <h4>Company</h4>
            <p><Link to="#">Blog</Link></p>
            <p><Link to="/about">About Us</Link></p>
            <p><Link to="#">Investor</Link></p>
            <p><Link to="#">Feedback</Link></p>
            <p><Link to="#">Ads</Link></p>
          </div>
        
          
          <div className="footer-links_div">
            <h4>Legal</h4>
            <p><Link to="#">Disclaimer</Link></p>
            <p><Link to="#">Terms & Conditions</Link></p>
            <p><Link to="#">Privacy Policy</Link></p>
          </div>

        </div>
        <div className="footer-copyright">
          <p>Copyright &copy;2024 PizzaLand. All rights reserved.</p>
        </div>
      </div>



    </>
  )
}

export default Footer