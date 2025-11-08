import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simula envio de email
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);

      // Volta para login após 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 1000);
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#1a4d7a',
        position: 'relative',
        px: 3,
        pt: 3,
      }}
    >
      {/* Botão Voltar */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          mb: 3,
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            color: '#fff',
            textTransform: 'none',
            fontSize: '16px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Voltar
        </Button>
      </Box>

      {/* Logo Univirtus */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 8,
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: '#FFC107',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '18px',
            color: '#fff',
          }}
        >
          UV
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '28px',
            color: '#fff',
            letterSpacing: '-0.5px',
          }}
        >
          univirtus
        </Typography>
      </Box>

      {/* Ilustração */}
      <Box
        sx={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 6,
          fontSize: '80px',
        }}
      >
        🔐
      </Box>

      {/* Conteúdo */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {!submitted ? (
          <>
            <Typography
              sx={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 700,
                mb: 2,
                textAlign: 'center',
              }}
            >
              Esqueci minha senha
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '15px',
                mb: 4,
                textAlign: 'center',
                lineHeight: 1.6,
              }}
            >
              Digite seu e-mail cadastrado e enviaremos instruções para recuperar sua senha.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Typography
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '16px',
                  mb: 1,
                }}
              >
                E-mail
              </Typography>
              <TextField
                fullWidth
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(13, 59, 102, 0.5)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderWidth: '1.5px',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                      borderWidth: '1.5px',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#fff',
                    padding: '16px 18px',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.4)',
                      opacity: 1,
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                disabled={loading || !email}
                sx={{
                  py: 1.8,
                  backgroundColor: 'rgba(13, 59, 102, 0.4)',
                  color: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontSize: '17px',
                  fontWeight: 600,
                  border: '1.5px solid rgba(255, 255, 255, 0.15)',
                  '&:hover': {
                    backgroundColor: 'rgba(13, 59, 102, 0.5)',
                  },
                  '&:not(:disabled)': {
                    backgroundColor: '#FFC107',
                    color: '#1a4d7a',
                    border: 'none',
                    '&:hover': {
                      backgroundColor: '#FFD54F',
                    },
                  },
                }}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </Button>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
              }}
            >
              ✓
            </Box>

            <Typography
              sx={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              E-mail enviado!
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '15px',
                textAlign: 'center',
                lineHeight: 1.6,
              }}
            >
              Enviamos as instruções para recuperação de senha para o e-mail{' '}
              <strong style={{ color: '#FFC107' }}>{email}</strong>
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '14px',
                textAlign: 'center',
                mt: 2,
              }}
            >
              Redirecionando para o login...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Indicador inferior (barra branca) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          width: 140,
          height: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '10px',
        }}
      />
    </Box>
  );
};

export default ForgotPasswordPage;
