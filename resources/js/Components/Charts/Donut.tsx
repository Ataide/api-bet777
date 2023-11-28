import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResumeDonutChar() {
  const { data_donut } = usePage<PageProps>().props;
  const [data, setData] = useState<any[]>();

  const labels = ["Futebol", "Volei", "Basquete", "Baisebol", "Boxe", "Fut. Americano", "Tênis", "Outros"];

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    cutout: 80,
    plugins: {
      legend: {
        align: "start",
        position: "bottom",
      },
    },
  };

  useEffect(() => {
    setData(data_donut);
  }, [data_donut]);

  const dataa = {
    labels,
    datasets: [
      {
        label: "Quantidade",
        data: data,
        borderRadius: 0,
        backgroundColor: ["#59FFA3", "#59C3FF", "#597DFF", "#9159FF", "#FF59E5", "#FF5959", "#7AFF59", "#59ff30"],
        borderColor: ["#59FFA3", "#59C3FF", "#597DFF", "#9159FF", "#FF59E5", "#FF5959", "#7AFF59", "#59ff30"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Paper sx={{ maxHeight: "759px" }} variant="indicator">
        <Box
          sx={{ maxHeight: "359px" }}
          padding={4}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Typography variant="body1" color="initial" textAlign={"center"} my={2}>
            Apostas por esportes
          </Typography>
          <Doughnut options={options} data={dataa} />
        </Box>
      </Paper>
    </>
  );
}
