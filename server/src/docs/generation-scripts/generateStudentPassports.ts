import { Document, Packer, PageBreak, Paragraph, TextRun } from 'docx';
import { formatPerson } from './formatters';

export const generateStudentPassports = (students) => {
  const studentLists = students.map((student) => [
    new Paragraph({
      style: 'DefaultText',
      children: [
        new TextRun(
          `ФИО: ${student.lastname} ${student.name} ${student.patronymic}`,
        ),
      ],
    }),
    new Paragraph({
      style: 'DefaultText',
      children: [new TextRun(`Тема: ${student.degreeWork.theme}`)],
    }),
    new Paragraph({
      style: 'DefaultText',
      children: [
        new TextRun(
          `Научный руководитель: ${formatPerson(
            student.degreeWork.supervisor,
          )}`,
        ),
      ],
    }),
    new Paragraph({
      style: 'DefaultText',
      children: [new TextRun(`Количество публикаций: ${student.publications}`)],
    }),
    new Paragraph({
      style: 'DefaultText',
      children: [
        new TextRun(`Оригинальность: ${student.degreeWork.originality}`),
      ],
    }),
    new Paragraph({
      style: 'DefaultText',
      children: [
        new TextRun(
          `Оценка руководителя: ${student.degreeWork.supervisorMark.name}`,
        ),
      ],
    }),
    new Paragraph({}),
    new Paragraph({
      style: 'DefaultText',
      children: [new TextRun(`Доклад`)],
    }),
    new Paragraph({
      style: 'DefaultText',
      children: [new TextRun(`Презентация`)],
    }),
    new Paragraph({
      style: 'DefaultText',
      children: [new TextRun(`Оформление`)],
    }),
    new Paragraph({
      style: 'DefaultText',
      children: [new TextRun(`Вопросы`)],
    }),
    new Paragraph({
      style: 'DefaultText',
      children: [new TextRun(`Оценка ГЭК`)],
    }),
  ]);

  const children = studentLists.reduce((acc, current) => {
    acc.push(...current);
    acc.push(
      new Paragraph({
        style: 'DefaultText',
        children: [new PageBreak()],
      }),
    );
    return acc;
  }, []);

  children.pop();

  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: 'DefaultText',
          run: {
            font: 'Arial',
            size: 30,
          },
        },
      ],
    },
    sections: [
      {
        children,
      },
    ],
  });

  return Packer.toBuffer(doc);
};
