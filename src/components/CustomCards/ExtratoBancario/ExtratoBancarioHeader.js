import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExtratoBancarioHeader = ({ nomeBanco, date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nomeBanco}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
});

export default ExtratoBancarioHeader;
