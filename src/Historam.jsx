import { createChart } from "lightweight-charts";
import { useEffect } from "react";

function Historam({ data }) {
  const chartOptions = {
    layout: {
      textColor: "white",
      background: { type: "solid", color: "black" },
    },
  };

  useEffect(() => {
    const chart = createChart(
      document.getElementById("historam"),
      chartOptions
    );
    const histogramSeries = chart.addHistogramSeries({ color: "#26a69a" });

    histogramSeries.setData(data);

    chart.timeScale().fitContent();
  }, []);

  return <div id="historam" className="h-[20vh] z-20 -mt-[120px]"></div>;
}

export default Historam;
