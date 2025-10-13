// app/components/Scrambler.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import scrambleGenerator from 'rubiks-cube-scramble';

// Agora aceita a prop 'trigger' que será um número que incrementa
export default function Scrambler({ style, trigger }) { 
  const [scramble, setScramble] = useState(null);

  const gerarNovo = () => {
    const novoScramble = scrambleGenerator();
    setScramble(novoScramble);
  };

  // Efeito para a geração inicial na montagem
  useEffect(() => {
    if (!scramble) {
      gerarNovo();
    }
  }, []);

  // Efeito para gerar novo scramble quando o 'trigger' (disparador) muda
  useEffect(() => {
    // Garante que a função só roda se o trigger for > 0 (evita rodar na montagem)
    if (trigger > 0) { 
      gerarNovo();
    }
  }, [trigger]); // A cada mudança no 'trigger'

  return (
    <View style={styles.container}>
      <Text style={[styles.scramble, style]}>
        {scramble || 'Clique para gerar um scramble'}
      </Text>
      {/* O botão interno ainda funciona para gerar manualmente */}
      <TouchableOpacity onPress={gerarNovo} style={styles.botao}>
        <Text style={styles.textoBotao}>Gerar Novo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  scramble: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    // A cor será definida pela prop 'style'
  },
  botao: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
  },
});