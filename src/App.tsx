import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './Router';
import SplashScreen from './components/SplashScreen';
import { initializeCache, CacheManager } from './utils/cacheManager';

const SPLASH_SHOWN_KEY = 'univirtus_splash_shown';

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      // Inicializar sistema de cache
      await initializeCache();
      
      // Configurar listener para sincronização online/offline
      CacheManager.setupOnlineListener(() => {
        console.log('🔄 Sincronizando dados...');
        // Aqui você pode adicionar lógica de sincronização
      });
      
      // Verifica se o splash já foi mostrado
      const splashShown = localStorage.getItem(SPLASH_SHOWN_KEY);
      
      if (!splashShown) {
        setShowSplash(true);
      }
      
      setIsLoading(false);
    };
    
    initialize();
  }, []);

  const handleSplashFinish = () => {
    // Marca que o splash foi mostrado
    localStorage.setItem(SPLASH_SHOWN_KEY, 'true');
    setShowSplash(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
