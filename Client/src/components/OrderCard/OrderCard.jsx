import React, { useState } from 'react';
import { orderStatusArr } from '../../data';
import OrderItem from '../OrderItem/OrderItem';


const OrderCard = ({ items, totalPrice, address, isAdmin, orderStatus, order,  userId }) => {
  const customerId = order.customerId;

  const creationDate = new Date(order.createdAt).toDateString();
  const updationDate = new Date(order.updatedAt).toDateString();



  const [ordersts, setOrdersts] = useState(orderStatus);




  const deleteOrder = async () => {
    const response = await fetch(`http://localhost:8080/api/order/delete_order/${order._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      }
    });
    await response.json();
    if (response.status == 200) {
      alert("Order deleted successfully!");
      window.location.reload();
    } else {
      alert("Something went wrong!")
    }
  }

  const updateOrderStatus = async () => {
    const response = await fetch(`http://localhost:8080/api/order/${order._id}/update_status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        status: ordersts
      })
    });
    await response.json();
    if (response.status == 201) {
      alert("Order status updated successfully!");
      window.location.reload();
    } else {
      alert("Something went wrong!")
    }
  }

  return (
    <div className="profile-content" style={{ width: "80%", margin: "0 auto" }}>
      {isAdmin == true && (
        <>

          <span className="poppins-semibold user" style={{ fontSize: "1.2rem"}}>Ordered By : <br/>(userId:{customerId})</span>
          <br />
          <hr />
          <br />
        </>
      )}

      <h2 className="poppins-semibold">Items :</h2>
      <br />
      <div className='order-card'>

        {items && items.map((item) => (
          <OrderItem key={item._id} item={item} extraOptions={item.extraOptions}/>
        ))}


      </div>
      <br />
      <hr />
      <div className="flex-container" style={{ margin: "1rem" }}>
        <div className="total-price-div" style={{ fontSize: "1.7rem" }} >
          <p className='poppins-semibold' style={{ color: "var(--text-colora)" }}>Total Price : </p>
          <p className='poppins-bold' style={{ color: "var(--color-view)" }}>{totalPrice}rs</p>
        </div>

        <div className="user-address" style={{ width: "12rem", padding: ".7rem", border: "1px solid grey" }}>
          <span className='poppins-medium' style={{ fontSize: "1.3rem" }}>Address :</span>
          <p style={{ color: "var(--text-colora)", fontSize: "1.1rem" }}>{address}</p>
        </div>

        <div className="buttons-container order-card-btn-container" style={{ display: "flex", flexDirection: "column" }}>
          {isAdmin == true && (<div className="update-status">
            <label htmlFor={`order-status-${order._id}`}>Order Status : </label>
            <select name="order-status" id={`order-status-${order._id}`} value={ordersts} onChange={(e) => { setOrdersts(e.target.value); }}>

              <option value={0}>{orderStatusArr[0]}</option>
              <option value={1}>{orderStatusArr[1]}</option>
              <option value={2}>{orderStatusArr[2]}</option>
              <option value={3}>{orderStatusArr[3]}</option>
            </select>
            &nbsp;
            <button className="update-status poppins-medium" style={{ cursor: "pointer" }} onClick={updateOrderStatus}>Update Status</button>
          </div>)}

          {customerId == userId && (

            <button className="delete-order poppins-medium" title='Delete order' onClick={deleteOrder} >Delete Order&nbsp;&nbsp;<i className="fa-solid fa-trash-can bin-icon"></i></button>
          )}
          <button className="status poppins-medium" title='Order Placed'>Order Placed on {creationDate}</button>
          <button className="status poppins-medium" title={`${orderStatusArr[orderStatus]}`}>{orderStatusArr[orderStatus]} on {updationDate}</button>
        </div>
      </div>
    </div>
  )
}

export default OrderCard;