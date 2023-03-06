import { useDegreeWork } from '../../../hooks/useDegreeWork';
import { useDispatch } from 'react-redux';
import { createDegreeWorkAction } from '../../../redux/actions/degreeWorksActions';
import { ModalBox } from '../../common/ModalBox';
import { DegreeWorksEditor } from '../../common/degreeWork/DegreeWorksEditor';
import { CommonButton } from '../../common/CommonButton';
import React from 'react';
import { validateDegreeWork } from './validators';
import { toastError } from '../../../utils/toastSender';

export const ModalAddDegreeWork = React.forwardRef((props, ref) => {
  const [degreeWork, degreeWorkHandlers] = useDegreeWork();
  const dispatch = useDispatch();

  const handleAdd = () => {
    try {
      validateDegreeWork(degreeWork);
      dispatch(createDegreeWorkAction(degreeWork));
      props.onClose();
    } catch (e) {
      toastError(e.message);
    }
  };

  return (
    <ModalBox sx={React.useMemo(() => ({ maxWidth: 700 }), [])} ref={ref}>
      <DegreeWorksEditor
        handlers={degreeWorkHandlers}
        localDegreeWork={degreeWork}
      />
      <CommonButton onClick={handleAdd}>Добавить</CommonButton>
    </ModalBox>
  );
});
