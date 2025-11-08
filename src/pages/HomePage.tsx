import { Box, Typography, IconButton, SvgIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MessageIcon from '@mui/icons-material/Message';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Custom SVG Icons
const CursosIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 22 22">
    <path fill="currentColor" d="M19 2v18h-1v1H4v-1H3v-2H1v-2h2v-4H1v-2h2V6H1V4h2V2h1V1h14v1zm-5 7h-1V8h-1v1h-1v1h-1V3H7v16h10V3h-2v7h-1zM3 4v2h2V4zm2 6H3v2h2zm0 6H3v2h2z"/>
  </SvgIcon>
);

const FinanceiroIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path fill="currentColor" d="M18 3H2v18h18v-4h2V7h-2V3h-2zm0 14v2H4V5h14v2h-8v10h8zm2-2h-8V9h8v6zm-4-4h-2v2h2v-2z"/>
  </SvgIcon>
);

const MensagensIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <circle cx="12" cy="11" r="1" fill="currentColor"/>
    <circle cx="16" cy="11" r="1" fill="currentColor"/>
    <circle cx="8" cy="11" r="1" fill="currentColor"/>
    <path fill="currentColor" d="M19 3H5a3 3 0 0 0-3 3v15a1 1 0 0 0 .51.87A1 1 0 0 0 3 22a1 1 0 0 0 .51-.14L8 19.14a1 1 0 0 1 .55-.14H19a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Zm1 13a1 1 0 0 1-1 1H8.55a3 3 0 0 0-1.55.43l-3 1.8V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"/>
  </SvgIcon>
);

const CarteirinhaIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path fill="currentColor" d="M18 13q.425 0 .713-.288T19 12t-.288-.712T18 11h-3q-.425 0-.712.288T14 12t.288.713T15 13zm0-3q.425 0 .713-.288T19 9t-.288-.712T18 8h-3q-.425 0-.712.288T14 9t.288.713T15 10zm-9 3q-.9 0-1.625.163t-1.275.512q-.525.325-.8.738t-.275.887q0 .3.225.5t.55.2h6.4q.325 0 .55-.213t.225-.537q0-.425-.275-.825t-.8-.75q-.55-.35-1.275-.513T9 13m0-1q.825 0 1.412-.587T11 10t-.587-1.412T9 8t-1.412.588T7 10t.588 1.413T9 12m-5 8q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h16V6H4zm0 0V6z"/>
  </SvgIcon>
);

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const quickAccessItems = [
    { label: 'Cursos', icon: CursosIcon, route: '/study' },
    { label: 'Financeiro', icon: FinanceiroIcon, route: '/financial' },
    { label: 'Mensagens', icon: MensagensIcon, route: '/messages' },
    { label: 'Carteirinha', icon: CarteirinhaIcon, route: '/student-card' },
  ];

  return (
    <Box sx={{ backgroundColor: '#0d3865', minHeight: '100vh', pb: 8 }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: '#0d3865',
          borderBottom: '1px solid #1e4a6f',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#FFA726',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#FFF',
              fontSize: '16px',
            }}
          >
            UV
          </Box>
          <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 700, fontSize: '18px' }}>
            univirtus
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton 
            sx={{ 
              color: '#858be3',
              '&:hover': { color: '#FFF', backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }} 
            onClick={() => navigate('/messages')}
          >
            <MessageIcon sx={{ fontSize: 24 }} />
          </IconButton>
          <IconButton 
            sx={{ 
              color: '#858be3',
              '&:hover': { color: '#FFF', backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }} 
            onClick={() => navigate('/calendar')}
          >
            <CalendarTodayIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Aulas ao vivo - Meus cursos */}
        <Typography variant="body1" sx={{ mb: 2, color: '#FFF', fontWeight: 600, fontSize: '16px' }}>
          Aulas ao vivo - Meus cursos
        </Typography>
        <Box
          sx={{
            backgroundColor: '#0d3865',
            borderRadius: 2,
            pt: 1,
            mb: 1,
            textAlign: 'center',
            border: '2px solid #122b3fff',
          }}
        >
          <Typography variant="body2" sx={{ color: '#858be3', mb: 3, fontSize: '14px',fontWeight: 800 }}>
            Você ainda não tem nenhuma aula ao vivo
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <img 
              src="/src/utils/logoHome2.png" 
              alt="Sem aulas ao vivo"
              style={{
                width: '240px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>

        {/* Acesso rápido */}
        <Typography variant="body1" sx={{ mb: 2.5, color: '#FFF', fontWeight: 600, fontSize: '16px' }}>
          Acesso rápido
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 5, px: 1 }}>
          {quickAccessItems.map(item => (
            <Box
              key={item.label}
              onClick={() => navigate(item.route)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  backgroundColor: '#002a4f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1.5,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                <item.icon sx={{ fontSize: 32, color: '#5DADE2' }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#858be3', textAlign: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Minha agenda */}
        <Typography variant="body1" sx={{ mb: 2, color: '#FFF', fontWeight: 600, fontSize: '16px' }}>
          Minha agenda
        </Typography>
        <Box
          sx={{
            backgroundColor: '#0d3865',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            mb: 3,
          }}
        >
          <Typography variant="body2" sx={{ color: '#858be3', mb: 3, fontSize: '14px' }}>
            Você não possui eventos para este período
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <img 
              src="/src/utils/logoHome.png" 
              alt="Sem eventos na agenda"
              style={{
                width: '220px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: '#5DADE2',
              mt: 2,
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '14px',
              '&:hover': { 
                textDecoration: 'underline',
                color: '#85C1E9',
              },
            }}
            onClick={() => navigate('/calendar')}
          >
            Ver agenda completa
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
