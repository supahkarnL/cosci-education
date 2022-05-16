import React from "react";
import { useNavigate, Link } from "react-router-dom";
import pic from "../assets/unknownfeat.png";

export default function Check() {
  let history = useNavigate();
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 py-2">
      <div
        className="container h-screen mt-5 pt-5 
 "
      >
        <p className="text-5xl mt-52 pl-5">ฟีทเจอร์นี้ยังไม่พร้อมใช้งาน</p>

        <p className="text-2xl mt-5 pl-5">
          ขออภัยในความไม่สะดวก ฟีทเจอร์นี้อยู่ระกว่างการพัฒนา
          ท่านสามารถใช้ฟีทเจอร์
        </p>
        <div className="flex justify-start">
          <Link to={"/calculate"}>
            <a className="text-2xl pl-5 text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4">
              ตัดเกรด
            </a>
          </Link>
          <p className="text-2xl ">ได้ตามปกติ</p>
        </div>
      </div>
      <div
        className="container h-screen mt-5 pt-5 
 "
      >
        <img src={pic} className="max-w-3xl h-auto pt-20" />
      </div>
    </div>
  );
}
