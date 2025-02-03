import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Button,
  Container,
  Grid2 as Grid,
  Pagination,
  Box,
} from "@mui/material";

import LocationCard from "components/LocationCard/LocationCard";

import styles from "./Pages.module.css";

function Favorites() {
  const navigate = useNavigate();

  const [favoritesData, setFavoritesData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API when component mounts and when page changes
    axios
      .get(`http://localhost:8080/favorite?page=${page - 1}`)
      .then((response) => {
        setFavoritesData(response.data.places);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Handle Loading
  if (loading) {
    return (
      <Container style={{ marginTop: "20px", textAlign: "center" }}>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  // Handle Error
  if (error) {
    return (
      <Container style={{ marginTop: "20px", textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Box
        className={styles.headerWrapper}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h1">Favorite Places</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>

      <Box className={styles.dataWrapper}>
        <Grid container spacing={3}>
          {favoritesData.map((favorite, index) => (
            <Grid size={12} key={index}>
              <LocationCard place={favorite} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Pagination
        className={styles.pagination}
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        color="primary"
      />
    </div>
  );
}

export default Favorites;
