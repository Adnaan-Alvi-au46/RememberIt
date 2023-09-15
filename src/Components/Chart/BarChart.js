// import React from 'react'
import { useRef } from "react";
import "./BarChart.css";
import { Bar } from "react-chartjs-2";
import exportAsImage from "../../utils/exportAsImage";
import { CSVLink } from "react-csv"; // Import CSVLink from react-csv
import { useSelector } from "react-redux";

const BarChart = ({ chartData }) => {
  const excelData = useSelector((state)=>state.reminder.tasks)
  // console.log(excelData)
  const exportRef = useRef();

  const csvData = [];

      for (const key in excelData) {
        csvData.push({
          Title: excelData[key].title,
          Description: excelData[key].description,
          Time: excelData[key].time,
          Date: excelData[key].date,
        });
      }
      console.log(csvData)

  // const csvData = [
  //   {
  //     Title: "hello",
  //     Time: "hello",
  //     Description: "hello",
  //     Date: "hello",
  //   },
  // ];

  return (
    <>
      <div className="chart-container" ref={exportRef}>
        <Bar
          className="chart"
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Reminder Bar",
              },
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                grid: {
                  color: '#707070', // Color of x-axis gridlines
                }
              },
              y: {
                beginAtZero: true,
                stepSize: 1,
                // min: 0,
                // max: 6,
                ticks: {
                  callback: function (value, index, values) {
                    // console.log("value", value)
                    return value; // Round the tick value to display as an integer
                  },
                },
                grid: {
                  color: '#707070', // Color of x-axis gridlines
                }
              },
            },
          }}
        />
      </div>
      <div className="button-container">
        {/* Add a button for CSV export */}
        <CSVLink data={csvData} filename={"reminderData.csv"} className="link-button">
          Download CSV
        </CSVLink>
        <button
          className="download-image"
          onClick={() => exportAsImage(exportRef.current, "barChart.png")}
        >
          Download chart
        </button>
      </div>
    </>
  );
};

export default BarChart;
