import * as React from "react";
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TableTabList from "./TableTabList";

import { router, useForm, usePage } from "@inertiajs/react";

export default function DataTable({ transactions, resource }: { transactions?: any; resource?: string }) {
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

  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <TableTabList />
        <DataGrid
          getRowId={(row) => row.user_id}
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
            router.get(
              "/transacoes",
              { page: model.page + 1, per_page: model.pageSize },
              { only: ["transactions"], preserveState: true }
            );
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(selection) => {
            if (selection.length > 1) {
              const selectionSet = new Set(selectionModel);
              const result = selection.filter((s) => !selectionSet.has(s));
              router.visit(route("transactions", { id: result[0] }), {
                method: "get",
                only: ["transactionDetails"],
                preserveState: true,
              });
              // router.get(route("transactions", { id: result[0] }), {}, { preserveState: true, replace: true });
              setSelectionModel(result);
            } else {
              router.visit(route("transactions", { id: selection[0] }), {
                method: "get",
                only: ["transactionDetails"],
                preserveState: true,
              });
              // router.get(route("transactions", { id: selection[0] }), {}, { preserveState: true, replace: true });
              setSelectionModel(selection);
            }
          }}
        />
      </Paper>
    </>
  );
}
