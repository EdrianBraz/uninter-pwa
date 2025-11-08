import { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Chip } from '@mui/material';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockDataService } from '../services/mockDataService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import type { DisciplineType } from '../types/Discipline';

const CourseDetailsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [currentTab, setCurrentTab] = useState(tabParam ? parseInt(tabParam) : 0);
  const { courseId } = useParams<{ courseId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (tabParam) {
      setCurrentTab(parseInt(tabParam));
    }
  }, [tabParam]);

  if (!currentUser || !courseId) return null;

  const course = mockDataService.getCourseDetails(currentUser, courseId);
  if (!course) return <Typography>Curso não encontrado</Typography>;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const percentCompleted = Math.round((course.completedHours / course.totalHours) * 100);

  // Group disciplines by type
  const disciplinesByType: Record<DisciplineType, typeof course.disciplines> = {
    ACOLHIMENTO: [],
    INTRODUTORIO: [],
    REGULAR: [],
    OPTATIVA: [],
  };

  course.disciplines.forEach(discipline => {
    disciplinesByType[discipline.type].push(discipline);
  });

  const dispensedDisciplines = course.disciplines.filter(d => d.status === 'DISPENSADA');
  const completedDisciplines = course.disciplines.filter(d => d.status === 'CONCLUIDA' || d.status === 'APR_MEDIA');

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
          onClick={() => navigate(-1)}
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
          {course.name}
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 2,
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.6)',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              minWidth: 'auto',
              px: 2,
            },
            '& .Mui-selected': {
              color: '#FFF',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#FFF',
            },
          }}
        >
          <Tab label="Aproveitamento" />
          <Tab label="Dispensa" />
          <Tab label="Grade" />
          <Tab label="Atividades" />
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Tab 0: Aproveitamento */}
        {currentTab === 0 && (
          <Box>
            {completedDisciplines.length > 0 ? (
              completedDisciplines.map(discipline => (
                <Box
                  key={discipline.id}
                  onClick={() => navigate(`/discipline/${discipline.id}?returnTab=0`)}
                  sx={{
                    backgroundColor: '#1A3A52',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    p: 2.5,
                    mb: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#1E4A6F',
                    },
                  }}
                >
                  <Typography sx={{ color: '#FFF', fontSize: '0.9375rem', fontWeight: 600, mb: 1 }}>
                    {discipline.name}
                  </Typography>
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
              ))
            ) : (
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', textAlign: 'center', mt: 4 }}>
                Nenhuma disciplina concluída
              </Typography>
            )}
          </Box>
        )}

        {/* Tab 1: Dispensa */}
        {currentTab === 1 && (
          <Box>
            {dispensedDisciplines.length > 0 ? (
              dispensedDisciplines.map(discipline => (
                <Box
                  key={discipline.id}
                  sx={{
                    backgroundColor: '#1A3A52',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    p: 2.5,
                    mb: 2,
                  }}
                >
                  <Typography sx={{ color: '#FFF', fontSize: '0.9375rem', fontWeight: 600, mb: 1 }}>
                    {discipline.name}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8125rem', mb: 1.5 }}>
                    Módulo: {discipline.module}
                  </Typography>
                  <Chip
                    label={discipline.status}
                    sx={{
                      backgroundColor: '#4CAF50',
                      color: '#FFF',
                      fontSize: '0.75rem',
                      height: '28px',
                      fontWeight: 500,
                    }}
                  />
                </Box>
              ))
            ) : (
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', textAlign: 'center', mt: 4 }}>
                Nenhuma disciplina dispensada
              </Typography>
            )}
          </Box>
        )}

        {/* Tab 2: Grade */}
        {currentTab === 2 && (
          <Box>
            {/* Summary Cards */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#1A3A52',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.7rem', mb: 0.5 }}>
                  Carga Horária Total
                </Typography>
                <Typography sx={{ color: '#FFF', fontSize: '1.5rem', fontWeight: 700 }}>
                  {course.totalHours}
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#1A3A52',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.7rem', mb: 0.5 }}>
                  Carga Horária Cursada
                </Typography>
                <Typography sx={{ color: '#4CAF50', fontSize: '1.5rem', fontWeight: 700 }}>
                  {course.completedHours}
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#1A3A52',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.7rem', mb: 0.5 }}>
                  Percentual cursado
                </Typography>
                <Typography sx={{ color: '#2196F3', fontSize: '1.5rem', fontWeight: 700 }}>
                  {percentCompleted}%
                </Typography>
              </Box>
            </Box>

            {/* Disciplines by Type */}
            {Object.entries(disciplinesByType).map(([type, disciplines]) => {
              if (disciplines.length === 0) return null;
              return (
                <Box key={type} sx={{ mb: 3 }}>
                  <Typography sx={{ color: '#FFF', fontSize: '1rem', fontWeight: 600, mb: 2 }}>
                    {type}
                  </Typography>
                  {disciplines.map(discipline => (
                    <Box
                      key={discipline.id}
                      onClick={() => navigate(`/discipline/${discipline.id}`)}
                      sx={{
                        backgroundColor: '#1A3A52',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        p: 2.5,
                        mb: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#1E4A6F',
                        },
                      }}
                    >
                      <Typography sx={{ color: '#FFF', fontSize: '0.9375rem', fontWeight: 600, mb: 1 }}>
                        {discipline.name}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8125rem', mb: 1.5 }}>
                        Carga horária - {discipline.hours} horas
                      </Typography>
                      <Chip
                        icon={discipline.status === 'CONCLUIDA' ? <CheckIcon sx={{ fontSize: 16, color: '#FFF !important' }} /> : undefined}
                        label={discipline.status === 'CONCLUIDA' ? 'Concluída' : discipline.status === 'EM_ANDAMENTO' ? 'Apr.média' : 'Pendente'}
                        sx={{
                          backgroundColor: discipline.status === 'CONCLUIDA' ? '#4CAF50' : discipline.status === 'EM_ANDAMENTO' ? '#4CAF50' : '#757575',
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
                  ))}
                </Box>
              );
            })}
          </Box>
        )}

        {/* Tab 3: Atividades */}
        {currentTab === 3 && (
          <Box>
            {/* Summary Cards */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#1A3A52',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.7rem', mb: 0.5, lineHeight: 1.3 }}>
                  Total carga Horária Atividades
                </Typography>
                <Typography sx={{ color: '#FFF', fontSize: '1.5rem', fontWeight: 700 }}>
                  0
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#1A3A52',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.7rem', mb: 0.5, lineHeight: 1.3 }}>
                  Total carga Horária da grade
                </Typography>
                <Typography sx={{ color: '#FFF', fontSize: '1.5rem', fontWeight: 700 }}>
                  0
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#1A3A52',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.7rem', mb: 0.5, lineHeight: 1.3 }}>
                  Total carga Horária Faltante
                </Typography>
                <Typography sx={{ color: '#FFF', fontSize: '1.5rem', fontWeight: 700 }}>
                  0
                </Typography>
              </Box>
            </Box>

            {/* Empty State with Illustration */}
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography sx={{ color: '#FFF', fontSize: '1rem', fontWeight: 500, mb: 4 }}>
                Nenhuma disciplina em dispensa
              </Typography>
              
              {/* Illustration */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box sx={{ position: 'relative', width: 120, height: 180 }}>
                  {/* Person */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 40,
                      height: 100,
                      backgroundColor: '#E8E8E8',
                      borderRadius: '20px 20px 0 0',
                    }}
                  />
                  {/* Head */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 90,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 30,
                      height: 30,
                      backgroundColor: '#E8E8E8',
                      borderRadius: '50%',
                    }}
                  />
                  {/* Book in hand */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 60,
                      left: '50%',
                      transform: 'translateX(-50%) rotate(-15deg)',
                      width: 25,
                      height: 18,
                      backgroundColor: '#FFA726',
                      borderRadius: '2px',
                    }}
                  />
                  {/* Floating items */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      width: 20,
                      height: 25,
                      backgroundColor: '#E8E8E8',
                      borderRadius: '2px',
                      transform: 'rotate(15deg)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 25,
                      width: 18,
                      height: 18,
                      backgroundColor: '#4D9FFF',
                      borderRadius: '50%',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 35,
                      right: 15,
                      width: 15,
                      height: 20,
                      backgroundColor: '#E8E8E8',
                      borderRadius: '2px',
                      transform: 'rotate(-20deg)',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CourseDetailsPage;
