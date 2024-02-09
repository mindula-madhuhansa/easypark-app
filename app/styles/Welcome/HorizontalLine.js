import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 32,
    position: "absolute",
    bottom: 120,
  },

  leftLine: { flex: 1, height: 1, backgroundColor: Colors.WHITE },

  middleText: {
    width: 120,
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "poppins-medium",
  },

  rightLine: { flex: 1, height: 1, backgroundColor: Colors.WHITE },
});

export default styles;
