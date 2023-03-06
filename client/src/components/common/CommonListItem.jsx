import styled from '@emotion/styled';
import { ListItem } from '@mui/material';

const CommonListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
  margin: '5px',
  backgroundColor: 'white',
  borderRadius: '2px',
  width: 'auto',
  maxWidth: 'auto',
  ...(active && {
    backgroundColor: '#C0C0C0',
  }),
}));

export default CommonListItem;
