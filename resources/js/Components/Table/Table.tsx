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

export default function DataTable({ users, resource }: { users?: any; resource?: string }) {
  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Nome",
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => `${params.row.name || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "profile.phone",
      headerName: "Telefone",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.profile.phone,
    },
    { field: "email", headerName: "E-mail", flex: 1 },
    {
      field: "profile.account_status",
      headerName: "Status",
      width: 120,
      valueGetter: (params: GridValueGetterParams) => params.row.profile.account_status,
      renderCell: (params) => {
        switch (params.row.profile.account_status) {
          case "Ativo":
            return (
              <Typography variant="body1" sx={{ color: "success.main" }}>
                Ativo
              </Typography>
            );
          case "Inativo":
            return (
              <Typography variant="body1" color="error">
                Inativo
              </Typography>
            );
          case "Novo":
            return <Typography sx={{ color: "warning.main" }}>Novo</Typography>;

          default:
            return <Typography variant="body1">{params.row.profile.account_status}</Typography>;
        }
      },
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
  const [editing, setEditing] = React.useState(false);
  const { errors } = usePage().props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditing(false);
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const { data, setData, post, processing } = useForm({
    id: 2,
    email: "ataide.bastos@gmail.com",
    name: "Ataide",
    birthdate: "",
    cpf: "",
    phone: "",
    pix_key: "",
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
        <TableTabList resource={resource} />
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

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: "#2e2e2e" } }}
        maxWidth={"md"}
        fullWidth
      >
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
            gap={2}
          >
            <Box display="flex" flexDirection="column" gap={2} width={"100%"}>
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
                  CPF
                </Typography>
                <TextField
                  fullWidth
                  required
                  disabled={!editing}
                  id="birthdate"
                  name="birthdate"
                  placeholder="22/04/1986"
                  value={data.birthdate}
                  error={errors.birthdate ? true : false}
                  helperText={errors.birthdate}
                  onChange={(e) => setData("birthdate", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Box>

              <Box width={"100%"}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Data de nascimento
                </Typography>
                <TextField
                  fullWidth
                  required
                  disabled={!editing}
                  id="cpf"
                  name="cpf"
                  placeholder="1234567890"
                  value={data.cpf}
                  error={errors.cpf ? true : false}
                  helperText={errors.cpf}
                  onChange={(e) => setData("cpf", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Box>

              <Box width={"100%"}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Telefone
                </Typography>
                <TextField
                  fullWidth
                  required
                  disabled={!editing}
                  id="cpf"
                  name="cpf"
                  placeholder="1234567890"
                  value={data.cpf}
                  error={errors.cpf ? true : false}
                  helperText={errors.cpf}
                  onChange={(e) => setData("cpf", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={2} width={"100%"}>
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
              <Box width={"100%"}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Usuário
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
                  Chave Pix
                </Typography>
                <TextField
                  fullWidth
                  required
                  disabled={!editing}
                  id="pix_key"
                  name="pix_key"
                  placeholder="example@example.com"
                  value={data.pix_key}
                  error={errors.pix_key ? true : false}
                  helperText={errors.pix_key}
                  onChange={(e) => setData("pix_key", e.target.value)}
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
