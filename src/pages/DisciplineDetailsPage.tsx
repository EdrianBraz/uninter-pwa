import { Box, Typography, Chip, LinearProgress } from '@mui/material';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockDataService } from '../services/mockDataService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';

const DisciplineDetailsPage: React.FC = () => {
  const { disciplineId } = useParams<{ disciplineId: string }>();
  const [searchParams] = useSearchParams();
  const returnTab = searchParams.get('returnTab');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    if (returnTab) {
      navigate(`/course/${currentUser?.course.id}?tab=${returnTab}`);
    } else {
      navigate(-1);
    }
  };

  if (!currentUser || !disciplineId) return null;

  const discipline = mockDataService.getDisciplineDetails(currentUser, disciplineId);
  if (!discipline) return <Typography>Disciplina não encontrada</Typography>;

  const renderProgressBar = (label: string, value: number | null) => {
    const displayValue = value !== null ? value : 0;
    const barColor = displayValue >= 70 ? '#4CAF50' : displayValue >= 50 ? '#FFC107' : '#E53935';

    return (
      <Box
        sx={{
          backgroundColor: '#1A3A52',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          p: 2.5,
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography sx={{ color: '#FFF', fontSize: '0.9375rem', fontWeight: 400 }}>
            {label}
          </Typography>
          <Typography sx={{ color: '#FFF', fontSize: '0.9375rem', fontWeight: 600 }}>
            {value !== null ? value : 0}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={displayValue}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: barColor,
              borderRadius: 4,
            },
          }}
        />
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: '#0d3865', minHeight: '100vh', pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          backgroundColor: '#0d3865',
        }}
      >
        <ArrowBackIcon 
          sx={{ color: '#FFF', cursor: 'pointer' }} 
          onClick={handleBack}
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#FFF', 
            fontWeight: 600,
            fontSize: '1rem',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {discipline.name}
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {/* Module Info Card */}
        <Box
          sx={{
            backgroundColor: 'transparent',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            p: 2.5,
            mb: 3,
          }}
        >
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8125rem', mb: 1.5 }}>
            {discipline.module}
          </Typography>
          <Chip
            icon={<CheckIcon sx={{ fontSize: 16, color: '#FFF !important' }} />}
            label="Apr.média"
            sx={{
              backgroundColor: '#4CAF50',
              color: '#FFF',
              fontSize: '0.75rem',
              height: '28px',
              fontWeight: 500,
              '& .MuiChip-icon': {
                marginLeft: '8px',
              },
            }}
          />
        </Box>

        {/* Performance Metrics */}
        {renderProgressBar('Média da disciplina', discipline.averageGrade)}
        {renderProgressBar('Média dos exames', discipline.examGrade)}
        {renderProgressBar('Frequência', discipline.attendance)}
        {renderProgressBar('Resultado final', discipline.finalResult)}
      </Box>
    </Box>
  );
};

export default DisciplineDetailsPage;
