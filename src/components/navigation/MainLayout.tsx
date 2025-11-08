import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';
import { UnivirtusColors } from '../../theme/colors';

export const MainLayout: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: UnivirtusColors.backgroundDark,
      }}
    >
      <Box
        component="main"
        sx={{
          width: '100%',
          flex: 1,
          paddingBottom: '56px', // Space for bottom navigation
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </Box>
      <BottomNavigation />
    </Box>
  );
};
