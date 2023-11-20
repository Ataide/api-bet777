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
import { toast } from "react-toastify";
import { IUser } from "@/types";
import { checkIfUserIsActiveInactiveOrRecent } from "@/helper";

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
      sortable: false,
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.profile.phone,
    },
    { field: "email", sortable: false, headerName: "E-mail", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        const result = checkIfUserIsActiveInactiveOrRecent(params.row) || "";

        switch (result) {
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
            return <Typography variant="body1">{"Não encontrado"}</Typography>;
        }
      },
    },
    {
      field: "",
      headerName: "Ações",
      sortable: false,

      renderCell: (params) => {
        return (
          <Stack direction="row">
            <IconButton aria-label="edit" sx={{ mr: 1 }} onClick={() => handleClickOpen(params.row)}>
              <ModeEditOutlineIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            <IconButton aria-label="edit" sx={{ mr: 1 }} onClick={() => handleClickOpenDelete(params.row)}>
              <DeleteIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Stack>
        );
      },
      width: 160,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [itemSelected, setItemSelected] = React.useState<IUser | null>(null);
  const [editing, setEditing] = React.useState(false);
  const { errors } = usePage().props;

  const handleClickOpen = (_user: any) => {
    //? #TODO melhorar esse parte.
    setData({ ..._user.profile, ..._user });
    setOpen(true);
  };

  const handleClose = () => {
    setEditing(false);
    setOpen(false);
  };

  const handleClickOpenDelete = (user: IUser) => {
    setOpenDelete(true);
    setItemSelected(user);
  };

  const handleCloseDelete = () => {
    setItemSelected(null);
    setOpenDelete(false);
  };

  const deleteAction = () => {
    if (itemSelected) {
      router.delete(route("users.destroy", { user: itemSelected }), {
        onSuccess: (page) => {
          //console.log(page);
          handleCloseDelete();
        },
      });
    }
  };

  const { data, setData, post, processing } = useForm({
    id: 0,
    email: "",
    name: "",
    birthday: "",
    cpf: "",
    phone: "",
    pix_key: "",
  });

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();

    router.put(route("administration.update", data.id), data, {
      preserveState: true,
      onSuccess: (page) => {
        toast.success("Update Success");
        setEditing(false);
        setOpen(false);
        //console.log(page);
      },
      onError: (errors) => {
        // setSending(false);
      },
    });
  };

  return (
    <>
      <Paper elevation={5} variant="indicator" sx={{ maxWidth: "100%" }}>
        <TableTabList resource={resource} />
        {users.data.length === 0 ? (
          <Box padding={10}>
            <Typography variant="body1" color="gray" textAlign={"center"}>
              Não há dados
            </Typography>
          </Box>
        ) : (
          <DataGrid
            disableRowSelectionOnClick
            disableColumnSelector
            rows={users.data}
            rowCount={users.total}
            paginationMode="server"
            columns={columns}
            density={"comfortable"}
            disableColumnFilter={true}
            disableColumnMenu={true}
            initialState={{
              pagination: {
                paginationModel: { page: users.current_page - 1, pageSize: users.per_page },
              },
            }}
            onPaginationModelChange={(model, details) => {
              //console.log(model, details);
              router.get("", { page: model.page + 1, per_page: model.pageSize }, { preserveState: true });
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
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
                  id="cpf"
                  name="cpf"
                  placeholder="22/04/1986"
                  value={data.cpf}
                  error={errors.cpf ? true : false}
                  helperText={errors.cpf}
                  onChange={(e) => setData("cpf", e.target.value)}
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
                  id="birthday"
                  name="birthday"
                  placeholder="1234567890"
                  value={data.birthday}
                  error={errors.birthday ? true : false}
                  helperText={errors.birthday}
                  onChange={(e) => setData("birthday", e.target.value)}
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
                  id="phone"
                  name="phone"
                  placeholder="1234567890"
                  value={data.phone}
                  error={errors.phone ? true : false}
                  helperText={errors.phone}
                  onChange={(e) => setData("phone", e.target.value)}
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
                <Button
                  variant="outlined"
                  onClick={() => {
                    router.visit("/apostas?id=" + data.id);
                    handleClose();
                  }}
                >
                  Apostas
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    router.visit("/transacoes?id=" + data.id);
                    handleClose();
                  }}
                >
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
            Tem certeza que deseja deletar esse usuário selecionado?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", p: 3 }}>
          <>
            <Button variant="contained" color="error" onClick={() => deleteAction()}>
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
