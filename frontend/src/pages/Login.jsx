import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login"); // "login" or "register"
  const [showPassword, setShowPassword] = useState(false);
  const {token , setToken , navigate , backendUrl} = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       if(currentState === 'Sign Up') {
          const res = await axios.post(backendUrl + '/api/user/register' ,{
            name,
            email,
            password
          })
          if(res.data.success) {
            setToken(res.data.token);
            localStorage.setItem('token' , res.data.token);
          } else {
            toast.error(res.data.message);
          }
       } else {
          const res = await axios.post(backendUrl + '/api/user/login' ,{
            email,
            password
          })
          if(res.data.success) {
            setToken(res.data.token);
            localStorage.setItem('token' , res.data.token);
            
          } else {
            toast.error(res.data.message);
          }
       }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.error(err);
    }
  }
  useEffect(() => {
    if(token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-rose-800" />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="relative w-full">
          {currentState === "Login" ? (
            ""
          ) : (
            <>
              <input
                type="text"
                id="user"
                placeholder=" "
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded 
                          focus:outline-none focus:border-black peer"
              />
              <label
                htmlFor="user"
                className="absolute text-sm text-gray-500 duration-300 transform 
                          -translate-y-4 scale-75 top-4 z-10 origin-[0] left-3
                          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                          peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black"
              >
                Name*
              </label>
            </>
          )}
        </div>

        <div className="relative w-full">
          <input
            type="email"
            id="email"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded 
            focus:outline-none focus:border-black peer"
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 duration-300 transform 
            -translate-y-4 scale-75 top-4 z-10 origin-[0] left-3
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
            peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black"
          >
            Email*
          </label>
        </div>

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded 
            focus:outline-none focus:border-black peer pr-10"
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 duration-300 transform 
            -translate-y-4 scale-75 top-4 z-10 origin-[0] left-3
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
            peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black"
          >
            Password*
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          {currentState === "Login" ? <p className="text-gray-500">Forgot Password?</p> : ''}
          {
            currentState === "Login" ? <p onClick={() => setCurrentState('Sign Up')} className="text-gray-500 cursor-pointer">Create an account</p >
             : <p onClick={() => setCurrentState('Login')} className="text-gray-500 cursor-pointer">Already have an account? Login</p >
          }
        </div>
      </div>
      <button className="bg-rose-500 text-white px-8 py-2 mt-4 rounded">{currentState === 'Login' ? 'Login' : 'Sign Up'}</button>
    </form>
  );
};

export default Login;
