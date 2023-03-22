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
}
