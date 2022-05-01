import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function TableData() {
  let { id } = useParams();

  const [tdata, setTData] = useState([]);
  const [stdata, setSTData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:3001/classroom/byID/${id}}`)
      .then((response) => {
        setTData(response.data);
        setSTData(JSON.parse(response.data.students));
        console.log(JSON.parse(response.data.students));
      });
  };

  const [addFormData, SetAddFormData] = useState({
    id: setTData.id,
    subject: setTData.subject,
    section: setTData.section,
    students: {
      studentid: "",
      studentname: "",
      studentLname: "",
      studentscore: "",
      studenttotalscore: "",
    },
  });

  const handleFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("studentid");
    const fieldValue = e.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    SetAddFormData(newFormData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: setTData.id,
      subject: setTData.subject,
      section: setTData.section,
      student: {
        studentid: addFormData.student.studentid,
        studentname: addFormData.student.studentname,
        studentLname: addFormData.studentLname,
        studentscore: addFormData.studentscore,
      },
    };
  };

  //popup
  const [open, setOpen] = useState(false);
  const togglePopup = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className="container h-screen mt-5 pt-5 
    rounded-md px-5 bg-white"
      >
        <div className="flex pt-5 gap-6">
          <div className="grow">
            <h1>วิชา: {tdata.subject}</h1>
            <h1>Section: {tdata.section}</h1>
          </div>
          <button
            type="button"
            class={`inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out `}
            data-toggle="modal"
            onClick={() => setOpen(!open)}
          >
            เพิ่มรายชื่อนักเรียน
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
              <h2>เพิ่มรายชื่อนักเรียน {id} </h2>

              <form>
                <label>รหัสนิสิต</label>
                <input
                  className="form-control block w-72 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="number"
                  name="studentid"
                  required="required"
                  placeholder="กรอกรหัสนิสิต"
                />
                <label>ชื่อจริง</label>
                <input
                  className="form-control block w-72 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="studentname"
                  required="required"
                  placeholder="กรอกชื่อจริง"
                />
                <label>นามสกุล</label>
                <input
                  className="form-control block w-72 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="studentLname"
                  required="required"
                  placeholder="กรอกนามสกุล"
                />
                <label>คะแนน</label>
                <input
                  className="form-control block w-72 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  onSubmit={handleFormSubmit}
                  type="number"
                  name="studenttotalscore"
                  placeholder="กรอกคะแนน"
                />
                <div className="flex justify-center gap-5 py-5">
                  <button
                    type="submit"
                    className="inline-block items-end px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    เพิ่มรายชื่อ
                  </button>
                  <button
                    type=""
                    className="inline-block items-end px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => setOpen(!open)}
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div class="flex flex-col pt-7">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="border-b">
                    <tr>
                      <th>ลำดับ</th>
                      <th>รหัสนิสิต</th>
                      <th>ชื่อ-นามสกุล</th>
                      <th>คะแนน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {studentsdata.map((info, i) => (
                    <ReadOnlyRow info={{ info }} />
                  ))} */}
                    {stdata.map((item, i) => (
                      <tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-5 px-5">
          <button
            type="button"
            onClick={() => {
              history(`/calscoreinfo/${postObject.id}`);
            }}
            class={`inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out `}
          >
            ถัดไป
          </button>
        </div>
      </div>
      );
    </>
  );
}

export default TableData;
