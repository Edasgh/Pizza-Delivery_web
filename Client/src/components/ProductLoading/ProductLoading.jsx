import React from "react";
import "./ProductLoading.css";

const ProductLoading = () => {
  return (
    <div className="skeleton-container">
      {/* Image Skeleton */}
      <div className="skeleton skeleton-image"></div>

      {/* Product Details Skeleton */}
      <div className="skeleton-text">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-oldprice"></div>
        <div className="skeleton skeleton-description"></div>

        {/* Quantity Selector */}
        <div className="skeleton skeleton-quantity"></div>

        {/* Dropdown */}
        <div className="skeleton skeleton-dropdown"></div>

        {/* Add to Cart Button */}
        <div className="skeleton skeleton-button"></div>

        {/* Vendor & Category */}
        <div className="skeleton skeleton-text-line"></div>
        <div className="skeleton skeleton-text-line"></div>
        <div className="skeleton skeleton-text-line"></div>
      </div>
    </div>
  );
};

export default ProductLoading;
