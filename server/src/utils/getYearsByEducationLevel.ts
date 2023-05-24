export const getYearsByEducationLevel = (levelName: string) => {
  switch (levelName) {
    case 'Бакалавриат':
      return 4;
    case 'Магистратура':
      return 2;
    case 'Специалитет':
      return 5;
    default:
      return 4;
  }
};
