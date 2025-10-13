// app/components/Botao.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Botao({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity style={[styles.botao, style]} onPress={onPress}>
      <Text style={[styles.textoBotao, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#007AFF', // Cor padrão azul
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});