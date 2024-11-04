import React, { useEffect, useState } from 'react';
import CartCard from '../../../components/CartCard/CartCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../../redux/slices/productSlice';
import { fetchCartItems } from '../../../redux/slices/cartSlice';
import { getUserDetails } from '../../../redux/slices/userSlice';
import axios from 'axios';
import Crypto from "crypto-js";
import OrderAddressModal from '../../../components/OrderModal/OrderAddressModal';
import { openOrHideModal } from '../../../hooks/OpenOrHideModal';



const token = localStorage.getItem("token");

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [])


  const { data: user, sts } = useSelector((state) => state.user);


  const { data: products, totalPrice, status } = useSelector((state) => state.cart);


  const [address, setAddress] = useState("");

 



  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }



  //razpOrderId, customerId, items :{cartId,name,category,variant,extraOptions,quantity,price},address,totalPrice,paymentDone


  const checkoutHandler = async () => {
    const { data: { key } } = await axios.get("http://localhost:8080/api/order/getKey");

    const { data: { keySecret } } = await axios.get("http://localhost:8080/api/order/getKeySecret");

    const { data: { order } } = await axios.post("http://localhost:8080/api/order/checkout", {
      amount: (totalPrice + 200)
    })

    const options = {
      key_id: await key,
      amount: order.amount,
      currency: "INR",
      name: "PizzaLand",
      description: "Pizza order Checkout",

      order_id: await order.id,

      handler: async function (response) {
        let keySec = await keySecret;
        const string = `${response.razorpay_order_id}|${response.razorpay_payment_id}`
        if (keySecret) {
          const isAuthentic = Crypto.HmacSHA256(string, keySec).toString() === response.razorpay_signature;
          if (isAuthentic) {
            if (address == "") {
              try {
                await axios.post(`http://localhost:8080/api/order/place_order`, {
                  totalPrice: (totalPrice + 200),
                  paymentDone: true,
                  razpOrderId: response.razorpay_order_id,
                  items: [...products],
                },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token": localStorage.getItem("token")
                    }
                  }

                );
                alert("Order Placed Successfully!")
                navigate(`/paymentsuccess?reference=${response.razorpay_payment_id}`);
              } catch (error) {
                console.log(error);
                alert("Something went wrong!");
              }
            } else {
              try {
                await axios.post(`http://localhost:8080/api/order/place_order`, {
                  address: address,
                  totalPrice: (totalPrice + 200),
                  paymentDone: true,
                  razpOrderId: response.razorpay_order_id,
                  items: [...products],
                },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token": localStorage.getItem("token")
                    }
                  }

                );
                alert("Order Placed Successfully!")
                navigate(`/paymentsuccess?reference=${response.razorpay_payment_id}`);
              } catch (error) {
                console.log(error);
                alert("Something went wrong!");
              }
            }

          } else {
            navigate(`/paymentfailure`)
          }
        }

      },
      prefill: {
        name: await user.name,
        email: await user.email,
      },
      notes: {
        "address": await user.address,
      },
      theme: {
        "color": "#D2411E"
      }
    };
    const razor = new window.Razorpay(options);
    razor.on('payment.failed', function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      navigate(`/paymentfailure`)
    });


    razor.open();
  }




  return (
    <>
      {token && (
        <>
          <div className="profile-header-content">
            <h2 className="poppins-semibold dashboard-section-title">My Cart (Total {products.length} Item(s) : total price = {totalPrice} rs {totalPrice !== 0 && (<span>, total delivery charge = 200</span>)})</h2>
          </div>
          {(products.length !== 0 && (
            <>

              <OrderAddressModal setAddress={setAddress} address={address} />
              {/* props : name,category,variant,quantity,price,removeFromCart */}
              {products.map((product) => (
                <CartCard
                  key={product._id}
                  product={product}
                  link={`/${product.productId}/product`}
                />
              ))}
              {address == "" ? (<>
                <p className="poppins-medium" style={{ color: "grey" }} >Your Current Address is the address added in your account</p>
              </>)
                : (<>
                  <p className="poppins-medium" style={{ color: "var(--color-primary)" }} >Custom Address added for this order</p>
                </>)
              }
              <ul type="none" className='buttons-container'>
                <button type="button" className="update-qty poppins-semibold" onClick={() => { openOrHideModal() }}>Add a different Order Address</button>
                <button className="place-order poppins-semibold" onClick={() => { checkoutHandler() }} >Place Order</button>
              </ul>
            </>

          ))}

          {(!products || products.length == 0) && (
            <p className="poppins-medium" style={{ color: "var(--text-colora)", fontSize: "1.4rem" }}>No items : Add a Product to Cart</p>
          )}
        </>
      )}

    </>
  )
}

export default Cart