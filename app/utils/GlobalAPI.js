import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
import { GOOGLE_MAPS_API_KEY } from "@env";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
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

export default { NewNearbyPlace, GOOGLE_MAPS_API_KEY };
