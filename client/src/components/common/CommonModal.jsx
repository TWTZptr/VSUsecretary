import { Modal } from '@mui/material';

export const CommonModal = (props) => {
  return (
    <Modal open={props.active} onClose={props.onClose}>
      <>{props.children}</>
    </Modal>
  );
};
