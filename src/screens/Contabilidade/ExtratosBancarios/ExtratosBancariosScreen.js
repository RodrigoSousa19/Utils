import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import ExtratoBancarioApi from "../../../api/ExtratoBancario/ExtratoBancarioApi";
import ExtratoBancarioHeader from "../../../components/CustomCards/ExtratoBancario/ExtratoBancarioHeader";
import ExtratoBancarioBody from "../../../components/CustomCards/ExtratoBancario/ExtratoBancarioBody";
import Card from "../../../components/Card";

export default function ExtratosBancariosScreen({navigation}) {

  const [extratos, setExtratos] = useState({});

  const loadExtratosBancarios = async () => {
    try {
      const result = await ExtratoBancarioApi.getAllExtratoBancario();

      let extratos = result.data;

      const agrupados = {};

      extratos.forEach((extrato) => {
        const banco = extrato.nomeBanco;
        const data = new Date(extrato.dataTransacao).toLocaleDateString();
        const tipoTransacao = extrato.tipoTransacao;

        if (!agrupados[banco]) {
          agrupados[banco] = {};
        }

        if (!agrupados[banco][data]) {
          agrupados[banco][data] = {};
        }

        if (!agrupados[banco][data][tipoTransacao]) {
          agrupados[banco][data][tipoTransacao] = [];
        }

        agrupados[banco][data][tipoTransacao].push(extrato);
      });

      setExtratos(agrupados); 
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    loadExtratosBancarios();
  }, []);

  const handleCardPress = (banco, data) => {
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.keys(extratos).map((banco, bancoIndex) => (
          <View key={bancoIndex}>
            {Object.keys(extratos[banco]).map((data, dataIndex) => (
              <Card
                key={dataIndex}
                header={ExtratoBancarioHeader}
                body={ExtratoBancarioBody}
                headerProps={{
                  nomeBanco: banco,
                  date: data,
                }}
                bodyProps={{
                  transaction: extratos[banco][data],
                }}
                onPress={handleCardPress}
              />
            ))}
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
