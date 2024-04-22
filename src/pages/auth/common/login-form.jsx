import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", values);

      if (response.status === 200) {
        if (response.data.token) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          navigate("/dashboard");
        } else {
          toast.error("Login failed: " + response.data.error);
        }
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="username">Username</label>
            <Field
              id="username"
              name="username"
              type="text"
              className="h-[48px] border rounded-md px-3"
            />
            <ErrorMessage name="username" component="div" className="text-red-500" />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              className="h-[48px] border rounded-md px-3"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>

          <div className="flex justify-between">
            <label className="flex items-center">
              <Field
                type="checkbox"
                name="keepSignedIn"
                className="mr-2"
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
            className="btn btn-dark block w-full text-center"
          />
        </Form>
      </Formik>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
