import { Image, Pressable } from "react-native";
import { Colors } from "../../constants";
import styles from "../../styles/Welcome/SocialAuthButton";

export default function SocialAuthButton({ onPress, image }) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      android_ripple={{ color: Colors.PRIMARY, radius: 4 }}
    >
      <Image source={image} style={styles.logoImage} />
    </Pressable>
  );
}
