import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { apiUrl } from "../data/apiPath";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookie.get("token")) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Please fill required fields");
    } else {
      try {
        setInProgress(true);
        setErrorMessage("");
        const userDetails = { email, password };
        const response = await fetch(`${apiUrl}/vendor/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });
        const data = await response.json();
        if (response.ok) {
          Cookie.set("token", data.token, { expires: 7 });
          Cookie.set("vendorId", data.id, { expires: 7 });
          toast.success("Login Successful");
          navigate("/");
          setEmail("");
          setPassword("");
          setErrorMessage("");
          setInProgress(false);
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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-20 sm:mt-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="h-22 w-auto mx-auto"
          src="https://res.cloudinary.com/drdfwrz0i/image/upload/v1744429848/FooKart_Logo_kylcqf.png"
          alt="FoodKart"
        />
        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-8 pt-10 rounded-lg max-sm:p-10">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password<span className="text-red-500 ml-[1px]">*</span>
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}

          <div>
            {inProgress ? (
              <button
                type="button"
                className="flex w-full justify-center items-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-6"
                disabled
              >
                <ClipLoader color="#ffffff" size={20} className="mr-1" />
                Processing…
              </button>
            ) : (
              <button
                type="submit"
                className="flex cursor-pointer w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
              >
                Login
              </button>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            to="/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
