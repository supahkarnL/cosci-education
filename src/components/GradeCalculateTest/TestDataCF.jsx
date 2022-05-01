import { testData } from "./TestData";
import { testDataf } from "./TestDataF";

var testDataAllCount = testData.length;

export const AllCount = testDataAllCount;

var result = [];

for (var i = 0; i < testDataf.length; i++) {
  result.push(testDataf[i]);
  result[i].CF = testDataAllCount;
  var testDataAllCount = testDataAllCount - parseInt(testDataf[i].F);
}

export const testDatacf = result;
