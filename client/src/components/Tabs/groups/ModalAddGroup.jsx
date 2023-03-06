import React from 'react';
import { useDispatch } from 'react-redux';
import { createGroupAction } from '../../../redux/actions/groupsActions';
import { CommonButton } from '../../common/CommonButton';
import { GroupEditor } from './GroupEditor';
import { useGroup } from '../../../hooks/useGroup';
import { ModalBox } from '../../common/ModalBox';
import { validateGroup } from './validators';
import { toastError } from '../../../utils/toastSender';

export const ModalAddGroup = (props) => {
  const [group, groupHandlers] = useGroup();
  const dispatch = useDispatch();

  const handleAdd = () => {
    try {
      validateGroup(group);
      dispatch(createGroupAction(group));
      props.onClose();
    } catch (e) {
      toastError(e.message);
    }
  };

  return (
    <ModalBox sx={{ maxWidth: 450 }}>
      <GroupEditor handlers={groupHandlers} localGroup={group} />
      <CommonButton onClick={handleAdd}>Добавить</CommonButton>
    </ModalBox>
  );
};
