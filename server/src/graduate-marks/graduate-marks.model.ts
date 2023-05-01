import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DegreeWork } from '../degree-works/degree-work.model';

interface GraduateMarksCreationAttributes {
  degreeWorkId: number;
}

@Table({ tableName: 'graduate_marks' })
export class GraduateMarks extends Model<
  GraduateMarks,
  GraduateMarksCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  report: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  presentation: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  questions: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  appearance: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  final: number;

  @ForeignKey(() => DegreeWork)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'degree_work_id',
    unique: true,
  })
  degreeWorkId: number;

  @BelongsTo(() => DegreeWork, 'degreeWorkId')
  degreeWork: DegreeWork;
}
