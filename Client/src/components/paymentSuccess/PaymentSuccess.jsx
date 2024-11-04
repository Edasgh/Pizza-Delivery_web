import React from 'react'
import "./PaymentSuccess.css";
import { useNavigate, useSearchParams } from "react-router-dom"


const PaymentSuccess = () => {
  const navigate = useNavigate();
  const seachQuery = useSearchParams()[0]

  const referenceNum = seachQuery.get("reference")
  return (
    <div className='payment-success'>
      <div className="payment-success-card">
        <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
          <i className="checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>Order Placed !</p>
        {referenceNum && (

          <p className='poppins-medium'>OrderId : {referenceNum}</p>
        )}
        <br />
        <p className='redirect' style={{fontSize:".9rem",cursor:"pointer",color:"darkblue"}}  onClick={()=>{navigate("/profile_dashboard/orders")}} >Go to Orders</p>
      </div>
    </div>
  )
}

export default PaymentSuccess;