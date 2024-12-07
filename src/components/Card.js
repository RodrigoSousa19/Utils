import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const Card = ({ 
  header: HeaderComponent, 
  body: BodyComponent, 
  headerProps, 
  bodyProps, 
  cardStyle, 
  headerStyle, 
  bodyStyle,
  onPress
}) => {
  return (
    <TouchableOpacity  style={[styles.card, cardStyle]} onPress={onPress}>
      <View style={[styles.header, headerStyle]}>
        {HeaderComponent && <HeaderComponent {...headerProps} />}
      </View>
      <View style={[styles.body, bodyStyle]}>
        {BodyComponent && <BodyComponent {...bodyProps} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 10,
    overflow: "hidden",
  },
  header: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  body: {
    padding: 10,
  },
});

export default Card;
