import React from "react";

export default function guide() {
  return (
    <div
      className="container h-screen mt-5 pt-5 
rounded-md px-5 bg-white "
    >
      <p className="text-2xl border-b-2 border-slate-800">คู่มือการใช้งาน</p>
      <div className="pt-5 text-md pl-5">วิธีการทำงาน:</div>
      <div className="pt-5 text-md pl-5">
        1.เลือกวิชาที่ต้องการทำการตัดเกรด
        หรือเพิ่มวิชาใหม่ที่ต้องการทำการตัดเกรด
      </div>
      <div className="pt-2 text-md pl-5">
        2.กรอกข้อมูลคะแนน สามารถ import รายชื่อนักเรียน และคะแนนจากไฟล์ excel
      </div>
      <div className="pt-2 text-md pl-5">
        3.เลือกวิธีการตัดเกรด (อิงเกณฑ์ หรือ อิงกลุ่ม)
        จากนั้นเลือกเกรดที่ต้องการ
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
