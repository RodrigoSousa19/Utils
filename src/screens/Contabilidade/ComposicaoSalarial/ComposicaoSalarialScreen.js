import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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

export default function ComposicaoSalarialScreen() {
  const [composicaoSalarial, setComposicaoSalarial] = useState({
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
  });

  useEffect(() => {
    const loadComposicaoSalarial = async () => {
      try {
        const data = await ComposicaoSalarialApi.GetComposicaoSalarialAtual();

        setComposicaoSalarial({
          inicioPeriodo: moment(data.inicioPeriodo).format("DD/MM/YYYY"),
          fimPeriodo: moment(data.fimPeriodo).format("DD/MM/YYYY"),
          quantidadeDias: data.quantidadeDiasUteis,
          salarioHora: data.salarioHora,
          salarioDia: data.salarioDia,
          salarioBruto: data.salarioBruto,
          das: data.das,
          gps: data.gps,
          proLabore: data.proLabore,
          mensalidadeContabilidade: data.mensalidadeContabilidade,
          salarioLiquido:
            data.salarioBruto - data.das - data.gps - data.proLabore,
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

    calcularComposicaoSalarial();
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

    calcularComposicaoSalarial();
  };

  const transformarEmMoeda = (value) => {
    return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
  };

  const calcularComposicaoSalarial = async () => {
    const feriados = await getTotalFeriados();

    const totalDiasPeriodo = Utils.getDiasUteis(
      composicaoSalarial.inicioPeriodo,
      composicaoSalarial.fimPeriodo
    );

    const diasUteis = totalDiasPeriodo - feriados;

    calculaSalarioEEncargos(diasUteis);
  };

  async function getTotalFeriados() {
    let dataInicio = moment(
      composicaoSalarial.inicioPeriodo,
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");
    let dataFim = moment(composicaoSalarial.fimPeriodo, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );

    let feriadosEmDiasUteis = 0;

    let feriados = await FeriadosApi.getFeriadosByDateRange(
      dataInicio,
      dataFim
    );

    feriados.forEach((data) => {
      const feriado = new Date(data.data);

      const diaSemana = feriado.getDay();
      if (diaSemana >= 1 && diaSemana <= 5) {
        feriadosEmDiasUteis++;
      }
    });

    return feriadosEmDiasUteis;
  }

  async function calculaSalarioEEncargos(diasUteis) {
    let salarioDia = parseToNumber(composicaoSalarial.salarioHora) * 8;
    let salarioBruto = salarioDia * diasUteis;

    let rendaBrutaAnual = salarioBruto * 12;
    let faixaDas = await DasApi.getCurrentDasRange(rendaBrutaAnual);

    let das = salarioBruto * faixaDas.aliquota;
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

  return (
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
        <TouchableOpacity onPress={handleAvancarMes} style={styles.iconButton}>
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
        value={transformarEmMoeda(composicaoSalarial.mensalidadeContabilidade)}
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  iconText: {
    fontSize: 20,
    color: "#fff",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
});
