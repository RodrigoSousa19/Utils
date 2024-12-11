import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../styles/theme";

export default function CustomButton({
  title,
  onPress,
  iconName = null,
  isLoading = false,
  disabled = false,
  style = {},
  textStyle = {},
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: disabled ? theme.colors.disabledField : theme.colors.primary },
        style,
      ]}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.textPrimary} />
      ) : (
        <View style={styles.content}>
          {iconName && (
            <MaterialIcons
              name={iconName}
              size={24}
              color={theme.colors.white}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    height: 50,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  icon: {
    position: "static",
    left: 12,
  },
  text: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});
