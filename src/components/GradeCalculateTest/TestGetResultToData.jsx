import { testDataResult } from "./testDataResult";
import { testData } from "./TestData";

var result = [];

for (var i = 0; i < testData.length; i++) {
  for (var j = 0; j < testDataResult.length; j++) {
    if (testDataResult[j].score == testData[i].score) {
      var DataResult = {
        id: testData[i].id,
        score: testDataResult[j].score,
        F: testDataResult[j].F,
        CF: testDataResult[j].CF,
        percentile: testDataResult[j].percentile,
        Tscore: testDataResult[j].Tscore,
        result: testDataResult[j].result,
      };
      result.push(DataResult);

      console.log("true");

      break;
    } else {
      console.log("false");
    }
  }
}

export const finalResult = result;
