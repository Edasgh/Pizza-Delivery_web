import React, { useEffect, useRef, useState } from "react";
import "./Product.css";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../hooks/getProduct";
import { categories, product_types } from "../../data";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BACKEND_BASE_URL } from "../../rootExports";
import ProductLoading from "../../components/ProductLoading/ProductLoading";

const token = localStorage.getItem("token");

const Product = () => {
  const topRef = useRef(null);
  const navigate = useNavigate();
  const { productId } = useParams();

  const [productObj, setProductObj] = useState({
    name: "",
    description: "",
    quantity: 1,
    price: 0,
    imgLink: "",
    product_type: 0,
    variants: [],
    category: categories[0],
  });

  const [loading, setLoading] = useState(true);

  const getProductDetails = async () => {
    const data = await getProduct(productId);
    setProductObj({
      name: data.name,
      description: data.description,
      quantity: 1,
      price: data.price,
      imgLink: data.image,
      product_type: data.product_type,
      variants: [...data.variants],
      category: data.category,
    });
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getProductDetails();
    }
    // Scroll to the top
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const [variantVal, setVariantVal] = useState(null);

  const addToCart = async () => {
    if (token) {
      if (variantVal === null) {
        toast.error("Please select a variant");
      } else {
        if (productObj.product_type == 0) {
          try {
            await axios.post(
              `${BACKEND_BASE_URL}/api/product/cart/addToCart`,
              {
                name: productObj.name,
                variant: variantVal,
                price: productObj.price,
                quantity: productObj.quantity,
                category: productObj.category,
                productId: productId,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem("token"),
                },
              }
            );
            toast.success("Item added to cart successfully!");
            setTimeout(() => {
              navigate("/profile_dashboard/cart");
            }, 1500);
          } catch (error) {
            toast.error("Something went wrong!");
            console.log(error);
          }
        }
      }
    } else {
      toast.error("Login to add items to cart!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  if (loading) {
    return (
      <>
        <div ref={topRef} />
        <ProductLoading />
      </>
    );
  }

  return (
    <>
      <div ref={topRef} />
      <div className="product">
        <div className="left">
          <div className="mainImg">
            {productObj.imgLink !== " " && (
              <img src={productObj.imgLink} alt={productObj.name} />
            )}
          </div>
        </div>
        <div className="right">
          <h1 className="title">
            {" "}
            {productObj.name !== "" &&
              productObj.name[0].toUpperCase() + productObj.name.substring(1)}
          </h1>
          <div className="prices">
            <h2 className="oldPrice">{productObj.price + 250}rs</h2>
            <h2 className="price">{productObj.price}rs</h2>
          </div>

          <span className="product-desc description" style={{ width: "16rem" }}>
            {productObj.description}
          </span>
          {productObj.product_type === 0 && (
            <div className="product-quantity">
              <button
                className="minus"
                onClick={() =>
                  setProductObj((prev) => ({
                    ...prev,
                    quantity: prev.quantity - 1,
                  }))
                }
              >
                -
              </button>
              <span>{productObj.quantity}</span>
              <button
                className="plus"
                onClick={() =>
                  setProductObj((prev) => ({
                    ...prev,
                    quantity: prev.quantity + 1,
                  }))
                }
              >
                +
              </button>
              {/* prev is the element or parameter of the setQuantity here */}
            </div>
          )}
          {productObj.product_type === 0 && (
            <div className="option" id="variant-option-container">
              <label htmlFor="variant">Choose a Variant : </label>
              <select
                name="variant"
                id="variant"
                onChange={(e) => {
                  if (e.target.value == "") {
                    return;
                  } else {
                    if (JSON.parse(e.target.value).name) {
                      setVariantVal(JSON.parse(e.target.value));
                    }
                  }
                }}
                required
              >
                <option value={""}>Select a Variant</option>
                {productObj.variants.map((variant) => (
                  <option
                    value={JSON.stringify({
                      name: variant.name,
                      price: variant.price,
                    })}
                    key={`variant-${productObj.variants.indexOf(variant)}`}
                  >
                    {variant.name} : ({variant.price}rs)
                  </option>
                ))}
              </select>
            </div>
          )}

          {productObj.product_type == 0 && (
            <button
              className="add poppins-semibold"
              type="button"
              onClick={addToCart}
            >
              <p className="btn-text">
                ADD TO CART{" "}
                <i className="fa-solid fa-cart-shopping cart-icon"></i>
              </p>
            </button>
          )}

          <div className="info">
            <span>Vendor : PizzaLand</span>
            <span>Product Type : {product_types[productObj.product_type]}</span>
            <span>Category: {productObj.category}</span>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Product;
