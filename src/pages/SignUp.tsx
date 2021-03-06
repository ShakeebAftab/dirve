import { Box, Grid } from "@material-ui/core";
import { SignUp as SignUpComp } from "src/components/SignUp";
import { Header } from "src/components/Header";

export const SignUp = () => {
  return (
    <Box overflow="hidden">
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <SignUpComp />
        </Grid>
      </Grid>
    </Box>
  );
};
