import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { Student } from 'src/students/students.model';
import { Mark } from '../marks/marks.model';

interface DegreeWorkCreationAttributes {
  theme: string;
  pagesNumber: number;
  originality: number;
  supervisorMarkId: number;
  implementation: boolean;
  studentId: number;
}

@Table({ tableName: 'DegreeWorks' })
export class DegreeWork extends Model<
  DegreeWork,
  DegreeWorkCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  theme: string;

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'pages_number' })
  pagesNumber: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  originality: number;

  @ForeignKey(() => Mark)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'supervisor_mark_id',
  })
  supervisorMarkId: number;

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'student_id' })
  studentId: number;

  @ForeignKey(() => Mark)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'reviewer_mark_id',
  })
  reviewerMarkId: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  implementation: boolean;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  reviewer: string;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'supervisor_id' })
  supervisorId: number;

  @BelongsTo(() => Employee, 'supervisorId')
  supervisor?: Employee;

  @BelongsTo(() => Student, 'studentId')
  student: Student;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    field: 'first_question',
  })
  firstQuestion: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    field: 'second_question',
  })
  secondQuestion: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
  })
  notes: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
  })
  summary: string;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'first_question_author_id',
  })
  firstQuestionAuthorId: number;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'second_question_author_id',
  })
  secondQuestionAuthorId: number;

  @ForeignKey(() => Mark)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'mark_id',
  })
  markId: number;

  @BelongsTo(() => Employee, 'firstQuestionAuthorId')
  firstQuestionAuthor: Employee;

  @BelongsTo(() => Employee, 'secondQuestionAuthorId')
  secondQuestionAuthor: Employee;

  @BelongsTo(() => Mark, 'markId')
  mark: Mark;

  @BelongsTo(() => Mark, 'supervisorMarkId')
  supervisorMark: Mark;

  @BelongsTo(() => Mark, 'reviewerMarkId')
  reviewerMark: Mark;
}
