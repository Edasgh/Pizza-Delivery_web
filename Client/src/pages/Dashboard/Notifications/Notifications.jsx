import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { product_types } from '../../../data';
import { getUserDetails } from '../../../redux/slices/userSlice';
import { fetchProductsBelow20 } from '../../../redux/slices/productsBelow20Slice';

const token = localStorage.getItem("token");

const Notifications = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: user, sts } = useSelector((state) => state.user);


    const { data: productsBelow20, status } = useSelector((state) => state.productsBelow20);



    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else {
            // dispatch(getUserDetails());

            dispatch(fetchProductsBelow20());

        }
    }, [])

    useEffect(()=>{
        if(user.isAdmin!==true){
            navigate("/");
        }
    },[])







    return (
        <>
            {token && (
                <>
                    {(user.isAdmin == true) ? (
                        <>
                            {(productsBelow20 && productsBelow20.length !== 0) ? (
                                <>
                                    {productsBelow20.map((product) => (
                                        <div style={{ display: "flex", gap: ".7rem", justifyContent: "flex-start", alignItems: "center", flexWrap: "wrap" }} key={product._id}>
                                            <p style={{ color: "var(--text-colora)" }}> <span className='poppins-semibold'> {product.name} ({product_types[product.product_type]})</span> :<span style={{ color: "var(--color-primary)" }} className='poppins-medium'> Quantity is below 20 (Quantity : {product.quantity})</span></p>
                                            <button type="button" className='poppins-semibold update-qty' onClick={() => { navigate(`/profile_dashboard/${product._id}/edit_product?quantity=true`) }}>Add Product</button>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <h1 className='poppins-medium'>No Notifications</h1>
                                </>

                            )}
                        </>
                    ) : (
                        <h1 className='poppins-bold'>404 : NOT FOUND!</h1>
                    )}

                </>
            )}
        </>

    )
}

export default Notifications