import { useContext } from "react";
import { Image, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import Markers from "./Markers";
import { UserLocationContext } from "../../context";

import { MapStyle } from "../../utils";
import { Images } from "../../constants";
import styles from "../../styles/Home/Map";

export default function Map({ placeList }) {
  const { location, setLocation } = useContext(UserLocationContext);

  return (
    location?.latitude && (
      <View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={false}
          customMapStyle={MapStyle}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.036,
            longitudeDelta: 0.036,
          }}
        >
          {location ? (
            <Marker
              title="You are here."
              identifier="origin"
              coordinate={{
                latitude: location?.latitude,
                longitude: location?.longitude,
              }}
            >
              <Image source={Images.CarMarker} style={styles.carMarker} />
            </Marker>
          ) : null}

          {placeList &&
            placeList.map((item, index) => (
              <Markers key={index} index={index} place={item} />
            ))}
        </MapView>
      </View>
    )
  );
}
