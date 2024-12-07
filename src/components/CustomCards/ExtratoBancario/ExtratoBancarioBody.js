import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Utils from "../../../utils/Utils";
import theme from "../../../styles/theme";
import Separator from "../../Separator";

const ExtratoBancarioBody = ({ transaction }) => {
  const truncateDescricao = (description) => {
    if (description.length > 20) {
      return description.substring(0, 20) + "...";
    }
    return description;
  };

  return (
    <View>
      {Object.keys(transaction).map((tipo, index) => (
        <View key={index}>
          {transaction[tipo].map((transaction, idx) => (
            <View key={idx} style={styles.transaction}>
              <Text style={styles.description}>
                {truncateDescricao(transaction.descricao)}
              </Text>
              <Text
                style={[
                  styles.amount,
                  {
                    color:
                      transaction.tipoTransacao === "Crédito"
                        ? theme.colors.success
                        : theme.colors.error,
                  },
                ]}
              >{`${transaction.tipoTransacao} ${Utils.transformarEmMoeda(
                transaction.valorTransacao
              )}`}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ExtratoBancarioBody;
