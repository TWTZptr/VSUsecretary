import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Direction } from '../directions/directions.model';
import { GraduateScript } from '../graduate-scripts/graduate-scripts.model';
import { DegreeWork } from '../degree-works/degree-work.model';

interface StudentCreationAttributes {
  name: string;
  lastname: string;
  patronymic: string;
  year: number;
  publications: number;
  index: number;
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

  @Column({ type: DataType.INTEGER, allowNull: true })
  order?: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  index: number;

  @ForeignKey(() => Direction)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'direction_id' })
  directionId: number;

  @ForeignKey(() => GraduateScript)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'gradudate_script_id',
  })
  graduateScriptId: number;

  @BelongsTo(() => Direction, 'directionId')
  direction: Direction;

  @BelongsTo(() => GraduateScript, 'graduateScriptId')
  graduateScript: GraduateScript;

  @HasOne(() => DegreeWork, 'studentId')
  degreeWork: DegreeWork;
}
