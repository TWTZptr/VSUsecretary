import { ParsedGraduateScript } from '../types/parsed-students.type';

export const parseGraduateScripts = (
  studentsFileText: string,
): ParsedGraduateScript[] => {
  const graduateScripts = studentsFileText.trim().split('\n\n');

  const result = [];

  for (const textLines of graduateScripts) {
    const [dateString, ...students] = textLines.split('\r\n');
    const splittedDate = dateString.split('.');

    let [day, month] = splittedDate;
    day = day.replace('0', '');
    month = month.replace('0', '');
    const [, , year] = splittedDate;
    const date = new Date(+year, +month, +day);

    if (isNaN(date.valueOf())) {
      throw new Error('Invalid file data');
    }

    const formattedDateString = `${year}-${month}-${day}`;

    const graduateScript: ParsedGraduateScript = {
      date: formattedDateString,
      students: [],
    };

    for (const student of students) {
      graduateScript.students.push(parseStudent(student));
    }

    result.push(graduateScript);
  }

  return result;
};

const parseStudent = (line: string) => {
  const [lastname, name, patronymic] = line.split(' ');
  if (!patronymic.length || !lastname.length || !name.length) {
    throw new Error('Invalid file data');
  }

  return { lastname, name, patronymic };
};
