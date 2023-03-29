import { useDispatch, useSelector } from 'react-redux';
import { DefaultList } from '../../common/DefaultList';
import { TakeDayListItem } from './TakeDayListItem';

export const TakeDayList = (props) => {
  const dispatch = useDispatch();
  // const selectedTakeDay = useSelector(
  //   (state) => state.ui.selectedTakeDayInfo.takeDay
  // );

  const takeDays = useSelector((state) => state.takeDays);

  return (
    <DefaultList>
      {takeDays.map((takeDay) => {
        return (
          <TakeDayListItem
            takeDay={takeDay}
            key={takeDay.id}
            // selected={takeDay.id === selectedTakeDay.id}
            // onClick={() => dispatch(selectTakeDay(takeDay))}
          />
        );
      })}
    </DefaultList>
  );
};
