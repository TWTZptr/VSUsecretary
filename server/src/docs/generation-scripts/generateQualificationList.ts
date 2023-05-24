import {
  AlignmentType,
  convertInchesToTwip,
  Document,
  LevelFormat,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import { formatDate, formatPerson } from './formatters';
import { getYearsByEducationLevel } from '../../utils/getYearsByEducationLevel';

export const generateQualificationListing = ({
  direction,
  date,
  number,
  students,
  chairman,
  secretary,
}) => {
  const doc = new Document({
    numbering: {
      config: [
        {
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: '%1.',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: convertInchesToTwip(1.25) },
                },
              },
            },
          ],
          reference: 'list',
        },
      ],
    },
    styles: {
      paragraphStyles: [
        {
          id: 'StartAppendixStyle',
          run: {
            font: 'Arial',
            size: 24,
          },
          paragraph: {
            alignment: AlignmentType.RIGHT,
          },
        },
        {
          id: 'CenteredTextHeading',
          run: {
            font: 'Arial',
            size: 24,
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'PaddedCenteredTextHeading',
          run: {
            font: 'Arial',
            size: 24,
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 75,
            },
          },
        },
        {
          id: 'SmallText',
          run: {
            font: 'Arial',
            size: 16,
          },
        },
        {
          id: 'DefaultText',
          run: {
            font: 'Arial',
            size: 24,
          },
        },
        {
          id: 'LeftPadText',
          paragraph: {
            spacing: {
              before: 75,
            },
          },
          run: {
            font: 'Arial',
            size: 24,
          },
        },
        {
          id: 'SpacedDefaultText',
          run: {
            font: 'Arial',
            size: 24,
          },
          paragraph: {
            spacing: {
              before: 100,
            },
            alignment: AlignmentType.JUSTIFIED,
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
            style: 'StartAppendixStyle',
            children: [
              new TextRun({
                text: 'Приложение к протоколу',
              }),
            ],
          }),
          new Paragraph({
            style: 'StartAppendixStyle',
            children: [
              new TextRun({
                text: `заседания ГЭК №${number}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'StartAppendixStyle',
            children: [
              new TextRun({
                text: `от ${formatDate(date)}`,
              }),
            ],
          }),
          new Paragraph({ style: 'CenteredTextHeading' }),
          new Paragraph({
            style: 'CenteredTextHeading',
            children: [
              new TextRun({
                text: 'О ПРИСВОЕНИИ КВАЛИФИКАЦИИ ВЫПУСКНИКАМ',
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'SpacedDefaultText',
            children: [
              new TextRun({
                text: 'Постановили:',
              }),
            ],
          }),
          new Paragraph({
            style: 'SpacedDefaultText',
            children: [
              new TextRun({
                text: `Обучающихся ${getYearsByEducationLevel(
                  direction.educationLevel.name,
                )} курса факультета прикладной математики, информатики и механики форма обучения очная, полностью выполнивших учебный план и защитивших ВКР по направлению подготовки `,
              }),
            ],
          }),
          new Paragraph({
            style: 'SpacedDefaultText',
            children: [
              new TextRun({
                text: `${direction.code} ${direction.fullName} (${direction.educationLevel.name})`,
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                italics: true,
                text: '\t\t\t\tкод, наименование направления подготовки/специальности',
              }),
            ],
          }),
          new Paragraph({
            style: 'SpacedDefaultText',
            children: [
              new TextRun({
                text: `в ${
                  date.split('-')[0]
                } году, считать окончившими Воронежский государственный университет с присвоением степени бакалавра по направлению «${
                  direction.fullName
                }»`,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `и выдать: \t\t\t\t дипломы с отличием`,
              }),
            ],
          }),
          ...students
            .filter((student) => student.honor)
            .map((student) => {
              return new Paragraph({
                style: 'LeftPadText',
                text: `${student.lastname} ${student.name} ${student.patronymic}`,
                numbering: {
                  reference: 'list',
                  level: 0,
                },
              });
            }),
          new Paragraph({
            style: 'PaddedCenteredTextHeading',
            children: [
              new TextRun({
                text: `дипломы`,
              }),
            ],
          }),
          ...students
            .filter((student) => !student.honor)
            .map((student) => {
              return new Paragraph({
                style: 'LeftPadText',
                text: `${student.lastname} ${student.name} ${student.patronymic}`,
                numbering: {
                  reference: 'list',
                  level: 0,
                },
              });
            }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `Председатель ГЭК\t\t\t\t__________\t\t\t\t${formatPerson(
                  chairman,
                )}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                italics: true,
                text: 'Подпись\t\t\t\tРасшифровка подписи\t\t',
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `Секретарь ГЭК\t\t\t\t__________\t\t\t\t${formatPerson(
                  secretary,
                )}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                italics: true,
                text: 'Подпись\t\t\t\tРасшифровка подписи\t\t',
              }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
};
