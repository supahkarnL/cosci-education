import React from "react";
import { testData } from "./TestData";
// import { testDataf } from "./TestDataF";
// import { testDatacf } from "./TestDataCF";
// // import { testDataPercentile } from "./TestDataPercentile";
// import { testdataTscore } from "./testDataTscore";
// import { DataK } from "./TestDataK";
// import { gradeCalculate } from "./GradeEachTypeCalculate";
// import { testDataResult } from "./testDataResult";
// import { finalResult } from "./TestGetResultToData";
import { findingResultGrade } from "../GradeCalculate/Gradecalculate";
const gradecount = 5;
const gradeid = 1;
export default function testCalculate() {
  function Clicking() {
    // console.log(sortedData);
    // console.log(result);
    // console.log(testDataf);
    // console.log(testDataPercentile);
    // console.log(testdataTscore);
    // console.log(DataK);
    // console.log(gradeCalculate);
    // console.log(testDataResult);
    // console.log(finalResult);
    GradefindingFvalue(testData, gradecount, gradeid);
  }

  return (
    <div>
      <button on onClick={Clicking}>
        testCalculate
      </button>
    </div>
  );
}
