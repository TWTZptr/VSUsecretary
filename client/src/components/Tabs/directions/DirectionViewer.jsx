import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateDirectionAction,
  deleteDirectionAction,
} from '../../../redux/actions/directionsActions';
import { EditorButtonBlock } from '../../common/EditorButtonBlock';
import { ModalAddDirection } from './ModalAddDirection';
import { useModal } from '../../../hooks/useModal';
import { DirectionEditor } from './DirectionEditor';
import { useDirection } from '../../../hooks/useDirection';
import { CommonModal } from '../../common/CommonModal';
import { ViewerBox } from '../../common/ViewerBox';
import { toastError } from '../../../utils/toastSender';
import { validateDirection } from './validators';

export const DirectionViewer = (props) => {
  const [modalActive, activateModal, inactivateModal] = useModal();

  const dispatch = useDispatch();
  const selectedDirection = useSelector((state) => state.ui.selectedDirection);

  const [direction, directionHandlers] = useDirection();

  React.useEffect(() => {
    directionHandlers.setDirection(selectedDirection);
  }, [selectedDirection]);

  const onDelete = () => {
    dispatch(deleteDirectionAction(direction.id));
  };

  const onSave = () => {
    try {
      validateDirection(direction);
      dispatch(updateDirectionAction(direction));
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
        <Box sx={{ width: '100%' }}>
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
};
