import { formatPerson } from '../../../../../helpers/formatters';
import CommonListItem from '../../../../common/CommonListItem';
import React from 'react';
import { CommonButton } from '../../../../common/CommonButton';
import { Box } from '@mui/system';

export const ListItem = React.memo((props) => {
  const onClick = React.useCallback(() => {
    props.generate(props.degreeWork, props.student);
  }, [props.generate, props.degreeWork]);

  return (
    <CommonListItem disablePadding>
      <Box
        sx={React.useMemo(
          () => ({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }),
          []
        )}
      >
        <Box sx={React.useMemo(() => ({ padding: '10px' }), [])}>
          {formatPerson(props.student)}: {props.degreeWork.theme}
        </Box>
        <Box
          sx={React.useMemo(
            () => ({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }),
            []
          )}
        >
          <CommonButton onClick={onClick} disabled={props.number === ''}>
            Приложение
          </CommonButton>
        </Box>
      </Box>
    </CommonListItem>
  );
});
