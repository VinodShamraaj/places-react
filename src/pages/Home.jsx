import { useNavigate } from "react-router-dom";

import MapViewer from "components/MapViewer/MapViewer";
import SearchBar from "components/SearchBar/SearchBar";
import SearchHistory from "components/SearchHistory/SearchHistory";

import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";

import styles from "./Pages.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <Box
        className={styles.headerWrapper}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h1">Google Places Autocomplete</Typography>
        <Button variant="contained" onClick={() => navigate("favorites")}>
          Favorites
        </Button>
      </Box>
      <SearchBar />
      <Grid container>
        <Grid size={8}>
          <MapViewer />
        </Grid>
        <Grid size={4}>
          <SearchHistory />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
