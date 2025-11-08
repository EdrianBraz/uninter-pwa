import { useState } from 'react';
import { Box, Typography, IconButton, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Dias do mês anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false });
    }

    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Dias do próximo mês
    const remainingDays = 42 - days.length; // 6 semanas * 7 dias
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setSelectedDay(day);
    }
  };

  const days = getDaysInMonth(currentDate);

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
          Calendário
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: '1px solid #1E4A6F', px: 2, pt: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              color: '#B0BEC5',
              textTransform: 'none',
              fontSize: '15px',
              fontWeight: 500,
              minWidth: 'auto',
              px: 2,
            },
            '& .Mui-selected': {
              color: '#FFF !important',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#FFF',
              height: 3,
            },
          }}
        >
          <Tab label="Minha agenda" />
          <Tab label="Calendário acadêmico" />
        </Tabs>
      </Box>

      {/* Calendar */}
      <Box sx={{ p: 3 }}>
        {/* Month Navigation */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <IconButton onClick={handlePrevMonth} sx={{ color: '#FFF' }}>
            <ChevronLeftIcon />
          </IconButton>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 600 }}>
              {monthNames[currentDate.getMonth()]}
            </Typography>
            <Typography variant="body2" sx={{ color: '#B0BEC5' }}>
              {currentDate.getFullYear()}
            </Typography>
          </Box>
          <IconButton onClick={handleNextMonth} sx={{ color: '#FFF' }}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Week Days */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
            mb: 2,
          }}
        >
          {weekDays.map((day) => (
            <Box key={day} sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#B0BEC5', fontWeight: 600, fontSize: '0.75rem' }}>
                {day}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Calendar Days */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
          }}
        >
          {days.map((dayObj, index) => {
            const isSelected = selectedDay === dayObj.day && dayObj.isCurrentMonth;

            return (
              <Box
                key={index}
                onClick={() => handleDayClick(dayObj.day, dayObj.isCurrentMonth)}
                sx={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  cursor: dayObj.isCurrentMonth ? 'pointer' : 'default',
                  backgroundColor: isSelected ? '#FFA726' : 'transparent',
                  '&:hover': dayObj.isCurrentMonth ? {
                    backgroundColor: isSelected ? '#FFA726' : 'rgba(255, 167, 38, 0.2)',
                  } : {},
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: dayObj.isCurrentMonth ? '#FFF' : '#5A7A9A',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.9rem',
                  }}
                >
                  {dayObj.day}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Agenda do dia */}
      <Box sx={{ px: 3, mt: 2 }}>
        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 600, mb: 2 }}>
          Agenda do dia {selectedDay.toString().padStart(2, '0')}/{(currentDate.getMonth() + 1).toString().padStart(2, '0')}/{currentDate.getFullYear()}
        </Typography>
        
        <Box
          sx={{
            textAlign: 'center',
            py: 3,
          }}
        >
          <Typography variant="body2" sx={{ color: '#B0BEC5', mb: 3 }}>
            Você não possui eventos para este dia
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img 
              src="/src/utils/logoHome.png" 
              alt="Sem eventos"
              style={{
                width: '200px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarPage;
