import React, { useEffect, useState } from 'react';
import "./Products.css";
import vegImg from "../../assets/california-veggie-pizza-feature.jpg";
import nonVegPizzaImg from "../../assets/pexels-leonardo-luz-338722550-14000428.jpg";
import crustImg from "../../assets/pexels-polina-tankilevitch-4109128.jpg";
import toppingImg from "../../assets/veg-toppings.jpg";
import Card from '../../components/Card/Card';
import { searchProduct_s } from '../../hooks/getProduct';
import { useNavigate } from 'react-router-dom';



const Products = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])


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
    searchProducts(0);

  }, [])


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
      product_type: 1
    },
    {
      id: 3,
      bgImg: toppingImg,
      title: "Pizza Toppings",
      product_type: 3
    },
    {
      id: 4,
      bgImg: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Order a Custom Pizza",
      link: "/custom_pizza"
    }
  ]
  return (
    <div className='main-div'>
      <h1 className='poppins-semibold section-title'>Our Menu</h1>
      <div className="product-categories">
        {Categories && Categories.map(c => {
          return (
            <div key={c.id} onClick={() => {
              if (c.link) {
                navigate(c.link);
              } else {
                searchProducts(c.product_type, c.category)
              }

            }}>
              <div className="category-badge" style={{ backgroundImage: `url(${c.bgImg})` }}>
                <h3 className='poppings-medium badge-title'>{c.title}</h3>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex-container">
        {(products.length !== 0) && products.map((product) => (
          <Card key={product._id}
            product={product}
          />
        ))}

      </div>


    </div>
  )
}

export default Products