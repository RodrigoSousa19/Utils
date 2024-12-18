import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Utils from "../../../utils/Utils";
import theme from "../../../styles/theme";
import Separator from "../../Separator";
import CustomButton from "../../CustomButton";
import CustomIconButton from "../../CustomIconButton";

const ExtratoBancarioBody = ({ transactionCount, onButtonVerExtratoPress, onButtonUploadPress }) => {
  
  const truncateDescricao = (description) => {
    if (description.length > 20) {
      return description.substring(0, 20) + "...";
    }
    return description;
  };

  return (
    <View style={styles.container}>
        <View style={styles.transactionsCountContainer}>
            {
              <Text style={styles.transactionsCount}>{transactionCount} Transações</Text>
            }
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton style={styles.buttonVerExtrato} title={'Ver Extrato'} onPress={onButtonVerExtratoPress}/>
          <CustomIconButton style={styles.buttonUpload} iconName={'upload'} onPress={onButtonUploadPress}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 5,
    marginBottom: 5,
  },
  transactionsCount: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center"
  },
  buttonVerExtrato: {
    width: 140,
    height: 50,
  },
  buttonUpload: {
    width: 50,
    height: 50,
  },
});

export default ExtratoBancarioBody;
