import { createChart } from "lightweight-charts";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Error from "./Error";
import Nav from "./Nav";
import Historam from "./Historam";
import StackedBarChart from "./StackedBarChart";

const ticker = "AAPL";
const url_aggs = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=wBa1331PR97SOmNzwcuNwTrztfN0R3v2`;

// const alphaVatageAPIKey = "86M5HILFXH6ZJC3C";
// const alphaVatageSymbol = "AAPL";

function Chart() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [tradeData, setTradeData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [result, setResult] = useState([]);
  const [volumnData, setVolumnData] = useState([]);

  const chartOptions = {
    layout: {
      textColor: "white",
      background: { type: "solid", color: "black" },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url_aggs);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        // console.log(data);

        if (!data || !data.results) throw new Error("No data found");

        console.log(data.results);
        setResult(data.results);

        // handle volumn chart
        const volumnData = data.results.map((result, index) => ({
          value: result.v,
          time: result.t + index,
          color: result.v > data.results[index - 1]?.v ? "#26a69a" : "#ef5350",
        }));
        console.log("volumn data", volumnData);
        setVolumnData(volumnData);

        // handle bar chart data
        const o = data.results.map((result, index) => result.o);
        const h = data.results.map((result, index) => result.h);

        const oh = [o, h];

        const tradeData = oh.map((item, index) => ({
          label: index === 0 ? "Mua chủ động" : "Bán chủ động",
          data: item,
          stack: index % 2 === 0 ? "a" : "b",
          color: index === 0 ? "#26a69a" : "#ef5350",
        }));

        setTradeData(tradeData);

        // console.log(data.results);

        const labelData = data.results
          .map((result, index) => result.vw)
          .toSorted((a, b) => b - a);
        setLabelData(labelData);

        // handle area chart
        const areaChart = createChart(
          document.getElementById("secondContainer"),
          chartOptions
        );

        const areaSeries = areaChart.addAreaSeries({
          lineColor: "#2962FF",
          topColor: "#2962FF",
          bottomColor: "rgba(41, 98, 255, 0.28)",
          background: "rgba(41, 98, 255, 0.1)",
        });

        const areaSeriesData = data.results.map((result, index) => ({
          time: result.t + index,
          value: result.v,
        }));

        areaSeries.setData(areaSeriesData);
        areaChart.timeScale().fitContent();

        // handle candlestick chart
        const candlestickChart = createChart(
          document.getElementById("firstContainer"),
          chartOptions
        );

        const candlestickSeriesData = data.results
          .map((result, index) => ({
            time: result.t + index,
            open: result.o,
            high: result.h,
            low: result.l,
            close: result.c,
          }))
          .toSorted((a, b) => a.time - b.time);

        console.log("candlestick series data: ", candlestickSeriesData);

        const candlestickSeries = candlestickChart.addCandlestickSeries({
          upColor: "#26a69a",
          downColor: "#ef5350",
          borderVisible: false,
          wickUpColor: "#26a69a",
          wickDownColor: "#ef5350",
        });

        candlestickSeries.setData(candlestickSeriesData);

        candlestickChart.timeScale().fitContent();

        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        setError(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <Error errorMessage={error} />}
      <Nav />
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 bg-gray-600">Ngành</th>
            <th className="p-2 bg-gray-600">Tổng KL</th>
            <th className="p-2 bg-gray-600">! KL / KLTB 10 phiên</th>
            <th className="p-2 bg-gray-600">Tổng GT</th>
            <th className="p-2 bg-gray-600">Sàn</th>
            <th className="p-2 bg-gray-600">TC</th>
            <th className="p-2 bg-gray-600">Trần</th>
            <th className="p-2 bg-gray-600">Giá khớp</th>
            <th className="p-2 bg-gray-600">+/-</th>
            <th className="p-2 bg-gray-600">%</th>
            <th className="p-2 bg-gray-600">P/B</th>
            <th className="p-2 bg-gray-600">P/E</th>
            <th className="p-2 bg-gray-600">BVPS</th>
            <th className="p-2 bg-gray-600">EPS 4 quý</th>
            <th className="p-2 bg-gray-600">ROE</th>
            <th className="p-2 bg-gray-600">ROA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 text-center bg-gray-600">{ticker}</td>
            <td className="p-2 text-center bg-gray-600">
              {result.reduce((a, c) => (a += c.v), 0)}
            </td>
            <td className="p-2 text-center bg-gray-600">
              {Math.round(
                (result.slice(0, 10).reduce((a, c) => (a += c.v), 0) /
                  result.reduce((a, c) => (a += c.v), 0)) *
                  100
              )}
              %
            </td>
            <td className="p-2 text-center bg-gray-600">
              {Math.round(
                result
                  .map((item) => item.v * item.c)
                  .reduce((a, c) => (a += c), 0)
              )}
            </td>
            <td className="p-2 text-center text-cyan-500 bg-gray-600">
              {result[result.length - 1]?.l}
            </td>
            <td className="p-2 text-center text-yellow-400 bg-gray-600">
              {result[result.length - 1]?.o}
            </td>
            <td className="p-2 text-center text-pink-500 bg-gray-600">
              {result[result.length - 1]?.h}
            </td>
            <td className="p-2 text-center bg-gray-600">
              {result[result.length - 1]?.vw}
            </td>
            <td className="p-2 text-center bg-gray-600">{`...`}</td>
            <td className="p-2 text-center bg-gray-600">{`...`}</td>
            <td className="p-2 text-center bg-gray-600">{`...`}</td>
            <td className="p-2 text-center bg-gray-600">{`...`}</td>
            <td className="p-2 text-center bg-gray-600">{`...`}</td>
            <td className="p-2 text-center bg-gray-600">{`...`}</td>
            <td className="p-2 text-center bg-gray-600">{`...`}</td>
            <td className="p-2 text-center bg-gray-600">{`...`}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex gap-5 p-5">
        <div className="w-2/4">
          <div id="firstContainer" className="h-[40vh]"></div>
          <div id="secondContainer" className="h-[20vh] relative z-50"></div>
          <Historam data={volumnData} />
        </div>
        <div
          id="thirdContainer"
          className="h-[100vh] w-2/4 flex gap-4 items-start"
        >
          <table className="!h-[300px] w-1/2 overflow-y-auto bg-slate-600 rounded-lg oh">
            <thead className="p-4">
              <tr>
                <th colSpan={4} className="p-4">
                  Độ sâu thị trường
                </th>
              </tr>
              <th className="p-4">KL mua</th>
              <th className="p-4">Giá mua</th>
            </thead>
            <tbody>
              {result.flat().map((item, index) => (
                <tr className="" key={index}>
                  <td className="p-2 text-center">{item.n}</td>
                  <td className="p-2 text-center">{item.o}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-white rounded-lg p-2 w-1/2">
            <StackedBarChart data={tradeData} labelData={labelData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
