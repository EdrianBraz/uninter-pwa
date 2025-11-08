import { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
  options?: string[];
}

const AtendimentoPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [protocolNumber] = useState(() => {
    // Gerar protocolo único baseado na data e RU do usuário
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${year}${month}${day}${random}`;
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!currentUser) return;

    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Mensagens iniciais com dados do usuário logado
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        text: `Olá ${currentUser.name.toUpperCase()} (${currentUser.ru})`,
        sender: 'bot',
        timestamp,
      },
      {
        id: '2',
        text: `Eu sou a Tere, assistente Virtual da UNINTER, e estou aqui para auxiliar você. 😊\nPor favor, anote seu protocolo de atendimento: ${protocolNumber}`,
        sender: 'bot',
        timestamp,
      },
      {
        id: '3',
        text: 'Para iniciar um atendimento é só clicar em Novo Atendimento e escolher uma categoria de assunto.\nMas se o motivo do seu contato é acessar uma solicitação já realizada, clique em Consultar Solicitação.',
        sender: 'bot',
        timestamp,
      },
      {
        id: '4',
        text: 'O que você deseja?',
        sender: 'bot',
        timestamp,
        options: ['Novo atendimento', 'Consultar solicitação'],
      },
    ];

    setMessages(initialMessages);
  }, [protocolNumber, currentUser]);

  const handleOptionClick = (option: string) => {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Adiciona a escolha do usuário
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: option,
      sender: 'user',
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Resposta do bot baseada na opção
    setTimeout(() => {
      let botResponse: ChatMessage;

      if (option === 'Novo atendimento') {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Ótimo! Escolha uma das categorias abaixo para iniciar seu atendimento:',
          sender: 'bot',
          timestamp,
          options: [
            'Financeiro',
            'Acadêmico',
            'Secretaria',
            'Suporte Técnico',
            'Outros',
          ],
        };
      } else if (option === 'Consultar solicitação') {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Para consultar sua solicitação, por favor informe o número do protocolo ou acesse a área de "Minhas Solicitações" no menu principal.',
          sender: 'bot',
          timestamp,
          options: ['Voltar ao menu inicial'],
        };
      } else if (['Financeiro', 'Acadêmico', 'Secretaria', 'Suporte Técnico', 'Outros'].includes(option)) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: `Você selecionou: ${option}\n\nSua solicitação foi registrada com sucesso! Em breve nossa equipe entrará em contato.\n\nProtocolo: ${protocolNumber}\n\nPosso ajudar com mais alguma coisa?`,
          sender: 'bot',
          timestamp,
          options: ['Novo atendimento', 'Finalizar atendimento'],
        };
      } else if (option === 'Voltar ao menu inicial') {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: 'O que você deseja?',
          sender: 'bot',
          timestamp,
          options: ['Novo atendimento', 'Consultar solicitação'],
        };
      } else if (option === 'Finalizar atendimento') {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Obrigada por entrar em contato! Estamos sempre à disposição. 😊\n\nAté logo!',
          sender: 'bot',
          timestamp,
        };
        setTimeout(() => navigate('/messages'), 2000);
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Desculpe, não entendi. Como posso ajudar?',
          sender: 'bot',
          timestamp,
          options: ['Novo atendimento', 'Consultar solicitação'],
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#0d3865',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#0d3865',
          borderRadius: '12px 12px 0 0',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #1E4A6F',
          borderBottom: 'none',
          m: 2,
          mb: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src="/avatar-tere.png"
            sx={{
              width: 40,
              height: 40,
              backgroundColor: '#FFA726',
            }}
          >
            T
          </Avatar>
          <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 600 }}>
            Tere
          </Typography>
        </Box>
        <IconButton sx={{ color: '#FFF', p: 0.5 }} onClick={() => navigate('/messages')}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Status Badge */}
      <Box
        sx={{
          mx: 2,
          backgroundColor: '#4CAF50',
          px: 2,
          py: 0.5,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          width: 'fit-content',
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#FFF',
          }}
        />
        <Typography variant="caption" sx={{ color: '#FFF', fontWeight: 600 }}>
          Em atendimento
        </Typography>
      </Box>

      {/* Chat Area */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#E8E8E8',
          m: 2,
          mt: 0,
          borderRadius: '0 0 12px 12px',
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.map((message) => (
          <Box key={message.id}>
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-start',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {message.sender === 'bot' && (
                <Avatar
                  src="/avatar-tere.png"
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#FFA726',
                    flexShrink: 0,
                  }}
                >
                  T
                </Avatar>
              )}
              <Box
                sx={{
                  maxWidth: '75%',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: message.sender === 'user' ? '#2196F3' : '#FFF',
                    color: message.sender === 'user' ? '#FFF' : '#000',
                    p: 2,
                    borderRadius: 2,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
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
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#666',
                    display: 'block',
                    mt: 0.5,
                    ml: message.sender === 'user' ? 0 : 1,
                    textAlign: message.sender === 'user' ? 'right' : 'left',
                  }}
                >
                  {message.timestamp}
                </Typography>

                {/* Options */}
                {message.options && (
                  <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {message.options.map((option, index) => (
                      <Box
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        sx={{
                          backgroundColor: '#FFF',
                          border: '1px solid #E0E0E0',
                          borderRadius: 2,
                          p: 1.5,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: '#F5F5F5',
                            borderColor: '#2196F3',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#FFA726',
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#000' }}>
                          {option}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default AtendimentoPage;
