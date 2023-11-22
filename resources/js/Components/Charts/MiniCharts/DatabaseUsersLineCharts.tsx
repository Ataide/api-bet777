import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Filler,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Typography from "@mui/material/Typography";

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

export function DatabaseUsersLineCharts() {
  const { last_users } = usePage<PageProps>().props;

  const getLastDaysLabels = () => {
    return Object.keys(last_users);
  };

  const getDataToDatasets = () => {
    return Object.values(last_users).map((date: any) => date.length);
  };

  const labels = getLastDaysLabels();

  const data = {
    labels,
    datasets: [
      {
        data: getDataToDatasets(),
        borderColor: "#6FDE53",
        backgroundColor: "#6FDE53",
      },
    ],
  };

  const total = getDataToDatasets().reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return (
    <>
      <Typography variant="h5">{total}</Typography>
      <Line options={options} data={data} height={"76px"} width={"465px"} />
    </>
  );
}
