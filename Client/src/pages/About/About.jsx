import React from "react";
import "./About.css";



const About = () => {

  return (
    <>
      <div className="product">
        <div className="left">
          <div className="mainImg">
            <img src={"https://images.pexels.com/photos/21792435/pexels-photo-21792435/free-photo-of-stack-of-boxes-with-pizza.jpeg?auto=compress&cs=tinysrgb&w=600"} alt={"About Pizzaland"} />
          </div>
        </div>
        <div className="right">
          <h1 className="title"> About PizzaLand</h1>

          <span className="product-desc description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, mollitia quibusdam! Suscipit, consequuntur totam natus obcaecati sunt sed itaque velit distinctio soluta optio a maiores adipisci laudantium amet officiis quas libero atque nemo neque enim, voluptates explicabo. Totam, quia eveniet!
          </span>

          <hr />
          <h1 className="title"> Our Journey</h1>

          <span className="product-desc description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, mollitia quibusdam! Suscipit, consequuntur totam natus obcaecati sunt sed itaque velit distinctio soluta optio a maiores adipisci laudantium amet officiis quas libero atque nemo neque enim, voluptates explicabo. Totam, quia eveniet!
          </span>

          <hr />
          <h1 className="title"> Our Mission</h1>

          <span className="product-desc description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, mollitia quibusdam! Suscipit, consequuntur totam natus obcaecati sunt sed itaque velit distinctio soluta optio a maiores adipisci laudantium amet officiis quas libero atque nemo neque enim, voluptates explicabo. Totam, quia eveniet!
          </span>
        </div>
      </div>
    </>
  );
};

export default About;