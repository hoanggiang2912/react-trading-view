import { createChart } from "lightweight-charts";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Error from "./Error";
import Nav from "./Nav";
import Historam from "./Historam";
import StackedBarChart from "./StackedBarChart";
import CandleStick from "./TradingViewWidget";
import TradingViewWidget from "./TradingViewWidget";
const iboardAPI = `https://api.allorigins.win/get?url=https://iboard-query.ssi.com.vn/v2/stock/group/VN30`;

const calculateAverageVolume = (data) => {
  const last10Volumes = data.slice(0, 10).map((item) => item.lv);
  const totalVolume = last10Volumes.reduce((acc, volume) => acc + volume, 0);
  return totalVolume / last10Volumes.length;
};

const calculatePercentage = (totalVolume, avgVolume10Days) => {
  if (avgVolume10Days === 0) return 0; // Avoid division by zero
  return ((totalVolume / avgVolume10Days) * 100).toFixed(2);
};

function Chart() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const totalVolume = data.reduce((acc, item) => acc + item.lv, 0);
  const avgVolume10Days = calculateAverageVolume(data);
  const percentage = calculatePercentage(totalVolume, avgVolume10Days);
  const tradeData = data.map((item) => ({ r: item.r, o: item.o }));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(iboardAPI);
        const result = await response.json();
        console.log("result: ", result);

        const data = JSON.parse(result.contents);
        console.log("data: ", data);
        setData(data.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      setIsLoading(false);
      setIsError(false);
    };
  }, []);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <>
      <Nav />
      <table className="w-full mb-5">
        <thead>
          <tr>
            <th className="p-2 bg-gray-600">Ngành</th>
            <th className="p-2 bg-gray-600">Tổng KL</th>
            <th className="p-2 bg-gray-600">%KL / KLTB 10 phiên</th>
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
            <td className="p-2 text-center bg-gray-600">Bất động sản</td>
            <td className="p-2 text-center bg-gray-600">{totalVolume}</td>
            <td className="p-2 text-center bg-gray-600">{percentage}%</td>
            <td className="p-2 text-center bg-gray-600">
              {data[data.length - 1]?.l}
            </td>
            <td className="p-2 text-center text-cyan-500 bg-gray-600">
              {data[data.length - 1]?.c}
            </td>
            <td className="p-2 text-center text-yellow-400 bg-gray-600">
              {data[data.length - 1]?.mp}
            </td>
            <td className="p-2 text-center text-pink-500 bg-gray-600">
              {data[data.length - 1]?.pc}
            </td>
            <td className="p-2 text-center bg-gray-600">
              {data[data.length - 1]?.cp}
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
      <div className="flex gap-5">
        <div className="w-2/4">
          <TradingViewWidget />
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
              {data.flat().map((item, index) => (
                <tr className="" key={index}>
                  <td className="p-2 text-center">{item.mv}</td>
                  <td className="p-2 text-center">{item.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-slate-600 rounded-lg p-2 w-1/2">
            <StackedBarChart data={tradeData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
