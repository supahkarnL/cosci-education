import { testDataPercentile } from "./TestDataPercentile";
import { Gradecount } from "./TestData";

var tmax = parseInt(testDataPercentile[0].Tscore);
var tmin = parseInt(testDataPercentile[testDataPercentile.length - 1].Tscore);

var answer = (tmax - tmin + 1) / Gradecount;

export const DataK = answer;
