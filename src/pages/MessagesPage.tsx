import { useState } from 'react';
import { Box, Typography, IconButton, Tabs, Tab, Avatar, Badge, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'system';
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  badge: string;
  messages: Message[];
  unread?: boolean;
}

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    if (!currentUser) return [];
    
    return [
    {
      id: '1',
      name: 'DOUGLAS DA SILVA BREMM',
      avatar: 'D',
      badge: 'Cma',
      unread: false,
      messages: [
        {
          id: '1',
          text: `Oi ${currentUser.name.toUpperCase()}, Tudo bem com você?`,
          timestamp: '24/04/2023 - 10:52',
          sender: 'system',
        },
        {
          id: '2',
          text: 'Percebi que já faz um tempo que você não acessa o seu AVA. Posso te ajudar de alguma maneira?',
          timestamp: '24/04/2023 - 10:52',
          sender: 'system',
        },
        {
          id: '3',
          text: 'Se você estiver com alguma dificuldade pode falar comigo, respondendo este contato ou falar com o nosso atendimento online, que fica na página inicial do seu ava, do lado direito. Nós estamos disponíveis para te ajudar em tudo que for possível!',
          timestamp: '24/04/2023 - 10:52',
          sender: 'system',
        },
        {
          id: '4',
          text: 'Ah, também não deixe de prestar atenção aos prazos para não perder nenhuma avaliação, certo?',
          timestamp: '24/04/2023 - 10:52',
          sender: 'system',
        },
        {
          id: '5',
          text: 'Atenciosamente,\n\nDOUGLAS DA SILVA BREMM\nFidelização | Central de Mediação Acadêmica UNINTER',
          timestamp: '24/04/2023 - 10:52',
          sender: 'system',
        },
      ],
    },
  ];
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Adiciona a mensagem ao primeiro chat (simulação)
    const updatedConversations = [...conversations];
    const now = new Date();
    const timestamp = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} - ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    updatedConversations[0].messages.push({
      id: Date.now().toString(),
      text: newMessage,
      timestamp,
      sender: 'user',
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ backgroundColor: '#0d3865', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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

      {/* Tabs */}
      <Box sx={{ borderBottom: '1px solid #1E4A6F', backgroundColor: '#0d3865' }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              color: '#B0BEC5',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
            },
            '& .Mui-selected': {
              color: '#FFF !important',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2196F3',
            },
          }}
        >
          <Tab label="Chat" />
          <Tab label="Anexos" />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', pb: 10 }}>
        {activeTab === 0 ? (
          <Box>
            {conversations.map((conversation) => (
              <Box key={conversation.id}>
                {/* Conversation Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    backgroundColor: '#0d3865',
                    borderBottom: '1px solid #1E4A6F',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#B0BEC5',
                      color: '#0d3865',
                      fontWeight: 700,
                    }}
                  >
                    {conversation.avatar}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ color: '#FFF', fontWeight: 600 }}>
                        {conversation.name}
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: '#E91E63',
                          color: '#FFF',
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {conversation.badge}
                      </Box>
                    </Box>
                  </Box>
                  <IconButton sx={{ color: '#B0BEC5' }}>
                    {conversation.unread ? <Badge color="error" variant="dot"><MailOutlineIcon /></Badge> : <MailOutlineIcon />}
                  </IconButton>
                  <IconButton sx={{ color: '#B0BEC5' }}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                {/* Messages */}
                <Box sx={{ p: 2 }}>
                  {conversation.messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        mb: 2,
                        display: 'flex',
                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '85%',
                          backgroundColor: message.sender === 'user' ? '#2196F3' : '#1E4A6F',
                          color: '#FFF',
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            lineHeight: 1.5,
                          }}
                        >
                          {message.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#B0BEC5',
                            display: 'block',
                            mt: 1,
                            textAlign: 'right',
                            fontSize: '0.65rem',
                          }}
                        >
                          {message.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#B0BEC5' }}>
              Nenhum anexo disponível
            </Typography>
          </Box>
        )}
      </Box>

      {/* Input Footer */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#0d3865',
          borderTop: '1px solid #1E4A6F',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ color: '#B0BEC5' }}>
            <AttachFileIcon />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Escreva sua mensagem aqui"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#0d3865',
                color: '#FFF',
                borderRadius: 3,
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton sx={{ color: '#B0BEC5' }}>
                    <MicIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            sx={{
              color: '#FFF',
              backgroundColor: '#2196F3',
              '&:hover': {
                backgroundColor: '#1976D2',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MessagesPage;
