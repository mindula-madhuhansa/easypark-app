import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 10,
  },

  heartIcon: {
    position: "absolute",
    right: 0,
    padding: 8,
    borderRadius: 10,
  },

  viewCountContainer: {
    position: "absolute",
    left: 0,
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 8,
    borderRadius: 10,
  },

  countText: { fontFamily: "poppins-medium", color: Colors.WHITE },

  carParkImage: {
    width: "100%",
    height: Dimensions.get("window").height * 0.18,
    borderRadius: 10,
    zIndex: -1,
    objectFit: "cover",
  },

  carParkDetails: {
    flex: 1,
    flexDirection: "row",
  },

  parkingName: {
    fontSize: 17,
    fontFamily: "poppins-semibold",
  },

  parkingAddress: {
    color: Colors.GRAY,
    fontSize: 14,
    fontFamily: "poppins",
  },

  subContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  slotsContainer: {
    marginTop: 8,
  },

  slotTextContainer: {
    flexDirection: "row",
    fontSize: 14,
  },

  parkingSlots: {
    fontFamily: "poppins",
  },

  parkingSlotsCount: {
    fontFamily: "poppins-bold",
  },

  navigatingButton: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 6,
  },
});

export default styles;
