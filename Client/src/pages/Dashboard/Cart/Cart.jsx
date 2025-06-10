import React, { useEffect, useState } from "react";
import CartCard from "../../../components/CartCard/CartCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../../redux/slices/productSlice";
import { fetchCartItems } from "../../../redux/slices/cartSlice";
import { getUserDetails } from "../../../redux/slices/userSlice";
import axios from "axios";
import Crypto from "crypto-js";
import OrderAddressModal from "../../../components/OrderModal/OrderAddressModal";
import { openOrHideModal } from "../../../hooks/OpenOrHideModal";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_BASE_URL } from "../../../rootExports";
import ErrorPage from "../../../components/ErrorPage";

const token = localStorage.getItem("token");

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(2);

  const goToNext = () => {
    setIndex((prev) => (prev = prev + 2));
    setPage((prev) => (prev = prev + 2));
    setTimeout(()=>{
      window.scrollTo({ top: 0, behavior: "smooth" });
    },0);
  };

  const goToPrev = () => {
    setIndex((prev) => prev - 2);
    setPage((prev) => (prev = prev - 2));
    setTimeout(()=>{
      window.scrollTo({ top: 0, behavior: "smooth" });
    },0);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails());
      dispatch(fetchCartItems());
    }
  }, []);

  const { data: user, sts } = useSelector((state) => state.user);

  const {
    data: products,
    totalPrice,
    status,
  } = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");

  if (status === STATUSES.LOADING) {
    return (
      <div style={{ width: "70vw", height: "50vh" }}>
        <Loading />
      </div>
    );
  }

  if (status === STATUSES.ERROR || !token) {
    return (
      <div style={{ width: "70vw", height: "70vh" }}>
        <ErrorPage />
      </div>
    );
  }

  //razpOrderId, customerId, items :{cartId,name,category,variant,extraOptions,quantity,price},address,totalPrice,paymentDone

  const checkoutHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${BACKEND_BASE_URL}/api/order/getKey`);

    const {
      data: { keySecret },
    } = await axios.get(`${BACKEND_BASE_URL}/api/order/getKeySecret`);

    const {
      data: { order },
    } = await axios.post(`${BACKEND_BASE_URL}/api/order/checkout`, {
      amount: totalPrice + 50,
    });

    const options = {
      key_id: await key,
      amount: order.amount,
      currency: "INR",
      name: "PizzaLand",
      description: "Pizza order Checkout",

      order_id: await order.id,

      handler: async function (response) {
        let keySec = await keySecret;
        const string = `${response.razorpay_order_id}|${response.razorpay_payment_id}`;
        if (keySecret) {
          const isAuthentic =
            Crypto.HmacSHA256(string, keySec).toString() ===
            response.razorpay_signature;
          if (isAuthentic) {
            if (address == "") {
              try {
                await axios.post(
                  `${BACKEND_BASE_URL}/api/order/place_order`,
                  {
                    totalPrice: totalPrice + 50,
                    paymentDone: true,
                    razpOrderId: response.razorpay_order_id,
                    items: [...products],
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token": localStorage.getItem("token"),
                    },
                  }
                );

                toast.success("Order Placed Successfully!");
                setTimeout(() => {
                  navigate(
                    `/paymentsuccess?reference=${response.razorpay_payment_id}`
                  );
                }, 2000);
              } catch (error) {
                toast.error("Something went wrong!");
                console.log(error);
              }
            } else {
              try {
                await axios.post(
                  `${BACKEND_BASE_URL}/api/order/place_order`,
                  {
                    address: address,
                    totalPrice: totalPrice + 50,
                    paymentDone: true,
                    razpOrderId: response.razorpay_order_id,
                    items: [...products],
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token": localStorage.getItem("token"),
                    },
                  }
                );
                toast.success("Order Placed Successfully!");
                setTimeout(() => {
                  navigate(
                    `/paymentsuccess?reference=${response.razorpay_payment_id}`
                  );
                }, 2000);
              } catch (error) {
                toast.error("Something went wrong!");
                console.log(error);
              }
            }
          } else {
            navigate(`/paymentfailure`);
          }
        }
      },
      prefill: {
        name: await user.name,
        email: await user.email,
      },
      notes: {
        address: await user.address,
      },
      theme: {
        color: "#D2411E",
      },
    };
    const razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response) {
      // console.log(response.error.code);
      // console.log(response.error.description);
      // console.log(response.error.source);
      // console.log(response.error.step);
      // console.log(response.error.reason);
      // console.log(response.error.metadata.order_id);
      // console.log(response.error.metadata.payment_id);
      navigate(`/paymentfailure`);
    });

    razor.open();
  };

  return (
    <>
      <div className="profile-header-content">
        <h2 className="poppins-semibold dashboard-section-title">
          My Cart (Total {products.length} Item(s) : total price = {totalPrice}{" "}
          rs {totalPrice !== 0 && <span>, total delivery charge = 50</span>})
        </h2>
      </div>
      {products.length !== 0 && (
        <>
          <OrderAddressModal
            setAddress={setAddress}
            address={address}
            placeOrder={checkoutHandler}
          />
          {/* props : name,category,variant,quantity,price,removeFromCart */}
          {products.slice(index, page).map((product) => (
            <CartCard
              key={product._id}
              product={product}
              link={`/${product.productId}/product`}
              address={address === "" ? user.address : address}
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
                page > products.length ? products.length : page
              } of ${products.length}`}
              style={{
                width: "9rem",
                textAlign: "center",
                fontSize: "1rem",
                padding: ".3rem 0",
              }}
            />
            <button
              disabled={page >= products.length}
              style={{
                color: page >= products.length ? "gray" : "black",
                cursor: page >= products.length ? "default" : "pointer",
              }}
              onClick={goToNext}
            >
              Next
            </button>
          </div>
          {address == "" ? (
            <>
              <p className="poppins-medium" style={{ color: "grey" }}>
                Your Current Address is the address added in your account
              </p>
            </>
          ) : (
            <>
              <p
                className="poppins-medium"
                style={{ color: "var(--color-primary)" }}
              >
                Custom Address added for this order
              </p>
            </>
          )}
          <ul type="none" className="buttons-container">
            <button
              type="button"
              className="update-qty poppins-semibold"
              onClick={() => {
                openOrHideModal();
              }}
            >
              Add a different Order Address
            </button>
            <button
              className="place-order poppins-semibold"
              onClick={() => {
                checkoutHandler();
              }}
            >
              Place Order
            </button>
          </ul>
        </>
      )}

      {(!products || products.length === 0) && (
        <>
          <p
            className="poppins-medium"
            style={{ color: "var(--text-colora)", fontSize: "1.4rem" }}
          >
            No items : Add a Product to Cart
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
              navigate(`/`);
            }}
          >
            Explore Items
          </button>
        </>
      )}
    </>
  );
};

export default Cart;
