import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ReactEventHandler, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton, ListItemText } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

interface ITabListProps {
  resource?: string;
  aproveHandle: (user: any) => void;
}
export default function TableTabList({ resource, aproveHandle }: ITabListProps) {
  const { admins, pendings } = usePage<PageProps>().props;
  const [open, setOpen] = useState(false);
  const [selectedTab, setTabSelected] = useState("");
  const [search, setSearch] = useState<string>();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabSelected(newValue);
    if (resource) {
      router.get(resource, { search: search, status: newValue }, { preserveState: true });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value);
    if (resource) {
      router.get(resource, { search: event.target.value, status: selectedTab }, { preserveState: true });
    }
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab
                label={
                  <div>
                    {"Todos"}
                    <Chip
                      sx={{ background: "white", color: "black", ml: 1, borderRadius: "5px" }}
                      size="small"
                      label={admins.total_users}
                    />
                  </div>
                }
                value=""
              />
              <Tab
                label={
                  <div>
                    {"Ativo"}
                    <Chip
                      color="success"
                      size="small"
                      label={admins.total_actives}
                      sx={{ ml: 1, borderRadius: "5px" }}
                    />
                  </div>
                }
                value="Ativo"
              />
              <Tab
                label={
                  <div>
                    {"Novos"}
                    <Chip
                      color="warning"
                      size="small"
                      label={admins.total_recents}
                      sx={{ ml: 1, borderRadius: "5px" }}
                    />
                  </div>
                }
                value="Novo"
              />
              <Tab
                label={
                  <div>
                    {"Inativos"}
                    <Chip
                      color="error"
                      size="small"
                      label={admins.total_inactives}
                      sx={{ ml: 1, borderRadius: "5px" }}
                    />
                  </div>
                }
                value="Inativo"
              />
            </TabList>
          </Box>
        </TabContext>
        <Box
          ml={2}
          flex={1}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#fff" }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: false,
            }}
            color="secondary"
            required
            id="search"
            placeholder="Buscar"
            name="search"
            value={search}
            onChange={handleSearchChange}
          />
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Solicitações {pendings.length}
          </Button>
          <IconButton aria-label="delete" sx={{ mr: 2 }}>
            <DeleteIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { backgroundColor: "#2e2e2e" } }}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle>Aguardando aprovação</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
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
          <List>
            {pendings &&
              pendings.map((user) => (
                <ListItemButton key={user.id} sx={{ margin: 2 }} onClick={() => aproveHandle(user)}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <ChevronRight color="primary" />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={user.name} />
                  </ListItem>
                </ListItemButton>
              ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
