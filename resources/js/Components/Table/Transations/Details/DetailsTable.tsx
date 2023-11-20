import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { router, useForm, usePage } from "@inertiajs/react";
import DetailsTableTabList from "./DetailsTableTabList";
import { PageProps } from "@/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

export default function DataTableDetails({ transactions, resource }: { transactions?: any; resource?: string }) {
  const columns: GridColDef[] = [
    {
      field: "created_at",
      headerName: "Data",
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        "ID: " + params.row.user_id + "    " + format(new Date(params.row.created_at), "dd/MM/yyyy hh:mm"),
    },
    {
      field: "amount",
      headerName: "Quantia",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => "R$ " + (params.row.withdraw + params.row.deposit).toFixed(2),
    },
  ];

  const { transactionDetails } = usePage<PageProps>().props;

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <DetailsTableTabList />
        {transactionDetails && transactionDetails.data.length === 0 ? (
          <Box padding={10}>
            <Typography variant="body1" color="gray" textAlign={"center"}>
              Não há dados
            </Typography>
          </Box>
        ) : (
          <DataGrid
            disableRowSelectionOnClick
            disableColumnSelector
            rows={transactionDetails.data}
            rowCount={transactionDetails.total}
            paginationMode="server"
            columns={columns}
            density={"comfortable"}
            initialState={{
              pagination: {
                paginationModel: { page: transactionDetails.current_page - 1, pageSize: transactionDetails.per_page },
              },
            }}
            onPaginationModelChange={(model, details) => {
              router.get(
                "/transacoes",
                { page: model.page + 1, per_page: model.pageSize },
                { preserveState: true, only: ["transactionDetails"] }
              );
            }}
            checkboxSelection={false}
          />
        )}
      </Paper>
    </>
  );
}
