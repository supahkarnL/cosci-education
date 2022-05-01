import React, { useState, useEffect, useMemo } from "react";
import "../css/Home.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function Calculate() {
  const userinfo = useOutletContext();
  const userid = userinfo.id;
  console.log(userinfo);
  //popup
  const [open, setOpen] = useState(false);
  const togglePopup = () => {
    setOpen(!open);
  };

  //table
  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState([]);

  //data

  const [SelectedSubject, SetSelectedSubject] = useState("");
  const [selectedSection, SetSelectedSection] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [calculateinfo, setCalculateinfo] = useState("");

  const fetchClassData = async () => {
    const response = await axios
      .get(`http://192.168.1.35:3001/classroom/${userid}`)
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

  //link
  // const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/InputInfo";
  let history = useNavigate();

  const initialValues = {
    subject: "",
    section: "",
    userid: userid,
  };

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("You must input a Subject!"),
    section: Yup.string().max(3).required(),
  });

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setDataSource([...dataSource]);
    }
  };

  //submit

  const onSubmit = (data) => {
    axios.post("http://192.168.1.35:3001/classroom", data).then((response) => {
      history("/calculate");
      console.log(data);
      setOpen(!open);
      fetchClassData();
    });
  };

  return (
    <div
      className="container h-screen mt-5 pt-5 
    rounded-md px-5 bg-white "
    >
      <p className="text-2xl border-b-2 border-slate-800">ประวัติการตัดเกรด</p>
      <div className="flex justify-between pt-3">
        <div className="pt-5">เลือกวิชา:</div>
        <div className="pt-5">
          <button
            type="button"
            className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            data-toggle="modal"
            onClick={() => setOpen(!open)}
          >
            เพิ่มวิชา
          </button>
        </div>
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
            <div className="pt-5">กรอกข้อมูลวิชา</div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <div className="flex flex-row gap-4 pt-5 items-center">
                  <div className="flex-none w-20">ชื่อวิชา:</div>
                  <div class="justify-start pt-3">
                    <Field
                      type="text"
                      name="subject"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Web Programming"
                      id="inputSubject"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-4 pt-5 items-center">
                  <div className="flex-none w-20">Section:</div>
                  <div className="form-floating w-20">
                    <Field
                      name="section"
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="B00"
                      id="inputSection"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4 pt-5 justify-center">
                  <button
                    type="submit"
                    // onClick={() => setOpen(!open)}
                    className="inline-block items-end px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    เพิ่มวิชา
                  </button>
                  <button
                    type="cancel"
                    className="inline-block items-end px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => setOpen(!open)}
                  >
                    ยกเลิก
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      <div className="flex justify-start pt-3">
        <div className="flex flex-col w-full">
          <div className="flex justify-center">
            <div className="mb-3 w-full">
              <input
                type="search"
                className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid 
        rounded
        transition
        ease-in-out
        m-0
        border-blue-600
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                id="exampleSearch"
                placeholder="ค้นหาวิชา"
                value={value}
                onChange={filterData}
              />
            </div>
          </div>
          <div className="overflow-x-auto h-5/6 sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <tbody>
                    {value.length > 0
                      ? tableFilter.map((data) => {
                          return (
                            <tr
                              onClick={() => {
                                history(`/InputInfo/${data.uuid}`);
                              }}
                              to={`/InputInfo/${data.uuid}`}
                              key={data.uuid}
                            >
                              <td>
                                <div className="flex w-full justify-center ">
                                  <div className="flex flex-col sm:flex-row w-full rounded-lg bg-white shadow-lg h-32 my-1 border-blue-600 border border-solid">
                                    <div className="p-5 flex flex-col justify-start">
                                      <h5 className="text-gray-900 text-xl font-medium mb-2">
                                        {data.subject}
                                      </h5>
                                      <p className={`text-gray-700 text-base`}>
                                        Section: {data.section}
                                      </p>
                                      <p
                                        className={`text-gray-700 text-base mb-4 `}
                                      >
                                        ตัดเกรดรูปแบบ:{" "}
                                        {JSON.parse(data.calculateinfo).type}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : dataSource.map((data) => {
                          return (
                            <tr
                              onClick={() => {
                                history(`/InputInfo/${data.uuid}`);
                              }}
                              to={`/InputInfo/${data.uuid}`}
                              key={data.uuid}
                            >
                              <td>
                                <div className="flex w-full justify-center">
                                  <div className="flex flex-col sm:flex-row w-full rounded-lg bg-white shadow-lg h-32 my-1 border-blue-600 border border-solid">
                                    <div className="p-5 flex flex-col justify-start">
                                      <h5 className="text-gray-900 text-xl font-medium mb-2">
                                        {data.subject}
                                      </h5>
                                      <p className="text-gray-700 text-base">
                                        Section: {data.section}
                                      </p>
                                      <p
                                        className={`text-gray-700 text-base mb-4 `}
                                      >
                                        ตัดเกรดรูปแบบ:{" "}
                                        {JSON.parse(data.calculateinfo).type}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
