import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl } from "../data/apiPath";
import MoonLoader from "react-spinners/MoonLoader";
import Product from "./Product";
import NoProductView from "./NoProductView";
import { IoChevronBackOutline } from "react-icons/io5";

const Products = () => {
  const [firmName, setFirmName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = Cookie.get("token");
  const firmId = Cookie.get("firmId");
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/product/${firmId}/products`, {
        method: "GET",
        headers: {
          token: `${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFirmName(data.restaurantName);
        setProducts(data.products);
        setLoading(false);
      } else {
        console.log(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!firmId) {
      navigate("/");
      toast.error("Please add your firm first!");
    }
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/product/${id}`, {
        method: "DELETE",
        headers: {
          token: `${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        getProducts();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return loading ? (
    <div className="min-h-screen flex justify-center items-center">
      <MoonLoader color="#6366F1" />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center py-25 w-full overflow-y-scroll">
      <Link to="/" className="absolute top-22 left-3">
        <button className="flex justify-center items-center px-3 py-1 bg-slate-200 text-slate-900 rounded hover:bg-slate-300 cursor-pointer font-medium ml-2">
          <IoChevronBackOutline className="h-5 w-5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </Link>
      <h2 className="relative mb-4 text-center text-[27px] font-bold tracking-tight px-2 rounded-sm text-gray-900 mt-8 max-sm:mt-12">
        Welcome to <span className="text-indigo-500">{firmName}</span>
        <div className="absolute left-0 bottom-0 w-full h-1 bg-orange-400 rounded-full translate-y-1"></div>
      </h2>
      {products.length > 0 ? (
        <>
          <h3 className="my-2 text-center text-2xl/tight font-bold tracking-tight text-gray-900">
            Manage Your Products
          </h3>
          <ul className="mt-6 flex justify-center flex-wrap gap-4 list-none">
                {products.map((prod) => (
                  <Product product={prod} deleteProduct={deleteProduct} />
                ))}
          </ul>
        </>
      ) : (
        <NoProductView />
      )}
    </div>
  );
};

export default Products;
