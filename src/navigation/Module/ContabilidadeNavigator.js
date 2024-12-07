import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotasFiscaisScreen from '../../screens/Contabilidade/NotasFiscais/NotasFiscaisScreen';
import ExtratosBancariosScreen from '../../screens/Contabilidade/ExtratosBancarios/ExtratosBancariosScreen';
import ComposicaoSalarialScreen from '../../screens/Contabilidade/ComposicaoSalarial/ComposicaoSalarialScreen';

import theme from '../../styles/theme';

const Tab = createMaterialTopTabNavigator();

export default function ContabilidadeNavigator() {
    return (
      <Tab.Navigator
        initialRouteName="Composição Salarial"
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.colors.primary }, 
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#000',
          tabBarIndicatorStyle: { backgroundColor: '#fff' },
        }}
      >
        <Tab.Screen name="Composição Salarial" component={ComposicaoSalarialScreen} />
        <Tab.Screen name="Notas Fiscais" component={NotasFiscaisScreen} />
        <Tab.Screen name="Extratos Bancarios" component={ExtratosBancariosScreen} />
      </Tab.Navigator>
    );
  }