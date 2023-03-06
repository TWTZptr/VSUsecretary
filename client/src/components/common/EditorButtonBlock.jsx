import { Box } from '@mui/system';
import { CommonButton } from './CommonButton';
import DangerousButton from './DangerousButton';
import React from 'react';

const EditorButtonBlock = React.memo((props) => {
  return (
    <>
      <Box>
        <CommonButton
          variant="container"
          onClick={props.onSave}
          disabled={props.disabled}
        >
          Сохранить
        </CommonButton>
        <DangerousButton
          variant="container"
          onClick={props.onDelete}
          disabled={props.disabled}
        >
          Удалить
        </DangerousButton>
      </Box>
      <Box>
        <CommonButton variant="container" onClick={props.onAdd}>
          Добавить
        </CommonButton>
      </Box>
    </>
  );
});

export { EditorButtonBlock };
