import React from "react";
import gif from "../assets/test.gif";
import gif2 from "../assets/test2.gif";
import { useState } from "react";

export default function guide() {
  //popup
  const [open, setOpen] = useState(false);
  const togglePopup = () => {
    setOpen(!open);
  };
  return (
    <div
      className="container h-auto mt-5 pt-5 
rounded-md px-5 bg-white "
    >
      <p className="text-2xl border-b-2 border-slate-800">คู่มือการใช้งาน</p>

      <div className="pt-5 text-md pl-5">วิธีการทำงาน:</div>

      <div className="pt-5 text-md pl-5">
        1.เลือกวิชาที่ต้องการทำการตัดเกรด
        หรือเพิ่มวิชาใหม่ที่ต้องการทำการตัดเกรด
      </div>
      <div className="flex justify-center pt-3">
        <img src={gif} className="max-w-2xl h-auto py-2" />
      </div>
      <div className="flex">
        <div className="pt-2 text-md pl-5">
          2.กรอกข้อมูลคะแนน สามารถ import รายชื่อนักเรียน และคะแนนจากไฟล์ excel
          โดยจัดวาง column และชื่อ header ให้ตรงตามรูปแบบ
        </div>
        <button
          type="button"
          className="inline-block mx-4 px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          data-toggle="modal"
          onClick={() => setOpen(!open)}
        >
          รูปแบบไฟล์ import
        </button>
      </div>
      {open && (
        <div className="popup-box">
          <div
            className="box"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="flex justify-center pt-3">
              <img
                src="https://sv1.picz.in.th/images/2022/05/13/Hco9mf.png"
                className="max-w-lg h-auto py-2"
              />
            </div>
            <div className="flex justify-center pt-3">
              <button
                type="cancel"
                className="inline-block items-end px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => setOpen(!open)}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-2 text-md pl-5">
        3.เลือกวิธีการตัดเกรด (อิงเกณฑ์ หรือ อิงกลุ่ม)
        จากนั้นเลือกเกรดที่ต้องการ
      </div>
      <div className="flex justify-center pt-3">
        <img src={gif2} className="max-w-4xl h-auto py-2 w-[32rem]" />
      </div>
      <div className="pt-2 text-md pl-5">
        4.ระบบทำการคำนวณเกรด และแสดงผลเกรดของนิสิตแต่ละบุคคลในรูปแบบตาราง
      </div>
      <div className="pt-2 text-md pl-5">
        5.เมื่อกดถัดไป ระบบทำการสรุปข้อมูลในรูปแบบแผนภาพ
      </div>
    </div>
  );
}
