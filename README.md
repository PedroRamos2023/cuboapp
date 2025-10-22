# CuboAppTimer

Um aplicativo de timer e estatísticas moderno para speedcubing, construído com React Native (Expo) e focado em usabilidade, precisão e personalização.

## 🚀 Funcionalidades Principais

* **Cronômetro Preciso:** Início e parada por toque (ou pressionamento de tela) com alta precisão milissegundos.
* **Tempo de Inspeção (15s):** Inclui uma contagem regressiva de 15 segundos antes do início do timer, conforme as regras da WCA (World Cube Association).
* **Embaralhamento Específico:** Geração de *scramble* oficial da WCA.
* **Métricas de Desempenho:** Tela dedicada para calcular a Média de 5 (Ao5) e a Média de 12 (Ao12), além de estatísticas gerais.
* **Metrônomo Opcional:** Recurso de metrônomo configurável por BPM (batidas por minuto) para auxiliar na prática de F2L e *lookahead*.
* **Tema Escuro:** Alternância entre tema claro e escuro.

## ⚙️ Tecnologias e Dependências

Este projeto utiliza o *stack* **React Native** com **Expo**.

| Dependência | Comando de Instalação | Uso Principal |
| :--- | :--- | :--- |
| `expo-router` | `npx expo install expo-router` | Sistema de navegação por abas. |
| `expo-av` | `npx expo install expo-av` | Módulo de áudio para o Metrônomo. |
| `@react-native-community/slider` | `npx expo install @react-native-community/slider` | Slider de ajuste de BPM na Configuração. |
| `@react-native-async-storage/async-storage` | `npx expo install @react-native-async-storage/async-storage` | Persistência de configurações e tempos (salvamento local). |
| `rubiks-cube-scramble` | `npm install rubiks-cube-scramble` | Geração de sequências de *scramble* para diversos *puzzles*. |
| `@react-native-picker/picker` | `npx expo install @react-native-picker/picker` | Componente Picker para seleção de *puzzles*. |

## 🛠️ Instalação e Execução

Para configurar e executar o projeto localmente:

### 1. Pré-requisitos

* **Node.js e npm (ou Yarn):** Certifique-se de ter o Node.js (versão LTS recomendada) instalado, pois ele inclui o `npm` e o `npx`.
* **Expo Go App:** Instale o aplicativo **Expo Go** no seu dispositivo móvel (Android ou iOS) para testar.

### 2. Instalação de Dependências

Navegue até o diretório do projeto e execute o comando para instalar todas as dependências listadas no `package.json`:

```bash
npm install 
# ou
yarn install