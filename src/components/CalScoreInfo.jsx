import React, { useState, useEffect } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import * as Forms from "./Form/Form";
// import { GradefindingFvalue } from "./GradeCalculate/Gradecalculate";

const options = [
  {
    label: "เลือกรูปแบบการตัดเกรด...",
    value: "",
  },
  {
    label: "อิงเกณฑ์",
    value: "อิงเกณฑ์",
  },
  {
    label: "อิงกลุ่ม",
    value: "อิงกลุ่ม",
  },
];

const Grade = [
  { grade: "A B+ B C+ C D+ D E", id: "1", count: "5" },
  { grade: "A B+ B C+ C D+ D", id: "2", count: "4" },
  { grade: "A B+ B C+ C", id: "3", count: "3" },
  { grade: "A B C D E", id: "4", count: "5" },
  { grade: "A B C D", id: "5", count: "4" },
  { grade: "A B C", id: "6", count: "3" },
  { grade: "A B+ B", id: "7", count: "2" },
  { grade: "A B", id: "8", count: "2" },
];

export default function CalScoreInfo() {
  let { id } = useParams();

  const [dataSource, setDataSource] = useState([]);
  const [Studentdata, setStudentdata] = useState([
    {
      studentid: "0",
      studentname: "",
      studentscore: "0",
    },
  ]);
  const [dataGrade, setDataGrade] = useState([{}]);

  const [calscoreinfo, setCalscoreinfo] = useState([
    {
      type: "",
      highest: "",
      distance: "",
    },
  ]);

  const [selectorValue, setSelectorValue] = useState({});

  const FormObserver = () => {
    const { values } = useFormikContext();

    useEffect(() => {
      setSelectorValue(values);
    }, [values]);

    return null;
  };

  useEffect(() => {
    fetchData();
    fetchGrade();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.1.35:3001/classroom/byId/${id}`)
      .then((response) => {
        setDataSource(response.data);
        setStudentdata(JSON.parse(response.data.students));
        console.log(JSON.parse(response.data.students));
      });
  };

  const fetchGrade = () => {
    axios
      .get(`http://192.168.1.35:3001/classroom/calculate/${id}`)
      .then((response) => {
        setDataGrade(response.data.gradetypeID);
        console.log(dataGrade);
      });
  };

  //table
  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState({});

  //data
  const [SelectedGrade, SetSelectedGrade] = useState(1);
  const [selectedHighest, SetHighest] = useState("");
  const [selectedDistance, SetDistance] = useState("");
  const [SelectedType, SetSelectedType] = useState("");

  const [SelectedtStandard, SetSelectedStandard] = useState("");

  //link
  let history = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/InputInfo";

  //add data to array
  const initialValues = {
    type: "",
    highest: 100,
    distance: 5,
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string().required("You must select Type!"),
    highest: Yup.number().min(1).max(100).positive().required(),
    distance: Yup.number().min(0).positive().required(),
  });

  const onSubmit = (data) => {
    axios
      .put(`http://192.168.1.35:3001/classroom/calculatedata/${id}`, {
        calculateinfo: selectorValue,
        gradetypeID: SelectedGrade,
      })
      .then((response) => {
        history(`/studentgrade/${dataSource.uuid}`);
      });
  };

  const renderSelectedType = () => {
    if (!selectorValue.type) return <div></div>;
    const Form = Forms[selectorValue.type];
    return <Form />;
  };

  //mean
  var n = Studentdata.length;
  var mean = 0;
  var sum = 0;
  var studentSort = Studentdata.sort();
  var min = studentSort[studentSort.length - 1].studentscore;
  var max = studentSort[0].studentscore;

  for (var i = 0; i < Studentdata.length; i++) {
    var sum = sum + parseInt(Studentdata[i].studentscore);
  }
  mean = sum / n;

  //SD
  var n = Studentdata.length;
  var zigmax = 0;
  var doublemean = 0;
  var diffN = 0;
  var diff = 0;
  var sqr = 0;

  for (var i = 0; i < Studentdata.length; i++) {
    zigmax =
      zigmax +
      parseInt(Studentdata[i].studentscore * Studentdata[i].studentscore);

    // sum = sum + parseInt(Studentdata[i].studentscore);
  }
  diffN = n - 1;
  mean = sum / n;
  doublemean = mean * mean;
  diff = zigmax - n * doublemean;
  diff = diff.toFixed(2);
  sqr = diff / diffN;
  sqr = Math.sqrt(sqr);
  sqr = sqr.toFixed(2);

  function CalculateGrade() {
    GradefindingFvalue(Studentdata, SelectedGrade);
    history(`/studentgrade/${dataSource.uuid}`);
  }

  return (
    <div className="container h-auto mt-5 py-5 px-5 rounded-md bg-white">
      <p className="text-2xl border-b-2 border-slate-800">ประวัติการตัดเกรด</p>
      <div className="flex justify-evenly pt-3">
        <div className="pt-5">วิชา: {dataSource.subject}</div>
        <div className="pt-5">จำนวนนักเรียน: {Studentdata.length}</div>
        <div className="pt-5">คะแนนต่ำสุด: {min}</div>
        <div className="pt-5">คะแนนสูงสุด: {max}</div>
        <div className="pt-5">คะแนนเฉลี่ย: {mean}</div>
        <div className="pt-5">ค่ามาตรฐาน: {sqr}</div>
      </div>
      <div className="pt-5">เลือกวิธีคำนวณช่วงเกรด</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="flex justify-start pt-3 gap-6 items-center">
            รูปแบบ:
            <Field
              as="select"
              className="form-select appearance-none block
w-56
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding bg-no-repeat
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              placeholder="Search"
              name="type"
              id="type"
            >
              <FormObserver />
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </Field>
            <ErrorMessage
              name="type"
              render={(msg) => (
                <p className="text-xs italic text-red-500">{msg}</p>
              )}
            />
          </div>

          <div className="flex flex-row gap-5 pt-5 items-center">
            <div className="flex-none w-26 ">ตัดเกรด:</div>

            <Field
              className={`form-select appearance-none block
                  w-56
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding bg-no-repeat
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
              as="select"
              name="grade"
              id={SelectedGrade}
              value={SelectedGrade}
              onChange={(e) => SetSelectedGrade(e.target.value)}
            >
              {Grade.map((data) => (
                <option value={data.id}>{data.grade}</option>
              ))}
            </Field>
            <ErrorMessage
              name="grade"
              render={(msg) => (
                <p className="text-xs italic text-red-500">{msg}</p>
              )}
            />
          </div>

          {/* <div className="pt-5">เกรดที่เลือก:</div>

          {SelectedGrade} */}

          {renderSelectedType(selectorValue.type)}
          <ErrorMessage
            name="distance"
            render={(msg) => (
              <p className="text-xs italic text-red-500">{msg}</p>
            )}
          />
          <ErrorMessage
            name="highest"
            render={(msg) => (
              <p className="text-xs italic text-red-500">{msg}</p>
            )}
          />
          <div className="flex flex-row gap-4 pt-5 justify-center">
            <button
              type="button"
              onClick={() => {
                history(`/InputInfo/${dataSource.uuid}`);
              }}
              class={`inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out `}
            >
              ย้อนกลับ
            </button>
            <button
              type="submit"
              // onClick={() => {
              //   CalculateGrade();
              // }}
              className="inline-block items-end px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              ตัดเกรด
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
