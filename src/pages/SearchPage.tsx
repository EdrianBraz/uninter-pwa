import { useState } from 'react';
import { Box, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import MessageIcon from '@mui/icons-material/Message';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const recentSearches: string[] = [];
  const popularSearches = ['Financeiro', 'Tutoria', 'Atendimentos', 'Informações IR'];

  const handleSearchItemClick = (term: string) => {
    if (term === 'Financeiro') {
      navigate('/financial');
    } else {
      navigate(`/stub/${term}`);
    }
  };

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
          Pesquisar
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

      {/* Search Input */}
      <Box sx={{ px: 3, pt: 2, pb: 3 }}>
        <TextField
          fullWidth
          placeholder="O que está procurando?"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'transparent',
              color: '#FFF',
              borderRadius: '25px',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.7)',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: '12px 16px',
              fontSize: '0.9375rem',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              },
            },
          }}
        />
      </Box>

      {/* Recent Searches */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Typography variant="body1" sx={{ mb: 2, color: '#FFF', fontWeight: 500 }}>
          Pesquisas recentes
        </Typography>
        {recentSearches.length === 0 ? (
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
            Você ainda não tem nenhuma pesquisa recente
          </Typography>
        ) : (
          recentSearches.map((search, index) => (
            <Box
              key={index}
              onClick={() => handleSearchItemClick(search)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                py: 2,
                borderBottom: index < recentSearches.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <Typography sx={{ color: '#FFF', fontSize: '0.9375rem' }}>{search}</Typography>
              <NorthEastIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 20 }} />
            </Box>
          ))
        )}
      </Box>

      {/* Popular Searches */}
      <Box sx={{ px: 3 }}>
        <Typography variant="body1" sx={{ mb: 2, color: '#FFF', fontWeight: 500 }}>
          Pesquisas populares
        </Typography>
        {popularSearches.map((search, index) => (
          <Box
            key={index}
            onClick={() => handleSearchItemClick(search)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              py: 2,
              borderBottom: index < popularSearches.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <Typography sx={{ color: '#FFF', fontSize: '0.9375rem' }}>{search}</Typography>
            <NorthEastIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 20 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchPage;
