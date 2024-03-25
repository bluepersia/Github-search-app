import { createContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import SearchApp from './components/SearchApp';

export enum Mode {
  Dark = 'dark',
  Light = 'light',
}

type AppContextType = {
  mode: Mode;
  toggleMode: () => void;
};

export const AppContext = createContext<AppContextType>({
  mode: Mode.Light,
  toggleMode: () => {},
});

const queryClient = new QueryClient();

function App() {
  const [mode, setMode] = useState<Mode>(Mode.Light);

  function toggleMode(): void {
    setMode((mode) => (mode === Mode.Dark ? Mode.Light : Mode.Dark));
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ mode, toggleMode }}>
        <div className={`container-app ${mode.toString()}`}>
          <SearchApp />
        </div>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
