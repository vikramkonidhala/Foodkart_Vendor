import React from "react";
import { Link } from "react-router-dom";

const NoProductView = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-2 max-sm:p-3">
      <img
        src="https://i.postimg.cc/wBrvsNxF/no-product-illustration.png"
        alt="no-products-found"
        className="h-45 sm:h-70 w-auto"
      />
      <p className="text-gray-800 font-bold text-xl mb-4">No products found. Please add products.</p>
      <Link to="/add-product">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer font-bold">
          Add Product
        </button>
      </Link>
    </div>
  );
};

export default NoProductView;
