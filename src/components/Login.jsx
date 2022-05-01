import React, { useState, useEffect } from "react";
import axios from "axios";
import IndexHeader from "./indexHeader";
import IndexFooter from "./indexFooter";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const { authState, setAuthState } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken != null) {
      navigate("/");
    }
  }, []);

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://192.168.1.35:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.error,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Validation Success",
          text: "You are logging in . . .",
        });
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          userRole: response.data.userRole,
          status: true,
        });
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <div style={{ backgroundColor: "#36609d" }} className="mx-auto">
      <IndexHeader />
      <div className="flex justify-center px-6 my-12">
        {/* Row */}
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          {/* Col */}
          <div className="w-full h-auto bg-gray-400 lg:block lg:w-1/2 bg-cover rounded-l-lg"></div>
          {/* Col */}
          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">เข้าสู่ระบบ</h3>

            <div className="mb-4">
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-blue-600 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="******************"
              />
              {/* <p className="text-xs italic text-red-500">
                  Please choose a password.
                </p> */}
            </div>

            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                onClick={login}
              >
                Sign In
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                <Link to="/register">Create an Account!</Link>
              </a>
            </div>
            <div className="text-center">
              <a
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="./forgot-password.html"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
      <IndexFooter />
    </div>
  );
}

export default Login;
