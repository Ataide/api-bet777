import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartArea } from "chart.js";
import { Chart } from "react-chartjs-2";
import Grow from "@mui/material/Grow";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const labels = [100, 10, 70, 20, 50, 60, 70, 30, 40, 20, 60, 50, 80, 40, 100, 40, 10, 70, 20, 50, 60, 70, 30, 40, 20, 60, 50, 80, 40, 100];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 100, 70, 60, 50, 60, 70, 80, 40, 50, 60, 50, 80, 40, 100, 40, 90, 100, 20, 50, 60, 70, 30, 40, 20, 60, 50, 80, 40, 100],
      borderRadius: 3,
    },
  ],
};

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, "#7AFF5900");
  gradient.addColorStop(1, "#7AFF59");

  return gradient;
}

export function ProfitBarChart() {
  const chartRef = useRef<ChartJS<"bar">>(null);

  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [...data.datasets],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: createGradient(chart.ctx, chart.chartArea),
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, []);

  return (
    <>
      <Bar ref={chartRef} options={options} data={chartData} height={"76px"} width={"465px"} redraw />
    </>
  );
}
