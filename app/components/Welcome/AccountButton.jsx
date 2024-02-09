import { Text, Pressable } from "react-native";

import styles from "../../styles/Welcome/AccountButton";
import { Colors } from "../../constants";
import { useNavigation } from "@react-navigation/native";

export default function AccountButton({ text, routeName, navigation }) {
  const onPress = () => {
    navigation.navigate(routeName);
  };

  return (
    <Pressable
      style={routeName === "Login" ? styles.buttonLogin : styles.buttonSignUp}
      android_ripple={{ color: Colors.PRIMARY, radius: 4 }}
      onPress={onPress}
    >
      <Text
        style={
          routeName === "Login"
            ? styles.buttonTextLogin
            : styles.buttonTextSignUp
        }
      >
        {text}
      </Text>
    </Pressable>
  );
}
