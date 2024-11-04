import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { variantsArr, product_types, categories } from '../../../data';
import "../../../AddProduct_EditProduct.css";
import axios from 'axios';

const token = localStorage.getItem("token");

const AddProduct = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(20);
  const [price, setPrice] = useState(null);
  const [imgLink, setImgLink] = useState(" ");
  const [variants, setVariants] = useState([]);
  const [Product_type, setProduct_type] = useState(0);
  const [category, setCategory] = useState(categories[0]);


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);


  const handleChooseVariant = (e, variant) => {
    if (e.target.checked) {
      setVariants([...variants, { name: variant.name, price: variant.price }]);

    } else {
      variants.pop();
    }

  }




  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Product_type === null) {
      alert("Please Select A Product Type")
    }


    if (category === null) {
      alert("Please select a category")
    }
    if (Product_type !== null || category !== null) {
      if (product_types[Product_type] !== "Pizza" || product_types[Product_type] !== "Pizza Crust") {
        setVariants([]);
      }


      try {
        await axios.post("http://localhost:8080/api/product/create", {
          name,
          product_type: Product_type || 0,
          variants: [...variants],
          price,
          quantity,
          description,
          category: category || "Veg",
          image: imgLink
        },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            }
          }

        );
        alert("Product created successfully!");
        navigate("/profile_dashboard/view_products");
      } catch (error) {
        console.log(error);
        alert("Something went wrong!");
      }

    }



  }




  return (
    <div style={{ width: "100%" }}>
      <h1 className='poppins-semibold section-title form-title'>Add a New Product</h1>
      <form className='form' id="addProduct"
        onSubmit={handleSubmit}
      >
        <input type="text" name="name" id="name" placeholder='Product Name' onChange={(e) => { setName(e.target.value) }} required />
        <textarea name="description" id="description" placeholder='Product Description' onChange={(e) => { setDescription(e.target.value) }} required></textarea>
        <div className="option" id='product_type-option-container'>
          <label htmlFor="product_type">Product Type : </label>
          <select name="product_type" id="product_type"
            onChange={(e) => {
              if (e.target.value == "") {
                setProduct_type(null);
              } else {
                setProduct_type(e.target.value)
              }
            }} required>
            <option value={""} >Choose Product Type</option>
            {product_types.map(product_type => (
              <option value={product_types.indexOf(product_type)} key={`product_type-${product_types.indexOf(product_type)}`} >{product_type}</option>
            ))}
          </select>
        </div>
        {/* Variant */}
        {(product_types[Product_type] == "Pizza" || product_types[Product_type] == "Pizza Crust") ? (
          <>
            <hr />
            <div className='variants-container' >
              <p className='poppins-medium' style={{ textAlign: "center", color: "var(--text-colora)" }}>Variants</p>
              <div className="options-container" >
                {variantsArr.map(variant => (
                  <div className="option" key={variant.id}>
                    <input
                      type="checkbox"
                      className="variants-option"
                      id={`variant-${variant.id}`}
                      value={{ name: variant.name, price: variant.price }}
                      onChange={(e) => { handleChooseVariant(e, variant) }}
                    />
                    <label htmlFor={`variant-${variant.id}`}>{variant.name}</label>
                    <input type="text" name="variant-price" value={`Price : ${variant.price}rs`} style={{ padding: ".3rem" }} readOnly />
                  </div>
                ))}


              </div>
            </div>
          </>
        ) : (
          <hr />
        )}

        <div className="option" id='category-option-container'>
          <label htmlFor="category">Product Category : </label>
          <select name="category" id="category" onChange={(e) => {
            if (e.target.value == "") {
              setCategory(null);
            } else {

              setCategory(e.target.value)
            }
          }} required>
            <option value={""} >Select a Category</option>
            {categories.map(category => (
              <option value={category} key={`category-${categories.indexOf(category)}`} >{category}</option>
            ))}
          </select>
        </div>
        <input type="number" name="quantity" id="quantity" placeholder='Product Quantity' onChange={(e) => { setQuantity(e.target.value) }} required min={1} />
        <input type="number" name="price" id="price" placeholder='$ Price' onChange={(e) => { setPrice(e.target.value) }} required min={1} />
        <input type="text" name="imgLink" id="imgLink" placeholder='Product Image Link' onChange={(e) => { setImgLink(e.target.value) }} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct