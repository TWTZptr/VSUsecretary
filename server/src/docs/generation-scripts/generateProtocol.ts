import { AlignmentType, Document, Packer, Paragraph, TextRun } from 'docx';
import { formatPerson } from './formatters';

const formatPersonInfo = (person) => {
  const academicDegree = person.info.academicDegree.length
    ? `, ${person.info.academicDegree}`
    : '';

  const academicRank = person.info.academicRank.length
    ? `, ${person.info.academicRank}`
    : '';

  const position = person.info.position.length
    ? `, ${person.info.position}`
    : '';

  const anotherJob = person.info.anotherJob.length
    ? `, ${person.info.anotherJob}`
    : '';

  return `${person.employee.name[0]}. ${person.employee.patronymic[0]}. ${person.employee.lastname}${academicDegree}${academicRank}${position}${anotherJob}`;
};

export const generateProtocol = ({
  commission: { chairman, commission, secretary },
  direction,
  graduateScript,
  number,
}) => {
  const chairmanInfo = formatPersonInfo(chairman);
  const commissionMembersInfo = commission.map((member) =>
    formatPersonInfo(member),
  );

  const [year, month, day] = graduateScript.date.split('-');
  const date = `${day}.${month}.${year}`;

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
            size: 24,
          },
          paragraph: {
            alignment: AlignmentType.LEFT,
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
        children: [
          new Paragraph({
            style: 'Heading',
            children: [new TextRun(`ПРОТОКОЛ № ${number} от ${date}`)],
          }),
          new Paragraph({}),
          new Paragraph({
            style: 'Heading',
            children: [new TextRun(`заседания ГЭК по программе`)],
          }),
          new Paragraph({
            style: 'Heading',
            children: [new TextRun(`${direction.code} ${direction.fullName}`)],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun(`код, наименование направления или специальности`),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
          }),
          new Paragraph({
            style: 'Heading',
          }),
          new Paragraph({
            style: 'Heading',
            children: [
              new TextRun(
                `с ________ час ________ мин.\t\tдо _______ час ________ мин`,
              ),
            ],
          }),
          new Paragraph({
            style: 'Heading',
          }),
          new Paragraph({
            style: 'Heading',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [new TextRun(`Присутствовали:`)],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            alignment: AlignmentType.JUSTIFIED,
            children: [new TextRun(`Председатель ГЭК\t ${chairmanInfo}`)],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          new Paragraph({
            style: 'DefaultText',
            children: [new TextRun(`Члены ГЭК:`)],
          }),
          new Paragraph({
            style: 'DefaultText',
          }),
          ...commissionMembersInfo.reduce(
            (prev, current) => [
              ...prev,
              new Paragraph({
                style: 'DefaultText',
                alignment: AlignmentType.JUSTIFIED,
                children: [new TextRun(current)],
              }),
              new Paragraph({ style: 'DefaultText' }),
            ],
            [],
          ),
          new Paragraph({ style: 'DefaultText' }),
          new Paragraph({ style: 'DefaultText' }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `Председатель ГЭК\t\t\t__________\t\t\t\t`,
              }),
              new TextRun({
                text: formatPerson(chairman.employee),
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                italics: true,
                text: 'Подпись\t\t\t\tРасшифровка подписи\t',
              }),
            ],
          }),
          new Paragraph({ style: 'DefaultText' }),
          new Paragraph({ style: 'DefaultText' }),
          new Paragraph({
            style: 'DefaultText',
            children: [
              new TextRun({
                text: `Секретарь ГЭК\t\t\t__________\t\t\t\t`,
              }),
              new TextRun({
                text: formatPerson(secretary.employee),
              }),
            ],
          }),
          new Paragraph({
            style: 'SmallText',
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                italics: true,
                text: 'Подпись\t\t\t\tРасшифровка подписи\t',
              }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
};
