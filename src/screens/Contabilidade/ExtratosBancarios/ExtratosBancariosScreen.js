import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import ExtratoBancarioApi from "../../../api/ExtratoBancario/ExtratoBancarioApi";
import ExtratoBancarioHeader from "../../../components/CustomCards/ExtratoBancario/ExtratoBancarioHeader";
import ExtratoBancarioBody from "../../../components/CustomCards/ExtratoBancario/ExtratoBancarioBody";
import Card from "../../../components/Card";
import { useFocusEffect } from "@react-navigation/native";
import theme from "../../../styles/theme";

export default function ExtratosBancariosScreen({ navigation }) {
  const [extratos, setExtratos] = useState([]);

  const loadExtratosBancarios = async () => {
    try {
      const result = await ExtratoBancarioApi.getExtratosAgrupados();

      let extratos = result.data;

      setExtratos(extratos);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadExtratosBancarios();
    }, [])
  );

  const handleCardPress = (banco, data) => {
    console.log("Card Pressed:", banco, data);
    const extratoSelecionado = extratos[banco][data];
    navigation.navigate("DetalhesExtratoBancarioScreen", {
      extrato: extratoSelecionado,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {extratos.map((banco, bancoIndex) => (
          <View key={bancoIndex}>
            {
              <Card
                key={bancoIndex}
                header={ExtratoBancarioHeader}
                body={ExtratoBancarioBody}
                headerProps={{
                  nomeBanco: banco.banco
                }}
                bodyProps={{
                  transactionCount: banco.movimentacoes[0].transacoes.length,
                }}
                onPress={() => handleCardPress(banco.banco, bancoIndex)}
              />
            }
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
