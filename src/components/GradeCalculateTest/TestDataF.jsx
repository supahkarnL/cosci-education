import { testData } from "./TestData";

var temp = [];

var produce = [];

for (var i = 0; i < testData.length; i++) {
  if (temp.indexOf(testData[i].score) == -1) {
    temp.push(testData[i].score);
    var _data = {};
    _data.score = testData[i].score;
    _data.F = 1;

    produce.push(_data);
  } else {
    for (var j = 0; j < produce.length; j++) {
      if (produce[j].score === testData[i].score) {
        var _x = parseInt(produce[j].F) + 1;
        produce[j].F = _x;
      }
    }
  }
}

let sortedData = produce.slice().sort((a, b) => b.score - a.score);

export const testDataf = sortedData;
