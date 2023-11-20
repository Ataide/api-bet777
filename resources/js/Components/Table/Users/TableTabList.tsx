import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { ReactEventHandler, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

interface ITabListProps {
  resource?: string;
}
export default function TableTabList({ resource }: ITabListProps) {
  const { users } = usePage<PageProps>().props;
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
                    label={users.total_users}
                  />{" "}
                </div>
              }
              value=""
            />
            <Tab
              label={
                <div>
                  {"Ativo"}
                  <Chip color="success" size="small" label={users.total_actives} sx={{ ml: 1, borderRadius: "5px" }} />
                </div>
              }
              value="Ativo"
            />
            <Tab
              label={
                <div>
                  {"Novos"}
                  <Chip color="warning" size="small" label={users.total_recents} sx={{ ml: 1, borderRadius: "5px" }} />
                </div>
              }
              value="Novo"
            />
            <Tab
              label={
                <div>
                  {"Inativos"}
                  <Chip color="error" size="small" label={users.total_inactives} sx={{ ml: 1, borderRadius: "5px" }} />
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
        <IconButton aria-label="delete" sx={{ mr: 2 }}>
          <DeleteIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
