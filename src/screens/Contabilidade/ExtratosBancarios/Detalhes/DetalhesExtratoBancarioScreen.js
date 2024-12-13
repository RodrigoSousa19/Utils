import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalhesExtratoScreen = ({ route }) => {
  const { extrato } = route.params;

  return (
    <View style={styles.container}>
      <Text>Detalhes do Extrato</Text>
      <Text>Banco: {extrato[0].banco}</Text>
      <Text>Data: {extrato.dataTransacao}</Text>
      <Text>Tipo: {extrato.tipoTransacao}</Text>
      <Text>Valor: {extrato.valorTransacao}</Text>
      <Text>Descrição: {extrato.descricao}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetalhesExtratoScreen;
