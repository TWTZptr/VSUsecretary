import React from 'react';
import { CommonButton } from '../../common/CommonButton';
import { useDirection } from '../../../hooks/useDirection';
import { DirectionEditor } from './DirectionEditor';
import { ModalBox } from '../../common/ModalBox';
import { toastError } from '../../../utils/toastSender';
import { validateDirection } from './validators';
import { useDirectionsStore } from '../../../hooks/zustand/useDirectionsStore';

export const ModalAddDirection = React.memo(({ onClose }) => {
  const [direction, directionHandlers] = useDirection();
  const { createDirection } = useDirectionsStore((store) => store);
  const handleAdd = React.useCallback(() => {
    try {
      validateDirection(direction);
      createDirection(direction);
      onClose();
    } catch (e) {
      toastError(e.message);
    }
  }, [onClose, direction, createDirection]);

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
