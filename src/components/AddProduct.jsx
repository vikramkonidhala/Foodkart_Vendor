import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookie from "js-cookie";
import { apiUrl } from "../data/apiPath";
import { IoChevronBackOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("veg");
  const [bestSeller, setBestSeller] = useState("false");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const navigate = useNavigate();
  const token = Cookie.get("token");
  const firmId = Cookie.get("firmId");

  useEffect(() => {
    if (!firmId) {
      navigate("/");
      toast.error("Please add your firm first!");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !price || !category || !bestSeller || !file) {
      setErrorMessage("Please fill required fields");
    } else if (!token) {
      navigate("/login");
    } else {
      try {
        setInProgress(true);
        setErrorMessage("");
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("bestSeller", bestSeller);
        formData.append("description", description);
        formData.append("image", file);

        const response = await fetch(
          `${apiUrl}/product/add-product/${firmId}`,
          {
            method: "POST",
            headers: {
              token: `${token}`,
            },
            body: formData,
          }
        );
        const data = await response.json();
        if (response.ok) {
          setProductName("");
          setPrice("");
          setCategory("veg");
          setBestSeller("false");
          setDescription("");
          setFile(null);
          setErrorMessage("");
          setInProgress(false);
          e.target.reset();
          toast.success(data.message);
          navigate("/");
        } else {
          setInProgress(false);
          setErrorMessage(data.message);
          toast.error(data.message);
        }
      } catch (err) {
        setInProgress(false);
        setErrorMessage(err.message);
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-25 w-full overflow-y-scroll">
      <Link to="/" className="absolute top-22 left-3">
        <button className="flex justify-center items-center px-3 py-1 bg-slate-200 text-slate-900 rounded hover:bg-slate-300 cursor-pointer font-medium ml-2">
          <IoChevronBackOutline className="h-5 w-5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </Link>
      <div className="mx-auto w-full max-w-sm">
        <h2 className="text-center text-2xl/tight font-bold tracking-tight text-gray-900 mt-6">
          Add Your Product
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-5 py-7 lg:p-9 rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* productName */}
          <div>
            <label
              htmlFor="product-name"
              className="block text-md font-medium text-gray-900"
            >
              Product Name<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="product-name"
                id="productName"
                value={productName}
                placeholder="Enter your product name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-md font-medium text-gray-900"
            >
              Price<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                placeholder="Enter your price"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* category */}

          <div>
            <label
              htmlFor="product-category"
              className="block text-md font-medium text-gray-900"
            >
              Category<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <div className="mt-1 flex items-center gap-8 w-full rounded-md bg-white px-8 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md">
              <div className="flex items-center">
                <input
                  id="veg"
                  type="radio"
                  value="veg"
                  name="category"
                  checked={category === "veg"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label
                  htmlFor="veg"
                  className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
                >
                  Veg
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="non-veg"
                  type="radio"
                  value="non-veg"
                  name="category"
                  checked={category === "non-veg"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label
                  htmlFor="non-veg"
                  className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
                >
                  Non-Veg
                </label>
              </div>
            </div>
          </div>

          {/* bestSeller */}

          <div>
            <label
              htmlFor="productbestseller"
              className="block text-md font-medium text-gray-900"
            >
              Best Seller<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <div className="mt-1 flex items-center gap-8 w-full rounded-md bg-white px-8 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md">
              <div className="flex items-center">
                <input
                  id="yes"
                  type="radio"
                  value="true"
                  name="bestSeller"
                  checked={bestSeller === "true"}
                  onChange={(e) => setBestSeller(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label
                  htmlFor="yes"
                  className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="no"
                  type="radio"
                  value="false"
                  name="bestSeller"
                  checked={bestSeller === "false"}
                  onChange={(e) => setBestSeller(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label
                  htmlFor="no"
                  className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-md font-medium text-gray-900"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                rows="3"
                className="block p-2.5 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                placeholder="Enter your product description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
          </div>

          {/* image */}

          <div>
            <label
              htmlFor="image-file"
              className="block text-md font-medium text-gray-900 mb-1"
            >
              Upload Image<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <input
              className="relative font-normal m-0 block w-full min-w-0 flex-auto cursor-pointer rounded bg-white bg-clip-padding px-3 py-[0.32rem] text-base text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-gray-300 file:bg-slate-400 file:px-3  file:py-[0.32rem] file:text-surface outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 focus:text-gray-700 focus:shadow-inset focus:outline-none"
              type="file"
              id="image-file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <div>
            {inProgress ? (
              <button
                type="button"
                className="flex w-full justify-center items-center rounded-md bg-indigo-500 px-3 py-1.5 text-md font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-6"
                disabled
              >
                <ClipLoader color="#ffffff" size={20} className="mr-1" />
                Processing…
              </button>
            ) : (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
