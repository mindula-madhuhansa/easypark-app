import { View, Text } from "react-native";

import styles from "../../styles/Welcome/HorizontalLine";

export default function HorizontalLine() {
  return (
    <View style={styles.container}>
      <View style={styles.leftLine} />
      <View>
        <Text style={styles.middleText}>Or login using</Text>
      </View>
      <View style={styles.rightLine} />
    </View>
  );
}
