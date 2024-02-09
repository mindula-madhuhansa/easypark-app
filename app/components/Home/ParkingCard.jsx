import {
  View,
  Text,
  Image,
  Pressable,
  ToastAndroid,
  Platform,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

import { Images } from "../../constants";
import { GlobalAPI } from "../../utils";
import { db } from "../../config/Firebase";
import styles from "../../styles/Home/ParkingCard";

import { Ionicons } from "@expo/vector-icons";

export default function ParkingCard({ place, isFavorite, markedFavorite }) {
  const { user } = useUser();

  // const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

  const onSetFavorite = async (place) => {
    const userId = user?.id;
    const parkingPlaceId = place.id;
    const favoriteId = userId + "_" + parkingPlaceId;

    await setDoc(doc(db, "favorite-parking", favoriteId), {
      place: place,
      userId: userId,
    });
    markedFavorite();
    ToastAndroid.show("Parking added to your favorite list", ToastAndroid.TOP);
  };

  const onRemoveFavorite = async (favoriteId) => {
    await deleteDoc(doc(db, "favorite-parking", favoriteId));
    markedFavorite();
    ToastAndroid.show(
      "Parking removed from your favorite list",
      ToastAndroid.TOP
    );
  };

  const OnNavigationClick = () => {
    // const url = Platform.select({
    //   ios:
    //     "maps:" +
    //     place?.location?.latitude +
    //     "," +
    //     place?.location?.longitude +
    //     "?q=" +
    //     place?.formattedAddress,
    //   android:
    //     "geo:" +
    //     place?.location?.latitude +
    //     "," +
    //     place?.location?.longitude +
    //     "?q=" +
    //     place?.formattedAddress,
    // });
    // Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["transparent", "#ffffff", "#ffffff"]}>
        {!isFavorite ? (
          <Pressable
            style={styles.heartIcon}
            onPress={() => onSetFavorite(place)}
          >
            <Ionicons name="heart-outline" size={30} color="white" />
          </Pressable>
        ) : (
          <Pressable
            style={styles.heartIcon}
            onPress={() => onRemoveFavorite(user?.id + "_" + place.id)}
          >
            <Ionicons name="heart-sharp" size={30} color="red" />
          </Pressable>
        )}

        <View style={styles.viewCountContainer}>
          <Ionicons name="eye" size={24} color="white" />
          <Text style={styles.countText}>05</Text>
        </View>

        <Image
          source={
            place?.photos
              ? {
                  uri:
                    PLACE_PHOTO_BASE_URL +
                    place?.photos[0]?.name +
                    "/media?key=" +
                    GlobalAPI?.GOOGLE_MAPS_API_KEY +
                    "&maxHeightPx=600&maxWidthPx=1000",
                }
              : Images.CarPark
          }
          style={styles.carParkImage}
        />
        <View style={styles.carParkDetails}>
          <View style={{ padding: 15 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.parkingName}
            >
              {/* {place?.displayName.text} */}
              {place.parkingName}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.parkingAddress}
            >
              {place?.shortFormattedAddress}
              {place.address}
            </Text>

            <View style={styles.subContainer}>
              <View style={styles.slotsContainer}>
                <View style={styles.slotTextContainer}>
                  <Text style={styles.parkingSlots}>Free Slots: </Text>
                  <Text style={styles.parkingSlotsCount}>10</Text>
                </View>
                <View style={styles.slotTextContainer}>
                  <Text style={styles.parkingSlots}>Total Slots: </Text>
                  <Text style={styles.parkingSlotsCount}>{place.slots}</Text>
                </View>
              </View>

              <Pressable
                style={styles.navigatingButton}
                onPress={OnNavigationClick}
              >
                <Ionicons name="navigate-outline" size={30} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
