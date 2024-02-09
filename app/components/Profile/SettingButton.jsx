import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/Profile/SettingsButton";

import { Ionicons } from "@expo/vector-icons";

export default function SettingButton({ iconName, settingName }) {
  return (
    <TouchableOpacity style={styles.settingButton}>
      <View style={styles.settingNameContainer}>
        <Ionicons name={iconName} size={24} color="black" />
        <Text style={styles.settingName}>{settingName}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </TouchableOpacity>
  );
}
