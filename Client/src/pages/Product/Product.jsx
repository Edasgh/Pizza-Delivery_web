import React, { useEffect, useState } from "react";
import "./Product.css";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../hooks/getProduct";
import { categories, product_types } from "../../data";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BACKEND_BASE_URL } from "../../rootExports";

const token = localStorage.getItem("token");

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [imgLink, setImgLink] = useState(" ");
  const [Product_type, setProduct_type] = useState(0);
  const [variants, setVariants] = useState([]);
  const [category, setCategory] = useState(categories[0]);

  const getProductDetails = async () => {
    const data = await getProduct(productId);
    setName(data.name);
    setPrice(data.price);
    setCategory(data.category);
    setDescription(data.description);
    setVariants(data.variants);
    setProduct_type(data.product_type);
    setImgLink(data.image);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getProductDetails();
    }
  }, []);

  const [variantVal, setVariantVal] = useState(null);

  const addToCart = async () => {
    if (token) {
      if (variantVal === null) {
        toast.error("Please select a variant");
      } else {
        if (Product_type == 0) {
          try {
            await axios.post(
              `${BACKEND_BASE_URL}/api/product/cart/addToCart`,
              {
                name,
                variant: variantVal,
                price,
                quantity,
                category: category,
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

  return (
    <>
      <div className="product">
        <div className="left">
          <div className="mainImg">
            {imgLink !== " " && <img src={imgLink} alt={name} />}
          </div>
        </div>
        <div className="right">
          <h1 className="title">
            {" "}
            {name !== "" && name[0].toUpperCase() + name.substring(1)}
          </h1>
          <div className="prices">
            <h2 className="oldPrice">{price + 250}rs</h2>
            <h2 className="price">{price}rs</h2>
          </div>

          <span className="product-desc description" style={{ width: "16rem" }}>
            {description}
          </span>
          {Product_type == 0 && (
            <div className="product-quantity">
              <button
                className="minus"
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="plus"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
              {/* prev is the element or parameter of the setQuantity here */}
            </div>
          )}
          {Product_type == 0 && (
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
                {variants.map((variant) => (
                  <option
                    value={JSON.stringify({
                      name: variant.name,
                      price: variant.price,
                    })}
                    key={`variant-${variants.indexOf(variant)}`}
                  >
                    {variant.name} : ({variant.price}rs)
                  </option>
                ))}
              </select>
            </div>
          )}

          {Product_type == 0 && (
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
            <span>Product Type : {product_types[Product_type]}</span>
            <span>Category: {category}</span>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Product;
