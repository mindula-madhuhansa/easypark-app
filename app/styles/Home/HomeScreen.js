import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },

  headerContainer: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    paddingHorizontal: 8,
    paddingTop: 12,
  },

  placesListContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: "100%",
  },
});

export default styles;
