import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./ProfileNav.css";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../redux/slices/userSlice';
import { STATUSES } from '../../../redux/slices/productSlice';
import { fetchProductsBelow20 } from '../../../redux/slices/productsBelow20Slice';

const token = localStorage.getItem("token");

const ProfileNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token) {
      navigate("/login")
    } else {
      dispatch(getUserDetails());
    }
  }, [])

  useEffect(() => {

    dispatch(fetchProductsBelow20());

  }, [])

  const { data: productsBelow20, sts } = useSelector((state) => state.productsBelow20);




  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }



  return (
    <>
      <nav className="profile-nav">
        {(user.isAdmin == true) ? (
          <>
            <h2>Admin Panel</h2>
            <hr />
            <ul type="none">

              <Link to="/profile_dashboard"><li>Profile</li></Link>
              <Link to="/profile_dashboard/notifications"><li>Notifications {productsBelow20.length !== 0 && (<span>({productsBelow20.length})</span>)} </li></Link>
              <Link to="/profile_dashboard/add_product"><li>Create Product</li></Link>
              <Link to="/profile_dashboard/view_products"><li>Products</li></Link>
              <Link to="/profile_dashboard/orders"><li>All Orders</li></Link>

            </ul>
          </>
        ) : (
          <>
            <h2>My Account</h2>
            <hr />
            <ul type="none">
              <Link to="/profile_dashboard"><li>Profile</li></Link>
              <Link to="/profile_dashboard/cart"><li>My Cart</li></Link>
              <Link to="/profile_dashboard/orders"><li>My Orders</li></Link>

            </ul>

          </>
        )}


      </nav>

    </>
  )
}

export default ProfileNav