import { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AuthContext } from "src/context/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export const Header = () => {
  const classes = useStyles();

  const { AuthState } = useContext(AuthContext);

  const handleTemp = () => {
    AuthState({ type: "SIGNOUT", payload: null });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" onClick={() => handleTemp()}>
            Drive
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
