import { Box } from '@mui/system';
import React from 'react';
import { EditorButtonBlock } from '../../common/EditorButtonBlock';
import { ModalAddDirection } from './ModalAddDirection';
import { useModal } from '../../../hooks/useModal';
import { DirectionEditor } from './DirectionEditor';
import { useDirection } from '../../../hooks/useDirection';
import { CommonModal } from '../../common/CommonModal';
import { ViewerBox } from '../../common/ViewerBox';
import { toastError } from '../../../utils/toastSender';
import { validateDirection } from './validators';
import { useDirectionsStore } from '../../../hooks/zustand/useDirectionsStore';

export const DirectionViewer = React.memo(() => {
  const [modalActive, activateModal, inactivateModal] = useModal();

  const {
    selectedDirection,
    removeDirection,
    updateDirection,
    resetSelectedDirection,
  } = useDirectionsStore((state) => state);

  const [direction, directionHandlers] = useDirection();

  React.useEffect(() => {
    directionHandlers.setDirection(selectedDirection);
  }, [selectedDirection, directionHandlers]);

  const onDelete = () => {
    removeDirection(direction.id);
    resetSelectedDirection();
  };

  const onSave = () => {
    try {
      validateDirection(direction);
      updateDirection(direction);
    } catch (e) {
      toastError(e.message);
    }
  };

  const disabled = !Boolean(selectedDirection.id);

  return (
    <ViewerBox>
      <Box>
        <DirectionEditor
          handlers={directionHandlers}
          localDirection={direction}
          disabled={disabled}
        />
        <Box sx={React.useMemo(() => ({ width: '100%' }), [])}>
          <EditorButtonBlock
            onSave={onSave}
            onDelete={onDelete}
            onAdd={activateModal}
            disabled={disabled}
          />
        </Box>
      </Box>

      <CommonModal active={modalActive} onClose={inactivateModal}>
        <ModalAddDirection onClose={inactivateModal} />
      </CommonModal>
    </ViewerBox>
  );
});
