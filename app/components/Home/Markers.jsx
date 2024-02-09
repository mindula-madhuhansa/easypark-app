import { Image } from "react-native";
import { useContext } from "react";
import { Marker } from "react-native-maps";

import { SelectMarkerContext } from "../../context";
import { Images } from "../../constants";

export default function Markers({ place, index }) {
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
  const markerImage =
    selectedMarker == index
      ? Images.ParkingMarkerSelected
      : Images.ParkingMarker;

  return (
    <Marker
      coordinate={{
        // latitude: place.location?.latitude,
        // longitude: place.location?.longitude,

        latitude: Number(place.latitude),
        longitude: Number(place.longitude),
      }}
      onPress={() => setSelectedMarker(index)}
    >
      <Image source={markerImage} style={{ width: 48, height: 48 }} />
    </Marker>
  );
}
