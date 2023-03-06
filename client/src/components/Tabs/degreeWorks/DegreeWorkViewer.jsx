import { useModal } from '../../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { useDegreeWork } from '../../../hooks/useDegreeWork';
import {
  deleteDegreeWorkAction,
  updateDegreeWorkAction,
} from '../../../redux/actions/degreeWorksActions';
import { ViewerBox } from '../../common/ViewerBox';
import { Box } from '@mui/system';
import { EditorButtonBlock } from '../../common/EditorButtonBlock';
import { CommonModal } from '../../common/CommonModal';
import { DegreeWorksEditor } from '../../common/degreeWork/DegreeWorksEditor';
import React from 'react';
import { ModalAddDegreeWork } from './ModalAddDegreeWork';
import { toastError } from '../../../utils/toastSender';
import { validateDegreeWork } from './validators';
import { Typography } from '@mui/material';
import { formatMark } from '../../../helpers/formatters';

export const DegreeWorkViewer = React.memo(() => {
  const [modalActive, activateModal, inactivateModal] = useModal();
  const dispatch = useDispatch();

  const selectedDegreeWork = useSelector(
    (state) => state.ui.selectedDegreeWork
  );
  const [degreeWork, degreeWorkHandlers] = useDegreeWork();

  React.useEffect(() => {
    degreeWorkHandlers.setDegreeWork(selectedDegreeWork);
  }, [selectedDegreeWork.id, degreeWorkHandlers]);

  const onDelete = React.useCallback(
    () => dispatch(deleteDegreeWorkAction(selectedDegreeWork.id)),
    [selectedDegreeWork.id, dispatch]
  );

  const onSave = React.useCallback(() => {
    try {
      validateDegreeWork(degreeWork);
      dispatch(updateDegreeWorkAction(degreeWork));
    } catch (e) {
      toastError(e.message);
    }
  }, [degreeWork, dispatch]);

  const disabled = !Boolean(selectedDegreeWork.id);

  return (
    <ViewerBox>
      <Box sx={React.useMemo(() => ({ width: '100%' }), [])}>
        <DegreeWorksEditor
          handlers={degreeWorkHandlers}
          localDegreeWork={degreeWork}
          disabled={disabled}
        />
        <Box sx={React.useMemo(() => ({ margin: '10px' }), [])}>
          <Typography sx={React.useMemo(() => ({ textAlign: 'left' }), [])}>
            Оценка: <i>{formatMark(degreeWork.mark)}</i>
          </Typography>
        </Box>
        <EditorButtonBlock
          onSave={onSave}
          onDelete={onDelete}
          onAdd={activateModal}
          disabled={disabled}
        />
      </Box>
      <CommonModal active={modalActive} onClose={inactivateModal}>
        <ModalAddDegreeWork onClose={inactivateModal} />
      </CommonModal>
    </ViewerBox>
  );
});
