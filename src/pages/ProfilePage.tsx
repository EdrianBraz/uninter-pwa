import { Box, Typography, IconButton, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuSections = [
    {
      title: 'Recursos do aluno',
      items: [
        { label: 'Polo (Local das provas presenciais)', route: '/stub/Polo' },
        { label: 'Manual do aluno', route: '/stub/Manual do Aluno' },
      ],
    },
    {
      title: 'Pessoal',
      items: [
        { label: 'Solicitações', route: '/stub/Solicitações' },
        { label: 'Biblioteca', route: '/stub/Biblioteca' },
        { label: 'Carteira estudantil', route: '/student-card' },
      ],
    },
    {
      title: 'Outros',
      items: [{ label: 'Financeiro', route: '/financial' }],
    },
  ];

  return (
    <Box 
      sx={{ 
        width: '100%',
        backgroundColor: '#0d3865',
        minHeight: '100vh', 
        pb: 10 
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: '#0d3865',
        }}
      >
        <Typography 
          variant="h6"
          sx={{ 
            fontWeight: 600, 
            fontSize: '1.125rem',
            color: '#FFF'
          }}
        >
          {currentUser.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            sx={{ color: '#FFF' }}
            onClick={() => navigate('/messages')}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton 
            sx={{ color: '#FFF' }}
          >
            <CalendarTodayIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Avatar Section */}
      <Box sx={{ 
        width: '100%',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        pt: 2,
        pb: 3,
        position: 'relative'
      }}>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              backgroundColor: '#E8E8E8',
            }}
          >
            <PersonIcon sx={{ fontSize: 60, color: '#BDBDBD' }} />
          </Avatar>
          <IconButton
            onClick={() => navigate('/stub/Configurações')}
            sx={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              backgroundColor: '#2196F3',
              width: 32,
              height: 32,
              border: '3px solid #0d3865',
              '&:hover': {
                backgroundColor: '#1976D2',
              },
            }}
          >
            <SettingsIcon sx={{ fontSize: 16, color: '#FFF' }} />
          </IconButton>
        </Box>
        
        <Button
          variant="outlined"
          onClick={handleLogout}
          endIcon={<ExitToAppIcon />}
          sx={{
            color: '#FFF',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            textTransform: 'none',
            px: 3,
            py: 0.75,
            fontSize: '0.875rem',
            fontWeight: 500,
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          Sair
        </Button>
      </Box>

      {/* Menu Sections */}
      <Box sx={{ width: '100%', px: 3 }}>
        {menuSections.map((section, sectionIndex) => (
          <Box key={sectionIndex} sx={{ mb: 3 }}>
            <Typography
              variant="body1"
              sx={{ 
                color: '#FFF', 
                fontWeight: 500, 
                mb: 2,
                fontSize: '1rem'
              }}
            >
              {section.title}
            </Typography>
            {section.items.map((item, itemIndex) => (
              <Box
                key={itemIndex}
                onClick={() => navigate(item.route)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  py: 2,
                  px: 2,
                  mb: 1,
                  backgroundColor: 'transparent',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <Typography
                  sx={{ 
                    color: '#FFF',
                    fontSize: '0.9375rem',
                    fontWeight: 400,
                  }}
                >
                  {item.label}
                </Typography>
                <ChevronRightIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 24 }} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProfilePage;
