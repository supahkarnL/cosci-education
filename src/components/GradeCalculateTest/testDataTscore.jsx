import { testDataPercentile } from "./TestDataPercentile";
import { Ttable } from "./TTable";

var result = [];
var distance = 0;

for (var i = 0; i < testDataPercentile.length; i++) {
  result.push(testDataPercentile[i]);
  var myNumber = parseFloat(result[i].percentile);

  var resultnum = 0;
  var distance = Math.abs(Ttable[0].value[0] - myNumber);

  console.log("Distance = " + distance);
  console.log("Mynumber =" + myNumber);

  for (var e = 0; e < Ttable.length; e++) {
    var array = Ttable[e].value;
    var firstnumber = Ttable[e].row;
    array.forEach((element, index) => {
      var ndistance = Math.abs(element - myNumber);
      if (ndistance < distance) {
        var lastnumber = index.toString();
        resultnum = firstnumber + lastnumber;
        distance = ndistance;
      }
    });
  }

  result[i].Tscore = resultnum;
}

export const testdataTscore = result;
