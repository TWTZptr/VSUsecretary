import { Box } from '@mui/system';
import { CommonButton } from '../../../../common/CommonButton';
import { generateProtocol } from '../../../../../helpers/docx/generateProtocol';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';

export const ProtocolGeneratorButton = (props) => {
  const { chairman, secretary, commissionMembers } = useSelector(
    (state) => state.graduation.employees
  );

  const direction = useSelector((state) => state.graduation.direction);
  const takeDay = useSelector((state) => state.ui.startedTakeDay);

  const onClick = async () => {
    const { number } = props;

    const protocolOptions = {
      direction,
      takeDay,
      secretary,
      commissionMembers,
      chairman,
      number,
    };

    const doc = await generateProtocol(protocolOptions);
    saveAs(doc, 'doc.docx');
  };

  return (
    <Box>
      <CommonButton onClick={onClick} disabled={props.disabled}>
        Протокол
      </CommonButton>
    </Box>
  );
};
