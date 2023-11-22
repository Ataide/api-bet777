import * as React from "react";
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TableTabList from "./TableTabList";

import { router } from "@inertiajs/react";
import { formatter } from "@/helper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function DataTable({ bets, resource }: { bets?: any; resource?: string }) {
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

  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <TableTabList />
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
              });
              // router.get(route("be'ts", { id: result[0] }), {}, { preserveState: true, replace: true });
              setSelectionModel(result);
            } else {
              router.visit(route("bets", { id: selection[0] }), {
                method: "get",
                only: ["userPapers", "data_donut"],
                preserveState: true,
              });
              // router.get(route("bets", { id: selection[0] }), {}, { preserveState: true, replace: true });
              setSelectionModel(selection);
            }
          }}
        />
      </Paper>

      <Grid item xs={12}>
        <Paper
          sx={({ palette }) => ({
            backgroundColor: palette.background.default,
          })}
        >
          {/* <Box p={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Typography variant="body1" color="initial">
              Usuário: {userDetails.name}
            </Typography>
            <Stack direction={"row"} spacing={4}>
              <Stack direction={"column"}>
                <Typography variant="body2" display={"inline"}>
                  Todas as apostas:
                  <Typography component="span" variant="body1" color="primary" ml={1}>
                    {userDetails.total_bets}
                  </Typography>
                </Typography>
                <Typography variant="body2" display={"inline"}>
                  Saldo total:
                  <Typography component="span" variant="body1" color="primary" ml={1}>
                    {userDetails.total_bets}
                  </Typography>
                </Typography>
              </Stack>
              <Stack direction={"column"}>
                <Typography variant="body2" display={"inline"}>
                  Saldo apostas:
                  <Typography component="span" variant="body1" color="primary" ml={1}>
                    {userDetails.total_bets}
                  </Typography>
                </Typography>
                <Typography variant="body2" display={"inline"}>
                  Saldo livre pra saque:
                  <Typography component="span" variant="body1" color="primary" ml={1}>
                    {formatter.format(+userDetails.total_bets)}
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          </Box> */}
        </Paper>
      </Grid>

      <Grid item xs={12}></Grid>
    </>
  );
}
