import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { GraduateScript } from 'src/graduate-scripts/graduate-scripts.model';

interface EmployeeGraduateScriptCreationAttributes {
  employeeId: number;
  graduateScriptId: number;
  role: string;
  index: number;
}

@Table({ tableName: 'EmployeesGraduateScripts' })
export class EmployeeGraduateScript extends Model<
  EmployeeGraduateScript,
  EmployeeGraduateScriptCreationAttributes
> {
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'employee_id',
    onDelete: 'CASCADE',
  })
  employeeId: number;

  @ForeignKey(() => GraduateScript)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'graduate_script_id',
    onDelete: 'CASCADE',
  })
  graduateScriptId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'role',
  })
  role: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: '',
    field: 'academic_degree',
  })
  academicDegree: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: '',
    field: 'academic_rank',
  })
  academicRank: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  position: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'another_job',
    defaultValue: '',
  })
  anotherJob: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  index: number;
}
