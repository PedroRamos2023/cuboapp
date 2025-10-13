// app/(tabs)/_layout.js
import React from 'react';
import { Tabs } from 'expo-router';
import { useConfig } from '../contexts/ConfigContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de que o expo-vector-icons está instalado!

export default function TabLayout() {
  const { temaEscuro } = useConfig();

  // Define as cores base
  const corDeFundo = temaEscuro ? '#121212' : '#ffffff';
  const corDaAba = temaEscuro ? '#ffffff' : '#000000';
  const corAtiva = temaEscuro ? '#81b0ff' : '#007AFF'; // Azul mais claro/escuro

  return (
    // Envolve toda a navegação com os Provedores de Contexto
    // ATENÇÃO: Os Provedores (TimerProvider e ConfigProvider) DEVEM estar no app/_layout.js
    // Este arquivo aqui é o (tabs)/_layout.js, que já está dentro deles!
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: temaEscuro ? '#000000' : '#FFFFFF',
        },
        headerTintColor: temaEscuro ? '#FFFFFF' : '#000000', // Define a cor do texto do título
        headerShown: false, // Oculta o cabeçalho padrão
        tabBarStyle: {
          backgroundColor: corDeFundo,
          borderTopColor: temaEscuro ? '#333' : '#ccc',
        },
        
        tabBarActiveTintColor: corAtiva,
        tabBarInactiveTintColor: temaEscuro ? '#999' : '#666',
        tabBarLabelStyle: {
          color: corDaAba,
        },
      }}
    >
      {/* 1. Aba do Cronômetro (index.js) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cronômetro',
          tabBarIcon: ({ color }) => (
            <Ionicons name="timer" size={24} color={color} />
          ),
        }}
      />

      {/* 2. Aba de Configurações (configuracoes.js) */}
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}