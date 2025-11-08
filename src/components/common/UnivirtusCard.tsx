import { Card, CardContent, styled } from '@mui/material';
import { UnivirtusColors } from '../../theme/colors';

const StyledCard = styled(Card)({
  backgroundColor: UnivirtusColors.backgroundDarkAlt,
  borderRadius: '12px',
  width: '100%',
});

interface UnivirtusCardProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const UnivirtusCard: React.FC<UnivirtusCardProps> = ({ onClick, children }) => {
  return (
    <StyledCard onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default' }}>
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};
