import {
  Packer,
  Paragraph,
  TextRun,
  Document,
  PageOrientation,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeightRule,
  VerticalAlign,
} from 'docx';
import { formatMark, formatPerson } from '../formatters';

export const generateStudentListing = ({
  students,
  degreeWorks,
  direction,
  group,
}) => {
  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: 'DefaultText',
          run: {
            font: 'Arial',
            size: 22,
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'Header',
          run: {
            font: 'Arial',
            size: 22,
            italics: true,
            bold: true,
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: PageOrientation.LANDSCAPE,
            },
            margin: {
              top: 567,
              left: 1000,
              bottom: 567,
              right: 1000,
            },
          },
        },
        children: [
          new Paragraph({
            style: 'Header',
            children: [
              new TextRun({
                text: `${direction.code} ${direction.fullName} (${group.educationLevel})`,
              }),
            ],
          }),
          new Paragraph({}),
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
                        style: 'DefaultText',
                        children: [new TextRun('№')],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 5000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('ФИО обучающегося')],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 9000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('Тема')],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 3000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('Оценка ГЭК')],
                      }),
                    ],
                  }),
                ],
              }),
              ...students.map((student, index) => {
                const degreeWork = degreeWorks.find(
                  (degreeWork) => degreeWork.studentId === student.id
                );

                if (!degreeWork) {
                  throw new Error(`${formatPerson(student)} не имеет ВКР!`);
                }

                return new TableRow({
                  height: {
                    value: 500,
                    rule: HeightRule.ATLEAST,
                  },
                  children: [
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 750,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(`${index + 1}.`)],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 5000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [
                            new TextRun(
                              `${student.lastname} ${student.name} ${student.patronymic}`
                            ),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 9000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(degreeWork.theme)],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 3000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(formatMark(degreeWork.mark))],
                        }),
                      ],
                    }),
                  ],
                });
              }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
};
