import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { User } from "@/types";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { PropsWithChildren, ReactNode, useState } from "react";
import AccountMenu from "../Components/AccountMenu";
// import NestedList from "@/Components/List/NestedList";
// import { Pole } from "../Components/Icons/index";
// import { FiberCable } from "../Components/Icons/index";
import logo from "../../assets/logo_vertical.png";
// import "./index.css";
// import Logo from "@/Components/Layout/Logo";
// import NavigationItem from "../Components/Layout/NavigationItem";
import { Link } from "@inertiajs/react";
import Container from "@mui/material/Container";

// import { MapContext } from "../MapContext";

const drawerWidth = 290;

export default function Authenticated({
  user,
  header,
  children,
  noPadding,
}: PropsWithChildren<{ user: User; header?: ReactNode; noPadding?: boolean }>) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar
        sx={{
          backgroundColor: "secondary.main",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={logo} width={78} alt="" />
      </Toolbar>
      <Divider />
      <Container>
        <List>
          <Typography variant="body1" fontWeight={400} py={2}>
            Dashboard
          </Typography>
          <ListItem component={Link} href={route("dashboard")} disablePadding>
            <ListItemButton selected={route().current("dashboard") ? true : false}>
              <ListItemText primary={"Receita"} />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} href={route("users")} disablePadding>
            <ListItemButton selected={route().current("users") ? true : false}>
              <ListItemText primary={"Usuários"} />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} href={route("administration")} disablePadding>
            <ListItemButton selected={route().current("administration") ? true : false}>
              <ListItemText primary={"Administração"} />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} href={route("transactions")} disablePadding>
            <ListItemButton selected={route().current("transactions") ? true : false}>
              <ListItemText primary={"Transações"} />
            </ListItemButton>
          </ListItem>
          <Typography variant="body1" fontWeight={400} py={2}>
            Jogos
          </Typography>
          <ListItem component={Link} href={route("events.index")} disablePadding>
            <ListItemButton selected={route().current("events.index") ? true : false}>
              <ListItemText primary={"Eventos"} />
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} href={route("bets", { search: "", type: "-1" })} disablePadding>
            <ListItemButton selected={route().current("bets") ? true : false}>
              <ListItemText primary={"Apostas"} />
            </ListItemButton>
          </ListItem>
          {/* <Typography variant="body1" fontWeight={400} py={2}>
            Solicitações
          </Typography>
          <ListItem component={Link} href={route("requests", { search: "", type: "-1" })} disablePadding>
            <ListItemButton selected={route().current("requests") ? true : false}>
              <ListItemText primary={"Apostas"} />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Container>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="secondary"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <span> </span>

          <AccountMenu name={user.name} />
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "secondary.main",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: noPadding ? 0 : 5,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
