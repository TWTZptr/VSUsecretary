import { ParsedStudent } from '../types/parsed-students.type';

export const parseStudents = (studentsFileText: string): ParsedStudent[] => {
  const lines = studentsFileText.split('\n');
  return lines.map((line) => {
    const [lastname, name, patronymic, publications] = line.split(' ');
    return { lastname, name, patronymic, publications: +publications };
  });
};
