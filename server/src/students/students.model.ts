import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DegreeWork } from 'src/degree-works/degree-work.model';
import { Direction } from '../directions/directions.model';
import { TakeDay } from '../take-days/take-days.model';

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

  @ForeignKey(() => DegreeWork)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'degree_work_id' })
  degreeWorkId: number;

  @ForeignKey(() => TakeDay)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'take_day_id' })
  takeDayId: number;

  @BelongsTo(() => Direction, 'directionId')
  direction: Direction;

  @BelongsTo(() => DegreeWork, 'degreeWorkId')
  degreeWork: DegreeWork;

  @BelongsTo(() => TakeDay, 'takeDayId')
  takeDay: TakeDay;
}
