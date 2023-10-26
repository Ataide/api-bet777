import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TableTabList from "./TableTabList";

import { router, useForm, usePage } from "@inertiajs/react";

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
      field: "total_deposits",
      headerName: "Depósito",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      // valueGetter: (params: GridValueGetterParams) => params.deposits,
    },
    {
      field: "total_withdraws",
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
          getRowId={(row) => row.name}
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
            router.get("/transacoes", { page: model.page + 1, per_page: model.pageSize }, { preserveState: true });
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Paper>
    </>
  );
}
