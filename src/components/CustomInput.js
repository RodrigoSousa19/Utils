import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../styles/theme';

export default function CustomInput({
  label,
  iconName,
  placeholder,
  onChangeText,
  value,
  keyboardType = 'default',
  readOnly = false,
}) {
  const [isFocused, setIsFocused] = useState(false);


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };


  const borderStyle = {
    borderBottomColor: isFocused ? theme.colors.primary : theme.colors.border,
    borderBottomWidth: 2,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, borderStyle]}>
        <MaterialIcons
          name={iconName}
          size={20}
          color={isFocused ? theme.colors.primary : theme.colors.icon}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          placeholderTextColor={theme.colors.placeholder}
          readOnly={readOnly}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: theme.colors.inputBackground,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.backgroundDark,
  },
});
