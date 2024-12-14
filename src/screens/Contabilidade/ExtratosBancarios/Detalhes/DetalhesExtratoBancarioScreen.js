import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";

const DetalhesExtratoScreen = ({ route }) => {
  const extrato = route.params.extrato ? route.params.extrato : null;

  if (!extrato) {
    return <Text>Erro: Dados do extrato não disponíveis.</Text>;
  }

  const [tipoSelecionado, setTipoSelecionado] = useState("Todos");
  const [dataSelecionada, setDataSelecionada] = useState("Todas");

  const filtrarTransacoes = () => {
    return extrato.movimentacoes.flatMap((movimentacao) => {
      if (
        tipoSelecionado !== "Todos" &&
        movimentacao.tipo !== tipoSelecionado
      ) {
        return [];
      }
      return movimentacao.transacoes
        .filter((transacao) => {
          if (dataSelecionada === "Todas") return true;
          return (
            moment(transacao.date).format("DD/MM/YYYY") === dataSelecionada
          );
        })
        .map((transacao) => ({
          ...transacao,
          tipo: movimentacao.tipo,
          data: moment(transacao.date).format("DD/MM/YYYY"),
        }));
    });
  };

  const transacoesFiltradas = filtrarTransacoes();

  const transacoesAgrupadas = transacoesFiltradas.reduce((acc, transacao) => {
    const { tipo, data } = transacao;

    if (!acc[tipo]) acc[tipo] = {};

    if (!acc[tipo][data]) acc[tipo][data] = [];

    acc[tipo][data].push(transacao);

    return acc;
  }, {});

  (transacoesAgrupadas);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transações</Text>

      <Text>Tipo de transação: </Text>
      <Picker
        selectedValue={tipoSelecionado}
        onValueChange={(itemValue) => setTipoSelecionado(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todos" value="Todos" />
        {extrato.movimentacoes.map((movimentacao, index) => (
          <Picker.Item
            key={index}
            label={movimentacao.tipo}
            value={movimentacao.tipo}
          />
        ))}
      </Picker>

      <Text>Data da transação: </Text>
      <Picker
        selectedValue={dataSelecionada}
        onValueChange={(itemValue) => setDataSelecionada(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todas" value="Todas" />
        {Array.from(
          new Set(
            transacoesFiltradas.map((transacao) =>
              moment(transacao.date).format("DD/MM/YYYY")
            )
          )
        ).map((data, index) => (
          <Picker.Item key={index} label={data} value={data} />
        ))}
      </Picker>

      <FlatList
        data={Object.keys(transacoesAgrupadas)}
        keyExtractor={(item) => item}
        renderItem={({ item: tipo }) => (
          <View style={styles.accordion}>
            <Text style={styles.accordionHeader}>{tipo}</Text>
            {Object.keys(transacoesAgrupadas[tipo]).map((data, index) => (
              <View key={index} style={styles.subAccordion}>
                <Text style={styles.subAccordionHeader}>{data}</Text>
                {transacoesAgrupadas[tipo][data].map((transacao, idx) => (
                  <View key={idx} style={styles.transaction}>
                    <Text style={styles.transactionDescription}>
                      {transacao.descricao}
                    </Text>
                    <Text style={styles.transactionValue}>
                      R$ {transacao.valor.toFixed(2)}
                    </Text>
                    <View style={styles.separator} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  accordion: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  accordionHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subAccordion: {
    marginTop: 5,
    padding: 5,
    backgroundColor: "#e1e1e1",
    borderRadius: 5,
  },
  subAccordionHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  transactionDescription: {
    flex: 1,
  },
  transactionValue: {
    fontWeight: "bold",
  },
});

export default DetalhesExtratoScreen;
