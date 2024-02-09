import { Dimensions, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import QRCode from "react-native-qrcode-svg";

import styles from "../../styles/QR/QRCodeScreen";

export default function QRCodeScreen() {
  const { user } = useUser();
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.header}>
        QR <Text style={styles.spanText}>Code</Text>
      </Text>

      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
          <View style={{ paddingLeft: 20 }}>
            <Text style={styles.fullNameText}>{user?.fullName}</Text>
            <Text style={styles.emailText}>
              {user?.primaryEmailAddress.emailAddress}
            </Text>
          </View>
        </View>

        <QRCode value={user.id} size={Dimensions.get("window").width * 0.7} />

        <Text style={styles.message}>
          Your QR code is private. If you share it with someone, they can scan
          it with their WhatsApp camera to add you as a contact.
        </Text>
      </View>
    </SafeAreaView>
  );
}
