import { incline, inclineLastname } from 'lvovich';
import plural from 'plural-ru';
import { AlignmentType, Packer, Paragraph, TextRun, Document } from 'docx';
import { formatMark, formatDate, formatPerson } from '../formatters';

export const generateAppendixToTheProtocol = ({
  degreeWork,
  takeDay,
  supervisor,
  student,
  chairman,
  secretary,
  graduation,
  reviewer,
  number,
}) => {
  const inclinedStudent = incline(
    {
      first: student.name,
      last: student.lastname,
      middle: student.patronymic,
    },
    'genitive'
  );

  const reviewerInfo = reviewer
    ? `${formatPerson(reviewer)}`
    : '_____________________________________________________';

  const doc = new Document({
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
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134,
              left: 1417,
              bottom: 1134,
              right: 900,
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
                text: `от ${formatDate(takeDay.date)}`,
              }),
            ],
          }),
          new Paragraph({ style: 'CenteredTextHeading' }),
          new Paragraph({
            style: 'CenteredTextHeading',
            children: [
              new TextRun({
                text: 'ПО ЗАЩИТЕ ВЫПУСКНОЙ КВАЛИФИКАЦИОННОЙ РАБОТЫ',
              }),
            ],
          }),
          new Paragraph({ style: 'CenteredTextHeading' }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: 'обучающегося ',
              }),
              new TextRun({
                text: `${inclinedStudent.last} ${inclinedStudent.first} ${inclinedStudent.middle}`,
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            children: [
              new TextRun({
                text: '\t\t\tфамилия, имя, отчество',
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: 'на тему: ',
              }),
              new TextRun({
                italics: true,
                text: degreeWork.theme,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `Работа выполнена под руководством `,
              }),
              new TextRun({
                italics: true,
                text: `${inclineLastname(supervisor.lastname)} ${
                  supervisor.name.toUpperCase()[0]
                }. ${supervisor.patronymic.toLocaleUpperCase()[0]}.`,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `при консультации ${reviewerInfo}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: '\tВ государственную экзаменационную комиссию (ГЭК) представлены следующие материалы:',
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `\t\tТекст ВКР на ${plural.noun(
                  degreeWork.pagesNumber,
                  '%d странице',
                  '%d страницах'
                )}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `\t\tОтзыв руководителя ВКР ${formatMark(
                  degreeWork.supervisorMark
                )}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `\t\tРецензия на ВКР: ${formatMark(
                  degreeWork.reviewerMark
                )}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `\tПосле сообщения о выполненной ВКР обучающемуся были заданы следующие вопросы:`,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `1. ${graduation.first} - ${graduation.firstAuthor.lastname}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                italics: true,
                text: 'формулировка вопроса, фамилия лица, задавшего вопрос',
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `2. ${graduation.second} - ${graduation.secondAuthor.lastname}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                italics: true,
                text: 'формулировка вопроса, фамилия лица, задавшего вопрос',
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: 'Общая характеристика ответа обучающегося на заданные ему вопросы и рецензию',
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                text: `${graduation.overview}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `\tПризнать, что обучающийся `,
              }),
              new TextRun({
                italics: true,
                text: `${student.lastname} ${student.name} ${student.patronymic}`,
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                italics: true,
                text: '\t\t\tфамилия, имя, отчество',
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            spacing: {
              before: 130,
            },
            children: [
              new TextRun({
                text: `выполнил и защитил ВКР с оценкой`,
              }),
              new TextRun({
                text: `${formatMark(graduation.mark)}`,
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            alignment: AlignmentType.BOTH,
            children: [
              new TextRun({
                font: 'Arial',
                size: 24,
                text: 'Отметить, что ',
              }),
              new TextRun({
                size: 20,
                italics: true,
                text: '(мнения членов ГЭК об уровне подготовленности обучающегося к решению профессиональных задач, а также о недостатках в теоретической и практической подготовке   обучающегося)',
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                italics: true,
                text: formatPerson(student),
              }),
            ],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `${graduation.remarks}`,
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
                text: `Председатель ГЭК\t\t\t__________\t\t\t\t${formatPerson(
                  chairman
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
                text: `Секретарь ГЭК\t\t\t__________\t\t\t\t${formatPerson(
                  secretary
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

  return Packer.toBlob(doc);
};
