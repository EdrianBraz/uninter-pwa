import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Paper, SvgIcon } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Custom SVG Icons
const HomeIconSvg = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
);

const StudyIconSvg = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 7v14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
);

const PerformanceIconSvg = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M3 3v16a2 2 0 0 0 2 2h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
);

const SearchIconSvg = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="m21 21-4.34-4.34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
  </SvgIcon>
);

const ProfileIconSvg = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
  </SvgIcon>
);

const bottomNavItems = [
  { route: '/home', icon: HomeIconSvg, label: 'Home' },
  { route: '/study', icon: StudyIconSvg, label: 'Estudar' },
  { route: '/performance', icon: PerformanceIconSvg, label: 'Desempenho' },
  { route: '/search', icon: SearchIconSvg, label: 'Pesquisar' },
  { route: '/profile', icon: ProfileIconSvg, label: 'Perfil' },
];

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentValue = bottomNavItems.findIndex(item => location.pathname === item.route);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    navigate(bottomNavItems[newValue].route);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={3}
    >
      <MuiBottomNavigation
        value={currentValue}
        onChange={handleChange}
        showLabels
        sx={{
          backgroundColor: '#0d3865',
          borderTop: '1px solid #1E4A6F',
          height: 70,
          '& .MuiBottomNavigationAction-root': {
            color: '#7A9CC6',
            minWidth: 'auto',
            padding: '8px 12px',
            '& .MuiSvgIcon-root': {
              fontSize: '26px',
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.7rem',
              marginTop: '4px',
              fontWeight: 500,
            },
          },
          '& .Mui-selected': {
            color: '#FFF',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.7rem',
              fontWeight: 600,
            },
          },
        }}
      >
        {bottomNavItems.map((item, index) => (
          <BottomNavigationAction
            key={index}
            label={item.label}
            icon={<item.icon />}
          />
        ))}
      </MuiBottomNavigation>
    </Paper>
  );
};
