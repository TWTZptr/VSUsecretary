import React from 'react';
import { ModalBox } from '../common/ModalBox';
import { toastError } from '../../utils/toastSender';
import { CommonTextField } from '../common/CommonTextField';
import { CommonButton } from '../common/CommonButton';

export const ModalChangePassword = React.memo(({ onSave }) => {
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [adminPassword, setAdminPassword] = React.useState('');

  const onAdminPasswordChange = React.useCallback(
    (e) => {
      setAdminPassword(e.target.value);
    },
    [setAdminPassword]
  );

  const onPasswordChange = React.useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const onPasswordConfirmationChange = React.useCallback(
    (e) => {
      setPasswordConfirmation(e.target.value);
    },
    [setPasswordConfirmation]
  );

  const onSavePassword = React.useCallback(() => {
    if (password !== passwordConfirmation) {
      toastError('Пароли не совпадают!');
      return;
    }

    if (password.length < 8) {
      toastError('Пароль не может быть короче 8 символов!');
      return;
    }

    onSave(password, adminPassword);
  }, [onSave, password, passwordConfirmation, adminPassword]);

  return (
    <ModalBox
      sx={React.useMemo(
        () => ({ maxWidth: '700px', display: 'flex', flexDirection: 'column' }),
        []
      )}
    >
      <CommonTextField
        label="Пароль администратора"
        id="adminPassword"
        onChange={onAdminPasswordChange}
        value={adminPassword}
        type="password"
      />
      <CommonTextField
        label="Новый пароль"
        id="password"
        onChange={onPasswordChange}
        value={password}
        type="password"
      />
      <CommonTextField
        label="Подтверждение нового пароля"
        id="passwordConfirmation"
        onChange={onPasswordConfirmationChange}
        value={passwordConfirmation}
        type="password"
      />
      <CommonButton onClick={onSavePassword}>Сохранить</CommonButton>
    </ModalBox>
  );
});
