import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { router, useForm, usePage } from "@inertiajs/react";
import DetailsTableTabList from "./DetailsTableTabList";

export default function DataTableDetails({ transactions, resource }: { transactions?: any; resource?: string }) {
  const details = [
    { id: 1, date: new Date().toISOString(), amount: 120 },
    { id: 2, date: new Date().toISOString(), amount: 120 },
    { id: 3, date: new Date().toISOString(), amount: 120 },
    { id: 4, date: new Date().toISOString(), amount: 120 },
    { id: 5, date: new Date().toISOString(), amount: 120 },
  ];

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Data",
      sortable: false,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Quantia",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => "R$ " + params.row.amount,
    },
    // {
    //   field: "total_withdraws",
    //   headerName: "Saque",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    //   flex: 1,
    //   // valueGetter: (params: GridValueGetterParams) => params.row.,
    // },
  ];

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <DetailsTableTabList />
        <DataGrid
          disableRowSelectionOnClick
          disableColumnSelector
          rows={details}
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
