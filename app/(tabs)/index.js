// app/(tabs)/index.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useTimer } from '../contexts/TimerContext';
import { useConfig } from '../contexts/ConfigContext';
import Botao from '../components/Botao';
import Scrambler from '../components/Scrambler';
import Metronomo from '../components/Metronomo';

export default function Cronometro() {
  const {
    tempo,
    ativo,
    temposSalvos,
    formatarTempo,
    toggleCronometro,
    salvarTempo,
    resetarCronometro,
    setTemposSalvos,
    // NOVAS PROPRIEDADES:
    inspecaoAtiva,
    tempoInspecao,
    iniciarInspecao,
    iniciarCronometroImediatamente, // Para iniciar o tempo durante a inspeção
    // ...
  } = useTimer();
  const { temaEscuro, puzzleSelecionado } = useConfig();
  
  const [inputTempo, setInputTempo] = useState('');
  // Estado para disparar o novo Scramble
  const [scrambleTrigger, setScrambleTrigger] = useState(0); 

  const triggerNovoScramble = () => {
    setScrambleTrigger(prev => prev + 1);
  };

  // Lógica de Exclusão
  const excluirTempo = (id) => {
    setTemposSalvos(prev => prev.filter(t => t.id !== id));
  };

  // Lógica de Entrada Manual (Gera novo scramble)
  const adicionarTempoManual = () => {
    const tempoEmMs = parseFloat(inputTempo) * 1000;
    if (isNaN(tempoEmMs) || tempoEmMs <= 0) {
      Alert.alert('Erro', 'Insira um tempo válido em segundos (ex: 15.5)');
      return;
    }
    const novoTempo = { tempo: tempoEmMs, id: Date.now() };
    setTemposSalvos(prevTempos => [novoTempo, ...prevTempos]);
    setInputTempo('');
    triggerNovoScramble(); // Dispara novo embaralhamento
    Alert.alert('Sucesso', `Tempo de ${inputTempo} segundos adicionado.`);
  };

// Lógica principal de toque (NOVA IMPLEMENTAÇÃO)
  const handleTouch = () => {
    if (ativo) {
      // 1. Cronômetro Ativo -> Salva Tempo
      salvarTempo(); 
      triggerNovoScramble();
    } else if (inspecaoAtiva) {
      // 2. Inspeção Ativa -> Inicia o Cronômetro Principal Imediatamente (Spacebar ou Toque)
      iniciarCronometroImediatamente(); 
    } else {
      // 3. Parado (00:00:00) -> Inicia a Inspeção de 15s
      iniciarInspecao();
    }
  };

  // Condição para mostrar o tempo (NOVA LÓGICA DE EXIBIÇÃO)
  const mostrarUltimoTempo = !ativo && temposSalvos.length > 0;
  
  const tempoDisplay = inspecaoAtiva 
    ? tempoInspecao.toFixed(0) // Mostra 15, 14, 13...
    : ativo
      ? formatarTempo(tempo) 
      : mostrarUltimoTempo 
        ? formatarTempo(temposSalvos[0].tempo) 
        : formatarTempo(tempo); // 00:00:00 se não houver tempos

  // Estilos Dinâmicos
  const containerStyle = [styles.container, temaEscuro && styles.containerEscuro];
  const tempoStyle = [styles.tempo, temaEscuro && styles.textoClaro];
  const listaItemStyle = [styles.listaItem, temaEscuro && styles.textoClaro];

  const scrambleColor = temaEscuro ? styles.textoClaro : styles.textoEscuro;

  return (
    // Usa KeyboardAvoidingView para evitar que o teclado cubra os inputs (melhor prática)
    <KeyboardAvoidingView
      style={containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      
      {/* SCRAMBLER NO TOPO E CENTRALIZADO */}
      <View style={styles.scramblerContainer}>
        <Scrambler style={scrambleColor} trigger={scrambleTrigger} />
      </View>

    // ATUALIZE A EXIBIÇÃO DO TEMPO:
      <TouchableOpacity style={styles.areaCronometro} onPress={handleTouch}>
          <Text 
            style={[
              styles.tempo, 
              temaEscuro && styles.textoClaro, 
              inspecaoAtiva && styles.tempoInspecao // Aplica o novo estilo durante a inspeção
            ]}
          >
            {tempoDisplay}
          </Text>
      </TouchableOpacity>
      // ...
  
      <Metronomo />

      {/* Botão de Reiniciar */}
      <View style={styles.botoes}>
        <Botao title="Reiniciar" onPress={resetarCronometro} />
      </View>
      
      {/* Opção de Digitar Tempos Manualmente */}
      <View style={styles.inputManualContainer}>
        <TextInput
          style={[styles.inputManual, temaEscuro && styles.inputEscuro]}
          placeholder="Tempo em segundos (ex: 15.5)"
          placeholderTextColor={temaEscuro ? '#aaa' : '#666'}
          keyboardType="numeric"
          value={inputTempo}
          onChangeText={setInputTempo}
        />
        <Botao title="Adicionar" onPress={adicionarTempoManual} />
      </View>

      <Text style={[styles.subtitulo, temaEscuro && styles.textoClaro]}>Tempos Salvos</Text>
      
      {/* LISTA DE TEMPOS (Ocupa o espaço restante e é estável) */}
      <View style={styles.listaContainer}>
        <FlatList
          style={styles.lista}
          data={temposSalvos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listaItemContainer}>
              <Text style={listaItemStyle}>
                {formatarTempo(item.tempo)}
              </Text>
              <TouchableOpacity onPress={() => excluirTempo(item.id)} style={styles.botaoExcluir}>
                <Text style={styles.textoExcluir}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerEscuro: {
    backgroundColor: '#121212',
  },
  
  // SCRAMBLER NO TOPO
  scramblerContainer: {
    alignItems: 'center', // Centraliza horizontalmente
    paddingVertical: 10,
    marginTop: 0,
  },

  // ÁREA DO CRONÔMETRO
  areaCronometro: { 
    flex: 1, // Ocupa todo o espaço vertical disponível no centro
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  tempo: { 
    fontSize: 60, 
    fontWeight: 'bold', 
    color: '#000',
    marginBottom: 20,
  },
  textoClaro: { color: '#fff' }, 
  textoEscuro: { color: '#000' },
  subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  botoes: { flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 10 },

  // Estilos de Input Manual
  inputManualContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  inputManual: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    color: '#000',
  },
  inputEscuro: {
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#fff',
  },
  
  // LISTA DE TEMPOS (Container e Itens)
  listaContainer: {
    flex: 1, // Permite que a FlatList ocupe o restante do espaço de forma estável
    marginBottom: 10,
  },
  lista: {
    flexGrow: 1, // Permite que a lista cresça, mas o container a mantém estável
  },
  listaItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listaItem: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  botaoExcluir: {
    padding: 5,
    backgroundColor: '#d32f2f',
    borderRadius: 3,
    marginLeft: 10,
  },
  textoExcluir: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tempoInspecao: {
      fontSize: 80, 
      fontWeight: 'bold',
      color: '#FF4136', // Uma cor chamativa (Vermelho) para a contagem
  },
});