import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { saveFavorite, setSelectedPlace } from "reducers/placeSlice";

const SearchHistoryCard = ({ result, index }) => {
  const dispatch = useDispatch();

  const handleClick = (location) => {
    dispatch(setSelectedPlace(location));
  };

  const handleFavorite = (index, location) => {
    dispatch(saveFavorite(index, location));
  };

  return (
    <Card sx={{ marginTop: 2, outline: "1px solid grey" }}>
      <CardActionArea
        onClick={() => {
          handleClick(result);
        }}
      >
        <CardContent>
          <Typography>Name: {result.name}</Typography>
          <Typography>Address: {result.address}</Typography>
          <Typography>
            Location: {result.lat}, {result.lng}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!!result.favorite}
          onClick={() => {
            handleFavorite(index, result);
          }}
        >
          Save as Favourite
        </Button>
      </CardActions>
    </Card>
  );
};

export default SearchHistoryCard;
