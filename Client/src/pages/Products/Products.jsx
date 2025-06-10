import React, { useEffect, useState } from "react";
import "./Products.css";
import vegImg from "../../assets/california-veggie-pizza-feature.jpg";
import nonVegPizzaImg from "../../assets/pexels-leonardo-luz-338722550-14000428.jpg";
import crustImg from "../../assets/pexels-polina-tankilevitch-4109128.jpg";
import toppingImg from "../../assets/veg-toppings.jpg";
import Card from "../../components/Card/Card";
import { searchProduct_s } from "../../hooks/getProduct";
import { useNavigate } from "react-router-dom";

import ProductsLoading from "../../components/ProductsLoading/ProductsLoading";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(4);

  const searchProducts = async (productType, category) => {
    setIndex(0);
    setPage(4);
    if (category) {
      const data = await searchProduct_s(productType, category);
      setProducts(data);
    } else {
      const data = await searchProduct_s(productType);
      setProducts(data);
    }
  };

  useEffect(() => {
    searchProducts(0);
    if (loading === true) {
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  }, []);

  const Categories = [
    {
      id: 0,
      bgImg: vegImg,
      title: "Veg Pizzas",
      category: "Veg",
      product_type: 0,
    },
    {
      id: 1,
      bgImg: nonVegPizzaImg,
      title: "Non Veg Pizzas",
      category: "Non-veg",
      product_type: 0,
    },
    {
      id: 2,
      bgImg: crustImg,
      title: "Pizza Crusts",
      product_type: 1,
    },
    {
      id: 3,
      bgImg: toppingImg,
      title: "Pizza Toppings",
      product_type: 3,
    },
    {
      id: 4,
      bgImg:
        "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Order a Custom Pizza",
      link: "/custom_pizza",
    },
  ];

  const goToNext = () => {
    setIndex((prev) => (prev = prev + 4));
    setPage((prev) => (prev = prev + 4));
  };

  const goToPrev = () => {
    setIndex((prev) => prev - 4);
    setPage((prev) => (prev = prev - 4));
  };

  return (
    <div className="main-div">
      <h1
        className="poppins-semibold section-title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Our Menu
      </h1>
      <div className="product-categories">
        {Categories &&
          Categories.map((c) => {
            return (
              <div
                key={c.id}
                onClick={() => {
                  if (c.link) {
                    navigate(c.link);
                  } else {
                    setLoading(true);
                    searchProducts(c.product_type, c.category);
                    setTimeout(() => {
                      setLoading(false);
                    }, 1800);
                  }
                }}
              >
                <div
                  className="category-badge"
                  style={{ backgroundImage: `url(${c.bgImg})` }}
                >
                  <h3 className="poppings-medium badge-title">{c.title}</h3>
                </div>
              </div>
            );
          })}
      </div>
      <div
        className="buttons-container"
        style={{ alignItems: "center", justifyContent: "center", margin: "0" }}
      >
        <button
          disabled={page === 4}
          style={{
            color: page === 4 ? "gray" : "black",
            cursor: page === 4 ? "default" : "pointer",
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
      <div className="flex-container">
        {loading ? (
          <ProductsLoading />
        ) : (
          <>
            {products.length !== 0 &&
              products
                .slice(index, page)
                .map((product) => <Card key={product._id} product={product} />)}
            {products.length === 0 && <ProductsLoading />}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
