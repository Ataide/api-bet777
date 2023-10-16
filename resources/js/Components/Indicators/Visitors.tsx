import Box from "@mui/material/Box";
import { BarChart } from "../Charts/BarChart";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import VisitorsIcon from "../Icons/VisitorsIcon";
export default function NewUsers() {
  return (
    <>
      <Paper elevation={5} variant="indicator">
        <Box display={"flex"} flexDirection={"row"} minHeight={167}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={155}
            height={166}
            sx={{ background: "linear-gradient(180deg, #2E2E2E 0%, rgba(46, 46, 46, 0.00) 169.58%)" }}
          >
            <VisitorsIcon />
          </Box>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"start"} sx={{ pl: 2 }}>
            <Typography variant="body2">Total de visitantes</Typography>
            <Typography variant="body2" color={"primary"}>
              +2.6%
            </Typography>
            <Typography variant="h5">3000</Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
