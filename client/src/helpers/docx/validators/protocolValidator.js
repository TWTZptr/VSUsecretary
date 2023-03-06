export const validateProtocolOptions = ({
  chairman,
  secretary,
  commissionMembers,
  direction,
  takeDay,
  number,
}) => {
  if (!chairman) {
    throw Error('Председатель для данного дня сдачи не выбран!');
  }

  if (!secretary) {
    throw Error('Секретарь не выбран!');
  }

  if (!direction) {
    throw Error('Направление не выбрано!');
  }

  if (!takeDay) {
    throw Error('День сдачи не выбран!');
  }

  if (!number) {
    throw Error('Номер протокола не указан!');
  }

  if (!commissionMembers || !commissionMembers.length) {
    throw Error('Члены комиссии не указаны!');
  }
};
