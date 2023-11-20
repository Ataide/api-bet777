import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TableTabList from "./TableTabList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { router, useForm, usePage } from "@inertiajs/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { IAdmin, IAdminResource, IUser } from "@/types";
import { checkIfUserIsActiveInactiveOrRecent } from "@/helper";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";

export default function DataTable({ admins, resource }: { admins: IAdminResource; resource: string }) {
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
            return <Typography variant="body1">{params.row.profile.account_status}</Typography>;
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
  const [openPermission, setOpenPermission] = React.useState(false);
  const [roles, setRoles] = React.useState<any[]>([]);

  const [itemSelected, setItemSelected] = React.useState<IAdmin | null>(null);
  const [isAproving, setIsAproving] = React.useState<boolean>(false);
  const [editing, setEditing] = React.useState(false);
  const { errors } = usePage().props;

  const handleClickOpen = (_user: any) => {
    //? #TODO melhorar esse parte.
    setData({ ..._user.profile, ..._user, roles: _user.roles.map((data: any) => data.name) });
    setOpen(true);
  };

  const handleClickAproveUser = (_user: any) => {
    setData({ ..._user.profile, ..._user });
    setIsAproving(true);
    setOpen(true);
  };

  const handleClose = () => {
    setEditing(false);
    setIsAproving(false);
    setOpen(false);
  };

  const handleClickOpenDelete = (admin: IAdmin) => {
    setOpenDelete(true);
    setItemSelected(admin);
  };

  const handleCloseDelete = () => {
    setItemSelected(null);
    setOpenDelete(false);
  };

  const handleClosePermission = () => {
    setItemSelected(null);
    setRoles([]);
    setOpenPermission(false);
  };

  const handleChangePermission = (e: React.ChangeEvent<HTMLInputElement>) => {
    const roleHasInArray = roles?.some((role) => role === e.target.name);

    if (roleHasInArray) {
      setRoles(roles?.filter((role) => role !== e.target.name));
      return;
    }

    setRoles((old) => [...old, e.target.name]);
  };

  const deleteAction = () => {
    if (itemSelected) {
      router.delete(route("administration.destroy", { user: itemSelected }), {
        onSuccess: (page) => {
          //console.log(page);
          handleCloseDelete();
        },
      });
    }
  };

  React.useEffect(() => {
    setData("roles", roles);
  }, [roles]);

  const addPermissionAction = () => {
    router.post(
      route("administration.permission.add", { user: data.id }),
      { roles: data.roles },
      {
        onSuccess: (page) => {
          toast.success("Permissões adicionada ao usuário com sucesso");
          handleClosePermission();
        },
        onError: (error) => {
          toast.error(error.message);
          handleClosePermission();
        },
      }
    );
  };

  const { data, setData, post, processing } = useForm({
    id: 0,
    email: "",
    name: "",
    birthday: "",
    cpf: "",
    phone: "",
    pix_key: "",
    roles: [""],
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
        <TableTabList resource={resource} aproveHandle={handleClickAproveUser} />
        {admins.data.length === 0 ? (
          <Box padding={10}>
            <Typography variant="body1" color="gray" textAlign={"center"}>
              Não há dados
            </Typography>
          </Box>
        ) : (
          <DataGrid
            disableRowSelectionOnClick
            disableColumnSelector
            rows={admins.data}
            rowCount={admins.total}
            paginationMode="server"
            columns={columns}
            density={"comfortable"}
            disableColumnFilter={true}
            disableColumnMenu={true}
            initialState={{
              pagination: {
                paginationModel: { page: admins.current_page - 1, pageSize: admins.per_page },
              },
            }}
            onPaginationModelChange={(model, details) => {
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
                  Nome'
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
              {!isAproving ? (
                <>
                  <Box display={"flex"} flexDirection={"row"} flex={1} gap={2}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setOpenPermission(true);
                        handleClose();
                      }}
                    >
                      Permissões
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
              ) : (
                <>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleClose();
                      setIsAproving(false);
                      router.put(route("administration.aprove", { id: data.id }), {}, { preserveState: true });
                    }}
                  >
                    Aprovar
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleClose();
                      setEditing(false);
                      setIsAproving(false);
                    }}
                  >
                    Recusar
                  </Button>
                </>
              )}
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
            Tem certeza que desenha deletar esse administrador?
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

      <Dialog
        open={openPermission}
        onClose={handleClosePermission}
        PaperProps={{ sx: { backgroundColor: "#2e2e2e" } }}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle>Adicionar permissões</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClosePermission}
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
          <Box sx={{ display: "flex" }}>
            <FormControl component="fieldset" variant="filled">
              <FormLabel component="legend">Dashboard</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={({ palette }) => ({
                        color: palette.primary.main,
                      })}
                      color="primary"
                      checked={data.roles?.some((role) => role === "view dashboard")}
                      onChange={handleChangePermission}
                      name="view dashboard"
                    />
                  }
                  label="Ter acesso a aba “RECEITAS”"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={({ palette }) => ({
                        color: palette.primary.main,
                      })}
                      color="primary"
                      checked={data.roles?.some((role) => role === "edit users")}
                      onChange={handleChangePermission}
                      name="edit users"
                    />
                  }
                  label="Editar perfil de usuário"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={({ palette }) => ({
                        color: palette.primary.main,
                      })}
                      color="primary"
                      checked={data.roles?.some((role) => role === "edit admins")}
                      onChange={handleChangePermission}
                      name="edit admins"
                    />
                  }
                  label="Editar perfil de administrador"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={({ palette }) => ({
                        color: palette.primary.main,
                      })}
                      color="primary"
                      checked={data.roles?.some((role) => role === "aprove admins")}
                      onChange={handleChangePermission}
                      name="aprove admins"
                    />
                  }
                  label="Poder aceitar solicitação de novos administradores"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={({ palette }) => ({
                        color: palette.primary.main,
                      })}
                      color="primary"
                      checked={data.roles?.some((role) => role === "delete admins")}
                      onChange={handleChangePermission}
                      name="delete admins"
                    />
                  }
                  label="Excluir perfil de administrador"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={({ palette }) => ({
                        color: palette.primary.main,
                      })}
                      color="primary"
                      checked={data.roles?.some((role) => role === "delete users")}
                      onChange={handleChangePermission}
                      name="delete users"
                    />
                  }
                  label="Excluir perfil de usuario"
                />
              </FormGroup>
              <FormLabel sx={{ marginTop: 3 }} component="legend">
                Jogo / Aposta
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={({ palette }) => ({
                        color: palette.primary.main,
                      })}
                      color="primary"
                      checked={data.roles?.some((role) => role === "create events")}
                      onChange={handleChangePermission}
                      name="create events"
                    />
                  }
                  label="Criar evento/Excluir evento"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={({ palette }) => ({
                        color: palette.primary.main,
                      })}
                      color="primary"
                      checked={data.roles?.some((role) => role === "view bets")}
                      onChange={handleChangePermission}
                      name="view bets"
                    />
                  }
                  label="Ter acesso a aba “Apostas”"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", p: 3 }}>
          <>
            <Button variant="contained" color="primary" onClick={() => addPermissionAction()}>
              Adicionar
            </Button>
            <Button variant="outlined" onClick={handleClosePermission}>
              Cancelar
            </Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}
