import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({
  buttonLogin: {
    backgroundColor: Colors.TERTIARY,
    width: "60%",
    padding: 12,
    margin: 12,
    borderRadius: 20,
  },

  buttonSignUp: {
    borderColor: Colors.TERTIARY,
    backgroundColor: Colors.WHITE,
    width: "60%",
    padding: 12,
    margin: 12,
    borderRadius: 20,
  },

  buttonTextLogin: {
    textAlign: "center",
    fontFamily: "poppins-semibold",
    color: Colors.WHITE,
  },

  buttonTextSignUp: {
    textAlign: "center",
    fontFamily: "poppins-semibold",
    color: Colors.TERTIARY,
  },
});

export default styles;
