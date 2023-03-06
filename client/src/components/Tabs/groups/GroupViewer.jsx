import { Box } from '@mui/system';
import React from 'react';
import { EditorButtonBlock } from '../../common/EditorButtonBlock';
import { useModal } from '../../../hooks/useModal';
import { CommonModal } from '../../common/CommonModal';
import { ModalAddGroup } from './ModalAddGroup';
import {
  deleteGroupAction,
  updateGroupAction,
} from '../../../redux/actions/groupsActions';
import { useDispatch, useSelector } from 'react-redux';
import { GroupEditor } from './GroupEditor';
import { useGroup } from '../../../hooks/useGroup';
import { ViewerBox } from '../../common/ViewerBox';
import { validateGroup } from './validators';
import { toastError } from '../../../utils/toastSender';
import { StudentsListGenerationButton } from '../takeDays/GraduationMode/GraduationEnd/StudentsListGenerationButton';

export const GroupViewer = (props) => {
  const [modalActive, activateModal, inactivateModal] = useModal();

  const dispatch = useDispatch();

  const selectedGroup = useSelector((state) => state.ui.selectedGroup);

  const [group, groupHandlers] = useGroup();

  React.useEffect(() => {
    groupHandlers.setGroup(selectedGroup);
  }, [selectedGroup]);

  const onDelete = () => {
    dispatch(deleteGroupAction(selectedGroup.id));
  };

  const onSave = () => {
    try {
      validateGroup(group);
      dispatch(updateGroupAction(group));
    } catch (e) {
      toastError(e.message);
    }
  };

  const disabled = !Boolean(selectedGroup.id);

  return (
    <ViewerBox>
      <Box sx={{ width: '100%' }}>
        <GroupEditor
          handlers={groupHandlers}
          localGroup={group}
          disabled={disabled}
        />
        <Box
          sx={React.useMemo(() => ({ width: '100%', textAlign: 'center' }), [])}
        >
          <StudentsListGenerationButton disabled={disabled} />
        </Box>
        <EditorButtonBlock
          onSave={onSave}
          onDelete={onDelete}
          onAdd={activateModal}
          disabled={disabled}
        />
      </Box>
      <CommonModal active={modalActive} onClose={inactivateModal}>
        <ModalAddGroup onClose={inactivateModal} />
      </CommonModal>
    </ViewerBox>
  );
};
