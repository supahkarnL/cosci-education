import { Field } from "formik";
import React from "react";

export default function อิงเกณฑ์() {
  return (
    <div className="flex flex-row gap-4 pt-5 items-center">
      <div className="flex-none w-32">คะแนนสูงสุด:</div>
      <div className="form-floating w-20 ">
        <Field
          type="number"
          name="highest"
          id="highest"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="100"
        />
      </div>

      <div className="flex-none w-38">ความกว้างช่วงเกรด:</div>
      <div className="form-floating w-20">
        <Field
          name="distance"
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="5"
          id="distance"
        />
      </div>
      <div className="flex-none text-xs text-red-600 w-38">
        (*ค่ามาตรฐานคือ 5)
      </div>
    </div>
  );
}
