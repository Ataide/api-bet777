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
        display: true,
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
        display: true,
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

const labels = [""];

export const data = {
  labels,
  datasets: [
    {
      label: "Saques",
      data: [40],
      barPercentage: 0.5,
      borderRadius: 15,
    },
    {
      label: "Depósitos",
      data: [100],
      barPercentage: 0.5,
      borderRadius: 15,
    },
    {
      label: "Lucro",
      data: [60],
      barPercentage: 0.5,
      borderRadius: 15,
    },
  ],
};

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea, color: string) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, color + "00");
  gradient.addColorStop(1, color);
  // #FFD231, #FFD23100

  return gradient;
}

export function DailyIncomeBarChart() {
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
      datasets: data.datasets.map((dataset) => {
        let color = "#288AE5";

        if (dataset.label === "Saques") {
          color = "#288AE5";
        }
        if (dataset.label === "Depósitos") {
          color = "#DDB62B";
        }
        if (dataset.label === "Lucro") {
          color = "#7AFF59";
        }

        return {
          ...dataset,
          backgroundColor: createGradient(chart.ctx, chart.chartArea, color),
          borderColor: createGradient(chart.ctx, chart.chartArea, color),
        };
      }),

      // ({
      //   ...dataset,
      //   backgroundColor: createGradient(chart.ctx, chart.chartArea),
      //   borderColor: createGradient(chart.ctx, chart.chartArea),
      // })),
    };

    setChartData(chartData);
  }, []);

  return (
    <>
      <Bar ref={chartRef} options={options} data={chartData} height={"490px"} width={"465px"} redraw />
    </>
  );
}
