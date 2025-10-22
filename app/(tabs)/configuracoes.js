// app/(tabs)/configuracoes.js
import React from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'; // <--- REMOVIDO DAQUI
import Slider from '@react-native-community/slider'; // <--- NOVA IMPORTAÇÃO
import { useConfig } from '../contexts/ConfigContext';

export default function Configuracoes() {
  const { 
    temaEscuro, toggleTema, 
    metronomoAtivo, toggleMetronomo, 
    metronomoBPM, setMetronomoBPM 
  } = useConfig();

  const containerStyle = [styles.container, temaEscuro && styles.containerEscuro];
  const textoStyle = [styles.texto, temaEscuro && styles.textoClaro];

  return (
    <View style={containerStyle}>
      <Text style={styles.titulo}>Configurações</Text>

      {/* 2. Tema Claro/Escuro */}
      <View style={styles.linhaConfig}>
        <Text style={textoStyle}>Tema Escuro</Text>
        <Switch
          onValueChange={toggleTema}
          value={temaEscuro}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={temaEscuro ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      {/* 1. Ativar/Desativar Metrônomo */}
      <View style={styles.linhaConfig}>
        <Text style={textoStyle}>Ativar Metrônomo</Text>
        <Switch
          onValueChange={toggleMetronomo}
          value={metronomoAtivo}
        />
      </View>

      {/* 1.1. Configuração do BPM do Metrônomo */}
      <View style={styles.linhaConfig}>
        <Text style={textoStyle}>BPM do Metrônomo: {metronomoBPM}</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={60}
        maximumValue={300}
        step={5}
        value={metronomoBPM}
        onValueChange={setMetronomoBPM}
        minimumTrackTintColor="#81b0ff"
        maximumTrackTintColor={temaEscuro ? "#555" : "#ccc"}
        thumbTintColor={Platform.select({ android: "#81b0ff", ios: "#81b0ff" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  containerEscuro: {
    backgroundColor: '#121212',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
  },
  linhaConfig: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  texto: {
    fontSize: 18,
    color: '#000',
  },
  textoClaro: {
    color: '#fff',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
});