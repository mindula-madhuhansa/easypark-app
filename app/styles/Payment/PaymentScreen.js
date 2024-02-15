import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors.WHITE,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginHorizontal: 20,
  },

  headerText: {
    fontFamily: "poppins-semibold",
    fontSize: 24,
    textAlign: "center",
    marginLeft: 32,
  },

  subContainer: {
    flex: 1,
    backgroundColor: Colors.SECONDARY,
    margin: 16,
    borderRadius: 16,
    textAlign: "center",
  },

  spanText: { color: Colors.TERTIARY },

  paymentHeader: {
    textAlign: "center",
    marginTop: 32,
    fontFamily: "poppins",
    color: Colors.DARK_GRAY,
  },

  totalPrice: {
    textAlign: "center",
    fontFamily: "poppins-medium",
    fontSize: 28,
  },
  detailsContainer: {
    marginTop: 32,
  },

  detailsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 8,
  },

  detailsLabel: {
    color: Colors.DARK_GRAY,
    fontFamily: "poppins",
  },

  detailsValue: {
    color: Colors.DARK_GRAY,
    fontFamily: "poppins-medium",
  },

  buttonContainer: { alignItems: "center", marginTop: 32 },

  paynowButton: {
    paddingHorizontal: 32,
    paddingVertical: 4,
    backgroundColor: Colors.TERTIARY,
    borderRadius: 16,
  },

  paynowButtonText: {
    color: Colors.WHITE,
    fontSize: 24,
    fontFamily: "poppins-medium",
  },
});

export default styles;
