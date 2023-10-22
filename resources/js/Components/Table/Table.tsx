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

export default function DataTable({ users }: { users?: any }) {
  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Nome",
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => `${params.row.name || ""} ${params.row.lastName || ""}`,
    },
    { field: "phone", headerName: "Telefone", type: "number", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
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
  const [editing, setEditing] = React.useState(false);
  const { errors } = usePage().props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditing(false);
    setOpen(false);
  };

  const { data, setData, post, processing } = useForm({
    id: 2,
    email: "ataide.bastos@gmail.com",
    name: "Ataide",
  });

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    router.post(route("users.storeFromModal"), data, {
      preserveState: true,
      onSuccess: (page) => {
        // setSending(false);
        setOpen(false);
      },
      onError: (errors) => {
        // setSending(false);
      },
    });
  };

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <TableTabList />
        <DataGrid
          disableRowSelectionOnClick
          disableColumnSelector
          rows={users.data}
          rowCount={users.total}
          paginationMode="server"
          columns={columns}
          density={"comfortable"}
          initialState={{
            pagination: {
              paginationModel: { page: users.current_page - 1, pageSize: users.per_page },
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
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { backgroundColor: "#2e2e2e" } }} maxWidth={"md"} fullWidth>
        <DialogTitle>Gerenciar Conta</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          <Box
            component="form"
            id="form_edit"
            onSubmit={submit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "row",
            }}
            gap={1}
          >
            <Box display="flex" flexDirection="row" gap={2} width={"100%"}>
              <Box width={"100%"}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Nome
                </Typography>
                <TextField
                  fullWidth
                  required
                  disabled={!editing}
                  id="name"
                  name="name"
                  placeholder="example@example.com"
                  value={data.name}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                  onChange={(e) => setData("name", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
              <Box width={"100%"}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  required
                  disabled={!editing}
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  value={data.email}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  onChange={(e) => setData("email", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", p: 3 }}>
          {!editing && (
            <>
              <Box display={"flex"} flexDirection={"row"} flex={1} gap={2}>
                <Button variant="outlined" onClick={handleClose}>
                  Apostas
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Transações
                </Button>
              </Box>
              <Button
                variant="outlined"
                onClick={() => {
                  setEditing(true);
                }}
              >
                Mudar informações
              </Button>
            </>
          )}
          {editing && (
            <>
              <Button variant="contained" type="submit" form="form_edit">
                Salvar
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setEditing(false);
                }}
              >
                Cancelar
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
