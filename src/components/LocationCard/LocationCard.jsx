import { Card, CardContent, Typography } from "@mui/material";

const LocationCard = ({ place }) => {
  return (
    <Card sx={{ width: "100%", marginTop: 2, outline: "1px solid grey" }}>
      <CardContent>
        <Typography>Name: {place.name}</Typography>
        <Typography>Address: {place.address}</Typography>
        <Typography>
          Location: {place.lat}, {place.lng}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
