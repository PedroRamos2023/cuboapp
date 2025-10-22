import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// 1. Criação do Contexto
const TimerContext = createContext();

// 2. Provedor do Contexto
export function TimerProvider({ children }) {
  const [tempo, setTempo] = useState(0);
  const [ativo, setAtivo] = useState(false);
  // O array que armazena os tempos temporariamente (em memória)
  const [temposSalvos, setTemposSalvos] = useState([]);

// -- NOVOS ESTADOS PARA INSPEÇÃO --
  const [inspecaoAtiva, setInspecaoAtiva] = useState(false);
  const [tempoInspecao, setTempoInspecao] = useState(15); // 15 segundos
  const inspecaoIntervalRef = useRef(null);
  // ---------------------------------


  const timerRef = useRef(null);

// ******* Certifique-se de que sua função formatarTempo está aqui *******

  // --- NOVA LÓGICA DE INSPEÇÃO ---
  const iniciarCronometroImediatamente = () => {
    // Parar Inspeção
    if (inspecaoIntervalRef.current) {
      clearInterval(inspecaoIntervalRef.current);
      inspecaoIntervalRef.current = null;
    }
    setInspecaoAtiva(false);
    
    // Iniciar Cronômetro Principal
    setAtivo(true);
  };
  
  const iniciarInspecao = () => {
    if (ativo || inspecaoAtiva) return;

    setTempo(0);
    setTempoInspecao(15);
    setInspecaoAtiva(true);

    inspecaoIntervalRef.current = setInterval(() => {
      setTempoInspecao(prevTime => {
        if (prevTime <= 1) {
          // Tempo de inspeção acabou, inicia o cronômetro automaticamente
          clearInterval(inspecaoIntervalRef.current);
          inspecaoIntervalRef.current = null;
          setInspecaoAtiva(false);
          setAtivo(true); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Conta a cada segundo
  };
  // -----------------------------

  // Função para formatar o tempo (m:s:cs)
  const formatarTempo = (time) => {
    const centesimos = Math.floor((time % 1000) / 10);
    const segundos = Math.floor((time / 1000) % 60);
    const minutos = Math.floor(time / 60000);
    return `${minutos.toString().padStart(2, '0')}:${segundos
      .toString()
      .padStart(2, '0')}:${centesimos.toString().padStart(2, '0')}`;
  };

  // Efeito que inicia/para o cronômetro a cada 10ms
  useEffect(() => {
    if (ativo) {
      const startTime = Date.now() - tempo;
      timerRef.current = setInterval(() => {
        setTempo(Date.now() - startTime);
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [ativo, tempo]);

  const toggleCronometro = () => {
    setAtivo(prev => !prev);
  };

  // Salva o tempo atual na lista temporária e reseta o cronômetro
  const salvarTempo = () => {
    if (tempo > 0) {
      setTemposSalvos(prevTempos => [{ tempo: tempo, id: Date.now() }, ...prevTempos]);
    }
    resetarCronometro();
  };

  const resetarCronometro = () => {
    setTempo(0);
    setAtivo(false);
  };

  // Expõe todos os estados e funções necessários
  const value = {
    tempo,
    ativo,
    temposSalvos,
    // setTemposSalvos é essencial para a função de exclusão/adição manual no index.js
    setTemposSalvos, 
    toggleCronometro,
    salvarTempo,
    formatarTempo,
    resetarCronometro,
// VALORES EXPOSTOS PARA INSPEÇÃO
    inspecaoAtiva,
    tempoInspecao,
    iniciarInspecao,
    iniciarCronometroImediatamente,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

// 3. Hook para consumir o contexto
export const useTimer = () => useContext(TimerContext);