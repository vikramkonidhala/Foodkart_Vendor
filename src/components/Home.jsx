import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import { apiUrl } from "../data/apiPath";
import MoonLoader from "react-spinners/MoonLoader";
import toast from "react-hot-toast";

const HomePage = () => {
  const [vendor, setVendor] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const token = Cookie.get("token");
  const vendorId = Cookie.get("vendorId");
  const firmId = Cookie.get("firmId");

  useEffect(() => {
    const getVendor = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/vendor/single-vendor/${vendorId}`,
          {
            method: "GET",
            headers: {
              token: `${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setVendor(data.vendor);
          data.vendor.firm &&
            Cookie.set("firmId", data.vendor.firm._id, { expires: 7 });
          setLoading(false);
        }
      } catch (error) {
        setVendor({});
        setLoading(false);
        console.log(error);
      }
    };

    getVendor();
  }, [token, vendorId, firmId]);

  const handleToggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleDeleteFirm = async () => {
    handleToggleModal();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/firm/${firmId}`, {
        method: "DELETE",
        headers: {
          token: `${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setVendor({});
        setLoading(false);
        toast.success(data.message);
        Cookie.remove("firmId");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error while deleting firm");
      console.log(error);
    }
  };

  return loading ? (
    <div className="min-h-screen flex justify-center items-center">
      <MoonLoader color="#6366F1" />
    </div>
  ) : (
    <div className="text-center min-h-screen flex flex-col justify-center items-center mt-5 overflow-hidden max-sm:min-h-auto max-sm:p-4">
      <img
        className="hidden h-28 w-auto mx-auto mb-2 max-sm:block max-sm:mt-20"
        src="https://i.postimg.cc/MTXKhC1h/Foo-Kart-Logo.png"
        alt="FoodKart"
      />
      <img
        className={`hidden h-28 w-auto mx-auto mb-2 sm:block ${vendor.firm ? "mt-20" : "mt-0"}`}
        src="https://i.postimg.cc/MTXKhC1h/Foo-Kart-Logo.png"
        alt="FoodKart"
      />
      <h3 className="text-3xl font-bold text-gray-900 mb-4 max-sm:text-2xl">
        Welcome to FoodKart Vendor Dashboard {vendor && <span className="text-red-500">{vendor.username}</span>}
      </h3>

      {vendor.firm && (
        <>
          <p className="text-lg text-gray-800 mt-2 font-normal mb-6 max-sm:text-base">
            Add and Manage firm, products seamlessly!
          </p>
          <div className="flex justify-center items-center my-4 max-sm:flex-col">
            <img
              src={vendor.firm.image}
              alt={vendor.firm.firmName}
              className="h-42 w-auto rounded-md mr-5 max-sm:w-[80vw] max-sm:m-0 max-sm:mb-3 max-sm:object-scale-down"
            />
            <div className="flex flex-col gap-2 items-start justify-items-start min-w-[251px] border-1 border-gray-200 p-4 rounded-lg max-sm:w-[80vw] max-sm:items-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
              <h2 className="relative text-center text-3xl font-bold tracking-tight text-indigo-600 border-b-4 border-orange-400">
                {vendor.firm.firmName}
              </h2>
              <p className="text-gray-900 text-md font-medium">
                {vendor.firm.area}
              </p>
              <p className="text-gray-900 text-md font-medium">
                Category:{" "}
                <span className="font-normal capitalize">
                  {vendor.firm.category.join(" & ")}
                </span>
              </p>
              <p className="text-gray-900 text-md font-medium">
                Cuisine:{" "}
                <span className="font-normal capitalize">
                  {vendor.firm.region.join(", ")}
                </span>
              </p>
            </div>
          </div>
        </>
      )}
      {vendor.firm ? (
        <>
          <div className="flex justify-center gap-3 mt-8 max-sm:flex-wrap max-sm:gap-y-4">
            <Link to="/add-product">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer font-bold">
                Add Product
              </button>
            </Link>
            <Link to="/products">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer font-bold">
                View Products
              </button>
            </Link>
            <button
              type="button"
              className="block px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-950 cursor-pointer font-bold mb-20"
              onClick={handleToggleModal}
            >
              Delete Firm
            </button>
          </div>
          {isModalOpen && (
            <div
              id="popup-modal"
              className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full backdrop-blur-sm bg-black/50 max-sm:p-4"
            >
              <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-800 max-sm:p-2">
                <button
                  type="button"
                  className="absolute top-3 right-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleToggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1L7 7M7 7L13 13M7 7L13 1M7 7L1 13"
                    />
                  </svg>
                </button>
                <div className="p-4 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 max-sm:text-base">
                    Are you sure you want to delete this firm? <br />
                    This will remove the firm and its products.
                  </h3>
                  <button
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-sm px-5 py-2.5"
                    onClick={handleDeleteFirm}
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-semibold rounded-lg text-sm px-5 py-2.5 ml-3"
                    onClick={handleToggleModal}
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col justify-center gap-3 mt-4 max-sm:p-6 max-sm:mt-0">
          <p className="text-2xl font-bold text-green-600 mb-6 max-sm:mb-0">
            Add Your Firm/Restaurant Here👇
          </p>
          <Link to="/add-firm">
            <button className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 cursor-pointer font-bold">
              Add Firm
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
