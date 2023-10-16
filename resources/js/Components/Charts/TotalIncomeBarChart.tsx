import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
  },
  scales: {
    x: {
      stacked: true,
      gridLines: {
        display: false,
      },
    },

    y: {
      stacked: true,
    },
  },
};

const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez", "Jan"];

export const data = {
  labels,
  datasets: [
    {
      label: "Lucro",
      data: [70, 50, 100, 300, 150, 160, 160, 175, 160, 185, 180, 190, 200],
      backgroundColor: "#7AFF59",
    },
    {
      label: "Depósitos",
      data: [80, 70, 20, 300, 150, 160, 160, 175, 160, 185, 180, 190, 200],
      backgroundColor: "#DDB62B",
    },
    {
      label: "Saques",
      data: [100, 120, 240, 300, 150, 160, 160, 175, 160, 185, 180, 190, 200],
      backgroundColor: "#288AE5",
      borderRadius: 10,
    },
  ],
};

// function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
//   const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

//   gradient.addColorStop(0, "#FFD23100");
//   gradient.addColorStop(1, "#FFD231");
//   // #FFD231, #FFD23100

//   return gradient;
// }

export function TotalIncomeBarChart() {
  // const chartRef = useRef<ChartJS<"bar">>(null);
  // const [chartData, setChartData] = useState<ChartData<"bar">>({
  //   datasets: [...data.datasets],
  // });

  // useEffect(() => {
  //   const chart = chartRef.current;

  //   if (!chart) {
  //     return;
  //   }

  //   const chartData = {
  //     ...data,
  //     datasets: data.datasets.map((dataset) => ({
  //       ...dataset,
  //       backgroundColor: createGradient(chart.ctx, chart.chartArea),
  //       borderColor: createGradient(chart.ctx, chart.chartArea),
  //     })),
  //   };

  //   setChartData(chartData);
  // }, []);

  return (
    <>
      <Bar options={options} data={data} redraw />
    </>
  );
}
