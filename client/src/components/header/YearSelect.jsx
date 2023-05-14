import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useCommonStore } from '../../hooks/zustand/useCommonStore';
import { useGraduateScriptsStore } from '../../hooks/zustand/useGraduateScriptsStore';
import { useStudentsStore } from '../../hooks/zustand/useStudentsStore';
import { useDegreeWorksStore } from '../../hooks/zustand/useDegreeWorksStore';

const from = new Date().getFullYear() - 10;
const years = Array.from({ length: 20 }, (_, index) => index + from).reverse();

export const YearSelect = React.memo(() => {
  const { currentYear, setCurrentYear, startedGraduateScript } = useCommonStore(
    (state) => state
  );
  const { resetSelectedGraduateScript } = useGraduateScriptsStore(
    (state) => state
  );
  const { resetSelectedStudent } = useStudentsStore((state) => state);
  const { resetSelectedDegreeWork } = useDegreeWorksStore((state) => state);

  const onYearChange = React.useCallback(
    (event) => {
      resetSelectedGraduateScript();
      resetSelectedStudent();
      resetSelectedDegreeWork();
      setCurrentYear(event.target.value);
    },
    [
      setCurrentYear,
      resetSelectedGraduateScript,
      resetSelectedDegreeWork,
      resetSelectedStudent,
    ]
  );

  return (
    <FormControl fullWidth disabled={!!startedGraduateScript}>
      <InputLabel>Год</InputLabel>
      <Select
        label="Год"
        onChange={onYearChange}
        value={currentYear}
        sx={React.useMemo(
          () => ({
            maxHeight: '44px',
          }),
          []
        )}
        MenuProps={React.useMemo(
          () => ({
            PaperProps: {
              style: {
                maxHeight: '300px',
              },
            },
          }),
          []
        )}
      >
        {years.map((year) => (
          <MenuItem value={year} key={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
