import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowBack, ArrowForward, ChevronRight, ErrorOutline } from '@mui/icons-material';

const FinancialPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const { financialStatus } = currentUser;

  // Menu items com ícones diferentes
  const menuItems = [
    { label: 'Pagamentos', hasArrow: true },
    { label: 'Negociação de dívidas', hasArrow: true },
    { label: 'Recorrência', hasArrow: true },
    { label: 'Antecipação', hasArrow: true },
    { label: 'Quitação anual de débitos', hasArrow: false },
    { label: 'Informações IR', hasArrow: false },
  ];

  return (
    <Box 
      sx={{ 
        backgroundColor: '#0d3865',
        minHeight: '100vh',
        pb: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 2,
          backgroundColor: '#0d3865',
          borderBottom: '1px solid #1E4A6F',
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: '#FFF',
            p: 0.5,
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 600 }}>
          Financeiro
        </Typography>
      </Box>

      {/* Boletos Container */}
      <Box
        sx={{
          mx: 2,
          mt: 2,
          mb: 3,
          p: 1.5,
          border: '2px solid #2196F3',
          borderRadius: 2,
        }}
      >
        {financialStatus.invoices.map((invoice, index) => (
          <Box
            key={invoice.id}
            sx={{
              mb: index < financialStatus.invoices.length - 1 ? 1.5 : 0,
              p: 2,
              border: '1px solid #1E4A6F',
              borderRadius: 2,
              backgroundColor: '#0d3865',
            }}
          >
            {/* Título e Ícone */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                mb: 1.5,
              }}
            >
              <ErrorOutline
                sx={{
                  color: '#E91E63',
                  fontSize: 32,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: '#FFF',
                    fontSize: '15px',
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  Boleto vencido ({invoice.type})
                </Typography>
                <Typography
                  sx={{
                    color: '#FFF',
                    fontSize: '14px',
                    mb: 0.3,
                  }}
                >
                  {invoice.dueDate}
                </Typography>
                <Typography
                  sx={{
                    color: '#B0BEC5',
                    fontSize: '13px',
                  }}
                >
                  R$ {invoice.amount.toFixed(2).replace('.', ',')} - {index + 1}/{financialStatus.invoices.length}
                </Typography>
              </Box>
            </Box>

            {/* Botão Negociar */}
            <Button
              fullWidth
              onClick={() => navigate('/stub/Negociar Boleto')}
              sx={{
                py: 1,
                backgroundColor: 'transparent',
                color: '#E91E63',
                border: '2px solid #E91E63',
                borderRadius: 8,
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(233, 30, 99, 0.1)',
                  border: '2px solid #E91E63',
                },
              }}
            >
              Negociar
            </Button>
          </Box>
        ))}
      </Box>

      {/* Menu Items */}
      <Box sx={{ px: 2 }}>
        {menuItems.map((item, index) => (
          <Box
            key={index}
            onClick={() => navigate(`/stub/${item.label}`)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2.5,
              borderBottom: '1px solid #1E4A6F',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.05)',
              },
            }}
          >
            <Typography
              sx={{
                color: '#FFF',
                fontSize: '15px',
              }}
            >
              {item.label}
            </Typography>
            {item.hasArrow ? (
              <ArrowForward sx={{ color: '#B0BEC5', fontSize: 20 }} />
            ) : (
              <ChevronRight sx={{ color: '#B0BEC5', fontSize: 24 }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FinancialPage;
