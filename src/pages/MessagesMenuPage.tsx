import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SchoolIcon from '@mui/icons-material/School';
import MailIcon from '@mui/icons-material/Mail';
import CampaignIcon from '@mui/icons-material/Campaign';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  route: string;
  badge?: number;
}

const MessagesMenuPage: React.FC = () => {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      id: 'atendimento',
      label: 'Atendimento online',
      icon: <CheckBoxIcon sx={{ fontSize: 40, color: '#6B9BD1' }} />,
      route: '/messages/atendimento',
    },
    {
      id: 'tutoria',
      label: 'Tutoria',
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#6B9BD1' }} />,
      route: '/messages/tutoria',
    },
    {
      id: 'mensagens',
      label: 'Mensagens',
      icon: <MailIcon sx={{ fontSize: 40, color: '#6B9BD1' }} />,
      route: '/messages/chat',
      badge: 4,
    },
    {
      id: 'avisos',
      label: 'Avisos',
      icon: <CampaignIcon sx={{ fontSize: 40, color: '#6B9BD1' }} />,
      route: '/messages/avisos',
      badge: 7,
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#0d3865', minHeight: '100vh' }}>
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
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#FFF', p: 0.5 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 600 }}>
          Mensagens
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        <Typography variant="body2" sx={{ color: '#B0BEC5', mb: 3 }}>
          Veja aqui todas as suas mensagens
        </Typography>

        {/* Menu Items */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {menuItems.map((item) => (
            <Box
              key={item.id}
              onClick={() => navigate(item.route)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 3,
                backgroundColor: 'transparent',
                border: '1px solid #1E4A6F',
                borderRadius: 2,
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#0d3865',
                  borderColor: '#2196F3',
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </Box>

              {/* Label */}
              <Typography variant="body1" sx={{ color: '#FFF', fontWeight: 500, flex: 1 }}>
                {item.label}
              </Typography>

              {/* Badge */}
              {item.badge && (
                <Box
                  sx={{
                    backgroundColor: '#E91E63',
                    color: '#FFF',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {item.badge}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MessagesMenuPage;
