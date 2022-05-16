import React, { useEffect, useState } from "react";
import IMG1 from "../assets/pam.jpg";
import IMG2 from "../assets/gam.jpg";
import IMG3 from "../assets/nine.jpg";
import { Icon } from "@iconify/react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Team() {
  return (
    <div
      className="container h-full mt-5 pt-5 
rounded-md px-5 bg-white "
    >
      <p className="text-2xl pb-2 pt-5 flex justify-center ">จัดทำโดย</p>
      <p className="text-2xl pb-2  flex justify-center pt-2">
        นิสิตชั้นปีที่ 4 วิทยาลัยนวัตกรรมสื่อสารสังคม
        เอกคอมพิวเตอร์เพื่อการสื่อสาร มหาวิทยาลัยศรีนครินทรวิโรฒ
      </p>

      <div className="grid grid-cols-3 gap-2">
        <div className="justify-self-center">
          <img
            src={IMG1}
            className="justify-self-center w-56 h-auto pt-10 rounded-full"
          />
          <p className="text-lg pb-2 pt-2 flex justify-center font-bold">
            ณัฐจรัสพร ทวีวุฒิเมธีกุล (แพม)
          </p>
          <p className="text-md pb-2 flex justify-center font-semibold text-blue-600">
            UX/UI Designer
          </p>
          <p className="text-sm flex justify-center pl-2 pb-2 font-semibold">
            Email: natjaratporn.p@gmail.com
          </p>

          <div className="flex justify-center ">
            <Icon icon="carbon:phone-filled" style={{ fontSize: "20px" }} />
            <p className="text-sm pl-2 pb-2 font-semibold">0952282648</p>
          </div>
        </div>
        <div className="justify-self-center">
          <img
            src={IMG2}
            className="justify-self-center w-56 h-auto pt-10 rounded-full"
          />
          <p className="text-lg pb-2 pt-2 flex justify-center font-bold">
            ศุภกานต์ เลี้ยงรัตนานนท์ (แก้ม)
          </p>
          <p className="text-md pb-2 flex justify-center font-semibold text-blue-600">
            Front-end Developer
          </p>

          <p className="text-sm flex justify-center pl-2 pb-2 font-semibold">
            Email: supahkarn.liang@gmail.com
          </p>

          <div className="flex justify-center ">
            <Icon icon="carbon:phone-filled" style={{ fontSize: "20px" }} />
            <p className="text-sm pl-2 pb-2 font-semibold">0873462531</p>
          </div>
        </div>
        <div className="justify-self-center">
          <img
            src={IMG3}
            className="justify-self-center w-56 h-auto pt-10 rounded-full"
          />
          <p className="text-lg pb-2 pt-2 flex justify-center font-bold">
            ณวี วิจิตรรัตน์ (นาย)
          </p>
          <p className="text-md pb-2 flex justify-center font-semibold text-blue-600">
            Back-end Developer
          </p>
          <p className="text-sm flex justify-center pl-2 pb-2 font-semibold">
            Email: navee.vjt@gmail.com
          </p>

          <div className="flex justify-center ">
            <Icon icon="carbon:phone-filled" style={{ fontSize: "20px" }} />
            <p className="text-sm pl-2 pb-2 font-semibold">0941562921</p>
          </div>
        </div>
      </div>
      <p className="text-2xl pb-10 flex justify-center pt-20">
        อาจารย์ที่ปรึกษา
      </p>
      <div className="grid grid-cols-2  gap-5">
        <div className="block p-6 rounded-lg shadow-lg bg-white border-b border-blue-800">
          <p className="text-2xl pb-2 flex justify-center ">
            อาจารย์สิทธิชัย วรโชติกำจร
          </p>
          <p className="text-lg pb-2 flex justify-center ">
            อาจารย์ที่ปรึกษาหลัก
          </p>
        </div>
        <div className="block p-6 rounded-lg border-b border-blue-800 shadow-lg bg-white">
          <p className="text-2xl pb-2 flex justify-center ">
            อาจารย์พัชราภรณ์ วรโชติกำจร
          </p>
          <p className="text-lg pb-2  flex justify-center ">
            อาจารย์ที่ปรึกษาร่วม
          </p>
        </div>
      </div>
    </div>
  );
}
