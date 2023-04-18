import React from 'react';
import { CommonButton } from '../common/CommonButton';

export const ChangeUserPasswordButton = React.memo(({ role, onClick }) => {
  const onSelfClick = React.useCallback(() => {
    onClick(role);
  }, [role, onClick]);

  return (
    <CommonButton onClick={onSelfClick}>
      Сменить пароль пользователя {role.name}
    </CommonButton>
  );
});
