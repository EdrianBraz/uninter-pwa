import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowBack, KeyboardArrowDown } from '@mui/icons-material';
import logWhite from '../utils/logWhite.png';
import LogoBlack from '../utils/LogoBlack.png';
import cardWhite from '../utils/cardWhite.png';
import CardBlack from '../utils/CardBlack.png';

const StudentCardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  if (!currentUser) return null;

  // Formata o QR Code no padrão especificado
  const formatQRData = () => {
    const name = currentUser.name.toUpperCase();
    const validity = currentUser.cardValidity.split('/').reverse().join('/');
    const course = currentUser.course.name.toUpperCase();
    
    return `RU${currentUser.ru}<<<${name}<<VAL${validity}<<<${course}`;
  };

  const qrData = formatQRData();

  // Formata a data atual
  const now = new Date();
  const currentDate = now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const currentTime = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#1e3a5f',
        position: 'relative',
        pb: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 2,
          backgroundColor: '#1e3a5f',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: '#fff' }}>
            <ArrowBack />
          </IconButton>
          <Typography
            sx={{
              color: '#fff',
              fontSize: '20px',
              fontWeight: 500,
            }}
          >
            Carteira Estudantil
          </Typography>
        </Box>
        <IconButton sx={{ color: '#fff' }}>
          <KeyboardArrowDown />
        </IconButton>
      </Box>

      {/* Card Container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          pt: 2,
        }}
      >
        {/* Carteirinha */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 900,
            backgroundColor: isFlipped ? 'transparent' : '#fff',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            p: isFlipped ? 0 : 3,
            position: 'relative',
            border: isFlipped ? 'none' : '3px solid #2c2c2c',
            overflow: 'hidden',
          }}
        >
          {!isFlipped ? (
            // FRENTE
            <>
              {/* Header da Carteirinha */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                  pb: 1,
                  borderBottom: '1px solid #d0d0d0',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '30px',
                      fontWeight: 700,
                      color: '#1e3a5f',
                      letterSpacing: '0.5px',
                    }}
                  >
                    UNINTER
                  </Typography>
                  <img 
                    src={logWhite} 
                    alt="Logo UNINTER" 
                    style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                  />
                </Box>
                
                {/* Ícone de cartão no canto - Botão de girar */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                  }}
                  sx={{
                    p: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    },
                  }}
                >
                  <img 
                    src={cardWhite} 
                    alt="Girar cartão" 
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                </IconButton>
              </Box>

              {/* Subtítulo */}
              <Typography
                sx={{
                  fontSize: '11px',
                  color: '#333',
                  mb: 0.5,
                  mt: 1.5,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}
              >
                CENTRO UNIVERSITÁRIO INTERNACIONAL UNINTER
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#333',
                  mb: 2,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                CARTEIRINHA DE IDENTIDADE ESTUDANTIL
              </Typography>

              {/* Informações do Aluno */}
              <Box sx={{ mb: 2 }}>
                <InfoRow label="ALUNO:" value={currentUser.name.toUpperCase()} />
                <InfoRow label="CURSO:" value={currentUser.course.name.toUpperCase()} />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <InfoRow label="CAMPUS/PAP:" value={currentUser.campus.toUpperCase()} />
                    <InfoRow label="RU:" value={currentUser.ru} />
                    <InfoRow label="CPF:" value={currentUser.cpf} />
                    <InfoRow label="VALIDADE:" value={currentUser.cardValidity} />
                    <InfoRow label="DATA:" value={`${currentDate}    ${currentTime}`} />
                  </Box>
                </Box>
              </Box>

              {/* QR Code */}
              <Box
                sx={{
                  position: 'absolute',
                  right: 16,
                  bottom: 16,
                  backgroundColor: '#fff',
                  p: 0.5,
                  borderRadius: '6px',
                  border: '2px solid #333',
                  maxWidth: '25%',
                  maxHeight: '25%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <QRCode 
                  value={qrData} 
                  size={80}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '80px',
                  }}
                />
              </Box>


            </>
          ) : (
            // VERSO
            <Box
              sx={{
                background: 'linear-gradient(135deg, #2c5282 0%, #1e3a5f 100%)',
                borderRadius: '20px',
                p: 3,
                color: '#fff',
                position: 'relative',
                border: '3px solid #2c2c2c',
              }}
            >
              {/* Header do Verso */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 0.5,
                  pb: 0.5,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '30px',
                      fontWeight: 700,
                      color: '#fff',
                      letterSpacing: '0.5px',
                    }}
                  >
                    UNINTER
                  </Typography>
                  <img 
                    src={LogoBlack} 
                    alt="Logo UNINTER" 
                    style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                  />
                </Box>
                
                {/* Ícone de cartão no canto - Botão de girar */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                  }}
                  sx={{
                    p: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    },
                  }}
                >
                  <img 
                    src={CardBlack} 
                    alt="Girar cartão" 
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                </IconButton>
              </Box>

              {/* Subtítulo */}
              <Typography
                sx={{
                  fontSize: '11px',
                  color: '#fff',
                  mb: 0.3,
                  mt: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}
              >
                CENTRO UNIVERSITÁRIO INTERNACIONAL UNINTER
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#fff',
                  mb: 1.5,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                CARTEIRINHA DE IDENTIDADE ESTUDANTIL
              </Typography>

              {/* Texto informativo */}
              <Typography
                sx={{
                  fontSize: '10px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 1.5,
                  lineHeight: 1.4,
                  textAlign: 'justify',
                }}
              >
                Emitida com a finalidade de controle de acesso dos estudantes nas dependências da Instituição de Ensino. Válida somente com a apresentação de documento de identidade.
              </Typography>

              {/* Lista numerada */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontSize: '9px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 0.7,
                    lineHeight: 1.5,
                    textAlign: 'justify',
                  }}
                >
                  <strong>1.</strong> É indispensável a apresentação desta identificação para a entrada nas dependências da Instituição de Ensino.
                </Typography>
                <Typography
                  sx={{
                    fontSize: '9px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 0.7,
                    lineHeight: 1.5,
                    textAlign: 'justify',
                  }}
                >
                  <strong>2.</strong> A utilização da carteirinha para outros fins, que não seja para acesso às dependências do Polo/IES, será de total responsabilidade do aluno.
                </Typography>
                <Typography
                  sx={{
                    fontSize: '9px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 1.5,
                    lineHeight: 1.5,
                    textAlign: 'justify',
                  }}
                >
                  <strong>3.</strong> Para validação do usuário desta Carteira Estudantil poderá ser exigido um documento de identificação oficial (RG Civil, CNH ou CTPS).
                </Typography>
              </Box>

              {/* Linha separadora */}
              <Box
                sx={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  mb: 1.5,
                }}
              />

              {/* Assinatura */}
              <Box sx={{ textAlign: 'center', mb: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: '24px',
                    fontFamily: 'cursive',
                    color: '#fff',
                    mb: 0.3,
                  }}
                >
                  Uninter
                </Typography>
              </Box>

              {/* Registro */}
              <Typography
                sx={{
                  fontSize: '8px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'center',
                }}
              >
                Registro ft. 37, livro de registro nº 1733m – 7º tabelião de Curitiba - PR
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Componente auxiliar para as linhas de informação
const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Box
    sx={{
      display: 'flex',
      gap: 1,
      mb: 0.4,
    }}
  >
    <Typography
      sx={{
        fontSize: '11px',
        color: '#000',
        fontWeight: 700,
        minWidth: 'fit-content',
        lineHeight: 1.3,
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: '11px',
        color: '#000',
        fontWeight: 400,
        lineHeight: 1.3,
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default StudentCardPage;
