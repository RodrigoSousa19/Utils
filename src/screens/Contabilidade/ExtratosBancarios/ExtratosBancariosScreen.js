import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import ExtratoBancarioApi from "../../../api/ExtratoBancario/ExtratoBancarioApi";
import ExtratoBancarioHeader from "../../../components/CustomCards/ExtratoBancario/ExtratoBancarioHeader";
import ExtratoBancarioBody from "../../../components/CustomCards/ExtratoBancario/ExtratoBancarioBody";
import Card from "../../../components/Card";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../../../styles/theme";
import CustomIconButton from "../../../components/CustomIconButton";
import * as DocumentPicker from "expo-document-picker";

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

  const handleCardPress = (banco) => {
    const extratoSelecionado = extratos[banco];
    navigation.navigate("DetalhesExtratoBancarioScreen", {
      extrato: extratoSelecionado,
    });
  };

  const handleSelectFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      if (!res.canceled) {
        const file = res.assets[0];
        
        if (file && file.uri) {
          const response = await ExtratoBancarioApi.sendBankStatement(file.uri, file.name);
          
          if (response.success) {
            console.log("Arquivo enviado com sucesso:", response.data);
            await loadExtratosBancarios();
          } else {
            console.error("Erro ao enviar arquivo:", response.message);
          }
        } else {
          console.error("Erro: URI do arquivo não está definida.");
        }
      } else {
        console.log("Seleção de arquivo cancelada");
      }
    } catch (error) {
      console.error("Erro ao selecionar ou enviar o arquivo:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {extratos.length > 0 ? (
        <ScrollView>
          {extratos.map((banco, bancoIndex) => (
            <View key={bancoIndex}>
              {
                <Card
                  key={bancoIndex}
                  header={ExtratoBancarioHeader}
                  body={ExtratoBancarioBody}
                  headerProps={{
                    nomeBanco: banco.banco,
                  }}
                  bodyProps={{
                    transactionCount: banco.movimentacoes.reduce(
                      (total, movimentacao) =>
                        total + movimentacao.transacoes.length,
                      0
                    ),
                    onButtonVerExtratoPress: () => handleCardPress(bancoIndex),
                    onButtonUploadPress: () => handleSelectFile()
                  }}
                />
              }
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyListContainer}>
          <Ionicons
            name="warning-outline"
            size={72}
            color={theme.colors.warning}
          />
          <Text style={styles.emptyListText}>
            Não há extratos a serem exibidos no momento!
          </Text>
          <CustomIconButton
            iconName={'upload'}
            onPress={handleSelectFile}
          />
        </View>
      )}
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
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
});
