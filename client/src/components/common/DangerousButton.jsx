import { Button } from '@mui/material';
import styled from '@emotion/styled';

const DangerousButton = styled(Button)(() => ({
  backgroundColor: '#ff6666',
  margin: 20,
  color: 'black',
  ':hover': {
    backgroundColor: '#ff9090',
  },
}));

export default DangerousButton;
