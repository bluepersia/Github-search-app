import { createContext, useState } from 'react';
import './App.css';
import Toggle from './components/Toggle';
import SearchBar from './components/SearchBar';

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

function App() {
  const [mode, setMode] = useState<Mode>(Mode.Light);

  function toggleMode(): void {
    setMode((mode) => (mode === Mode.Dark ? Mode.Light : Mode.Dark));
  }
  return (
    <AppContext.Provider value={{ mode, toggleMode }}>
      <div className={`container-app ${mode.toString()}`}>
        <Toggle />
        <SearchBar />
      </div>
    </AppContext.Provider>
  );
}

export default App;
