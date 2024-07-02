import { React } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend
// );

import { BarChart } from "@mui/x-charts/BarChart";

// const options = {
//   scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//     },
//   },
//   plugins: {
//     title: {
//       display: true,
//       text: "Stacked Bar Chart",
//     },
//   },
// };

function StackedBarChart({ data, labelData }) {
  console.log("data", data);
  const buyData = data[0]?.data.reduce((acc, item) => acc + item, 0);
  const sellData = data[1]?.data.reduce((acc, item) => acc + item, 0);
  const total = buyData + sellData;
  const buyPercent = Math.round((buyData / total) * 100 * 100) / 100;
  const sellPercent = Math.round((sellData / total) * 100 * 100) / 100;

  return (
    <>
      <h1 className="font-semibold text-slate-800 text-center w-full block">
        Biểu đồ khớp lệnh theo bước giá
      </h1>
      <BarChart
        title="Stacked Bar Chart"
        yAxis={[
          {
            scaleType: "band",
            data: labelData,
            categoryGapRatio: 0.3,
            barGapRatio: 0.1,
          },
        ]}
        layout="horizontal"
        series={data}
        height={500}
        // barLabel={"value"}
      />
      <div className="flex">
        <div className="w-full flex gap-10">
          <div className="flex items-center">
            <div
              className="w-2 h-2 bg-[#26a69a] rounded-full mr-2 flex-shrink-0"
              style={{ width: `${buyPercent}%` }}
            ></div>
            <span className="text-sm text-slate-800">{buyPercent}%</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-2 h-2 bg-[#ef5350] rounded-full mr-2 flex-shrink-0"
              style={{ width: `${sellPercent}%` }}
            ></div>
            <span className="text-sm text-slate-800">{sellPercent}%</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default StackedBarChart;
