import { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [ru, setRu] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(ru, password);
      if (success) {
        navigate('/home');
      } else {
        setError('A sua combinação de RU/e-mail e senha está incorreta.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#123963',
        position: 'relative',
        px: 3,
        pt: 4,
      }}
    >
      {/* Ilustração */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/src/utils/logoLogin.jpeg"
          alt="Login illustration"
          style={{
            width: '200px',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Formulário de Login */}
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          mt: 5,
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            color: '#fff',
            fontWeight: 500,
            fontSize: '15px',
            mb: 1.5,
          }}
        >
          Login
        </Typography>
        <TextField
          fullWidth
          placeholder="RU"
          value={ru}
          onChange={(e) => setRu(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              color: '#6253e6ff',
              fontSize: '16px',
              '& fieldset': {
                borderColor: 'rgba(135, 119, 230, 0.76)',
                borderWidth: '1.5px',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(147, 138, 196, 0.76)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.76)',
                borderWidth: '2px',
              },
            },
            '& .MuiOutlinedInput-input': {
              color: '#fff',
              padding: '16px 18px',
              '&::placeholder': {
                color: '#6253e6ff',
                opacity: 1,
              },
            },
          }}
        />

        <Typography
          sx={{
            color: '#fff',
            fontWeight: 500,
            fontSize: '15px',
            mb: 0.5,
            marginBottom: '10px'
          }}
        >
          Senha
        </Typography>
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{
                      color: 'rgba(168, 126, 223, 0.6)',
                      '&:hover': {
                        color: 'rgba(180, 143, 238, 0.9)',
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              color: '#6253e6ff',
              fontSize: '16px',
              '& fieldset': {
                borderColor: 'rgba(135, 119, 230, 0.76)',
                borderWidth: '1.5px',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(147, 138, 196, 0.76)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.76)',
                borderWidth: '2px',
              },
            },
            '& .MuiOutlinedInput-input': {
              color: '#fff',
              padding: '16px 18px',
              '&::placeholder': {
                color: '#6253e6ff',
                opacity: 1,
              },
            },
          }}
        />

        {error && (
          <Typography
            variant="body2"
            sx={{
              color: '#ff6b6b',
              textAlign: 'center',
              mb: 2,
            }}
          >
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          disabled={loading || !ru || !password}
          sx={{
            mt: 7,
            py: 1,
            backgroundColor: '#123963',
            color: 'rgba(21, 32, 66, 1)',
            borderRadius: '45px',
            textTransform: 'none',
            fontSize: '17px',
            fontWeight: 600,
            border: '2px solid rgba(36, 31, 63, 0.4)',
            '&:hover': {
              backgroundColor: '#1100ffff',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              fontWeight: 800,
              color: '#ffffffff',
            },
            '&:not(:disabled)': {
              backgroundColor: '#1100ffff',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              fontWeight: 800,
              color: '#ffffffff',
              '&:hover': {
                backgroundColor: '#1100ff67',
                borderColor: 'rgba(255, 255, 255, 0.06)',
                fontWeight: 800,
                color: '#ffffffff',
              },
            },
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <Button
          fullWidth
          onClick={() => navigate('/forgot-password')}
          sx={{
            mt: 6,
            color: '#6BA3D8',
            textTransform: 'none',
            fontSize: '15px',
            fontWeight: 700,
            textDecoration: 'underline',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#8BBCE8',
              textDecoration: 'underline',
            },
          }}
        >
          Esqueci minha senha
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
