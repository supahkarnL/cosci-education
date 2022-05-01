import { DataK } from "./TestDataK";
import { GradetypeID } from "./TestData";

var gradeCalculateEachtype = [];
var K = DataK;

switch (GradetypeID) {
  case 1:
    gradeCalculateEachtype = [
      {
        grade: "A",
        scoregap: 50 + 1.5 * K,
      },
      {
        grade: "B+",
        scoregap: 50 + K,
      },
      {
        grade: "B",
        scoregap: 50 + 0.5 * K,
      },
      {
        grade: "C+",
        scoregap: 50,
      },
      {
        grade: "C",
        scoregap: 50 - 0.5 * K,
      },
      {
        grade: "D+",
        scoregap: 50 - K,
      },
      {
        grade: "D",
        scoregap: 50 - 1.5 * K,
      },
      {
        grade: "E",
        type: "lessthan",
        scoregap: 50 - 1.5 * K,
      },
    ];
    break;

  case 2:
    gradeCalculateEachtype = [
      {
        grade: "A",
        scoregap: 50 + K,
      },
      {
        grade: "B+",
        scoregap: 50 + 0.5 * K,
      },
      {
        grade: "B",
        scoregap: 50,
      },
      {
        grade: "C+",
        scoregap: 50 - 0.5 * K,
      },
      {
        grade: "C",
        scoregap: 50 - K,
      },
      {
        grade: "D+",
        scoregap: 50 - 1.5 * K,
      },
      {
        grade: "D",
        type: "lessthan",
        scoregap: 50 - 1.5 * K,
      },
    ];

    break;

  case 3:
    gradeCalculateEachtype = [
      {
        grade: "A",
        scoregap: 50 + 0.5 * K,
      },
      {
        grade: "B+",
        scoregap: 50,
      },
      {
        grade: "B",
        scoregap: 50 - 0.5 * K,
      },
      {
        grade: "C+",
        scoregap: 50 - K,
      },
      {
        grade: "C",
        type: "lessthan",
        scoregap: 50 - K,
      },
    ];
    break;

  case 4:
    gradeCalculateEachtype = [
      {
        grade: "A",
        scoregap: 50 + 1.5 * K,
      },
      {
        grade: "B",
        scoregap: 50 + 0.5 * K,
      },
      {
        grade: "C",
        scoregap: 50 - 0.5 * K,
      },
      {
        grade: "D",
        scoregap: 50 - 1.5 * K,
      },
      {
        grade: "E",
        type: "lessthan",
        scoregap: 50 - 1.5 * K,
      },
    ];
    break;

  case 5:
    gradeCalculateEachtype = [
      {
        grade: "A",
        scoregap: 50 + K,
      },
      {
        grade: "B",
        scoregap: 50,
      },
      {
        grade: "C",
        scoregap: 50 - K,
      },
      {
        grade: "D",
        type: "lessthan",
        scoregap: 50 - K,
      },
    ];
    break;

  case 6:
    gradeCalculateEachtype = [
      {
        grade: "A",
        scoregap: 50 + 0.5 * K,
      },
      {
        grade: "B",
        scoregap: 50 - 0.5 * K,
      },
      {
        grade: "C",
        type: "lessthan",
        scoregap: 50 - 0.5 * K,
      },
    ];
    break;

  case 7:
    gradeCalculateEachtype = [
      {
        grade: "A",
        scoregap: 50,
      },
      {
        grade: "B+",
        scoregap: 50 - 0.5 * K,
      },
      {
        grade: "B",
        type: "lessthan",
        scoregap: 50 - 0.5 * K,
      },
    ];
    break;

  case 8:
    gradeCalculateEachtype = [
      {
        grade: "A",
        scoregap: 50,
      },
      {
        grade: "B",
        type: "lessthan",
        scoregap: 50,
      },
    ];
    break;

  default:
    break;
}

export const gradeCalculate = gradeCalculateEachtype;
