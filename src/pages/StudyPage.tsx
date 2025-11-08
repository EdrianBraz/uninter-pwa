import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button, TextField, InputAdornment, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import CodeIcon from '@mui/icons-material/Code';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StudyPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [materialsSubTab, setMaterialsSubTab] = useState(0);
  const [liveClassesSubTab, setLiveClassesSubTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorDialog, setErrorDialog] = useState<{ open: boolean; title: string; message: string }>({
    open: false,
    title: '',
    message: '',
  });
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const materials = (currentUser as any).materials || { sent: [], books: [] };
  const liveClasses = (currentUser as any).liveClasses || [];
  const otherLiveClasses = (currentUser as any).otherLiveClasses || [];

  const getFileIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'PDF':
        return <PictureAsPdfIcon sx={{ color: '#FF5252' }} />;
      case 'ZIP':
        return <FolderZipIcon sx={{ color: '#FDB022' }} />;
      case 'IPYNB':
        return <CodeIcon sx={{ color: '#4D9FFF' }} />;
      default:
        return <PictureAsPdfIcon sx={{ color: '#B0BEC5' }} />;
    }
  };

  const filteredLiveClasses = liveClassesSubTab === 0 
    ? liveClasses.filter((lc: any) => 
        lc.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lc.disciplineName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : otherLiveClasses.filter((lc: any) => 
        lc.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lc.courseName.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleMaterialsSubTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMaterialsSubTab(newValue);
  };

  const handleLiveClassesSubTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setLiveClassesSubTab(newValue);
  };

  const handleMaterialClick = (material: any, action: 'view' | 'download') => {
    // Se for PDF e ação de download, abre o link do Google Drive
    if (material.type.toUpperCase() === 'PDF' && action === 'download') {
      window.open('https://drive.google.com/uc?export=download&id=1alDzW3Jm7F6N3pA_cEMCQekh6s5xMwL5', '_blank');
      return;
    }

    // Para visualizar ou outros tipos de arquivo, mostra erro
    const errorMessages = [
      {
        title: 'Erro ao carregar arquivo',
        message: 'Não foi possível carregar o arquivo. Verifique sua conexão com a internet e tente novamente.',
      },
      {
        title: 'Arquivo temporariamente indisponível',
        message: 'O arquivo está temporariamente indisponível. Por favor, tente novamente mais tarde.',
      },
      {
        title: 'Erro interno do servidor',
        message: 'Ocorreu um erro interno ao processar sua solicitação. Nossa equipe já foi notificada.',
      },
      {
        title: 'Arquivo corrompido',
        message: 'O arquivo pode estar corrompido ou incompleto. Entre em contato com o suporte.',
      },
    ];

    const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    
    setErrorDialog({
      open: true,
      title: randomError.title,
      message: randomError.message,
    });
  };

  const handleBookClick = (_book: any) => {
    const errorMessages = [
      {
        title: 'Conteúdo não disponível',
        message: 'Este conteúdo não está disponível no momento. Tente novamente mais tarde.',
      },
      {
        title: 'Erro de conexão',
        message: 'Não foi possível estabelecer conexão com o servidor. Verifique sua internet.',
      },
      {
        title: 'Acesso restrito',
        message: 'Você não tem permissão para acessar este conteúdo no momento.',
      },
    ];

    const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    
    setErrorDialog({
      open: true,
      title: randomError.title,
      message: randomError.message,
    });
  };

  const handleLiveClassClick = (_liveClass: any) => {
    navigate('/stub/Aula ao Vivo');
  };

  const closeErrorDialog = () => {
    setErrorDialog({ open: false, title: '', message: '' });
  };

  return (
    <Box sx={{ backgroundColor: '#0d3865', minHeight: '100vh', pb: 10 }}>
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
          Estudar
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton sx={{ color: '#FFF' }} onClick={() => navigate('/messages')}>
            <MessageIcon />
          </IconButton>
          <IconButton sx={{ color: '#FFF' }} onClick={() => navigate('/stub/Agenda Completa')}>
            <CalendarTodayIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Main Tabs */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          backgroundColor: '#0d3865',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          '& .MuiTab-root': {
            color: '#B0BEC5',
            fontSize: '0.875rem',
            textTransform: 'none',
            minHeight: 48,
            fontWeight: 400,
          },
          '& .Mui-selected': {
            color: '#FFF',
            fontWeight: 500,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#4D9FFF',
            height: 2,
          },
        }}
      >
        <Tab label="Meus cursos" />
        <Tab label="Todos os materiais" />
        <Tab label="Aulas ao vivo" />
      </Tabs>

      {/* Tab 0: Meus cursos */}
      {currentTab === 0 && (
        <Box sx={{ px: 3, pt: 3 }}>
          {currentUser.course && (
            <>
              <Box
                onClick={() => navigate(`/course/${currentUser.course.id}`)}
                sx={{
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  p: 2.5,
                  mb: 3,
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
                    mb: 1,
                  }}
                >
                  {currentUser.course.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label={currentUser.course.modality} 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(77, 159, 255, 0.2)',
                      color: '#4D9FFF',
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                  <Chip 
                    label={`${currentUser.course.disciplines.length} disciplinas`}
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(77, 159, 255, 0.2)',
                      color: '#4D9FFF',
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                </Box>
              </Box>

              <Button
                fullWidth
                variant="text"
                sx={{
                  color: '#4D9FFF',
                  textTransform: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(77, 159, 255, 0.1)',
                  },
                }}
                onClick={() => navigate('/stub/Cursos Completados')}
              >
                Ver cursos que já completei
              </Button>
            </>
          )}

          {!currentUser.course && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: 'calc(100vh - 250px)',
              textAlign: 'center',
              pt: 4
            }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#FFF',
                  mb: 6,
                  fontWeight: 400,
                  fontSize: '1rem'
                }}
              >
                Nenhum curso encontrado
              </Typography>
          
          {/* Empty state illustration */}
          <Box sx={{ 
            mb: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="180" height="220" viewBox="0 0 180 220" fill="none">
              {/* Person body */}
              <ellipse cx="90" cy="45" rx="22" ry="28" fill="#E8F4FD"/>
              <rect x="68" y="73" width="44" height="90" rx="22" fill="#E8F4FD"/>
              {/* Arms */}
              <rect x="52" y="85" width="16" height="55" rx="8" fill="#E8F4FD"/>
              <rect x="112" y="85" width="16" height="55" rx="8" fill="#E8F4FD"/>
              {/* Legs */}
              <rect x="75" y="158" width="14" height="50" rx="7" fill="#E8F4FD"/>
              <rect x="91" y="158" width="14" height="50" rx="7" fill="#E8F4FD"/>
              {/* Shoes */}
              <ellipse cx="82" cy="208" rx="10" ry="5" fill="#2C5282"/>
              <ellipse cx="98" cy="208" rx="10" ry="5" fill="#2C5282"/>
              {/* Ticket/Key in hand */}
              <rect x="105" y="95" width="28" height="40" rx="4" fill="#FDB022" transform="rotate(-20 105 95)"/>
              <rect x="110" y="100" width="4" height="25" fill="#E8A000" transform="rotate(-20 110 100)"/>
              <rect x="118" y="100" width="4" height="25" fill="#E8A000" transform="rotate(-20 118 100)"/>
              {/* Checkmarks floating */}
              <path d="M 100 20 L 106 26 L 118 14" stroke="#4D9FFF" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 110 32 L 116 38 L 128 26" stroke="#4D9FFF" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <circle cx="105" cy="23" r="2" fill="#4D9FFF" opacity="0.5"/>
              <circle cx="115" cy="35" r="2" fill="#4D9FFF" opacity="0.5"/>
            </svg>
          </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#4D9FFF',
                  color: '#FFF',
                  textTransform: 'none',
                  borderRadius: '30px',
                  py: 1.8,
                  fontSize: '1rem',
                  fontWeight: 500,
                  maxWidth: 380,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#3A7BC8',
                    boxShadow: 'none',
                  },
                }}
              >
                Ver cursos que já completei
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* Tab 1: Todos os materiais */}
      {currentTab === 1 && (
        <Box>
          {/* Sub-tabs for materials */}
          <Box sx={{ 
            px: 2.5, 
            pt: 2.5,
            display: 'flex',
            gap: 1.5
          }}>
            <Button
              variant={materialsSubTab === 0 ? 'contained' : 'outlined'}
              onClick={(e) => handleMaterialsSubTabChange(e, 0)}
              sx={{
                backgroundColor: materialsSubTab === 0 ? '#4D9FFF' : 'transparent',
                color: materialsSubTab === 0 ? '#FFF' : '#B0BEC5',
                borderColor: materialsSubTab === 0 ? '#4D9FFF' : 'rgba(255, 255, 255, 0.3)',
                textTransform: 'none',
                borderRadius: '25px',
                px: 3,
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: materialsSubTab === 0 ? '#3A7BC8' : 'rgba(77, 159, 255, 0.1)',
                  borderColor: '#4D9FFF',
                  boxShadow: 'none',
                },
              }}
            >
              Materiais enviados
            </Button>
            <Button
              variant={materialsSubTab === 1 ? 'contained' : 'outlined'}
              onClick={(e) => handleMaterialsSubTabChange(e, 1)}
              sx={{
                backgroundColor: materialsSubTab === 1 ? '#4D9FFF' : 'transparent',
                color: materialsSubTab === 1 ? '#FFF' : '#B0BEC5',
                borderColor: materialsSubTab === 1 ? '#4D9FFF' : 'rgba(255, 255, 255, 0.3)',
                textTransform: 'none',
                borderRadius: '25px',
                px: 3,
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: materialsSubTab === 1 ? '#3A7BC8' : 'rgba(77, 159, 255, 0.1)',
                  borderColor: '#4D9FFF',
                  boxShadow: 'none',
                },
              }}
            >
              Obras da disciplina
            </Button>
          </Box>

          {/* Materials content */}
          <Box sx={{ px: 2.5, pt: 2 }}>
            {materialsSubTab === 0 && materials.sent.length > 0 && (
              <Box>
                {materials.sent.map((material: any) => (
                  <Box
                    key={material.id}
                    sx={{
                      backgroundColor: '#0d3865',
                      borderRadius: '12px',
                      p: 2.5,
                      mb: 2,
                      border: '1px solid #1E4A6F',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Box sx={{ mt: 0.5 }}>
                        {getFileIcon(material.type)}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ color: '#FFF', fontSize: '0.9375rem', fontWeight: 500, mb: 0.5 }}>
                          {material.title}
                        </Typography>
                        <Typography sx={{ color: '#B0BEC5', fontSize: '0.8125rem', mb: 1 }}>
                          {material.disciplineName}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1.5 }}>
                          <Chip 
                            label={material.type}
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(77, 159, 255, 0.2)',
                              color: '#4D9FFF',
                              fontSize: '0.7rem',
                              height: 22,
                            }}
                          />
                          <Typography sx={{ color: '#B0BEC5', fontSize: '0.75rem' }}>
                            {material.size}
                          </Typography>
                          <Typography sx={{ color: '#B0BEC5', fontSize: '0.75rem' }}>
                            {material.uploadDate}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleMaterialClick(material, 'view')}
                            sx={{
                              color: '#4D9FFF',
                              textTransform: 'none',
                              fontSize: '0.8125rem',
                              '&:hover': {
                                backgroundColor: 'rgba(77, 159, 255, 0.1)',
                              },
                            }}
                          >
                            Visualizar
                          </Button>
                          <Button
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={() => handleMaterialClick(material, 'download')}
                            sx={{
                              color: '#4D9FFF',
                              textTransform: 'none',
                              fontSize: '0.8125rem',
                              '&:hover': {
                                backgroundColor: 'rgba(77, 159, 255, 0.1)',
                              },
                            }}
                          >
                            Baixar
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

            {materialsSubTab === 0 && materials.sent.length === 0 && (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: 'calc(100vh - 280px)',
                textAlign: 'center',
              }}>
                <Typography variant="body1" sx={{ color: '#FFF', mb: 6, fontWeight: 400, fontSize: '1rem' }}>
                  Nenhum material disponível
                </Typography>
                <svg width="200" height="220" viewBox="0 0 200 220" fill="none">
                  <ellipse cx="120" cy="45" rx="22" ry="28" fill="#4D9FFF"/>
                  <rect x="98" y="73" width="44" height="90" rx="22" fill="#E8F4FD"/>
                  <rect x="142" y="85" width="16" height="55" rx="8" fill="#E8F4FD"/>
                  <rect x="82" y="85" width="16" height="55" rx="8" fill="#E8F4FD" transform="rotate(-15 90 85)"/>
                  <rect x="105" y="158" width="14" height="50" rx="7" fill="#E8F4FD"/>
                  <rect x="121" y="158" width="14" height="50" rx="7" fill="#E8F4FD"/>
                  <ellipse cx="112" cy="208" rx="10" ry="5" fill="#2C5282"/>
                  <ellipse cx="128" cy="208" rx="10" ry="5" fill="#2C5282"/>
                  <rect x="30" y="85" width="55" height="70" rx="4" fill="#1E3A5F" opacity="0.4"/>
                  <rect x="35" y="80" width="55" height="70" rx="4" fill="#2C5282"/>
                  <line x1="45" y1="95" x2="75" y2="95" stroke="#B0BEC5" strokeWidth="2.5"/>
                  <line x1="45" y1="105" x2="75" y2="105" stroke="#B0BEC5" strokeWidth="2.5"/>
                  <line x1="45" y1="115" x2="70" y2="115" stroke="#B0BEC5" strokeWidth="2.5"/>
                  <line x1="45" y1="125" x2="75" y2="125" stroke="#B0BEC5" strokeWidth="2.5"/>
                  <circle cx="80" cy="130" r="12" fill="#1E3A5F"/>
                  <circle cx="80" cy="130" r="8" fill="#0d3865"/>
                </svg>
              </Box>
            )}

            {materialsSubTab === 1 && materials.books.length > 0 && (
              <Box>
                {materials.books.map((book: any) => (
                  <Box
                    key={book.id}
                    sx={{
                      backgroundColor: '#0d3865',
                      borderRadius: '12px',
                      p: 2.5,
                      mb: 2,
                      border: '1px solid #1E4A6F',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Box sx={{ mt: 0.5 }}>
                        <MenuBookIcon sx={{ color: '#FDB022', fontSize: 32 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ color: '#FFF', fontSize: '0.9375rem', fontWeight: 500, mb: 0.5 }}>
                          {book.title}
                        </Typography>
                        <Typography sx={{ color: '#B0BEC5', fontSize: '0.8125rem', mb: 0.5 }}>
                          {book.author}
                        </Typography>
                        <Typography sx={{ color: '#B0BEC5', fontSize: '0.8125rem', mb: 1 }}>
                          {book.disciplineName}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1.5 }}>
                          <Typography sx={{ color: '#B0BEC5', fontSize: '0.75rem' }}>
                            {book.publisher} • {book.year}
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleBookClick(book)}
                          sx={{
                            color: '#4D9FFF',
                            textTransform: 'none',
                            fontSize: '0.8125rem',
                            '&:hover': {
                              backgroundColor: 'rgba(77, 159, 255, 0.1)',
                            },
                          }}
                        >
                          Acessar obra
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

            {materialsSubTab === 1 && materials.books.length === 0 && (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: 'calc(100vh - 280px)',
                textAlign: 'center',
              }}>
                <Typography variant="body1" sx={{ color: '#FFF', mb: 6, fontWeight: 400, fontSize: '1rem' }}>
                  Nenhuma obra disponível
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Tab 2: Aulas ao vivo */}
      {currentTab === 2 && (
        <Box>
          {/* Sub-tabs for live classes */}
          <Box sx={{ 
            px: 2.5, 
            pt: 2.5,
            display: 'flex',
            gap: 1.5
          }}>
            <Button
              variant={liveClassesSubTab === 0 ? 'contained' : 'outlined'}
              onClick={(e) => handleLiveClassesSubTabChange(e, 0)}
              sx={{
                backgroundColor: liveClassesSubTab === 0 ? '#4D9FFF' : 'transparent',
                color: liveClassesSubTab === 0 ? '#FFF' : '#B0BEC5',
                borderColor: liveClassesSubTab === 0 ? '#4D9FFF' : 'rgba(255, 255, 255, 0.3)',
                textTransform: 'none',
                borderRadius: '25px',
                px: 3,
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: liveClassesSubTab === 0 ? '#3A7BC8' : 'rgba(77, 159, 255, 0.1)',
                  borderColor: '#4D9FFF',
                  boxShadow: 'none',
                },
              }}
            >
              Aulas ao vivo do curso
            </Button>
            <Button
              variant={liveClassesSubTab === 1 ? 'contained' : 'outlined'}
              onClick={(e) => handleLiveClassesSubTabChange(e, 1)}
              sx={{
                backgroundColor: liveClassesSubTab === 1 ? '#4D9FFF' : 'transparent',
                color: liveClassesSubTab === 1 ? '#FFF' : '#B0BEC5',
                borderColor: liveClassesSubTab === 1 ? '#4D9FFF' : 'rgba(255, 255, 255, 0.3)',
                textTransform: 'none',
                borderRadius: '25px',
                px: 3,
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: liveClassesSubTab === 1 ? '#3A7BC8' : 'rgba(77, 159, 255, 0.1)',
                  borderColor: '#4D9FFF',
                  boxShadow: 'none',
                },
              }}
            >
              Outras aulas
            </Button>
          </Box>

          {/* Search field */}
          <Box sx={{ px: 2.5, pt: 2.5 }}>
            <TextField
              fullWidth
              placeholder="Pesquisar"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#B0BEC5' }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'transparent',
                  borderRadius: '30px',
                  color: '#FFF',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4D9FFF',
                  },
                },
              }}
              sx={{
                '& .MuiInputBase-input::placeholder': {
                  color: '#B0BEC5',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Live classes content */}
          <Box sx={{ px: 2.5, pt: 2 }}>
            {filteredLiveClasses.length > 0 ? (
              <Box>
                {filteredLiveClasses.map((liveClass: any) => (
                  <Box
                    key={liveClass.id}
                    onClick={() => handleLiveClassClick(liveClass)}
                    sx={{
                      backgroundColor: '#0d3865',
                      borderRadius: '12px',
                      p: 2.5,
                      mb: 2,
                      border: '1px solid #1E4A6F',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#1E4A6F',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Box sx={{ mt: 0.5 }}>
                        <VideoCallIcon sx={{ color: '#4D9FFF', fontSize: 32 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ color: '#FFF', fontSize: '0.9375rem', fontWeight: 500, mb: 0.5 }}>
                          {liveClass.topic}
                        </Typography>
                        <Typography sx={{ color: '#B0BEC5', fontSize: '0.8125rem', mb: 1 }}>
                          {liveClass.disciplineName || liveClass.courseName}
                        </Typography>
                        <Typography sx={{ color: '#B0BEC5', fontSize: '0.8125rem', mb: 1.5 }}>
                          {liveClass.instructor}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon sx={{ fontSize: 14, color: '#B0BEC5' }} />
                            <Typography sx={{ color: '#B0BEC5', fontSize: '0.75rem' }}>
                              {liveClass.date}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 14, color: '#B0BEC5' }} />
                            <Typography sx={{ color: '#B0BEC5', fontSize: '0.75rem' }}>
                              {liveClass.startTime} - {liveClass.endTime}
                            </Typography>
                          </Box>
                          <Chip 
                            label={liveClass.status === 'scheduled' ? 'Agendada' : 'Aberta'}
                            size="small"
                            sx={{ 
                              backgroundColor: liveClass.status === 'scheduled' ? 'rgba(77, 159, 255, 0.2)' : 'rgba(76, 175, 80, 0.2)',
                              color: liveClass.status === 'scheduled' ? '#4D9FFF' : '#4CAF50',
                              fontSize: '0.7rem',
                              height: 22,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: 'calc(100vh - 340px)',
                textAlign: 'center',
              }}>
                <Typography variant="body1" sx={{ color: '#FFF', mb: 6, fontWeight: 400, fontSize: '1rem' }}>
                  Nenhuma aula ao vivo disponível
                </Typography>
                <svg width="200" height="220" viewBox="0 0 200 220" fill="none">
                  <ellipse cx="90" cy="45" rx="22" ry="28" fill="#FDB022"/>
                  <rect x="68" y="73" width="44" height="90" rx="22" fill="#E8F4FD"/>
                  <rect x="52" y="85" width="16" height="55" rx="8" fill="#E8F4FD"/>
                  <rect x="112" y="85" width="16" height="55" rx="8" fill="#E8F4FD" transform="rotate(25 112 85)"/>
                  <rect x="75" y="158" width="14" height="50" rx="7" fill="#E8F4FD"/>
                  <rect x="91" y="158" width="14" height="50" rx="7" fill="#E8F4FD"/>
                  <ellipse cx="82" cy="208" rx="10" ry="5" fill="#2C5282"/>
                  <ellipse cx="98" cy="208" rx="10" ry="5" fill="#2C5282"/>
                  <rect x="120" y="75" width="65" height="45" rx="4" fill="#1E3A5F"/>
                  <rect x="125" y="80" width="55" height="35" rx="2" fill="#0d3865"/>
                  <line x1="135" y1="90" x2="170" y2="90" stroke="#4D9FFF" strokeWidth="2.5"/>
                  <line x1="135" y1="98" x2="165" y2="98" stroke="#4D9FFF" strokeWidth="2.5"/>
                  <line x1="135" y1="106" x2="170" y2="106" stroke="#4D9FFF" strokeWidth="2.5"/>
                  <rect x="148" y="120" width="8" height="15" fill="#1E3A5F"/>
                  <rect x="140" y="135" width="24" height="4" rx="2" fill="#1E3A5F"/>
                </svg>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Error Dialog */}
      <Dialog
        open={errorDialog.open}
        onClose={closeErrorDialog}
        PaperProps={{
          sx: {
            backgroundColor: '#0d3865',
            borderRadius: '16px',
            border: '1px solid #1E4A6F',
            minWidth: 320,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
          <ErrorOutlineIcon sx={{ color: '#FF5252', fontSize: 28 }} />
          <Typography sx={{ color: '#FFF', fontSize: '1.125rem', fontWeight: 600 }}>
            {errorDialog.title}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography sx={{ color: '#B0BEC5', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            {errorDialog.message}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
          <Button
            onClick={closeErrorDialog}
            variant="contained"
            sx={{
              backgroundColor: '#4D9FFF',
              color: '#FFF',
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              py: 1,
              fontSize: '0.9375rem',
              fontWeight: 500,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#3A7BC8',
                boxShadow: 'none',
              },
            }}
          >
            Entendi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudyPage;
