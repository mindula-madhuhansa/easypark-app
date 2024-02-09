import { View, Text, Image } from "react-native";

import styles from "../../styles/Favorite/NoFavoriteParking";
import { Images } from "../../constants";

export default function NoFavoriteParking() {
  return (
    <View style={styles.noFavoriteContainer}>
      <Image
        source={Images.NoFavoriteFound}
        resizeMode="cover"
        style={styles.noFavoriteImage}
      />
      <Text style={styles.noFavoriteText}>
        Currently there is no any Favorite parkings.
      </Text>
    </View>
  );
}
