import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { PropsWithChildren } from "react";
import logo from "../../assets/logo_big.png";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <>
      <Grid container columns={20}>
        <Grid item xs={12} md={11}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
          >
            {children}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{ backgroundColor: "secondary.main", height: "100vh" }}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
          >
            <img src={logo} width={422} height={372} alt="" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
