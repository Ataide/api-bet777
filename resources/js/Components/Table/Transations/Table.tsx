import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TableTabList from "./TableTabList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { router, useForm, usePage } from "@inertiajs/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DataTable({ transactions, resource }: { transactions?: any; resource?: string }) {
  console.log(transactions);
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nome",
      sortable: false,
      flex: 1,
    },
    {
      field: "deposits",
      headerName: "Depósito",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      // valueGetter: (params: GridValueGetterParams) => params.deposits,
    },
    {
      field: "withdraws",
      headerName: "Saque",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      // valueGetter: (params: GridValueGetterParams) => params.row.,
    },
  ];

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <TableTabList />
        <DataGrid
          disableRowSelectionOnClick
          disableColumnSelector
          rows={transactions.data}
          rowCount={transactions.total}
          paginationMode="server"
          columns={columns}
          density={"comfortable"}
          initialState={{
            pagination: {
              paginationModel: { page: transactions.current_page - 1, pageSize: transactions.per_page },
            },
          }}
          onPaginationModelChange={(model, details) => {
            console.log(model, details);
            router.get("/usuarios", { page: model.page + 1, per_page: model.pageSize }, { preserveState: true });
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Paper>
    </>
  );
}
