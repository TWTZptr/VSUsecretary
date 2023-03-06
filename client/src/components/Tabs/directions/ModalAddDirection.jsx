import React from 'react';
import { CommonButton } from '../../common/CommonButton';
import { useDispatch } from 'react-redux';
import { createDirectionAction } from '../../../redux/actions/directionsActions';
import { useDirection } from '../../../hooks/useDirection';
import { DirectionEditor } from './DirectionEditor';
import { ModalBox } from '../../common/ModalBox';
import { toastError } from '../../../utils/toastSender';
import { validateDirection } from './validators';

export const ModalAddDirection = React.forwardRef((props, ref) => {
  const [direction, directionHandlers] = useDirection();
  const dispatch = useDispatch();

  const handleAdd = (event) => {
    try {
      validateDirection(direction);
      dispatch(createDirectionAction(direction));
      props.onClose();
    } catch (e) {
      toastError(e.message);
    }
  };

  return (
    <ModalBox sx={React.useMemo(() => ({ maxWidth: 400 }), [])}>
      <DirectionEditor
        handlers={directionHandlers}
        localDirection={direction}
      />
      <CommonButton onClick={handleAdd}>Добавить</CommonButton>
    </ModalBox>
  );
});
