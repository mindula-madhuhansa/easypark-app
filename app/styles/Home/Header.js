import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    maxWidth: "80%",
    fontFamily: "poppins",
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 99,
  },
});

export default styles;
