import { useSelector } from 'react-redux';
import { useTakeDay } from '../../../hooks/useTakeDay';
import React from 'react';
import { ViewerBox } from '../../common/ViewerBox';
import { Box } from '@mui/system';
import { TakeDayEditor } from './TakeDayEditor';

export const TakeDayViewer = (props) => {
  const selectedTakeDay = useSelector(
    (state) => state.ui.selectedTakeDayInfo.takeDay
  );
  const [takeDay, takeDayHandlers] = useTakeDay();

  React.useEffect(() => {
    takeDayHandlers.setTakeDay(selectedTakeDay);
  }, [selectedTakeDay]);

  const disabled = !Boolean(selectedTakeDay.id);

  return (
    <ViewerBox>
      <TakeDayEditor
        handlers={takeDayHandlers}
        disabled={disabled}
        localTakeDay={takeDay}
      />
    </ViewerBox>
  );
};
