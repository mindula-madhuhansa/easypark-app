import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SECONDARY,
    paddingVertical: 20,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  userContainer: { flexDirection: "row", alignItems: "center", marginTop: 12 },

  userImage: {
    height: 88,
    width: 88,
    borderRadius: 99,
    marginLeft: 20,
  },

  fullNameText: { fontFamily: "poppins-bold", fontSize: 18 },

  emailText: {
    fontFamily: "poppins",
    fontSize: 14,
    color: Colors.DARK_GRAY,
  },

  settingsContainer: {
    paddingHorizontal: 12,
    marginTop: 32,
    justifyContent: "center",
  },

  signoutButton: {
    alignItems: "center",
    backgroundColor: Colors.TERTIARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: Dimensions.get("window").width * 0.4,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 20,
  },

  signoutButtonText: {
    color: Colors.WHITE,
    fontFamily: "poppins-semibold",
    fontSize: 18,
  },
});

export default styles;
