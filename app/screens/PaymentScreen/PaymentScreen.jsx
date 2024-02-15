import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../../styles/Payment/PaymentScreen";
import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { db } from "../../config/Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { getCheckedTime } from "../../utils/getCheckedTime";
import { getTimeDiff } from "../../utils/getTimeDIff";

export default function PaymentScreen({ navigation, route }) {
  const [details, setDetails] = useState([]);
  const [rate, setRate] = useState();
  const { parkingId, userId } = route.params;

  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const month = currentDate.toLocaleString("en-US", { month: "short" });
  const year = currentDate.getFullYear();
  const today = `${dayOfMonth}, ${month} ${year}`;

  const checkInTime = getCheckedTime(details[0]?.checkInTime);
  const checkOutTime = getCheckedTime(details[0]?.checkOutTime);

  const parkedHours = getTimeDiff(
    details[0]?.checkInTime,
    details[0]?.checkOutTime
  );

  const totalPrice = (parkedHours * rate).toFixed(2);

  useEffect(() => {
    getPaymentDetails();
  }, []);

  async function getPaymentDetails() {
    const parkingTimeLogRef = collection(
      db,
      "parking-time-log",
      parkingId,
      "parkedUsers"
    );

    const parkingSpaceRef = doc(db, "parking-spaces", parkingId);

    try {
      const data = await getDocs(parkingTimeLogRef, userId);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDetails(filteredData);
    } catch (err) {
      console.error("Error fetching nearby parkings:", err);
    }

    try {
      const docSnap = await getDoc(parkingSpaceRef);
      if (docSnap.exists()) {
        const rate = docSnap.data().parkingRate;
        setRate(rate);
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  }

  async function handlePay() {
    await updateDoc(doc(collection(db, "qr-scan"), "qr"), {
      isScannedOut: "true",
    });

    navigation.navigate("home");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Payment <Text style={styles.spanText}>Details</Text>
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.paymentHeader}>Payment Total</Text>
        <Text style={styles.totalPrice}>LKR {totalPrice}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Date</Text>
            <Text style={styles.detailsValue}>{today}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Check in Time</Text>
            <Text style={styles.detailsValue}>{checkInTime}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Check out Time</Text>
            <Text style={styles.detailsValue}>{checkOutTime}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Hourly Rate</Text>
            <Text style={styles.detailsValue}>{rate}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginTop: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-medium",
              }}
            >
              Total Payment
            </Text>
            <Text
              style={{
                fontFamily: "poppins-medium",
              }}
            >
              LKR {totalPrice}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.paynowButton} onPress={handlePay}>
            <Text style={styles.paynowButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
