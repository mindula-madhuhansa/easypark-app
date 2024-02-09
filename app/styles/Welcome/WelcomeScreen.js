import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },

  bgImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
  },

  headerContainer: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.24,
    alignItems: "center",
  },

  headerTitle: {
    fontFamily: "poppins-bold",
    fontSize: 32,
    color: Colors.WHITE,
    textAlign: "center",
  },

  headerSubtitle: {
    fontFamily: "poppins-italic",
    fontSize: 14,
    color: Colors.WHITE,
    marginHorizontal: 54,
    textAlign: "center",
    marginBottom: 48,
  },
});

export default styles;
