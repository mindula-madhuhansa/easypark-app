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
import { deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

import { Images } from "../../constants";
import { db } from "../../config/Firebase";
import styles from "../../styles/Home/ParkingCard";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

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

    const url = Platform.select({
      ios:
        "maps:" +
        place.latitude +
        "," +
        place.longitude +
        "?q=" +
        place.address,
      android:
        "geo:" + place.latitude + "," + place.longitude + "?q=" + place.address,
    });
    Linking.openURL(url);
  };

  const [usedSlots, setUsedSlots] = useState("");

  useEffect(() => {
    const parkingId = place.id;
    const parkingSpaceRef = doc(db, "parking-spaces", parkingId);

    const unsubscribe = onSnapshot(parkingSpaceRef, (docSnap) => {
      if (docSnap.exists()) {
        const usedSlots = docSnap.data().freeSlots;
        setUsedSlots(usedSlots);
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, [place.id]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["transparent", "#ffffff", "#ffffff"]}>
        {!isFavorite ? (
          <Pressable
            style={styles.heartIcon}
            onPress={() => onSetFavorite(place)}
          >
            <Ionicons name="heart-outline" size={30} color="black" />
          </Pressable>
        ) : (
          <Pressable
            style={styles.heartIcon}
            onPress={() => onRemoveFavorite(user?.id + "_" + place.id)}
          >
            <Ionicons name="heart-sharp" size={30} color="red" />
          </Pressable>
        )}

        {/* <View style={styles.viewCountContainer}>
          <Ionicons name="eye" size={24} color="white" />
          <Text style={styles.countText}>05</Text>
        </View> */}

        <Image
          // source={
          //   place?.photos
          //     ? {
          //         uri:
          //           PLACE_PHOTO_BASE_URL +
          //           place?.photos[0]?.name +
          //           "/media?key=" +
          //           GlobalAPI?.GOOGLE_MAPS_API_KEY +
          //           "&maxHeightPx=600&maxWidthPx=1000",
          //       }
          //     : Images.CarPark
          // }

          source={
            place.imageUrl
              ? {
                  uri: place.imageUrl,
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
                  <Text style={styles.parkingSlotsCount}>
                    {place.slots - usedSlots}
                  </Text>
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
