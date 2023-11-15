import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
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

// function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
//   const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

//   gradient.addColorStop(0, "#FFD23100");
//   gradient.addColorStop(1, "#FFD231");
//   // #FFD231, #FFD23100

//   return gradient;
// }

export function TotalIncomeBarChart() {
  const { incomes } = usePage<PageProps>().props;

  const getLastDaysLabels = () => {
    return Object.keys(incomes);
  };

  const getDataProfitToDatasets = () => {
    return Object.values(incomes).map((date: any) =>
      date.reduce((n: any, { withdraw, deposit }: any) => n + (deposit - withdraw), 0)
    );
  };

  const getDataDepositsToDatasets = () => {
    return Object.values(incomes).map((date: any) =>
      date
        .filter((trasaction: any) => trasaction.type === "deposit")
        .reduce((n: any, { deposit }: any) => n + deposit, 0)
    );
  };

  const getDataWithdrawToDatasets = () => {
    return Object.values(incomes).map((date: any) =>
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
        label: "Lucro",
        data: getDataProfitToDatasets(),
        backgroundColor: "#7AFF59",
      },
      {
        label: "Depósitos",
        data: getDataDepositsToDatasets(),
        backgroundColor: "#DDB62B",
      },
      {
        label: "Saques",
        data: getDataWithdrawToDatasets(),
        backgroundColor: "#288AE5",
        borderRadius: 10,
      },
    ],
  };

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
