import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { GraduateScript } from '../graduate-scripts/graduate-scripts.model';
import { DegreeWork } from '../degree-works/degree-work.model';

interface StudentCreationAttributes {
  name: string;
  lastname: string;
  patronymic: string;
  year: number;
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

  @Column({ type: DataType.INTEGER, allowNull: true })
  publications: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  index: number;

  @ForeignKey(() => GraduateScript)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'gradudate_script_id',
  })
  graduateScriptId: number;

  @BelongsTo(() => GraduateScript, 'graduateScriptId')
  graduateScript: GraduateScript;

  @HasOne(() => DegreeWork, 'studentId')
  degreeWork: DegreeWork;
}
