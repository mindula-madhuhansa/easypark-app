import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": "AIzaSyBxdgDfR2cZUeidRpT4--I--e2ZQpeOpMU",
    "X-Goog-FieldMask": [
      "places.displayName",
      "places.formattedAddress",
      "places.shortFormattedAddress",
      "places.parkingOptions",
      "places.location",
      "places.photos",
      "places.id",
    ],
  },
};

const NewNearbyPlace = (data) => axios.post(BASE_URL, data, config);

export default NewNearbyPlace;
