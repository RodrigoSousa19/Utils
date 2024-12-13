import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExtratoBancarioHeader = ({ nomeBanco }) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{nomeBanco}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ExtratoBancarioHeader;
