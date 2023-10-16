import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Filler, Legend, PointElement, LineElement } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    // to remove the labels
    x: {
      ticks: {
        display: false,
      },

      // to remove the x-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    // to remove the y-axis labels
    y: {
      ticks: {
        display: false,
        beginAtZero: true,
      },
      // to remove the y-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
};

const labels = [0, 10, 70, 20, 50, 60, 70, 30, 40, 20, 60, 50];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [0, 10, 70, 20, 50, 60, 70, 30, 40, 20, 60, 50],
      borderColor: "#6FDE53",
      backgroundColor: "#6FDE53",
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} height={"76px"} width={"465px"} />;
}
