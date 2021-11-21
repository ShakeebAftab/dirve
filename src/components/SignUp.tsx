import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { AuthContext } from "src/context/AuthContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    marginBottom: "8px",
    marginLeft: "5px",
  },
  signInTxt: {
    display: "flex",
    justifyContent: "center",
  },
});

export const SignUp = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { AuthState } = useContext(AuthContext);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    AuthState({
      type: "SIGNUP",
      payload: {
        name,
        email,
        password,
      },
    });
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
                <Grid xs={12}>
                  <Typography
                    variant="h4"
                    color="textPrimary"
                    className={classes.title}
                  >
                    Sign Up
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    placeholder="Please enter your name"
                    size="small"
                    color="primary"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                <Grid item xs={12} className={classes.signInTxt}>
                  <Typography variant="body2">
                    <span>Already have an account?</span>
                    <Button
                      color="primary"
                      variant="text"
                      onClick={() => navigate("/")}
                    >
                      Sign In
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
                    Sign Up
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
