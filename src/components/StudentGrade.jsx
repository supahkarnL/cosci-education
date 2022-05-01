import React, { useState, useEffect, Fragment, Component } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import ReadOnlyRow2 from "./ReadOnlyRow2";
import EditableRow2 from "./EditableRow2";
import * as Yup from "yup";
import {
  findingResultGrade,
  findingResultWithTypeA,
} from "./GradeCalculate/Gradecalculate";

const SpecialGrade = [
  { grade: "เลือกเกรด", id: "0", count: "0" },
  { grade: "A B+ B C+ C", id: "9", count: "5" },
  { grade: "A B+ B C+", id: "10", count: "4" },
  { grade: "A B+ B", id: "11", count: "3" },
];

export class StudentGrade extends Component {
  state = {
    students: [],
    SelectedGrade: "9",
    GradeCount: "",
    editFormData: { studentid: "", studentname: "", studentscore: "" },
    editStudenId: null,
    calculateType: "",
  };

  componentDidUpdate() {
    // console.log(this.state.editStudenId);
    // console.log(this.state.students[1]);
  }
  componentDidMount() {
    const { id } = this.props.params;
    axios
      .get(`http://192.168.1.35:3001/classroom/calculate/${id}`)
      .then((response) => {
        const testData = JSON.parse(response.data.students);

        const gradeid = response.data.gradetypeID[0].id;
        this.setState({ SelectedGrade: gradeid });

        const gradecount = response.data.gradetypeID[0].GradeCount;
        this.setState({ GradeCount: gradecount });

        const calculateinfo = JSON.parse(response.data.calculateinfo);
        if (calculateinfo.type == "อิงกลุ่ม") {
          const result = findingResultGrade(testData, gradecount, gradeid);
          this.setState({ students: result, calculateType: "อิงกลุ่ม" });

          // this.PutGrade(id, result);
        } else if (calculateinfo.type == "อิงเกณฑ์") {
          const highest = calculateinfo.highest;
          const distance = calculateinfo.distance;
          const result = findingResultWithTypeA(
            testData,
            highest,
            distance,
            gradeid
          );
          this.setState({ students: result, calculateType: "อิงเกณฑ์" });
        } else {
          console.log("error");
        }
      });
  }

  handleOnChange = (e) => {
    console.log(e.target.value);
    this.setState({ SelectedGrade: e.target.value });
  };

  handleSubmitGradeChange = () => {
    const { id } = this.props.params;
    console.log(id);

    const testData = this.state.students;
    const gradecount = this.state.GradeCount;
    const gradeid = parseInt(this.state.SelectedGrade);
    console.log(gradeid);
    if (
      this.state.SelectedGrade == 9 ||
      this.state.SelectedGrade == 10 ||
      this.state.SelectedGrade == 11
    ) {
      const gradematch = SpecialGrade.find((item) => {
        item.id == gradeid;
        console.log("match");
        return item.id == gradeid;
      });

      const gradecount = parseInt(gradematch.count);
      console.log(gradecount);
    } else {
      const gradecount = this.state.GradeCount;
      console.log(gradecount);
    }

    const result = findingResultGrade(testData, gradecount, gradeid);
    this.setState({ students: result, calculateType: "อิงกลุ่ม" });
    this.PutGrade(id, result, gradeid);
  };

  PutGrade = (id, result, gradeid) => {
    console.log(gradeid);
    axios
      .put(`http://192.168.1.35:3001/classroom/byId/calculate/${id}`, {
        students: result,
        gradetypeID: gradeid,
      })
      .then((response) => {
        console.log(response);
      });
  };

  //click edit
  handleEditClick = (e, info) => {
    e.preventDefault();
    this.setState({ editStudenId: info.studentid });

    const formValues = {
      studentid: info.studentid,
      studentname: info.studentname,
      studentscore: info.studentscore ?? "0",
      studentpercentile: info.percentile,
      studentTscore: info.Tscore,
    };

    this.setState({ editFormData: formValues });
  };

  //editform
  handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...this.state.editFormData };
    newFormData[fieldName] = fieldValue;

    this.setState({ editFormData: newFormData });
  };

  //update
  //update edit data
  handleUpdate = (e) => {
    const { id } = this.props.params;
    e.preventDefault();
    const index = this.state.students.findIndex(
      (infos) => infos.studentid === this.state.editStudenId
    );
    const studentid = this.state.editFormData.studentid;
    this.state.students[index].studentid = studentid;
    console.log(studentid);
    this.state.students[index].studentname =
      this.state.editFormData.studentname;

    const studentscore = this.state.editFormData.studentscore;
    this.state.students[index].studentscore = studentscore;
    console.log(this.state.students[index]);
    axios
      .put(`http://192.168.1.35:3001/classroom/byId/${id}`, {
        students: this.state.students,
      })
      .then((response) => {
        // fetchData();
        console.log(response);
      });
    this.setState({ editStudenId: null });
    this.handleSubmitGradeChange();
  };

  //canceledit
  handleCAncelEditClick = () => {
    this.setState({ editStudenId: null });
  };

  //putgradeandgotosummary

  handleconfirm = () => {
    const { id } = this.props.params;
    console.log(this.state.students);
    axios
      .put(`http://192.168.1.35:3001/classroom/byId/calculate/${id}`, {
        students: this.state.students,
      })
      .then((response) => {
        console.log(response);
      });

    this.props.history(`/summary/${id}`, {
      state: { students: this.state.students },
    });
  };

  render() {
    const historyID = this.props.params.id;
    return (
      <div
        className="container h-screen mt-5 pt-5 
    rounded-md px-5 bg-white"
      >
        <div className="flex flex-row gap-5 pt-5 items-center">
          <div className="flex-none w-26 ">ตัดเกรดรูปแบบเฉพาะ:</div>

          <select
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none `}
            disabled={this.state.calculateType == "อิงเกณฑ์"}
            name="grade"
            id="GradeSelector"
            value={this.state.SelectedGrade}
            onChange={this.handleOnChange}
          >
            {SpecialGrade.map((data) => (
              <option id={data.grade} value={data.id}>
                {data.grade}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={SpecialGrade.count == 0}
            onClick={this.handleSubmitGradeChange}
            class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            ตัดเกรด
          </button>
        </div>

        <div class="flex flex-col h-4/6 pt-7">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <form onSubmit={this.handleUpdate}>
                  <table class="min-w-full">
                    <thead class="border-b">
                      <tr>
                        <th>ลำดับ</th>
                        <th>รหัสนิสิต</th>
                        <th>ชื่อ-นามสกุล</th>
                        <th>คะแนน</th>

                        <th>Percentile</th>
                        <th>T-score</th>
                        <th>เกรด</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.students.map((info, index) => (
                        <Fragment>
                          {this.state.editStudenId === info.studentid ? (
                            <EditableRow2
                              info={info}
                              index={index}
                              editFormData={this.state.editFormData}
                              handleEditFormChange={this.handleEditFormChange}
                              handleCAncelEditClick={this.handleCAncelEditClick}
                            />
                          ) : (
                            <ReadOnlyRow2
                              info={info}
                              index={index}
                              handleEditClick={this.handleEditClick}
                              // handleDeleteClick={handleDeleteClick}
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
        <div className="flex justify-center gap-5 py-5 px-5">
          <button
            type="button"
            onClick={() => {
              this.props.history(`/calscoreinfo/${historyID}`);
            }}
            class={`inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out `}
          >
            ย้อนกลับ
          </button>
          <button
            type="button"
            onClick={() => {
              this.handleconfirm();
            }}
            class={`inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out `}
          >
            ถัดไป
          </button>
        </div>
      </div>
    );
  }
}

export default (props) => (
  <StudentGrade {...props} params={useParams()} history={useNavigate()} />
);
