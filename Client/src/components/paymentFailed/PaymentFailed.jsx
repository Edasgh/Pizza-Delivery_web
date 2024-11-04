import React from 'react';
import "./PaymentFailed.css";
import { useNavigate } from 'react-router-dom';




const PaymentFailed = () => {
  const navigate=useNavigate();
 
  return (
    <div className='payment-failed'>
    <div className="payment-failed-card">
      <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
        <i className="error">!</i>
      </div>
      <h1>Payment Failed</h1>
      <p className='redirect' style={{cursor:"pointer"}} onClick={()=>{navigate("/profile_dashboard/cart")}} >try again</p>
    </div>
  </div>
  )
}

export default PaymentFailed