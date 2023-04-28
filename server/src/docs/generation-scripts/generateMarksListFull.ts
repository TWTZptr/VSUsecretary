import {
  AlignmentType,
  Document,
  HeightRule,
  Packer,
  PageOrientation,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';
import {
  formatDate,
  formatPerson,
  formatPublicationsCount,
} from './formatters';

export const generateMarksListFull = ({
  takeDay,
  direction,
  degreeWorks,
  students,
  allEmployees,
}) => {
  let number1 = 0;
  let number2 = 0;

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
            style: 'Heading',
            children: [
              new TextRun({
                text: `ОЦЕНОЧНЫЙ ЛИСТ (${formatDate(takeDay.date)})`,
              }),
            ],
          }),
          new Paragraph({
            style: 'Heading',
            children: [
              new TextRun({
                text: `${direction.code} ${direction.fullName} (${direction.educationLevel})`,
                bold: true,
                italics: true,
              }),
            ],
          }),
          new Table({
            rows: [
              new TableRow({
                height: {
                  value: 500,
                  rule: HeightRule.ATLEAST,
                },
                children: [
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 550,
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
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 4000,
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
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 8000,
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
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 3000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('Научный')],
                      }),
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('руководитель')],
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 2500,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('Наличие')],
                      }),
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('публикаций')],
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 2000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('Оригинальность, ')],
                      }),
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('%')],
                      }),
                    ],
                  }),
                ],
              }),
              ...students.map((student) => {
                const degreeWork = degreeWorks.find(
                  (degreeWork) => degreeWork.studentId === student.id,
                );
                number1++;
                const supervisor = allEmployees.find(
                  (employee) => employee.id === degreeWork.supervisorId,
                );

                return new TableRow({
                  height: {
                    value: 500,
                    rule: HeightRule.ATLEAST,
                  },
                  children: [
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 550,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(`${number1}`)],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 4000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [
                            new TextRun(
                              `${student.lastname} ${student.name} ${student.patronymic}`,
                            ),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 8000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(`${degreeWork.theme}`)],
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
                          children: [
                            new TextRun(`${formatPerson(supervisor)}`),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 2500,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [
                            new TextRun(
                              `${formatPublicationsCount(
                                student.publications,
                              )}`,
                            ),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 2000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(`${degreeWork.originality}`)],
                        }),
                      ],
                    }),
                  ],
                });
              }),
            ],
          }),
          new Paragraph({}),
          new Table({
            rows: [
              new TableRow({
                height: {
                  value: 500,
                  rule: HeightRule.ATLEAST,
                },
                children: [
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 550,
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
                    verticalAlign: VerticalAlign.CENTER,
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
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 2000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('оценка')],
                      }),
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('руководителя')],
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 2000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('доклад')],
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 2000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('презентация')],
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 2000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('вопросы')],
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 2000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('оформление')],
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 2000,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        style: 'DefaultText',
                        children: [new TextRun('оценка ГЭК')],
                        // bold: true,
                      }),
                    ],
                  }),
                ],
              }),
              ...students.map((student) => {
                const degreeWork = degreeWorks.find(
                  (degreeWork) => degreeWork.studentId === student.id,
                );
                number2++;

                return new TableRow({
                  height: {
                    value: 500,
                    rule: HeightRule.ATLEAST,
                  },
                  children: [
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 550,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(`${number2}`)],
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
                              `${student.lastname} ${student.name} ${student.patronymic}`,
                            ),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 2000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [
                            new TextRun(`${degreeWork.supervisorMark}`),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 2000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(``)],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 2000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(``)],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 2000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(``)],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 2000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(``)],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      width: {
                        size: 2000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          style: 'DefaultText',
                          children: [new TextRun(``)],
                          // bold: true,
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
