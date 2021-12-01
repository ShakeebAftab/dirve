import { useContext, useState } from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { AppContext } from "src/context/AppContext";
import { AuthContext } from "src/context/AuthContext";
import { FolderRounded, HomeRounded } from "@material-ui/icons";
import { useNavigate } from "react-router";
import { Box, Button, Grid } from "@material-ui/core";
import { ThemeContext } from "src/theme/ThemeContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    gridItem: {
      marginTop: "6px",
    },
  })
);

export const TabbedHeader = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { folderNames } = useContext(AppContext);
  const { AuthState } = useContext(AuthContext);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleListItemClick = (name: string, id: string) => {
    name === "Home" ? navigate("/home") : navigate(`/folder/${id}`);
    handleDrawerClose();
  };

  const handleSignOut = () => {
    AuthState({
      type: "SIGNOUT",
      payload: null,
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar} color="primary">
        <Grid container>
          <Grid item xs={5} sm={8} md={9}>
            <Toolbar variant="dense">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Drive
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item xs={7} sm={4} md={3} className={classes.gridItem}>
            <Box>
              <Button color="inherit" onClick={() => handleSignOut()}>
                Sign Out
              </Button>
              <Button color="inherit" onClick={() => setIsDark(!isDark)}>
                {isDark ? "Light Mode" : "Dark Mode"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {folderNames &&
            [
              {
                name: "Home",
                id: "home",
              },
              ...folderNames,
            ].map((folder) => (
              <ListItem
                button
                key={folder.id}
                onClick={() => handleListItemClick(folder.name, folder.id)}
              >
                <ListItemIcon>
                  {folder.id === "home" ? <HomeRounded /> : <FolderRounded />}
                </ListItemIcon>
                <ListItemText primary={folder.name} />
              </ListItem>
            ))}
        </List>
      </Drawer>
    </div>
  );
};
