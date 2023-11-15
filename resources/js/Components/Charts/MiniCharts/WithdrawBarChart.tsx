import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartArea } from "chart.js";
import { Chart } from "react-chartjs-2";
import Grow from "@mui/material/Grow";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

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

  gradient.addColorStop(0, "#319BFF00");
  gradient.addColorStop(1, "#319BFF");

  return gradient;
}

export function WithdrawBarChart() {
  const { dashboard } = usePage<PageProps>().props;

  const getLastDaysLabels = () => {
    return Object.keys(dashboard);
  };

  const getDataToDatasets = () => {
    return Object.values(dashboard).map((date: any) =>
      date
        .filter((trasaction: any) => trasaction.type === "withdraw")
        .reduce((n: any, { withdraw }: any) => n + withdraw, 0)
    );
  };

  const labels = getLastDaysLabels();

  const data = {
    labels,
    datasets: [
      {
        label: "Saques",
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

  return (
    <>
      <Bar ref={chartRef} options={options} data={chartData} height={"76px"} width={"465px"} redraw />
    </>
  );
}
