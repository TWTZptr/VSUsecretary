import { DefaultList } from './DefaultList';
import React from 'react';
import { Box } from '@mui/system';
import { CommonTextField } from './CommonTextField';
import { TextField } from '@mui/material';

export const FilteredList = React.memo(({ sx, filterBy, transform, items }) => {
  const [filter, setFilter] = React.useState('');

  const filtered = React.useMemo(() => {
    let result = items;

    if (filter !== '') {
      result = result.filter((item) =>
        filterBy.some((filterProp) => item[filterProp].includes(filter))
      );
    }

    return result.map((item) => transform(item));
  }, [filter, filterBy, transform, items]);

  const onFilterChange = React.useCallback(
    (event) => {
      setFilter(event.target.value);
    },
    [setFilter]
  );

  return (
    <Box
      sx={React.useMemo(
        () => ({
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }),
        []
      )}
    >
      <TextField
        label="Поиск"
        id="filter"
        onChange={onFilterChange}
        value={filter}
        sx={React.useMemo(
          () => ({
            width: '100%',
            marginBottom: '10px',
          }),
          []
        )}
      />
      <DefaultList sx={sx}>{filtered}</DefaultList>
    </Box>
  );
});
