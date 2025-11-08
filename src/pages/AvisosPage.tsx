import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface Aviso {
  id: string;
  title: string;
  date: string;
  unread: boolean;
}

const AvisosPage: React.FC = () => {
  const navigate = useNavigate();
  const [avisos, setAvisos] = useState<Aviso[]>([
    {
      id: '1',
      title: 'PRÊMIO RECLAME AQUI',
      date: '24/09/2025',
      unread: true,
    },
    {
      id: '2',
      title: '29. 10/04: Pop-UP - Aula Atores Não estatais e a Agenda de segurança na América do Sul.',
      date: '10/04/2023',
      unread: false,
    },
    {
      id: '3',
      title: '20. 12/09: GRAD – EXAME início de realização B1',
      date: '12/09/2022',
      unread: false,
    },
    {
      id: '4',
      title: 'Aviso de instabilidade no sistema',
      date: '22/08/2022',
      unread: false,
    },
    {
      id: '5',
      title: 'Prova Online - esclarecimentos',
      date: '12/05/2022',
      unread: false,
    },
    {
      id: '6',
      title: 'agora vai',
      date: '10/03/2022',
      unread: false,
    },
    {
      id: '7',
      title: 'POP-UP DISCORD NCPU',
      date: '10/03/2022',
      unread: false,
    },
    {
      id: '8',
      title: 'Pop-up DISCORD ADS',
      date: '07/03/2022',
      unread: false,
    },
  ]);

  const handleDelete = (id: string) => {
    setAvisos((prev) => prev.filter((aviso) => aviso.id !== id));
  };

  return (
    <Box sx={{ backgroundColor: '#0d3865', minHeight: '100vh', pb: 2 }}>
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
          Avisos
        </Typography>
      </Box>

      {/* Avisos List */}
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {avisos.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" sx={{ color: '#B0BEC5' }}>
              Nenhum aviso disponível
            </Typography>
          </Box>
        ) : (
          avisos.map((aviso) => (
            <Box
              key={aviso.id}
              sx={{
                backgroundColor: 'transparent',
                border: '1px solid #1E4A6F',
                borderRadius: 2,
                p: 2,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#0d3865',
                  borderColor: '#2196F3',
                },
              }}
            >
              {/* Unread Indicator */}
              {aviso.unread && (
                <FiberManualRecordIcon
                  sx={{
                    color: '#E91E63',
                    fontSize: 12,
                    mt: 0.5,
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#FFF',
                    fontWeight: aviso.unread ? 600 : 500,
                    mb: 0.5,
                    wordBreak: 'break-word',
                  }}
                >
                  {aviso.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#B0BEC5',
                    fontSize: '0.75rem',
                  }}
                >
                  {aviso.date}
                </Typography>
              </Box>

              {/* Delete Button */}
              <IconButton
                onClick={() => handleDelete(aviso.id)}
                sx={{
                  color: '#B0BEC5',
                  flexShrink: 0,
                  '&:hover': {
                    color: '#E91E63',
                    backgroundColor: 'rgba(233, 30, 99, 0.1)',
                  },
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default AvisosPage;
