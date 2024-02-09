import { View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GOOGLE_MAPS_API_KEY } from "@env";

import styles from "../../styles/Home/Header";

export default function Header({ searchedLocation }) {
  const { user } = useUser();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <GooglePlacesAutocomplete
          placeholder="Search Car Parking"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details && details.geometry && details.geometry.location) {
              searchedLocation(details.geometry.location);
            }
          }}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
        />
      </View>
      <Pressable onPress={() => navigation.navigate("profile")}>
        <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
      </Pressable>
    </View>
  );
}
