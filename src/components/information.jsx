import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function information() {
  const userinfo = useOutletContext();
  const userid = userinfo.id;
  const [dataSource, setDataSource] = useState([]);
  const fetchClassData = async () => {
    const response = await axios
      .get(`https://cosci-education-thesis.herokuapp.com/classroom/${userid}`)
      .catch((err) => console.log(err));

    if (response) {
      const dataSource = response.data;
      // setCalculateinfo(JSON.parse(response.data.calculateinfo));
      console.log("Products: ", dataSource);

      setDataSource(dataSource);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, []);
  return (
    <div
      className="container h-screen mt-5 pt-5 
rounded-md px-5 bg-white "
    >
      <div className="bg-white p-3 border-t-4 border-blue-700">
        <div className="flex justify-center">
          <Icon
            icon="healthicons:ui-user-profile"
            style={{ fontSize: "100px" }}
          />
        </div>
        <div className="flex justify-between pt-10">
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            ชื่อ
          </h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6"></h3>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            นามสกุล
          </h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6"></h3>
        </div>
        <div className="flex justify-between pt-10">
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            Username
          </h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6"></h3>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            Password
          </h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6"></h3>
        </div>
        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
          deserunt
        </p>
      </div>

      <div className="my-4" />
    </div>
  );
}
