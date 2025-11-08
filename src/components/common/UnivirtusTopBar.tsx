import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { UnivirtusColors } from '../../theme/colors';

interface UnivirtusTopBarProps {
  title: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
}

export const UnivirtusTopBar: React.FC<UnivirtusTopBarProps> = ({
  title,
  showBackButton = false,
  actions,
}) => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: UnivirtusColors.backgroundDark }}>
      <Toolbar>
        {showBackButton && (
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {actions}
      </Toolbar>
    </AppBar>
  );
};
