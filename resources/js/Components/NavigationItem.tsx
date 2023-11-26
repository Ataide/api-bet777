import { ComponentType, ReactComponentElement, ReactElement } from "react";
import NavLink from "./NavLink";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface NavItemsProps {
  label: string;
  nested?: boolean;
  link: string;
  Icon: any;
}
export default function NavigationItem({ label, Icon, link, nested }: NavItemsProps) {
  return (
    <ListItem disablePadding>
      <NavLink className="w-full p-0 text-[#c5d5dd]" href={route(link)} active={route().current(link)}>
        <ListItemButton sx={nested ? { pl: 4 } : {}}>
          <ListItemIcon>
            <Icon
              sx={{
                color: route().current(link) ? "orange" : "#b8c7ce",
              }}
            />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
}
