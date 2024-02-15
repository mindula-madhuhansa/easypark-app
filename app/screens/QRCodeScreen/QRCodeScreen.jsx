import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";

import styles from "../../styles/QR/QRCodeScreen";
import {
  collection,
  doc,
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
          // Update the field in the document

          const currentTime = getCurrentTimeFormatted();
          await updateDoc(doc(parkingTimeLogRef, user.id), {
            checkOutTime: currentTime,
          });
          ToastAndroid.show("QR scanned successfully", ToastAndroid.SHORT);
          setScannedData("");
          navigation.navigate("payment");
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
      {permission.isGranted && (
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
