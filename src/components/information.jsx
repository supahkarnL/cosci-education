import React from "react";
import { Icon } from "@iconify/react";

export default function information() {
  return (
    <div
      className="container h-screen mt-5 pt-5 
rounded-md px-5 bg-white "
    >
      <div className="w-full md:w-3/12 md:mx-2">
        <div className="bg-white p-3 border-t-4 border-green-400">
          <div className="flex justify-center">
            <Icon
              icon="healthicons:ui-user-profile"
              style={{ fontSize: "50px" }}
            />
          </div>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            Jane Doe
          </h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6">
            Owner at Her Company Inc.
          </h3>
          <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
            deserunt
          </p>
          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Status</span>
              <span className="ml-auto">
                <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                  Active
                </span>
              </span>
            </li>
            <li className="flex items-center py-3">
              <span>Member since</span>
              <span className="ml-auto">Nov 07, 2016</span>
            </li>
          </ul>
        </div>

        <div className="my-4" />
      </div>
    </div>
  );
}
