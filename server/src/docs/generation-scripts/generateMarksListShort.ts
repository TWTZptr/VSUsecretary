import {
  AlignmentType,
  Document,
  HeightRule,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  UnderlineType,
  WidthType,
} from 'docx';
import { formatDate, formatPerson } from './formatters';

export const generateMarksListShort = ({
  graduateScript,
  chairman,
  secretary,
  direction,
  students,
}) => {
  let number = 0;

  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: 'Heading',
          run: {
            font: 'Arial',
            size: 24,
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'DefaultText',
          run: {
            font: 'Arial',
            size: 22,
          },
          paragraph: {
            alignment: AlignmentType.LEFT,
          },
        },
        {
          id: 'TableText',
          run: {
            font: 'Arial',
            size: 22,
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'SmallText',
          run: {
            font: 'Arial',
            size: 16,
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1130,
              left: 1130,
              bottom: 1130,
              right: 567,
            },
          },
        },
        children: [
          new Paragraph({
            style: 'Heading',
            children: [new TextRun(`ОЦЕНОЧНЫЙ ЛИСТ`)],
          }),
          new Paragraph({ style: 'Heading' }),
          new Paragraph({ style: 'Heading' }),
          new Paragraph({
            style: 'DefaultText',
            children: [new TextRun(`Направление подготовки`)],
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `${direction.code} ${direction.fullName} (${direction.educationLevel.name})`,
                underline: { type: UnderlineType.SINGLE },
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `\t\t\t\t\t\tкод, наименование`,
                italics: true,
              }),
            ],
          }),
          new Paragraph({ style: 'DefaultText' }),
          new Paragraph({
            style: 'DefaultText',
            children: [new TextRun(`Номер ГЭК 1`)],
          }),
          new Paragraph({ style: 'DefaultText' }),
          new Paragraph({ style: 'DefaultText' }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 750,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'TableText',
                        children: [new TextRun('№')],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 7000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'TableText',
                        children: [new TextRun('ФИО обучающегося')],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 4000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'TableText',
                        children: [new TextRun('оценка')],
                      }),
                      new Paragraph({
                        style: 'TableText',
                        children: [new TextRun('руководителя')],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 4000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'TableText',
                        children: [new TextRun('оценка')],
                      }),
                      new Paragraph({
                        style: 'TableText',
                        children: [new TextRun('рецензента')],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 4000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'TableText',
                        children: [new TextRun('оценка ГЭК')],
                      }),
                    ],
                  }),
                ],
              }),
              ...students.map((student) => {
                number++;

                return new TableRow({
                  height: {
                    value: 500,
                    rule: HeightRule.ATLEAST,
                  },
                  children: [
                    new TableCell({
                      width: {
                        size: 750,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'TableText',
                          children: [new TextRun(`${number}.`)],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 7000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'TableText',
                          children: [
                            new TextRun(
                              `${student.lastname} ${student.name} ${student.patronymic}`,
                            ),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 4000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'TableText',
                          children: [
                            new TextRun(
                              `${
                                student.degreeWork.supervisorMark?.name || '-'
                              }`,
                            ),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 4000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'TableText',
                          children: [
                            new TextRun(
                              `${student.degreeWork.reviewerMark?.name || '-'}`,
                            ),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 4000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'TableText',
                          children: [
                            new TextRun(
                              `${student.degreeWork.mark?.name || '-'}`,
                            ),
                          ],
                        }),
                      ],
                    }),
                  ],
                });
              }),
            ],
          }),
          new Paragraph({ style: 'DefaultText' }),
          new Paragraph({ style: 'DefaultText' }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `Председатель ГЭК\t\t\t__________\t\t\t`,
              }),
              new TextRun({
                text: formatPerson(chairman),
              }),
              new TextRun({
                text: `       ${formatDate(graduateScript.date)}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                italics: true,
                text: 'Подпись\t\t\t\tРасшифровка подписи\t\t\t',
              }),
            ],
          }),
          new Paragraph({ style: 'DefaultText' }),
          new Paragraph({ style: 'DefaultText' }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `Секретарь ГЭК\t\t\t__________\t\t\t`,
              }),
              new TextRun({
                text: formatPerson(secretary),
              }),
              new TextRun({
                text: `       ${formatDate(graduateScript.date)}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                italics: true,
                text: 'Подпись\t\t\t\tРасшифровка подписи\t\t\t',
              }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
};
