import { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header, Map, ParkingListView } from "../../components/Home";
import { SelectMarkerContext, UserLocationContext } from "../../context";

// import { GlobalAPI } from "../../utils";
import styles from "../../styles/Home/HomeScreen";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);

  useEffect(() => {
    location && GetNearbyPlace();
  }, [location]);

  const GetNearbyPlace = async () => {
    // const data = {
    //   includedTypes: ["parking"],
    //   locationRestriction: {
    //     circle: {
    //       center: {
    //         latitude: location?.latitude,
    //         longitude: location?.longitude,
    //       },
    //       radius: 2000.0,
    //     },
    //   },
    // };
    // GlobalAPI.NewNearbyPlace(data)
    //   .then((res) => {
    //     setPlaceList(res.data?.places);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching nearby parkings:", err);
    //   });

    const parkingsCollection = collection(db, "parking-spaces");

    try {
      const data = await getDocs(parkingsCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlaceList(filteredData);
    } catch (err) {
      console.error("Error fetching nearby parkings:", err);
    }
  };

  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <View style={styles.headerContainer}>
            <Header
              searchedLocation={(location) =>
                setLocation({
                  latitude: location.lat,
                  longitude: location.lng,
                })
              }
            />
          </View>
          {placeList && <Map placeList={placeList} />}
          <View style={styles.placesListContainer}>
            {placeList && <ParkingListView placeList={placeList} />}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SelectMarkerContext.Provider>
  );
}
