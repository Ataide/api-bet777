import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export interface ISearchFieldProps {
  value: string | null | undefined;
  onChange: (value: any) => void;
}
export default function SearchField({ value, onChange }: ISearchFieldProps) {
  return (
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
      value={value}
      onChange={onChange}
    />
  );
}
