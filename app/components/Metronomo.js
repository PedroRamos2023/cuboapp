// app/components/Metronomo.js
import React, { useEffect, useRef } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import { useTimer } from '../contexts/TimerContext'; // Importação do useTimer adicionada na correção anterior
import { Audio } from 'expo-av';

const somMetronomo = require('../assets/metronome.mp3'); 

export default function Metronomo() {
  const { metronomoAtivo, metronomoBPM } = useConfig();
  const { ativo } = useTimer(); // Necessário para saber se o cronômetro está rodando
  
  // 1. Inicializa o ref como null
  const soundObjectRef = useRef(null); 
  const intervalRef = useRef(null);

  // Efeito para carregar o som UMA VEZ na montagem do componente
  useEffect(() => {
    const carregarSom = async () => {
      try {
        // 2. Cria e atribui o objeto Audio.Sound dentro do useEffect
        const { sound } = await Audio.Sound.createAsync(somMetronomo);
        soundObjectRef.current = sound;
      } catch (error) {
        //
        console.error('Erro ao carregar som do metrônomo:', error); 
      }
    };
    carregarSom();

    // Efeito de limpeza: descarrega o som quando o componente for desmontado
    return () => {
      if (soundObjectRef.current) {
        soundObjectRef.current.unloadAsync();
      }
    };
  }, []); // Array de dependências vazio: roda apenas na montagem

  // Efeito para controlar o metrônomo (tocar o som)
  useEffect(() => {
    if (metronomoAtivo && ativo) {
      const intervaloMs = 60000 / metronomoBPM;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(async () => {
        // 3. Toca o som usando o ref
        if (soundObjectRef.current) {
          try {
            await soundObjectRef.current.replayAsync();
          } catch (error) {
            console.log('Erro ao tocar som:', error);
          }
        }
      }, intervaloMs);

    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [metronomoAtivo, metronomoBPM, ativo]);

  return null; 
}