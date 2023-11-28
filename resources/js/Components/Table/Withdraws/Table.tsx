import { formatter } from "@/helper";
import { IWithdraw, IWithdrawsResource, PageProps } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import * as React from "react";
import { toast } from "react-toastify";
import TableTabList from "./TableTabList";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function DataTable({ withdraws, resource }: { withdraws?: IWithdrawsResource; resource?: string }) {
  const { errors, auth } = usePage<PageProps>().props;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      sortable: false,
      width: 120,
    },
    {
      field: "user.name",
      headerName: "Usuário",
      sortable: false,
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.user.name,
    },
    {
      field: "user.email",
      headerName: "Email",
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.user.email,
    },
    {
      field: "user.profile.pix_key",
      headerName: "Chave Pix",
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.user.profile.pix_key,
    },

    {
      field: "transaction.withdraw",
      headerName: "Valor",
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => formatter.format(params.row.transaction.withdraw),
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        switch (params.row.status) {
          case "aproved":
            return (
              <Typography variant="body1" sx={{ color: "success.main" }}>
                Aprovado
              </Typography>
            );
          case "canceled":
            return (
              <Typography variant="body1" color="error">
                Cancelado
              </Typography>
            );
          case "pending":
            return <Typography sx={{ color: "warning.main" }}>Pendente</Typography>;

          default:
            return <Typography variant="body1">{"Não encontrado"}</Typography>;
        }
      },
    },
    {
      field: "",
      headerName: "Ações",
      align: "center",
      headerAlign: "center",
      sortable: false,

      renderCell: (params) => {
        return (
          <Stack direction="row">
            <IconButton aria-label="edit" sx={{ mr: 1 }} onClick={() => handleClickOpen(params.row)}>
              <ModeEditOutlineIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Stack>
        );
      },
      width: 160,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [itemSelected, setItemSelected] = React.useState<IWithdraw | null>(null);
  const [editing, setEditing] = React.useState(false);

  const handleClickOpen = (_row: IWithdraw) => {
    setData({
      email: _row.user.email,
      id: _row.id,
      name: _row.user.name,
      amount: formatter.format(_row.transaction.withdraw),
      status: _row.status,
      reason: _row.reason,
      pix_key: _row.user.profile.pix_key,
      draw_total: formatter.format(_row.user.wallet.draw_total),
    });

    setOpen(true);
  };

  const handleClose = () => {
    setEditing(false);
    setOpen(false);
  };

  const { data, setData, post, processing } = useForm({
    id: 0,
    name: "",
    status: "",
    amount: "",
    reason: "",
    email: "",
    pix_key: "",
    draw_total: "",
  });

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (!auth.roles.includes("edit users")) {
      toast.error("Desculpa, você não tem autorização para realizar essa ação.");
      return;
    }

    router.put(route("withdraws.update", { id: data.id }), data, {
      preserveState: true,
      onSuccess: (page) => {
        toast.success("Transação aprovada com sucesso.");
        setEditing(false);
        setOpen(false);
      },
      onError: (errors) => {
        toast.error(errors.message);
      },
    });
  };

  return (
    <>
      <Paper elevation={5} variant="indicator" sx={{ maxWidth: "100%" }}>
        <TableTabList resource={resource} />
        {withdraws?.data.length === 0 ? (
          <Box padding={10}>
            <Typography variant="body1" color="gray" textAlign={"center"}>
              Não há dados
            </Typography>
          </Box>
        ) : (
          withdraws && (
            <DataGrid
              disableRowSelectionOnClick
              disableColumnSelector
              rows={withdraws.data}
              rowCount={withdraws.total}
              paginationMode="server"
              columns={columns}
              density={"comfortable"}
              disableColumnFilter={true}
              disableColumnMenu={true}
              initialState={{
                pagination: {
                  paginationModel: { page: withdraws.current_page - 1, pageSize: withdraws.per_page },
                },
              }}
              onPaginationModelChange={(model, details) => {
                //console.log(model, details);
                router.get("", { page: model.page + 1, per_page: model.pageSize }, { preserveState: true });
              }}
              checkboxSelection
            />
          )
        )}
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: "#2e2e2e" } }}
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle>Finalização de aprovalçao de saque.</DialogTitle>
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
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Nome
                </Typography>
                <TextField
                  fullWidth
                  required
                  disabled={true}
                  id="name"
                  name="name"
                  placeholder="example@example.com"
                  value={data.name}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                  onChange={(e) => setData("name", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>

              <Grid item xs={5}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  required
                  disabled={true}
                  id="email"
                  name="email"
                  value={data.email}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>

              <Grid item xs={4}>
                <Typography variant="caption" color="white" fontWeight={600}>
                  Status
                </Typography>
                <FormControl fullWidth>
                  <Select
                    disabled={!editing}
                    sx={{ backgroundColor: "#1B1C1B", color: "#fff" }}
                    value={data.status}
                    placeholder="Selecione um esporte"
                    onChange={(e) => {
                      setData("status", e.target.value);
                    }}
                  >
                    <MenuItem value={"pending"}>
                      <Typography sx={{ color: "warning.main" }}>Pendente</Typography>
                    </MenuItem>
                    <MenuItem value={"aproved"}>
                      <Typography variant="body1" color="primary">
                        Aprovado
                      </Typography>
                    </MenuItem>
                    <MenuItem value={"canceled"}>
                      <Typography variant="body1" color="error">
                        Cancelar
                      </Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Chave Pix
                </Typography>
                <TextField
                  fullWidth
                  disabled={true}
                  id="pix_key"
                  name="pix_key"
                  placeholder="example@example.com"
                  value={data.pix_key}
                  error={errors.pix_key ? true : false}
                  helperText={errors.pix_key}
                  onChange={(e) => setData("pix_key", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Saldo disponível.
                </Typography>
                <TextField
                  fullWidth
                  disabled={true}
                  id="draw_total"
                  name="draw_total"
                  placeholder="example@example.com"
                  value={data.draw_total}
                  error={errors.draw_total ? true : false}
                  helperText={errors.draw_total}
                  onChange={(e) => setData("draw_total", formatter.format(+e.target.value))}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>

              <Grid item xs={4}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Saque solicitado.
                </Typography>
                <TextField
                  fullWidth
                  disabled={true}
                  id="amount"
                  name="amount"
                  placeholder="example@example.com"
                  value={data.amount}
                  error={errors.amount ? true : false}
                  helperText={errors.amount}
                  onChange={(e) => setData("amount", formatter.format(+e.target.value))}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Observação
                </Typography>
                <TextField
                  fullWidth
                  disabled={!editing}
                  id="reason"
                  name="reason"
                  placeholder="1234567890"
                  value={data.reason}
                  error={errors.reason ? true : false}
                  helperText={errors.reason}
                  onChange={(e) => setData("reason", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ display: "flex", p: 3 }}>
          {!editing && (
            <>
              <Button
                variant="outlined"
                disabled={!auth.roles.includes("edit users")}
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
