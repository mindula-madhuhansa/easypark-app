import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  SocialAuth,
  AccountButton,
  HorizontalLine,
} from "../../components/Welcome";

import { Images } from "../../constants";
import styles from "../../styles/Welcome/WelcomeScreen";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.bgImage}
        source={Images.BGImage}
        resizeMode="cover"
        blurRadius={5}
      />

      <View style={styles.overlay}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Welcome</Text>
          <Text style={styles.headerSubtitle}>
            Welcome to EasyPark, where you can find your parking easily.
          </Text>

          <AccountButton text="Login" routeName={"Login"} />
          <AccountButton text="Sign Up" routeName={"SignUp"} />
        </View>

        <HorizontalLine />
        <SocialAuth />
      </View>
    </SafeAreaView>
  );
}
