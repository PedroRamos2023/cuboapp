// app/_layout.js
import { Stack } from 'expo-router';
import { ConfigProvider } from './contexts/ConfigContext';
import { TimerProvider } from './contexts/TimerContext';

export default function RootLayout() {
  return (
    <ConfigProvider>
      <TimerProvider>
        {/* Renderiza o conteúdo dentro da pasta (tabs) */}
        <Stack /> 
      </TimerProvider>
    </ConfigProvider>
  );
}