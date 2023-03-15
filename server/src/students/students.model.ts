import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { DegreeWork } from 'src/degree-works/degree-work.model';
import { Direction } from '../directions/directions.model';

interface StudentCreationAttributes {
  name: string;
  lastname: string;
  patronymic: string;
  year: number;
  publications: number;
}

@Table({ tableName: 'Students' })
export class Student extends Model<Student, StudentCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(40), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  lastname: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  patronymic: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  year: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  publications: number;

  @ForeignKey(() => Direction)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'direction_id' })
  directionId: number;

  @BelongsTo(() => Direction, 'directionId')
  direction: Direction;

  @HasOne(() => DegreeWork, 'studentId')
  degreeWork: DegreeWork;
}
