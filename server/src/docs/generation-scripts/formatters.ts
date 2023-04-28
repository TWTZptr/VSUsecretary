import { inclineLastname } from 'lvovich';
import { DeclentionStrT } from 'lvovich/lib/inclineRules';

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

export const formatPerson = (person, declension?: DeclentionStrT) => {
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
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
};

export const formatPublicationsCount = (publicationsQuantity) => {
  return publicationsQuantity === 0 ? '-' : `${publicationsQuantity}`;
};
