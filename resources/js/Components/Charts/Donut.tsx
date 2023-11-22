import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
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

  const options: any = {
    responsive: true,
    cutout: 100,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Chart.js Doughnut Chart",
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
        label: " Quantidade",
        data: data,
        borderRadius: 3,
        backgroundColor: ["#23af00", "#29cf00", "#30ef00", "#3fff10", "#59ff30", "#59ff30", "#a6ff8f", "#bfffaf"],
        borderColor: ["#23af00", "#29cf00", "#30ef00", "#3fff10", "#59ff30", "#59ff30", "#a6ff8f", "#bfffaf"],
        borderWidth: 2,
      },
    ],
  };
  return (
    <>
      <Paper sx={{ maxHeight: "759px" }}>
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
          <Doughnut options={options} data={dataa} redraw />
        </Box>
      </Paper>
    </>
  );
}
