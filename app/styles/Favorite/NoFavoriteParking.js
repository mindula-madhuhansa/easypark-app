import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  noFavoriteContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 32,
  },

  noFavoriteImage: {
    width: Dimensions.get("screen").width * 0.4,
    height: Dimensions.get("screen").height * 0.4,
  },

  noFavoriteText: {
    fontFamily: "poppins-medium",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
