import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

import NoFavoriteParking from "../../components/Favorite/NoFavoriteParking";
import { ParkingCard } from "../../components/Home";

import { db } from "../../config/Firebase";
import { Colors } from "../../constants";
import styles from "../../styles/Favorite/FavoriteScreen";

export default function FavoriteScreen() {
  const { user } = useUser();
  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getFavoriteParkings();
  }, [user]);

  const getFavoriteParkings = async () => {
    setLoading(true);
    setFavoriteList([]);
    const q = query(
      collection(db, "favorite-parking"),
      where("userId", "==", user.id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavoriteList((favoriteList) => [...favoriteList, doc.data()]);
      setLoading(false);
    });
  };

  return (
    <View style={styles.favoriteContainer}>
      <Text style={styles.favoriteListHeader}>
        My Favorite <Text style={styles.spanText}>Parkings</Text>
      </Text>
      {!favoriteList ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : null}

      {favoriteList ? (
        <FlatList
          data={favoriteList}
          onRefresh={() => getFavoriteParkings()}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ParkingCard
              key={index}
              place={item.place}
              isFavorite={true}
              markedFavorite={() => getFavoriteParkings()}
            />
          )}
        />
      ) : (
        <NoFavoriteParking />
      )}
    </View>
  );
}
