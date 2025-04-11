import React from "react";
import { MdDeleteForever } from "react-icons/md";

const Product = (props) => {
  const { product, deleteProduct } = props;
  console.log(product);

  return (
    <li
      className="w-[288px] h-[400px] bg-white border border-gray-200 rounded-lg shadow-sm"
      key={product._id}
    >
      <img
        className="rounded-t-lg w-full h-[170px] object-cover"
        src={product.image}
        alt={product.productName}
      />
      <div className="p-5">
        <div className="flex items-center gap-1.5">
          {product.bestSeller === "true" && (
            <p className="bg-amber-300 text-white px-1 py-0.5 rounded-sm font-medium">
              Best Seller
            </p>
          )}
          {product.category === "veg" ? (
            <p className="bg-green-400 text-white px-2 py-0.5 rounded-sm font-medium">
              Veg
            </p>
          ) : (
            <p className="bg-red-800 text-white px-2 py-0.5 rounded-sm font-medium">
              Non-Veg
            </p>
          )}
        </div>
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 mt-2">
          {product.productName}
        </h5>
        <p className="mb-3 text-lg font-bold text-indigo-600">{`Rs.${product.price}`}</p>
        <p className="mb-3 font-normal text-gray-700 line-clamp-2 overflow-hidden">
          {product.description || (
            <span className="line-through">"No description available"</span>
          )}
        </p>
        <button
          className="w-full flex justify-center items-center bg-red-500 hover:cursor-pointer hover:bg-red-600 py-1 text-white font-bold rounded-lg"
          onClick={() => deleteProduct(product._id)}
        >
          <MdDeleteForever className="h-5 w-7" />
          Delete
        </button>
      </div>
    </li>
  );
};

export default Product;
