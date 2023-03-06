import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTakeDaysAction } from '../../../redux/actions/takeDaysActions';
import { TakeDayViewer } from './TakeDayViewer';
import { TakeDayList } from './TakeDayList';
import { ViewerBox } from '../../common/ViewerBox';
import { GraduationMode } from './GraduationMode/GraduationMode';

export const TakeDays = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllTakeDaysAction());
  }, []);

  let content;

  const startedTakeDay = useSelector((state) => state.ui.startedTakeDay);

  const takeDayViewerSx = React.useMemo(
    () => ({ width: '45%', marginLeft: '20px' }),
    []
  );

  const takeDayListSx = React.useMemo(
    () => ({ width: '30%', marginLeft: '20px' }),
    []
  );

  if (startedTakeDay.id) {
    content = (
      <>
        <GraduationMode takeDay={startedTakeDay} />
      </>
    );
  } else {
    content = (
      <>
        <Box sx={takeDayViewerSx}>
          <TakeDayViewer />
        </Box>
        <Box sx={takeDayListSx}>
          <TakeDayList />
        </Box>
      </>
    );
  }

  return props.index === props.value && <ViewerBox left>{content}</ViewerBox>;
};
