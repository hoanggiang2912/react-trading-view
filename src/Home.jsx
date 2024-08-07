const iboardAPI = `https://api.allorigins.win/get?url=https://iboard-query.ssi.com.vn/v2/stock/group/VN30`;

import { useEffect, useState } from "react";
import Nav from "./Nav";
import Spinner from "./Spinner";
import Error from "./Error";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(iboardAPI);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const parsedData = JSON.parse(data.contents);
        setData(parsedData.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <>
      <Nav />
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
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 *:border-gray-500 *:border"
              key={index}
            >
              <td className="p-2 text-center">{item.ss}</td>
              <td className="p-2 text-center text-yellow-600">
                {formatNumber(item.c)}
              </td>
              <td className="p-2 text-center text-pink-600">
                {formatNumber(item.h)}
              </td>
              <td className="p-2 text-center text-cyan-400">
                {formatNumber(item.f)}
              </td>
              <td className="p-2 text-center">{formatNumber(item.mtq)}</td>
              <td
                className={`p-2 text-center ${
                  item.b3 > item.h
                    ? "text-red-500"
                    : item.b3 < item.h
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumber(item.b3)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.b3v === Math.max(item.b3v, item.b2v, item.b1v)
                    ? "text-purple-500"
                    : ""
                }`}
              >
                {formatNumber(item.b3v)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.b2 > item.h
                    ? "text-red-500"
                    : item.b2 < item.h
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumber(item.b2)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.b2v === Math.max(item.b3v, item.b2v, item.b1v)
                    ? "text-purple-500"
                    : ""
                }`}
              >
                {formatNumber(item.b2v)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.b1 > item.h
                    ? "text-red-500"
                    : item.b1 < item.h
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumber(item.b1)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.b1v === Math.max(item.b3v, item.b2v, item.b1v)
                    ? "text-purple-500"
                    : ""
                }`}
              >
                {formatNumber(item.b1v)}
              </td>
              <td className="p-2 text-center">{formatNumber(item.lmp)}</td>
              <td className="p-2 text-center">{formatNumber(item.lmv)}</td>
              <td className="p-2 text-center">{formatNumber(item.lpcp)}%</td>
              <td
                className={`p-2 text-center ${
                  item.o1 > item.h
                    ? "text-red-500"
                    : item.o1 < item.h
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumber(item.o1)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.o1v === Math.max(item.o1v, item.o2v, item.o3v)
                    ? "text-purple-500"
                    : ""
                }`}
              >
                {formatNumber(item.o1v)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.o2 > item.h
                    ? "text-red-500"
                    : item.o2 < item.h
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumber(item.o2)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.o2v === Math.max(item.o1v, item.o2v, item.o3v)
                    ? "text-purple-500"
                    : ""
                }`}
              >
                {formatNumber(item.o2v)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.o3 > item.h
                    ? "text-red-500"
                    : item.o3 < item.h
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumber(item.o3)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.o3v === Math.max(item.o1v, item.o2v, item.o3v)
                    ? "text-purple-500"
                    : ""
                }`}
              >
                {formatNumber(item.o3v)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.pc < item.previousPc
                    ? "text-red-500"
                    : item.pc > item.previousPc
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumber(item.pc)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.ap < item.previousAp
                    ? "text-red-500"
                    : item.ap > item.previousAp
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumber(item.ap)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.o < item.previousO
                    ? "text-red-500"
                    : item.o > item.previousO
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumber(item.o)}
              </td>
              <td
                className={`p-2 text-center ${
                  item.l < item.previousL
                    ? "text-red-500"
                    : item.l > item.previousL
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {formatNumber(item.l)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Home;
