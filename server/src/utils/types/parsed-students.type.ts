export type ParsedGraduateScript = {
  date: string;
  students: {
    lastname: string;
    name: string;
    patronymic: string;
    index: number;
  }[];
};
