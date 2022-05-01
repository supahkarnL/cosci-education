import { Ttable } from "./TTable";
import { GradeTypeCalculate } from "./GradeEachTypeCalculate";

export function findingResultGrade(studentdata, Gradecount, GradeID) {
  const studentsdata = studentdata;
  const Allcount = studentsdata.length;

  //F valuessssssss
  const dataFfunction = () => {
    var temp = [];

    var produce = [];

    for (var i = 0; i < studentsdata.length; i++) {
      if (temp.indexOf(studentsdata[i].studentscore) == -1) {
        temp.push(studentsdata[i].studentscore);
        var _data = {};
        _data.studentscore = studentsdata[i].studentscore;
        _data.F = 1;

        produce.push(_data);
      } else {
        for (var j = 0; j < produce.length; j++) {
          if (produce[j].studentscore === studentsdata[i].studentscore) {
            var _x = parseInt(produce[j].F) + 1;
            produce[j].F = _x;
          }
        }
      }
    }

    let sortedData = produce
      .slice()
      .sort((a, b) => b.studentscore - a.studentscore);

    const testDataf = sortedData;
    return testDataf;
  };

  const dataF = dataFfunction();

  // CF Value

  const dataCFfunction = () => {
    var testDataAllCount = Allcount;

    var result = [];

    for (var i = 0; i < dataF.length; i++) {
      result.push(dataF[i]);
      result[i].CF = testDataAllCount;
      var testDataAllCount = testDataAllCount - parseInt(dataF[i].F);
    }
    return result;
  };

  const dataCF = dataCFfunction();

  //Percentile

  const dataPercentilefunction = () => {
    var result = [];

    for (var i = 0; i < dataCF.length; i++) {
      result.push(dataCF[i]);
      var f = parseInt(dataCF[i].F);
      var fre = f / 2;
      var cf = parseInt(dataCF[i].CF);
      var n = Allcount;

      result[i].percentile = (100 * (cf - fre)) / n;
    }

    return result;
  };

  const dataPercentile = dataPercentilefunction();

  //Tscore

  const dataTscorefunction = () => {
    var result = [];
    var distance = 0;

    for (var i = 0; i < dataPercentile.length; i++) {
      result.push(dataPercentile[i]);
      var myNumber = parseFloat(result[i].percentile);

      var resultnum = 0;
      var distance = Math.abs(Ttable[0].value[0] - myNumber);

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
    return result;
  };

  const dataTscore = dataTscorefunction();

  //K Value

  const dataKfunction = () => {
    var tmax = parseInt(dataTscore[0].Tscore);
    var tmin = parseInt(dataTscore[dataTscore.length - 1].Tscore);

    var answer = (tmax - tmin + 1) / Gradecount;
    return answer;
  };

  const dataK = dataKfunction();

  //GradeGapCalculate

  const GradeGapCalculate = GradeTypeCalculate(dataK, GradeID);

  //GradeResult

  const GradeResultfunction = () => {
    var result = [];

    for (var i = 0; i < dataTscore.length; i++) {
      result.push(dataTscore[i]);
      var studentScore = dataTscore[i].Tscore;
      for (var e = GradeGapCalculate.length - 1; e >= 0; e--) {
        var grade = GradeGapCalculate[e].grade;
        var num = parseFloat(GradeGapCalculate[e].scoregap);
        var type = GradeGapCalculate[e].type;

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
    return result;
  };

  const Graderesult = GradeResultfunction();

  //GradeSplitfinalResult

  const GradeEachStudentsfunction = () => {
    var result = [];

    for (var i = 0; i < studentsdata.length; i++) {
      for (var j = 0; j < Graderesult.length; j++) {
        if (Graderesult[j].studentscore == studentsdata[i].studentscore) {
          var DataResult = {
            studentid: studentsdata[i].studentid,
            studentname: studentdata[i].studentname,
            studentscore: Graderesult[j].studentscore,
            F: Graderesult[j].F,
            CF: Graderesult[j].CF,
            percentile: Graderesult[j].percentile,
            Tscore: Graderesult[j].Tscore,
            studentresult: Graderesult[j].result,
          };
          result.push(DataResult);

          break;
        }
      }
    }
    return result;
  };

  const GradeEachStudents = GradeEachStudentsfunction();
  return GradeEachStudents;
}

export function findingResultWithTypeA(
  studentdata,
  Highest,
  Distance,
  GradeID
) {
  var gradeCalculateEachtypeA = [];
  var Highest = Highest;
  var Distance = Distance;
  var result = [];

  switch (GradeID) {
    case 1:
      gradeCalculateEachtypeA = [
        {
          grade: "A",
          scoregap: Highest,
        },
        {
          grade: "B+",
          scoregap: Highest - Distance,
        },
        {
          grade: "B",
          scoregap: Highest - 2 * Distance,
        },
        {
          grade: "C+",
          scoregap: Highest - 3 * Distance,
        },
        {
          grade: "C",
          scoregap: Highest - 4 * Distance,
        },
        {
          grade: "D+",
          scoregap: Highest - 5 * Distance,
        },
        {
          grade: "D",
          scoregap: Highest - 6 * Distance,
        },
        {
          grade: "E",
          scoregap: 0,
        },
      ];
      break;

    case 2:
      gradeCalculateEachtypeA = [
        {
          grade: "A",
          scoregap: Highest,
        },
        {
          grade: "B+",
          scoregap: Highest - Distance,
        },
        {
          grade: "B",
          scoregap: Highest - 2 * Distance,
        },
        {
          grade: "C+",
          scoregap: Highest - 3 * Distance,
        },
        {
          grade: "C",
          scoregap: Highest - 4 * Distance,
        },
        {
          grade: "D+",
          scoregap: Highest - 5 * Distance,
        },
        {
          grade: "D",
          scoregap: 0,
        },
      ];

      break;

    case 3:
      gradeCalculateEachtypeA = [
        {
          grade: "A",
          scoregap: Highest,
        },
        {
          grade: "B+",
          scoregap: Highest - Distance,
        },
        {
          grade: "B",
          scoregap: Highest - 2 * Distance,
        },
        {
          grade: "C+",
          scoregap: Highest - 3 * Distance,
        },
        {
          grade: "C",
          scoregap: 0,
        },
      ];
      break;

    case 4:
      gradeCalculateEachtypeA = [
        {
          grade: "A",
          scoregap: Highest,
        },
        {
          grade: "B",
          scoregap: Highest - Distance,
        },
        {
          grade: "C",
          scoregap: Highest - 2 * Distance,
        },
        {
          grade: "D",
          scoregap: Highest - 3 * Distance,
        },
        {
          grade: "E",
          scoregap: 0,
        },
      ];
      break;

    case 5:
      gradeCalculateEachtypeA = [
        {
          grade: "A",
          scoregap: Highest,
        },
        {
          grade: "B",
          scoregap: Highest - Distance,
        },
        {
          grade: "C",
          scoregap: Highest - 2 * Distance,
        },
        {
          grade: "D",
          scoregap: 0,
        },
      ];
      break;

    case 6:
      gradeCalculateEachtypeA = [
        {
          grade: "A",
          scoregap: Highest,
        },
        {
          grade: "B",
          scoregap: Highest - Distance,
        },
        {
          grade: "C",
          scoregap: 0,
        },
      ];
      break;

    case 7:
      gradeCalculateEachtypeA = [
        {
          grade: "A",
          scoregap: Highest,
        },
        {
          grade: "B+",
          scoregap: Highest - Distance,
        },
        {
          grade: "B",
          scoregap: 0,
        },
      ];
      break;

    case 8:
      gradeCalculateEachtypeA = [
        {
          grade: "A",
          scoregap: Highest,
        },
        {
          grade: "B",
          scoregap: Highest - Distance,
        },
      ];
      break;

    default:
      break;
  }

  for (var i = 0; i < studentdata.length; i++) {
    result.push(studentdata[i]);
    var studentScore = studentdata[i].studentscore;
    for (var e = gradeCalculateEachtypeA.length - 1; e >= 0; e--) {
      var grade = gradeCalculateEachtypeA[e].grade;
      var scoregap = parseFloat(gradeCalculateEachtypeA[e].scoregap);

      if (studentScore >= scoregap) {
        result[i].studentresult = grade;
      } else {
        break;
      }
    }
  }

  return result;
}
