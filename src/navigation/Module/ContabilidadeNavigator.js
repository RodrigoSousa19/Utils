import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExtratosBancariosScreen from '../../screens/Contabilidade/ExtratosBancarios/ExtratosBancariosScreen';
import DetalhesExtratoBancarioScreen from '../../screens/Contabilidade/ExtratosBancarios/Detalhes/DetalhesExtratoBancarioScreen';

const Stack = createStackNavigator();

const ContabilidadeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExtratosBancarios" component={ExtratosBancariosScreen} />
      <Stack.Screen name="DetalhesExtratoBancarioScreen" component={DetalhesExtratoBancarioScreen} />
    </Stack.Navigator>
  );
};

export default ContabilidadeNavigator;