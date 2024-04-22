import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Import react-hook-form
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import Axios

const LoginForm = () => {
  const [checked, setChecked] = useState(false);
  const { register, handleSubmit } = useForm(); // Initialize useForm
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", data);

      if (response.status === 200) {
        // Assuming the response contains a token upon successful login
        if (response.data.token) {
          // Navigate to the dashboard if login is successful
          const token = response.data.token;
          localStorage.setItem('token', token);
          navigate("/dashboard");
        } else {
          // Handle unsuccessful login (optional)
          console.error("Login failed:", response.data.error);
        }
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5 mb-5">
      <Textinput
        name="username"
        placeholder="Username"
        // label="Username"
        defaultValue="kminchelle"
        type="text"
        className="h-[48px] rounded-full"
        register={register} // Pass register function
      />
      <Textinput
        name="password"
        placeholder="Password"
        // label="Password"
        type="password"
        defaultValue="0lelplR"
        className="h-[48px] rounded-full"
        register={register} // Pass register function
      />
      <div className="flex justify-between">
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="mr-2 text-white"
          />
          Keep me signed in
        </label>
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        text="Sign in"
        className="btn bg-lime-500 text-white w-full block  text-center "
      />
    </form>
  );
};

export default LoginForm;

