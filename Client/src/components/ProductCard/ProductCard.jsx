import React from 'react';
import toppingImg from "../../assets/veg-toppings.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const ProductCard = ({ product, variants}) => {
  const deleteProduct = async (productId) => {

    try {
      await axios.delete(`http://localhost:8080/api/product/${productId}/delete`,
      {
        headers:{
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem("token")
        }
      }
    
    );
      alert("Product Deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }

  }
  const navigate = useNavigate();
  return (
    <div className="profile-content" style={{ width: "90%", margin: "0 auto" }}>
      <div className='cart-card' style={{ width: "100%" }}>

        <img src={product.image!==" "?product.image:toppingImg} alt="cart-p" className='cart-img' style={{ cursor: "pointer" }} onClick={() => { navigate(`/${product._id}/product`) }} />
        <div className="item-details">
          <ul type="none" className='poppins-light'>
            <li><span className="poppins-medium">Name : </span> {product.name[0].toUpperCase() + product.name.substring(1)}</li>
            <li><span className="poppins-medium">Category : </span>{product.category}</li>
            <hr />
            {(variants && variants.length !== 0) && (
              <>
              <li className='poppins-medium'>Variants : </li>
               {variants.map((variant)=>(
              <li key={variant._id} ><span className="poppins-medium">{variant.name} : </span>({variant.price}rs)</li>
               ))}
              </>
              )}
            <hr />
            <li><span className="poppins-medium">Quantity : </span>{product.quantity}</li>
            <li><span className="poppins-medium price">Price : </span>{product.price}rs</li>
          </ul>
        </div>
        <div className="buttons-container" style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <button className="update-product poppins-medium" title='Update Product' onClick={() => { navigate(`/profile_dashboard/${product._id}/edit_product`) }}>Update Product&nbsp;&nbsp;<i className="fa-solid fa-pen-to-square"></i></button>
          <button className="delete-product poppins-medium" title='Delete Product' onClick={() => { deleteProduct(product._id) }} >Delete Product&nbsp;&nbsp;<i className="fa-solid fa-trash-can bin-icon"></i></button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;