import React from 'react';
import { useExtraEmployeeInfo } from '../../../../hooks/useExtraEmployeeInfo';
import { toastError } from '../../../../utils/toastSender';
import { validateExtraInfo } from './validators';
import {
  getExtraInfo,
  saveExtraInfo,
} from '../../../../services/graduateScriptsService';
import { ModalBox } from '../../../common/ModalBox';
import { CommonButton } from '../../../common/CommonButton';
import { ExtraInfoEditor } from './ExtraInfoEditor';
import { useGraduateScriptsStore } from '../../../../hooks/zustand/useGraduateScriptsStore';

export const ModalEditExtraInfo = React.memo(({ onClose, selectedId }) => {
  const [extraInfo, extraInfoHandlers] = useExtraEmployeeInfo();

  const { selectedGraduateScript } = useGraduateScriptsStore((state) => state);

  React.useEffect(() => {
    getExtraInfo(selectedId, selectedGraduateScript.id).then((res) => {
      extraInfoHandlers.setExtraEmployeeInfo(res);
    });
  }, [extraInfoHandlers, selectedGraduateScript.id, selectedId]);

  const onSave = React.useCallback(
    (e) => {
      e.preventDefault();
      try {
        validateExtraInfo(extraInfo);
        saveExtraInfo(extraInfo).then(() => {
          onClose();
        });
      } catch (e) {
        toastError(e.message);
      }
    },
    [extraInfo, onClose]
  );

  return (
    <ModalBox sx={React.useMemo(() => ({ maxWidth: 700 }), [])}>
      <form onSubmit={onSave}>
        <ExtraInfoEditor
          handlers={extraInfoHandlers}
          localExtraInfo={extraInfo}
        />
        <CommonButton onClick={onSave} type="submit">
          Сохранить
        </CommonButton>
      </form>
    </ModalBox>
  );
});
