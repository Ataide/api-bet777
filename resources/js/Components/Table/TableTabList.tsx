import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { router } from "@inertiajs/react";

export default function TableTabList() {
  const [value, setValue] = useState("1");
  const [search, setSearch] = useState<string>();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.get("/usuarios", { search: search, status: newValue }, { preserveState: true });
  };

  function ItemTabsWithInfo({ label, value }: { label: string; value?: number }) {
    return (
      <>
        {label}
        <Chip label={value} />
      </>
    );
  }

  return (
    <Box display={"flex"}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label={
                <div>
                  {"Todos"}
                  <Chip color="default" size="small" label={"100"} sx={{ ml: 1 }} />
                </div>
              }
              value=""
            />
            <Tab
              label={
                <div>
                  {"Ativo"}
                  <Chip color="success" size="small" label={"100"} sx={{ ml: 1 }} />
                </div>
              }
              value="Ativo"
            />
            <Tab
              label={
                <div>
                  {"Novos"}
                  <Chip color="warning" size="small" label={"100"} sx={{ ml: 1 }} />
                </div>
              }
              value="Novo"
            />
            <Tab
              label={
                <div>
                  {"Inativos"}
                  <Chip color="error" size="small" label={"100"} sx={{ ml: 1 }} />
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
          onChange={(e) => {
            setSearch(e.target.value);
            router.get("/usuarios", { search: e.target.value, status: value }, { preserveState: true });
          }}
        />
        <IconButton aria-label="delete" sx={{ mr: 2 }}>
          <DeleteIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
