import React, { useEffect, useState } from "react";
import OrderCard from "../../../components/OrderCard/OrderCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../redux/slices/orderSlice";
import { STATUSES } from "../../../redux/slices/productSlice";
import { getUserDetails } from "../../../redux/slices/userSlice";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/ErrorPage";

const token = localStorage.getItem("token");

const Orders = () => {
  const { data: userDetails, sts } = useSelector((state) => state.user);

  const { data: orders, status } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(2);
  const goToNext = () => {
    setIndex((prev) => (prev = prev + 2));
    setPage((prev) => (prev = prev + 2));
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const goToPrev = () => {
    setIndex((prev) => prev - 2);
    setPage((prev) => (prev = prev - 2));
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getUserDetails());
      dispatch(fetchOrders());
    }
  }, []);

  if (status === STATUSES.LOADING) {
    return (
      <div style={{ width: "70vw", height: "50vh" }}>
        <Loading />
      </div>
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <div style={{ width: "70vw", height: "70vh" }}>
        <ErrorPage />
      </div>
    );
  }

  return (
    <>
      <div className="profile-header-content">
        <h2 className="poppins-semibold dashboard-section-title">My Orders</h2>
      </div>
      {(!orders || orders.length == 0) && (
        <>
          <p
            className="poppins-medium"
            style={{ color: "var(--text-colora)", fontSize: "1.4rem" }}
          >
            No orders : Order a Product
          </p>
          <button
            className="poppins-semibold"
            style={{
              padding: " .4rem .8rem",
              fontSize: " 1rem",
              outline: "none",
              border: "none",
              cursor: "pointer",
              backgroundColor: "var(--color-update)",
              color: "var(--text-colorb)",
            }}
            onClick={() => {
              navigate(`/profile_dashboard/cart`);
            }}
          >
            View Cart
          </button>
        </>
      )}
      {orders && orders.length !== 0 && (
        <>
          
          {orders.slice(index, page).map((order) => (
            <OrderCard
              key={order._id}
              items={order.items}
              address={order.address}
              isAdmin={userDetails.isAdmin}
              totalPrice={order.totalPrice}
              orderStatus={order.status}
              order={order}
              userId={userDetails._id}
            />
          ))}
          <div
            className="buttons-container"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <button
              disabled={page === 2}
              style={{
                color: page === 2 ? "gray" : "black",
                cursor: page === 2 ? "default" : "pointer",
              }}
              onClick={goToPrev}
            >
              Prev
            </button>
            <input
              type="text"
              disabled
              value={`${index + 1}-${
                page > orders.length ? orders.length : page
              } of ${orders.length}`}
              style={{
                width: "9rem",
                textAlign: "center",
                fontSize: "1rem",
                padding: ".3rem 0",
              }}
            />
            <button
              disabled={page >= orders.length}
              style={{
                color: page >= orders.length ? "gray" : "black",
                cursor: page >= orders.length ? "default" : "pointer",
              }}
              onClick={goToNext}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
