import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-plugin-labels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

export default function Summary() {
  let { id } = useParams();
  const location = useLocation();
  const students = useLocation().state.students;

  const [dataSource, sedataSource] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.1.35:3001/classroom/byId/${id}`)
      .then((response) => {
        console.log(id);
        sedataSource(response.data);
      });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ตารางแสดงข้อมูลคะแนน T-score",
      },
      layout: {
        padding: {
          top: 5,
          left: 15,
          right: 15,
          bottom: 15,
        },
      },
    },
  };

  function countingGrade(data) {
    var temp = [];
    var result = [];
    for (var i = 0; i < data.length; i++) {
      if (temp.indexOf(data[i].studentresult) == -1) {
        temp.push(data[i].studentresult);
        var _data = {};
        _data.studentresult = data[i].studentresult;
        _data.count = 1;

        result.push(_data);
      } else {
        for (var j = 0; j < result.length; j++) {
          if (result[j].studentresult === data[i].studentresult) {
            var _x = parseInt(result[j].count) + 1;
            result[j].count = _x;
          }
        }
      }
    }

    return result;
  }

  const result = countingGrade(students);

  let sortedData = result
    .sort(function (obj1, obj2) {
      return obj1.studentresult.localeCompare(obj2.studentresult);
    })
    .reverse();

  function countingTscore(data) {
    var tempT = [];
    var resultT = [];
    for (var i = 0; i < data.length; i++) {
      if (tempT.indexOf(data[i].Tscore) == -1) {
        tempT.push(data[i].Tscore);
        var _data = {};
        _data.Tscore = data[i].Tscore;
        _data.count = 1;

        resultT.push(_data);
      } else {
        for (var j = 0; j < resultT.length; j++) {
          if (resultT[j].Tscore === data[i].Tscore) {
            var _x = parseInt(resultT[j].count) + 1;
            resultT[j].count = _x;
          }
        }
      }
    }

    return resultT;
  }

  const resultT = countingTscore(students);
  console.log(resultT);

  let sortTscore = resultT.sort((a, b) => a.Tscore - b.Tscore);

  const labels = sortTscore.map((data) => data.Tscore);

  const data = {
    labels,
    datasets: [
      {
        label: "จำนวนนักเรียน",
        data: resultT.map((data) => data.count),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  //mean
  var n = students.length;
  var mean = 0;
  var sum = 0;

  var min = sortTscore[0].Tscore;
  var max = sortTscore[sortTscore.length - 1].Tscore;

  for (var i = 0; i < students.length; i++) {
    var sum = sum + parseInt(students[i].studentscore);
  }
  mean = sum / n;

  //SD
  var n = students.length;
  var zigmax = 0;
  var doublemean = 0;
  var diffN = 0;
  var diff = 0;
  var sqr = 0;

  for (var i = 0; i < students.length; i++) {
    zigmax =
      zigmax + parseInt(students[i].studentscore * students[i].studentscore);

    // sum = sum + parseInt(Studentdata[i].studentscore);
  }
  diffN = n - 1;
  mean = sum / n;
  doublemean = mean * mean;
  diff = zigmax - n * doublemean;
  diff = diff.toFixed(2);
  sqr = diff / diffN;
  sqr = Math.sqrt(sqr);
  sqr = sqr.toFixed(2);

  const optionspie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // datalabels: {
      //   render: "percentage",
      // },
      labels: {
        render: "percentage",
        fontColor: "black",
        precision: 2,
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ตารางแสดงข้อมูลเกรด",
      },
      layout: {
        padding: {
          top: 5,
          left: 15,
          right: 15,
          bottom: 15,
        },
      },
    },
  };

  const pie = {
    labels: result.map((data) => data.studentresult),
    datasets: [
      {
        label: "# of Votes",
        data: result.map((data) => data.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgb(238, 130, 238, 0.5)",
          "rgb(120, 120, 120, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgb(238, 130, 238, 1)",
          "rgb(120, 120, 120, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (location.state == null) {
    return <div>no data</div>;
  } else {
    console.log(useLocation().state.students);
    return (
      <div
        className="container h-screen mt-5 pt-5 
    rounded-md px-5 bg-white"
      >
        <div className="pl-5 text-4xl font-bold">{dataSource.subject}</div>
        <div className="flex justify-evenly py-3 mt-5 border rounded-lg items-center">
          <div className="">จำนวนนักเรียน: {students.length}</div>
          <div className="">T-score ต่ำสุด: {min}</div>
          <div className="">T-score สูงสุด: {max}</div>
          <div className="">คะแนนเฉลี่ย: {mean}</div>
          <div className="">ค่ามาตรฐาน: {sqr}</div>
        </div>
        <div className="container h-80 pt-2">
          <Pie options={optionspie} data={pie} />
        </div>
        <div className="container h-96 pt-3">
          <Bar options={options} data={data} />
        </div>
      </div>
    );
  }
}
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>;
