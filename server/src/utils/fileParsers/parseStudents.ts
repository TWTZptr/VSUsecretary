import { ParsedStudent } from '../types/parsed-students.type';

export const parseStudents = (studentsFileText: string): ParsedStudent[] => {
  const lines = studentsFileText.split('\n');
  return lines.map((line) => {
    const [lastname, name, patronymic, publications] = line.split(' ');
    if (!publications || isNaN(+publications)) {
      throw new Error('Invalid file data');
    }

    return { lastname, name, patronymic, publications: +publications };
  });
};
