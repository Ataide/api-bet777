import DataTable from "@/Components/Table/Administration/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IAdmin, IUser, PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

export default function Users({ auth, admins, superuser }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Administração" />
      <Box>
        <Typography variant="h5" mb={2}>
          ADMINISTRAÇÃO / DONO
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <DataTable admins={admins} resource="/administracao" />
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

function Header() {
  const { superuser } = usePage<PageProps>().props;
  //console.log(superuser);
  return (
    <Paper elevation={5} variant="indicator">
      <Box p={4}>
        <Grid container columns={14}>
          <Grid item xs={4}>
            <Box display={"flex"} height={40} alignItems={"center"}>
              <Typography variant="body1">{superuser.name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display={"flex"} height={40} alignItems={"center"}>
              <Typography variant="body1">88 99356-8477</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display={"flex"} height={40} alignItems={"center"}>
              <Typography variant="body1">{superuser.email}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display={"flex"} flexDirection="row" alignItems={"center"} justifyContent={"space-between"}>
              <Typography variant="body1" sx={{ color: "success.main" }}>
                Ativo
              </Typography>
              <IconButton aria-label="edit" sx={{ mr: 1 }} onClick={() => {}}>
                <ModeEditOutlineIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
