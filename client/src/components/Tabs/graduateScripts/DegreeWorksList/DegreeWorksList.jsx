import { Box } from '@mui/system';
import { Popover, Table, TableCell, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { DefaultList } from '../../../common/DefaultList';
import { findUnusedItems } from '../../../../helpers/findUnusedItems';
import { updateDegreeWorkAction } from '../../../../redux/actions/degreeWorksActions';
import { DegreeWorkListItems } from './DegreeWorkListItems';
import CommonListItem from '../../../common/CommonListItem';
import { CommonButton } from '../../../common/CommonButton';
import { DegreeWorkListItem } from '../../../common/degreeWork/DegreeWorkListItem';

export const DegreeWorksList = (props) => {
  const handleDeleteDegreeWork = (degreeWork) => {
    dispatch(updateDegreeWorkAction({ ...degreeWork, takeDayId: null }));
  };
  const allDegreeWorks = useSelector((state) => state.degreeWorks);
  const selectedTakeDay = useSelector(
    (state) => state.ui.selectedTakeDayInfo.takeDay
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const popoverOpen = Boolean(anchorEl);
  const dispatch = useDispatch();

  const currentDegreeWorks =
    selectedTakeDay.id !== null
      ? allDegreeWorks.filter(
          (degreeWork) => degreeWork.takeDayId === selectedTakeDay.id
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
      dispatch(
        updateDegreeWorkAction({ ...degreeWork, takeDayId: selectedTakeDay.id })
      );
    },
    [selectedTakeDay]
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

  const disabled = !Boolean(selectedTakeDay.id);

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
