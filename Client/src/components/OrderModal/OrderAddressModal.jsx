import React from 'react';
import { openOrHideModal } from '../../hooks/OpenOrHideModal';

const OrderAddressModal = ({ address, setAddress }) => {


  const handleAddAddress = (e) => {
    e.preventDefault();
    openOrHideModal();
    

  }

  return (
    <div className="orderaddress-modal modal" >
      <form
        className="modal-form"
        id="add-todo"
        onSubmit={(e) => handleAddAddress(e)}
      >
        <label htmlFor="address" className='poppins-medium' style={{ fontSize: "1.2rem" }}>Order Address : </label>
        <textarea name="address" id="address" placeholder='Add City,Street No.,Nearest LandMark etc.' value={address} onChange={(e) => {setAddress(e.target.value) }} style={{ padding: ".5rem .7rem", fontSize: "1.1rem" }} required></textarea>

        <button type="submit" className="update-qty poppins-regular" >Add Address</button>
      </form>
      <i
        className="fa-solid fa-xmark cross-icon"
        onClick={openOrHideModal}
      ></i>
    </div>
  )
}

export default OrderAddressModal;