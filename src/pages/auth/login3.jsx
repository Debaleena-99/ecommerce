import React from "react";
import { Link } from "react-router-dom";
import Social from "./common/social";
import LoginForm from "./common/login-form";
import { ToastContainer } from "react-toastify";
import useDarkMode from "@/hooks/useDarkMode";
const login3 = () => {
  const [isDark] = useDarkMode();
  return (
  
      <div className="lg-inner-column ">       
        <div className=" w-full flex flex-col items-center ">
          <div className="auth-box-3 mt-40">
            <LoginForm />
          </div>
        </div>
      </div>
    
  );
};

export default login3;
