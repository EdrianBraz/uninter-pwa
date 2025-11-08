import { Badge, IconButton } from '@mui/material';
import { UnivirtusColors } from '../../theme/colors';

interface BadgeIconProps {
  icon: React.ReactElement;
  badgeCount?: number;
  onClick?: () => void;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({ icon, badgeCount = 0, onClick }) => {
  return (
    <IconButton color="inherit" onClick={onClick}>
      <Badge
        badgeContent={badgeCount}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: UnivirtusColors.notificationBadge,
            color: UnivirtusColors.textPrimary,
          },
        }}
      >
        {icon}
      </Badge>
    </IconButton>
  );
};
