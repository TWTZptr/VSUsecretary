export const validateGroupListingOptions = ({
  students,
  degreeWorks,
  direction,
  group,
}) => {
  if (!students || !students.length) {
    throw new Error('Не указаны студенты!');
  }

  if (!degreeWorks || !degreeWorks.length) {
    throw new Error('Не указаны работы!');
  }

  if (!direction) {
    throw new Error('Не указано направление!');
  }

  if (!group) {
    throw new Error('Не указана группа!');
  }
};
