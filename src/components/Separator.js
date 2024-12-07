import React from "react";
import { View, StyleSheet } from "react-native";

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: 100,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
});

export default Separator;
