import React from "react";
import "./Card.css";
import { Link, useNavigate } from "react-router-dom";
import vegToppingImg from "../../assets/veg-toppings.jpg";



const Card = ({ product }) => {
  const navigate = useNavigate();
 
  return (
    <Link className="link" to={(product.product_type == 0)?`/${product._id}/product`:`/`} >
      <div className="card">
        <div className="images">
          {(product.image!==" ") ?(
          <img src={product.image} alt={product.name} className="mainImg" />
          ):(
            <img src={vegToppingImg} alt={product.name} className="mainImg" />
          )}
     
        </div>
        <h2>{product.name[0].toUpperCase() + product.name.substring(1)}</h2>
        <div className="prices">
          <h3 className="oldPrice">{product.price + 150}rs</h3>
          <h3 className="price">{product.price}rs</h3>
        </div>
        {(product.product_type == 0) && (
          <div className="button-container">
            <button onClick={() => { navigate(`/${product._id}/product`) }}
              className="add-to-cart card-btn poppins-semibold" title="add to cart" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".6rem", fontSize: "1rem" }}>
              ORDER NOW
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;