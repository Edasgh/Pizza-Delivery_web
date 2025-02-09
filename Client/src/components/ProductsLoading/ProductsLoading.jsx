import React from "react";
import "./ProductsLoading.css";

const PizzaCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      {/* Image Placeholder */}
      <div className="skeleton skeleton-img"></div>

      {/* Title Placeholder */}
      <div className="skeleton skeleton-title-text"></div>

      {/* Price Placeholder */}
      <div className="skeleton skeleton-price-group">
        <div className="skeleton skeleton-oldprice"></div>
        <div className="skeleton skeleton-newprice"></div>
      </div>

      {/* Button Placeholder */}
      <div className="skeleton skeleton-add-button"></div>
    </div>
  );
};

const ProductsLoading = () => {
  return (
    <div
      className="flex-container"
    >
    
       {[1,2,3,4,5,6,7,8].map((e)=>(
        <PizzaCardSkeleton key={e} />
       ))}
 
    </div>
  );
}

export default ProductsLoading

