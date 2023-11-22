import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartArea } from "chart.js";
import { Chart } from "react-chartjs-2";
import Grow from "@mui/material/Grow";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Typography from "@mui/material/Typography";

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

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, "#FFD23100");
  gradient.addColorStop(1, "#FFD231");
  // #FFD231, #FFD23100

  return gradient;
}

export function NewUsersBarChart() {
  const { news_users } = usePage<PageProps>().props;

  const getLastDaysLabels = () => {
    return Object.keys(news_users);
  };

  const getDataToDatasets = () => {
    return Object.values(news_users).map((date: any) => date.length);
  };

  const labels = getLastDaysLabels();

  const data = {
    labels,
    datasets: [
      {
        label: "Novatos",
        data: getDataToDatasets(),
        borderRadius: 3,
      },
    ],
  };

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

  const total = getDataToDatasets().reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return (
    <>
      <Typography variant="h5">{total}</Typography>
      <Bar ref={chartRef} options={options} data={chartData} height={"76px"} width={"465px"} redraw />
    </>
  );
}
