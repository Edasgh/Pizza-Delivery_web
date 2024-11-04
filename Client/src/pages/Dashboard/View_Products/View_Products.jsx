import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { searchProduct_s } from '../../../hooks/getProduct';
import { STATUSES, fetchProducts } from '../../../redux/slices/productSlice';



const Categories = [
  {
    id: 0,
    title: "All Products",
  },
  {
    id: 1,
    title: "Veg Pizzas",
    category: "Veg",
    product_type: 0,
  },
  {
    id: 2,
    title: "Non Veg Pizzas",
    category: "Non-veg",
    product_type: 0,
  },
  {
    id: 3,
    title: "Pizza Crusts",
    product_type: 1
  },
  {
    id: 4,
    title: "Pizza Toppings",
    product_type: 3
  },
  {
    id: 5,
    title: "Cheeses",
    product_type: 4
  },
  {
    id: 6,
    title: "Pizza Sauces",
    product_type: 2,
  },
]

const View_Products = () => {
  const dispatch = useDispatch();
  const { data: userDetails } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const { data: items,itemsBelow20, sts } = useSelector((state) => state.product);

  const [products, setProducts] = useState([]);


  const searchProducts = async (productType, category) => {
    if (category) {
      const data = await searchProduct_s(productType, category);
      setProducts(data);
    } else {
      const data = await searchProduct_s(productType);
      setProducts(data);
    }


  }

  useEffect(() => {
    if (userDetails.isAdmin == false) {
      navigate("/");
    } else {
      dispatch(fetchProducts());

    }

  }, []);

  if (sts === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (sts === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }


  return (
    <>

      <div className="profile-header-content">
        <h2 className="poppins-semibold dashboard-section-title">All Products</h2>
        <div className="product-categories">
          {Categories && Categories.map(c => {
            return (
              <div key={c.id} onClick={() => {
                if (!c.product_type && !c.category) {
                  dispatch(fetchProducts());
                  setProducts([...items]);
                } else {
                  searchProducts(c.product_type, c.category)
                }

              }}>
                <div className="category-badge" style={{ width: "8rem", color: "var(--text-colora)", textShadow: "none", textAlign: "center", height: "3rem" }}>
                  <span className='poppings-bold badge-title' style={{ fontSize: "1rem" }}>{c.title}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>



      {
       products.length!==0 && products.map((product) => (
          <ProductCard key={product._id}
            product={product}
            variants={product.variants} />
        ))
      }



      {products.length == 0 && (
        <>
          {
            items && items.length !== 0 && items.map((product) => (
              <ProductCard key={product._id}
                product={product}
                variants={product.variants} />
            ))
          }
        </>
      )}

    </>

  )
}

export default View_Products;