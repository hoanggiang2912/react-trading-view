import { ScatterChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { createChart } from "lightweight-charts";

const chartOptions = {
  layout: {
    textColor: "white",
    background: { type: "solid", color: "white" },
  },
  grid: {
    vertLines: {
      color: "transparent",
    },
    horzLines: {
      color: "transparent",
    },
  },
  priceScale: {
    borderVisible: false,
    drawTicks: false,
  },
  timeScale: {
    borderVisible: false,
    drawTicks: false,
  },
  responsive: true,
  maintainAspectRatio: false,
};
function TickerAreaChart({ data }) {
  const { T } = data;
  const url = `https://api.polygon.io/v2/aggs/ticker/${T}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=wBa1331PR97SOmNzwcuNwTrztfN0R3v2`;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data || !data.results) throw new Error("No data found");

        // handle area chart
        const areaChart = createChart(
          document.getElementById("chartContainer"),
          chartOptions
        );

        const areaSeries = areaChart.addAreaSeries({
          topColor: "rgba(38, 166, 154, 0.56)",
          bottomColor: "rgba(38, 166, 154, 0.04)",
          lineColor: "rgba(38, 166, 154, 1)",
          lineWidth: 2,
        });

        const areaSeriesData = data.results.map((result, index) => ({
          time: result.t + index,
          value: result.c,
        }));

        areaSeries.setData(areaSeriesData);
        areaChart.timeScale().fitContent();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <div id="chartContainer" className="h-[80px]"></div>;
}

export default TickerAreaChart;
