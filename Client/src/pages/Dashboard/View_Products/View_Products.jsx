import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct_s } from "../../../hooks/getProduct";
import { STATUSES, fetchProducts } from "../../../redux/slices/productSlice";
import ErrorPage from "../../../components/ErrorPage";
import Loading from "../../../components/Loading";

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
    product_type: 1,
  },
  {
    id: 4,
    title: "Pizza Toppings",
    product_type: 3,
  },
  {
    id: 5,
    title: "Cheeses",
    product_type: 4,
  },
  {
    id: 6,
    title: "Pizza Sauces",
    product_type: 2,
  },
];

const View_Products = () => {
  const dispatch = useDispatch();
  const { data: userDetails } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const topRef = useRef(null);

  const {
    data: items,
    itemsBelow20,
    sts,
  } = useSelector((state) => state.product);

  const [products, setProducts] = useState([]);
  const [pLoading, setPLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(4);

  const searchProducts = async (productType, category) => {
    if (category) {
      const data = await searchProduct_s(productType, category);
      setProducts(data);
    } else {
      const data = await searchProduct_s(productType);
      setProducts(data);
    }
  };

  const handleCategoryClick = async (c) => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
    setPLoading(true);
    try {
      if (!c.product_type && !c.category) {
        await dispatch(fetchProducts()); // Wait for products to load
        setProducts([...items]); // Update products state
      } else {
        await searchProducts(c.product_type, c.category);
      }
    } catch (error) {
      console.error("Error loading category:", error);
    } finally {
      setPLoading(false); // Stop loading spinner
      setIndex(0);
      setPage(4);
    }
  };

  const goToNext = () => {
    setIndex((prev) => (prev = prev + 4));
    setPage((prev) => (prev = prev + 4));
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const goToPrev = () => {
    setIndex((prev) => prev - 4);
    setPage((prev) => (prev = prev - 4));
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (userDetails.isAdmin == false) {
      navigate("/");
    } else {
      dispatch(fetchProducts());
      // scrollToTop();
    }
  }, []);

  if (sts === STATUSES.LOADING) {
    return (
      <div style={{ width: "70vw", height: "50vh" }}>
        <Loading />
      </div>
    );
  }

  if (sts === STATUSES.ERROR) {
    return (
      <div style={{ width: "70vw", height: "70vh" }}>
        <ErrorPage />
      </div>
    );
  }

  const displayedProducts = products.length > 0 ? products : items || [];

  return (
    <>
      <div className="profile-header-content" ref={topRef}>
        <h2 className="poppins-semibold dashboard-section-title">
          All Products
        </h2>
        <div className="product-categories">
          {Categories &&
            Categories.map((c) => {
              return (
                <div key={c.id} onClick={() => handleCategoryClick(c)}>
                  <div
                    className="category-badge"
                    style={{
                      width: "8rem",
                      color: "var(--text-colora)",
                      textShadow: "none",
                      textAlign: "center",
                      height: "3rem",
                    }}
                  >
                    <span
                      className="poppings-bold badge-title"
                      style={{ fontSize: "1rem" }}
                    >
                      {c.title}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {pLoading === true ? (
        <div style={{ width: "70vw", height: "50vh" }}>
          <Loading />
        </div>
      ) : (
        <>
          {displayedProducts.length > 0 && (
            <>
              {displayedProducts.slice(index, page).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  variants={product.variants}
                />
              ))}
              <div
                className="buttons-container"
                style={{ alignItems: "center", justifyContent: "center" }}
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
                    page > displayedProducts.length
                      ? displayedProducts.length
                      : page
                  } of ${displayedProducts.length}`}
                  style={{
                    width: "9rem",
                    textAlign: "center",
                    fontSize: "1rem",
                    padding: ".3rem 0",
                  }}
                />
                <button
                  disabled={page === displayedProducts.length}
                  style={{
                    color: page === displayedProducts.length ? "gray" : "black",
                    cursor:
                      page === displayedProducts.length ? "default" : "pointer",
                  }}
                  onClick={goToNext}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default View_Products;
