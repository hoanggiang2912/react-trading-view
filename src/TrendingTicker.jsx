import { useEffect, useState } from "react";
import Nav from "./Nav";
import Spinner from "./Spinner";
import Error from "./Error";
const url = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=wBa1331PR97SOmNzwcuNwTrztfN0R3v2`;
const ticker_url = `https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=wBa1331PR97SOmNzwcuNwTrztfN0R3v2`;
import { convertMillisecondsToDate, formatCurrency } from "./utils/utils";
import HighLow from "./HighLow";
import TickerAreaChart from "./TickerAreaChart";
import TickerName from "./TickerName";

function TrendingTicker() {
  const [trendingTicker, setTrendingTicker] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        if (!data || !data.results) throw new Error("No data found");

        // console.log(data.results.slice(0, 10));
        setTrendingTicker(data.results.slice(0, 10));
      } catch (error) {
        setError(error);
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <Nav />
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    {/* symbol */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Symbol
                    </th>
                    {/* name */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Name
                    </th>
                    {/* last price */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Last price
                    </th>
                    {/* market time */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Market Time
                    </th>
                    {/* change */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Change
                    </th>
                    {/* %change */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      %Change
                    </th>
                    {/* market cap */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Market Cap
                    </th>
                    {/* intraday high / low */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Intraday High/Low
                    </th>
                    {/* 52 week range */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      52 Week Range
                    </th>
                    {/* day chart */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Day Chart
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <Spinner />}
                  {error && <Error errorMessage={error} />}

                  {trendingTicker.map((ticker) => (
                    <tr
                      key={ticker.T}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {ticker.T}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        <TickerName ticker={ticker} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {ticker.c}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {convertMillisecondsToDate(ticker.t)}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          Math.floor((ticker.c - ticker.o) * 100) / 100 >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {Math.floor((ticker.c - ticker.o) * 100) / 100}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          Math.round(
                            ((ticker.c - ticker.o) / ticker.o) * 10000
                          ) /
                            100 >=
                          0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {Math.round(
                          ((ticker.c - ticker.o) / ticker.o) * 10000
                        ) / 100}{" "}
                        %
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {formatCurrency(ticker.c * ticker.v)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        <HighLow data={ticker} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        ...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        <TickerAreaChart data={ticker} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingTicker;
