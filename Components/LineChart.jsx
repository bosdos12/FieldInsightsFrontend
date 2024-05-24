"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

function LineChart({ metricsData }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (metricsData && metricsData.length > 0) {
      const data = {
        labels: metricsData.map((data) => data.time),
        datasets: [
          {
            label: "Metrics",
            data: metricsData.map((data) => data.value),
            borderColor: "green",
            borderWidth: 3,
            pointBorderColor: "green",
            pointBorderWidth: 3,
            tension: 0.5,
            fill: true,
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, "green");
              gradient.addColorStop(1, "white");
              return gradient;
            },
          },
        ],
      };
      setChartData(data);
    }
  }, [metricsData]);

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        min: 0, // Adjust the minimum value as needed
      },
      x: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "600px",
        height: "250px",
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <Line data={chartData} options={options}></Line>
    </div>
  );
}

export default LineChart;
