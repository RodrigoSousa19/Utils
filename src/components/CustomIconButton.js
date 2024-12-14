import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import theme from "../styles/theme";

const CustomIconButton = ({ iconName, onPress, size = 24, color = "white" }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialIcons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
  },
});

export default CustomIconButton;