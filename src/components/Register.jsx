import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import IndexHeader from "./indexHeader";
import IndexFooter from "./indexFooter";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const initialValues = {
    username: "",
    password: "",
    userfname: "",
    userlname: "",
    userEmail: "",
    userRole: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Username is requied"),
    password: Yup.string().min(6).max(20).required("Password is required"),
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    userfname: Yup.string().max(255).required("You must input firstname"),
    userlname: Yup.string().max(255).required("You must input lastname"),
    userEmail: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("You must input email"),
    userRole: Yup.string().required("Topic is required!"),
  });

  const onSubmit = (data) => {
    console.log("test");
    axios
      .post("http://192.168.1.35:3001/auth", data)
      .then(() => {
        console.log(data);
        Toast.fire({
          icon: "success",
          title: "Register successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          errorname: ` ${error}`,
          footer: "<a>Why do I have this issue?</a>",
        });
      });
  };

  return (
    <>
      <div>
        <IndexHeader />
        <div className="container mx-auto">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div
                    className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                    style={{
                      backgroundImage:
                        'url("https://source.unsplash.com/Mv9hjnEUHR4/600x800%22)  ',
                    }}
                  />
                  <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center">
                      Create an Account!
                    </h3>

                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="username"
                      >
                        username
                      </label>
                      <Field
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        autocomplete="off"
                        id="username"
                        name="username"
                        placeholder="(Ex. John123...)"
                      />
                      <ErrorMessage
                        name="username"
                        render={(msg) => (
                          <p className="text-xs italic text-red-500">{msg}</p>
                        )}
                      />
                    </div>
                    <div className="mb-4 md:flex md:justify-between">
                      <div className="mb-4 md:mr-2 md:mb-0">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <Field
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          autocomplete="off"
                          id="inputCreatePost"
                          name="userfname"
                          placeholder="(Ex. Thongpoon...)"
                        />
                        <ErrorMessage
                          name="userfname"
                          render={(msg) => (
                            <p className="text-xs italic text-red-500">{msg}</p>
                          )}
                        />
                      </div>
                      <div className="md:ml-2">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <Field
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          autocomplete="off"
                          id="inputCreatePost"
                          name="userlname"
                          placeholder="(Ex. Thongdee...)"
                        />
                        <ErrorMessage
                          name="userlname"
                          render={(msg) => (
                            <p className="text-xs italic text-red-500">{msg}</p>
                          )}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Field
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        autocomplete="off"
                        id="userEmail"
                        name="userEmail"
                        placeholder="(Ex. Thongdee@gmail.com)"
                      />
                      <ErrorMessage
                        name="userEmail"
                        render={(msg) => (
                          <p className="text-xs italic text-red-500">{msg}</p>
                        )}
                      />
                    </div>
                    <div className="mb-4 md:flex md:justify-between">
                      <div className="mb-4 md:mr-2 md:mb-0">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="password"
                        >
                          Password
                        </label>

                        <Field
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          autocomplete="off"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="******************"
                        />
                        <ErrorMessage
                          name="password"
                          render={(msg) => (
                            <p className="text-xs italic text-red-500">{msg}</p>
                          )}
                        />
                      </div>
                      <div className="md:ml-2">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="c_password"
                        >
                          Confirm Password
                        </label>
                        <Field
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          autocomplete="off"
                          id="confirmpassword"
                          name="confirmpassword"
                          type="password"
                          placeholder="******************"
                        />
                        <ErrorMessage
                          name="confirmpassword"
                          render={(msg) => (
                            <p className="text-xs italic text-red-500">{msg}</p>
                          )}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Role
                      </label>
                      <Field
                        as="select"
                        name="userRole"
                        id="userRole"
                        className="form-select
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      >
                        <option value="">Choose...</option>
                        <option value="type_0">Student</option>
                        <option value="type_1">Teacher</option>
                      </Field>
                      <ErrorMessage
                        name="userRole"
                        render={(msg) => (
                          <p className="text-xs italic text-red-500">{msg}</p>
                        )}
                      />
                    </div>
                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Register Account
                      </button>
                    </div>
                    <hr className="mb-6 border-t" />
                    <div className="text-center">
                      <a
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        href="#"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="text-center">
                      <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                        <Link to={"/login"}>
                          Already have an account? Login!
                        </Link>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <IndexFooter />
      </div>
    </>
  );
};

export default Register;
