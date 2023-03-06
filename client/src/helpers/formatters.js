import { inclineLastname } from 'lvovich';

export const formatMark = (mark) => {
  switch (+mark) {
    case 5:
      return 'отлично';
    case 4:
      return 'хорошо';
    case 3:
      return 'удовлетворительно';
    case 2:
      return 'неудовлетворительно';
    default:
      return '-';
  }
};

export const formatPerson = (person, declension = '') => {
  if (declension) {
    return `${inclineLastname(person.lastname, declension)} ${
      person.name.toUpperCase()[0]
    }. ${person.patronymic.toUpperCase()[0]}.`;
  }

  return `${person.lastname} ${person.name.toUpperCase()[0]}. ${
    person.patronymic.toUpperCase()[0]
  }.`;
};

export const formatDate = (date) => {
  let [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
};

export const formatPublicationsCount = (publicationsQuantity) => {
  return publicationsQuantity === 0 ? '-' : `${publicationsQuantity}`;
};
