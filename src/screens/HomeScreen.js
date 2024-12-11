import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma ação:</Text>
      <CustomButton
        title="Extratos Bancários"
        onPress={() => navigation.navigate('ExtratosBancarios')}
        style={styles.button}
        iconName={'balance'}
      />
      <CustomButton
        title="Notas Fiscais"
        onPress={() => navigation.navigate('NotasFiscais')}
        style={styles.button}
        iconName={'auto-stories'}
      />
      <CustomButton
        title="Composição Salarial"
        onPress={() => navigation.navigate('ComposicaoSalarial')}
        style={styles.button}
        iconName={'build'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    marginVertical: 10,
  },
});

export default HomeScreen;