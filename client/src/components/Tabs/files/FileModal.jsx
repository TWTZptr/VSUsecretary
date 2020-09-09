import React from 'react';
import { ModalBox } from '../../common/ModalBox';
import { useDirectionsStore } from '../../../hooks/zustand/useDirectionsStore';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Box } from '@mui/system';
import { parseStudentsFromFile } from '../../../services/filesService';
import { toastError, toastSuccessful } from '../../../utils/toastSender';
import { useCommonStore } from '../../../hooks/zustand/commonStore';
import { useStudentsStore } from '../../../hooks/zustand/useStudentsStore';

export const FileModal = React.forwardRef(({ file }, ref) => {
  const [directionId, setDirectionId] = React.useState('');
  const { currentYear } = useCommonStore((state) => state);
  const { addStudents } = useStudentsStore((state) => state);

  const { directions } = useDirectionsStore((state) => state);
  const onDirectionChange = React.useCallback(
    (event) => {
      setDirectionId(event.target.value);
    },
    [setDirectionId]
  );

  const onParse = React.useCallback(async () => {
    const res = await parseStudentsFromFile(file.id, directionId, currentYear);
    if (!res.ok) {
      toastError(res.msg);
      return;
    }

    addStudents(res.data);
    toastSuccessful('Файл успешно распознан, студенты загружены');
  }, [file.id, directionId, currentYear, addStudents]);

  return (
    <ModalBox
      ref={ref}
      sx={React.useMemo(
        () => ({
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
        }),
        []
      )}
    >
      <Box>
        <FormControl sx={React.useMemo(() => ({ width: '60%' }), [])}>
          <InputLabel>Направление</InputLabel>
          <Select
            label="Направление"
            onChange={onDirectionChange}
            value={directionId || ''}
          >
            {directions.map((direction) => (
              <MenuItem value={direction.id} key={direction.id}>
                {direction.shortName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="container"
          sx={React.useMemo(
            () => ({
              backgroundColor: '#e0e0e0',
              color: 'black',
              marginLeft: '2%',
              height: '100%',
              fontSize: '100%',
              width: 'auto',
            }),
            []
          )}
          disabled={!directionId}
          onClick={onParse}
        >
          Загрузить студентов
        </Button>
      </Box>
    </ModalBox>
  );
});
