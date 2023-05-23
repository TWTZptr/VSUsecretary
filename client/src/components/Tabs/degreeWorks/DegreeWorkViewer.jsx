import { useModal } from '../../../hooks/useModal';
import { useDegreeWork } from '../../../hooks/useDegreeWork';
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
import { useDegreeWorksStore } from '../../../hooks/zustand/useDegreeWorksStore';

export const DegreeWorkViewer = React.memo(() => {
  const [modalActive, activateModal, inactivateModal] = useModal();
  const { selectedDegreeWork, removeDegreeWorkById, updateDegreeWork } =
    useDegreeWorksStore((state) => state);
  const [degreeWork, degreeWorkHandlers] = useDegreeWork();

  React.useEffect(() => {
    degreeWorkHandlers.setDegreeWork(selectedDegreeWork);
  }, [selectedDegreeWork, degreeWorkHandlers]);

  const onDelete = React.useCallback(async () => {
    await removeDegreeWorkById(selectedDegreeWork.id);
  }, [selectedDegreeWork.id, removeDegreeWorkById]);

  const onSave = React.useCallback(() => {
    try {
      validateDegreeWork(degreeWork);
      updateDegreeWork(degreeWork);
    } catch (e) {
      toastError(e.message);
    }
  }, [degreeWork, updateDegreeWork]);

  const disabled = !Boolean(selectedDegreeWork.id);

  return (
    <ViewerBox>
      <Box sx={React.useMemo(() => ({ width: '100%' }), [])}>
        <DegreeWorksEditor
          handlers={degreeWorkHandlers}
          localDegreeWork={degreeWork}
          disabled={disabled}
          editStudent
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
