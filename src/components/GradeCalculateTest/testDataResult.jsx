import { gradeCalculate } from "./GradeEachTypeCalculate";
import { testdataTscore } from "./testDataTscore";

var result = [];

for (var i = 0; i < testdataTscore.length; i++) {
  result.push(testdataTscore[i]);
  var studentScore = testdataTscore[i].Tscore;
  for (var e = gradeCalculate.length - 1; e >= 0; e--) {
    var grade = gradeCalculate[e].grade;
    var num = parseFloat(gradeCalculate[e].scoregap);
    var type = gradeCalculate[e].type;

    if (studentScore >= num) {
      var studentResult = grade;
    } else {
      if (type === "lessthan") {
        if (studentScore < num) {
          var studentResult = grade;
        } else {
          break;
        }
      }
    }
  }
  result[i].result = studentResult;
}

export const testDataResult = result;
