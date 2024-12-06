import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Alert
} from "react-native";
import CustomInput from "../../../components/CustomInput";
import theme from "../../../styles/theme";
import ComposicaoSalarialApi from "../../../api/ComposicaoSalarial/ComposicaoSalarialApi";
import moment, { duration } from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import FeriadosApi from "../../../api/Feriados/FeriadosApi";
import Utils from "../../../utils/Utils";
import DasApi from "../../../api/Das/DasApi";
import { parseToNumber } from "../../../utils/Formats";
import CustomButton from "../../../components/CustomButton";

export default function ComposicaoSalarialScreen() {
  const [composicaoSalarial, setComposicaoSalarial] = useState({
    id: 0,
    inicioPeriodo: "",
    fimPeriodo: "",
    quantidadeDias: 0,
    salarioHora: 0,
    salarioDia: 0,
    salarioBruto: 0,
    das: 0,
    gps: 0,
    proLabore: 0,
    mensalidadeContabilidade: 0,
    salarioLiquido: 0,
    composicaoAtual: false,
  });

  useEffect(() => {
    const loadComposicaoSalarial = async () => {
      try {
        const result = await ComposicaoSalarialApi.GetComposicaoSalarialAtual();

        setComposicaoSalarial({
          id: result.data.id,
          inicioPeriodo: moment(result.data.inicioPeriodo).format("DD/MM/YYYY"),
          fimPeriodo: moment(result.data.fimPeriodo).format("DD/MM/YYYY"),
          quantidadeDias: result.data.quantidadeDiasUteis,
          salarioHora: result.data.salarioHora,
          salarioDia: result.data.salarioDia,
          salarioBruto: result.data.salarioBruto,
          das: result.data.das,
          gps: result.data.gps,
          proLabore: result.data.proLabore,
          mensalidadeContabilidade: result.data.mensalidadeContabilidade,
          salarioLiquido: result.data.salarioBruto,
          composicaoAtual: result.data.composicaoAtual,
        });
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    loadComposicaoSalarial();
  }, []);

  const handleAvancarMes = () => {
    const novoInicioPeriodo = Utils.adicionarMeses(
      composicaoSalarial.inicioPeriodo,
      1
    );
    const novoFimPeriodo = Utils.adicionarMeses(
      composicaoSalarial.fimPeriodo,
      1
    );

    setComposicaoSalarial((prevState) => ({
      ...prevState,
      inicioPeriodo: novoInicioPeriodo,
      fimPeriodo: novoFimPeriodo,
    }));

    calcularComposicaoSalarial(novoInicioPeriodo, novoFimPeriodo);
  };

  const handleRecuarMes = () => {
    const novoInicioPeriodo = Utils.subtrairMeses(
      composicaoSalarial.inicioPeriodo,
      1
    );
    const novoFimPeriodo = Utils.subtrairMeses(
      composicaoSalarial.fimPeriodo,
      1
    );

    setComposicaoSalarial((prevState) => ({
      ...prevState,
      inicioPeriodo: novoInicioPeriodo,
      fimPeriodo: novoFimPeriodo,
    }));

    calcularComposicaoSalarial(novoInicioPeriodo, novoFimPeriodo);
  };

  const transformarEmMoeda = (value) => {
    return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
  };

  const calcularComposicaoSalarial = async (
    dataInicioCompetencia,
    dataFimCompetencia
  ) => {
    const feriados = await getTotalFeriados(
      dataInicioCompetencia,
      dataFimCompetencia
    );

    const totalDiasPeriodo = Utils.getDiasUteis(
      dataInicioCompetencia,
      dataFimCompetencia
    );

    const diasUteis = totalDiasPeriodo - feriados;

    await calculaSalarioEEncargos(diasUteis);
  };

  async function getTotalFeriados(dataInicioCompetencia, dataFimCompetencia) {
    let dataInicio = moment(dataInicioCompetencia, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    let dataFim = moment(dataFimCompetencia, "DD/MM/YYYY").format("YYYY-MM-DD");

    let feriadosEmDiasUteis = 0;

    let feriados = await FeriadosApi.getFeriadosByDateRange(
      dataInicio,
      dataFim
    );

    feriados.data.forEach((data) => {
      const feriado = new Date(data.data);

      const diaSemana = feriado.getDay();
      if (diaSemana >= 1 && diaSemana <= 5) {
        feriadosEmDiasUteis++;
      }
    });

    return feriadosEmDiasUteis;
  }

  async function calculaSalarioEEncargos(diasUteis) {

    let salarioHora = parseFloat(composicaoSalarial.salarioHora)

    let salarioDia = salarioHora * 8;
    let salarioBruto = salarioDia * diasUteis;
    let rendaBrutaAnual = salarioBruto * 12;

    let faixaDas = await DasApi.getCurrentDasRange(rendaBrutaAnual);
    let das = salarioBruto * faixaDas.data.aliquota;
    let proLabore = salarioBruto * 0.28;
    let gps = proLabore * 0.11;

    let mensalidadeContabilidade = composicaoSalarial.mensalidadeContabilidade;
    let salarioLiquido = salarioBruto - das - gps - mensalidadeContabilidade;

    setComposicaoSalarial((prevState) => ({
      ...prevState,
      quantidadeDias: diasUteis,
      salarioDia: salarioDia,
      salarioBruto: salarioBruto,
      das: das,
      proLabore: proLabore,
      gps: gps,
      salarioLiquido: salarioLiquido,
    }));
  }

  const handleCalcular = async () => {
    try {
       await calcularComposicaoSalarial(composicaoSalarial.inicioPeriodo, composicaoSalarial.fimPeriodo);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao calcular os valores.");
    }
  };

  const handleProcessarCompetencia = async () => {
    try {

      const data = {
        id: composicaoSalarial.id,
        inicioPeriodo: moment(
          composicaoSalarial.inicioPeriodo,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD"),
        fimPeriodo: moment(composicaoSalarial.fimPeriodo, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        ),
        quantidadeDiasUteis: composicaoSalarial.quantidadeDias,
        salarioHora: parseFloat(
          composicaoSalarial.salarioHora.replace(",", ".").replace("R$ ", "")
        ),
        salarioDia: composicaoSalarial.salarioDia,
        salarioBruto: composicaoSalarial.salarioBruto,
        das: composicaoSalarial.das,
        gps: composicaoSalarial.gps,
        proLabore: composicaoSalarial.proLabore,
        mensalidadeContabilidade: composicaoSalarial.mensalidadeContabilidade,
        salarioLiquido: composicaoSalarial.salarioLiquido,
        composicaoAtual: true,
      };

      await ComposicaoSalarialApi.updateComposicaoSalarial(
        composicaoSalarial.id,
        data
      );

      Alert.alert(
        "Sucesso",
        "Competência atual processada e salva com sucesso!"
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível processar a competência atual.");
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <CustomInput
          label="Inicio Período"
          value={composicaoSalarial.inicioPeriodo}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({
              ...prevState,
              inicioPeriodo: text,
            }))
          }
          readOnly={true}
          style={styles.input}
          iconName="calendar-month"
        />
        <CustomInput
          label="Fim Período"
          value={composicaoSalarial.fimPeriodo}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({
              ...prevState,
              fimPeriodo: text,
            }))
          }
          readOnly={true}
          style={styles.input}
          iconName="calendar-month"
        />
        <CustomInput
          label="Quantidade de Dias"
          value={composicaoSalarial.quantidadeDias.toString()}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({
              ...prevState,
              quantidadeDias: text,
            }))
          }
          readOnly={true}
          style={styles.input}
          iconName="date-range"
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleRecuarMes} style={styles.iconButton}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAvancarMes}
            style={styles.iconButton}
          >
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <CustomInput
          label="Salário Hora"
          value={composicaoSalarial.salarioHora}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({
              ...prevState,
              salarioHora: text,
            }))
          }
          style={styles.input}
          iconName="monetization-on"
          type="money"
          keyboardType="numeric"
        />
        <CustomInput
          label="Salário Dia"
          value={transformarEmMoeda(composicaoSalarial.salarioDia)}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({
              ...prevState,
              salarioDia: text,
            }))
          }
          readOnly={true}
          style={styles.input}
          iconName="monetization-on"
        />
        <CustomInput
          label="Salário Bruto (Mês)"
          value={transformarEmMoeda(composicaoSalarial.salarioBruto)}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({
              ...prevState,
              salarioBruto: text,
            }))
          }
          readOnly={true}
          style={styles.input}
          iconName="monetization-on"
        />

        <CustomInput
          label="DAS"
          value={transformarEmMoeda(composicaoSalarial.das)}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({ ...prevState, das: text }))
          }
          readOnly={true}
          style={styles.input}
          iconName="monetization-on"
        />
        <CustomInput
          label="GPS"
          value={transformarEmMoeda(composicaoSalarial.gps)}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({ ...prevState, gps: text }))
          }
          readOnly={true}
          style={styles.input}
          iconName="monetization-on"
        />
        <CustomInput
          label="Pró Labore"
          value={transformarEmMoeda(composicaoSalarial.proLabore)}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({
              ...prevState,
              proLabore: text,
            }))
          }
          readOnly={true}
          style={styles.input}
          iconName="monetization-on"
        />

        <CustomInput
          label="Mensalidade Contabilidade"
          value={transformarEmMoeda(
            composicaoSalarial.mensalidadeContabilidade
          )}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({
              ...prevState,
              mensalidadeContabilidade: text,
            }))
          }
          style={styles.input}
          iconName="monetization-on"
        />
        <CustomInput
          label="Salário Liquido"
          value={transformarEmMoeda(composicaoSalarial.salarioLiquido)}
          onChangeText={(text) =>
            setComposicaoSalarial((prevState) => ({
              ...prevState,
              salarioLiquido: text,
            }))
          }
          readOnly={true}
          style={styles.input}
          iconName="monetization-on"
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <CustomButton
            title="Calcular"
            onPress={handleCalcular}
            iconName="calculate"
          />
        </View>
        <View style={styles.button}>
          <CustomButton
            title="Processar"
            onPress={handleProcessarCompetencia}
            iconName="save"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 100,
  },
  input: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    flex: 1,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
