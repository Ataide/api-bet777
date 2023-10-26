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
import { DatePicker } from "@mui/x-date-pickers";

interface ITabListProps {
  resource?: string;
}
export default function DetailsTableTabList({ resource }: ITabListProps) {
  const { transactions } = usePage<PageProps>().props;
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
                  {"Depósitos"}
                  <Chip color="primary" sx={{ ml: 1, borderRadius: "5px" }} size="small" label={12} />
                </div>
              }
              value=""
            />
            <Tab
              label={
                <div>
                  {"Saques"}
                  <Chip sx={{ ml: 1, borderRadius: "5px" }} color="error" size="small" label={12} />
                </div>
              }
              value=""
            />
          </TabList>
        </Box>
      </TabContext>
      <Box mr={4} flex={1} display={"flex"} flexDirection={"row"} justifyContent={"end"} alignItems={"center"}>
        {/* <TextField
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
        /> */}
        <DatePicker
          sx={{
            width: "207px",
            backgroundColor: "#2E2E2E",
            color: "#fff",
            borderRadius: "10px !important",
            "& .MuiIconButton-root": {
              color: "primary.main",
            },
          }}
        />
      </Box>
    </Box>
  );
}
