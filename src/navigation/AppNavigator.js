import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ContabilidadeNavigator from './Module/ContabilidadeNavigator'; // Navigator do módulo Contabilidade

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Contabilidade">
        {/* Adicione outros módulos aqui */}
        <Drawer.Screen name="Contabilidade" component={ContabilidadeNavigator} />
        {/* Exemplo de outro módulo */}
        <Drawer.Screen name="OutroModulo" component={() => <></>} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
