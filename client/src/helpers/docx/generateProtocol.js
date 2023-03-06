import { AlignmentType, Document, Packer, Paragraph, TextRun } from 'docx';
import { formatPerson } from '../formatters';

export const generateProtocol = (options) => {
  const { chairman, secretary, commissionMembers, direction, takeDay, number } =
    options;

  const chairmanInfo = `${chairman.name[0]}. ${chairman.patronymic[0]}. ${chairman.lastname}, ${chairman.academicDegree}, ${chairman.academicRank}, ${chairman.position}`;
  const commissionMembersInfo = commissionMembers.map((member) => {
    return `${member.name[0]}. ${member.patronymic[0]}. ${member.lastname}, ${member.academicDegree}, ${member.academicRank}, ${member.position}, ${member.anotherJob}`;
  });

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
            children: [
              new TextRun(
                `ПРОТОКОЛ № ${number} от ${takeDay.date.replaceAll('-', '.')}`
              ),
            ],
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
                `с ________ час ________ мин.\t\tдо _______ час ________ мин`
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
            []
          ),
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
                text: `Секретарь ГЭК\t\t\t__________\t\t\t`,
              }),
              new TextRun({
                text: formatPerson(secretary),
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

  return Packer.toBlob(doc);
};
