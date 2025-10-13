// app/contexts/ConfigContext.js
import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const ConfigContext = createContext();

export function ConfigProvider({ children }) {
  // Inicialização
  const colorScheme = useColorScheme();
  const [temaEscuro, setTemaEscuro] = useState(colorScheme === 'dark');
  const [metronomoAtivo, setMetronomoAtivo] = useState(false);
  const [metronomoBPM, setMetronomoBPM] = useState(120); // Padrão 120 BPM

  const toggleTema = () => {
    setTemaEscuro(prev => !prev);
  };
  
  const toggleMetronomo = () => {
    setMetronomoAtivo(prev => !prev);
  };

  const value = {
    temaEscuro,
    toggleTema,
    metronomoAtivo,
    toggleMetronomo,
    metronomoBPM,
    setMetronomoBPM,
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);