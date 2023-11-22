import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

export interface IDateFieldProps {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}

export default function DateField({ value, onChange }: IDateFieldProps) {
  const onKeyDown = (e: any) => {
    e.preventDefault();
  };
  return (
    <DatePicker
      localeText={{ clearButtonLabel: "Limpar", todayButtonLabel: "Hoje" }}
      slotProps={{
        textField: {
          onKeyDown: (e) => {
            e.preventDefault();
          },
        },
        actionBar: {
          actions: ["clear", "today"],
        },
      }}
      sx={({ palette }) => ({
        fieldset: {
          borderColor: "transparent !important",
        },
        "& .MuiOutlinedInput-root": {
          color: palette.common.white,
          background: palette.background.default,
        },
        "& .MuiSvgIcon-root": {
          color: palette.primary.main,
        },
        ".MuiDayCalendar-weekDayLabel": {
          color: palette.primary.main,
        },
      })}
      value={value}
      onChange={onChange}
    />
  );
}
