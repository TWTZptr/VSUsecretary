import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TakeDayViewer } from '../components/Tabs/takeDays/TakeDayViewer';
import { TakeDayList } from '../components/Tabs/takeDays/TakeDayList';
import { ViewerBox } from '../components/common/ViewerBox';
import { GraduationMode } from '../components/Tabs/takeDays/GraduationMode/GraduationMode';

export const GraduateScriptsPage = (props) => {
  React.useEffect(() => {
    // dispatch(getAllTakeDaysAction());
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
