import { View } from "react-native";
import styles from "../../styles/Header/NavBar";

export default function NavBar() {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
