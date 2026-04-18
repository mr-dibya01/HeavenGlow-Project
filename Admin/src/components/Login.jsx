import React, { useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
// import 'dotenv/config'


function Login({ setToken }) {
  let [formData, setFormData] = useState({});
  // console.log(formData);

  const handleSubmit =async (e) => {
    e.preventDefault(); 
    try {
      let res=await axios.post(import.meta.env.VITE_SERVER_URL + 'api/user/admin',formData);
      // console.log(res);
      setToken(res.data.token);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Login failed!");
    }
  }

  return (
    <div className=" flex items-center justify-center flex-col h-[100vh] w-[100vw] px-4">
      <div className=" px-6 py-6 shadow-2xl rounded-md w-full sm:w-[370px]">
        <h1 className="py-4 text-center text-xl font-semibold mb-2">Admin Panel</h1>
        <form onSubmit={ handleSubmit } className="flex flex-col gap-4">
          <div>
            <label htmlFor="" className="text-gray-600 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-2 h-10 rounded-md border border-black mt-2"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="" className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-2 h-10 rounded-md border border-black  mt-2"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="bg-black px-4 py-2 mt-4 text-white rounded-md">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;








