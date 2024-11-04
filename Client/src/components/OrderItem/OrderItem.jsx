import React from 'react';

const OrderItem = ({item,extraOptions}) => {
  return (
    <div className="item-details" style={{cursor:"default"}}>
    <ul type="none">
      <li><span className='poppins-medium'>Name :</span> <span className="poppins-light">{item.name}</span></li>
      <li><span className='poppins-medium'>Category :</span> <span className="poppins-light">{item.category}</span></li>
      <li><span className='poppins-medium'>Variant:</span> <span className="poppins-light">{item.variant.name} ({item.variant.price}rs)</span></li>
      <li><span className='poppins-medium'>Quantity :</span> <span className="poppins-light">{item.quantity}</span></li>
      <li><span className='poppins-medium'>Price :</span> <span className="poppins-light">{item.price}</span></li>
      {(extraOptions && extraOptions.length !== 0) && (
      <>
      <li className='poppins-medium'>ExtraOptions : </li>
       {extraOptions.map((option)=>(
      <li key={option._id} ><span className="poppins-medium">{option.name}({option.category})=&gt; </span>({option.price}rs)</li>
       ))}
      </>
      )}
    </ul>
    
  </div>
  )
}

export default OrderItem