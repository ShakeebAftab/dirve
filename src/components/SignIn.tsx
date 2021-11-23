import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    marginBottom: "8px",
    marginLeft: "5px",
  },
  signUpTxt: {
    display: "flex",
    justifyContent: "center",
  },
});

export const SignIn = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { AuthState } = useContext(AuthContext);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!email || !password) return;
    e.preventDefault();
    AuthState({ type: "SIGNIN", payload: { email, password } });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <Paper>
        <Box p="20px" display="flex" pt="40px" pb="40px">
          <Container maxWidth="sm">
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    color="textPrimary"
                    className={classes.title}
                  >
                    Login
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    placeholder="Please enter your email"
                    size="small"
                    color="primary"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    placeholder="Please enter your password"
                    size="small"
                    color="primary"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} className={classes.signUpTxt}>
                  <Typography variant="body2">
                    <span>Don't have an account?</span>
                    <Button
                      color="primary"
                      variant="text"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </Button>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    onClick={(e) => handleSubmit(e)}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Box>
      </Paper>
    </Box>
  );
};
