import React, { useState, useEffect, Fragment } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import * as Yup from "yup";
import Swal from "sweetalert2";

import * as XLSX from "xlsx";

export default function InputInfo() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [data, setData] = useState([]);
  const [studentsdata, setStudentsdata] = useState([
    {
      studentid: "0",
      studentname: "",
      studentscore: "0",
    },
  ]);

  //add data
  const initialValues = {
    studentid: "",
    studentname: "",
    studentscore: "",
  };

  const testTableonSWAL = () => {
    <a>hi</a>;
  };

  const validationSchema = Yup.object().shape({
    studentid: Yup.string()
      .matches(/^[0-9]+$/, "ตัวเลขเท่านั้น")
      .min(10, "รหัสนิสิตไม่ครบ 11 หลัก")
      .max(11, "รหัสนิสิตเกิน 11 หลัก")
      .required(),
    studentname: Yup.string().required(),
    studentscore: Yup.number().positive().min(0).max(100),
  });

  //edit data
  const [editStudenId, setEditStudentId] = useState(null);

  const [editScore, setEditScore] = useState({
    studentscore: "",
  });

  const [editFormData, setEditFormData] = useState({
    studentid: "",
    studentname: "",
    studentscore: "",
  });

  let history = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.1.35:3001/classroom/byId/${id}`)
      .then((response) => {
        console.log(id);
        setData(response.data);
        setStudentsdata(JSON.parse(response.data.students));
        console.log(JSON.parse(response.data.students));
      });
  };

  const ExcelPopup = async () => {
    const { value: file } = await Swal.fire({
      title: "import excel file",
      input: "file",
      inputAttributes: {
        accept: ".xlsx",
        "aria-label": "Upload your excel file",
      },
    });

    if (file) {
      const promise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
          const bufferArray = e.target.result;
          const workbook = XLSX.read(bufferArray, { type: "buffer" });
          const worksheetname = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetname];
          const data = XLSX.utils.sheet_to_json(worksheet);
          resolve(data);
        };

        reader.onerror = (error) => {
          reject(error);
        };
      });

      promise.then((data) => {
        console.log(data);
        var addingresult = [];
        for (var i = 0; i < data.length; i++) {
          if (
            data[i].hasOwnProperty("รหัสนิสิต") &&
            data[i].hasOwnProperty("ชื่อนามสกุล")
          ) {
            var score = 0;
            if (data[i].hasOwnProperty("คะแนน")) {
              score = data[i].คะแนน;
            }
            addingresult.push({
              studentid: JSON.stringify(data[i].รหัสนิสิต),
              studentname: data[i].ชื่อนามสกุล,
              studentscore: score,
            });
          } else {
            //no property
          }
        }
        console.log(addingresult);

        Swal.fire({
          title: "Do you want to save the changes?",
          html: "",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            let z = studentsdata.concat(addingresult);
            setStudentsdata(z);
            Swal.fire("Saved!", "", "success");
            InputToApi(z);
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
        console.log(studentsdata);
      });
    } else {
      console.log("no");
    }
  };

  const InputToApi = (studentdata) => {
    console.log(studentdata);
    axios
      .put(`http://192.168.1.35:3001/classroom/byId/${id}`, {
        students: studentdata,
      })
      .then((response) => {
        fetchData();
        console.log(response);
      });
  };

  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const onSubmitScore = (e) => {};

  //editrow
  const handleEditClick = (e, info) => {
    e.preventDefault();
    setEditStudentId(info.studentid);

    const formValues = {
      studentid: info.studentid,
      studentname: info.studentname,
      studentscore: info.studentscore ?? "0",
    };

    setEditFormData(formValues);
  };

  //popup
  const [open, setOpen] = useState(false);
  const togglePopup = () => {
    setOpen(!open);
  };

  const onSubmit = (data) => {
    const newStudentData = [...studentsdata];

    const index = studentsdata.length;
    newStudentData[index] = data;
    setStudentsdata(newStudentData);

    axios
      .put(`http://192.168.1.35:3001/classroom/byId/${id}`, {
        students: newStudentData,
      })
      .then((response) => {
        fetchData();
        console.log(response);
        setOpen(!open);
      });
  };

  //canceledit
  const handleCAncelEditClick = () => {
    setEditStudentId(null);
  };

  //delete data
  const handleDeleteClick = (ID) => {
    const newStudent = [...studentsdata];
    const index = studentsdata.findIndex((info) => info.studentid === ID);
    newStudent.splice(index, 1);
    setStudentsdata(newStudent);
    console.log(studentsdata);

    axios
      .put(`http://192.168.1.35:3001/classroom/byId/${id}`, {
        students: newStudent,
      })
      .then((response) => {
        console.log(id);
        fetchData();
        console.log(response);
      });
  };

  //update edit data
  const handleUpdate = (e) => {
    e.preventDefault();
    const editedstudentData = {
      studentid: editFormData.studentid,
      studentname: editFormData.studentname,
      studentscore: editFormData.studentscore,
    };
    const newStudentData = [...studentsdata];
    console.log(id);
    console.log(newStudentData);
    const index = studentsdata.findIndex(
      (infos) => infos.studentid === editStudenId
    );
    newStudentData[index] = editedstudentData;
    setStudentsdata(newStudentData);

    axios
      .put(`http://192.168.1.35:3001/classroom/byId/${id}`, {
        students: newStudentData,
      })
      .then((response) => {
        console.log(newStudentData);
        // fetchData();
        console.log(response);
      });
    setEditStudentId(null);
  };

  return (
    <div
      className="container h-screen mt-5 pt-5 
    rounded-md px-5 bg-white"
    >
      <div className="flex pt-5 gap-6">
        <div className="grow">
          <h1>วิชา: {data.subject}</h1>
          <h1>Section: {data.section}</h1>
        </div>
        <button
          type="button"
          class={`inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out `}
          onClick={() => ExcelPopup()}
        >
          นำเข้าข้อมูลจากไฟล์
        </button>

        <button
          type="button"
          class={`inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out `}
          data-toggle="modal"
          onClick={() => togglePopup()}
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
            <h2>เพิ่มรายชื่อนักเรียน </h2>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <label>รหัสนิสิต</label>
                <Field
                  className="form-control block w-72 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="studentid"
                  placeholder="กรอกรหัสนิสิต"
                />
                <ErrorMessage name="studentid">
                  {(msg) => (
                    <p className="text-xs italic text-red-500">{msg}</p>
                  )}
                </ErrorMessage>
                <label>ชื่อ-นามสกุล</label>
                <Field
                  className="form-control block w-72 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="studentname"
                  placeholder="กรอกชื่อจริง"
                />
                <ErrorMessage name="studentname">
                  {(msg) => (
                    <p className="text-xs italic text-red-500">{msg}</p>
                  )}
                </ErrorMessage>
                <label>คะแนน</label>
                <Field
                  className="form-control block w-72 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="studentscore"
                  placeholder="กรอกคะแนน"
                />
                <ErrorMessage name="studentscore">
                  {(msg) => (
                    <p className="text-xs italic text-red-500">{msg}</p>
                  )}
                </ErrorMessage>

                <div className="flex justify-center gap-5 py-5">
                  <button
                    type="submit"
                    className="inline-block items-end px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    เพิ่มรายชื่อ
                  </button>
                  <button
                    type="cancel"
                    onClick={() => setOpen(!open)}
                    className="inline-block items-end px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    ยกเลิก
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      <div class="flex flex-col h-4/6 pt-7">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <form onSubmit={handleUpdate}>
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
                    {studentsdata.map((info, index) => (
                      <Fragment>
                        {editStudenId === info.studentid ? (
                          <EditableRow
                            info={info}
                            index={index}
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCAncelEditClick={handleCAncelEditClick}
                          />
                        ) : (
                          <ReadOnlyRow
                            // handleScoreClick={handleScoreClick}
                            info={info}
                            index={index}
                            // editScore={editScore}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                          />
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-5 px-5">
        <button
          type="button"
          onClick={() => {
            history(`/calscoreinfo/${data.uuid}`);
          }}
          class={`inline-block text-m px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium  leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out `}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
