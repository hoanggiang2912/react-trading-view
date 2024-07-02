import { useEffect, useState } from "react";

function TickerName({ ticker }) {
  const url = `https://api.polygon.io/v3/reference/tickers/${ticker.T}?apiKey=wBa1331PR97SOmNzwcuNwTrztfN0R3v2`;
  const [tickerName, setTickerName] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data || !data.results) throw new Error("No data found");

        setTickerName(data.results.name);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <span>{tickerName}</span>;
}

export default TickerName;
