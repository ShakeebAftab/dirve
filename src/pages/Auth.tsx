import { Box, Grid } from "@material-ui/core";
import { SignIn } from "./SignIn";
import { Header } from "src/components/Header";

export const Auth = () => {
  return (
    <Box overflow="hidden">
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <SignIn />
        </Grid>
      </Grid>
    </Box>
  );
};
