import { Box } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';

export const EditorInputBlock = React.memo(
  styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
    textAlign: 'left',
  }))
);
