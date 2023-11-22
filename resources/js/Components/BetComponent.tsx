import { router, usePage } from "@inertiajs/react";
import ResumeDonutChar from "./Charts/Donut";
import DataTable from "./Table/Bets/Table";
import Grid from "@mui/material/Grid";
import { PageProps } from "@/types";
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams } from "@mui/x-data-grid";
import { formatter } from "@/helper";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TableTabList from "./Table/Bets/TableTabList";
import DetailsTableTabList from "./Table/Bets/Details/DetailsTableTabList";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import PaperInfo from "./PaperInfo";
import Stack from "@mui/material/Stack";
import NotFoundData from "./Table/NotFoundData";

export default function BetsComponent() {
  const columns: GridColDef[] = [
    {
      field: "user_id",
      headerName: "ID",
      sortable: false,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nome",
      sortable: false,
      flex: 1,
    },
    {
      field: "total_bets",
      headerName: "Apostas",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.total_bets,
    },
    {
      field: "amount",
      headerName: "Saldo",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => formatter.format(params.row.amount),
    },
  ];

  const columnsDetails: GridColDef[] = [
    {
      field: "",
      headerName: "",
      sortable: false,
      headerClassName: "super-hidden",
      flex: 1,
      renderCell: (params) => {
        return <PaperInfo paper={params.row} />;
      },
    },
  ];

  const { bets, userPapers } = usePage<PageProps>().props;
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [selectedTab, setTabSelected] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabSelected(newValue);
    router.get("", { type: newValue }, { preserveState: true, only: ["userPapers"], preserveScroll: true });
  };
  useEffect(() => {
    setTabSelected("");
  }, [selectionModel]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper elevation={5} variant="indicator" sx={{ minHeight: "625px" }}>
            <TableTabList />

            {bets.data.length > 0 ? (
              <DataGrid
                getRowId={(row) => row.user_id}
                disableRowSelectionOnClick
                disableColumnSelector
                rows={bets.data}
                rowCount={bets.total}
                paginationMode="server"
                columns={columns}
                density={"comfortable"}
                initialState={{
                  pagination: {
                    paginationModel: { page: bets.current_page - 1, pageSize: bets.per_page },
                  },
                }}
                onPaginationModelChange={(model, details) => {
                  router.get(
                    "/apostas",
                    { page: model.page + 1, per_page: model.pageSize },
                    { only: ["bets"], preserveState: true }
                  );
                }}
                checkboxSelection
                rowSelectionModel={selectionModel}
                sx={{
                  minHeight: "540px",
                }}
                onRowSelectionModelChange={(selection) => {
                  if (selection.length > 1) {
                    const selectionSet = new Set(selectionModel);
                    const result = selection.filter((s) => !selectionSet.has(s));
                    router.visit(route("bets", { id: result[0] }), {
                      method: "get",
                      only: ["userPapers", "data_donut"],
                      preserveState: true,
                      preserveScroll: true,
                    });
                    setSelectionModel(result);
                  } else {
                    router.visit(route("bets", { id: selection[0] }), {
                      method: "get",
                      only: ["userPapers", "data_donut"],
                      preserveState: true,
                      preserveScroll: true,
                    });
                    setSelectionModel(selection);
                  }
                }}
              />
            ) : (
              <NotFoundData />
            )}
          </Paper>
        </Grid>
        <Grid item xs={4} spacing={2}>
          <ResumeDonutChar />

          <Paper variant="indicator" sx={{ mt: 2 }}>
            {userPapers.data.length > 0 ? (
              <Box p={2}>
                <Typography variant="body1" color="initial">
                  Cliente:{" "}
                  <Typography variant="body1" component={"span"} color="initial" fontWeight={400}>
                    {userPapers.userDetails.name}
                  </Typography>
                </Typography>
                <Stack direction={"row"} spacing={4}>
                  <Stack direction={"column"}>
                    <Typography variant="body2" display={"inline"}>
                      Todas as apostas:
                      <Typography component="span" variant="body1" color="primary" ml={1}>
                        {userPapers.total_open + userPapers.total_close}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" display={"inline"}>
                      Saldo total:
                      <Typography component="span" variant="body1" color="primary" ml={1}>
                        {formatter.format(userPapers.userDetails.wallet.amount)}
                      </Typography>
                    </Typography>
                  </Stack>
                  <Stack direction={"column"}>
                    <Typography variant="body2" display={"inline"}>
                      Saldo apostas:
                      <Typography component="span" variant="body1" color="primary" ml={1}>
                        {formatter.format(userPapers.userDetails.wallet.bet_total)}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" display={"inline"}>
                      Saldo livre pra saque:
                      <Typography component="span" variant="body1" color="primary" ml={1}>
                        {formatter.format(userPapers.userDetails.wallet.draw_total)}
                      </Typography>
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            ) : (
              <NotFoundData />
            )}
          </Paper>
        </Grid>
        <Grid></Grid>

        <Grid item xs={12}>
          <Paper elevation={5} variant="indicator">
            <Box display={"flex"} alignItems={"center"}>
              <TabContext value={selectedTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                    <Tab
                      label={
                        <div>
                          {"Todas"}
                          <Chip
                            color="primary"
                            sx={{ ml: 1, borderRadius: "5px" }}
                            size="small"
                            label={userPapers.total_open + userPapers.total_close}
                          />
                        </div>
                      }
                      value=""
                    />
                    <Tab
                      label={
                        <div>
                          {"Apostas Abertas"}
                          <Chip
                            color="primary"
                            sx={{ ml: 1, borderRadius: "5px" }}
                            size="small"
                            label={userPapers.total_open}
                          />
                        </div>
                      }
                      value="-1"
                    />
                    <Tab
                      label={
                        <div>
                          {"Apostas Encerradas"}
                          <Chip
                            sx={{ ml: 1, borderRadius: "5px" }}
                            color="error"
                            size="small"
                            label={userPapers.total_close || 0}
                          />
                        </div>
                      }
                      value="1"
                    />
                  </TabList>
                </Box>
              </TabContext>
            </Box>

            {userPapers && userPapers.data.length === 0 ? (
              <Box padding={10}>
                <Typography variant="body1" color="gray" textAlign={"center"}>
                  Não há dados
                </Typography>
              </Box>
            ) : (
              <DataGrid
                disableRowSelectionOnClick
                disableColumnSelector
                rows={userPapers.data}
                rowCount={userPapers.total}
                paginationMode="server"
                columns={columnsDetails}
                density={"comfortable"}
                // rowHeight={120}
                getRowHeight={() => "auto"}
                initialState={{
                  pagination: {
                    paginationModel: { page: userPapers.current_page - 1, pageSize: userPapers.per_page },
                  },
                }}
                onPaginationModelChange={(model, details) => {
                  router.get(
                    "",
                    { page: model.page + 1, per_page: model.pageSize },
                    { preserveState: true, only: ["userPapers"], preserveScroll: true }
                  );
                }}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    display: "none",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "inherit",
                  },
                }}
                checkboxSelection={false}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
