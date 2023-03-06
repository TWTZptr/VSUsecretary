import { Box } from '@mui/system';
import React from 'react';
import { Typography } from '@mui/material';
import { GraduationEditor } from './GraduationEditor';
import { DegreeWorksList } from './DegreeWorksList';
import { useDegreeWork } from '../../../../../hooks/useDegreeWork';
import { formatDate } from '../../../../../helpers/formatters';

export const GraduationProcess = React.memo(
  ({ onGraduationEnd, allGraduations, takeDay, degreeWorks }) => {
    const [selectedDegreeWork, selectedDegreeWorkHandlers] = useDegreeWork();

    const onSelect = React.useCallback(
      (degreeWork) => {
        selectedDegreeWorkHandlers.setDegreeWork(degreeWork);
      },
      [selectedDegreeWork, selectedDegreeWorkHandlers]
    );

    return (
      <Box sx={React.useMemo(() => ({ width: '100%' }), [])}>
        <Box
          sx={React.useMemo(
            () => ({
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }),
            []
          )}
        >
          <Box
            sx={React.useMemo(
              () => ({ flexGrow: 1, paddingRight: '25px' }),
              []
            )}
          >
            <Typography
              sx={React.useMemo(
                () => ({
                  fontSize: '1.5rem',
                  fontWeight: '400',
                  textAlign: 'left',
                  marginLeft: '10px',
                  marginBottom: '10px',
                }),
                []
              )}
            >
              Защита {formatDate(takeDay.date)}
            </Typography>
            <GraduationEditor
              degreeWork={selectedDegreeWork}
              degreeWorkHandlers={selectedDegreeWorkHandlers}
              onEnd={onGraduationEnd}
              allGraduations={allGraduations}
            />
          </Box>
          <Box
            sx={React.useMemo(
              () => ({
                maxHeight: '100%',
                overflowY: 'auto',
              }),
              []
            )}
          >
            <DegreeWorksList
              takeDay={takeDay}
              onSelect={onSelect}
              selectedDegreeWork={selectedDegreeWork}
              degreeWorks={degreeWorks}
            />
          </Box>
        </Box>
      </Box>
    );
  }
);
