import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { Student } from 'src/students/students.model';
import { GraduateMarks } from '../graduate-marks/graduate-marks.model';

interface DegreeWorkCreationAttributes {
  theme: string;
  mark: number;
  pagesNumber: number;
  originality: number;
  supervisorMark: number;
  reviewerMark: number;
  implementation: boolean;
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'supervisor_mark',
  })
  supervisorMark: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  mark: number;

  @Column({ type: DataType.INTEGER, allowNull: true, field: 'reviewer_mark' })
  reviewerMark: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  implementation: boolean;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'reviewer_id' })
  reviewerId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'supervisor_id' })
  supervisorId: number;

  @BelongsTo(() => Employee, 'supervisorId')
  supervisor?: Employee;

  @BelongsTo(() => Employee, 'reviewerId')
  reviewer?: Employee;

  @HasOne(() => GraduateMarks, 'degreeWorkId')
  graduateMarks?: GraduateMarks;
}
