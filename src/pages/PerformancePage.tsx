import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MessageIcon from '@mui/icons-material/Message';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const PerformancePage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  return (
    <Box sx={{ width: '100%', backgroundColor: '#0d3865', minHeight: '100vh', pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: '#0d3865',
        }}
      >
        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 600 }}>
          Desempenho
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton sx={{ color: '#FFF' }} onClick={() => navigate('/messages')}>
            <MessageIcon />
          </IconButton>
          <IconButton sx={{ color: '#FFF' }}>
            <CalendarTodayIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Course Card */}
      <Box sx={{ px: 3, pt: 2 }}>
        <Box
          onClick={() => navigate(`/course/${currentUser.course.id}`)}
          sx={{
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            p: 2.5,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
          }}
        >
          <Typography
            sx={{
              color: '#FFF',
              fontSize: '0.9375rem',
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            {currentUser.course.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PerformancePage;
