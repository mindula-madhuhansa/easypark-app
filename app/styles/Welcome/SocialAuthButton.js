import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.WHITE_TRANSPARENT,
    padding: 8,
    borderRadius: 99,
  },

  logoImage: { width: 36, height: 36, objectFit: "cover" },
});

export default styles;
