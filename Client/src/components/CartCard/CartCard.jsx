import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartCard = ({ product , link }) => {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(product?.quantity);

  const updateQty = async () => {
    try {
      await axios.put(`http://localhost:8080/api/product/cart/${product._id}/updateQty`, {
        quantity: quantity,
      },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          }
        }

      );
      alert("Updated Quantity successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }

  }
  const removeFromCart = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/cart/${product._id}/removeFromCart`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          }
        }

      );
      alert("Removed From Cart successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }

  }


  return (
    <div className="profile-content" style={{ width: "90%", margin: "0 auto" }}>
      <div className='cart-card'>
        <div className="item-details" style={{cursor:"pointer"}}   onClick={()=>{if(product?.productId){navigate(link)}else{alert("This is a custom pizza");}}}>
          <ul type="none" className='poppins-light'>
            <li>Name : {product.name}</li>
            <li>Category : {product.category}</li>
            <li>Quantity : {product.quantity}</li>
            <li>Price : {product.price}rs</li>
            {
              product?.extraOptions?.length !== 0 ? (
                <>
                  ExtraOptions :
                  <ul type="none" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: ".3rem" }}>
                    {product.extraOptions.map((option) => (
                      <li key={product.extraOptions.indexOf(option)} >{option.name}({option.category})=-&gt;{option.price}</li>
                    ))}

                  </ul>
                </>
              ) : (

                <>

                </>
              )
            }
            {
              product?.variant ? (
                <>
                  Variant :
                  <ul type="none" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: ".3rem" }}>

                    <li >{product?.variant?.name} : ({product?.variant?.price}rs)</li>


                  </ul>
                </>
              ) : (

                <>

                </>
              )
            }

          </ul>
        </div>
        <div className="buttons-container" style={{display:"flex",flexDirection:"column",gap:".6rem",justifyContent:"flex-start"}}>
          <div className="product-quantity" style={{display:"flex",gap:".7rem",justifyContent:"center",alignItems:"center"}}>
            <button
              className="minus"
              onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
            >
              -
            </button>
            <span style={{fontSize:"1rem"}}>{quantity}</span>
            <button
              className="plus"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
            {/* prev is the element or parameter of the setQuantity here */}
        </div>
          <button className="poppins-medium" title='update quantity' onClick={updateQty} id="update-qty">Update quantity</button>
          <button className="remove poppins-medium" title='remove from cart' onClick={removeFromCart}  >Remove From Cart&nbsp;&nbsp;<i className="fa-solid fa-trash-can bin-icon"></i></button>
          </div>
      </div>
    </div>
  )
}

export default CartCard