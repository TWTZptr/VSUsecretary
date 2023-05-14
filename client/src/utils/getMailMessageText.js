import { getGender } from 'lvovich';
import { formatPerson } from '../helpers/formatters';

export const getMailMessageText = (person, dates, direction, secretary) => {
  const gender = getGender({
    last: person.lastname,
    middle: person.patronymic,
    first: person.name,
  });

  return `${gender === 'male' ? 'Уважаемый' : 'Уважаемая'} ${person.lastname} ${
    person.name
  } ${person.patronymic}!
  
Вы являетесь членом ГЭК по защите выпускных квалификационных работ (${getStage(
    direction.educationLevel.name
  )} работа) по направлению ${direction.code} ${direction.fullName}.

Даты защит:
${dates
  .map(
    (date) =>
      `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}\t\t${
        days[date.getDay()]
      }`
  )
  .join('\n')}

Начало в 09.00. Аудитория 10 (цокольный этаж)

Подтвердите, пожалуйста, получение данного сообщения.

С уважением, 
секретарь ГЭК ${formatPerson(secretary)}`;
};

const getStage = (directionLevel) => {
  switch (directionLevel) {
    case 'Бакалавриат':
      return 'бакалаврская';
    case 'Магистратура':
      return 'магистерская';
    case 'Специалитет':
      return 'специалистская';

    default:
      return 'неизвестная';
  }
};

const days = [
  'воскресенье',
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
];

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
