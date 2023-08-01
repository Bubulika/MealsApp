import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function IconButton({ onPressFnc, icon }) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.opacity}
      onPress={onPressFnc}
    >
      <Ionicons name={icon} size={24} color="black"></Ionicons>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  opacity: { opacity: 0.3 },
});
