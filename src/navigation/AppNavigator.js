import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ContabilidadeNavigator from './Module/ContabilidadeNavigator';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Contabilidade">
        <Drawer.Screen name="Contabilidade" component={ContabilidadeNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
