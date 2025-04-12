import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-2 max-sm:p-3 mt-30">
      <h3 className="text-red-500 font-bold text-3xl mb-3">Page Not Found</h3>
      <img
        src="https://res.cloudinary.com/drdfwrz0i/image/upload/v1744429849/page-not-found-illustartion_wlaevs.png"
        alt="not-found"
        className="h-45 sm:h-70 w-auto"
      />
      <p className="text-gray-800 font-bold text-xl mb-4">
        OOPS 404 Page Not Found...!
      </p>
      <Link to="/">
        <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 cursor-pointer font-bold">
          Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
