import { Box, Grid } from "@material-ui/core";
import { Header } from "./components/Header";
import { SignIn } from "./pages/SignIn";
// import { SignUp } from "./pages/SignUp";

export const App = () => {
  return (
    <Box overflow="hidden">
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          {/* <SignUp /> */}
          <SignIn />
        </Grid>
      </Grid>
    </Box>
  );
};
