import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { UnivirtusTopBar } from '../components/common/UnivirtusTopBar';
import { UnivirtusColors } from '../theme/colors';

const StubLoadingPage: React.FC = () => {
  const { title } = useParams<{ title: string }>();

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <UnivirtusTopBar title={decodeURIComponent(title || 'Carregando')} showBackButton />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: UnivirtusColors.actionPrimary }} />
        <Typography variant="body1" color={UnivirtusColors.textSecondary}>
          Carregando...
        </Typography>
      </Box>
    </Box>
  );
};

export default StubLoadingPage;
