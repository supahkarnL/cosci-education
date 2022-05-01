import { testDatacf, AllCount } from "./TestDataCF";

var result = [];

for (var i = 0; i < testDatacf.length; i++) {
  result.push(testDatacf[i]);
  var f = parseInt(testDatacf[i].F);
  var fre = f / 2;
  var cf = parseInt(testDatacf[i].CF);
  var n = AllCount;

  result[i].percentile = (100 * (cf - fre)) / n;
}

export const testDataPercentile = result;
