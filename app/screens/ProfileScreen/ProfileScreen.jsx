import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";

import SettingButton from "../../components/Profile/SettingButton";
import NavBar from "../../components/Header/NavBar";

export default function ProfileScreen({ navigation }) {
  const { user } = useUser();
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <NavBar />

        <View style={styles.userContainer}>
          <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
          <View style={{ paddingLeft: 20 }}>
            <Text style={styles.fullNameText}>{user?.fullName}</Text>
            <Text style={styles.emailText}>
              {user?.primaryEmailAddress.emailAddress}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <SettingButton iconName={"list"} settingName={"History"} />
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 16,
          }}
        />
        <SettingButton iconName={"heart-outline"} settingName={"Favorite"} />
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 16,
          }}
        />
        <SettingButton
          iconName={"card-outline"}
          settingName={"Payment Method"}
        />
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 16,
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.signoutButton}
        onPress={() => {
          signOut();
        }}
      >
        <Text style={styles.signoutButtonText}>SIGN OUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
