import { Box, Grid } from "@material-ui/core";
import { SignIn as SignInComp } from "src/components/SignIn";
import { Header } from "src/components/Header";

export const SignIn = () => {
  return (
    <Box overflow="hidden">
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <SignInComp />
        </Grid>
      </Grid>
    </Box>
  );
};
