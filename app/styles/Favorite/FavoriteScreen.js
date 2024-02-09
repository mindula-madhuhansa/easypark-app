import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({
  activityIndicator: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY,
  },

  loadingText: { fontFamily: "poppins", marginTop: 8, fontSize: 16 },

  spanText: { color: Colors.TERTIARY },

  favoriteContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    paddingTop: 80,
  },

  favoriteListHeader: {
    padding: 12,
    fontFamily: "poppins-semibold",
    fontSize: 24,
    position: "absolute",
    top: 0,
  },
});

export default styles;
