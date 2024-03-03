import { useContext, useEffect, useRef, useState } from "react";
import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

import ParkingCard from "./ParkingCard";

import { SelectMarkerContext } from "../../context";
import { db } from "../../config/Firebase";
import { Colors } from "../../constants";
import styles from "../../styles/Home/ParkingListView";

export default function PlaceListView({ placeList }) {
  const flatListRef = useRef(null);
  const { user } = useUser();

  const { selectedMarker } = useContext(SelectMarkerContext);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker);
  }, [selectedMarker]);

  useEffect(() => {
    user && getFavoriteParkings();
  }, [user]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });

  const getFavoriteParkings = async () => {
    setFavoriteList([]);
    const q = query(
      collection(db, "favorite-parking"),
      where("userId", "==", user?.id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavoriteList((favoriteList) => [...favoriteList, doc.data()]);
    });
  };

  const isFavorite = (place) => {
    const result = favoriteList.find((item) => item.place.id == place.id);
    return result ? true : false;
  };

  return (
    <View>
      {placeList.length === 0 ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
        </View>
      ) : (
        <FlatList
          data={placeList}
          horizontal={true}
          pagingEnabled
          ref={flatListRef}
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View key={index}>
              <ParkingCard
                place={item}
                isFavorite={isFavorite(item)}
                markedFavorite={() => getFavoriteParkings()}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}
