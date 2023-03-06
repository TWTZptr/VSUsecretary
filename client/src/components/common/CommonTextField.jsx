import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React from 'react';

export const CommonTextField = React.memo(
  styled(TextField)(() => ({
    margin: '10px',
  }))
);
