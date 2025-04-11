import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookie from "js-cookie";
import { apiUrl } from "../data/apiPath";
import { IoChevronBackOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const navigate = useNavigate();
  const token = Cookie.get("token");
  const firmId = Cookie.get("firmId");

  useEffect(() => {
    if (firmId) {
      navigate("/");
      toast.error("You already have firm!");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firmName || !address || !category.length || !region.length || !file) {
      setErrorMessage("Please fill required fields");
    } else if (!token) {
      navigate("/login");
    } else {
      try {
        setInProgress(true);
        setErrorMessage("");
        const formData = new FormData();
        formData.append("firmName", firmName);
        formData.append("area", address);
        formData.append("offer", offer);

        category.forEach((cat) => {
          formData.append("category", cat);
        });

        region.forEach((reg) => {
          formData.append("region", reg);
        });
        formData.append("image", file);

        const response = await fetch(`${apiUrl}/firm/add-firm`, {
          method: "POST",
          headers: {
            token: `${token}`,
          },
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          setFirmName("");
          setAddress("");
          setCategory([]);
          setRegion([]);
          setOffer("");
          setFile(null);
          setErrorMessage("");
          setInProgress(false);
          e.target.reset();
          Cookie.set("firmId", data.firmId, { expires: 7 });
          toast.success(data.message);
          navigate("/");
        } else {
          setInProgress(false);
          setErrorMessage(data.message);
        }
      } catch (err) {
        setInProgress(false);
        setErrorMessage(err.message);
      }
    }
  };

  const handleCatgeoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCategory((prevCat) => [...prevCat, value]);
    } else {
      setCategory((prevCat) => prevCat.filter((cat) => cat !== value));
    }
  };

  const handleRegionChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setRegion((prevReg) => [...prevReg, value]);
    } else {
      setRegion((prevReg) => prevReg.filter((reg) => reg !== value));
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
          Add Your Firm
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-5 py-7 lg:p-9 rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* firmName */}
          <div>
            <label
              htmlFor="firmName"
              className="block text-md font-medium text-gray-900"
            >
              Firm Name<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="firmName"
                id="firmName"
                value={firmName}
                placeholder="Enter your firm name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                onChange={(e) => setFirmName(e.target.value)}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-md font-medium text-gray-900"
            >
              Address<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                placeholder="Enter your address"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* category */}

          <div>
            <label
              htmlFor="category"
              className="block text-md font-medium text-gray-900"
            >
              Category<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <div className="mt-1 flex items-center gap-4 w-full rounded-md bg-white px-5 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md">
              <div className="flex justify-center items-center">
                <input
                  id="veg"
                  type="checkbox"
                  value="veg"
                  checked={category.includes("veg")}
                  className="w-4 h-4 border cursor-pointer border-slate-100  rounded-lg hover:border-indigo-500 hover:bg-slate-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                  onChange={handleCatgeoryChange}
                />
                <label
                  htmlFor="veg"
                  className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
                >
                  Veg
                </label>
              </div>
              <div className="flex justify-center items-center">
                <input
                  id="non-veg"
                  type="checkbox"
                  value="non-veg"
                  checked={category.includes("non-veg")}
                  className="w-4 h-4 border cursor-pointer border-slate-100 rounded-lg hover:border-indigo-500 hover:bg-slate-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                  onChange={handleCatgeoryChange}
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

          {/* region */}

          <div>
            <label
              htmlFor="region"
              className="block text-md font-medium text-gray-900"
            >
              Region<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <div className="mt-1 flex flex-col gap-4 w-full rounded-md bg-white px-5 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md">
              <div className="flex gap-4">
                <div className="flex justify-center items-center">
                  <input
                    id="south-indian"
                    type="checkbox"
                    value="south-indian"
                    checked={region.includes("south-indian")}
                    className="w-4 h-4 border cursor-pointer border-slate-100  rounded-lg hover:border-indigo-500 hover:bg-slate-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                    onChange={handleRegionChange}
                  />
                  <label
                    htmlFor="south-indian"
                    className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
                  >
                    South-Indian
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    id="north-indian"
                    type="checkbox"
                    value="north-indian"
                    checked={region.includes("north-indian")}
                    className="w-4 h-4 border cursor-pointer border-slate-100 rounded-lg hover:border-indigo-500 hover:bg-slate-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                    onChange={handleRegionChange}
                  />
                  <label
                    htmlFor="north-indian"
                    className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
                  >
                    North-Indian
                  </label>
                </div>
              </div>
              <div className="flex gap-12.5">
                <div className="flex justify-center items-center">
                  <input
                    id="chinese"
                    type="checkbox"
                    value="chinese"
                    checked={region.includes("chinese")}
                    className="w-4 h-4 border cursor-pointer border-slate-100  rounded-lg hover:border-indigo-500 hover:bg-slate-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                    onChange={handleRegionChange}
                  />
                  <label
                    htmlFor="chinese"
                    className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
                  >
                    Chinese
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    id="bakery"
                    type="checkbox"
                    value="bakery"
                    checked={region.includes("bakery")}
                    className="w-4 h-4 border cursor-pointer border-slate-100 rounded-lg hover:border-indigo-500 hover:bg-slate-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                    onChange={handleRegionChange}
                  />
                  <label
                    htmlFor="bakery"
                    className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
                  >
                    Bakery
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* region */}

          <div>
            <label
              htmlFor="offer"
              className="block text-md font-medium text-gray-900"
            >
              Offer
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="offer"
                id="offer"
                value={offer}
                placeholder="Enter offer"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                onChange={(e) => setOffer(e.target.value)}
              />
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
            <p className="text-red-600 text-sm">{errorMessage}</p>
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

export default AddFirm;
