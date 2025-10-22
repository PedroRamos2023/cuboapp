// app/(tabs)/media.js (NOVO ARQUIVO)

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTimer } from '../contexts/TimerContext';
import { useConfig } from '../contexts/ConfigContext';

// Helper function para calcular média (Trimmed Mean - exclui melhor e pior)
const calcularMedia = (tempos, n) => {
  if (tempos.length < n) return null;
  
  const ultimosTempos = tempos.slice(0, n).map(t => t.tempo); // Pega os N tempos em ms
  let temposParaMedia = [...ultimosTempos];

  if (n >= 3) {
    const melhorTempo = Math.min(...temposParaMedia);
    const piorTempo = Math.max(...temposParaMedia);

    // Remove a primeira ocorrência do melhor e do pior
    const idxMelhor = temposParaMedia.indexOf(melhorTempo);
    if (idxMelhor > -1) temposParaMedia.splice(idxMelhor, 1);
    
    const idxPior = temposParaMedia.indexOf(piorTempo);
    if (idxPior > -1) temposParaMedia.splice(idxPior, 1);
  }
  
  const soma = temposParaMedia.reduce((acc, t) => acc + t, 0);
  return soma / temposParaMedia.length;
};

// Helper function para calcular Média Geral
const calcularMean = (tempos) => {
    if (tempos.length === 0) return 0;
    const soma = tempos.reduce((acc, t) => acc + t.tempo, 0);
    return soma / tempos.length;
};


export default function MediaScreen() {
  const { temposSalvos, formatarTempo } = useTimer();
  const { temaEscuro } = useConfig();

  const temposEmMs = temposSalvos.map(t => t.tempo);

  const mediaSimples = calcularMean(temposSalvos);
  const ao5 = calcularMedia(temposSalvos, 5);
  const ao12 = calcularMedia(temposSalvos, 12);

  const renderMedia = (label, media) => (
    <View style={styles.mediaItem}>
      <Text style={[styles.mediaLabel, temaEscuro && styles.textoClaro]}>{label}:</Text>
      <Text style={[styles.mediaValor, temaEscuro && styles.textoClaro]}>
        {media === null ? '--' : formatarTempo(media)}
      </Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, temaEscuro && styles.containerEscuro]}>
      <Text style={[styles.titulo, temaEscuro && styles.textoClaro]}>Estatísticas e Médias</Text>
      
      {renderMedia('Média Geral (Mean)', mediaSimples)}
      
      <View style={styles.separator} />

      <Text style={[styles.subtitulo, temaEscuro && styles.textoClaro]}>Médias Padrão</Text>
      {renderMedia('Média de 5 (Ao5)', ao5)}
      {renderMedia('Média de 12 (Ao12)', ao12)}

      <View style={styles.separator} />
      
      <Text style={[styles.subtitulo, temaEscuro && styles.textoClaro]}>Melhores Tempos</Text>
      
      {temposSalvos.length > 0 ? (
          <View>
              {renderMedia('Melhor Tempo (PB)', formatarTempo(Math.min(...temposEmMs)))}
              {renderMedia('Pior Tempo', formatarTempo(Math.max(...temposEmMs)))}
          </View>
      ) : (
        <Text style={[styles.mediaLabel, temaEscuro && styles.textoClaro]}>Salve um tempo para ver as estatísticas.</Text>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', },
  containerEscuro: { backgroundColor: '#121212', },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 10, },
  mediaItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', },
  mediaLabel: { fontSize: 16, color: '#000', },
  mediaValor: { fontSize: 16, fontWeight: 'bold', color: '#000', },
  textoClaro: { color: '#fff', },
  separator: { height: 1, backgroundColor: '#ccc', marginVertical: 10, }
});