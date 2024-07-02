const apiKey = "wBa1331PR97SOmNzwcuNwTrztfN0R3v2";
const keyId = "8c964054-6600-450a-84e5-d857610d9eeb";
const url_aggs = `https://api.polygon.io/v2/aggs/ticker/AAA/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=${apiKey}`;
const url_ticker = `https://api.polygon.io/v3/reference/tickers?active=true&limit=4&apiKey=${apiKey}`;

import { useEffect, useState } from "react";
import Nav from "./Nav";
import Spinner from "./Spinner";

function Home() {
  // const [tickerData, setTickerData] = useState([]);
  const [aggsData, setAggsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(tickerDataKeys);

  const fetchTickerData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(url_ticker);

      const data = await response.json();
      // setTickerData(data.results);
      // console.log(data.results);
      const tickers = data.results.map((item) => item.ticker);

      await fetchMuiltipleAggsData(tickers);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMuiltipleAggsData = async (tickers) => {
    try {
      tickers.length > 0 &&
        Promise.all(
          tickers.map(async (ticker) => {
            const response = await fetch(
              `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&limit=5&apiKey=${apiKey}`
            );
            const data = await response.json();
            return {
              results: data.results,
              ticker: ticker,
              next_url: data.next_url,
            };
          })
        )
          .then((data) => {
            setAggsData(data);
            console.log("data", data);
          })
          .catch((error) => {
            throw new Error(error);
          });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickerData();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Nav />

      {isLoading && <Spinner />}

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              rowSpan={2}
              className="p-2 text-center border border-gray-500"
            >
              Mã CK
            </th>
            <th
              scope="col"
              rowSpan={2}
              className="p-2 text-center border border-gray-500"
            >
              TC
            </th>
            <th
              scope="col"
              rowSpan={2}
              className="p-2 text-center border border-gray-500"
            >
              Trần
            </th>
            <th
              scope="col"
              rowSpan={2}
              className="p-2 text-center border border-gray-500"
            >
              Sàn
            </th>
            <th
              scope="col"
              rowSpan={2}
              className="p-2 text-center border border-gray-500"
            >
              Tổng KL
            </th>

            <th
              scope="col"
              colSpan={6}
              className="p-2 text-center border border-gray-500"
            >
              Bên mua
            </th>

            <th
              scope="col"
              colSpan={3}
              className="p-2 text-center border border-gray-500"
            >
              Khớp lệnh
            </th>

            <th
              scope="col"
              colSpan={6}
              className="p-2 text-center border border-gray-500"
            >
              Bên bán
            </th>

            <th
              scope="col"
              colSpan={4}
              className="p-2 text-center border border-gray-500"
            >
              Giá
            </th>

            <th
              scope="col"
              colSpan={2}
              className="p-2 text-center border border-gray-500"
            >
              Dư
            </th>

            <th
              scope="col"
              colSpan={2}
              className="p-2 text-center border border-gray-500"
            >
              ĐTNN
            </th>
          </tr>
          <tr>
            <th scope="col" className="p-2 text-center border border-gray-500">
              Giá 3
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              KL 3
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              Giá 2
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              KL 2
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              Giá 1
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              KL 1
            </th>
            {/* ---------------------------------------- */}
            <th scope="col" className="p-2 text-center border border-gray-500">
              Giá
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              KL
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              %
            </th>
            {/* ---------------------------------------- */}
            <th scope="col" className="p-2 text-center border border-gray-500">
              Giá 1
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              KL 1
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              Giá 2
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              KL 2
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              Giá 3
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              KL 3
            </th>
            {/* ---------------------------------------- */}
            <th scope="col" className="p-2 text-center border border-gray-500">
              Cao
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              TB
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              Mở Bán
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              Thấp
            </th>
            {/* ---------------------------------------- */}
            <th scope="col" className="p-2 text-center border border-gray-500">
              Mua
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              Bán
            </th>
            {/* ---------------------------------------- */}
            <th scope="col" className="p-2 text-center border border-gray-500">
              Mua
            </th>
            <th scope="col" className="p-2 text-center border border-gray-500">
              Bán
            </th>
          </tr>
        </thead>
        <tbody>
          {aggsData.map(({ ticker, results, next_url }, index) => {
            if (results && results.length > 0)
              return results.map((item, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <td className="p-2 text-center">{ticker}</td>
                  <td className="p-2 text-center text-yellow-600">{item?.c}</td>
                  <td className="p-2 text-center text-pink-600">{item?.h}</td>
                  <td className="p-2 text-center text-cyan-400">{item?.l}</td>
                  <td className="p-2 text-center">{item?.n}</td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center">{item?.o}</td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                  <td className="p-2 text-center"></td>
                </tr>
              ));

            if (!results && !isLoading)
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td colSpan={30} className="p-2 text-center">
                    No data
                  </td>
                </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
