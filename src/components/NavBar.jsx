import React from "react";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NavBar = () => {
  const navigate = useNavigate();
  const token = Cookie.get("token");

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("vendorId");
    Cookie.remove("firmId");
    toast.success("Logout Successful!");
    navigate("/login");
  };
  return (
    <nav className="bg-indigo-500 text-white py-2.5 flex justify-between items-center px-4 fixed w-screen top-0 z-10 max-sm:h-20">
      <Link to="/">
        <div className="flex items-center">
          <img
            className="h-12 w-auto mx-auto max-sm:h-15"
            src="https://i.postimg.cc/MTXKhC1h/Foo-Kart-Logo.png"
            alt="FoodKart"
          />
          <h3 className="text-2xl font-bold ml-2 max-sm:text-3xl">Vendor</h3>
        </div>
      </Link>
      {token ? (
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-white text-indigo-500 rounded hover:bg-stone-100 cursor-pointer font-medium"
        >
          Logout
        </button>
      ) : (
        <div>
          <button className="px-3 py-1 bg-white text-indigo-500 rounded hover:bg-stone-100 cursor-pointer font-medium mr-3 max-sm:mr-1 max-sm:px-2">
            <Link to="/login">Login</Link>
          </button>
          <button className="px-3 py-1 bg-white text-indigo-500 rounded hover:bg-stone-100 cursor-pointer font-medium max-sm:px-2">
            <Link to="/signin">Sign in</Link>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
