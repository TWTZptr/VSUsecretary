import { useDegreeWork } from '../../../hooks/useDegreeWork';
import { ModalBox } from '../../common/ModalBox';
import { DegreeWorksEditor } from '../../common/degreeWork/DegreeWorksEditor';
import { CommonButton } from '../../common/CommonButton';
import React from 'react';
import { validateDegreeWork } from './validators';
import { toastError } from '../../../utils/toastSender';
import { useDegreeWorksStore } from '../../../hooks/zustand/useDegreeWorksStore';

export const ModalAddDegreeWork = React.memo(({ onClose }) => {
  const [degreeWork, degreeWorkHandlers] = useDegreeWork();
  const { createDegreeWork } = useDegreeWorksStore((state) => state);

  const handleAdd = React.useCallback(() => {
    try {
      validateDegreeWork(degreeWork);
      createDegreeWork(degreeWork);
      onClose();
    } catch (e) {
      toastError(e.message);
    }
  }, [onClose, createDegreeWork, degreeWork]);

  return (
    <ModalBox sx={React.useMemo(() => ({ maxWidth: 700 }), [])}>
      <DegreeWorksEditor
        handlers={degreeWorkHandlers}
        localDegreeWork={degreeWork}
      />
      <CommonButton onClick={handleAdd}>Добавить</CommonButton>
    </ModalBox>
  );
});
