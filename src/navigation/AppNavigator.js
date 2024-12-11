import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ExtratosBancariosScreen from '../screens/Contabilidade/ExtratosBancarios/ExtratosBancariosScreen';
import DetalhesExtratoBancarioScreen from '../screens/Contabilidade/ExtratosBancarios/Detalhes/DetalhesExtratoBancarioScreen';
import NotasFiscaisScreen from '../screens/Contabilidade/NotasFiscais/NotasFiscaisScreen';
import ComposicaoSalarialScreen from '../screens/Contabilidade/ComposicaoSalarial/ComposicaoSalarialScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="ExtratosBancarios" component={ExtratosBancariosScreen} options={{title: 'Extratos Bancários'}} />
        <Stack.Screen name="DetalhesExtratoBancarioScreen" component={DetalhesExtratoBancarioScreen} options={{title: 'Detalhamento do Extrato'}}/>
        <Stack.Screen name="NotasFiscais" component={NotasFiscaisScreen} options={{title: 'Notas Fiscais'}} />
        <Stack.Screen name="ComposicaoSalarial" component={ComposicaoSalarialScreen} options={{title: 'Composição Salarial'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
