import { Box } from '@mui/system';
import { Popover, Table, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { DefaultList } from '../../../common/DefaultList';
import { findUnusedItems } from '../../../../helpers/findUnusedItems';
import { DegreeWorkListItems } from './DegreeWorkListItems';
import CommonListItem from '../../../common/CommonListItem';
import { CommonButton } from '../../../common/CommonButton';
import { DegreeWorkListItem } from '../../../common/degreeWork/DegreeWorkListItem';
import { useDegreeWorksStore } from '../../../../hooks/zustand/useDegreeWorksStore';
import { useGraduateScriptsStore } from '../../../../hooks/zustand/useGraduateScriptsStore';

export const DegreeWorksList = (props) => {
  const { updateDegreeWork } = useDegreeWorksStore((state) => state);

  const handleDeleteDegreeWork = (degreeWork) => {
    updateDegreeWork({ ...degreeWork, takeDayId: null });
  };

  const allDegreeWorks = useDegreeWorksStore((state) => state.degreeWorks);

  const { selectedGraduateScript } = useGraduateScriptsStore((state) => state);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const popoverOpen = Boolean(anchorEl);

  const currentDegreeWorks =
    selectedGraduateScript.id !== null
      ? allDegreeWorks.filter(
          (degreeWork) => degreeWork.takeDayId === selectedGraduateScript.id
        )
      : [];

  const unusedDegreeWorks = findUnusedItems(
    allDegreeWorks,
    currentDegreeWorks
  ).filter((degreeWork) => degreeWork.takeDayId === null);

  const popoverActivate = (event) => {
    setAnchorEl(event.target);
  };

  const anchorRef = React.useRef();

  const onClick = React.useCallback(
    (degreeWork) => {
      if (unusedDegreeWorks.length === 1) {
        setAnchorEl(null);
      }
      updateDegreeWork({ ...degreeWork, takeDayId: selectedGraduateScript.id });
    },
    [selectedGraduateScript]
  );

  let unusedDegreeWorksListItems;
  if (unusedDegreeWorks.length) {
    unusedDegreeWorksListItems = unusedDegreeWorks.map((degreeWork) => {
      return (
        <DegreeWorkListItem
          degreeWork={degreeWork}
          key={degreeWork.id}
          onClick={onClick}
        />
      );
    });
  } else {
    unusedDegreeWorksListItems = (
      <CommonListItem>
        <i>Пусто</i>
      </CommonListItem>
    );
  }

  const disabled = !Boolean(selectedGraduateScript.id);

  return (
    <Box
      sx={React.useMemo(
        () => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'auto',
          maxHeight: '400px',
          width: 'auto',
        }),
        []
      )}
    >
      <Table sx={React.useMemo(() => ({ flexGrow: '1' }), [])}>
        <TableHead>
          <TableRow>
            <TableCell sx={React.useMemo(() => ({ width: '250px' }), [])}>
              Тема
            </TableCell>
            <TableCell sx={React.useMemo(() => ({ width: '160px' }), [])}>
              Студент
            </TableCell>
            <TableCell sx={React.useMemo(() => ({ width: '160px' }), [])}>
              Научный руководитель
            </TableCell>
            <TableCell
              sx={React.useMemo(() => ({ width: '70px' }), [])}
              align="right"
            ></TableCell>
          </TableRow>
        </TableHead>
        <DegreeWorkListItems
          degreeWorks={currentDegreeWorks}
          handler={handleDeleteDegreeWork}
        />
      </Table>
      <CommonButton onClick={popoverActivate} disabled={disabled}>
        <AddIcon ref={anchorRef} />
      </CommonButton>
      <Popover
        open={popoverOpen}
        id="popover"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={() => setAnchorEl(null)}
      >
        <Box>
          <DefaultList>{unusedDegreeWorksListItems}</DefaultList>
        </Box>
      </Popover>
    </Box>
  );
};
