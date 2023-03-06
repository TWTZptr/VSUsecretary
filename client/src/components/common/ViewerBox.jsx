import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ViewerBox = styled(Box)((props) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: props.left ? 'left' : 'space-between',
  width: '100%',
}));
