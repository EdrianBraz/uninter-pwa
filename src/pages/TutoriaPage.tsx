import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TutoriaPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState('todos');
  const [message, setMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const courses = [
    { value: 'todos', label: 'Todos os cursos' },
    { value: 'ads', label: 'Análise e Desenvolvimento de Sistemas' },
    { value: 'gestao', label: 'Gestão de TI' },
    { value: 'redes', label: 'Redes de Computadores' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setShowSuccessDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    setMessage('');
    navigate('/messages');
  };

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
          Tutoria
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {/* Course Selector */}
        <Typography variant="body2" sx={{ color: '#FFF', mb: 1.5, fontWeight: 500 }}>
          Selecionar curso
        </Typography>
        <Select
          fullWidth
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          IconComponent={KeyboardArrowDownIcon}
          sx={{
            mb: 3,
            backgroundColor: 'transparent',
            color: '#B0BEC5',
            border: '1px solid #1E4A6F',
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover': {
              borderColor: '#2196F3',
            },
            '& .MuiSelect-icon': {
              color: '#B0BEC5',
            },
          }}
        >
          {courses.map((course) => (
            <MenuItem key={course.value} value={course.value}>
              {course.label}
            </MenuItem>
          ))}
        </Select>

        {/* Empty State */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1" sx={{ color: '#FFF', mb: 3, fontWeight: 500 }}>
            Nenhuma tutoria localizada
          </Typography>

          {/* Illustration */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 200,
                height: 140,
                backgroundColor: '#1E4A6F',
                borderRadius: 2,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '8px solid #0d3865',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 20,
                  backgroundColor: '#0d3865',
                  borderRadius: '0 0 8px 8px',
                },
              }}
            >
              <Box
                sx={{
                  width: 160,
                  height: 100,
                  backgroundColor: '#FFF',
                  borderRadius: 1,
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gridTemplateRows: '1fr 1fr',
                  gap: 1,
                  p: 1.5,
                }}
              >
                <Box
                  sx={{
                    gridRow: '1 / 3',
                    backgroundColor: '#E3F2FD',
                    borderRadius: 1,
                    border: '2px solid #1E4A6F',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 20,
                      backgroundColor: '#2196F3',
                      borderRadius: '50% 50% 0 0',
                    }}
                  />
                  <Box
                    sx={{
                      width: 20,
                      height: 25,
                      backgroundColor: '#FFA726',
                      borderRadius: '0 0 10px 10px',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#E3F2FD',
                    borderRadius: 1,
                    border: '2px solid #1E4A6F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: '#2196F3',
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#E3F2FD',
                    borderRadius: 1,
                    border: '2px solid #1E4A6F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: '#2196F3',
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Message Input */}
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Digite sua mensagem para a tutoria..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#0d3865',
                color: '#FFF',
                borderRadius: 2,
                '& fieldset': {
                  borderColor: '#1E4A6F',
                },
                '&:hover fieldset': {
                  borderColor: '#2196F3',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196F3',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#B0BEC5',
                opacity: 0.7,
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            sx={{
              backgroundColor: '#2196F3',
              color: '#FFF',
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#1976D2',
              },
              '&:disabled': {
                backgroundColor: '#1E4A6F',
                color: '#B0BEC5',
              },
            }}
          >
            Enviar mensagem
          </Button>
        </Box>
      </Box>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            backgroundColor: '#0d3865',
            borderRadius: 3,
            border: '1px solid #1E4A6F',
            minWidth: 300,
          },
        }}
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Typography variant="h4" sx={{ color: '#FFF' }}>
              ✓
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: '#FFF', mb: 1, fontWeight: 600 }}>
            Mensagem enviada!
          </Typography>
          <Typography variant="body2" sx={{ color: '#B0BEC5' }}>
            Sua mensagem foi enviada para a tutoria com sucesso.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              backgroundColor: '#2196F3',
              color: '#FFF',
              px: 4,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#1976D2',
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TutoriaPage;
