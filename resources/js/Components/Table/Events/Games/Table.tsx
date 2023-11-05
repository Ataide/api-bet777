import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TableTabList from "./TableTabList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import GameAddDialog from "@/Components/Dialog/Game.add";
import moment from "moment";

export default function DataTable({ games, resource }: { games?: any; resource?: string }) {
  const columns: GridColDef[] = [
    {
      field: "home_name",
      headerName: "Times",
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.home_name || "unknown"}  vs ${params.row.away_name || "unknown"}`,
    },
    {
      field: "home_odds",
      headerName: "Odds",
      headerAlign: "left",
      align: "left",
      width: 420,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.home_rate || "unknown"}  | ${params.row.draw_rate || "unknown"} |  ${
          params.row.away_rate || "unknown"
        }`,
    },
    {
      field: "time_close_bet",
      headerName: "Data do Jogo",
      width: 420,
      valueGetter: (params: GridValueGetterParams) => moment(params.row.time_close_bet).format("DD/MM/yyyy HH:mm"),
    },
    {
      field: "",
      headerName: "Ações",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        return (
          <Stack direction="row">
            <IconButton aria-label="edit" sx={{ mr: 1 }} onClick={handleClickOpen}>
              <ModeEditOutlineIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            <IconButton aria-label="edit" sx={{ mr: 1 }} onClick={handleClickOpenDelete}>
              <DeleteIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            <IconButton aria-label="more-options" sx={{ mr: 1 }} onClick={onClick}>
              <MoreVertIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Stack>
        );
      },
      width: 120,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <TableTabList resource={resource} clickOpenNewEvent={handleClickOpen} />

        <DataGrid
          disableRowSelectionOnClick
          // onRowClick={(e) => router.get("/eventos/" + e.row.id)}
          disableColumnSelector
          rows={games}
          // rowCount={events.total}
          paginationMode="server"
          columns={columns}
          density={"comfortable"}
          // initialState={{
          //   pagination: {
          //     paginationModel: { page: events.current_page - 1, pageSize: events.per_page },
          //   },
          // }}
          // onPaginationModelChange={(model, details) => {
          //   router.get("/eventos", { page: model.page + 1, per_page: model.pageSize }, { preserveState: true });
          // }}
          // pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Paper>

      <GameAddDialog open={open} handleClose={handleClose} />

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        PaperProps={{ sx: { backgroundColor: "#2e2e2e" } }}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle>Deletar contas</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDelete}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography variant="body1" fontWeight={400}>
            Tem certeza que desenha deletar <strong>4 contas</strong> selecionadas?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", p: 3 }}>
          <>
            <Button variant="contained" color="error">
              Deletar
            </Button>
            <Button variant="outlined" onClick={handleCloseDelete}>
              Cancelar
            </Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}
