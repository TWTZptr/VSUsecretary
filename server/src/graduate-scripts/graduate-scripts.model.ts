import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { EmployeeGraduateScript } from 'src/employees-graduate-scripts/employees-graduate-scripts.model';
import { Student } from '../students/students.model';
import { Direction } from '../directions/directions.model';

interface GraduateScriptCreationAttributes {
  date: string;
}

@Table({ tableName: 'GraduateScripts' })
export class GraduateScript extends Model<
  GraduateScript,
  GraduateScriptCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Direction)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'direction_id' })
  directionId: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  complete: boolean;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  audience: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  time: string;

  @HasMany(() => EmployeeGraduateScript, 'graduateScriptId')
  employeeGraduateScripts: EmployeeGraduateScript[];

  @BelongsTo(() => Direction, 'directionId')
  direction: Direction;

  @HasMany(() => Student, 'graduateScriptId')
  students: Student[];
}
