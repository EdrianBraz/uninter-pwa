import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import logoInicial from '../utils/logoInicial.png';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Inicia o fade out após 2 segundos
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Chama onFinish após a animação de fade out (0.5s)
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#FFC107',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <img
        src={logoInicial}
        alt="Univirtus"
        style={{
          maxWidth: '200px',
          width: '60%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};

export default SplashScreen;
