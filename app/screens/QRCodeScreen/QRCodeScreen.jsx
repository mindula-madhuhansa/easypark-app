import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

import styles from "../../styles/QR/QRCodeScreen";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/Firebase";
import { getCurrentTimeFormatted } from "../../utils/getTime";
import { ToastAndroid } from "react-native";

export default function QRCodeScreen({ navigation }) {
  const { user } = useUser();
  const isFocused = useIsFocused();
  const [scannedData, setScannedData] = useState("No result");
  const [permission, setPermission] = useState({
    isGranted: false,
    isChecked: false,
  });
  useEffect(() => {
    Camera.getCameraPermissionsAsync().then(({ status }) => {
      setPermission({
        isGranted: status === "granted",
        isChecked: true,
      });
    });
  }, []);
  useEffect(() => {
    if (permission.isChecked && !permission.isGranted) {
      Camera.requestCameraPermissionsAsync().then(({ status }) => {
        setPermission({
          isGranted: status === "granted",
          isChecked: true,
        });
      });
    }
  }, [permission]);

  useEffect(() => {
    if (isFocused && permission.isGranted) {
      // Only start the camera if the screen is focused and permission is granted
      return () => {
        // Clean up function to stop the camera when the component unmounts
        // (This will run when the screen loses focus or the component unmounts)
        // Stop camera or any other cleanup actions
      };
    }
  }, [isFocused, permission.isGranted]);

  useEffect(() => {
    if (scannedData !== "No result") {
      handleScannedData();
    }
  }, [scannedData]);

  function getParkingId(scannedData) {
    const parts = scannedData.split("~");
    const parkingSpaceId = parts[0];
    return parkingSpaceId;
  }

  // bparking id
  function getTrueFalse(scannedData) {
    const parts = scannedData.split("~");
    const trueFalse = parts[1];
    return trueFalse;
  }

  // Function to handle scanned data
  async function handleScannedData() {
    try {
      const parkingSpaceId = getParkingId(scannedData);
      const trueFalse = getTrueFalse(scannedData);
      // Querying the user collection for matching userId

      if (trueFalse === "true") {
        const userCollectionRef = collection(db, "parking-spaces");
        const querySnapshot = await getDocs(
          query(
            userCollectionRef,
            where("parkingSpaceId", "==", parkingSpaceId)
          )
        );

        if (querySnapshot.empty) {
          ToastAndroid.show("Wrong QR", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("QR scanned successfully", ToastAndroid.SHORT);

          // Setting the current time
          const currentTime = getCurrentTimeFormatted();

          // Setting check-in document
          const parkingTimeLogRef = collection(
            db,
            "parking-time-log",
            parkingSpaceId,
            "parkedUsers"
          );

          try {
            await setDoc(doc(parkingTimeLogRef, user.id), {
              checkInTime: currentTime,
              checkOutTime: "",
              userEmail: user.primaryEmailAddress.emailAddress,
              userName: user.fullName,
            });
            setScannedData("");
            await updateDoc(doc(collection(db, "qr-scan"), "qr"), {
              isScannedIn: "true",
            });
          } catch (error) {
            console.error("Error writing document: ", error);
          }
        }
      } else if (trueFalse === "false") {
        const parkingTimeLogRef = collection(
          db,
          "parking-time-log",
          parkingSpaceId,
          "parkedUsers"
        );
        try {
          const userDocRef = doc(parkingTimeLogRef, user.id);
          const userDocSnapshot = await getDoc(userDocRef);
          if (
            !userDocSnapshot.exists() ||
            !userDocSnapshot.data().checkInTime
          ) {
            ToastAndroid.show("Wrong QR", ToastAndroid.TOP);
          } else {
            const currentTime = getCurrentTimeFormatted();
            await updateDoc(doc(parkingTimeLogRef, user.id), {
              checkOutTime: currentTime,
            });
            ToastAndroid.show("QR scanned successfully", ToastAndroid.SHORT);
            setScannedData("");
            navigation.navigate("payment", {
              parkingId: parkingSpaceId,
              userId: user.id,
            });
          }
        } catch (error) {
          console.error("Error updating field: ", error);
        }
      }
    } catch (error) {
      console.error("Error handling scanned data: ", error);
    }
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      {isFocused && permission.isGranted && (
        <Camera
          type={CameraType.back}
          ratio={"16:9"}
          style={styles.camera}
          onBarCodeScanned={(scannerResult) => {
            setScannedData(scannerResult.data);
          }}
        />
      )}
    </SafeAreaView>
  );
}
