import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SearchHistory.module.css";
import { clearSearchHistory } from "reducers/placeSlice";
import SearchHistoryCard from "../SearchHistoryCard/SearchHistoryCard";

const SearchHistory = () => {
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.places.searchHistory);

  const handleClear = () => {
    dispatch(clearSearchHistory());
  };

  return (
    <div className={styles.wrapper}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingBottom: "12px",
        }}
      >
        <Typography variant="h5">History</Typography>
        <Button onClick={handleClear} sx={{ marginRight: "12px" }}>
          Clear
        </Button>
      </Box>
      {/* If search history empty */}
      {searchHistory.length <= 0 && (
        <Typography>Oops..you haven't selected a place yet</Typography>
      )}
      {/* Map search history into cards */}
      {searchHistory.toReversed().map((result, index, array) => {
        const currIndex = array.length - index - 1; // Manually reverse the indexes
        return (
          <SearchHistoryCard
            key={`location-history-${currIndex}`}
            result={result}
            index={currIndex}
          />
        );
      })}
    </div>
  );
};

export default SearchHistory;
