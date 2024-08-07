import { React } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

function StackedBarChart({ data }) {
  // Prepare the data for recharts
  const buyActive = data.reduce(
    (acc, item) => {
      acc.data.push(item.o);
      return acc;
    },
    { label: "Mua Chu Dong", data: [] }
  );

  const sellActive = data.reduce(
    (acc, item) => {
      acc.data.push(item.o);
      return acc;
    },
    { label: "Ban Chu Dong", data: [] }
  );

  console.log("buyActive: ", buyActive);

  return (
    <>
      <h1 className="font-semibold text-slate-800 text-center w-full block">
        Biểu đồ khớp lệnh theo bước giá
      </h1>
      <BarChart
        width={500}
        height={300}
        series={[
          {
            ...buyActive,
            stack: "a",
          },
          {
            ...sellActive,
            stack: "a",
          },
        ]}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      />
      {/* <div className="flex">
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
      </div> */}
    </>
  );
}

export default StackedBarChart;
